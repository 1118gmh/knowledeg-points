//=>一个优秀的插件是尽可能支持更多的配置项（大部分的配置项都是由默认值的）
// new Banner({
//     ele:'container', //操作哪一个容器
//     url:'',//获取数据的API地址（插件内部帮我们获取数据）
//     isArrow:true,//是否支持左右切换
//     isFoucs:true,//是否支持焦点切换
//     isAuto:true,//是否支持自动切换
//     defaultIndex:0,//默认展示第几张图片
//     interval:3000,//多久切换一次
//     speed:200,//切换的速度
//     moveEnd:()=>{}//切换完成处理的事情
//     //...
// });
//=>支持扩展，可以让用户自己在你的插件中扩展方法
//Banner.fn.extend({xxx:()=>{}});
//...
~ function() {
    class Banner {
        constructor(options = {}) {
                //1. options传递的配置项(解构赋值并且给更多的配置项设置默认值)
                let {
                    ele,
                    url,
                    isArrow = true,
                    isFocus = true,
                    isAuto = true,
                    defaultIndex = 0,
                    interval = 3000,
                    speed = 200,
                    moveEnd
                } = options;
                //2. 把所有的配置项信息都挂在到实例上（这样以后在原型的任何方法中都可以调取这些属性获取值了）
                // ['ele', 'url', 'isArrow', 'isFocus', 'isAuto', 'defaultIndex', 'interval', 'speed', 'moveEnd'].forEach(item => {
                //     this[item] = eval[item];
                // });
                this.ele = ele;
                this.url = url;
                this.isArrow = isArrow;
                this.isFocus = isFocus;
                this.isAuto = isAuto;
                this.defaultIndex = defaultIndex;
                this.interval = interval;
                this.speed = speed;
                this.moveEnd = moveEnd;
                //3. 获取需要的元素，挂在到实例上
                this.container = document.querySelector(ele);
                this.wrapper = null;
                this.focus = null;
                this.arrowLeft = null;
                this.arrowRight = null;
                this.slideList = null;
                this.focusList = null;
                this.stepIndex = 0; //记录当前展示快的索引
                this.autoTimer = null; //自动轮播的定时器
                this.init();
            }
            //3. Banner的主入口，在init中规划方法的执行顺序
        init() {
                let promise = this.queryData();
                promise.then(() => {
                    this.bindHTML();
                }).then(() => {
                    if (this.isAuto) {
                        //这里的this是window，我们需要让其为当前实例(用call改变this指向，或者用箭头函数让其上下文的this)
                        // this.autoTimer = setInterval(this.autoMove, this.interval);
                        this.autoTimer = setInterval(() => {
                            this.autoMove();
                        }, this.interval);
                    }
                }).then(() => {
                    this.handleContainer();
                    if (this.isFocus) {
                        this.handleFocus();
                    }
                    if (this.isArrow) {
                        this.handleArrow();
                    }
                })
            }
            //获取数据(Promise)
        queryData() {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('get', this.url, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        //把获取到的实例挂载到实例上了
                        this.data = JSON.parse(xhr.responseText);
                        resolve(this.data);
                    }
                };
                xhr.send(null);
            });
        }
        bindHTML() {
            let str = `<div class="wrapper">
            </div>
            <ul class="focus">
            </ul>
            <a href="javascript:;" class="arrow arrowLeft"></a>
            <a href="javascript:;" class="arrow arrowRight"></a>`;
            this.container.innerHTML += str;
            str = null;
            this.wrapper = this.container.querySelector('.wrapper');
            this.focus = this.container.querySelector('.focus');
            this.arrowLeft = this.container.querySelector('.arrowLeft');
            this.arrowRight = this.container.querySelector('.arrowRight');

            this.strSlide = ``;
            this.strFocus = ``;
            this.data.forEach((item, index) => {
                let {
                    id,
                    img = 'img/1.png',
                    desc = 'xiaomi',
                    link
                } = item;
                this.strSlide += `<div><img src="${img}" alt="${desc}"></div>`;
                this.strFocus += `<li class="${index === 0?'active':''}"></li>`
            });
            this.strSlide += `<div><img src="${this.data[0].img}" alt="${this.data[0].desc}"></div>`;
            this.wrapper.innerHTML += this.strSlide;

            this.slideList = this.wrapper.querySelectorAll('.wrapper > div');
            if (this.isFocus) {
                this.focus.innerHTML += this.strFocus;
                this.focusList = this.focus.querySelectorAll('.focus > li');
            }
            utils.setCss(this.wrapper, 'width', this.slideList.length * 1000);

        }
        autoMove() {
            this.stepIndex++;
            if (this.stepIndex > (this.slideList.length - 1)) {
                utils.setCss(this.wrapper, 'left', 0);
                this.stepIndex = 1; //不是等于0，而是等于1，这样可以切换到第二张
            }
            animate(this.wrapper, {
                left: -this.stepIndex * 1000
            }, this.speed);

            this.changeFocus();

        }
        changeFocus() {
            if (this.isFocus) {
                let tempIndex = this.stepIndex; //创建临时索引
                tempIndex === this.slideList.length - 1 ? tempIndex = 0 : null;
                [].forEach.call(this.focusList, (item, index) => {
                    item.className = index === tempIndex ? 'active' : '';
                });
                tempIndex = null;
            }
        };
        handleContainer() {
                this.container.onmouseenter = () => {
                    clearInterval(this.autoTimer);
                    if (this.isArrow) {
                        this.arrowLeft.style.display = this.arrowRight.style.display = 'block';
                    }
                };
                this.container.onmouseleave = () => {
                    this.autoTimer = setInterval(() => {
                        this.autoMove();
                    }, this.interval);
                    if (this.isArrow) {
                        this.arrowLeft.style.display = this.arrowRight.style.display = 'none';
                    }
                };
            }
            //6. 实现点击焦点图片切换
        handleFocus() {
            [].forEach.call(this.focusList, (item, index) => {
                //在插件中绑定事件，最好使用箭头函数，这样可以让this指向当前实例
                item.onclick = () => {
                    this.stepIndex = index;
                    animate(this.wrapper, {
                        left: -this.stepIndex * 1000
                    }, this.speed);
                    this.changeFocus();
                };
            });
        };
        //7. 实现点击按钮图片
        handleArrow() {
            this.arrowRight.onclick = () => {
                this.autoMove();
            };
            this.arrowLeft.onclick = () => {
                this.stepIndex--;
                if (this.stepIndex < 0) {
                    utils.setCss(this.wrapper, 'left', -(this.slideList.length - 1) * 1000);
                    this.stepIndex = this.slideList.length - 2;
                }
                animate(this.wrapper, {
                    left: -this.stepIndex * 1000
                }, this.speed);
                this.changeFocus();
            };
        }

    }
    window.Banner = Banner;
}();
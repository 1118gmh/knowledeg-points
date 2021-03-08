let bannerRender = (function() {
    //1. 获取操作的的元素
    let container = document.querySelector('#container'),
        wrapper = container.querySelector('.wrapper'),
        focus = container.querySelector('.focus'),
        arrowLeft = container.querySelector('.arrowLeft'),
        arrowRight = container.querySelector('.arrowRight'),
        slideList = null,
        focusList = null;

    //轮播图运动的基础参数
    let stepIndex = 0, //记录当前展示快的索引
        autoTimer = null, //自动轮播的定时器
        interval = 3000; //间隔多长时间自动切换

    //2. 获取数据
    let queryData = function() {
        //可以解构出属性（不能解构方法，会使方法中的this改为undefined），供下面使用
        let [url] = this;
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('get', url, true); //异步获取数据
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
            };
            xhr.send(null);
        });
    };
    //3. 实现数据绑定(获取数据成功之后执行数据绑定方法)
    let bindHTML = function(res) {

        let strSlide = ``,
            strFocus = ``;
        res.forEach((item, index) => {
            let {
                id,
                img = 'img/1.png',
                desc = 'xiaomi',
                link
            } = item;
            strSlide += `<div><img src="${img}" alt="${desc}"></div>`;
            //ES6模板字符串${}存放的是JS表达式，但是表达式要有返回值，因为我们要把返回值拼接到模板字符串中
            strFocus += `<li class="${index === 0?'active':''}"></li>`
        });
        //克隆一份到末尾
        strSlide += `<div><img src="${res[0].img}" alt="${res[0].desc}"></div>`;
        wrapper.innerHTML += strSlide;
        focus.innerHTML += strFocus;

        slideList = wrapper.querySelectorAll('.wrapper > div');
        focusList = focus.querySelectorAll('.focus > li');
        //根据slide的个数动态计算wrapper的宽度
        utils.setCss(wrapper, 'width', slideList.length * 1000);
    };
    //改变焦点
    let changeFocus = function() {
        let tempIndex = stepIndex; //创建临时索引
        tempIndex === slideList.length - 1 ? tempIndex = 0 : null;
        [].forEach.call(focusList, (item, index) => {
            item.className = index === tempIndex ? 'active' : '';
        });
    };
    //4. 实现轮播图的运动和切换
    //轮播图无缝衔接原理：
    //- 克隆第一张到末尾(在数据绑定的时候克隆)
    //- 正常累加运动，当运动到末尾（此时的末尾是克隆的哪一张），再过3秒切换的时候，后面就没有图片了，此时我们让其立即切换到真实第一张的位置
    // （立即切换，没有动画，left=0，刚才展示的最后一张和真实的第一张长的一样，给用户感觉没有切换），紧接着运动到第二张即可
    let autoMove = function() {

        stepIndex++;
        //如果索引大于原来的长度，让其瞬间运动到第一张，再让其运动到第二张
        if (stepIndex > (slideList.length - 1)) {
            utils.setCss(wrapper, 'left', 0);
            stepIndex = 1; //不是等于0，而是等于1，这样可以切换到第二张
        }
        //基于自己封装的animate实现动画
        animate(wrapper, {
            left: -stepIndex * 1000
        }, 1000);

        //每一次运动完成，需要让焦点跟着切换
        changeFocus();

    };

    //5. 实现鼠标进入和离开控制自动轮播的停止和开启
    let handleContainer = function() {
        container.onmouseenter = function() {
            clearInterval(autoTimer);
            arrowLeft.style.display = arrowRight.style.display = 'block';
        };
        container.onmouseleave = function() {
            autoTimer = setInterval(autoMove, interval);
            arrowLeft.style.display = arrowRight.style.display = 'none';
        };
    };
    //6. 实现点击焦点图片切换
    let handleFocus = function() {
        [].forEach.call(focusList, (item, index) => {
            item.onclick = function() {
                stepIndex = index;
                animate(wrapper, {
                    left: -stepIndex * 1000
                }, 1000);
                changeFocus();
            };
        });
    };
    //7. 实现点击按钮图片
    let handleArrow = function() {
        arrowRight.onclick = autoMove;
        arrowLeft.onclick = function() {
            stepIndex--;
            //如果索引小于零，则是第一张，不能再向右运动了，此时因当瞬间运动到最后一张（和第一张一模一样），再让其运动到倒数第二张
            if (stepIndex < 0) {
                utils.setCss(wrapper, 'left', -(slideList.length - 1) * 1000);
                stepIndex = slideList.length - 2;
            }
            animate(wrapper, {
                left: -stepIndex * 1000
            }, 1000);
            changeFocus();
        };
    }
    return {
        init: function() {
            let promise = queryData();
            promise.then(res => {
                bindHTML(res);
            }).then(() => {
                //开启定时器驱动的自动轮播
                autoTimer = setInterval(autoMove, interval);
            }).then(() => {
                //左右按钮或者焦点切换
                handleContainer();
                handleFocus();
                handleArrow();
            });
        }
    };
})();
bannerRender.init();
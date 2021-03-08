$(function() {
    //=>当HTML结构架子啊完成才会执行这里的代码

    //1. 获取数据
    //真实项目中我们第一页加载完成，当用户下拉到底部，开始获取第二页的内容，
    //服务器会提供一个API获取数据的地址，并要求客户端把获取的是第几页的内容传递给服务器，
    //服务器会按照这个原理对应不同的数据返回——“分页技术”
    let page = 0,
        imgData = null,
        isRun = false;
    let queryData = () => {
        page++;
        $.ajax({
            url: `json/data.json?page=${page}`, //请求路径
            method: "get", //请求方式
            async: false, //=>同步（真实项目中用异步）
            dataType: 'json', //把重服务器端获取的json字符串转换为对象（这样设置后，JQ内部会帮我们转换）
            success: result => {
                //result:我们从服务器端获取到的结果
                imgData = result;
            }
        });

    };
    //2. 数据绑定
    //传入获取到的JSON对象，返回对应的html结构字符串
    // let queryHTML = ({ id, img, content } = {}) => {
    //     //处理imgData数据不存在的时候的情况（处理隐性风险）
    //     if (typeof id === 'undefined') {
    //         return '';
    //     }
    //     return `<a href="#">
    //     <div><img src="${img}" alt=""></div>
    //     <span>${content}</span>
    // </a>`;
    // }
    let $boxList = $('.flowBox > li');
    //   boxList = $boxList.get();
    let bindHTML = () => {
        for (let i = 0; i < imgData.length; i += 3) {
            /**
             *=>分别获取一组imgData数据（3个为一组）
            （存在的隐性风险：当前数据总长度不是3的倍数，那么最后一次循环，3各种的一个会不存在，获取的item值为undefined）
            let item1 = imgData[i],
                item2 = imgData[i + 1],
                item3 = imgData[i + 2];
            把获取到的每一组小li，给这3个小li排序（小->大），按照排序后的顺序插入
            boxList.sort((a, b) => {
                return a.offsetHeight - b.offsetHeight;
            });
            if (item1) {
                boxList[0].innerHTML += queryHTML(item1);
            }
            if (item2) {
                boxList[1].innerHTML += queryHTML(item2);

            }
            if (item3) {
                boxList[2].innerHTML += queryHTML(item3);

            }
             */
            //优化
            $boxList.sort((a, b) => {
                return $(a).outerHeight - $(b).outerHeight;
            }).each((index, curLi) => {
                //    item.innerHTML += queryHTML(eval('item' + index));
                //index ——> imgData[i+index]
                let item = imgData[i + index] || '';
                let {
                    id,
                    img,
                    content
                } = item;
                $(`<a href="#">
                <div><img src="${img}" alt=""></div>
                <span>${content}</span>
            </a>`).appendTo($(curLi));
            });
        }
        isRun = false;
    };
    //3. 当页面滚动到底部时，加载数据，数据绑定

    let scrollBottom = () => {
        $(window).on('scroll', () => {
            let scrollT = $(window).scrollTop(),
                pageH = document.documentElement.scrollHeight || document.body.scrollHeight,
                winH = $(window).outerHeight();
            //判断条件：卷曲的高度 + 一屏幕高度 + 距离底部还有100px > 真实高度
            if ((scrollT + winH + 100) >= pageH) {
                //隐性问题：认为操作滚动，这个在同一个操作内会被触发n次，也就是统一个时间段，
                //获取数据会被执行n次，此时我们需要做“重复操作限定”
                //isRun：表示是否执行完成数据获取和数据绑定，
                //true表示执行完成，false表示还未执行
                if (isRun) return;
                isRun = true;
                if (page > 5) {
                    alert('没有更多数据了');
                    return;
                }
                queryData();
                bindHTML();
            }
        });
    };
    queryData();
    bindHTML();
    scrollBottom();
});
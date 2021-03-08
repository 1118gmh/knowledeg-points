$(function($) {
    let imgData = null,
        page = 0,
        isRun = false;
    let queryData = () => {
        page++
        //参数忘了
        $.ajax({
            method: 'get',
            url: `json/data.json?page=${page}`,
            async: false,
            dataType: 'json',
            success: result => {
                imgData = result;
            }
        });
    };
    let bindHTML = () => {
        // let $boxList = $('.flowBox > li'),
        //     boxList = [].slice.call($boxList);
        // let queryHTML = ({ id, content, img } = {}) => {
        //     if (typeof id === "undefined") {
        //         return '';
        //     }
        //     return `<a href="#">
        //          <div><img src="${img}" alt=""></div>
        //          <span>${content}</span>
        //      </a>`;
        // };
        // for (let i = 0; i < imgData.length; i += 3) {
        //     let item0 = imgData[i],
        //         item1 = imgData[i + 1],
        //         item2 = imgData[i + 2];

        //     boxList.sort((a, b) => {
        //         return a.offsetHeight - b.offsetHeight;
        //     });
        //     boxList.forEach((item, index) => {
        //         item.innerHTML += queryHTML(eval('item' + index));
        //     });
        // }
        // isRun = false;
        let $boxList = $('.flowBox > li');
        for (let i = 0; i < imgData.length; i += 3) {
            $boxList.sort((a, b) => {
                return $(a).outerHeight() - $(b).outerHeight();
            }).each((index, curLi) => {
                let {
                    content,
                    img
                } = imgData[i + index];
                $(`<a href="#">
                <div><img src="${img}" alt=""></div>
                <span>${content}</span>
            </a>`).appendTo(curLi);
            });
        }
        isRun = false;
    };
    let scrollBottom = () => {
        $(window).on('scroll', () => {
            let pageH = document.documentElement.scrollHeight || document.body.scrollHeight,
                winH = $(window).outerHeight(),
                scrollT = $(window).scrollTop();
            if ((scrollT + winH + 100) >= pageH) {
                if (isRun) return;
                isRun = true;
                if (page > 3) {
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
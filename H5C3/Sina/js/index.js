let headerRender = (function() {
    let $headerBox = $('.headerBox'),
        $headerMenu = $headerBox.find('.headerMenu'),
        $navBox = $('.navBox');

    let handleTap = function() {
        let block = $navBox.css('display');
        if (block === "none") {
            $navBox.css('display', 'flex');
        } else {
            $navBox.css('display', 'none');
        }
    };
    return {
        init: function() {
            //1. 点击headerMenu，navBox显隐
            $headerMenu.tap(handleTap);
        }
    }
})();
let bannerRender = (function() {
    let $bannerBox = $('.bannerBox'),
        $wrapper = $bannerBox.find('.swiper-wrapper');

    let queryData = function() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'banner.json',
                dataType: 'json',
                success: resolve
            });
        });
    };
    let bindHTML = function(result) {
        let str = ``;
        result.forEach(item => {
            let { img, desc } = item;
            str += `<div class="swiper-slide">
            <img src="${img}" alt="${desc}">
            <p>${desc}</p>
        </div>`;
        });
        $wrapper.html(str);
        $bannerBox.css('display', "block");
    };
    let swiperInit = function() {
        let swiper = new Swiper('.bannerBox', {
            loop: true,
            autoplay: {
                delay: 3000
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction'
            }
        });
    };
    return {
        init: function() {
            let promise = queryData();
            promise.then(bindHTML)
                .then(swiperInit);
        }
    }
})();

let messageBox = (function() {
    let $messageBox = $('.messageBox'),
        $wrapper = $messageBox.find('.swiper-wrapper');

    let queryData = function() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'aside.json',
                dataType: 'json',
                success: resolve
            });
        });
    };
    let bindHTML = function(result) {
        let str = ``;
        result.forEach(item => {
            let { title, link } = item;
            str += `<div class="swiper-slide">
            <a href="${link}">${title}</a>
        </div>`;
        });
        $wrapper.html(str);
        $messageBox.css('display', "block");
    };
    let swiperInit = function() {
        let swiper = new Swiper('.messageCon', {
            direction: 'vertical',
            loop: true,
            autoplay: {
                delay: 2000
            }
        });
    };
    return {
        init: function() {
            let promise = queryData();
            promise.then(bindHTML)
                .then(swiperInit);
        }
    }
})();

headerRender.init();
bannerRender.init();
messageBox.init();
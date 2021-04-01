let joinRender = (function() {
    let $selfDescription = $('#selfDescription'),
        $submit = $('#submit'),
        $descriptionSpan = $('.descriptionSpan');
    let fromURL = utils.queryURLParams()['fromURL'];
    fromURL ? fromURL = decodeURIComponent(fromURL) : fromURL = 'index.html';

    let submitFn = function() {
        //先检测是否符合规范
        let selfDescriptionVal = $selfDescription.val();

        if (selfDescriptionVal.length < 10 || selfDescriptionVal.length > 100) {
            $descriptionSpan.css('display', 'block');
            return;
        } else {
            $descriptionSpan.css('display', 'none');
        }
        axios.post('/match', {
            slogan: selfDescriptionVal
        }).then(result => {
            console.log(result);
            let { code } = result;
            if (parseFloat(code) === 1) {
                alert("已经参赛，请不要重复报名");
                return;
            }
            window.location.href = fromURL;
        });

    };

    return {
        init: function() {

            $submit.tap(() => {
                submitFn();
            });
        }
    }
})();
joinRender.init();
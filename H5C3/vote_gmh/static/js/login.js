let loginRender = (function($) {
    let $userName = $('#userName'),
        $userPassword = $('#userPassword'),
        $submit = $('#submit'),
        $errorSpan = $userPassword.next(),
        $nameSpan = $('.nameSpan');
    let fromURL = utils.queryURLParams()['fromURL'];
    fromURL ? fromURL = decodeURIComponent(fromURL) : fromURL = 'index.html';

    let submitFn = function() {
        //验证是否符合格式要求
        let passwordReg = /^\w{6,12}$/,
            passwordVal = $userPassword.val();
        nameReg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/,
            nameVal = $userName.val().trim();

        //验证用户名
        if (!nameReg.test(nameVal)) {
            $nameSpan.css('display', 'block');
            return;
        }

        //验证密码
        if (!passwordReg.test(passwordVal)) {
            $errorSpan.html('密码不符合规范!').css('display', 'block');
            return;
        }

        axios.post('/login', {
            name: nameVal,
            password: md5($userPassword.val().trim())
        }).then(result => {
            let code = parseFloat(result.code);
            if (code === 0) {
                //登录成功
                debugger;
                window.location.href = fromURL;
                return;
            }
            $errorSpan.html('用户名或密码错误，请检查!').css('display', 'block');

        });


    };
    return {
        init: function() {

            $('input').on('input', () => {
                $('.item').find('span').css('display', 'none');
            })
            $submit.tap(submitFn);
        }
    }
})(Zepto);
loginRender.init();
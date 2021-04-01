let registerRender = (function($) {
    let $userName = $('#userName'),
        $phone = $('#phone'),
        $passWord = $('#passWord'),
        $passwordOK = $('#passwordOK'),
        $selfDescription = $('#selfDescription'),
        $submit = $('#submit'),
        $registerSpan = $('.registerSpan'),
        $nameSpan = $('.nameSpan'),
        $passwordSpan = $('.passwordSpan'),
        $phoneSpan = $('.phoneSpan'),
        $passwordOKSpan = $('.passwordOKSpan'),
        $descriptionSpan = $('.descriptionSpan');
    let fromURL = utils.queryURLParams()['fromURL'];
    fromURL ? fromURL = decodeURIComponent(fromURL) : fromURL = 'index.html';

    let submitFn = function() {
        let value = $('input[name="sex"]:checked').val(),
            nameVal = $userName.val().trim(),
            nameReg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/,
            passwordVal = $passWord.val().trim(),
            passwordReg = /^\w{6,12}$/,
            phoneReg = /^\d{11}$/,
            phoneVal = $phone.val().trim(),
            passwordOKVal = $passwordOK.val().trim(),
            bioVal = $selfDescription.val();
        //验证是否符合格式要求
        //1. 验证真实姓名
        if (!nameReg.test(nameVal)) {
            $nameSpan.css('display', 'block');
            return;
        }

        //2. 验证手机号
        if (!phoneReg.test(phoneVal)) {
            $phoneSpan.css('display', 'block');
            return;
        }

        //3. 验证密码格式
        if (!passwordReg.test(passwordVal)) {
            $passwordSpan.css('display', 'block');
            return;
        }

        //4. 验证确认密码
        if (passwordOKVal !== passwordVal) {
            $passwordOKSpan.css('display', 'block');
            return;
        }

        //5. 验证自我描述
        if (bioVal.length < 10 || bioVal.length > 100) {
            $descriptionSpan.css('display', 'block');
            return;
        }

        axios.post('/register', {
            name: nameVal,
            phone: phoneVal,
            password: md5(passwordVal),
            sex: value,
            bio: bioVal
        }).then(result => {
            let code = parseFloat(result.code);
            if (code === 0) {
                //登录成功
                window.location.href = fromURL;
                return;
            }
            $registerSpan.css('display', 'block');


        });

    };
    return {
        init: function() {
            //初始化规范提示
            $('input').on('input', () => {
                $('.item').find('span').css('display', 'none');
            })
            $submit.tap(submitFn);
        }
    }
})(Zepto);
registerRender.init();
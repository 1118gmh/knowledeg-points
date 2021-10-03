/**
 * 导航插件:导入插件后，动态常见navBox，并且完成相关业务处理
 *  1. 进入登录页面或者注册页面，都会记录fromURL，当登录或者注册成功的时候，跳转到原有的页面
 *  2. 验证是否已经登录，展示不同的信息
 *  3. 完成其余的业务，例如：退出、点击用户名进入详情页等
 */
$(function() {
            let $mainBox = $('.mainBox'),
                navBox = null,
                navList = null;
            //检测是否登录
            axios.get('/checkLogin').then(result => {
                        let code = parseFloat(result.code);
                        $mainBox.prepend(`<nav class="navBox"><a href="index.html">首页</a>${code===0?`<a href="javascript:;">登录</a><a href="javascript:;">注册</a>`:`<a href="detail.html"></a><a href="javascript:;">退出</a>`}</nav>`);
                    $navBox = $mainBox.find('.navBox');
                    $navList = $navBox.find('a');
                        return code; 
    }).then(code=>{
        //未登录，则直接退出
        if(code === 0) return;
        //登录，则获取用户信息，展示对应的信息
        return axios.get('/getUser');  
    }).then(result=>{
        if(typeof result !== 'undefined'){
            let {data:{name}} = result;
            $navList.eq(1).html(name);
        }
    }).then(()=>{
        //基于事件托给navBox中的a绑定点击事件
        $navBox.tap(ev=>{
            let target = ev.target,
                tarTAG = target.tagName,
                tarINN = target.innerHTML;
            if(tarTAG !== 'A' ){
                return;
            }
            if(tarINN === '登录'){
                //window.location.href：当前页面地址
                window.location.href = `login.html?fromURL=${encodeURIComponent(window.location.href)}`;
                return;
            }
            if(tarINN ==='注册'){
                window.location.href = `register.html?fromURL=${encodeURIComponent(window.location.href)}`;
                return;
            }
            if(tarINN === '退出'){
                axios.get('/exitLogin');
                //刷新
                window.location.href = "index.html";
                return;
            }
        });
    });
});
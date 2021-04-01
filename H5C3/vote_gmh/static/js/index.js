let matchRender = function($) {
        let $userList = $('.userList'),
            $wrapper = $userList.find('ul'),
            $tip = $userList.find('.tip'),
            $headerBox = $('.headerBox'),
            $searchBth = $('.searchBth'),
            $sign = $('.sign'),
            $vote = $('.vote'),
            $voteNum = null;
        let limit = 10,
            page = 1,
            search = '',
            total = 0,
            pageNum = 1,
            flag = false;


        //获取数据
        let queryData = function queryData() {
            return axios.get("/getMatchList", {
                params: {
                    limit,
                    page,
                    search
                }
            }).then((result) => {
                pageNum = parseFloat(result.pageNum);
                total = parseFloat(result.total);
                return result;
            }).then(bindHTML);
        };
        let bindHTML = function bindHTML(result) {
                let { code, list = [] } = result;

                if (parseFloat(code) !== 0) {
                    //搜索不到数据
                    $wrapper.css('display', 'none');
                    $tip.css('display', 'block');
                    return;
                }
                //搜索到数据
                $wrapper.css('display', 'block');
                $tip.css('display', 'none');
                let str = '';

                list.forEach(item => {
                            let { id, name, picture, sex, matchId, slogan, voteNum, isVote } = item;
                            str += `<li>
            <a href="detail.html?userId=${id}">
                <img src="${picture}" alt="${name}">
                </a>
                <div class="information">
                    <span class="name">${name}</span> |
                    <span class="matchId">编号#${matchId}</span>
                    <br/>
                    <span class="slogan">${slogan}</span>
                </div>
                <span class="voteNum">${voteNum}</span>
                ${parseFloat(isVote)===0?`<div class="vote" id="${id}">投他一票</div>`:`<div class="voted">已投</div>`}
            
        </li>`;
        });
        $wrapper.append(str);
        $vote = $('.vote');
        $voteNum = $('.voteNum');
        $vote.tap(vote);
        str = null;
        flag = false;

        };
        
        //参加比赛时检测是否登录
        let matchCheckLogin = function matchCheckLogin(){
            axios.get('/checkLogin').then(res=>{
                if(res.code === 0){
                    alert("请先登录");
                }
                if(res.code === 1){
                    window.location.href = `join.html?fromURL=${encodeURIComponent(window.location.href)}`;
                }
            });
        };
        //投票
        let vote = function vote(){
            axios.get(`/vote?participantId=${this.id}`).then(res=>{
                if(res.code === 1){
                    alert("请先登录");
                }else{
                    return axios.get(`/getMatched?matchId=${this.id}`);
                }
            }).then(result=>{
                let {voteNum} = result.data;
                $(this).prev().html(voteNum);
                $(this).attr('class','voted').html(`已投`);
            });
        };
    return {
        init: function() {
            //开始展示第一页的数据
            queryData().then(()=>{
                //下拉加载更多
            $(window).on('scroll',()=>{
                let {
                    clientHeight,
                    scrollTop,
                    scrollHeight
                }= document.documentElement;

                if(scrollTop + clientHeight + 100 >= scrollHeight){
                    //正在加载中，则滚动不再加载
                    if(flag) return; 
                    //所有数据都加载完成了，也不再加载
                    if(page >= pageNum) return;
                    flag = true;
                    page++;
                    queryData();
                }
            });
            $searchBth.tap(()=>{
                if(flag) return;
                flag = true;
                search = $searchBth.prev('input').val().trim();
                //初始化page
                page = 1;

                //先清空容器，再绑定
                $wrapper.html('');
                queryData();
            });
            //点击参加比赛时判断是否登录
            $sign.tap(matchCheckLogin);

            });

            

        }
    }
}(Zepto);

matchRender.init();
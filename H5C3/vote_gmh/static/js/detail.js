let detailRender = (function($) {
            let userId = utils.queryURLParams()['userId'] || 0;
            let $headerBox = $('.headerBox'),
                $wrapper = $('.wrapper');

            let queryData = function() {
                    return axios.get(`/getUserMatchId?matchId=${userId}`).then(result => {
                            let { code, data } = result;
                            if (code === 0) {
                                alert('用户不存在');
                                return;
                            }
                            return data;
                        }).then(data => {
                                let { bio, matchId, isMatch, name, phone, picture, voteNum, slogan } = data;
                                isMatch = parseFloat(isMatch);
                                let str = `
            <img src="${picture}" alt="${name}">
            <div class="information">
                <span class="name">${name}</span> |
                <span class="matchId">${isMatch===1?`编号#${matchId}`:`未参赛`}</span>
                <br/>
                <span class="phone">${phone}</span>
            </div>
            <span class="voteNum">${isMatch===1?`${voteNum}票`:``}</span>
            <div class="slogan">${isMatch === 1?`${slogan}`:`${bio}`}</div>
            `;
            $headerBox.append(str);
            str = null;
        });
    };
    let queryDataVotePeople = function(){
        axios.get(`/getVoteMatched?matchId=${userId}`).then(result =>{
            console.log(result);
            let {code,list} = result;
            if(code === 1){
                alert("用户不存在");
                return;
            }
            return list;
        }).then(data=>{
            let str = ``;
            data.forEach(item=>{
                let {
                    picture,
                    name,
                    bio
                } = item;
                str += `
                <li>
                    <img src="${picture}" alt="${name}">
                    <div class="information">
                        <span class="name">${name}</span> <br>
                        <span class="bio">${bio}</span>
                    </div>
                </li>
                `;
            });
            $wrapper.append(str);
            str = null;
        });
    };

    return {
        init: function() {
            queryData().then(()=>{
                queryDataVotePeople();
            });
           
        }
    }
})(Zepto);

detailRender.init();
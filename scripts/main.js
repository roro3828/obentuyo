window.addEventListener('DOMContentLoaded', function(){

    update_link();
    if(true){
        twemoji.parse(document.body,{
            folder: 'svg',
            ext: '.svg'
        });
    }

    var t=getParam("t");
    var s=getParam("s");
    if(t && s){

        document.querySelector("#time_input").className="hidden";
        this.document.querySelector("#go_back").className="";
        t=parseInt(t,32);
        s=parseInt(s,32);
        var message=document.querySelector(".message");
        var share_button=document.querySelector(".share_text");

        if(a(t,s)){
            var interval_id=setInterval(a,1000,t,s);
        }
    }

    function a(t,s){
        let now=Math.floor(Date.now()/1000);
        if(t<now-s){
            message.textContent=strftime(t)+"おべんつよがんばった🎉🎊";
            share_button.href="https://twitter.com/intent/tweet?hashtags=おべんつよ&original_referer=https://おべんつよ.roro.icu/&url=https://おべんつよ.roro.icu/&text="+message.textContent;

            twemoji.parse(document.body,{
                folder: 'svg',
                ext: '.svg'
            });
            clearInterval(interval_id);
            return false;
        }
        else{
            let goal=t-now+s;
            let text="あと"+strftime(goal)+"! 頑張って!!";
            message.textContent=text;
            share_button.href="https://twitter.com/intent/tweet?hashtags=おべんつよ&original_referer=https://おべんつよ.roro.icu/&text="+text+"&url=https://おべんつよ.roro.icu/?s="+s.toString(32)+"%26t="+t.toString(32);
            return true;
        }
    }
});



function update_link(){
    let time_input=document.querySelector(".input_time");

    let t=time_input.value.split(":");
    let h=0;
    let m=0;
    if(t.length==2){
        h=parseInt(t[0]);
        m=parseInt(t[1]);
    }

    let variable_time=document.querySelector(".variable_time");
    let now=Math.floor(Date.now()/1000);

    variable_time.textContent=strftime(h*3600+m*60)+"おべんつよ";
    variable_time.href="https://twitter.com/intent/tweet?hashtags=おべんつよ&original_referer=https://おべんつよ.roro.icu/&text="+variable_time.textContent+"&url=https://おべんつよ.roro.icu/?s="+now.toString(32)+"%26t="+(h*3600+m*60).toString(32);
}

function strftime(time,show_s_anyway=false){
    let text="";

    let h=Math.floor(time/3600);
    let m=Math.floor((time%3600)/60);
    let s=time%60;
    if(h){
        text+=h+"時間";
    }
    if(m){
        text+=m+"分";
    }
    if(show_s_anyway){
        text+=s+"秒";
    }
    else if(!(h || m)){
        text+=s+"秒";
    }
    return text;
}

function getParam(name,url){
    if(!url){
    url = window.location.href;
    }
    name=name.replace(/[\[\]]/g,"\\$&");
    var regex=new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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
        t=parseInt(t,32);
        s=parseInt(s,32);
        let message=document.querySelector(".message");
        let share_button=document.querySelector(".share_text");

        setInterval(() => {
            let now=Math.floor(Date.now()/1000);
            if(t<now-s){
                message.textContent=strftime(t)+"おべんつよがんばった🎉🎊";
                share_button.href="https://twitter.com/intent/tweet?hashtags=おべんつよ&original_referer=https://おべんつよ.com/&url=https://おべんつよ.com&text="+message.textContent;
            }
            else{
                let goal=t-now+s;
                let text="あと"+strftime(goal)+"! 頑張って!!";
                message.textContent=text;
                share_button.href="https://twitter.com/intent/tweet?hashtags=おべんつよ&original_referer=https://おべんつよ.com/&text="+text+"&url=https://おべんつよ.com?s="+s.toString(32)+"%26t="+t.toString(32);
            }
        },1000);
    }

});

function update_link(){
    let time_input=document.querySelector(".input_time");
    let variable_time=document.querySelector(".variable_time");
    let now=Math.floor(Date.now()/1000);
    console.log(time_input.value);
    variable_time.textContent=time_input.value+"時間おべんつよ";
    variable_time.href="https://twitter.com/intent/tweet?hashtags=おべんつよ&original_referer=https://おべんつよ.com/&text="+variable_time.textContent+"&url=https://おべんつよ.com?s="+now.toString(32)+"%26t="+(parseInt(time_input.value,10)*3600).toString(32);
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
window.addEventListener('DOMContentLoaded', function(){

    update_link();

    var t=getParam("t");
    var s=getParam("s");
    if(t && s){

        document.querySelector("#time_input").className="hidden";

        t=parseInt(t,32);
        s=parseInt(s,32);
        var now=Math.floor(Date.now()/1000);
        var message=document.querySelector(".message");
        var share_button=document.querySelector(".share_text");
        if(t<now-s){
            message.textContent=Math.floor(t/3600)+"時間おべんつよがんばった🎉🎊";
            share_button.href="https://twitter.com/share?text="+message.textContent+"%0D%0A%23おべんつよ%0D%0A&url=https://おべんつよ.com";
        }
        else{
            var goal=t-now+s;
            var text="";
            if(Math.floor(goal/3600)){
                text=Math.floor(goal/3600)+"時間";
                goal%=3600;
            }
            if(Math.floor(goal/60)){
                text+=Math.floor(goal/60)+"分";
            }
            text="あと"+text+"! 頑張って!!";
            message.textContent=text;
            share_button.href="https://twitter.com/share?text="+text+"%0D%0A%23おべんつよ%0D%0A&url=https://おべんつよ.com?s="+s.toString(32)+"%26t="+t.toString(32);
        }
    }

    if(true){
        twemoji.parse(document.body,{
            folder: 'svg',
            ext: '.svg'
        });
    }
});

function update_link(){
    let time_input=document.querySelector(".input_time");
    let variable_time=document.querySelector(".variable_time");
    let now=Math.floor(Date.now()/1000);
    console.log(time_input.value);
    variable_time.textContent=time_input.value+"時間おべんつよ";
    variable_time.href="https://twitter.com/share?text="+variable_time.textContent+"%0D%0A%23おべんつよ%0D%0A&url=https://おべんつよ.com?s="+now.toString(32)+"%26t="+(parseInt(time_input.value,10)*3600).toString(32);
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
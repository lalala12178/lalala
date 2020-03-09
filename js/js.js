window.onload=function(){
    //获取dom元素


    var nList = document.querySelectorAll("#head .wrap .nav > li");
    var pList = document.querySelectorAll("#content .point > li");


    var index = 0;

    var preIndex = 0;



    //
    var arrowEl = document.querySelector("#head .headMain > .arrow");
    var liNodes = document.querySelectorAll("#head .headMain > .nav > .list > li");
    var upNodes = document.querySelectorAll("#head .headMain > .nav > .list > li .up");
    var firstLiNode  = liNodes[0];
    var firstUpNode  = firstLiNode.querySelector(".up");

    var head = document.querySelector("#head") ;
    var content = document.querySelector("#content") ;
    var cLiNodes = document.querySelectorAll("#content .list > li");
    var cList =  document.querySelector("#content .list");
    var mask = document.querySelector("#mask");
    var line = document.querySelector("#mask .line");
    var mians = document.querySelectorAll("#mask div");

    var home2LiNodes = document.querySelectorAll("#content > .list > .home .home2 > li");
    var home1LiNodes = document.querySelectorAll("#content > .list > .home .home1 > li");
    var home1 = document.querySelector("#content > .list > .home .home1");

    var aboutUls = document.querySelectorAll("#content > .list > .about .about3 > .item > ul");

    var dotLis = document.querySelectorAll("#content > .dot > li");
    //同步当前屏的索引   this.index---同步---now   now----不同步---  this.index
    var now =0;
    var timer = 0;

    //开机动画
    loadingAn();
    function loadingAn(){
        var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','wuhan.jpeg','ego.JPG'];
        var flag =0;
        for(var i=0;i<arr.length;i++){
            var img = new Image();
            img.src="img/"+arr[i];
            img.onload=function(){
                flag++;
                line.style.width = flag/arr.length*100+"%";
            }
        }

        line.addEventListener("transitionend",function(){
            if(flag === arr.length){
                for(var i=0;i<mians.length;i++){
                    mians[i].style.height=0+"px";
                }
                this.style.display="none";
            }
        })

        mians[0].addEventListener("transitionend",function(){
            mask.remove();

        })
    }


    // 出入场动画
    var animationAttr = [
        {
            inAn:function(){
                var img = document.querySelector("#content .list > .home1 img");
                setTimeout(function(){

                },1000)
            },
            outAn:function(){
                var img = document.querySelector("#content .list > .home1 img");
                setTimeout(function(){

                },1000)
            }
        },
        {
            inAn:function(){
                var li1 = document.querySelector("#content .list > .home2 .left .pics li:nth-child(1)");
                var li2 = document.querySelector("#content .list > .home2 .left .pics li:nth-child(2)");
                var li3 = document.querySelector("#content .list > .home2 .left .pics li:nth-child(3)");


                setTimeout(function(){
                    li1.style.transform = "translateY(0px)";
                    li1.style.opacity = 1;

                },800);
                setTimeout(function(){
                    li2.style.transform = "translateY(0px)";
                    li2.style.opacity = 1;
                },1000);
                setTimeout(function(){
                    li3.style.transform = "translateY(0px)";
                    li3.style.opacity = 1;

                },1200);

            },
            outAn:function(){
                var li1 = document.querySelector("#content .list > .home2 .left .pics li:nth-child(1)");
                var li2 = document.querySelector("#content .list > .home2 .left .pics li:nth-child(2)");
                var li3 = document.querySelector("#content .list > .home2 .left .pics li:nth-child(3)");


                setTimeout(function(){
                    li1.style.transform = "translateY(600px)";
                    li1.style.opacity = 0;
                },1000);
                setTimeout(function(){
                    li2.style.transform = "translateY(600px)";
                    li2.style.opacity = 0;
                },1200);
                setTimeout(function(){
                    li3.style.transform = "translateY(600px)";
                    li3.style.opacity = 0;

                },1400);
            }
        },

    ]

    for(var i=1;i<animationAttr.length;i++){

        animationAttr[i]["outAn"]();

    };





    //内容区
    window.onresize=function(){
        /*
         调整分辨率
            1.没有点击的时候视口只能出现一屏  contentBind();
            2.点击后视口只能出现一屏  在1的基础上对每一屏的偏移量进行重新调整
            3.小箭头的位置也需要头部
        */
        contentBind();
        cList.style.top = -now*(document.documentElement.clientHeight - head.offsetHeight)+"px";

    }


    //内容区交互
    window.onresize=function(){
        /*
         调整分辨率
            1.没有点击的时候视口只能出现一屏  contentBind();
            2.点击后视口只能出现一屏  在1的基础上对每一屏的偏移量进行重新调整
            3.小箭头的位置也需要头部
        */
        contentBind();
        cList.style.top = -now*(document.documentElement.clientHeight - head.offsetHeight)+"px";
        arrowEl.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth/2 - arrowEl.offsetWidth/2+"px";
    }

//滚轮事件
    if(content.addEventListener){
        content.addEventListener("DOMMouseScroll",function(ev){
            ev=ev||event;

            //让fn的逻辑在DOMMouseScroll事件被频繁触发的时候只执行一次
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn(ev)
            },200)

        });
    }
    content.onmousewheel=function(ev){
        ev=ev||event;
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn(ev)
        },200)
    };
    function fn(ev){
        ev=ev||event;

        var dir="";
        if(ev.wheelDelta){
            dir = ev.wheelDelta>0?"up":"down";
        }else if(ev.detail){
            dir = ev.detail<0?"up":"down";
        }
        if((now==0&&dir=="up")||(now==cLiNodes.length-1&&dir=="down")){
            return;
        }
        preIndex =now;

        switch (dir){
            case "up":
                if(now>0){
                    now--;
                    move(now);
                }
                break;
            case "down":
                if(now<cLiNodes.length-1){
                    now++;
                    move(now);
                }
                break;
        }
    }

    contentBind();
    function contentBind(){
        content.style.height = document.documentElement.clientHeight - head.offsetHeight+'px';
        for(var i=0;i<cLiNodes.length;i++){
            cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight+'px';
        }
    }


    //头部交互
    headBind();
    function headBind(){
        firstUpNode.style.width = "100%";
        arrowEl.style.left = firstLiNode.offsetLeft + firstLiNode.offsetWidth/2 - arrowEl.offsetWidth/2+"px";
        for(var i=0;i<liNodes.length;i++){
            //转绑很重要
            liNodes[i].index = i;
            liNodes[i].onclick=function(){
                //i:liNodes.length 5
                move(this.index);
                now = this.index;
            }

        }
        for(var i=0;i<dotLis.length;i++){
            //转绑很重要
            dotLis[i].index = i;
            dotLis[i].onclick=function(){
                //i:liNodes.length 5
                preIndex =now;
                move(this.index);
                now = this.index;
            }
        }
    }
    //动画的核心函数
    //move(4);
    function move(index){
        for(var i=0;i<upNodes.length;i++){
            //upNodes[i].style.width="0";
            upNodes[i].style.width="";
        }
        upNodes[index].style.width="100%";
        arrowEl.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth/2 - arrowEl.offsetWidth/2+"px";
        cList.style.top = -index*(document.documentElement.clientHeight - head.offsetHeight)+"px";

        for(var i=0;i<dotLis.length;i++){
            dotLis[i].className="";
        }
        dotLis[index].className="active";
        //出入场逻辑
        if(animationAttr[index]&&animationAttr[index]["inAn"]){
            animationAttr[index]["inAn"]();
        }
        if(animationAttr[preIndex]&&animationAttr[preIndex]["outAn"]){
            animationAttr[preIndex]["outAn"]();
        }

    }
}

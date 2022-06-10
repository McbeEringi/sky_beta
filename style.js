document.body.insertAdjacentHTML('afterbegin',`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=M+PLUS+Rounded+1c&display=swap" media="print" onload="this.media='all'"><style>
:root{
	--bc:#222;--fc:#fff;--l:#fea;
	--b0:#48f;--b1:#8af;--b2:#aef;
	--p0:#84f;--p1:#a8f;--p2:#eaf;
	background-color:var(--bc);
}
*{-webkit-tap-highlight-color:#0000;}
#bg{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-16;transition:background 1s;pointer-events:none;background:center/cover;user-select:none;-webkit-user-select:none;}#bgi{width:100vmin;height:auto;float:right;transform:translateX(25%);}
:root{color:var(--fc);font-family:"M PLUS Rounded 1c",sans-serif;}
:link{color:var(--b2);}:link:hover{color:var(--b1);}:link:active{color:var(--b0);}:visited{color:var(--p2);}:visited:hover{color:var(--p1);}:visited:active{color:var(--p0);}

.alert{position:fixed;top:0;left:0;width:100%;height:100%;z-index:16;transition:.2s;}
.alert.fade{opacity:0;pointer-events:none;}
.alert>.bg{width:100%;height:100%;margin:0;background-color:#0004;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);}
.alert>.cont{position:absolute;background-color:#000c;top:50%;left:50%;max-width:calc(100% - 64px);max-height:calc(100% - 64px);margin:0;padding:16px;border-radius:16px;box-sizing:border-box;transform:translate(-50%,-50%);white-space:pre-wrap;overflow:auto;overflow-wrap:break-word;}

</style>
<div id="bg"><img id="bgi" src="https://mcbeeringi.github.io/sky_beta/img/icon_.svg" width="1" height="1"></div>
`);
alert=(x,e=document.body)=>{
	const wrap=document.createElement('div'),bg=document.createElement('p'),cont=document.createElement('p');
	wrap.classList.add('alert','fade');bg.classList.add('bg');cont.classList.add('cont');
	bg.onclick=()=>{wrap.ontransitionend=()=>wrap.remove();wrap.classList.add('fade');};
	cont.insertAdjacentHTML('beforeend',x);
	wrap.append(bg,cont);e.append(wrap);
	wrap.offsetWidth;wrap.classList.remove('fade');
	return cont;
};
const getAlert=()=>[...document.querySelectorAll('.alert:not(.fade)>.cont')],
	rmAlert=(e=getAlert().pop())=>e.parentNode.querySelector('.bg').onclick();
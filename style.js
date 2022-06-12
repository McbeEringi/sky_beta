'use strict';
let idb=indexedDB.open('sky_idb',4);
idb.onupgradeneeded=e=>{console.log('IDB UPG',e=idb.result);[['stuff'],['seq',{keyPath:'name'}],['instr',{keyPath:'name'}]].forEach(x=>e.objectStoreNames.contains(x[0])||e.createObjectStore(...x));};
idb.onsuccess=e=>{console.log('IDB OK',idb=idb.result);e=()=>dispatchEvent(new Event('idbready'));if(document.readyState=='loading')addEventListener('DOMContentLoaded',e);else e();bgset();};
idb.onerror=e=>{console.log('IDB ERR',idb,e);idb=null;bgset();};
const bgset=()=>{

	},
	getAlert=()=>[...document.querySelectorAll('.alert:not(.fade)>.cont')],
	rmAlert=(e=getAlert().pop())=>e.parentNode.querySelector('.bg').onclick();
alert=x=>{
	const wrap=document.createElement('div'),bg=document.createElement('p'),cont=document.createElement('p');
	wrap.classList.add('alert','fade');bg.classList.add('bg');cont.classList.add('cont');
	bg.onclick=()=>{wrap.ontransitionend=()=>wrap.remove();wrap.classList.add('fade');};
	cont.insertAdjacentHTML('beforeend',x);
	wrap.append(bg,cont);document.body.append(wrap);
	wrap.offsetWidth;wrap.classList.remove('fade');
	return cont;
};
setTimeout(()=>{bgset();setInterval(bgset,36e5);},36e5-(Date.now()%36e5));bgset();
addEventListener('keydown',e=>{
	const al=getAlert();
	if(e.key=='Escape'){
		if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName))document.activeElement.blur(e.preventDefault());
		else if(al.length)rmAlert(al.pop(),e.preventDefault());
	}
});

document.body.insertAdjacentHTML('afterbegin',`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=M+PLUS+Rounded+1c&display=swap" media="print" onload="this.media='all'"><style>
:root,.input{
	--bc:#222;--fc:#fff;--l:#fea;
	--g:#8884;
	--b0:#48f;--b1:#8af;--b2:#aef;
	--p0:#84f;--p1:#a8f;--p2:#eaf;
	background-color:var(--bc);
	color:var(--fc);font-family:"M PLUS Rounded 1c",sans-serif;text-shadow:.1ex .1ex .5ex var(--bc);
}
*{-webkit-tap-highlight-color:#0000;}
#bg{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-16;transition:background 1s;background:center/cover;pointer-events:none;user-select:none;-webkit-user-select:none;}#bgi{width:100vmin;height:auto;float:right;transform:translateX(25%);}
:link{color:var(--b2);}:link:hover{color:var(--b1);}:link:active{color:var(--b0);}:visited{color:var(--p2);}:visited:hover{color:var(--p1);}:visited:active{color:var(--p0);}

.input{background-color:var(--g);margin:8px 0;padding:8px;border:2px solid #0000;border-radius:8px;outline:0;box-sizing:border-box;max-width:100%;resize:none;}
.input:focus{border-color:var(--l);}

.alert{position:fixed;top:0;left:0;width:100%;height:100%;z-index:16;transition:.2s;}.alert *{transition:.2s;}
.alert>.bg{width:100%;height:100%;margin:0;background-color:#0004;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);}
.alert>.cont{position:absolute;background-color:#000c;top:50%;left:50%;max-width:calc(100% - 64px);max-height:calc(100% - 64px);margin:0;padding:16px;border-radius:16px;box-sizing:border-box;transform-origin:top center;transform:translate(-50%,-50%);white-space:pre-wrap;overflow:auto;overflow-wrap:break-word;}
.alert.fade{opacity:0;pointer-events:none;}
.alert.fade>.cont{transform:translate(-50%,calc(-50% - 32px));}
.alert:nth-last-of-type(n+2)>.cont{opacity:.5;top:100%;visibility:hidden;transform:translate(-50%,0)scale(.8);}
.alert:nth-last-of-type(n+3)>.bg{opacity:0;}

</style>
<div id="bg"><img id="bgi" src="https://mcbeeringi.github.io/sky_beta/img/icon_.svg" width="1" height="1"></div>
`);
'use strict';
if('serviceWorker'in navigator&&location.protocol.includes('https'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').then(x=>{console.log('sw Registered',x);}),{once:true});
localStorage.sky_bgcode||(localStorage.sky_bgcode='linear-gradient(60deg,#214,#415)');
localStorage.sky_bgmode||(localStorage.sky_bgmode=0);
localStorage.sky_bgmode
let idb=indexedDB.open('sky_idb',4),
	tex=new Image(),
	texts={
		back2top:'Back to Top',bgcfg:'Background Config',bgi:'Background Image',bgil:['Dynamic','Photo','CSS Code'],bgs:'Background Sound',bgsl:['None','Hotspring','Home','Forest','Vault'],
		...{
			ja:{
				back2top:'トップに戻る',bgcfg:'背景設定',bgi:'背景画像',bgil:['ダイナミック','画像','CSSコード'],bgs:'背景音',bgsl:['なし','温泉','ホーム','雨林','書庫'],
			}
		}[navigator.language.slice(0,2)]
	};
const bgset=(x=-1)=>{
		const bgcol=['#dca,#ac8','#bde,#ac8','#f80,#fb7','#112,#126','#bbc,#ac8'],//morn day dusk night cloud
		url='https://mcbeeringi.github.io/sky/img/photo/performance.jpg';
		({
			0:()=>{bgi.hidden=false;bg.style.backgroundImage=`linear-gradient(${bgcol[~x?x:[3,3,3,3,3,0,0,0,0,4,1,1,1,1,1,1,4,2,2,2,2,3,3,3][new Date().getHours()]]})`;},
			1:()=>{bgi.hidden=true;e2p(idbos().get('bgimg')).then(e=>bg.style.backgroundImage=`url(${e.target.result?URL.createObjectURL(e.target.result):url})`).catch(e=>bg.style.backgroundImage=`url(${url})`);},
			2:()=>{bgi.hidden=true;bg.style.backgroundImage=localStorage.sky_bgcode;}
		})[~x?0:localStorage.sky_bgmode]();
	},
	bgcfg=()=>{
		const e=alert(`${texts.bgcfg}<hr>
			${texts.bgi}
			<div class="items" style="--items:170px;">
				<div><input type="radio" name="bgicfg" value="0" id="bgicfg0"><label for="bgicfg0" class="btn" style="--bp:-400% 0;"></label><div>${texts.bgil[0]}</div></div>
				<div><input type="radio" name="bgicfg" value="1" id="bgicfg1"><label for="bgicfg1" class="btn" style="--bp:-400% 0;"></label><div>${texts.bgil[1]}<br>
					<button class="btn" style="--bp:-600% -400%;" onclick="this.childNodes[0].click();"><input tabindex="-1" type="file" style="width:100%;height:100%;opacity:0;" accept="image/*" onclick="event.stopPropagation();" onchange="e2p(idbos().put(this.files[0],'bgimg')).then(()=>bgset()).catch(alert);">
					</button><button class="btn" style="--bp:-400% -300%;" onclick="e2p(idbos().delete('bgimg')).then(()=>bgset()).catch(alert);">
					</button>
				</div></div>
				<div><input type="radio" name="bgicfg" value="2" id="bgicfg2"><label for="bgicfg2" class="btn" style="--bp:-400% 0;"></label><div>${texts.bgil[2]}<br>
					<button class="btn bgicedt" style="--bp:-400% -400%;"></button>
				</div></div>
			</div>
			${texts.bgs}
			<div class="items" style="--items:120px;">
				${texts.bgsl.map((x,i)=>'<label><input type="radio" name="bgscfg" value="'+i+'" id="bgscfg'+i+'"><label for="bgscfg'+i+'" class="btn" style="--bp:-400% 0;"></label>'+x+'</label>').join('')}
			</div>
		`);
		e.querySelector(`input[type=radio][name=bgicfg][value="${localStorage.sky_bgmode}"]`).checked=true;
		e.querySelectorAll(`input[type=radio][name=bgicfg]`).forEach(x=>x.onchange=()=>(localStorage.sky_bgmode=x.value,bgset()));
		e.querySelector('.bgicedt').onclick=()=>alert(`<textarea class="input" rows="8" cols="40" oninput="(localStorage.sky_bgmode==2&&(localStorage.sky_bgcode=this.value,bgset()));">${localStorage.sky_bgcode}</textarea>`).querySelector('textarea').focus();
	},
	getAlert=()=>[...document.querySelectorAll('.alert:not(.fade)>.cont')],
	rmAlert=(e=getAlert().pop())=>e.parentNode.querySelector('.bg').onclick(),
	idbos=(x='stuff')=>idb.transaction(x,'readwrite').objectStore(x),
	e2p=x=>new Promise((f,r)=>Object.assign(x,{onsuccess:f,onerror:r}));
idb.onupgradeneeded=e=>{console.log('IDB UPG',e=idb.result);[['stuff'],['seq',{keyPath:'name'}],['instr',{keyPath:'name'}]].forEach(x=>e.objectStoreNames.contains(x[0])||e.createObjectStore(...x));};
idb.onsuccess=e=>{console.log('IDB OK',idb=idb.result);e=()=>dispatchEvent(new Event('idbready'));if(document.readyState=='loading')addEventListener('DOMContentLoaded',e);else e();bgset();};
idb.onerror=e=>{console.log('IDB ERR',idb,e);idb=null;bgset();};
Object.assign(new Image(),{onerror:()=>document.body.classList.add('nowebp'),src:'img/atlas1.webp'});
document.body.insertAdjacentHTML('afterbegin',`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=M+PLUS+Rounded+1c&display=swap" media="print" onload="this.media='all'"><style>
@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
:root,.input,.btn{
	--bc:#222;--fc:#fff;--l:#fea;--b0:#48f;--b1:#8af;--b2:#aef;--p0:#84f;--p1:#a8f;--p2:#eaf;
	--g:#3338;--btn:64px;--bp:0 0;--items:200px;
	background-color:var(--bc);color:var(--fc);font-family:"M PLUS Rounded 1c",sans-serif;text-shadow:0 0 4px var(--bc);
}
*{-webkit-tap-highlight-color:#0000;}
:link{color:var(--b2);}:link:hover{color:var(--b1);}:link:active{color:var(--b0);}:visited{color:var(--p2);}:visited:hover{color:var(--p1);}:visited:active{color:var(--p0);}
hr{border:1px solid #fff8;border-radius:1px;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);}
#bg{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-16;transition:background 1s;background:center/cover;pointer-events:none;user-select:none;-webkit-user-select:none;}
#bgi{width:100vmin;height:auto;float:right;transform:translateX(25%);filter:drop-shadow(0 0 16px var(--l))blur(4px)opacity(.2);}

.input{background-color:var(--g);margin:8px 0;padding:8px;border:0;border-radius:8px;outline:0;box-sizing:border-box;max-width:100%;resize:none;}
.input:focus{box-shadow:0 0 0 2px var(--l);}

.alert{position:fixed;top:0;left:0;width:100%;height:100%;z-index:16;transition:.2s;}.alert *{transition:.2s;}
.alert>.bg{width:100%;height:100%;margin:0;background-color:#0004;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);}
.alert>.cont{position:absolute;background-color:#000c;top:50%;left:50%;max-width:calc(100% - 64px);max-height:calc(100% - 64px);margin:0;padding:16px;border-radius:16px;box-sizing:border-box;transform-origin:top center;transform:translate(-50%,-50%);overflow:auto;overflow-wrap:break-word;}
.alert.fade{opacity:0;pointer-events:none;}
.alert.fade>.cont{transform:translate(-50%,calc(-50% - 32px));}
.alert:nth-last-of-type(n+2)>.cont{opacity:.5;top:100%;visibility:hidden;transform:translate(-50%,0)scale(.8);}
.alert:nth-last-of-type(n+3)>.bg{opacity:0;}

.btn{position:relative;vertical-align:middle;display:inline-block;width:var(--btn);height:var(--btn);margin:0;padding:0;border:0;outline:0;background:none;overflow:hidden;}
.btn,.btn *{touch-action:manipulation;cursor:pointer;}
.btn::before,.btn::after{content:"";position:absolute;top:0;left:0;display:block;width:80%;height:80%;margin:10%;border-radius:25%;box-sizing:border-box;}
.btn::before{background:var(--bp_,var(--bp))/800% var(--g);}.btn::after{content:none;}
.btn::before{background-image:url(img/atlas0.svg);}.btn.a1::before{background-image:url(img/atlas1.webp);}.nowebp .btn.a1::before{background-image:url(img/atlas1.png);}
:focus:not(.btn)+.btn::before,.btn:focus::before{box-shadow:0 0 0 calc(var(--btn)*.01) var(--l) inset;}
:checked:not(.btn)+.btn::after,.btn.a::after{content:"";border:calc(var(--btn)*.2) solid #00000001;border-image:url(img/sel.svg) 32%;}:checked+.btn,.btn.a{transform:rotateY(360deg);transition:transform .5s;}
:disabled:not(.btn)+.btn,.btn.d,.d .btn{filter:grayscale(1)opacity(.5);pointer-events:none;}
.btn:active::before,.btn:active::after{transform:scale(.85);}.btn:not(:active)::before,.btn:not(:active)::after{transition:transform .2s;}
.spin{--bp:-200% 0;--g:#0000;animation:2s linear spin infinite;pointer-events:none;}
.clock::before{--bp:-200% -0%;filter:saturate(.3);}.clock::after{content:"";transition:.2s;transform:rotate(var(--rot,45deg));filter:drop-shadow(0 0 2px #aef);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Cpath d='M6 6h1v1h-1z' fill='%23caf0f6'/%3E%3C/svg%3E");}
.clock.d::after,.d .clock::after{--rot:initial;}

.items{display:grid;max-width:100%;width:100vw;grid-template-columns:repeat(auto-fill,minmax(min(var(--items),100%),1fr));grid-auto-rows:1fr;grid-gap:8px;}
.items::after{content:"";grid-column:1/-1;}
.items input[type=radio]{position:absolute;opacity:0;pointer-event:none;}
.items>*{box-sizing:border-box;padding:4px;display:flex;align-items:center;}
.items>* .btn{--btn:44px;}
.items>*>.btn{--btn:60px;flex-shrink:0;align-self:start;}
</style>
<div id="bg"><img id="bgi" src="img/icon_.svg" width="1" height="1"></div>
`);
alert=x=>{
	const wrap=document.createElement('div'),bg=document.createElement('p'),cont=document.createElement('p');
	wrap.classList.add('alert','fade');bg.classList.add('bg');cont.classList.add('cont');
	bg.onclick=()=>{wrap.ontransitionend=()=>wrap.remove();wrap.classList.add('fade');};
	cont.insertAdjacentHTML('beforeend',x);
	wrap.append(bg,cont);document.body.append(wrap);
	wrap.offsetWidth;wrap.classList.remove('fade');
	return cont;
};
addEventListener('keydown',e=>{
	const al=getAlert();
	if(e.key=='Escape'){
		if(document.activeElement.matches('input:not([type=radio]),textarea'))document.activeElement.blur(e.preventDefault());
		else if(al.length)rmAlert(al.pop(),e.preventDefault());
	}
});
tex.onload=()=>{
	const c=document.createElement('canvas');c.width=tex.naturalWidth;c.height=tex.naturalHeight;
	c.getContext('2d').drawImage(tex,0,0,c.width,c.height);tex=c;dispatchEvent(new Event('texready'))
	document.body.insertAdjacentHTML('beforeend',`<style>.btn::before{background-image:url(${c.toDataURL()});}</style>`);
};tex.src='img/atlas0.svg';
{const bg_=()=>localStorage.sky_bgmode=='0'&&bgset();setTimeout(()=>{bg_();setInterval(bg_,36e5);},36e5-(Date.now()%36e5));bg_();}

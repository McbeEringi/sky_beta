document.body.insertAdjacentHTML('afterbegin',`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=M+PLUS+Rounded+1c&display=swap" media="print" onload="this.media='all'"><style>
:root{
	--bc:#222;--fc:#fff;--l:#fea;
	--b0:#48f;--b1:#8af;--b2:#aef;
	--p0:#84f;--p1:#a8f;--p2:#eaf;
	background-color:var(--bc);
}
*{-webkit-tap-highlight-color:#0000;}
#bg{position:fixed;width:100%;height:100%;z-index:-1;transition:background 1s;pointer-events:none;background:center/cover;user-select:none;-webkit-user-select:none;}#bgi{width:100vmin;height:auto;float:right;transform:translateX(25%);}
:root{color:var(--fc);font-family:"M PLUS Rounded 1c",sans-serif;}
:link{color:var(--b2);}:link:hover{color:var(--b1);}:link:active{color:var(--b0);}:visited{color:var(--p2);}:visited:hover{color:var(--p1);}:visited:active{color:var(--p0);}
</style>
<div id="bg"><img id="bgi" src="https://mcbeeringi.github.io/sky_beta/img/icon_.svg" width="1" height="1"></div>
`);
addEventListener('DOMContentLoaded',()=>document.body.insertAdjacentHTML('beforeend',``));
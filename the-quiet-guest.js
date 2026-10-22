
(function(){
const NS="http://www.w3.org/2000/svg";
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const chip=c=>({F:'<span class="chip fact">FACT</span>',R:'<span class="chip rep">REPORTED</span>',I:'<span class="chip inf">INFERENCE</span>',W:'<span class="chip watch">WATCH</span>'})[c];
const RM=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const C={ink:"#1c2836",ink2:"#3f4c5c",ink3:"#6d7887",rule:"#e2dccf",sky:"#3f7fbf",sky2:"#8fbbe3",gold:"#b8790f",gold2:"#f2c56b",paper:"#fffdf8"};
const G=a=>`rgba(184,121,15,${a})`, B=a=>`rgba(63,127,191,${a})`, K=a=>`rgba(28,40,54,${a})`;
const TAU=Math.PI*2, ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;

/* reveals */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(n=>io.observe(n));

/* a canvas that sizes itself, and animates only while on screen */
function stage(cv,draw){
  const ctx=cv.getContext("2d");let W=1,H=1,D=1,vis=false,raf=0;const t0=performance.now();
  const now=()=>(performance.now()-t0)/1000;
  function size(){D=Math.min(2,devicePixelRatio||1);const r=cv.getBoundingClientRect();W=Math.max(1,r.width);H=Math.max(1,r.height);cv.width=Math.round(W*D);cv.height=Math.round(H*D);ctx.setTransform(D,0,0,D,0,0);}
  function frame(){draw(ctx,W,H,now(),D);if(vis&&!RM)raf=requestAnimationFrame(frame);}
  size();
  new ResizeObserver(()=>{size();draw(ctx,W,H,now(),D);}).observe(cv);
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;cancelAnimationFrame(raf);if(vis)raf=requestAnimationFrame(frame);}).observe(cv);
  return{redraw(){if(!vis||RM)draw(ctx,W,H,now(),D);}};
}
/* pixelated, flipped reflection of the band [0,hz) into [hz,2hz) */
const off=document.createElement("canvas"),octx=off.getContext("2d");
function reflect(ctx,cv,W,hz,D,px,alpha,H){
  if(alpha<=0.01)return;
  const w=Math.max(2,Math.ceil(W/px)),h=Math.max(2,Math.ceil(hz/px));off.width=w;off.height=h;
  octx.imageSmoothingEnabled=true;octx.clearRect(0,0,w,h);octx.drawImage(cv,0,0,W*D,hz*D,0,0,w,h);
  ctx.save();ctx.beginPath();ctx.rect(0,hz,W,H-hz);ctx.clip();ctx.translate(0,2*hz);ctx.scale(1,-1);ctx.imageSmoothingEnabled=false;ctx.globalAlpha=alpha;ctx.drawImage(off,0,0,w,h,0,0,W,hz);ctx.restore();
}
function vesica(ctx,x,y,w,h){ctx.beginPath();ctx.moveTo(x-w,y);ctx.quadraticCurveTo(x,y-h*2,x+w,y);ctx.quadraticCurveTo(x,y+h*2,x-w,y);ctx.closePath();}

/* ---------- hero: a rose of rings, an orbit of light, a lens that watches, and a horizon that records ---------- */
(function(){
  const cv=document.getElementById("hero3");if(!cv)return;
  const hero=cv.closest(".hero");
  const P=Array.from({length:520},()=>({a:Math.random()*TAU,r:.25+Math.pow(Math.random(),.7)*1.25,w:(.03+Math.random()*.09)*(Math.random()<.5?-1:1),s:.5+Math.random()*1.6,ph:Math.random()*TAU}));
  let mx=null,my=null,lx=0,ly=0,init=false;
  hero.addEventListener("pointermove",e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;});
  hero.addEventListener("pointerleave",()=>{mx=null;});
  stage(cv,(ctx,W,H,t,D)=>{
    const wide=W>860, cx=wide?W*.74:W*.5, cy=wide?H*.42:H*.2, R=wide?Math.min(W*.18,H*.27):Math.min(W*.28,H*.11);
    const hz=Math.min(H-10,cy+R*1.5);
    ctx.clearRect(0,0,W,H);
    const rot=t*.035, r0=R/3;
    // flower of life: 19 circles on a hex lattice
    ctx.lineWidth=.8;
    for(let q=-2;q<=2;q++)for(let s=-2;s<=2;s++){if(Math.abs(q+s)>2)continue;
      const x0=r0*(q+s/2),y0=r0*(s*Math.sqrt(3)/2),x=cx+x0*Math.cos(rot)-y0*Math.sin(rot),y=cy+x0*Math.sin(rot)+y0*Math.cos(rot);
      ctx.strokeStyle=G(.32);ctx.beginPath();ctx.arc(x,y,r0,0,TAU);ctx.stroke();}
    ctx.strokeStyle=G(.5);ctx.beginPath();ctx.arc(cx,cy,R,0,TAU);ctx.stroke();
    // metatron's cube: 13 nodes, every pair joined
    const N=[[cx,cy]];for(let k=0;k<6;k++){const a=k*TAU/6-rot*1.6;N.push([cx+Math.cos(a)*r0*1.732,cy+Math.sin(a)*r0*1.732]);N.push([cx+Math.cos(a+TAU/12)*r0,cy+Math.sin(a+TAU/12)*r0]);}
    ctx.strokeStyle=B(.13);ctx.lineWidth=.7;ctx.beginPath();for(let i=0;i<N.length;i++)for(let j=i+1;j<N.length;j++){ctx.moveTo(N[i][0],N[i][1]);ctx.lineTo(N[j][0],N[j][1]);}ctx.stroke();
    N.forEach(n=>{ctx.fillStyle=C.paper;ctx.strokeStyle=B(.55);ctx.beginPath();ctx.arc(n[0],n[1],2.4,0,TAU);ctx.fill();ctx.stroke();});
    // data rings: 73 of 100 (hybrid worship), 8 of 100 (online only)
    const ring=(rad,lit,col,lw,sp)=>{for(let i=0;i<100;i++){const a=-Math.PI/2+i*TAU/100+sp,on=i<lit;ctx.strokeStyle=on?col:K(.08);ctx.lineWidth=on?lw:1;ctx.beginPath();ctx.arc(cx,cy,rad,a+.008,a+TAU/100-.008);ctx.stroke();}};
    ring(R*1.12,73,G(.85),3.2,-rot*.4);ring(R*1.22,8,B(.9),3.2,rot*.25);
    // the lens: follows the pointer, otherwise wanders the orbit
    const tx=mx!=null?mx:cx+Math.cos(t*.21)*R*1.05, ty=mx!=null?my:cy+Math.sin(t*.29)*R*.55;
    if(!init){lx=tx;ly=ty;init=true;}lx+=(tx-lx)*.06;ly+=(ty-ly)*.06;
    const LR=R*.42;
    // particles
    for(const p of P){
      const a=p.a+t*p.w,rad=p.r*R,x=cx+Math.cos(a)*rad,y=cy+Math.sin(a)*rad*.96;
      const dx=x-lx,dy=y-ly,d=Math.hypot(dx,dy);let X=x,Y=y,seen=false;
      if(d<LR*1.4&&d>.1){const f=(1-d/(LR*1.4));X+=dx/d*f*16;Y+=dy/d*f*16;seen=true;}
      if(Y>=hz)continue;
      const tw=.55+.45*Math.sin(t*1.7+p.ph);
      ctx.fillStyle=seen?B(.9):G(.35+.5*tw);ctx.beginPath();ctx.arc(X,Y,p.s*(seen?1.3:1),0,TAU);ctx.fill();
      if(seen){ctx.strokeStyle=B(.18);ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(X,Y);ctx.stroke();}
    }
    // lens glyph
    ctx.save();ctx.translate(lx,ly);
    ctx.strokeStyle=B(.35);ctx.setLineDash([2,5]);ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,LR,t*.4,t*.4+TAU);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle="rgba(255,253,248,.9)";ctx.strokeStyle=B(.85);ctx.lineWidth=1.4;vesica(ctx,0,0,22,7);ctx.fill();ctx.stroke();
    ctx.fillStyle=B(.95);ctx.beginPath();ctx.arc(Math.sin(t*.7)*4,0,4.2,0,TAU);ctx.fill();
    ctx.fillStyle=K(.5);ctx.font="600 9.5px JetBrains Mono, monospace";ctx.textAlign="center";ctx.fillText("THE QUIET GUEST",0,-LR-7);
    ctx.restore();
    // the horizon records: everything above is redrawn below, in pixels
    reflect(ctx,cv,W,hz,D,7,.32,H);
    ctx.strokeStyle=K(.28);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,hz);ctx.lineTo(W,hz);ctx.stroke();
    for(let x=0;x<W;x+=24){ctx.beginPath();ctx.moveTo(x,hz);ctx.lineTo(x,hz+(x%120===0?7:3));ctx.stroke();}
    ctx.fillStyle="#d6493a";ctx.globalAlpha=.5+.5*Math.sin(t*4);ctx.beginPath();ctx.arc(W-112,hz-12,3.2,0,TAU);ctx.fill();ctx.globalAlpha=1;
    ctx.fillStyle=K(.55);ctx.font="600 10px JetBrains Mono, monospace";ctx.textAlign="left";ctx.fillText("REC · STREAM",W-104,hz-8.5);
  });
})();

/* ---------- premise: scattered light assembles into an eye that stays ---------- */
(function(){
  const sec=document.querySelector(".premise"),cv=document.getElementById("prem3");if(!sec||!cv)return;
  const words=[...sec.querySelectorAll(".quote span")],m=sec.querySelector(".meter b");
  const T=[];const add=(x,y,k)=>T.push({x,y,k});
  for(let i=0;i<110;i++){const u=i/109,ph=(210+u*120)*Math.PI/180;add(Math.cos(ph),.5+Math.sin(ph),"eye");}
  for(let i=0;i<110;i++){const u=i/109,ph=(30+u*120)*Math.PI/180;add(Math.cos(ph),-.5+Math.sin(ph),"eye");}
  [[.34,60],[.2,40],[.07,14]].forEach(([r,n])=>{for(let i=0;i<n;i++){const a=i/n*TAU;add(Math.cos(a)*r,Math.sin(a)*r,"iris");}});
  for(let tri=0;tri<2;tri++){const V=[0,1,2].map(k=>{const a=-Math.PI/2+tri*Math.PI+k*TAU/3;return[Math.cos(a)*.62,Math.sin(a)*.62];});
    for(let e=0;e<3;e++){const A=V[e],Bv=V[(e+1)%3];for(let i=0;i<22;i++){const u=i/22;add(A[0]+(Bv[0]-A[0])*u,A[1]+(Bv[1]-A[1])*u,"hex");}}}
  for(let i=0;i<120;i++){const a=i/120*TAU;add(Math.cos(a)*1.18,Math.sin(a)*1.18,"ring");}
  const S=T.map(()=>({x:Math.random(),y:Math.random(),j:Math.random()*TAU}));
  let p=0;
  const st=stage(cv,(ctx,W,H,t)=>{
    ctx.clearRect(0,0,W,H);
    const cx=W/2,cy=H/2,sc=Math.min(W,H)*.36,e=ease(p),spin=e>.85?(t*.15):0;
    if(e>.6){ctx.strokeStyle=G(.18*(e-.6)/.4);ctx.lineWidth=.8;ctx.beginPath();ctx.arc(cx,cy,sc*1.18,0,TAU);ctx.stroke();
      ctx.beginPath();ctx.arc(cx,cy+sc*.5,sc,0,TAU);ctx.stroke();ctx.beginPath();ctx.arc(cx,cy-sc*.5,sc,0,TAU);ctx.stroke();}
    T.forEach((q,i)=>{
      let tx=q.x,ty=q.y;
      if(q.k==="hex"){const c=Math.cos(spin),s=Math.sin(spin);[tx,ty]=[q.x*c-q.y*s,q.x*s+q.y*c];}
      if(q.k==="ring"){const c=Math.cos(-spin*.5),s=Math.sin(-spin*.5);[tx,ty]=[q.x*c-q.y*s,q.x*s+q.y*c];}
      const sx=S[i].x*W,sy=S[i].y*H,gx=cx+tx*sc,gy=cy+ty*sc;
      const wob=(1-e)*8;
      const x=sx+(gx-sx)*e+Math.cos(t+S[i].j)*wob,y=sy+(gy-sy)*e+Math.sin(t*1.3+S[i].j)*wob;
      ctx.fillStyle=q.k==="iris"?B(.85):q.k==="hex"?B(.35+.3*e):G(.45+.4*e);
      ctx.beginPath();ctx.arc(x,y,q.k==="iris"?1.9:1.5,0,TAU);ctx.fill();
    });
  });
  function upd(){
    const r=sec.getBoundingClientRect(),span=r.height-innerHeight;p=Math.min(1,Math.max(0,-r.top/Math.max(1,span)*1.15));
    const n=Math.round(p*words.length);words.forEach((w,i)=>w.classList.toggle("on",i<Math.max(1,n)));
    if(m)m.textContent=Math.round(p*100)+"%";st.redraw();
  }
  if(RM)p=1;
  addEventListener("scroll",upd,{passive:true});upd();
})();

/* ---------- A: the route, drawn as a lattice; the guests are lenses ---------- */
const S=[
 {k:"drive",name:"The drive",guests:["License plate readers"],
  watch:"Plate cameras on public roads, run by local police or private owners. Flock says 6,000+ communities use its cameras. "+chip("R"),
  keep:"Plate, time, place and vehicle photo. Flock's default retention is 30 days. "+chip("R"),
  ask:"The agency that owns the camera, and agencies it shares with. Flock says federal sharing is off by default and one-to-one only. "+chip("R"),
  record:"A Savannah officer was fired after her ICE agent husband ran about 983 searches in six states through her login from January to July 2026. "+chip("R"),
  law:"A federal judge in Norfolk ruled in January that plate photos on public roads and database searches are not Fourth Amendment searches; the plaintiffs said they will appeal. "+chip("R")},
 {k:"lot",name:"The parking lot",guests:["Church security cameras","Plate readers at the entrance"],
  watch:"Many congregations have added their own cameras after threats and attacks. "+chip("R"),
  keep:"Whatever the church's system records, for as long as the church sets it. "+chip("I"),
  ask:"The church holds it. Like any private record, it can be sought with a warrant or subpoena. "+chip("I"),
  record:"The Family Research Council counted 415 hostile incidents against U.S. churches in 2024, mostly vandalism, from open sources. "+chip("R"),
  law:"Protection here is a church decision: what to record, how long to keep it, and how to answer a request. "+chip("I")},
 {k:"door",name:"The door",guests:["Agents outside","Agents inside, undercover"],
  watch:"Since January 2025, federal guidance no longer keeps immigration enforcement away from houses of worship. "+chip("R"),
  keep:"In Minnesota, an undercover agent at a church meeting recorded license plates and allegedly compiled dossiers. "+chip("R"),
  ask:"Court injunctions now bar enforcement at named plaintiffs' houses of worship, with exceptions for warrants and emergencies. "+chip("R"),
  record:"A church member's sworn declaration says DHS watched people entering and leaving University Baptist on Sundays. "+chip("R"),
  law:"Coverage depends on the case: plaintiff congregations in one Fourth Circuit case, plaintiffs in a Massachusetts order, and a DC case now sent back for a merits ruling. "+chip("R")},
 {k:"pew",name:"The pew",guests:["Phones","A face-match app"],
  watch:"Anyone with a phone, and agents with ICE's Mobile Fortify app, which identifies people from a photo. "+chip("R"),
  keep:"Mobile Fortify checks more than 270 million records in DHS's IDENT system; ICE says photos are kept 15 years, including for citizens. "+chip("R"),
  ask:"ICE says people cannot decline a scan. "+chip("R"),
  record:"Attorneys reported the app gave two different wrong names for the same woman in one encounter. "+chip("R"),
  law:"ICE has not completed a privacy impact assessment for the app, according to compiled reporting. "+chip("R")},
 {k:"stream",name:"The stream",guests:["Everyone online","The archive"],
  watch:"73% of congregations offered hybrid worship in 2023. A public stream can be watched, recorded and re-shared by anyone. "+chip("R"),
  keep:"Platform archives stay up until the church removes them. "+chip("I"),
  ask:"Anyone with the page. A public broadcast carries no expectation of privacy. "+chip("I"),
  record:"We found no public record of ICE using a church livestream to identify anyone. "+chip("W"),
  law:"Here the choice is entirely the congregation's. Exhibit B shows the trade. "+chip("I")}
];
const RET=[{d:30,lab:"30 days, Flock default",c:"R"},{d:null,lab:"Set by the church",c:"I"},{d:null,lab:"No public limit; filed in court records",c:"R"},{d:5475,lab:"15 years, per ICE",c:"R"},{d:Infinity,lab:"Until the church removes it",c:"I"}];
const POS=[.15,.36,.58,.76,.94];
let sel=0,walkerAt=.15,anim=null;
function centerIn(svg,x){const w=svg.closest(".relwrap");if(!w||w.scrollWidth<=w.clientWidth+2)return;w.scrollTo({left:x/760*w.scrollWidth-w.clientWidth/2,behavior:RM?"auto":"smooth"});}
function spin(g,dur,rev){if(RM)return;el("animateTransform",{attributeName:"transform",type:"rotate",from:rev?"360":"0",to:rev?"0":"360",dur:dur+"s",repeatCount:"indefinite"},g);}
function drawRoute(){
  const s=document.getElementById("route");s.innerHTML="";
  const defs=el("defs",{},s);
  const pat=el("pattern",{id:"lat",width:24,height:41.57,patternUnits:"userSpaceOnUse"},defs);
  el("path",{d:"M0 0 L12 20.78 L24 0 M0 41.57 L12 20.78 L24 41.57 M0 20.78 H24",stroke:"#e4dfd3","stroke-width":.6,fill:"none"},pat);
  const fade=el("radialGradient",{id:"fade3",cx:"40%",cy:"60%",r:"75%"},defs);el("stop",{offset:0,"stop-color":"#fbf8f1","stop-opacity":0},fade);el("stop",{offset:1,"stop-color":"#fbf8f1","stop-opacity":.95},fade);
  el("rect",{x:0,y:0,width:760,height:330,fill:"url(#lat)"},s);
  el("rect",{x:0,y:0,width:760,height:330,fill:"url(#fade3)"},s);
  // broadcast field around the end of the path
  for(let i=1;i<=7;i++)el("circle",{cx:735,cy:40,r:i*34,fill:"none",stroke:C.sky,"stroke-opacity":.16-i*.016,"stroke-width":1},s);
  const d="M40 292 C140 286 170 250 260 252 S380 280 440 246 S520 196 560 206 S640 214 650 170 S700 70 735 40";
  const base=el("path",{id:"rbase",d,fill:"none",stroke:"#ece4cf","stroke-width":10,"stroke-linecap":"round"},s);
  el("path",{d,fill:"none",stroke:"#cdbf98","stroke-width":1,"stroke-dasharray":"1 7","stroke-linecap":"round"},s);
  const L=base.getTotalLength();
  el("path",{id:"rlit",d,fill:"none",stroke:C.gold2,"stroke-width":3,"stroke-linecap":"round","stroke-dasharray":L,"stroke-dashoffset":L*(1-walkerAt)},s);
  // home: a square within a square
  const h=el("g",{transform:"translate(20 270)"},s);el("rect",{x:0,y:0,width:30,height:30,fill:C.paper,stroke:C.ink3,"stroke-width":1.1},h);el("rect",{x:7,y:7,width:16,height:16,fill:"none",stroke:C.gold,"stroke-width":1,transform:"rotate(45 15 15)"},h);
  // sanctuary: a pointed arch (two circles) with a rose
  const ch=el("g",{transform:"translate(546 150)"},s);
  el("path",{d:"M-28 52 V8 A56 56 0 0 1 0 -40 A56 56 0 0 1 28 8 V52 Z",fill:C.paper,stroke:C.ink3,"stroke-width":1.1},ch);
  el("path",{d:"M-12 52 V26 A24 24 0 0 1 0 6 A24 24 0 0 1 12 26 V52 Z",fill:"#fbeed2",stroke:C.gold,"stroke-width":1},ch);
  const rose=el("g",{transform:"translate(0 -12)"},ch);
  for(let k=0;k<6;k++)el("circle",{cx:Math.cos(k*Math.PI/3)*4.5,cy:Math.sin(k*Math.PI/3)*4.5,r:4.5,fill:"none",stroke:C.gold,"stroke-width":.7},rose);
  spin(rose,30);
  const pt=f=>base.getPointAtLength(L*f),wpt=pt(walkerAt);
  S.forEach((st,i)=>{
    const p=pt(POS[i]),on=i===sel;
    const g=el("g",{tabindex:0,role:"button","aria-label":"Station "+(i+1)+": "+st.name+", "+st.guests.length+" unseen guests","aria-pressed":on,style:"cursor:pointer"},s);
    el("rect",{x:p.x-48,y:p.y-110,width:96,height:160,fill:"transparent"},g);
    st.guests.forEach((gn,j)=>{
      const gx=p.x+(j-(st.guests.length-1)/2)*34+(i===4?-34:0), gy=p.y-(i===4?-14:62)-(j%2)*10;
      if(on)el("line",{x1:gx,y1:gy,x2:wpt.x,y2:wpt.y,stroke:C.sky,"stroke-width":1,"stroke-dasharray":"2 4","stroke-opacity":.8,class:"sight"},g);
      const lg=el("g",{transform:`translate(${gx} ${gy})`,opacity:on?1:.5},g);
      if(on){const sw=el("g",{},lg);el("path",{d:"M0 0 L44 -12 A46 46 0 0 1 44 12 Z",fill:C.sky2,opacity:.28},sw);spin(sw,4);}
      const ring=el("g",{},lg);el("circle",{r:14,fill:"none",stroke:on?C.sky:C.ink3,"stroke-width":.9,"stroke-dasharray":"2 3"},ring);spin(ring,9,j%2);
      el("path",{d:"M-11 0 Q0 -10 11 0 Q0 10 -11 0 Z",fill:C.paper,stroke:on?C.sky:C.ink3,"stroke-width":1.2},lg);
      el("circle",{r:3.4,fill:on?C.sky:C.ink3},lg);
    });
    el("circle",{cx:p.x,cy:p.y,r:on?13:0,fill:"none",stroke:C.gold2,"stroke-width":1},g);
    el("rect",{x:p.x-(on?7:5),y:p.y-(on?7:5),width:on?14:10,height:on?14:10,fill:on?C.gold:C.paper,stroke:on?C.gold:C.ink3,"stroke-width":1.4,transform:`rotate(45 ${p.x} ${p.y})`},g);
    const tx=el("text",{x:p.x,y:p.y+(i===4?-40:28),"text-anchor":"middle","font-size":12,"font-weight":on?600:500,fill:on?C.ink:C.ink2},g);tx.textContent=(i+1)+" "+st.name.replace("The ","");
    const pick=()=>go(i);
    g.addEventListener("click",pick);g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick();}});
  });
  const w=el("g",{id:"walker",transform:`translate(${wpt.x} ${wpt.y})`},s);
  el("circle",{r:11,fill:C.gold2,opacity:.3},w);el("circle",{r:4.5,fill:C.paper,stroke:C.gold,"stroke-width":2},w);
  const lb=el("text",{x:24,y:22,"font-size":10.5,fill:C.ink3,"letter-spacing":".1em"},s);lb.textContent="HOME";
  const lb2=el("text",{x:690,y:16,"font-size":10.5,fill:C.ink3,"text-anchor":"end","letter-spacing":".1em"},s);lb2.textContent="AND AFTER, ONLINE";
  const cnt=S.slice(0,sel+1).reduce((a,b)=>a+b.guests.length,0);
  const lc=el("text",{x:24,y:40,"font-size":12,fill:C.sky,"font-weight":600},s);lc.textContent=cnt+" unseen guests so far";
  const st=S[sel];
  document.getElementById("stationOut").innerHTML=`<div class="eyebrow" style="margin-top:14px">Station ${sel+1} of ${S.length}</div><div class="stitle">${st.name}</div><div class="guests">${st.guests.map(g=>`<span class="guest">${g}</span>`).join("")}</div>
  <div class="station"><div class="cell"><div class="k">Who may be watching</div><div class="v">${st.watch}</div></div><div class="cell"><div class="k">What is kept</div><div class="v">${st.keep}</div></div>
  <div class="cell"><div class="k">Who can get it</div><div class="v">${st.ask}</div></div><div class="cell"><div class="k">On the record</div><div class="v">${st.record}</div></div>
  <div class="cell wide"><div class="k">What protects you here</div><div class="v">${st.law}</div></div></div>`;
  drawRet();centerIn(s,pt(POS[sel]).x);
}
function go(i){
  if(i===sel)return;const from=walkerAt,to=POS[i];sel=i;
  if(RM){walkerAt=to;drawRoute();return;}
  cancelAnimationFrame(anim);const t0=performance.now(),dur=900;drawRoute();
  (function step(t){const k=Math.min(1,(t-t0)/dur),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;walkerAt=from+(to-from)*e;
    const base=document.getElementById("rbase"),L=base.getTotalLength(),p=base.getPointAtLength(L*walkerAt);
    document.getElementById("walker").setAttribute("transform",`translate(${p.x} ${p.y})`);
    document.querySelectorAll("#route .sight").forEach(l=>{l.setAttribute("x2",p.x);l.setAttribute("y2",p.y);});
    document.getElementById("rlit").setAttribute("stroke-dashoffset",L*(1-walkerAt));
    if(k<1)anim=requestAnimationFrame(step);})(t0);
}
document.getElementById("prevSt").addEventListener("click",()=>go(Math.max(0,sel-1)));
document.getElementById("nextSt").addEventListener("click",()=>go(Math.min(S.length-1,sel+1)));
document.getElementById("walkAll").addEventListener("click",()=>{let i=0;go(0);const tick=()=>{i++;if(i<S.length){go(i);setTimeout(tick,1500);}};setTimeout(tick,RM?10:1200);});
function drawRet(){
  const s=document.getElementById("ret");s.innerHTML="";
  const defs=el("defs",{},s);
  const pat=el("pattern",{id:"hatch",width:6,height:6,patternUnits:"userSpaceOnUse",patternTransform:"rotate(45)"},defs);el("rect",{width:6,height:6,fill:"#f3f7fb"},pat);el("line",{x1:0,y1:0,x2:0,y2:6,stroke:C.sky2,"stroke-width":1.4},pat);
  const fd=el("linearGradient",{id:"fade",x1:0,x2:1},defs);el("stop",{offset:0,"stop-color":C.sky},fd);el("stop",{offset:.7,"stop-color":C.sky2},fd);el("stop",{offset:1,"stop-color":C.sky2,"stop-opacity":.1},fd);
  const L=190,R=740,lo=Math.log10(1/24),hi=Math.log10(365*30),X=d=>L+(Math.log10(d)-lo)/(hi-lo)*(R-L);
  [[1/24,"1 hour"],[1,"1 day"],[7,"1 week"],[30,"1 month"],[365,"1 year"],[3650,"10 years"]].forEach(([d,t])=>{const x=X(d);el("line",{x1:x,x2:x,y1:10,y2:190,stroke:C.rule},s);const tx=el("text",{x,y:206,"text-anchor":"middle","font-size":10.5,fill:C.ink3},s);tx.textContent=t;});
  const sx=X(1.5/24);el("line",{x1:sx,x2:sx,y1:6,y2:190,stroke:C.gold,"stroke-width":1.4,"stroke-dasharray":"2 3"},s);
  const stx=el("text",{x:sx+5,y:16,"font-size":10.5,fill:C.gold},s);stx.textContent="the service itself";
  RET.forEach((r,i)=>{
    const y=36+i*32,on=i===sel,x0=sx;
    const g=el("g",{style:"cursor:pointer",tabindex:0,role:"button","aria-label":S[i].name+": "+r.lab},s);
    el("rect",{x:0,y:y-14,width:760,height:28,fill:on?"#fbf0d9":"transparent",rx:6},g);
    const n=el("text",{x:10,y:y+4,"font-size":12,"font-weight":on?600:500,fill:on?C.ink:C.ink2},g);n.textContent=(i+1)+" "+S[i].name.replace("The ","");
    if(r.d===null)el("rect",{x:x0,y:y-4,width:R-x0,height:10,rx:5,fill:"url(#hatch)",stroke:C.sky2,"stroke-dasharray":"3 3"},g);
    else{const x1=r.d===Infinity?R:X(r.d);el("rect",{x:x0,y:y-4,width:Math.max(4,x1-x0),height:10,rx:5,fill:r.d===Infinity?"url(#fade)":(on?C.sky:C.sky2)},g);}
    const lt=el("text",{x:x0+10,y:y-8,"font-size":10.5,fill:C.ink2},g);lt.textContent=r.lab;
    const pick=()=>go(i);g.addEventListener("click",pick);g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick();}});
  });
}

/* ---------- B: the mirror. The room is a rose of circles; the stream is its reflection, at the resolution the dials allow ---------- */
const st={aud:"public",frame:"room",keep:"forever"};
const RA={public:5,link:4,login:3,audio:4,none:0},EA={public:4,link:3,login:1,audio:1,none:0};
const EF={room:4,pulpit:0},RK={forever:3,week:2,live:0},EK={forever:4,week:1,live:0};
const reachV=document.getElementById("reachV"),expV=document.getElementById("expV"),reachB=document.getElementById("reachB"),expB=document.getElementById("expB"),reachP=document.getElementById("reachP"),expP=document.getElementById("expP");
let reachNow=100,expNow=100,pxNow=3,pxT=3,alNow=.85,alT=.85,motesT=90;
function count(node,from,to){if(RM){node.textContent=to;return;}const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/500);node.textContent=Math.round(from+(to-from)*k);if(k<1)requestAnimationFrame(f);})(t0);}
const M=[];
const mir=stage(document.getElementById("mirror3"),(ctx,W,H,t,D)=>{
  const hz=H*.42,cx=W/2,rr=Math.min(W*.2,hz*.34),rc=hz*.42;
  pxNow+=(pxT-pxNow)*.12;alNow+=(alT-alNow)*.12;if(RM){pxNow=pxT;alNow=alT;}
  ctx.clearRect(0,0,W,H);
  const gr=ctx.createLinearGradient(0,0,0,hz);gr.addColorStop(0,"#fffdf7");gr.addColorStop(1,"#f6efe0");ctx.fillStyle=gr;ctx.fillRect(0,0,W,hz);
  const gw=ctx.createLinearGradient(0,hz,0,H);gw.addColorStop(0,"#eaf1f8");gw.addColorStop(1,"#f7f5f0");ctx.fillStyle=gw;ctx.fillRect(0,hz,W,H-hz);
  // rose window: 12 circles turning on a circle
  const rot=t*.08;ctx.lineWidth=.9;
  for(let k=0;k<12;k++){const a=rot+k*TAU/12;ctx.strokeStyle=k%2?G(.55):B(.45);ctx.beginPath();ctx.arc(cx+Math.cos(a)*rr/2,rc+Math.sin(a)*rr/2,rr/2,0,TAU);ctx.stroke();}
  ctx.strokeStyle=G(.7);ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(cx,rc,rr,0,TAU);ctx.stroke();
  ctx.strokeStyle=K(.12);ctx.lineWidth=.6;ctx.beginPath();for(let k=0;k<24;k++){const a=-rot*.5+k*TAU/24;ctx.moveTo(cx+Math.cos(a)*rr*1.05,rc+Math.sin(a)*rr*1.05);ctx.lineTo(cx+Math.cos(a)*rr*1.3,rc+Math.sin(a)*rr*1.3);}ctx.stroke();
  // pulpit and choir
  ctx.fillStyle=G(.9);ctx.fillRect(cx-7,hz-60,14,10);
  for(let k=-3;k<=3;k++){ctx.beginPath();ctx.arc(cx+k*9,hz-68,2.2,0,TAU);ctx.fill();}
  // pews: the faces in the room
  const pews=()=>{for(let row=0;row<3;row++){const y=hz-38+row*12,n=Math.floor(W*.62/11);for(let i=0;i<n;i++){const x=cx-(n-1)*5.5+i*11;if(Math.abs(x-cx)<10)continue;const b=.5+.5*Math.sin(i*1.7+row*2.3+t*.6);ctx.fillStyle=K(.32+.3*b);ctx.beginPath();ctx.arc(x,y+Math.pow((x-cx)/W,2)*-40,2.3,0,TAU);ctx.fill();}}};
  const video=st.aud!=="audio"&&st.aud!=="none",streaming=st.aud!=="none";
  if(st.frame==="room"&&video)pews();
  // the reflection is the stream
  if(video)reflect(ctx,ctx.canvas,W,hz,D,pxNow,alNow,H);
  else if(st.aud==="audio"){ctx.strokeStyle=B(.7);ctx.lineWidth=1.3;ctx.beginPath();for(let x=0;x<=W;x+=3){const y=hz+(H-hz)*.32+Math.sin(x*.05+t*3)*10*Math.sin(x*.011+t)+Math.sin(x*.13-t*5)*3;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}
  if(!(st.frame==="room"&&video))pews();
  // reach: lights rising from the room
  while(M.length<motesT)M.push({x:Math.random()*W,y:hz-Math.random()*hz,v:.2+Math.random()*.5,r:.8+Math.random()*1.8,a:0});
  if(M.length>motesT)M.splice(0,M.length-motesT);
  for(const m of M){m.y-=m.v;m.a=Math.min(1,m.a+.03);if(m.y<-6){m.y=hz;m.x=Math.random()*W;m.a=0;}
    ctx.fillStyle=G(.75*m.a);ctx.save();ctx.translate(m.x,m.y);ctx.rotate(Math.PI/4);ctx.fillRect(-m.r,-m.r,m.r*2,m.r*2);ctx.restore();}
  ctx.strokeStyle=K(.3);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,hz);ctx.lineTo(W,hz);ctx.stroke();
  if(streaming&&st.keep==="live"){ctx.fillStyle="#d6493a";ctx.globalAlpha=.5+.5*Math.sin(t*4);ctx.beginPath();ctx.arc(W-22,hz+16,3.5,0,TAU);ctx.fill();ctx.globalAlpha=1;}
});
function drawDial(){
  const video=st.aud!=="audio"&&st.aud!=="none", streaming=st.aud!=="none";
  document.querySelectorAll('.seg[data-d="frame"] button').forEach(b=>b.disabled=!video);
  document.querySelectorAll('.seg[data-d="keep"] button').forEach(b=>b.disabled=!streaming);
  const r=RA[st.aud]+(streaming?RK[st.keep]:0), e=EA[st.aud]+(video?EF[st.frame]:0)+(streaming?EK[st.keep]:0);
  const reach=Math.round(r/8*100), exp=Math.round(e/12*100);
  count(reachV,reachNow,reach);count(expV,expNow,exp);reachNow=reach;expNow=exp;
  reachB.style.width=reach+"%";expB.style.width=exp+"%";
  let rp,ep;
  if(!streaming)rp="Only people who can come in person can worship with you. That leaves out the 8% of adults who worship only online. "+chip("F");
  else if(st.aud==="login")rp="Members can join, but a visitor or seeker cannot find you. Replays help those working or sick on Sunday. "+chip("I");
  else rp=(st.keep==="live"?"Anyone can join live, but no one can watch later. ":"Anyone can join, and those who miss Sunday can watch later. ")+chip("I");
  if(!streaming)ep="Only those physically present see who attended. The parking lot and the drive still have their own guests (Exhibit A). "+chip("I");
  else if(!video)ep="Voices can still identify people, but no faces leave the room. "+chip("I");
  else if(st.frame==="pulpit")ep="The preacher and choir are visible; the congregation is not. "+(st.keep==="forever"?"The archive keeps the leaders on record indefinitely. ":"")+chip("I");
  else ep=(st.aud==="public"?"Anyone, anywhere, can see who sat where":"Anyone holding the link can see who sat where")+(st.keep==="forever"?", for as long as the archive stays up. ":st.keep==="week"?", for a week. ":", while it airs. ")+chip("I");
  reachP.innerHTML=rp;expP.innerHTML=ep;
  pxT=2+(100-exp)/100*26; alT=.25+exp/100*.6; motesT=Math.round(reach*.9);
  const Wd={public:"anyone, anywhere",link:"anyone holding the link",login:"signed-in members",audio:"listeners only; the reflection becomes a voice",none:"no one outside the room; nothing is reflected"}[st.aud];
  const F=!video?"":(st.frame==="room"?"faces in the pews":"the pulpit and choir, the pews left out");
  const Kp=!streaming?"":({forever:"indefinitely",week:"for a week",live:"only while live"})[st.keep];
  document.getElementById("whoOut").innerHTML=`<b>The reflection is the stream.</b> Visible to ${Wd}${F?", showing "+F:""}${Kp?", "+Kp:""}. Its sharpness is the exposure score.`;
  mir.redraw();
}
document.querySelectorAll(".seg").forEach(g=>g.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{if(b.disabled)return;st[g.dataset.d]=b.dataset.v;g.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));drawDial();})));

/* ---------- C: the protection band over time ---------- */
const T=[
 {d:"2021-10",lab:"2021",kind:"p",t:"Protected areas guidance",x:"Biden-era DHS guidance directs agents to avoid enforcement in or near places where people get essential services, including houses of worship.",c:"R"},
 {d:"2025-01",lab:"Jan 2025",kind:"p",t:"Guidance rescinded",x:"DHS: \"Criminals will no longer be able to hide in America's schools and churches to avoid arrest.\"",c:"R"},
 {d:"2025-02",lab:"Feb 2025",kind:"p",t:"First injunction, plaintiffs only",x:"Judge Theodore Chuang orders DHS to follow the 2021 policy at the houses of worship of Quaker meetings, the Cooperative Baptist Fellowship and Sikh Temple Sacramento. Warrants and emergencies are excepted. He declines to apply it nationwide.",c:"R"},
 {d:"2025-04",lab:"Apr 2025",kind:"p",t:"DC court denies a second bid",x:"A district judge finds the Episcopal Church and partners had not shown an imminent threat.",c:"R"},
 {d:"2026-01",lab:"Jan 2026",kind:"s",t:"Service interrupted at Cities Church",x:"Protesters chanting \"ICE out\" interrupt Sunday worship at a St. Paul church where an ICE field office director appears to be a pastor. They livestream it. DOJ opens a civil rights probe.",c:"R"},
 {d:"2026-02",lab:"Feb 2026",kind:"s",t:"Undercover at Prince of Peace",x:"An undercover DHS agent attends a protesters' meeting at a Roseville Lutheran church and records license plates, per court filings. The same month a Massachusetts court bars enforcement on the church property of two Baptist bodies.",c:"R"},
 {d:"2026-05",lab:"May 2026",kind:"s",t:"A wire at University Baptist",x:"An undercover agent wears a wire to a self-defense class in a Minneapolis church gym; her recorder falls to the floor.",c:"R"},
 {d:"2026-07",lab:"Jan to Jul 2026",kind:"s",t:"983 plate searches on a borrowed login",x:"An ICE agent runs about 983 Flock searches in six states through his wife's Savannah police account. She is fired in August.",c:"R"},
 {d:"2026-08",lab:"Aug 2026",kind:"p",t:"Fourth Circuit upholds; contempt sought",x:"The appeals court affirms the first injunction, finding the policy \"already has caused declines in attendance.\" Two days later, Baptist bodies ask a court to hold DHS in contempt over the Minnesota surveillance.",c:"R"},
 {d:"2026-10",lab:"20 Oct 2026",kind:"p",t:"DC Circuit revives the Episcopal case",x:"A 2-1 panel finds members of the Episcopal Church and 26 partner groups \"likely face imminent harm\" and sends the case back for a ruling on the merits.",c:"R"}
];
let tsel=T.length-1;
function drawTL(){
  const s=document.getElementById("tl");s.innerHTML="";
  const L=40,R=720,Y=150,m=d=>{const[a,b]=d.split("-").map(Number);return a*12+b-1};
  const lo=m("2021-07"),hi=m("2026-12"),X=d=>L+(m(d)-lo)/(hi-lo)*(R-L);
  const defs=el("defs",{},s);
  const bg=el("linearGradient",{id:"pband",x1:0,y1:0,x2:0,y2:1},defs);el("stop",{offset:0,"stop-color":"#cfe3f5","stop-opacity":.2},bg);el("stop",{offset:1,"stop-color":"#9cc4e8","stop-opacity":.85},bg);
  // full policy coverage
  el("path",{d:`M${X("2021-10")} ${Y} V${Y-86} H${X("2025-01")} V${Y}Z`,fill:"url(#pband)"},s);
  const t1=el("text",{x:X("2021-10")+8,y:Y-70,"font-size":11,fill:C.ink2},s);t1.textContent="Policy: every house of worship";
  // plaintiffs only: thin, growing slightly with each order
  el("path",{d:`M${X("2025-02")} ${Y} V${Y-10} H${X("2026-02")} V${Y-18} H${X("2026-10")} V${Y}Z`,fill:"url(#pband)"},s);
  el("path",{d:`M${X("2026-10")} ${Y-18} H${R} V${Y}`,fill:"none",stroke:C.sky,"stroke-dasharray":"3 3"},s);
  const t2=el("text",{x:X("2025-02")+6,y:Y-50,"font-size":11,fill:C.ink2},s);t2.textContent="Court orders: named plaintiffs only";
  const t3=el("text",{x:R,y:Y-28,"font-size":10,fill:C.sky,"text-anchor":"end"},s);t3.textContent="DC case: merits pending";
  el("line",{x1:L,x2:R,y1:Y,y2:Y,stroke:C.ink3,"stroke-width":1},s);
  for(let y=2022;y<=2026;y++){const x=X(y+"-01");el("line",{x1:x,x2:x,y1:Y,y2:Y+6,stroke:C.ink3},s);const t=el("text",{x,y:Y+20,"text-anchor":"middle","font-size":11,fill:C.ink3},s);t.textContent=y;}
  let lastX=-99,lane=0;
  T.forEach((e,i)=>{
    const x=X(e.d);lane=(x-lastX<26)?(lane+1)%3:0;lastX=x;
    const yy=Y+36+lane*16,on=i===tsel,col=e.kind==="p"?C.sky:C.gold;
    const g=el("g",{tabindex:0,role:"button","aria-label":e.lab+": "+e.t,"aria-pressed":on,style:"cursor:pointer"},s);
    el("rect",{x:x-11,y:Y-4,width:22,height:yy-Y+16,fill:"transparent"},g);
    el("line",{x1:x,x2:x,y1:Y,y2:yy,stroke:col,"stroke-width":1,"stroke-opacity":.6},g);
    if(on)el("circle",{cx:x,cy:yy,r:14,fill:col,opacity:.18},g);
    el("circle",{cx:x,cy:yy,r:on?7.5:5.5,fill:on?col:C.paper,stroke:col,"stroke-width":2},g);
    const pick=()=>{tsel=i;drawTL();};
    g.addEventListener("click",pick);g.addEventListener("keydown",ev=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();pick();}});
  });
  const e=T[tsel];centerIn(s,X(e.d));
  const lt=el("text",{x:Math.min(Math.max(X(e.d),L+60),R-60),y:Y+102,"text-anchor":"middle","font-size":12,"font-weight":600,fill:C.ink},s);lt.textContent=e.lab;
  document.getElementById("tlOut").innerHTML=`<div class="d">${e.lab.toUpperCase()} · ${e.kind==="p"?"POLICY OR COURT":"SURVEILLANCE OR INTRUSION"}</div><div class="t">${e.t}</div><p>${e.x} ${chip(e.c)}</p>`;
}
document.addEventListener("keydown",e=>{const f=document.activeElement;if(!f||!f.closest)return;if(f.closest("#tl")&&(e.key==="ArrowRight"||e.key==="ArrowLeft")){tsel=Math.max(0,Math.min(T.length-1,tsel+(e.key==="ArrowRight"?1:-1)));drawTL();document.querySelectorAll("#tl g[role=button]")[tsel].focus();}});


document.addEventListener("keydown",e=>{const f=document.activeElement;if(!f||!f.closest)return;if(f.closest("#tl")&&(e.key==="ArrowRight"||e.key==="ArrowLeft")){tsel=Math.max(0,Math.min(T.length-1,tsel+(e.key==="ArrowRight"?1:-1)));drawTL();document.querySelectorAll("#tl g[role=button]")[tsel].focus();}});

/* ---------- D: two streams enter one sanctum; each crossing leaves a frame ---------- */
(function(){
  const cv=document.getElementById("d3");if(!cv)return;
  const Q=[],F=[];
  stage(cv,(ctx,W,H,t)=>{
    const cx=W/2,cy=H*.52,Rh=Math.min(W*.13,H*.3),small=W<560;
    ctx.clearRect(0,0,W,H);
    // sanctum: nested hexagons turning against each other
    for(let k=0;k<4;k++){const r=Rh*(1-k*.22),a=(k%2?-1:1)*t*.06+k*.26;ctx.strokeStyle=k===0?K(.45):G(.35+k*.12);ctx.lineWidth=k===0?1.4:1;ctx.beginPath();for(let i=0;i<=6;i++){const b=a+i*TAU/6;i?ctx.lineTo(cx+Math.cos(b)*r,cy+Math.sin(b)*r):ctx.moveTo(cx+Math.cos(b)*r,cy+Math.sin(b)*r);}ctx.stroke();}
    ctx.strokeStyle=G(.5);ctx.beginPath();ctx.arc(cx,cy,Rh*.18,0,TAU);ctx.stroke();
    // spawn
    if(Q.length<160&&Math.random()<.9){for(const side of[-1,1]){Q.push({side,x:side<0?-10:W+10,y:cy+(Math.random()-.5)*H*.8,v:.6+Math.random()*.9,in:false});}}
    for(let i=Q.length-1;i>=0;i--){const q=Q[i];const dx=cx-q.x,dy=cy-q.y,d=Math.hypot(dx,dy);
      q.x+=dx/d*q.v*(q.in?.35:1.4);q.y+=dy/d*q.v*(q.in?.35:1.4)+Math.sin(t*2+q.x*.02)*.3;
      if(!q.in&&d<Rh){q.in=true;F.push({x:q.x,y:q.y,a:1,c:q.side});}
      const col=q.side<0?B:G;ctx.fillStyle=col(q.in?Math.max(0,d/Rh)*.8:.75);ctx.beginPath();ctx.arc(q.x,q.y,q.in?1.2:1.7,0,TAU);ctx.fill();
      if(q.in&&d<Rh*.2)Q.splice(i,1);}
    // frames: every crossing is recorded
    for(let i=F.length-1;i>=0;i--){const f=F[i];f.a-=.012;if(f.a<=0){F.splice(i,1);continue;}const s=10+(1-f.a)*10;ctx.strokeStyle=(f.c<0?B:G)(f.a*.8);ctx.lineWidth=1;
      ctx.beginPath();[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([u,v])=>{ctx.moveTo(f.x+u*s,f.y+v*s*.7-v*4);ctx.lineTo(f.x+u*s,f.y+v*s*.7);ctx.lineTo(f.x+u*s-u*5,f.y+v*s*.7);});ctx.stroke();}
    ctx.font=`600 ${small?9.5:11}px JetBrains Mono, monospace`;ctx.textAlign="left";ctx.fillStyle=B(.95);ctx.fillText(small?"AGENTS →":"FEDERAL AGENTS → INTO CHURCH BUILDINGS",14,22);
    ctx.textAlign="right";ctx.fillStyle=G(1);ctx.fillText(small?"← PROTESTERS":"← PROTESTERS INTO A WORSHIP SERVICE",W-14,22);
    ctx.textAlign="center";ctx.fillStyle=K(.55);ctx.fillText("EVERY CROSSING LEAVES A FRAME",cx,H-16);
  });
})();

/* ---------- closing: five rings, one per question; the door at the base stays open ---------- */
(function(){
  const cv=document.getElementById("close3");if(!cv)return;
  const lis=[...document.querySelectorAll("#yours .qs li")];let on=-1;
  const O=Array.from({length:150},()=>({ring:Math.floor(Math.random()*5),a:Math.random()*TAU,w:(.1+Math.random()*.25)*(Math.random()<.5?-1:1),s:.6+Math.random()*1.4}));
  const U=Array.from({length:50},()=>({x:Math.random(),y:Math.random(),v:.002+Math.random()*.004}));
  const sg=stage(cv,(ctx,W,H,t)=>{
    ctx.clearRect(0,0,W,H);
    const cx=W/2,cy=H*.38,R=Math.min(W*.42,H*.3);
    for(let k=0;k<5;k++){const r=R*(.28+k*.18),hot=k===on;ctx.strokeStyle=hot?G(.95):G(.28);ctx.lineWidth=hot?2:1;ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.stroke();
      ctx.fillStyle=hot?G(1):K(.4);ctx.font="600 10px JetBrains Mono, monospace";ctx.textAlign="left";ctx.fillText(String(k+1),cx+r*.707+3,cy-r*.707-3);}
    for(const o of O){const r=R*(.28+o.ring*.18),hot=o.ring===on,a=o.a+t*o.w*(hot?2.2:1);ctx.fillStyle=hot?G(.95):B(.4);ctx.beginPath();ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,o.s*(hot?1.5:1),0,TAU);ctx.fill();}
    // the open door: a pointed arch at the base, light passing both ways
    const dw=Math.min(W*.18,62),db=H-18,dt=H*.86;
    ctx.strokeStyle=K(.4);ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(cx-dw,db);ctx.lineTo(cx-dw,dt);ctx.arcTo(cx-dw,dt-dw*1.1,cx,dt-dw*1.3,dw*1.4);ctx.lineTo(cx,dt-dw*1.3);ctx.arcTo(cx+dw,dt-dw*1.1,cx+dw,dt,dw*1.4);ctx.lineTo(cx+dw,db);ctx.stroke();
    for(const u of U){u.y-=u.v;if(u.y<.62)u.y=1;const x=cx+(u.x-.5)*dw*1.7,y=u.y*H;ctx.fillStyle=G(Math.max(0,.7*(1-Math.abs(u.y-.85)*4)));ctx.fillRect(x-1,y-1,2,2);}
  });
  lis.forEach((li,i)=>{li.tabIndex=0;const f=()=>{on=i;lis.forEach((l,j)=>l.classList.toggle("on",j===i));sg.redraw();};li.addEventListener("mouseenter",f);li.addEventListener("focus",f);li.addEventListener("click",f);});
})();

drawRoute();drawDial();drawTL();
})();

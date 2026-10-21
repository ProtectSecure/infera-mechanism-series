
(function(){
'use strict';
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches, NS='http://www.w3.org/2000/svg';
function $(id){return document.getElementById(id);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function el(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
var io='IntersectionObserver' in window? new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1}):null;
document.querySelectorAll('.rv').forEach(function(n){ if(io&&!RM) io.observe(n); else n.classList.add('in'); });
(function(){ var v=$('heroVid'); if(!v||RM) return; v.play().catch(function(){}); v.addEventListener('playing',function(){ var p=v.parentNode.querySelector('.poster'); if(p) p.style.opacity=0; }); })();

var F=['Christian','Muslim','Jewish','Hindu','No religion'];
var SIG=[
 {g:'Location',n:'Phone at a church most Sunday mornings',w:[40,0,0,0,0]},
 {g:'Location',n:'Phone at a mosque most Friday middays',w:[0,40,0,0,0]},
 {g:'Location',n:'Phone at a synagogue most Saturday mornings',w:[0,0,40,0,0]},
 {g:'Location',n:'Phone at a temple most weeks',w:[0,0,0,40,0]},
 {g:'Purchases',n:'Bought a study Bible',w:[16,0,0,0,0]},
 {g:'Purchases',n:'Regular halal grocery orders',w:[0,15,0,0,0]},
 {g:'Purchases',n:'Regular kosher grocery orders',w:[0,0,15,0,0]},
 {g:'Purchases',n:'Bought Diwali lights and sweets',w:[0,0,0,14,0]},
 {g:'Schedule',n:'Phone goes quiet Friday sunset to Saturday night',w:[0,0,22,0,0]},
 {g:'Schedule',n:'Active before dawn every day for a month in spring',w:[0,20,0,0,0]},
 {g:'Schedule',n:'No screen time Sunday 9 to 11 a.m.',w:[10,0,0,0,0]},
 {g:'Apps and follows',n:'Prayer-time app installed',w:[0,24,0,0,0]},
 {g:'Apps and follows',n:'Daily Bible app installed',w:[24,0,0,0,0]},
 {g:'Apps and follows',n:'Follows a rabbi\'s account',w:[0,0,18,0,0]},
 {g:'Apps and follows',n:'Follows a temple\'s page',w:[0,0,0,18,0]},
 {g:'Apps and follows',n:'Follows a secular humanist podcast',w:[0,0,0,0,28]},
 {g:'Photos',n:'Posted photos from a baptism',w:[18,0,0,0,0]},
 {g:'Photos',n:'Posted a gym selfie at 6 a.m.',w:[0,0,0,0,0]}
];
var on=SIG.map(function(){return false;});
var PRE={sunday:[0,4,10,12,16],ramadan:[1,5,9,11],shabbat:[2,6,8,13],clear:[]};
(function(){ var box=$('sigs'), g=null, html='';
  SIG.forEach(function(s,i){ if(s.g!==g){ g=s.g; html+='<h3>'+esc(g)+'</h3>'; } html+='<button type="button" class="sig" data-i="'+i+'" aria-pressed="false"><i></i><span>'+esc(s.n)+'</span></button>'; });
  box.insertAdjacentHTML('beforeend',html);
  box.querySelectorAll('.sig').forEach(function(b){ b.addEventListener('click',function(){ var i=+b.dataset.i; on[i]=!on[i]; b.setAttribute('aria-pressed',String(on[i])); update(); }); });
  box.querySelectorAll('.preset button').forEach(function(b){ b.addEventListener('click',function(){ var p=PRE[b.dataset.p]; on=SIG.map(function(_,i){return p.indexOf(i)>=0;}); box.querySelectorAll('.sig').forEach(function(x,i){x.setAttribute('aria-pressed',String(on[i]));}); update(); }); });
})();
var POSTS=[
 {t:'Running shoes, 30% off',f:-1},{t:'Local news: council votes on budget',f:-1},{t:'Concert tickets this weekend',f:-1},{t:'Pizza delivery near you',f:-1},{t:'New phone, trade in your old one',f:-1},
 {t:'Christian dating app: meet someone who shares your faith',f:0},{t:'Easter services near you',f:0},
 {t:'Ramadan meal kits, delivered before dawn',f:1},{t:'Kosher wine for Passover',f:2},{t:'Diwali sale on gold jewelry',f:3},
 {t:'Freethinkers meetup this Thursday',f:4},
 {t:'Political ad: "Protect religious liberty, vote Tuesday"',f:9,pol:true}
];
var feedEl=$('feedEl'), cards=POSTS.map(function(p,i){ var d=document.createElement('div'); d.className='card'; d.innerHTML='<div class="t">'+esc(p.t)+'</div><div class="why"></div><span class="stamp">CONSENT</span>'; feedEl.appendChild(d); return d; });
feedEl.style.height=(POSTS.length*86)+'px';
var conf=[0,0,0,0,0], state='MD', consented=false, optedOut=false;
var vid=$('pVid');
function compute(){
  var s=[0,0,0,0,0]; SIG.forEach(function(x,i){ if(on[i]) x.w.forEach(function(w,j){ s[j]+=w; }); });
  var tot=s.reduce(function(a,b){return a+b;},0);
  conf=s.map(function(v){ return v<=0?0:Math.min(.97, v/(v+28+(tot-v)*.6)); });
}
var LAW={}; // filled below
function update(){
  compute();
  var best=0; conf.forEach(function(c,i){ if(c>conf[best]) best=i; }); var top=conf[best], religious=Math.max(conf[0],conf[1],conf[2],conf[3]);
  $('bars').innerHTML=F.map(function(f,i){ var p=Math.round(conf[i]*100); return '<div class="brow"><span>'+esc(f)+'</span><div class="b"><span style="width:'+p+'%"></span></div><span class="v">'+p+'%</span></div>'; }).join('');
  $('pRead').innerHTML= top>0 ? 'INFERRED: <b>'+esc(F[best])+'</b> · '+Math.round(top*100)+'%<br>'+(top>.7?'Segment sold as "likely '+esc(F[best].toLowerCase())+'"':'Below a typical targeting threshold') : 'INFERRED: <b>nothing yet</b><br>Turn on signals to the left';
  $('pDots').style.opacity=(0.15+top*0.75).toFixed(2); $('pRet').style.opacity= top>.6?1:0;
  if(vid && vid.readyState>=1 && vid.duration){ try{ vid.currentTime=Math.min(vid.duration-.05, top*vid.duration); $('pPoster').style.opacity= top>0?0:1; }catch(e){} }
  // law
  var L=LAW[state]||LAW._none, blocked=0, reach=0;
  var score=POSTS.map(function(p,i){
    if(p.f===-1) return {i:i,s:.36-i*.01,tgt:false};
    var c = p.f===9 ? religious : conf[p.f];
    return {i:i,s:c>0? c+0.12 : 0.05-i*.001,tgt:c>0.35,c:c};
  });
  score.forEach(function(o){ var p=POSTS[o.i], card=cards[o.i], why=card.querySelector('.why');
    card.classList.toggle('tgt',o.tgt&&!p.pol); card.classList.toggle('pol',o.tgt&&!!p.pol); card.classList.remove('blocked');
    if(!o.tgt){ why.textContent= p.f===-1? 'Shown to everyone nearby' : 'Not matched to you'; return; }
    var lbl= p.pol ? 'religious, '+Math.round(o.c*100)+'%' : F[p.f].toLowerCase()+', '+Math.round(o.c*100)+'%';
    var isBlocked = L.block(consented,optedOut);
    if(isBlocked){ card.classList.add('blocked'); why.textContent='Blocked in '+L.n+': '+L.why; blocked++; o.s-=1; }
    else { why.textContent='Why you see this: inferred '+lbl; reach++; }
  });
  score.sort(function(a,b){return b.s-a.s;});
  score.forEach(function(o,rank){ cards[o.i].style.top=(rank*86)+'px'; });
  $('feedCount').textContent=reach+' targeted by inferred faith'+(blocked?' · '+blocked+' blocked':'');
  $('reach').textContent= religious<.35 && conf[4]<.35 ? 'The system has no confident guess yet, so the feed is the same for everyone nearby.' : (reach? reach+' post'+(reach===1?'':'s')+' reach you because of a guess about your faith'+(blocked?', and '+blocked+' would need your yes first.':'.') : 'Every post aimed at your inferred faith is held back in '+L.n+'.');
  drawRule();
}
/* tile map */
var POS={AK:[0,0],ME:[11,0],VT:[10,1],NH:[11,1],WA:[1,2],ID:[2,2],MT:[3,2],ND:[4,2],MN:[5,2],IL:[6,2],WI:[7,2],MI:[8,2],NY:[9,2],RI:[10,2],MA:[11,2],OR:[1,3],NV:[2,3],WY:[3,3],SD:[4,3],IA:[5,3],IN:[6,3],OH:[7,3],PA:[8,3],NJ:[9,3],CT:[10,3],CA:[1,4],UT:[2,4],CO:[3,4],NE:[4,4],MO:[5,4],KY:[6,4],WV:[7,4],VA:[8,4],MD:[9,4],DE:[10,4],AZ:[2,5],NM:[3,5],KS:[4,5],AR:[5,5],TN:[6,5],NC:[7,5],SC:[8,5],DC:[9,5],OK:[4,6],LA:[5,6],MS:[6,6],AL:[7,6],GA:[8,6],HI:[0,7],TX:[4,7],FL:[9,7]};
var NAMES={VA:'Virginia',CO:'Colorado',CT:'Connecticut',MD:'Maryland',CA:'California',UT:'Utah',IA:'Iowa',TX:'Texas',OR:'Oregon',MT:'Montana',DE:'Delaware',NJ:'New Jersey',NH:'New Hampshire',TN:'Tennessee',IN:'Indiana',KY:'Kentucky',NE:'Nebraska',MN:'Minnesota',RI:'Rhode Island',FL:'Florida'};
var T={
 consent:{c:'#2f5bd3',lab:'Consent required (opt-in)'},
 strict:{c:'#c8382d',lab:'Strictly necessary; sale banned'},
 limit:{c:'#6a4bc4',lab:'Right to limit (opt-out)'},
 notice:{c:'#a36a0b',lab:'Notice and opt-out'},
 none:{c:'#b9bfcc',lab:'No comprehensive law'}
};
var TYPE={VA:'consent',CO:'consent',CT:'consent',TX:'consent',OR:'consent',MT:'consent',DE:'consent',NJ:'consent',NH:'consent',TN:'consent',IN:'consent',KY:'consent',NE:'consent',MN:'consent',RI:'consent',FL:'consent',MD:'strict',CA:'limit',UT:'notice',IA:'notice'};
var VERIFIED={VA:'fact',CO:'fact',CT:'rep',MD:'rep',CA:'rep',UT:'rep',IA:'rep'};
function mk(st){ var ty=TYPE[st]||'none', n=NAMES[st]||st;
  if(ty==='consent') return {ty:ty,n:n,why:'needs your consent',block:function(c){return !c;},h:n+' requires your consent',li:(st==='CO'?['Consent is required for sensitive data inferences, including religion, by rule.','Exception for people over 13: the inference is obvious, used only as disclosed, never shared, deleted within 24 hours. Ad targeting shares data, so it would not fit.']:st==='VA'?['Sensitive data means personal data "revealing" religious beliefs.','Processing it needs "a clear affirmative act" of consent.','Whether a location-based guess "reveals" belief is untested.']:st==='FL'?['Florida\'s law applies only to very large companies; we did not analyze its terms.']:['Consent is required to process sensitive data, which includes religious beliefs, per a January 2026 comparison chart.','Whether that reaches inferred religion is not settled in the sources we read.']),act:'consent'};
  if(ty==='strict') return {ty:ty,n:n,why:'only if strictly necessary; sale banned',block:function(){return true;},h:'Maryland allows it only when strictly necessary',li:['Sensitive data, including religious beliefs, may be processed only when strictly necessary to provide a product or service you asked for.','Selling sensitive data is banned, with narrow exceptions.','Our reading: ad targeting by inferred faith would not meet that bar, even with consent.'],act:null};
  if(ty==='limit') return {ty:ty,n:n,why:'you limited use of sensitive info',block:function(c,o){return o;},h:'California gives you a right to limit',li:['Religious or philosophical beliefs are sensitive personal information.','When it is used to infer characteristics, you can tell the business to limit its use; it may not ask again for 12 months.','The default is on until you act.'],act:'limit'};
  if(ty==='notice') return {ty:ty,n:n,why:'you opted out',block:function(c,o){return o;},h:n+' requires notice and a chance to opt out',li:['Religious belief is sensitive data.','The business must tell you and let you opt out before processing it; it does not need your yes.'],act:'optout'};
  return {ty:'none',n:NAMES[st]||st,why:'',block:function(){return false;},h:'No comprehensive privacy law',li:['No state consumer privacy law requires notice or consent for inferring your faith.','Federal rules reach only specific cases, like the FTC\'s actions against brokers selling visits to places of worship.'],act:null};
}
Object.keys(POS).forEach(function(s){ LAW[s]=mk(s); }); LAW._none=mk('XX');
(function(){ var g=$('tiles'), cells=[];
  for(var r=0;r<8;r++) for(var c=0;c<12;c++){ var st=null; for(var k in POS) if(POS[k][0]===c&&POS[k][1]===r) st=k;
    cells.push(st? '<button type="button" class="tile" data-s="'+st+'" aria-pressed="'+(st===state)+'" style="background:'+T[LAW[st].ty].c+'" aria-label="'+(NAMES[st]||st)+': '+T[LAW[st].ty].lab+'">'+st+'</button>' : '<span></span>'); }
  g.innerHTML=cells.join('');
  g.querySelectorAll('.tile').forEach(function(b){ b.addEventListener('click',function(){ state=b.dataset.s; consented=false; optedOut=false; g.querySelectorAll('.tile').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); update(); }); });
  $('lawLegend').innerHTML=Object.keys(T).map(function(k){return '<span><i style="background:'+T[k].c+'"></i>'+T[k].lab+'</span>';}).join('');
})();
function drawRule(){ var L=LAW[state], v=VERIFIED[state], chip= v==='fact'?'<span class="chip fact">FACT</span>': v==='rep'?'<span class="chip rep">REPORTED</span>': L.ty==='none'?'<span class="chip inf">INFERENCE</span>':'<span class="chip rep">REPORTED · CHART</span>';
  var act='';
  if(L.act==='consent') act='<div class="act"><button type="button" id="aBtn" aria-pressed="'+consented+'">I said yes when asked</button></div>';
  if(L.act==='limit') act='<div class="act"><button type="button" id="aBtn" aria-pressed="'+optedOut+'">Limit the use of my sensitive information</button></div>';
  if(L.act==='optout') act='<div class="act"><button type="button" id="aBtn" aria-pressed="'+optedOut+'">Opt out</button></div>';
  $('rule').innerHTML='<h3>'+esc(L.h)+' '+chip+'</h3><ul>'+L.li.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>'+act;
  var b=$('aBtn'); if(b) b.addEventListener('click',function(){ if(L.act==='consent') consented=!consented; else optedOut=!optedOut; update(); });
}
if(vid) vid.addEventListener('loadedmetadata',update);
update();
var started=false;
if(io&&!RM){ var o=new IntersectionObserver(function(es){ if(es[0].isIntersecting&&!started){ started=true; var seq=PRE.sunday, k=0; (function step(){ if(k>=seq.length) return; on[seq[k]]=true; document.querySelectorAll('.sig')[seq[k]].setAttribute('aria-pressed','true'); update(); k++; setTimeout(step,700); })(); } },{threshold:.3}); o.observe($('feedEl')); }

/* Room B: geofence */
var gs=$('geoSvg'), PH=[];
(function(){
  el('rect',{x:0,y:0,width:800,height:520,fill:'#f7f8fb'},gs);
  [[0,120,800,26],[0,370,800,26],[210,0,26,520],[560,0,26,520]].forEach(function(r){ el('rect',{x:r[0],y:r[1],width:r[2],height:r[3],fill:'#e3e7ee'},gs); });
  for(var i=0;i<14;i++){ var bx=[30,90,250,320,610,680,40,110,260,330,620,690,450,470][i], by=[20,60,20,60,20,60,180,240,420,460,420,460,20,440][i]; el('rect',{x:bx,y:by,width:48,height:36,rx:3,fill:'#e9ecf1',stroke:'#d3d8e2'},gs); }
  var ch=el('g',{},gs);
  el('rect',{x:300,y:190,width:200,height:140,fill:'#fff',stroke:'#121826','stroke-width':2},ch);
  el('path',{d:'M290 192 L400 140 L510 192 Z',fill:'#fff',stroke:'#121826','stroke-width':2},ch);
  el('rect',{x:385,y:100,width:30,height:50,fill:'#fff',stroke:'#121826','stroke-width':2},ch);
  el('path',{d:'M400 70 v26 M390 80 h20',stroke:'#121826','stroke-width':3},ch);
  el('rect',{x:385,y:280,width:30,height:50,fill:'#e9ecf1',stroke:'#121826','stroke-width':2},ch);
  el('rect',{x:270,y:150,width:260,height:210,rx:16,fill:'none',stroke:'#2f5bd3','stroke-width':3,'stroke-dasharray':'10 8','class':'fence'},gs);
  el('text',{x:278,y:378,'font-family':'JetBrains Mono, monospace','font-size':12,fill:'#2f5bd3'},gs).textContent='GEOFENCE';
  var seed=7; function rnd(){ seed=(seed*9301+49297)%233280; return seed/233280; }
  for(var p=0;p<120;p++){ var inside=p<70, x,y; if(inside){ x=290+rnd()*220; y=200+rnd()*140; } else { x=20+rnd()*760; y=20+rnd()*480; if(x>260&&x<540&&y>140&&y<370) y=y<255?120:400; }
    var reg=rnd()<.62; var prob= inside ? (p<45? .85 : .35) : 0;
    PH.push({x:x,y:y,inside:inside,prob:prob,reg:reg,visits:[],e:el('circle',{cx:x.toFixed(1),cy:y.toFixed(1),r:4,fill:'#b9bfcc','class':'ph'},gs)});
  }
  for(var w=0;w<13;w++) PH.forEach(function(ph){ ph.visits.push(ph.inside && rnd()<ph.prob); });
})();
var voter=false;
function geo(){
  var wk=+$('wk').value, need=+$('need').value; $('oWk').textContent=wk; $('oNeed').textContent=need;
  var tagged=0, named=0, unreg=0;
  PH.forEach(function(ph){ var v=0; for(var i=0;i<wk;i++) if(ph.visits[i]) v++;
    var t= v>=need; if(t){ tagged++; if(voter){ named++; if(!ph.reg) unreg++; } }
    ph.e.setAttribute('r', t?7:(v>0?5:3.5)); ph.e.setAttribute('fill', t?(voter&&!ph.reg?'#c8382d':'#2f5bd3'):(v>0?'#8aa3e6':'#b9bfcc')); });
  $('kTag').textContent=tagged; $('kUnreg').textContent= voter? unreg : '-'; $('kUnregL').textContent= voter? 'Matched and not registered to vote' : 'Match to a voter file to see names';
  $('geoNote').textContent= wk<need ? 'Not enough weeks yet for anyone to meet the rule.' : 'In '+wk+' weeks, '+tagged+' of 120 phones met the rule. A phone that shows up '+need+' times becomes "Catholic" in a database, whether its owner is a parishioner, a choir accompanist or a contractor fixing the roof.';
}
['wk','need'].forEach(function(id){ $(id).addEventListener('input',geo); });
$('voter').addEventListener('click',function(){ voter=!voter; this.setAttribute('aria-pressed',String(voter)); geo(); });
geo();
var gstarted=false;
if(io&&!RM){ var og=new IntersectionObserver(function(es){ if(es[0].isIntersecting&&!gstarted){ gstarted=true; var w=1; var t=setInterval(function(){ w++; $('wk').value=w; geo(); if(w>=13) clearInterval(t); },450); } },{threshold:.4}); og.observe(gs); }
})();

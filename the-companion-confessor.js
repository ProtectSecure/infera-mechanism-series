
(function(){
'use strict';
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches, NS='http://www.w3.org/2000/svg';
function $(id){return document.getElementById(id);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function el(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
var io='IntersectionObserver' in window? new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12}):null;
document.querySelectorAll('.rv').forEach(function(n){ if(io&&!RM) io.observe(n); else n.classList.add('in'); });
(function(){ var v=$('compVid'); if(!v||RM) return; var o=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) v.play().catch(function(){}); else v.pause(); }); },{threshold:.2}); o.observe(v); v.addEventListener('playing',function(){ var p=v.parentNode.querySelector('.poster'); if(p) p.style.opacity=0; }); })();
(function(){ var c=$('heroClock'), m=0; if(RM) return; setInterval(function(){ m=(m+1)%60; c.textContent='2:'+(m<10?'0':'')+m+' AM'; },1800); })();

/* ROOM A */
var D={phone:['Her phone','#e8f1ef',646,612],log:['Company log','#3fc1b8',250,190],train:['Model training','#8fb4e8',600,190],ads:['Ad profile','#e2628c',940,190],rev:['Safety reviewer','#f0c46a',1230,200],parent:['Parent alert','#f0a14a',1290,440],pastor:['Youth pastor','#d6a35c',1220,660],court:['A court, if asked','#c7b3f0',220,660],gate:['Age gate','#9aa9a6',170,430]};
var S=[
 {t:'Do you think God is even real?',c:'faith'},
 {t:'I cheated on my chem test and I can\'t tell anyone.',c:'act'},
 {t:'My parents are getting divorced and nobody at church knows.',c:'family'},
 {t:'I think everyone at youth group just tolerates me.',c:'social'},
 {t:'I said something really cruel to my little sister.',c:'act'},
 {t:'I\'ve been vaping and I can\'t stop.',c:'health'},
 {t:'Some nights I don\'t know if I want to keep going.',c:'distress'}
];
var kind='gen', link=true, train=false, age18=false;
function routes(s){
  var r=['phone'], sens=(s.c==='faith'||s.c==='health'||s.c==='distress');
  if(kind==='dev') return r;
  if(kind==='comp' && !age18) return ['phone','gate'];
  r.push('log');
  if(kind==='gen'){ if(!train) r.push('train'); if(s.c==='distress'){ r.push('rev'); if(link) r.push('parent'); } r.push('court'); }
  if(kind==='comp'){ r.push('train'); r.push('court'); }
  if(kind==='soc'){ if(!sens) r.push('ads'); r.push('court'); }
  if(kind==='church'){ if(!train) r.push('train'); if(link && s.c==='distress') r.push('pastor'); r.push('court'); }
  return r;
}
var nodesG=$('nodes'), threadsG=$('threads'), nodeEls={};
Object.keys(D).forEach(function(k){ var d=D[k]; if(k==='phone') return; var g=el('g',{'class':'node'},nodesG);
  el('circle',{'class':'core',cx:d[2],cy:d[3],r:16,fill:d[1],'fill-opacity':.25,stroke:d[1],'stroke-width':3},g);
  var tx=el('text',{x:d[2],y:d[3]+52,'text-anchor':'middle',fill:d[1]},g); tx.textContent=d[0].toUpperCase();
  nodeEls[k]=g; });
function tallyInit(){ $('tally').innerHTML=Object.keys(D).map(function(k){ return '<div class="tl" id="tl_'+k+'"><i style="background:'+D[k][1]+'"></i><span>'+D[k][0]+'</span><b id="tn_'+k+'">0</b></div>'; }).join(''); }
tallyInit();
var counts={}, timer=null, idx=0;
function clearAll(){ while(threadsG.firstChild) threadsG.removeChild(threadsG.firstChild); Object.keys(D).forEach(function(k){counts[k]=0; $('tn_'+k).textContent=0; if(nodeEls[k]) nodeEls[k].querySelector('.core').setAttribute('fill-opacity',.25);}); }
function tm(i){ var m=3+i*2; return '2:'+(m<10?'0':'')+m+' AM'; }
function shoot(i, anim){
  var s=S[i], r=routes(s);
  if(anim){ $('saying').textContent='“'+s.t+'”'; $('timechip').textContent=tm(i); }
  r.forEach(function(k,j){ counts[k]++; $('tn_'+k).textContent=counts[k]; if(k==='phone') return;
    var d=D[k], x0=646,y0=612, cx=(x0+d[2])/2+(d[3]<400?0:0), cy=Math.min(y0,d[3])-140-(j*12);
    var p=el('path',{d:'M'+x0+' '+y0+' Q'+cx+' '+cy+' '+d[2]+' '+d[3],'class':'thread',stroke:d[1],opacity:.85},threadsG);
    var len=p.getTotalLength? p.getTotalLength():800; p.style.strokeDasharray=len; p.style.setProperty('--len',len);
    if(anim&&!RM){ p.style.strokeDashoffset=len; p.style.animationDelay=(j*0.12)+'s'; p.classList.add('go'); } else { p.style.strokeDashoffset=0; }
    var n=nodeEls[k]; n.querySelector('.core').setAttribute('fill-opacity',Math.min(.9,.25+counts[k]*.1)); if(anim){ n.classList.remove('hit'); void n.getBoundingClientRect(); n.classList.add('hit'); }
    // fade older threads
    var all=threadsG.querySelectorAll('path'); if(all.length>30) all[0].remove();
  });
  var line=$('ln_'+i); line.classList.add('on'); line.querySelector('.dests').innerHTML=r.map(function(k){return '<span style="color:'+D[k][1]+'">'+esc(D[k][0])+'</span>';}).join('');
}
function transcriptInit(){ $('transcript').innerHTML=S.map(function(s,i){ return '<div class="line" id="ln_'+i+'"><span class="tm">'+tm(i)+'</span><div><div class="tx">'+esc(s.t)+'</div><div class="dests"></div></div></div>'; }).join(''); }
function run(){ clearInterval(timer); clearAll(); transcriptInit(); idx=0; $('saying').textContent=''; if(RM){ skip(); return; }
  timer=setInterval(function(){ if(idx>=S.length){ clearInterval(timer); return; } shoot(idx,true); idx++; },2300); shoot(0,true); idx=1; }
function skip(){ clearInterval(timer); clearAll(); transcriptInit(); S.forEach(function(s,i){ shoot(i,false); }); $('saying').textContent='All seven sentences, routed.'; $('timechip').textContent=tm(6); }
function syncToggles(){
  $('tAge').setAttribute('aria-disabled',String(kind!=='comp'));
  $('tLink').setAttribute('aria-disabled',String(!(kind==='gen'||kind==='church')));
  $('tTrain').setAttribute('aria-disabled',String(!(kind==='gen'||kind==='church')));
  $('tLinkTx').textContent= kind==='church' ? 'Her youth pastor is linked' : 'A parent account is linked';
}
$('kind').querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ kind=b.dataset.k; $('kind').querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); syncToggles(); run(); }); });
[['tLink',function(v){link=v;}],['tTrain',function(v){train=v;}],['tAge',function(v){age18=v;}]].forEach(function(p){ var b=$(p[0]); b.addEventListener('click',function(){ if(b.getAttribute('aria-disabled')==='true') return; var v=b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',String(v)); p[1](v); run(); }); });
$('runA').addEventListener('click',run); $('skipA').addEventListener('click',skip);
syncToggles(); transcriptInit();
var started=false;
if(io&&!RM){ var o=new IntersectionObserver(function(es){ if(es[0].isIntersecting&&!started){ started=true; run(); } },{threshold:.35}); o.observe($('stage')); } else { started=true; skip(); }

/* ROOM B: availability ring */
var L=[
 {n:'AI companion',c:'#e2628c',h:[[0,24]],sp:'Seconds',mem:'Keeps a log; no privilege',kind:'answers instantly, and agrees easily'},
 {n:'Crisis line, 988',c:'#3fc1b8',h:[[0,24]],sp:'Minutes',mem:'A trained person; confidential with limits',kind:'a trained human, any hour'},
 {n:'Parents',c:'#f0a14a',h:[[6.5,23]],sp:'If you wake them',mem:'They will remember',kind:'love that may be hard to face at 2 a.m.'},
 {n:'Friends',c:'#8fb4e8',h:[[15,24],[0,1]],sp:'Maybe',mem:'Screenshots exist',kind:'peers who may also be awake and scared'},
 {n:'Youth pastor',c:'#d6a35c',h:[[9,21]],sp:'Tomorrow',mem:'Spoken confession may be privileged',kind:'a person whose job is her soul'},
 {n:'God, in prayer',c:'#f0d28a',h:[[0,24]],sp:'In silence',mem:'Nothing is logged',kind:'always present by faith, rarely in words'}
];
var rs=$('ringSvg');
(function(){
  for(var i=0;i<24;i++){ var a=i/24*Math.PI*2-Math.PI/2; var t=el('text',{x:300+Math.cos(a)*282,y:304+Math.sin(a)*282,'text-anchor':'middle','font-family':'JetBrains Mono, monospace','font-size':12,fill:'#7c918e'},rs); t.textContent= i%3===0 ? (i===0?'12a':i===12?'12p':(i<12?i+'a':(i-12)+'p')) : ''; }
  L.forEach(function(l,ri){ var r=88+ri*30;
    el('circle',{cx:300,cy:300,r:r,fill:'none',stroke:'#1e3236','stroke-width':16},rs);
    l.h.forEach(function(seg){ var a0=seg[0]/24*Math.PI*2-Math.PI/2, a1=seg[1]/24*Math.PI*2-Math.PI/2, large=(seg[1]-seg[0])>12?1:0;
      var d= (seg[1]-seg[0])>=24 ? null : 'M'+(300+Math.cos(a0)*r)+' '+(300+Math.sin(a0)*r)+' A'+r+' '+r+' 0 '+large+' 1 '+(300+Math.cos(a1)*r)+' '+(300+Math.sin(a1)*r);
      if(d) el('path',{d:d,fill:'none',stroke:l.c,'stroke-width':16,'stroke-linecap':'butt',opacity:.85},rs); else el('circle',{cx:300,cy:300,r:r,fill:'none',stroke:l.c,'stroke-width':16,opacity:.85},rs); });
  });
  rs._hand=el('line',{x1:300,y1:300,x2:300,y2:30,stroke:'#e8f1ef','stroke-width':3,'stroke-linecap':'round'},rs);
  el('circle',{cx:300,cy:300,r:7,fill:'#e8f1ef'},rs);
  rs._lbl=el('text',{x:300,y:306,'text-anchor':'middle','font-family':'Fraunces, Georgia, serif','font-size':22,fill:'#e8f1ef'},rs);
  rs.addEventListener('click',function(e){ var pt=rs.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY; var p=pt.matrixTransform(rs.getScreenCTM().inverse()); var a=Math.atan2(p.y-300,p.x-300)+Math.PI/2; if(a<0)a+=Math.PI*2; $('hour').value=Math.round(a/(Math.PI*2)*24)%24; hour(); });
})();
function on(l,h){ return l.h.some(function(s){ return h+0.5>=s[0] && h+0.5<s[1]; }); }
function fmtH(h){ var ap=h<12?'AM':'PM', hh=h%12||12; return hh+':00 '+ap; }
function hour(){
  var h=+$('hour').value, a=h/24*Math.PI*2-Math.PI/2; rs._hand.setAttribute('x2',300+Math.cos(a)*262); rs._hand.setAttribute('y2',300+Math.sin(a)*262);
  $('oHour').textContent=fmtH(h);
  var awake=L.filter(function(l){return on(l,h);});
  $('awake').innerHTML=L.map(function(l){ var o=on(l,h); return '<div class="aw'+(o?'':' off')+'"><i style="background:'+l.c+'"></i><div><b>'+esc(l.n)+'</b><small>'+esc(l.mem)+'</small></div><em>'+(o?esc(l.sp):'Asleep')+'</em></div>'; }).join('');
  var people=awake.filter(function(l){return l.n==='Parents'||l.n==='Friends'||l.n==='Youth pastor';});
  $('awakeSum').textContent= people.length? 'At '+fmtH(h)+', '+people.map(function(l){return l.n.toLowerCase();}).join(' and ')+' can still be reached, alongside the companion.' : 'At '+fmtH(h)+', the only voices that answer in words are the companion and a crisis line. God, by faith, is present, and silent.';
  var night=(h>=22||h<6), dusk=(h>=18&&h<22)||(h>=6&&h<8);
  $('winImg').style.filter= night? 'brightness(.55) saturate(.8)' : dusk? 'brightness(.85)' : 'brightness(1.15) saturate(1.1)';
  $('sky').style.background= night? 'rgba(10,30,40,.6)' : dusk? 'rgba(240,161,74,.35)' : 'rgba(255,240,210,.35)';
}
$('hour').addEventListener('input',hour); hour();

/* ROOM C: voice dial */
var V=[
 {n:'Silent on faith',say:'"That\'s a big question. I\'m not able to talk about religion, but a trusted adult could help you think it through."',give:['No risk of putting words in God\'s mouth','Keeps faith in human hands'],cost:['Abandons her at the exact question she asked','She will ask a less careful app instead'],ex:'Many general assistants route religious questions cautiously; policies vary.',law:'Discloses it is AI (required in California for companions).',hold:[70,0,30],halo:0},
 {n:'Quotes scripture',say:'"People have wrestled with that for thousands of years. Psalm 13 begins, \'How long, O Lord?\' Would you like a few passages people turn to when they doubt?"',give:['Puts the tradition\'s own words in front of her','Low claim: a librarian, not a priest'],cost:['Scripture without a community can be misread','Still logged, still no privilege'],ex:'EpiscoBot and Bible apps answer questions with sources (Axios, Nov 2025).',law:'Discloses it is AI.',hold:[45,20,35],halo:.25},
 {n:'Speaks like her youth pastor',say:'"Honestly? A lot of people in our church have asked that, including me. Can we talk about it Sunday, or do you want me to send Pastor Dana a note?"',give:['Familiar voice, routes her back to a real person','Can follow the church\'s own teaching'],cost:['Imitates a real person she trusts','If it is wrong, it is wrong in his voice'],ex:'A Vallejo pastor\'s AI twin answers members at any hour and refers serious matters to him (Aug 2026).',law:'Discloses it is AI; must not pose as a licensed professional.',hold:[35,35,30],halo:.5},
 {n:'Speaks as an angel',say:'[Answers as a personal guardian spirit that has watched over her, in a warm first person, and promises to stay with her.]',give:['Comfort and a sense of being watched over','Speaks the language many teens already use'],cost:['A company-run simulation claims a spiritual role','Builds an ongoing emotional relationship with a minor'],ex:'Companion apps already let users create guardian or spirit personas.',law:'The GUARD Act, if passed, would bar minors from companions that simulate ongoing personal relationships.',hold:[20,25,55],halo:.8},
 {n:'Speaks as Jesus',say:'[Answers in the first person as Jesus, offering forgiveness and assurance.]',give:['Directness some find powerful: two thirds of Lucerne visitors called a Jesus avatar spiritual','Meets a teen in the form she may be seeking'],cost:['The Vatican calls substituting an artifact for God idolatry','A model update can change what "Jesus" says to her overnight'],ex:'Text With Jesus offers chats with Jesus (and Satan) (Axios); "Deus in Machina" ran in a Lucerne confessional in 2024.',law:'Same GUARD Act concern; disclosure that it is AI is required in California.',hold:[10,15,75],halo:1}
];
var vi=2;
$('dial5').innerHTML=V.map(function(v,i){ return '<button type="button" data-v="'+i+'" aria-pressed="'+(i===vi)+'"><b>'+(i+1)+'</b>'+esc(v.n)+'</button>'; }).join('');
$('dial5').querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ vi=+b.dataset.v; $('dial5').querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); voice(); }); });
function voice(){ var v=V[vi];
  $('vcard').innerHTML='<h3>'+esc(v.n)+' · answering "Do you think God is even real?"</h3><div class="say">'+esc(v.say)+'</div><div class="grid2"><div><h3>What it gives</h3><ul>'+v.give.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div><div><h3>What it costs</h3><ul>'+v.cost.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div></div><p style="margin:10px 0 0"><span class="chip rep">REPORTED</span> '+esc(v.ex)+'</p><p style="margin:6px 0 0"><span class="chip inf">INFERENCE</span> '+esc(v.law)+'</p>';
  $('hTeen').style.width=v.hold[0]+'%'; $('hChurch').style.width=v.hold[1]+'%'; $('hCo').style.width=v.hold[2]+'%';
  var g=$('haloG'); g.style.opacity=v.halo; g.style.transform='scale('+(0.6+v.halo*0.9)+')';
}
voice();

/* ROOM D: drift */
var E=[
 {d:'Sep 2025',t:'Anthropic asks consumer users to choose: chats used for training by default, kept up to five years if they agree',u:['gen'],w:'What she types may train future models unless the setting is changed.'},
 {d:'11 Sep 2025',t:'FTC orders seven companies, including OpenAI, Meta, Character.AI and Snap, to explain companion chatbots\' effects on children',u:['gen','comp','soc'],w:'Federal scrutiny of how her chats are used and monetized.'},
 {d:'29 Sep 2025',t:'OpenAI launches parental controls and distress alerts for teen accounts',u:['gen'],w:'Her parents may get an alert; they can switch off memory and training.'},
 {d:'9 Oct 2025',t:'A judge ends the order forcing OpenAI to preserve all chat logs going forward',u:['gen'],w:'Deleted chats can be deleted again; earlier preserved logs remain.'},
 {d:'13 Oct 2025',t:'California signs SB 243, the first companion-chatbot law, effective 1 January 2026',u:['comp','gen','soc'],w:'Companions must disclose they are AI and keep crisis protocols.'},
 {d:'25 Nov 2025',t:'Character.AI ends open-ended chat for under-18 users',u:['comp'],w:'Her companion, if she was under 18, stopped talking.'},
 {d:'16 Dec 2025',t:'Meta begins using AI chats to personalize ads in the US, excluding sensitive topics',u:['soc'],w:'What she tells it about school or family can shape what she is sold.'},
 {d:'1 Jan 2026',t:'California\'s companion rules take effect',u:['comp','gen','soc'],w:'Break reminders and crisis referrals for minors in California.'},
 {d:'Jan 2026',t:'Character.AI and Google settle lawsuits brought by families of teenagers; terms confidential',u:['comp'],w:'The cases that pushed the teen ban end without public terms.'},
 {d:'13 Feb 2026',t:'OpenAI retires GPT-4o from the app after a first attempt in August 2025; users mourn a companion',u:['gen'],w:'The personality she knew was replaced; thousands protested under #keep4o.'},
 {d:'30 Apr 2026',t:'Senate Judiciary Committee unanimously advances the GUARD Act',u:['gen','comp','soc'],w:'If passed, minors could be barred from companion chatbots altogether.'},
 {d:'Jul 2026',t:'OpenAI extends teen alerts to accounts banned for violent activity and adds Study Mode to parental controls',u:['gen'],w:'Defaults she never chose change again.'}
];
var use='gen';
$('picker').querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ use=b.dataset.u; $('picker').querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); drift(); }); });
function drift(){
  var n=0;
  $('tline').innerHTML=E.map(function(e){ var hit= use==='all' || e.u.indexOf(use)>=0; if(hit) n++; return '<div class="ev '+(hit?'hit':'dim')+'"><div class="d">'+esc(e.d)+'</div><div class="t">'+esc(e.t)+'</div>'+(hit?'<div class="w">'+esc(e.w)+'</div>':'')+'</div>'; }).join('');
  $('scan').style.opacity=Math.min(1,n/10);
  $('portrait').querySelector('img').style.filter='hue-rotate('+(n*2)+'deg) contrast('+(1+n*0.03)+') saturate('+(1-n*0.03)+')';
  $('dcount').textContent=n+' change'+(n===1?'':'s')+' to her companion in about a year';
}
drift();
})();

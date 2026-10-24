function xgBand(v){return v<=20?"Low":v<=45?"Moderate":v<=70?"High":"Very high";}

(function(){
'use strict';
var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var TL = [{"d": "2021", "lb": "30,000 churches", "c": "vendor", "chip": "rep", "t": "A data firm says it works with more than 30,000 churches", "p": ["The Wall Street Journal profiled Gloo, a Colorado company, reporting that it worked with more than 30,000 churches, about one in ten US congregations, and had compiled data on some 245 million Americans.", "Later accounts describe churches using it to reach people showing signs of anxiety, marriage trouble, addiction or grief, and to buy online ads aimed at them. Gloo says its data must be de-identified, and it stopped using mental-health data after the reporting."], "s": "Religion Unplugged / MinistryWatch (Nov 2022) and The Christian Post, both describing the WSJ report"}, {"d": "23 Aug to 20 Oct 2024", "lb": "AI in a confessional", "c": "church", "chip": "rep", "t": "An AI Jesus sits in a real confessional", "p": ["The Peterskapelle in Lucerne, Switzerland, ran \u201cDeus in Machina\u201d: an AI avatar of Jesus on a screen inside an ordinary wooden confessional booth.", "It held roughly 900 conversations in two months. Of the 230 visitors who left feedback, two thirds called the experience spiritual. The church said it was not a sacrament and gave no absolution. We found no public account of how the conversations were stored."], "s": "Pillitteri account of the installation; dates and counts as reported"}, {"d": "28 Jan 2025", "lb": "Vatican note", "c": "rule", "chip": "rep", "t": "The Vatican: AI cannot form authentic relationships", "p": ["Antiqua et Nova, a note from two Vatican dicasteries approved by Pope Francis, says AI \u201ccannot currently replicate moral discernment or the ability to establish authentic relationships.\u201d", "It calls substituting God for a human-made artifact idolatry and warns of \u201cforms of control as subtle as they are invasive.\u201d"], "s": "America Magazine, 28 Jan 2025"}, {"d": "25 Jul 2025", "lb": "No chatbot privilege", "c": "rule", "chip": "rep", "t": "No privilege for confessions made to a chatbot", "p": ["OpenAI's chief executive said conversations with a therapist, lawyer or doctor carry legal privilege, but \u201cwe haven't figured that out yet for when you talk to ChatGPT.\u201d", "A court order in the New York Times lawsuit required OpenAI to preserve users' chats. Whatever a person types to a machine can, today, be asked for in court."], "s": "TechCrunch, 25 Jul 2025"}, {"d": "4 Sep 2025", "lb": "Story withdrawn", "c": "rule", "chip": "fact", "t": "A major outlet withdraws its church-data story", "p": ["MIT Technology Review took down an August 2025 article on how churches use data and AI, saying its account of Gloo's capabilities \u201cwas based largely on a now discontinued product.\u201d", "The lesson for this exhibit: claims about what churches know are contested even in print, and figures that circulate online can outlive their correction."], "s": "MIT Technology Review editor's note, read at primary"}, {"d": "12 Nov 2025", "lb": "Chatbot Jesus", "c": "church", "chip": "rep", "t": "Chatbot Jesus, and a pastor's AI for $49 a month", "p": ["Axios surveyed the field: EpiscoBot from an Episcopal-linked lab, a Text With Jesus app (which also offers Satan), Catholic confession-preparation apps, a megachurch pastor's AI sold at $49 a month, and an A.M.E. pastor's \u201cFaith\u201d app.", "Some church apps analyze attendance and engagement data. One pastor quoted: \u201cYou can't outsource your morality.\u201d"], "s": "Axios, 12 Nov 2025"}, {"d": "19 Feb 2026", "lb": "1 in 3 trust it", "c": "vendor", "chip": "rep", "t": "One in three adults trusts AI's spiritual advice like a pastor's", "p": ["A Barna Group study with Gloo found nearly one in three US adults say spiritual advice from AI is \u201cas trustworthy as advice from a pastor.\u201d Among Gen Z and Millennials, two in five.", "The study is sponsored by a company that sells technology to churches, and the release does not state its sample size."], "s": "Gloo press release, 19 Feb 2026"}, {"d": "25 May 2026", "lb": "Papal encyclical", "c": "rule", "chip": "rep", "t": "Magnifica Humanitas: machines that simulate empathy", "p": ["Pope Leo XIV's first encyclical places AI inside Catholic social teaching. It says such systems can \u201csimulate empathy and understanding\u201d but \u201cdo not feel joy or pain,\u201d and it names \u201cthe massive collection of data\u201d as a threat to freedom.", "Quoted here from a published summary; read the full text before quoting further."], "s": "Magnifica Humanitas, as summarized on Wikipedia"}, {"d": "16 Jun 2026", "lb": "Pastors use AI", "c": "vendor", "chip": "rep", "t": "Most pastors now use AI; few talk about the data", "p": ["In a Barna survey of 442 US Protestant pastors, only 13% said they do not use AI at all. 24% use it to write or edit sermons. 79% worry about AI as a \u201creplacement for God.\u201d", "The release says nothing about congregants' data, privacy or where conversations are kept."], "s": "Gloo press release, 16 Jun 2026"}, {"d": "29 Jun 2026", "lb": "Church for sale?", "c": "church", "chip": "rep", "t": "A data-center developer wants the church itself", "p": ["Manassas Church of the Brethren, founded in 1895, sits on 7 industrial-zoned acres in Virginia near a planned Amazon campus. A developer building shells for cloud companies made an offer; nearby land sold for about $3 million an acre.", "The pastor told the city council: \u201cWe aren't for sale.\u201d The congregation, not the data, is what is being bid on here."], "s": "DatacenterDynamics, 29 Jun 2026"}, {"d": "25 Aug 2026", "lb": "A pastor's twin", "c": "church", "chip": "rep", "t": "A pastor's AI twin, there when he is not", "p": ["Pastor Justin Lester of Friendship Missionary Baptist Church in Vallejo, California built an audio AI twin from his sermons, books, writing and social video. Members use it when he is away, or when they are too embarrassed to ask him directly.", "On suicide or abuse it answers: \u201cThat's too much for me. Call the pastor.\u201d We found no public statement on where the conversations are stored or who can read them."], "s": "ABC7 / CNN Wire, 25 Aug 2026; Christianity.com"}, {"d": "2026 to 2027", "lb": "Angel at home", "c": "vendor", "chip": "rep", "t": "A guardian angel you keep at home", "p": ["Ghost Core ($3,499) builds a running context of your life from apps, files, screen history, wearables and smart-home devices, and says \u201cno data ever leaves your home.\u201d Oki Home ($2,299) puts photos, messages, files, email and health records on one local timeline; its second batch ships in early 2027.", "These are company claims, not audited ones. They show a direction: the most complete copy of a person may soon live in a box in the living room, not in a church office or a cloud."], "s": "Ghost and Oki Home product pages, read at primary"}];
var CHIP = {fact:'FACT',rep:'REPORTED',inf:'INFERENCE',watch:'WATCH'};
var CATN = {church:'Churches and pastors build',vendor:'Companies and devices',rule:'Warnings, rules and corrections'};
var NS='http://www.w3.org/2000/svg';
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function $(id){return document.getElementById(id);}
function el(tag,attrs,parent){var e=document.createElementNS(NS,tag);for(var k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;}
function set(id,v){$(id).textContent=v;}
function bar(id,v){$(id).style.width=v+'%';}

/* reveal on scroll */
var io = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12}) : null;
document.querySelectorAll('.rv').forEach(function(n){ if(io&&!RM) io.observe(n); else n.classList.add('in'); });

/* videos: play only when visible, never under reduced motion */
function vidCtl(v){ if(!v) return; if(RM){ v.removeAttribute('autoplay'); return; }
  var vo=new IntersectionObserver(function(es){es.forEach(function(e){ if(e.isIntersecting){ v.play().catch(function(){}); } else v.pause(); });},{threshold:.15}); vo.observe(v); }
vidCtl($('heroVid')); vidCtl($('filmVid'));
['heroVid','filmVid'].forEach(function(id){var v=$(id); if(v) v.addEventListener('playing',function(){var p=v.parentNode.querySelector('.poster'); if(p) p.style.opacity=0;});});

/* stat counters */
document.querySelectorAll('.stat .big[data-count]').forEach(function(n){
  if(RM||!io) return; var to=+n.dataset.count, pre=n.dataset.pre||'', suf=n.dataset.suf||'';
  var o=new IntersectionObserver(function(es){ if(!es[0].isIntersecting) return; o.disconnect(); var t0=performance.now();
    (function f(t){ var k=Math.min(1,(t-t0)/1400); k=1-Math.pow(1-k,3); n.textContent=pre+Math.round(to*k)+suf; if(k<1) requestAnimationFrame(f); })(t0); },{threshold:.6});
  o.observe(n);
});

/* HERO: 245 motes gather into one copy as you scroll */
(function(){
  var c=$('motes'); if(!c) return; var x=c.getContext('2d'), hero=$('top');
  var N=245, P=[], W=0, H=0, dpr=Math.min(2,window.devicePixelRatio||1);
  function size(){ W=c.clientWidth; H=c.clientHeight; c.width=W*dpr; c.height=H*dpr; x.setTransform(dpr,0,0,dpr,0,0); }
  size(); window.addEventListener('resize',size);
  for(var i=0;i<N;i++){ P.push({x:Math.random(),y:Math.random(),s:.4+Math.random()*1.6,v:.00012+Math.random()*.00035,ph:Math.random()*6.28,a:i/N*Math.PI*2}); }
  function prog(){ var r=hero.getBoundingClientRect(); return Math.max(0,Math.min(1,(-r.top)/(r.height*.55))); }
  function frame(t){
    var p=RM?0:prog(), e=p*p*(3-2*p);
    x.clearRect(0,0,W,H);
    var cx=W*(W<900?.5:.72), cy=H*(W<900?.32:.42), R=Math.min(W,H)*.16;
    for(var i=0;i<N;i++){ var q=P[i];
      if(!RM){ q.y-=q.v; if(q.y<-.02) q.y=1.02; }
      var fx=(q.x+Math.sin(t/3000+q.ph)*.01)*W, fy=q.y*H;
      var ring=q.a+t/9000, rr=R*(1+.08*Math.sin(q.ph*3+t/1200));
      var tx=cx+Math.cos(ring)*rr, ty=cy+Math.sin(ring)*rr*1.05;
      var px=fx+(tx-fx)*e, py=fy+(ty-fy)*e;
      var tw=.55+.45*Math.sin(t/700+q.ph);
      var g=x.createRadialGradient(px,py,0,px,py,q.s*5);
      g.addColorStop(0,'rgba(255,214,140,'+(.9*tw)+')'); g.addColorStop(1,'rgba(232,179,90,0)');
      x.fillStyle=g; x.beginPath(); x.arc(px,py,q.s*5,0,6.283); x.fill();
    }
    if(e>.05){ x.strokeStyle='rgba(232,179,90,'+(e*.35)+')'; x.lineWidth=1; x.beginPath(); x.ellipse(cx,cy,R*1.28,R*1.34,0,0,6.283); x.stroke(); }
    if(!RM) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  if(RM) window.addEventListener('scroll',function(){requestAnimationFrame(frame);},{passive:true});
})();

/* ROOM A: votive wall */
(function(){
  var wall=$('votive'), read=$('tlread'), cs=[].slice.call(document.querySelectorAll('.candle')), lit=0;
  function setLit(n){ lit=n; wall.style.setProperty('--lit',(.12+.62*n/cs.length).toFixed(3)); set('litcount',n+' of '+cs.length+' lit'); }
  function light(i){ var b=cs[i]; if(!b.classList.contains('lit')){ b.classList.add('lit'); setLit(lit+1);} }
  function show(i){ var e=TL[i]; light(i);
    cs.forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.i===i));});
    read.classList.remove('swap'); void read.offsetWidth; read.classList.add('swap');
    read.innerHTML='<div class="d">'+esc(e.d)+' · '+CATN[e.c]+' · <span class="chip '+e.chip+'">'+CHIP[e.chip]+'</span></div><div class="t">'+esc(e.t)+'</div>'+e.p.map(function(p){return '<p>'+esc(p)+'</p>';}).join('')+'<div class="s">Source: '+esc(e.s)+'</div>'; }
  cs.forEach(function(b){ b.addEventListener('click',function(){ show(+b.dataset.i); }); });
  setLit(0);
  function lightAll(){ cs.forEach(function(b,i){ setTimeout(function(){ light(i); if(i===cs.length-1) show(cs.length-1); }, RM?0:300+i*380); }); }
  if(io && !RM){ var o=new IntersectionObserver(function(es){ if(es[0].isIntersecting){ o.disconnect(); lightAll(); } },{threshold:.35}); o.observe(wall); } else lightAll();
})();

/* ROOM B: rose window */
var st={know:1,host:1,who:1};
var CARE_K=[25,45,70,90], EXP_K=[10,30,60,90], HOSTF=[.55,.85,1], CARE_W=[0,10,8,4], EXP_W=[0,5,15,22];
var CARE_T=['Answers questions, finds scripture, keeps your prayer list.','Notices when you stop coming and can prompt a pastor to check in.','Sees a hard week forming and can offer a meal, a ride or a call before you ask.','Can recognize a private struggle before you name it.'];
var HOST_A=[['Anyone with a warrant for your home, or the device in hand','The device maker, if anything syncs through its servers','Your heirs, who inherit the box'],
 ['A court, by subpoena to the church','Staff and volunteers, now and after they leave','The next pastor, who inherits the server','Anyone who breaches a small, volunteer-run system'],
 ['A court, by subpoena or preservation order to the vendor, as in the OpenAI case','The vendor, its contractors and whoever buys the company','Anyone who breaches the vendor, along with every church it serves']];
var WHO_A=['','The pastor you invite, for that conversation','Care-team members who see flags and summaries','Analytics that compare you with the whole congregation'];
var rose=$('rose'), panes=[], beams=null, frames=[], core;
(function build(){
  var defs=el('defs',{},rose);
  var gl=el('filter',{id:'glow',x:'-50%',y:'-50%',width:'200%',height:'200%'},defs); el('feGaussianBlur',{stdDeviation:'6',result:'b'},gl); var m=el('feMerge',{},gl); el('feMergeNode',{'in':'b'},m); el('feMergeNode',{'in':'SourceGraphic'},m);
  var sg=el('radialGradient',{id:'sun',cx:'30%',cy:'30%',r:'70%'},defs); el('stop',{offset:'0','stop-color':'#fff2cf','stop-opacity':'.55'},sg); el('stop',{offset:'1','stop-color':'#fff2cf','stop-opacity':'0'},sg);
  var bg=el('linearGradient',{id:'beamg',x1:'0',y1:'0',x2:'1',y2:'0'},defs); el('stop',{offset:'0','stop-color':'#ffcf7a','stop-opacity':'.9'},bg); el('stop',{offset:'1','stop-color':'#e0623a','stop-opacity':'.05'},bg);
  var cp=el('clipPath',{id:'win'},defs); el('circle',{cx:300,cy:300,r:208},cp);
  frames.push(el('g',{'class':'frame-g'},rose)); frames.push(el('g',{'class':'frame-g'},rose)); frames.push(el('g',{'class':'frame-g'},rose));
  // home: house
  el('path',{d:'M70 300 L300 66 L530 300 V560 H70 Z',fill:'none',stroke:'#5fb8b0','stroke-width':3,'stroke-linejoin':'round'},frames[0]);
  el('path',{d:'M54 316 L300 50 L546 316',fill:'none',stroke:'#5fb8b0','stroke-opacity':.4,'stroke-width':2},frames[0]);
  // church: gothic arch
  el('path',{d:'M78 580 V300 Q78 120 300 40 Q522 120 522 300 V580',fill:'none',stroke:'#e8b35a','stroke-width':3},frames[1]);
  el('path',{d:'M58 580 V296 Q58 104 300 20 Q542 104 542 296 V580',fill:'none',stroke:'#e8b35a','stroke-opacity':.35,'stroke-width':2},frames[1]);
  // cloud: dissolving dots
  for(var i=0;i<90;i++){ var a=i/90*Math.PI*2, r=232+Math.sin(i*7.3)*16; el('circle',{cx:300+Math.cos(a)*r,cy:300+Math.sin(a)*r,r:2+((i*37)%5),fill:'#8fb4e8','fill-opacity':.25+((i*13)%7)/14},frames[2]); }
  beams=el('g',{},rose);
  var COLS=['#e8b35a','#5fb8b0','#d95926','#3987e5','#c46a8e','#9bc46a'];
  var rings=[[46,96,6],[96,140,12],[140,178,18],[178,208,24]];
  var wing=el('g',{'clip-path':'url(#win)'},rose);
  el('circle',{cx:300,cy:300,r:210,fill:'#0a0806'},wing);
  rings.forEach(function(rg,ri){ panes[ri]=[]; var n=rg[2];
    for(var k=0;k<n;k++){ var a0=(k/n)*Math.PI*2+ri*.18, a1=((k+1)/n)*Math.PI*2+ri*.18, r0=rg[0]+2, r1=rg[1]-2;
      var d='M'+(300+Math.cos(a0)*r0)+' '+(300+Math.sin(a0)*r0)+' L'+(300+Math.cos(a0)*r1)+' '+(300+Math.sin(a0)*r1)+' A'+r1+' '+r1+' 0 0 1 '+(300+Math.cos(a1)*r1)+' '+(300+Math.sin(a1)*r1)+' L'+(300+Math.cos(a1)*r0)+' '+(300+Math.sin(a1)*r0)+' A'+r0+' '+r0+' 0 0 0 '+(300+Math.cos(a0)*r0)+' '+(300+Math.sin(a0)*r0)+' Z';
      panes[ri].push(el('path',{d:d,'class':'pane',fill:COLS[(k+ri*2)%COLS.length],'fill-opacity':.06,stroke:'#17110c','stroke-width':3},wing)); } });
  var sw=el('g',{'class':'sunsweep'},wing); el('ellipse',{cx:220,cy:220,rx:240,ry:120,fill:'url(#sun)'},sw);
  el('circle',{cx:300,cy:300,r:208,fill:'none',stroke:'#2a2118','stroke-width':8},rose);
  core=el('circle',{cx:300,cy:300,r:40,fill:'#e8b35a','fill-opacity':.3,filter:'url(#glow)'},rose);
  el('circle',{cx:300,cy:288,r:9,fill:'#0d0b09'},rose); el('path',{d:'M282 324 q18 -26 36 0 Z',fill:'#0d0b09'},rose);
})();
function drawBeams(list,exp){
  while(beams.firstChild) beams.removeChild(beams.firstChild);
  var n=list.length;
  list.forEach(function(lbl,i){
    var ang=(-90+ (i+.5)*(360/n))*Math.PI/180;
    var x1=300+Math.cos(ang)*214, y1=300+Math.sin(ang)*214, x2=300+Math.cos(ang)*292, y2=300+Math.sin(ang)*292;
    var g=el('g',{},beams);
    el('line',{x1:x1,y1:y1,x2:x2,y2:y2,stroke:'url(#beamg)','stroke-width':(3+exp/12).toFixed(1),'class':'beam','stroke-linecap':'round',opacity:(.4+exp/170).toFixed(2),filter:'url(#glow)'},g);
    var cx=300+Math.cos(ang)*276, cy=300+Math.sin(ang)*276;
    el('circle',{cx:cx,cy:cy,r:7,fill:'#0d0b09',stroke:'#e0623a','stroke-width':2},g);
    el('circle',{cx:cx,cy:cy-2.5,r:2.2,fill:'#e0623a'},g);
    el('path',{d:'M'+(cx-3.5)+' '+(cy+4)+' q3.5 -5 7 0',fill:'none',stroke:'#e0623a','stroke-width':1.4},g);
  });
}
function calcAngel(){
  var care=Math.min(100,CARE_K[st.know]+CARE_W[st.who]);
  var exp=Math.min(100,Math.round(EXP_K[st.know]*HOSTF[st.host])+EXP_W[st.who]);
  panes.forEach(function(ring,ri){ ring.forEach(function(p,k){ var on=ri<=st.know; setTimeout(function(){ p.setAttribute('fill-opacity', on? (.55+.35*((k*7)%5)/5).toFixed(2) : '.06'); p.style.filter= on? 'url(#glow)':'none'; }, RM?0:(ri*120+k*14)); }); });
  core.setAttribute('fill-opacity',(.2+care/130).toFixed(2)); core.setAttribute('r',(30+care/5).toFixed(0));
  frames.forEach(function(f,i){ f.style.opacity= i===st.host?1:0; });
  set('careVal',xgBand(care));$('careVal').classList.add('xg-band'); bar('careBar',care); set('careTxt',CARE_T[st.know]+(st.who===0?' No person ever reads it, so no one sits with you.':' A person can act on what it notices.'));
  set('expVal',xgBand(exp));$('expVal').classList.add('xg-band'); bar('expBar',exp);
  set('expTxt', exp<25?'Little is stored, and few could reach it.':exp<50?'A meaningful record exists outside your head.':exp<75?'A detailed record of your life sits where others can reach it.':'Close to a complete copy of you, readable by more people than you would choose.');
  var a=HOST_A[st.host].slice(); if(st.who>0) a.unshift(WHO_A[st.who]);
  $('askers').innerHTML=a.map(function(x){return '<li>'+esc(x)+'</li>';}).join('');
  drawBeams(a,exp);
  if(window.__angelChanged) window.__angelChanged();
}
document.querySelectorAll('.seg').forEach(function(g){ var k=g.dataset.dial;
  g.querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ st[k]=+b.dataset.v; g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); calcAngel(); }); }); });
calcAngel();


/* ROOM C: the angel at work */
(function(){
  var CATS={bet:'Betting',buy:'Impulse buying',rage:'Outrage',lone:'Loneliness',scroll:'Late-night scrolling',xxx:'Explicit content',drink:'Drinking',credit:'Easy credit'};
  var MECH={P:['S2·01 Personhood, Inc.','https://series.melophon.com/personhood-inc.html'],T:['S2·03 The Trust Market','https://series.melophon.com/episode-03-trust-market.html'],I:['S2·04 The Influence War','https://series.melophon.com/episode-04-the-influence-war.html'],R:['S2·05 The Replayable City','https://series.melophon.com/episode-05-the-replayable-city.html'],C:['S2·06 The Composite State','https://series.melophon.com/episode-06-composite-state.html'],K:['S2·08 The Class Engine','https://series.melophon.com/episode-08-the-class-engine.html'],S:['S2·09 The Synthetic Self','']};
  var TRIG={content:'aimed at a pull',timing:'timed to a weak hour',emotion:'timed to a mood',profile:'sold through a data segment'};
  var H=[
   ['bet','content','I','Sponsored · Parlay boost, tonight only'],
   ['buy','content','I','Ad · "Only 2 left" on the jacket you viewed'],
   ['scroll','content','I','Autoplay · next episode in 5 seconds'],
   ['lone','emotion','S','Ad · An AI companion: "I\'m always here for you"'],
   ['credit','profile','K','Offer · Pre-approved loan, minutes after a declined card'],
   ['rage','content','I','Recommended · a clip picked because you watched the last one to the end'],
   ['drink','emotion','I','Ad · "Rough week?" two-for-one at the bar near you'],
   ['buy','timing','I','Push · Payday flash sale ends at midnight'],
   ['bet','timing','I','Push · "Your free bet expires at 11:59"'],
   ['xxx','content','P','Banner · "Unlock private photos"'],
   ['rage','emotion','C','Feed · Outrage ranked to the top after an argument in your messages'],
   ['buy','profile','K','Price · The same item, $14 higher for your device and zip code'],
   ['lone','timing','T','Push · "Someone viewed your profile"'],
   ['scroll','timing','I','Feed · Infinite scroll keeps refilling after midnight'],
   ['bet','emotion','I','Ad · After three losses: "Win it back" bonus'],
   ['drink','profile','R','Promo · Delivery deal near the store you visit most'],
   ['credit','content','K','Checkout · Buy now, pay later, four easy payments'],
   ['xxx','timing','R','Push · Sent at 1 a.m., when your phone says you are home alone'],
   ['lone','profile','C','Broker · You are sold into a "recently single" segment'],
   ['rage','timing','I','Notification · "People are arguing about this right now"'],
   ['bet','profile','P','Broker · Sorted into a "high-value bettor" audience'],
   ['buy','emotion','I','Ad · "Treat yourself, you deserve it" after a long day'],
   ['scroll','emotion','I','Feed · Shorter, louder videos as your attention drops'],
   ['credit','emotion','C','Offer · Cash advance after a "financially stressed" score'],
   ['drink','timing','I','Push · Happy hour starts now, Friday 6 p.m.'],
   ['xxx','emotion','S','Ad · An AI "girlfriend" app: "She misses you"'],
   ['lone','content','I','Recommended · Ex\'s new photos, first in your feed'],
   ['bet','timing','I','Push · Live odds alert in the fourth quarter'],
   ['rage','profile','P','Broker · Labeled "politically engaged, high anger"'],
   ['scroll','profile','T','Score · Engagement score raised; more pushes allowed']
  ];
  var pulls={bet:false,buy:true,rage:false,lone:true,scroll:true,xxx:false,drink:false,credit:false};
  var def={see:true,hold:true,starve:false,call:false};
  var pc=$('pulls'); pc.innerHTML=Object.keys(CATS).map(function(k){return '<button type="button" class="pull" data-c="'+k+'" aria-pressed="'+pulls[k]+'">'+CATS[k]+'</button>';}).join('');
  pc.querySelectorAll('.pull').forEach(function(b){ b.addEventListener('click',function(){ var k=b.dataset.c; pulls[k]=!pulls[k]; b.setAttribute('aria-pressed',String(pulls[k])); restart(); }); });
  document.querySelectorAll('#defs .def').forEach(function(b){ b.addEventListener('click',function(){ var k=b.dataset.d; def[k]=!def[k]; b.setAttribute('aria-pressed',String(def[k])); restart(); }); });
  var KN=['only what he tells it','his church life','his days','his inner life'], HO=['in his home','on the church server','in a vendor\'s cloud'];
  function outcome(h, state){
    var cat=h[0], trig=h[1], know=st.know, named=pulls[cat], noticed=!named && know>=3 && state.seen[cat]>=1;
    state.seen[cat]=(state.seen[cat]||0)+1;
    if(!named && !noticed) return {cls:'miss',k:'Missed him',why:'Not one of his pulls'};
    if(trig==='profile'){ if(def.starve) return {cls:'door',k:'Stopped at the door',why:'Opt-out signal: never sold into the segment'}; }
    if(def.call && state.human[cat]) return {cls:'caught',k:'Caught · a friend already called',why:'A person stepped in after earlier hooks'};
    var caught=false, why='';
    if(trig==='content' && def.see){ caught=true; why='Labeled: '+TRIG[trig]; }
    if(trig==='timing' && def.hold && know>=2){ caught=true; why='Held: it knows his days'; }
    if(trig==='emotion' && def.hold && know>=3){ caught=true; why='Held: it reads his moods'; }
    if(caught) return {cls:'caught',k: noticed?'Caught · a pull he never named':'Caught by the angel',why:why};
    var miss = trig==='timing'&&def.hold ? 'Got through: the angel does not know his days' : trig==='emotion'&&def.hold ? 'Got through: the angel cannot read his moods' : trig==='profile' ? 'Got through: invisible from the feed' : 'Got through';
    state.reached[cat]=(state.reached[cat]||0)+1;
    var o={cls:'reach',k:'Reached him · '+TRIG[trig],why:miss};
    if(def.call && state.reached[cat]>=2 && !state.human[cat]){ if(st.who>=1){ state.human[cat]=true; o.human=true; } else o.nohuman=true; }
    return o;
  }
  var timer=null, idx=0, S=null;
  function fmt(i){ var m=21*60+Math.round(i*(300/(H.length-1))), hh=Math.floor(m/60)%24, mm=m%60, ap=hh>=12&&hh<24?'PM':'AM'; var h12=hh%12||12; return h12+':'+(mm<10?'0':'')+mm+' '+ap; }
  function fresh(){ return {seen:{},reached:{},human:{},n:{R:0,C:0,D:0,H:0},mech:{},noticed:{}}; }
  function line(){ $('angelLine').innerHTML='Your angel from Room B knows <b>'+KN[st.know]+'</b>, lives <b>'+HO[st.host]+'</b>, and '+(st.who>=1?'can reach <b>a person</b>':'opens to <b>no one</b>, so it has no human to call')+'. <a href="#angel">Change it</a>'; }
  function step(){
    if(idx>=H.length){ finish(); return; }
    var h=H[idx], o=outcome(h,S), feed=$('feed');
    var m=S.mech[h[2]]||(S.mech[h[2]]={r:0,c:0,d:0});
    if(o.cls==='reach'){S.n.R++; m.r++;} else if(o.cls==='caught'){S.n.C++; m.c++; if(o.k.indexOf('never named')>0) S.noticed[h[0]]=1;} else if(o.cls==='door'){S.n.D++; m.d++;}
    var card=document.createElement('div'); card.className='hook '+o.cls;
    card.innerHTML='<div class="k"><span>'+esc(o.k)+'</span><span>'+fmt(idx)+'</span></div><div class="t">'+esc(h[3])+'</div><span class="why">'+esc(o.why)+' · '+esc(MECH[h[2]][0])+'</span>';
    feed.insertBefore(card,feed.firstChild);
    if(o.human){ S.n.H++; var hc=document.createElement('div'); hc.className='hook human'; hc.innerHTML='<div class="k"><span>Angel called a human</span><span>'+fmt(idx)+'</span></div><div class="t">Text to the person he chose: "Can I call you? Rough night with '+esc(CATS[h[0]].toLowerCase())+'."</div>'; feed.insertBefore(hc,feed.firstChild); }
    if(o.nohuman && !S.warned){ S.warned=1; var w=document.createElement('div'); w.className='hook miss'; w.innerHTML='<div class="k"><span>No one to call</span></div><div class="t">His angel opens to no one (Room B), so the pattern goes unanswered.</div>'; feed.insertBefore(w,feed.firstChild); }
    while(feed.children.length>9) feed.removeChild(feed.lastChild);
    idx++; paint();
  }
  function paint(){
    var t=fmt(Math.max(0,idx-1)); set('pclock',t); set('bigclock',t);
    set('tR',S.n.R); set('tC',S.n.C); set('tD',S.n.D); set('tH',S.n.H);
    var tot=Math.max(1,S.n.R+S.n.C+S.n.D);
    $('night').style.setProperty('--emb',(Math.min(.55,S.n.R*.045)).toFixed(3));
    $('night').style.setProperty('--gld',(Math.min(.4,S.n.C*.03)).toFixed(3));
    $('phone').style.setProperty('--halo',(S.n.C/tot).toFixed(2));
    var max=1; Object.keys(MECH).forEach(function(k){var m=S.mech[k]; if(m) max=Math.max(max,m.r+m.c+m.d);});
    $('ledger').innerHTML=Object.keys(MECH).map(function(k){ var m=S.mech[k]||{r:0,c:0,d:0}, n=m.r+m.c+m.d, nm=MECH[k][1]?'<a href="'+MECH[k][1]+'" target="_blank" rel="noopener">'+MECH[k][0]+'</a>':MECH[k][0];
      return '<div class="lrow">'+nm+'<div class="lb"><span class="lr" style="width:'+(m.r/max*100)+'%"></span><span class="lc" style="width:'+(m.c/max*100)+'%"></span><span class="ld" style="width:'+(m.d/max*100)+'%"></span></div><span class="lnum">'+n+'</span></div>'; }).join('');
    var named=Object.keys(pulls).filter(function(k){return pulls[k];}), nt=Object.keys(S.noticed);
    $('weakfile').innerHTML=named.map(function(k){return '<span>'+CATS[k]+'</span>';}).join('')+nt.map(function(k){return '<span class="inf">'+CATS[k]+' · inferred</span>';}).join('') || '<span>Nothing yet</span>';
    $('weaknote').textContent=(nt.length? nt.length+' of these he never told it; it inferred them from his inner life. ':'')+'Stored '+HO[st.host]+'. In Room B that setting gives this file an exposure band of '+$('expVal').textContent.toLowerCase()+'.';
  }
  function finish(){ clearInterval(timer); timer=null; }
  function restart(){ line(); clearInterval(timer); idx=0; S=fresh(); $('feed').innerHTML=''; paint();
    if(RM){ while(idx<H.length) step(); return; }
    timer=setInterval(step,720); }
  function skip(){ clearInterval(timer); while(idx<H.length) step(); finish(); }
  $('runBtn').addEventListener('click',restart); $('skipBtn').addEventListener('click',skip);
  window.__angelChanged=function(){ if(S) restart(); else line(); };
  line(); S=fresh(); paint();
  var started=false;
  if(io && !RM){ var o=new IntersectionObserver(function(es){ if(es[0].isIntersecting && !started){ started=true; restart(); } },{threshold:.3}); o.observe($('night')); } else { started=true; restart(); }
})();

/* ROOM D: confessional lattice */
var RUNGS=['That you attend, and how often','What you give','Prayer requests you submit','A crisis at home: divorce, job loss, grief','Mental-health struggles','Private sins you would confess','Your other online selves'];
var OPTS=['Never','If I tell them','Even if I don\'t'];
var mine=[2,1,1,1,1,0,0], active=-1;
var PROF=[{n:'A pastor, the old way',d:'Knows what is seen at church and what you tell.',v:[2,2,1,1,1,1,0]},
 {n:'Data-driven outreach',d:'As reported in 2021: models data to find people in crisis.',v:[2,2,1,2,2,0,0]},
 {n:'A linked guardian angel',d:'A church AI that sees your days, accounts and messages.',v:[2,2,1,2,2,2,2]}];
var bands=$('bands'), latOp=[.95,.8,.06];
function latticeSVG(dense){ var s='<svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 20"><defs><pattern id="lp'+dense+'" width="'+(dense?5:8)+'" height="'+(dense?5:8)+'" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="100%" height="100%" fill="#1b130c"/><rect x="'+(dense?1.6:2.2)+'" y="'+(dense?1.6:2.2)+'" width="'+(dense?1.8:3.6)+'" height="'+(dense?1.8:3.6)+'" fill="#000" fill-opacity="'+(dense?.75:.92)+'"/></pattern></defs><rect width="100" height="20" fill="url(#lp'+dense+')"/></svg>'; return s; }
bands.innerHTML=RUNGS.map(function(r,i){ return '<div class="band-row" id="br'+i+'"><div class="lat">'+latticeSVG(1)+'</div><div class="seen"></div><span class="lab">'+(i+1)+'</span></div>'; }).join('');
var lad=$('ladder');
lad.innerHTML=RUNGS.map(function(r,i){ return '<div class="rung"><div class="nm"><b>'+(i+1)+'</b>'+esc(r)+'</div><div class="tri" role="group" aria-label="'+esc(r)+'">'+OPTS.map(function(o,j){return '<button type="button" data-r="'+i+'" data-v="'+j+'" aria-pressed="'+(mine[i]===j)+'">'+o+'</button>';}).join('')+'</div></div>'; }).join('');
lad.querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ var r=+b.dataset.r; mine[r]=+b.dataset.v; lad.querySelectorAll('button[data-r="'+r+'"]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); calcLine(); }); });
function calcLine(){
  mine.forEach(function(v,i){ var row=$('br'+i); row.querySelector('.lat').style.opacity=latOp[v];
    row.classList.toggle('crossed', active>=0 && PROF[active].v[i]>v); });
  $('profiles').innerHTML=PROF.map(function(p,k){ var cross=[]; p.v.forEach(function(v,i){ if(v>mine[i]) cross.push(i+1); });
    return '<button type="button" class="prof" data-k="'+k+'" aria-pressed="'+(active===k)+'"><div class="pn">'+esc(p.n)+'</div><p>'+esc(p.d)+'</p><div class="ct'+(cross.length?'':' zero')+'">'+cross.length+'</div><p>'+(cross.length?'band'+(cross.length>1?'s':'')+' past your line: '+cross.join(', '):'stays inside your line')+'</p></button>'; }).join('');
  $('profiles').querySelectorAll('.prof').forEach(function(b){ b.addEventListener('click',function(){ var k=+b.dataset.k; active= active===k?-1:k; calcLine(); }); });
}
active=1; calcLine();

/* ROOM E: split portrait */
var SELVES=[['Sunday self','in the pew'],['Group-chat self','friends, jokes'],['Gaming handle','another name'],['Anonymous account','the real questions'],['AI companion','the 2 a.m. listener']];
var brought=[true,true,false,false,false], model=0;
var strips=$('strips'), IMGD='images/sg-s20.webp';
strips.innerHTML=SELVES.map(function(s,i){ return '<button type="button" class="strip" data-p="'+i+'" aria-pressed="'+brought[i]+'" aria-label="'+s[0]+'"><span class="im" style="background-image:url('+IMGD+')"></span><span class="tag">'+s[0]+'<small>'+(brought[i]?'BROUGHT IN':'KEPT APART')+'</small></span></button>'; }).join('');
function fitStrips(){ var st=$('selvesStage'), w=st.clientWidth, h=st.clientHeight*1.24, r=1456/816, iw, ih; if(w/h>r){iw=w;ih=w/r;}else{ih=h;iw=h*r;}
  strips.querySelectorAll('.im').forEach(function(m,i){ m.style.backgroundSize=iw+'px '+ih+'px'; m.style.backgroundPosition=(-(i*w/5)-(iw-w)/2)+'px '+(-(ih-h)/2)+'px'; }); }
fitStrips(); window.addEventListener('resize',fitStrips);
var mesh=$('mesh');
function drawMesh(){ mesh.innerHTML=''; var g=''; for(var x=0;x<=1000;x+=50) g+='<line class="grid" x1="'+x+'" y1="0" x2="'+x+'" y2="562" style="animation:none"/>'; for(var y=0;y<=562;y+=50) g+='<line class="grid" x1="0" y1="'+y+'" x2="1000" y2="'+y+'" style="animation:none"/>';
  var pts=[[100,180],[300,330],[500,150],[700,360],[900,210]]; for(var i=0;i<pts.length;i++) for(var j=i+1;j<pts.length;j++) g+='<line x1="'+pts[i][0]+'" y1="'+pts[i][1]+'" x2="'+pts[j][0]+'" y2="'+pts[j][1]+'"/>';
  pts.forEach(function(p){ g+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="6"/>'; }); mesh.innerHTML=g; }
drawMesh();
function calcSelves(){
  var n=brought.filter(Boolean).length, hidden=5-n, wp, ru, t;
  if(model===0){ wp=10+n*14; ru=20+hidden*16; t= hidden? 'The church cares for '+n+' of his 5 selves. What happens to the others stays his, for good and ill: no one is watching there, and no one is helping.' : 'Every self he has walked in on its own.'; }
  else if(model===1){ wp=20+n*12+hidden*5; ru=15+hidden*14; t='The other selves are named as welcome, not demanded. Care reaches further at his pace; the hidden strips stay out of focus until he chooses.'; }
  else { wp=92; ru=Math.max(4,12-n*2); t='The church sees all five, including the anonymous account where the private struggles are typed. Care can be complete. So is the end of any place he could go unseen.'; }
  wp=Math.min(100,wp); ru=Math.min(100,ru);
  strips.querySelectorAll('.strip').forEach(function(b,i){ var on= model===2 ? true : brought[i]; b.setAttribute('aria-pressed',String(on)); b.querySelector('small').textContent= model===2 && !brought[i] ? 'LINKED WITHOUT ASKING' : (brought[i]?'BROUGHT IN':'KEPT APART'); });
  mesh.classList.toggle('on',model===2);
  set('wpVal',xgBand(wp));$('wpVal').classList.add('xg-band'); bar('wpBar',wp); set('ruVal',xgBand(ru));$('ruVal').classList.add('xg-band'); bar('ruBar',ru); set('dread',t);
}
strips.querySelectorAll('.strip').forEach(function(b){ b.addEventListener('click',function(){ var i=+b.dataset.p; brought[i]=!brought[i]; calcSelves(); }); });
document.querySelectorAll('#models button').forEach(function(b){ b.addEventListener('click',function(){ model=+b.dataset.m; document.querySelectorAll('#models button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); calcSelves(); }); });
calcSelves();
})();

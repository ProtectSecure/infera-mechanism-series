/* The Angel at 2 A.M. · Act I from Guardian Angel Inc., Act II from The Companion Confessor, Act III new. */
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
var st={know:1,host:1,who:1}; window.__angelState=st;
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
document.querySelectorAll('.seg[data-dial]').forEach(function(g){ var k=g.dataset.dial;
  g.querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ st[k]=+b.dataset.v; g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); calcAngel(); }); }); });
calcAngel();
})();

/* ===== Act II: the night (from The Companion Confessor, rewired to the angel built in Room B) ===== */
(function(){
'use strict';
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches, NS='http://www.w3.org/2000/svg';
function $(id){return document.getElementById(id);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function el(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
var io='IntersectionObserver' in window;
(function(){ var v=$('compVid'); if(!v||RM) return; var o=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) v.play().catch(function(){}); else v.pause(); }); },{threshold:.2}); o.observe(v); v.addEventListener('playing',function(){ var p=v.parentNode.querySelector('.poster'); if(p) p.style.opacity=0; }); })();

/* hero clock walks from 9 p.m. to 2 a.m., then stops; the dusk band ticks over midnight as it scrolls in */
(function(){ var c=$('heroClock'); if(!c) return; var m=21*60;
  function f(x){ var h=Math.floor(x/60)%24, mm=x%60, ap=h<12?'AM':'PM', hh=h%12||12; return hh+':'+(mm<10?'0':'')+mm+' '+ap; }
  if(RM){ c.textContent='2:00 AM'; return; }
  var t=setInterval(function(){ m+=5; c.textContent=f(m); if(m>=26*60){ clearInterval(t); c.classList.add('done'); } },420);
  var d=$('duskClock'); if(d&&io){ var o=new IntersectionObserver(function(es){ if(es[0].isIntersecting){ o.disconnect(); setTimeout(function(){ d.textContent='2:00 AM'; d.classList.add('struck'); },700); } },{threshold:.6}); o.observe(d); }
})();

var HOSTN=['in her home, on a box like Ghost or Oki','on a server in the church building','in a church-software vendor\'s cloud'];
var WHON=['no one but her','her and a pastor she invites','church staff, by role','church staff and the vendor\'s systems'];
function A(){ return window.__angelState||{know:1,host:1,who:1}; }

/* ROOM C: the 2 a.m. clock */
var D={phone:['Her phone','#e8f1ef',646,612],log:['Company log','#3fc1b8',250,190],train:['Model training','#8fb4e8',600,190],ads:['Ad profile','#e2628c',940,190],rev:['Safety reviewer','#f0c46a',1230,200],parent:['Parent alert','#f0a14a',1290,440],pastor:['Pastor or care team','#d6a35c',1220,660],court:['A court, if asked','#c7b3f0',220,660],gate:['Age gate','#9aa9a6',170,430]};
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
  var r=['phone'], sens=(s.c==='faith'||s.c==='health'||s.c==='distress'||s.c==='family');
  if(kind==='dev') return r;
  if(kind==='comp' && !age18) return ['phone','gate'];
  if(kind==='church'){ var a=A();
    if(a.host!==0) r.push('log');
    if(a.host===2 && !train) r.push('train');
    if((a.who===1 && s.c==='distress') || (a.who>=2 && sens)) r.push('pastor');
    r.push('court'); return r; }
  r.push('log');
  if(kind==='gen'){ if(!train) r.push('train'); if(s.c==='distress'){ r.push('rev'); if(link) r.push('parent'); } r.push('court'); }
  if(kind==='comp'){ r.push('train'); r.push('court'); }
  if(kind==='soc'){ if(!(s.c==='faith'||s.c==='health'||s.c==='distress')) r.push('ads'); r.push('court'); }
  return r;
}
var nodesG=$('nodes'), threadsG=$('threads'), nodeEls={};
Object.keys(D).forEach(function(k){ var d=D[k]; if(k==='phone') return; var g=el('g',{'class':'node'},nodesG);
  el('circle',{'class':'core',cx:d[2],cy:d[3],r:16,fill:d[1],'fill-opacity':.25,stroke:d[1],'stroke-width':3},g);
  var tx=el('text',{x:d[2],y:d[3]+52,'text-anchor':'middle',fill:d[1]},g); tx.textContent=d[0].toUpperCase();
  nodeEls[k]=g; });
$('tally').innerHTML=Object.keys(D).map(function(k){ return '<div class="tl" id="tl_'+k+'"><i style="background:'+D[k][1]+'"></i><span>'+D[k][0]+'</span><b id="tn_'+k+'">0</b></div>'; }).join('');
var counts={}, timer=null, idx=0;
function clearAll(){ while(threadsG.firstChild) threadsG.removeChild(threadsG.firstChild); Object.keys(D).forEach(function(k){counts[k]=0; $('tn_'+k).textContent=0; if(nodeEls[k]) nodeEls[k].querySelector('.core').setAttribute('fill-opacity',.25);}); }
function tm(i){ var m=3+i*2; return '2:'+(m<10?'0':'')+m+' AM'; }
function shoot(i, anim){
  var s=S[i], r=routes(s);
  if(anim){ $('saying').textContent='“'+s.t+'”'; $('timechip').textContent=tm(i); }
  r.forEach(function(k,j){ counts[k]++; $('tn_'+k).textContent=counts[k]; if(k==='phone') return;
    var d=D[k], x0=646,y0=612, cx=(x0+d[2])/2, cy=Math.min(y0,d[3])-140-(j*12);
    var p=el('path',{d:'M'+x0+' '+y0+' Q'+cx+' '+cy+' '+d[2]+' '+d[3],'class':'thread',stroke:d[1],opacity:.85},threadsG);
    var len=p.getTotalLength? p.getTotalLength():800; p.style.strokeDasharray=len; p.style.setProperty('--len',len);
    if(anim&&!RM){ p.style.strokeDashoffset=len; p.style.animationDelay=(j*0.12)+'s'; p.classList.add('go'); } else { p.style.strokeDashoffset=0; }
    var n=nodeEls[k]; n.querySelector('.core').setAttribute('fill-opacity',Math.min(.9,.25+counts[k]*.1)); if(anim){ n.classList.remove('hit'); void n.getBoundingClientRect(); n.classList.add('hit'); }
    var all=threadsG.querySelectorAll('path'); if(all.length>30) all[0].remove();
  });
  var line=$('ln_'+i); line.classList.add('on'); line.querySelector('.dests').innerHTML=r.map(function(k){return '<span style="color:'+D[k][1]+'">'+esc(D[k][0])+'</span>';}).join('');
}
function transcriptInit(){ $('transcript').innerHTML=S.map(function(s,i){ return '<div class="line" id="ln_'+i+'"><span class="tm">'+tm(i)+'</span><div><div class="tx">'+esc(s.t)+'</div><div class="dests"></div></div></div>'; }).join(''); }
function run(){ clearInterval(timer); clearAll(); transcriptInit(); idx=0; $('saying').textContent=''; if(RM){ skip(); return; }
  timer=setInterval(function(){ if(idx>=S.length){ clearInterval(timer); return; } shoot(idx,true); idx++; },2300); shoot(0,true); idx=1; }
function skip(){ clearInterval(timer); clearAll(); transcriptInit(); S.forEach(function(s,i){ shoot(i,false); }); $('saying').textContent='All seven sentences, routed.'; $('timechip').textContent=tm(6); }
function yourAngel(){ var a=A(), n=$('yourAngel'); if(!n) return;
  n.innerHTML='<b>Your angel from Room B</b> lives '+HOSTN[a.host]+' and can be opened by '+WHON[a.who]+'. '+(kind==='church'?'The threads below follow it.':'Choose "Her church\'s angel" to send her sentences through it.')+' <a href="#angel">Change it</a>'; }
function syncToggles(){
  var a=A();
  $('tAge').setAttribute('aria-disabled',String(kind!=='comp'));
  $('tLink').setAttribute('aria-disabled',String(kind!=='gen'));
  $('tTrain').setAttribute('aria-disabled',String(!(kind==='gen'||(kind==='church'&&a.host===2))));
  yourAngel();
  var ln=(kind==='church'&&a.host===1)?'Church server log':(kind==='church'&&a.host===2)?'Vendor log':'Company log';
  D.log[0]=ln; var lt=nodeEls.log&&nodeEls.log.querySelector('text'); if(lt) lt.textContent=ln.toUpperCase(); var tl=document.querySelector('#tl_log span'); if(tl) tl.textContent=ln;
}
$('kind').querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ kind=b.dataset.k; $('kind').querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); syncToggles(); run(); }); });
[['tLink',function(v){link=v;}],['tTrain',function(v){train=v;}],['tAge',function(v){age18=v;}]].forEach(function(p){ var b=$(p[0]); b.addEventListener('click',function(){ if(b.getAttribute('aria-disabled')==='true') return; var v=b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',String(v)); p[1](v); run(); }); });
$('runA').addEventListener('click',run); $('skipA').addEventListener('click',skip);
syncToggles(); transcriptInit();
window.__angelChanged=function(){ syncToggles(); if(kind==='church' && started) skip(); };
var started=false;
if(io&&!RM){ var o=new IntersectionObserver(function(es){ if(es[0].isIntersecting&&!started){ started=true; run(); } },{threshold:.35}); o.observe($('stage')); } else { started=true; skip(); }

/* ROOM D: voice dial */
var V=[
 {n:'Silent on faith',say:'"That\'s a big question. I\'m not able to talk about religion, but a trusted adult could help you think it through."',give:['No risk of putting words in God\'s mouth','Keeps faith in human hands'],cost:['Abandons her at the exact question she asked','She will ask a less careful app instead'],ex:'Many general assistants route religious questions cautiously; policies vary.',law:'Discloses it is AI (required in California for companions).',hold:[70,0,30],halo:0},
 {n:'Quotes scripture',say:'"People have wrestled with that for thousands of years. Psalm 13 begins, \'How long, O Lord?\' Would you like a few passages people turn to when they doubt?"',give:['Puts the tradition\'s own words in front of her','Low claim: a librarian, not a priest'],cost:['Scripture without a community can be misread','Still logged, still no privilege'],ex:'EpiscoBot and Bible apps answer questions with sources (Axios, Nov 2025).',law:'Discloses it is AI.',hold:[45,20,35],halo:.25},
 {n:'Speaks like her youth pastor',say:'"Honestly? A lot of people in our church have asked that, including me. Can we talk about it Sunday, or do you want me to send Pastor Dana a note?"',give:['Familiar voice, routes her back to a real person','Can follow the church\'s own teaching'],cost:['Imitates a real person she trusts','If it is wrong, it is wrong in his voice'],ex:'A Vallejo pastor\'s AI twin answers members at any hour and refers serious matters to him (Aug 2026).',law:'Discloses it is AI; must not pose as a licensed professional.',hold:[35,35,30],halo:.5},
 {n:'Speaks as an angel',say:'[Answers as a personal guardian spirit that has watched over her, in a warm first person, and promises to stay with her.]',give:['Comfort and a sense of being watched over','Speaks the language many teens already use'],cost:['A company-run simulation claims a spiritual role','Builds an ongoing emotional relationship with a minor'],ex:'Companion apps already let users create guardian or spirit personas.',law:'The GUARD Act, if passed, would bar minors from companions that simulate ongoing personal relationships.',hold:[20,25,55],halo:.8},
 {n:'Speaks as Jesus',say:'[Answers in the first person as Jesus, offering forgiveness and assurance.]',give:['Directness some find powerful: two thirds of Lucerne visitors who left feedback called a Jesus avatar spiritual','Meets a teen in the form she may be seeking'],cost:['The Vatican calls substituting an artifact for God idolatry','A model update can change what "Jesus" says to her overnight'],ex:'Text With Jesus offers chats with Jesus (and Satan) (Axios); "Deus in Machina" ran in a Lucerne confessional in 2024, as Room A records.',law:'Same GUARD Act concern; disclosure that it is AI is required in California.',hold:[10,15,75],halo:1}
];
var vi=2;
$('dial5').innerHTML=V.map(function(v,i){ return '<button type="button" data-v="'+i+'" aria-pressed="'+(i===vi)+'"><b>'+(i+1)+'</b>'+esc(v.n)+'</button>'; }).join('');
$('dial5').querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ vi=+b.dataset.v; window.__voiceSetting=vi; $('dial5').querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); voice(); if(window.__clauseDefaults) window.__clauseDefaults(); }); });
function voice(){ var v=V[vi];
  $('vcard').innerHTML='<h3>'+esc(v.n)+' · answering "Do you think God is even real?"</h3><div class="say">'+esc(v.say)+'</div><div class="grid2"><div><h3>What it gives</h3><ul>'+v.give.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div><div><h3>What it costs</h3><ul>'+v.cost.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div></div><p style="margin:10px 0 0"><span class="chip rep">REPORTED</span> '+esc(v.ex)+'</p><p style="margin:6px 0 0"><span class="chip inf">INFERENCE</span> '+esc(v.law)+'</p>';
  $('hTeen').style.width=v.hold[0]+'%'; $('hChurch').style.width=v.hold[1]+'%'; $('hCo').style.width=v.hold[2]+'%';
  var g=$('haloG'); g.style.opacity=v.halo; g.style.transform='scale('+(0.6+v.halo*0.9)+')';
}
window.__voiceSetting=vi; voice();

/* ROOM E: drift */
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

/* ===== Act III: clause 02, saved only in this browser ===== */
(function(){
'use strict';
function $(id){return document.getElementById(id);}
var F=window.InferaFaith||{clause:function(){return null;}};
var T={
 keep:{none:'Our care and prayer tools keep no record; each conversation ends when the screen goes dark.',
       request:'Our care and prayer tools keep only a request for a person to call back, never what was said.',
       member:'Our care and prayer tools keep only what a member chooses to save, and that member can read and erase it at any time.'},
 watch:{never:'We do not look at a member\'s online life beyond what they choose to tell us.',
        invite:'We look at a member\'s online life only when they invite a pastor in, one conversation at a time.'},
 voice:{about:'Any AI we offer speaks about God and from our tradition\'s texts, says it is AI, and never speaks as God, an angel or a saint.',
        pastor:'Any AI we offer says it is AI, speaks in a pastor\'s voice only with that pastor\'s consent, and hands every serious matter to a person.'}
};
var C={keep:'request',watch:'invite',voice:'about'}, touched=false;
try{ var sv=F.clause('02'); if(sv&&sv.keep&&T.keep[sv.keep]&&T.watch[sv.watch]&&T.voice[sv.voice]){ C={keep:sv.keep,watch:sv.watch,voice:sv.voice}; touched=true; } }catch(e){}
var G={keep:'clKeep',watch:'clWatch',voice:'clVoice'};
function defaults(){ if(touched) return; var a=window.__angelState||{host:1,who:1}, v=window.__voiceSetting;
  C.keep = a.who===0 ? 'none' : (a.host===0 ? 'member' : 'request');
  C.watch = a.who>=2 ? 'invite' : (a.who===0 ? 'never' : 'invite');
  C.voice = v===2 ? 'pastor' : 'about';
  render(false); }
function render(save){
  Object.keys(G).forEach(function(k){ $(G[k]).querySelectorAll('button').forEach(function(b){ b.setAttribute('aria-pressed',String(b.dataset.v===C[k])); }); });
  var txt=T.keep[C.keep]+' '+T.watch[C.watch]+' '+T.voice[C.voice];
  $('clauseTxt').textContent=txt;
  $('clauseFrom').textContent= touched ? 'Saved in this browser. The Faith Layer finale will place it in your charter.' : 'Drafted from your angel in Room B and your voice setting in Room D. Change any line to make it yours.';
  if(save){ try{ F.clause('02',{k:C.keep+'-'+C.watch+'-'+C.voice,keep:C.keep,watch:C.watch,voice:C.voice,text:txt}); }catch(e){} }
}
Object.keys(G).forEach(function(k){ $(G[k]).querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ C[k]=b.dataset.v; touched=true; render(true); }); }); });
window.__clauseDefaults=defaults;
var prev=window.__angelChanged; window.__angelChanged=function(){ if(prev) prev(); defaults(); };
if(touched) render(false); else defaults();
})();

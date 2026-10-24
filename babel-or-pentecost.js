(function(){
'use strict';
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function $(s,r){return (r||document).querySelector(s);} function $$(s,r){return [].slice.call((r||document).querySelectorAll(s));}
function chip(l,sub){var c={FACT:'fact',REPORTED:'rep',INFERENCE:'inf',WATCH:'watch'}[l];return '<span class="chip '+c+'">'+l+'</span>'+(sub?'<span class="sub">'+sub+'</span>':'');}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1});
$$('.rv').forEach(function(n){io.observe(n);});
var LAPIS='#2b4c9b', GOLD='#d18a1e', ASH='#cfc6b8';
function rnd(i){var x=Math.sin(i*12.9898)*43758.5453;return x-Math.floor(x);}

/* hero: a tower of 7,164 dots; the top is translated, flames above it */
(function(){
  var cv=$('#heroArt'); if(!cv) return; var ctx=cv.getContext('2d'), W,H, dpr=Math.min(2,window.devicePixelRatio||1), pts=[];
  function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);layout();}
  function layout(){pts=[];var tiers=11,base=H*.9,top=H*.2,cx=W*.55,maxw=Math.min(W*.8,520),n=0,rows=[];
    for(var t=0;t<tiers;t++){var y0=base-(base-top)*t/tiers,y1=base-(base-top)*(t+1)/tiers,w=maxw*(1-t*.075);rows.push([y0,y1,w]);}
    var total=7164,per=[];var sum=0;rows.forEach(function(r){sum+=r[2]*(r[0]-r[1]);});
    rows.forEach(function(r,ti){var cnt=Math.round(total*r[2]*(r[0]-r[1])/sum);for(var k=0;k<cnt;k++){pts.push({x:cx-r[2]/2+rnd(n*3+1)*r[2],y:r[1]+rnd(n*7+2)*(r[0]-r[1]-3),tier:ti,i:n});n++;}});
  }
  size(); window.addEventListener('resize',size);
  function frame(now){var t=now/1000; ctx.clearRect(0,0,W,H);
    var cut=pts.length-200;
    pts.forEach(function(p,k){var lit=k>=cut; ctx.fillStyle=lit?LAPIS:ASH; ctx.globalAlpha=lit?.55+.45*Math.sin(t*1.4+k):.55; ctx.fillRect(p.x,p.y,1.6,1.6);});
    ctx.globalAlpha=1;
    var cx=W*.55, ty=H*.2;
    for(var f=0;f<13;f++){var a=(f/12-.5)*Math.PI*.8, r=Math.min(W,H)*.14, fx=cx+Math.sin(a)*r, fy=ty-14-Math.cos(a)*r*.55, h=16+5*Math.sin(t*3+f);
      ctx.fillStyle=GOLD; ctx.globalAlpha=.75; ctx.beginPath(); ctx.moveTo(fx,fy-h); ctx.quadraticCurveTo(fx+7,fy-h*.3,fx,fy); ctx.quadraticCurveTo(fx-7,fy-h*.3,fx,fy-h); ctx.fill();}
    ctx.globalAlpha=1; if(!RM) requestAnimationFrame(frame);}
  requestAnimationFrame(frame);
})();

/* ROOM A · Babel meter */
(function(){
  var cv=$('#dots'); if(!cv) return; var ctx=cv.getContext('2d'), dpr=Math.min(2,window.devicePixelRatio||1);
  var T=[{n:'Live voice in earbuds and calls',c:13,lab:'about 9 to 13 languages'},{n:'Research speech input',c:101,lab:'101 languages'},{n:'Research text translation',c:200,lab:'200 languages'},{n:'Google\'s stated goal',c:1000,lab:'1,000 languages, a goal'}];
  var tier=2, total=7164, order=[]; for(var i=0;i<total;i++)order.push(i); order.sort(function(a,b){return rnd(a+9)-rnd(b+9);});
  var rank=new Array(total); order.forEach(function(v,k){rank[v]=k;});
  function draw(){var w=cv.getBoundingClientRect().width, cols=w<500?90:150, cell=w/cols, rows=Math.ceil(total/cols), h=rows*cell;
    cv.style.height=h+'px'; cv.width=w*dpr; cv.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h);
    var n=T[tier].c;
    for(var i=0;i<total;i++){var x=(i%cols)*cell, y=Math.floor(i/cols)*cell, lit=rank[i]<n; ctx.fillStyle=lit?(tier===3?GOLD:LAPIS):'#d8d0c3'; var s=Math.max(1.4,cell*(lit?.82:.6)); ctx.fillRect(x+(cell-s)/2,y+(cell-s)/2,s,s);}
    var pct=(100*n/total); $('#meterK').textContent=T[tier].lab+' of 7,164';
    $('#meterLine').innerHTML='<b>'+T[tier].n+':</b> '+T[tier].lab+', about '+(pct<1?pct.toFixed(2):pct.toFixed(1))+'% of the world\'s languages.';
    $('#meterPlain').innerHTML='<b>What this shows</b>Even the largest research system covers about 3% of living languages, and the consumer tools in people\'s ears cover well under 1%. Scripture is moving faster: 544 languages are judged to need a translation that has not begun, down from 985 partly because need was reassessed, and translators who use AI call its output "draft 0," with humans keeping final authority over meaning. '+chip('FACT','Wycliffe');}
  $$('#tiers .pill').forEach(function(b){b.addEventListener('click',function(){tier=+b.dataset.t;$$('#tiers .pill').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});draw();});});
  $$('#countBy .pill').forEach(function(b){b.addEventListener('click',function(){$$('#countBy .pill').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});var p=b.dataset.c==='people';$('#people').hidden=!p;cv.style.opacity=p?.35:1;});});
  window.addEventListener('resize',draw); draw();
})();

/* ROOM B · axis */
(function(){
  var svg=$('#axis'); if(!svg) return;
  var C=[
   {lo:-.03,hi:-.03,lab:'−0.03',t:'With no faith stated, models answered from a secular, therapeutic stance. For users from traditions with strong norms, such as Roman Catholicism and Sunni Islam, counsel averaged slightly against their own tradition.'},
   {lo:.45,hi:.45,lab:'+0.45',t:'For traditions with fewer fixed norms, the same secular default happened to fit better, averaging +0.45.'},
   {lo:.40,hi:.63,lab:'+0.40 to +0.63 after pushback',t:'Naming the faith helped. When the user pushed back, some models slipped slightly and others much more, but answers stayed well above the unstated baseline, between +0.40 and +0.63.'},
   {lo:.71,hi:.85,lab:'+0.71 to +0.85',t:'Given a guide to the user\'s tradition, models scored between +0.71 and +0.85. The authors frame the default as "recognition, not capability."'}];
  var X=function(v){return 40+(v+1)/2*640;};
  var g='<line x1="40" y1="80" x2="680" y2="80" stroke="#cfc6b8" stroke-width="2"/>';
  [-1,-.5,0,.5,1].forEach(function(v){g+='<line x1="'+X(v)+'" y1="72" x2="'+X(v)+'" y2="88" stroke="#a69d90"/><text x="'+X(v)+'" y="108" text-anchor="middle" font-size="12" font-family="IBM Plex Mono,monospace" fill="#655e6c">'+(v>0?'+':'')+v+'</text>';});
  g+='<text x="40" y="135" font-size="11.5" font-family="IBM Plex Mono,monospace" fill="#655e6c">against the user\'s tradition</text><text x="680" y="135" text-anchor="end" font-size="11.5" font-family="IBM Plex Mono,monospace" fill="#655e6c">with the user\'s tradition</text>';
  g+='<rect id="mk" x="'+X(-.03)+'" y="62" width="4" height="36" rx="2" fill="'+LAPIS+'" style="transition:all .7s cubic-bezier(.2,.7,.2,1)"/><text id="mkl" x="'+X(-.03)+'" y="50" text-anchor="middle" font-size="15" font-family="Newsreader,serif" fill="#1b1820" style="transition:all .7s cubic-bezier(.2,.7,.2,1)">−0.03</text>';
  svg.innerHTML=g;
  function show(k){var c=C[k], mk=$('#mk'), ml=$('#mkl');
    if(c.lo===null){mk.setAttribute('x',X(.1));mk.setAttribute('width',X(.6)-X(.1));mk.setAttribute('fill','url(#none)');mk.style.fill='rgba(43,76,155,.18)';ml.setAttribute('x',X(.35));}
    else{var w=Math.max(4,X(c.hi)-X(c.lo));mk.setAttribute('x',X(c.lo)-(c.lo===c.hi?2:0));mk.setAttribute('width',w);mk.style.fill=LAPIS;ml.setAttribute('x',X((c.lo+c.hi)/2));}
    ml.textContent=c.lab; $('#condOut').innerHTML='<p>'+c.t+' '+chip('FACT','study finding, preprint')+'</p>';
    $$('#cond .pill').forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.k===k));});}
  $$('#cond .pill').forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.k);});}); show(0);
})();

/* ROOM C · words */
(function(){
  var W=[
   {w:'hesed',s:'Hebrew Bible',m:'Steadfast covenant loyalty: love that keeps faith when it is not owed.',f:'kindness'},
   {w:'shalom',s:'Hebrew Bible and Jewish usage',m:'Wholeness and right relation among people, God and the world; a greeting and a hope.',f:'peace'},
   {w:'grace',s:'Christian, from the Greek charis',m:'Favor freely given by God that cannot be earned.',f:'kindness, elegance'},
   {w:'taqwa',s:'Quranic Arabic',m:'A guarding awareness of God that shapes conduct; reverence that keeps one careful.',f:'piety, fear'},
   {w:'dharma',s:'Hindu, Buddhist, Jain and Sikh usage, each different',m:'Order, duty and teaching at once; for a Buddhist, also the Buddha\'s teaching itself.',f:'religion, duty'},
   {w:'dukkha',s:'Pali, Buddhist',m:'The unsatisfactoriness of everything conditioned, including pleasure that cannot last.',f:'suffering'}];
  var box=$('#words'); if(!box) return;
  box.innerHTML=W.map(function(x,i){return '<button class="word" data-i="'+i+'" aria-pressed="false"><span class="w">'+x.w+'</span><small>'+x.s+'</small><span class="m">'+x.m+'</span><span class="f">flattens to <b>'+x.f+'</b></span></button>';}).join('');
  $$('.word',box).forEach(function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(on));});});
})();

/* ROOM D · saints ladder, memory of Exhibit 06, clause */
(function(){
  var P=[
   {k:'A library that searches the texts',c:'Sefaria\'s Library Assistant, launched in August 2026, answers from about 390 million words of Jewish text and says it is not a legal authority. Magisterium AI answers from about 27,000 Catholic Church documents.',a:'is a library that searches our texts, cites them and says it is a machine'},
   {k:'A clone of a living pastor',c:'A Vallejo, California pastor built an AI twin from his sermons and books; on serious matters it sends members to him.',a:'may speak in a living leader\'s voice only with that leader\'s consent and a label'},
   {k:'A figure from scripture',c:'Text With Jesus, launched in 2023, lets users text the Holy Family, apostles and prophets, with a premium tier and an option to chat with Satan.',a:'may voice a figure from scripture, labeled as fiction'},
   {k:'Jesus, in a holy place',c:'In 2024 a Lucerne chapel put an AI Jesus in a confessional for two months; about 900 conversations were recorded. Its theologian called it an artistic experiment, not a replacement for confession.',a:'may speak as Jesus or God, as an experiment with clear warnings'},
   {k:'The sacrament itself',c:'A Catholic group\'s chatbot, "Father Justin," claimed to be a priest and offered absolution. Its makers renamed it "Justin," saying "he never was a real priest."',a:'may perform a role our tradition reserves for ordained people'}];
  var box=$('#panes5'), out=$('#paneOut'); if(!box) return;
  box.innerHTML=P.map(function(p,i){return '<button class="pane" data-i="'+i+'" aria-pressed="false"><span class="n">'+(i+1)+'</span><span class="k">'+p.k+'</span></button>';}).join('');
  var st={k:0,lang:'review'};
  try{var sv=window.InferaFaith&&InferaFaith.clause('08');if(sv&&sv.lang){st=sv;}}catch(e){}
  function showPane(k,save){st.k=k;$$('.pane',box).forEach(function(b,i){b.classList.toggle('kept',i<=k);b.classList.toggle('beyond',i>k);b.setAttribute('aria-pressed',String(i===k));});
    out.innerHTML='<h3>'+(k+1)+' · '+P[k].k+'</h3><p>'+P[k].c+' '+chip('REPORTED')+'</p>'; clause(save);}
  function clause(save){
    var L={review:'Members receive scripture and care in their own language; any machine translation is reviewed by a fluent speaker before it is used.',logistics:'We use machine translation for announcements and logistics, never for scripture, liturgy or counsel.',none:'We do not use machine translation.'}[st.lang];
    st.text=L+' Any AI our congregation offers '+P[st.k].a+'.'+(st.k<4?' It goes no further.':'');
    $('#clauseTxt').textContent=st.text; if(save){try{window.InferaFaith&&InferaFaith.clause('08',st);}catch(e){}}}
  $$('.pane',box).forEach(function(b){b.addEventListener('click',function(){showPane(+b.dataset.i,true);});});
  $$('#lang .pill').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.v===st.lang));b.addEventListener('click',function(){st.lang=b.dataset.v;$$('#lang .pill').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});clause(true);});});
  showPane(st.k,false);
  // the line drawn in Exhibit 06
  var line=null; try{line=window.InferaFaith&&InferaFaith.get('idolatryLine',null);}catch(e){}
  var SD=['a photo or a letter','their real voice, played back','a bot that says new words','a bot you ask for advice','a bot treated as them','an "uploaded soul"'];
  if(line!==null&&line!==undefined&&SD[line]){var r=$('#remember');r.hidden=false;
    r.innerHTML='<b>Your line from Exhibit 06.</b> For the dead, you kept panes 1 to '+(line+1)+': up to <i>'+SD[line]+'</i>. '+(line<=1?'By that line, every pane here past the library has a machine saying words no one said.':'By that line, you allowed new words in a familiar voice. Here the voice belongs to someone a tradition calls holy.');}
})();
})();

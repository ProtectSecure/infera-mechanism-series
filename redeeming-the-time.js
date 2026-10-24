(function(){
'use strict';
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function $(s,r){return (r||document).querySelector(s);} function $$(s,r){return [].slice.call((r||document).querySelectorAll(s));}
function chip(l,sub){var c={FACT:'fact',REPORTED:'rep',INFERENCE:'inf',WATCH:'watch'}[l];return '<span class="chip '+c+'">'+l+'</span>'+(sub?'<span class="sub">'+sub+'</span>':'');}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1});
$$('.rv').forEach(function(n){io.observe(n);});
var GOLD='#c98a1b', INDIGO='#3a3f7a', ROSE='#a8384f', BLUE='#2f5597';
var DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var FAITH=window.InferaFaith||{get:function(k,d){return d;},set:function(){},clause:function(){return null;},visited:function(){return [];},forget:function(){}};

/* hero: a week ring at dusk; notifications fall everywhere except inside the kept hours */
(function(){
  var cv=$('#heroArt'); if(!cv) return; var ctx=cv.getContext('2d'),W,H,dpr=Math.min(2,window.devicePixelRatio||1),N=[];
  function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
  size(); window.addEventListener('resize',size);
  for(var i=0;i<90;i++)N.push({a:Math.random()*Math.PI*2,r:Math.random(),v:.002+Math.random()*.004});
  var s0=138/168*Math.PI*2-Math.PI/2, s1=163/168*Math.PI*2-Math.PI/2;
  function frame(now){var t=now/1000;ctx.clearRect(0,0,W,H);
    var cx=W*.55,cy=H*.5,R=Math.min(W*.42,H*.36);
    var g=ctx.createRadialGradient(cx,cy,R*.1,cx,cy,R*1.5);g.addColorStop(0,'rgba(58,63,122,.10)');g.addColorStop(1,'rgba(58,63,122,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    for(var h=0;h<168;h++){var a=h/168*Math.PI*2-Math.PI/2,d=h%24===0;ctx.strokeStyle=d?'rgba(27,24,32,.55)':'rgba(27,24,32,.16)';ctx.lineWidth=d?1.6:1;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*R*(d?.84:.9),cy+Math.sin(a)*R*(d?.84:.9));ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke();}
    ctx.strokeStyle=GOLD;ctx.globalAlpha=.85;ctx.lineWidth=R*.12;ctx.beginPath();ctx.arc(cx,cy,R*.78,s0,s1);ctx.stroke();ctx.globalAlpha=1;
    N.forEach(function(n){if(!RM){n.r+=n.v;if(n.r>1)n.r=0;}var a=n.a, inS=(function(){var x=((a+Math.PI/2)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);return x>=s0+Math.PI/2&&x<=s1+Math.PI/2;})();
      var rr=R*(1.25-n.r*.5);ctx.fillStyle=inS?'rgba(201,138,27,0)':'rgba(168,56,79,'+(.15+.5*n.r)+')';ctx.beginPath();ctx.arc(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,2.2,0,7);ctx.fill();});
    ctx.fillStyle='#f6e3b4';ctx.beginPath();ctx.ellipse(cx,cy-8+Math.sin(t*3)*1.5,6,14,0,0,7);ctx.fill();ctx.fillStyle='#2a2430';ctx.fillRect(cx-5,cy+6,10,26);
    if(!RM)requestAnimationFrame(frame);}
  requestAnimationFrame(frame);
})();

/* ROOM A · how long were you gone? A feed with no clock. Time is measured in this page only. */
(function(){
  var feed=$('#pfeed'); if(!feed) return;
  var STAGES=[
   {k:'Morning verse',c:'#c98a1b'},{k:'Devotional',c:'#c98a1b'},{k:'Worship clip',c:'#b48a2c'},{k:'Sermon clip',c:'#8a6d2c'},
   {k:'Reaction video',c:'#7a5bb0'},{k:'Comment fight',c:'#a8384f'},{k:'Church scandal',c:'#a8384f'},{k:'Celebrity gossip',c:'#b4442a'},
   {k:'Ad',c:'#2f5597'},{k:'Self-improvement',c:'#2d7d6f'},{k:'Animal video',c:'#2d7d6f'},{k:'Alarming headline',c:'#5b3f8c'}];
  var CARDS=[
   [0,'This is the day which the LORD hath made; we will rejoice and be glad in it.','Psalm 118:24, King James Version'],
   [1,'Three minutes to start your morning in gratitude. Breathe in. Name one gift.','A devotional account'],
   [1,'What would change if you prayed before you checked your phone?','A devotional account'],
   [2,'A choir sings the first verse in a stone chapel. 2.1M views.','Suggested for you'],
   [3,'"You are not behind." A pastor\'s 40-second clip on rest.','Because you watched a worship clip'],
   [3,'Part 2: why the Sabbath was a gift, not a rule.','Autoplays next'],
   [4,'Pastor reacts to a viral sermon. You will not believe minute two.','Trending in faith'],
   [5,'847 replies. "This is not what the verse means." "Read it in context."','Top comments'],
   [5,'A stranger quotes Greek. Another quotes a meme. You read all of it.','More replies'],
   [6,'A megachurch drama, explained in nine slides.','Suggested for you'],
   [6,'Former members speak out. Thread.','Because you read a comment fight'],
   [7,'A singer\'s surprising faith journey, and the breakup nobody saw coming.','Trending'],
   [8,'This journaling Bible is 40% off for the next hour.','Sponsored'],
   [9,'The 5 a.m. routine that changed my life. Step 1: cold water.','Suggested for you'],
   [9,'Stop wasting your mornings. A productivity coach explains.','Autoplays next'],
   [10,'A dog learns to open the fridge. 14M views.','Suggested for you'],
   [10,'The same dog, a second fridge.','Autoplays next'],
   [11,'BREAKING: something somewhere is getting worse. Tap for details.','Trending now'],
   [11,'Five things you should be worried about this week.','Because you tapped a headline'],
   [10,'A cat ignores a cucumber.','Suggested for you'],
   [8,'You were looking at journaling Bibles. Still interested?','Sponsored'],
   [5,'"Unpopular opinion" about worship music. 2,300 replies.','Top comments']];
  var t0=0, acc=0, running=false, idx=0, seen={}, maxStage=0, order=[];
  function now(){return (window.performance&&performance.now)?performance.now():Date.now();}
  function elapsed(){return acc+(running?now()-t0:0);}
  function pause(){ if(running){ acc+=now()-t0; running=false; } }
  function resume(){ if(!running && started && !done){ t0=now(); running=true; } }
  var started=false, done=false;
  document.addEventListener('visibilitychange',function(){ if(document.hidden) pause(); else resume(); });
  var obs=new IntersectionObserver(function(es){es.forEach(function(e){ if(!e.isIntersecting) return; var s=+e.target.dataset.s; if(!seen[s]){seen[s]=1;order.push(s);} if(+e.target.dataset.i>=idx-3) more(); });},{root:feed,threshold:.6});
  function card(n){ var c=CARDS[n%CARDS.length], st=STAGES[c[0]], d=document.createElement('article');
    d.className='pcard'+(c[0]===0?' verse':''); d.dataset.s=c[0]; d.dataset.i=n;
    d.innerHTML='<small style="color:'+st.c+'">'+c[2]+'</small><p>'+c[1]+'</p><div class="pthumb" style="--h:'+(c[0]*29%360)+'"></div><div class="pacts"><span>♡</span><span>↻</span><span>⋯</span></div>';
    feed.appendChild(d); obs.observe(d); }
  function more(){ for(var k=0;k<6;k++){ card(idx); idx++; } }
  $('#beginFeed').addEventListener('click',function(){ feed.innerHTML=''; started=true; resume(); more(); more(); $('#stopFeed').hidden=false; $('#feedState').textContent='Scrolling'; feed.focus(); });
  function fmt(ms){ var s=Math.round(ms/1000), m=Math.floor(s/60); return (m?m+' min ':'')+(s%60)+' s'; }
  $('#est').addEventListener('input',function(){ $('#estO').textContent=fmt(+this.value*1000); });
  $('#estO').textContent=fmt(120000);
  $('#stopFeed').addEventListener('click',function(){ pause(); done=true; $('#stopFeed').hidden=true; $('#feedState').textContent='Stopped'; $('#estBox').hidden=false; feed.classList.add('dim'); $('#est').focus(); });
  $('#reveal').addEventListener('click',function(){
    var real=elapsed(), guess=+$('#est').value*1000, err=(guess-real)/real, pct=Math.round(Math.abs(err)*100);
    var dir= Math.abs(err)<=.05 ? 'within 5% of the real time. In the review of 44 studies, only about 6% of comparisons were that close.' : (err>0? pct+'% too long.':pct+'% too short.');
    var cards=feed.querySelectorAll('.pcard').length;
    $('#goneOut').innerHTML='<p class="big2">You were here <b>'+fmt(real)+'</b>.</p><p>You guessed '+fmt(guess)+': '+dir+'</p>'+
      (Math.abs(err)>.05?'<p class="note">'+(real<300000?'Short sessions tend to feel longer than they are; ':'Long sessions tend to feel a little shorter than they are; ')+'that is the pattern one small lab study found. '+chip('FACT','56 students')+'</p>':'')+
      '<p class="note">The feed reached the <b>'+STAGES[Math.max.apply(null,order.concat([0]))].k.toLowerCase()+'</b> stage. You started with a psalm.</p>';
    $('#trail').innerHTML=order.slice(0,12).map(function(s,i){return '<li style="--c:'+STAGES[s].c+'"><i></i>'+STAGES[s].k+'</li>';}).join('');
    try{ window.InferaFaith&&InferaFaith.set('timeGone',{real:Math.round(real/1000),guess:Math.round(guess/1000)}); }catch(e){}
  });
})();

/* ROOM C · the distracted pew */
(function(){
  var box=$('#pewgrid'); if(!box) return;
  var P=[
   {k:'survey',h:'The norm',big:'96%',t:'US adults who say it is generally not OK to use a cellphone in church or a worship service, the highest of any setting Pew asked about. Movies: 95%. Family dinner: 88%.',src:'Pew Research Center, 2014 survey published 2015',l:['FACT']},
   {k:'survey',h:'The habit',bars:[['Listen closely',75],['Get distracted',17],['Use a digital Bible',15],['Fact-check the pastor',10],['Browse texts, email or social media',7]],t:'What practicing Christians say they do during sermons. Categories overlap; one person can do several.',src:'Barna Group, n=794 practicing Christians, Dec 2019',l:['FACT']},
   {k:'survey',h:'The other direction',big:'21% · 14%',t:'US adults who use an app or website to read scripture, and to pray. Among highly religious adults, 52% use one for scripture. Screens also carry practice.',src:'Pew Research Center, n=11,377, Nov 2022',l:['FACT']},
   {k:'survey',h:'The stated reason',big:'17%',t:'US adults counted as scripture-engaged in 2026, down from 20% a year earlier. Among weekly churchgoers who do not read scripture on their own, a leading reason given is not having enough time.',src:'American Bible Society, State of the Bible 2026, as reported',l:['REPORTED']},
   {k:'stmt',h:'A pope on algorithms',q:'Algorithms designed to maximize engagement "reward quick emotions and penalize more time-consuming human responses."',t:'Pope Leo XIV, message for the 2026 World Day of Social Communications, 24 Jan 2026. A statement, not data.',src:'vatican.va, message for the 60th World Day of Social Communications',l:['FACT']},
   {k:'stmt',h:'A scholar on the prayer hall',q:'"...in Prayer every one is communing with his [or her] Lord, so let no one distract another by reading the Qur\'an aloud."',t:'A hadith cited by a Toronto scholar advising worshippers to switch phones off in prayer and to leave them outside the prayer hall. A statement, not data.',src:'IslamOnline, fatwa by Sheikh Ahmad Kutty',l:['REPORTED']}];
  box.innerHTML=P.map(function(p){
    var body=p.big?'<div class="pbig">'+p.big+'</div>':p.q?'<blockquote>'+p.q+'</blockquote>':'<div class="pbars">'+p.bars.map(function(b){return '<div class="pb"><span>'+b[0]+'</span><i style="--w:'+b[1]+'%"></i><b>'+b[1]+'%</b></div>';}).join('')+'</div>';
    return '<div class="pcell '+p.k+'"><small>'+(p.k==='stmt'?'Statement':'Survey')+' · '+p.h+'</small>'+body+'<p>'+p.t+' '+chip.apply(null,p.l)+'</p><em>'+p.src+'</em></div>';}).join('');
  $('#onlyMeasured').addEventListener('change',function(e){box.classList.toggle('only',e.target.checked);});
})();

/* ROOM E · the persuasion ladder, and clause 06 */
(function(){
  var ol=$('#rungs'); if(!ol) return;
  var R=[
   {n:'A public invitation',s:'public invitation',d:'A sermon, a sign on the lawn, an open door, a post anyone can scroll past.',t:'The 1989 Manila Manifesto says the gospel "leaves the hearers entirely free to make up their own minds."',l:'FACT'},
   {n:'A reminder you asked for',s:'reminders people ask for',d:'A person sets a prayer time, and an app reminds them then.',t:'Consent is given, and the reminder points away from the screen toward prayer.',l:'INFERENCE'},
   {n:'Reminders on by default',s:'reminders sent by default',d:'Notifications nobody switched on, sent until someone switches them off.',t:'Consent is assumed rather than given. Whether that matters depends on how easy the off switch is.',l:'INFERENCE'},
   {n:'A streak you can lose',s:'streaks a person can lose',d:'"Don\'t break your 40-day streak."',t:'Supporters call it a rule of life with a counter; a rival app argues streaks turn the aim from God to protecting a number.',l:'REPORTED'},
   {n:'Surprise rewards and badges',s:'surprise rewards and badges',d:'Celebrations that arrive unpredictably, the pattern critics compare to slot machines.',t:'The 2011 code rejects "allurements, including financial incentives and rewards" in acts of service. Applying that to badges is our reading.',l:'INFERENCE'},
   {n:'Autoplay into the next message',s:'autoplay into the next message',d:'The next sermon starts before anyone decides to watch it.',t:'Users in one study most often said autoplay left them less in control. The 2011 code asks for "sufficient time for adequate reflection."',l:'FACT'},
   {n:'Ads aimed at inferred struggles',s:'ads aimed at a person\'s inferred struggles',d:'Targeting people a system judges anxious, addicted or in a struggling marriage.',t:'A church-data firm was reported to claim it could find such people. The 2011 code says "the vulnerability of people and their need for healing are not exploited."',l:'REPORTED'},
   {n:'Fake urgency',s:'fake urgency',d:'A date-certain end of the world on billboards, as in one 2011 campaign whose followers were reported to have quit jobs and given away belongings.',t:'Vatican II asks believers to refrain from anything that "might seem to carry a hint of coercion."',l:'REPORTED'},
   {n:'Deception',s:'deception',d:'A gospel tract printed to look like a $1 million bill. The Secret Service seized more than 8,000 in 2006, a trade publication reported; a court later ruled such tracts legal.',t:'The 2011 code warns against mission "by resorting to deception and coercive means."',l:'REPORTED'}];
  var REST={day:'One day a week, our apps and channels send nothing.',night:'Our channels are quiet from 10 p.m. to 6 a.m., every night.',teach:'We teach a weekly rest from screens, and our staff keep it first.'};
  var F=window.InferaFaith||{clause:function(){return null;},set:function(){}};
  var st={line:null,rest:'day'}, signed=false, timer=null;
  try{ var sv=F.clause('06'); if(sv&&typeof sv.line==='number'&&sv.line>=0&&sv.line<9){ st.line=sv.line; st.rest=sv.rest||'day'; signed=true; } }catch(e){}
  ol.innerHTML=R.map(function(r,i){return '<li><button type="button" class="rung" data-i="'+i+'" aria-pressed="false"><b>'+(i+1)+'</b><span>'+r.n+'</span></button></li>';}).join('');
  function text(){ if(st.line===null) return 'Choose the last rung you would allow, and your clause appears here.';
    var a= st.line===R.length-1 ? 'We place no limit on how we persuade.' : 'Our outreach may go as far as '+R[st.line].s+', and never uses '+R[st.line+1].s+' or anything beyond it.';
    return a+' '+REST[st.rest]; }
  function draw(){
    $$('.rung',ol).forEach(function(b){ var i=+b.dataset.i; b.setAttribute('aria-pressed',String(st.line!==null&&i<=st.line)); b.classList.toggle('over',st.line!==null&&i>st.line); });
    var i= st.line===null?0:st.line, r=R[i];
    $('#rungOut').innerHTML='<small>Rung '+(i+1)+' of 9</small><h3>'+r.n+'</h3><p>'+r.d+'</p><p>'+r.t+' '+chip(r.l)+'</p>'+(st.line!==null&&st.line<R.length-1?'<p class="note">Beyond your line: '+R[st.line+1].n.toLowerCase()+'.</p>':'');
    $$('#rest .pill').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.v===st.rest));});
    $('#clauseTxt').textContent=text();
    $('#lineState').textContent= st.line===null?'Tap the last rung you would allow':'Your line: after rung '+(st.line+1);
  }
  function save(){ try{ F.clause('06',{k:'line'+st.line+'-'+st.rest,line:st.line,rest:st.rest,text:text()}); F.set('persuasionLine',st.line); }catch(e){} }
  function arm(){ var b=$('#signC'); if(signed){ b.disabled=true; b.textContent='Saved'; save(); return; }
    clearInterval(timer); var n=10; b.disabled=true; b.textContent='Sit with it · '+n;
    timer=setInterval(function(){ n--; if(n<=0){ clearInterval(timer); b.disabled=false; b.textContent='Save clause 06'; } else b.textContent='Sit with it · '+n; },1000); }
  $$('.rung',ol).forEach(function(b){ b.addEventListener('click',function(){ st.line=+b.dataset.i; draw(); arm(); }); });
  $$('#rest .pill').forEach(function(b){ b.addEventListener('click',function(){ st.rest=b.dataset.v; draw(); if(signed) save(); }); });
  $('#signC').addEventListener('click',function(){ signed=true; save(); this.disabled=true; this.textContent='Saved'; });
  draw(); if(signed){ $('#signC').textContent='Saved'; }
})();

/* ROOM B · the week clock (from A Palace in Time) */
(function(){
  var svg=$('#ring'); if(!svg) return;
  var PRE={shabbat:[138,25,'Shabbat'],sunday:[0,24,'The Lord\'s Day'],jumuah:[132,2,'The Friday prayer'],custom:[138,24,'Your hours']};
  var st={p:'shabbat',s:138,l:25,ny:true,teen:true};
  var C=200,R=150;
  function pt(h,r){var a=h/168*Math.PI*2-Math.PI/2;return [C+Math.cos(a)*r,C+Math.sin(a)*r];}
  function arc(h0,len,r,w,col,op){if(len>=168)len=167.99;var p0=pt(h0,r),p1=pt(h0+len,r),large=len>84?1:0;return '<path d="M'+p0[0].toFixed(1)+' '+p0[1].toFixed(1)+' A'+r+' '+r+' 0 '+large+' 1 '+p1[0].toFixed(1)+' '+p1[1].toFixed(1)+'" fill="none" stroke="'+col+'" stroke-width="'+w+'" stroke-opacity="'+(op||1)+'" stroke-linecap="butt"/>';}
  function fmt(h){h=((h%168)+168)%168;var d=Math.floor(h/24),hr=h%24;return DAYS[d]+' '+(hr===0?'midnight':hr===12?'noon':(hr%12)+(hr<12?' a.m.':' p.m.'));}
  function inSet(h,set){return set.some(function(r){var x=((h-r[0])%168+168)%168;return x<r[1];});}
  var NY=[],TEEN=[];for(var d=0;d<7;d++)NY.push([24*d,6]);[0,1,2,3,4].forEach(function(d){TEEN.push([24*d+22,8]);});
  function draw(){
    var g='<circle cx="'+C+'" cy="'+C+'" r="'+R+'" fill="none" stroke="#ddd4c6" stroke-width="22"/>';
    for(var h=0;h<168;h++){var d=h%24===0,p0=pt(h,R+(d?16:11)),p1=pt(h,R+20);g+='<line x1="'+p0[0].toFixed(1)+'" y1="'+p0[1].toFixed(1)+'" x2="'+p1[0].toFixed(1)+'" y2="'+p1[1].toFixed(1)+'" stroke="'+(d?'#433d4a':'#cfc6b8')+'" stroke-width="'+(d?1.6:.6)+'"/>';}
    DAYS.forEach(function(n,i){var p=pt(i*24+12,R+34);g+='<text x="'+p[0].toFixed(1)+'" y="'+(p[1]+4).toFixed(1)+'" text-anchor="middle" font-size="12" font-family="IBM Plex Mono,monospace" fill="#655e6c">'+n+'</text>';});
    if(st.teen)TEEN.forEach(function(r){g+=arc(r[0],r[1],R-30,8,ROSE,.55);});
    if(st.ny)NY.forEach(function(r){g+=arc(r[0],r[1],R-44,8,BLUE,.55);});
    g+=arc(st.s,st.l,R,22,GOLD,.92);
    var lab=PRE[st.p][2];g+='<text x="'+C+'" y="'+(C-6)+'" text-anchor="middle" font-size="22" font-family="Newsreader,serif" fill="#1b1820">'+lab+'</text><text x="'+C+'" y="'+(C+18)+'" text-anchor="middle" font-size="12" font-family="IBM Plex Mono,monospace" fill="#655e6c">'+st.l+' of 168 hours</text>';
    svg.innerHTML=g;
    var wake=0,teen=0,ny=0;for(var k=0;k<st.l;k++){var hh=(st.s+k)%168,hr=hh%24;if(hr>=7&&hr<23)wake++;if(inSet(hh,TEEN))teen++;if(inSet(hh,NY))ny++;}
    var pick=Math.round(205/16*wake),notif=Math.round(237/16*wake);
    $('#weekOut').innerHTML='<p><b>'+fmt(st.s)+'</b> to <b>'+fmt(st.s+st.l)+'</b> · '+wake+' waking hours</p>'+
      '<p>At a reported US average of 205 phone checks a day '+chip('REPORTED','phone logging, as reported')+', that is about <b>'+pick+' pickups</b> set down. For a teen who gets 237 notifications a day '+chip('FACT','small study')+', about <b>'+notif+' notifications</b> left unread. '+chip('INFERENCE','Infera arithmetic, 16 waking hours')+'</p>'+
      (teen?'<p>'+teen+' of these hours fall in the school-night window when teens in one study averaged 50 minutes on their phones.</p>':'')+(ny?'<p>'+ny+' already fall inside the hours New York will bar notifications to minors without a parent\'s consent, from January 2027. '+chip('FACT')+'</p>':'');
    $('#weekPlain').innerHTML='<b>What this shows</b>'+(st.p==='jumuah'?'Not every tradition sets apart a whole day. The Friday prayer is a bounded pause in a working day, and that is a different kind of rest from Shabbat. ':'A tradition marks hours as different; a feed treats every hour alike. ')+'New York is drawing its own quiet hours into law, for different reasons: the state protects sleep, a tradition protects holiness. '+chip('INFERENCE');
    $('#csO').textContent=fmt(st.s);$('#clO').textContent=st.l+' hours';
  }
  $$('#pre .pill').forEach(function(b){b.addEventListener('click',function(){st.p=b.dataset.p;var v=PRE[st.p];if(st.p!=='custom'){st.s=v[0];st.l=v[1];}else{st.s=+$('#cs').value;st.l=+$('#cl').value;}$('#custom').hidden=st.p!=='custom';$$('#pre .pill').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});draw();});});
  ['#cs','#cl'].forEach(function(id){$(id).addEventListener('input',function(){st.s=+$('#cs').value;st.l=+$('#cl').value;draw();});});
  $$('#lay .pill').forEach(function(b){b.addEventListener('click',function(){var k=b.dataset.l;st[k]=!st[k];b.setAttribute('aria-pressed',String(st[k]));draw();});});
  draw();
})();

/* ROOM D · hooks (from A Palace in Time) */
(function(){
  var H=[
   {m:'Streaks and autoplay',a:'In one study of 120 YouTube users, 87% of mentions of autoplay and 77% of mentions of recommendations described feeling less in control. Playlists and subscriptions, which users chose themselves, drew none.',al:['FACT','study finding'],b:'Hallow counts a streak only for a session at least 90% complete, and lets users hide streaks or add back a missed day. YouVersion\'s guide for pastors recommends streaks especially for middle and high schoolers.',bl:['FACT','company documentation']},
   {m:'Notifications',a:'A Los Angeles jury found Meta and YouTube negligent in designing their platforms in March 2026; the plaintiff\'s lawyers pointed to infinite feeds, autoplay and notifications. Appeals are pending.',al:['REPORTED'],b:'A 2013 analysis of the YouVersion Bible app described "Don\'t forget to read" reminders, red badges and missed-day emails.',bl:['REPORTED']},
   {m:'Habit loops',a:'Kentucky\'s complaint alleges TikTok found a habit can form in 260 videos, and that its 60-minute screen-time prompt cut use by about a minute and a half a day. TikTok says the quotes are out of context.',al:['REPORTED','allegation'],b:'YouVersion\'s daily plans end in a "Day Complete" chain of checkmarks that works like a streak. Its founder: "Our entire structure for plans focuses on daily engagement."',bl:['REPORTED']},
   {m:'Seasonal surges',a:'In one marketing survey cited by an ad-tech firm, 48% of users said they were more likely to engage with ads late at night after iftar, the meal that breaks the fast.',al:['REPORTED','marketing survey'],b:'A Catholic prayer app\'s downloads jump about 25 times on Ash Wednesday. <span class="chip fact">FACT</span><span class="sub">data provider estimate</span> In 2024 it ran a Super Bowl ad and was reported to be the first religious app to reach No. 1 on Apple\'s App Store.',bl:['REPORTED']},
   {m:'Location data',a:'A political group said in 2020 it geofenced churches to find Mass-goers and match them to voter files (Exhibit 04).',al:['REPORTED','the group\'s own claim'],b:'In 2020 a Muslim prayer app with more than 98 million downloads, by the company\'s count, was reported to send location data to a broker whose clients included military contractors. It denied selling data to the military and ended its data partnerships.',bl:['REPORTED']},
   {m:'Privacy',a:'Meta began using AI chats to personalize ads in the US in December 2025, excluding topics like religion and health (Exhibit 02).',al:['REPORTED'],b:'Mozilla\'s 2022 review of 32 mental health and prayer apps named Pray.com among the six worst for privacy and security.',bl:['FACT']}];
  var box=$('#hookList'); if(!box) return;
  box.innerHTML=H.map(function(h,i){return '<details class="hook"'+(i===0?' open':'')+'><summary><b>'+h.m+'</b><span>tap to compare</span></summary><div class="two"><div><small>In a feed</small><p>'+h.a+' '+chip.apply(null,h.al)+'</p></div><div><small>In a faith app</small><p>'+h.b+' '+chip.apply(null,h.bl)+'</p></div></div></details>';}).join('');
  var R={mech:'Then a congregation\'s own app should drop streaks and reminders, at least on the day it asks people to rest. Some faith-app makers would answer that the same habits are how people come to pray daily.',
         obj:'Then hooks pointed at prayer are a gift, and apps should be judged by what they lead to. Critics would answer that a streak trains the same reflex whatever it points at.',
         both:'Then ask of each feature whether it hands people back to a community or keeps them on the screen, which is the question Exhibit 02 asked of companions.'};
  $$('#read .pill').forEach(function(b){b.addEventListener('click',function(){$$('#read .pill').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});$('#readOut').innerHTML='<p>'+R[b.dataset.r]+' '+chip('INFERENCE')+'</p>';});});
})();

/* ROOM F · rest ledger (from A Palace in Time) */
(function(){
  var S=[
   {d:'Randomized · self-control',rct:1,t:'An experiment estimated that self-control problems cause about 31% of social media use, and that letting people set their own future screen-time limits substantially reduces use.',src:'Allcott, Gentzkow and Song, American Economic Review, 2022',l:'FACT'},
   {d:'Randomized · 4 weeks',rct:1,t:'Facebook switched off before the 2018 US midterms: more time offline with friends and family, higher wellbeing, less polarization, and lower use afterward.',src:'Allcott et al., American Economic Review, 2020',l:'FACT'},
   {d:'Randomized · 6 weeks',rct:1,t:'Two large experiments in 2020 measured a happiness, depression and anxiety index.',bars:[['Facebook off',.060],['Instagram off',.041]],src:'Allcott et al., working paper, 2025',l:'FACT'},
   {d:'Randomized · 2 weeks · 467 adults',rct:1,t:'Among participants who complied with two weeks of blocked mobile internet, screen time fell from 314 to 161 minutes a day, and people reported better mood and attention. Only about a quarter fully complied.',src:'Castelo et al., PNAS Nexus, 2025',l:'FACT'},
   {d:'Quasi-experiment · a Florida district',rct:0,t:'A school phone ban raised suspensions in its first month, then brought about a 1.1 percentile gain on tests in year two.',src:'Figlio and Özek, NBER, 2025',l:'FACT'},
   {d:'Observational · 1 week · ages 18 to 24',rct:0,t:'People who chose a one-week social media detox reported 24.8% fewer depression symptoms. They chose it themselves, so the cause is unproven.',src:'Calvert et al., JAMA Network Open, 2025',l:'FACT'},
   {d:'Cross-sectional · 30 English schools',rct:0,t:'Restrictive school phone policies showed no difference in wellbeing or sleep. Critics say the schools were misclassified.',src:'Goodyear et al., Lancet Regional Health Europe, 2025; critique by Haidt and colleagues',l:'FACT',l2:'REPORTED'}];
  var ol=$('#ladder'); if(!ol) return;
  ol.innerHTML=S.map(function(s,i){var bars=s.bars?'<div class="sd">'+s.bars.map(function(b){return '<div class="sdrow"><span>'+b[0]+'</span><i style="--w:'+(b[1]/.1*100)+'%"></i><b>+'+b[1].toFixed(3)+' SD</b></div>';}).join('')+'<small>scale: 0 to 0.1 standard deviations</small></div>':'';
    return '<li class="'+(s.rct?'rct':'weak')+'"><small>'+s.d+'</small><p>'+s.t+' '+chip(s.l)+(s.l2?' '+chip(s.l2):'')+'</p>'+bars+'<em>'+s.src+'</em></li>';}).join('');
  $('#onlyRct').addEventListener('change',function(e){ol.classList.toggle('only',e.target.checked);});
})();

})();

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

/* ROOM A · the week clock */
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

/* ROOM B · hooks */
(function(){
  var H=[
   {m:'Notifications',a:'A Los Angeles jury found Meta and YouTube negligent in designing their platforms in March 2026; the plaintiff\'s lawyers pointed to infinite feeds, autoplay and notifications. Appeals are pending.',al:['REPORTED'],b:'A 2013 analysis of the YouVersion Bible app described "Don\'t forget to read" reminders, red badges and missed-day emails.',bl:['REPORTED']},
   {m:'Habit loops',a:'Kentucky\'s complaint alleges TikTok found a habit can form in 260 videos, and that its 60-minute screen-time prompt cut use by about a minute and a half a day. TikTok says the quotes are out of context.',al:['REPORTED','allegation'],b:'YouVersion\'s daily plans end in a "Day Complete" chain of checkmarks that works like a streak. Its founder: "Our entire structure for plans focuses on daily engagement."',bl:['REPORTED']},
   {m:'Seasonal surges',a:'In one marketing survey cited by an ad-tech firm, 48% of users said they were more likely to engage with ads late at night after iftar, the meal that breaks the fast.',al:['REPORTED','marketing survey'],b:'A Catholic prayer app\'s downloads jump about 25 times on Ash Wednesday. In 2024 it ran a Super Bowl ad and became the first religious app to reach No. 1 on Apple\'s App Store.',bl:['FACT','data provider estimate']},
   {m:'Location data',a:'A political group said in 2020 it geofenced churches to find Mass-goers and match them to voter files (Exhibit 05).',al:['REPORTED','the group\'s own claim'],b:'In 2020 a Muslim prayer app with about 100 million downloads was reported to send location data to a broker whose clients included military contractors. It denied selling data to the military and ended its data partnerships.',bl:['REPORTED']},
   {m:'Privacy',a:'Meta began using AI chats to personalize ads in the US in December 2025, excluding topics like religion and health (Exhibit 04).',al:['REPORTED'],b:'Mozilla\'s 2022 review of 32 mental health and prayer apps named Pray.com among the six worst for privacy and security.',bl:['FACT']}];
  var box=$('#hookList'); if(!box) return;
  box.innerHTML=H.map(function(h,i){return '<details class="hook"'+(i===0?' open':'')+'><summary><b>'+h.m+'</b><span>tap to compare</span></summary><div class="two"><div><small>In a feed</small><p>'+h.a+' '+chip.apply(null,h.al)+'</p></div><div><small>In a faith app</small><p>'+h.b+' '+chip.apply(null,h.bl)+'</p></div></div></details>';}).join('');
  var R={mech:'Then a congregation\'s own app should drop streaks and reminders, at least on the day it asks people to rest. Some faith-app makers would answer that the same habits are how people come to pray daily.',
         obj:'Then hooks pointed at prayer are a gift, and apps should be judged by what they lead to. Critics would answer that a streak trains the same reflex whatever it points at.',
         both:'Then ask of each feature whether it hands people back to a community or keeps them on the screen, which is the question Exhibit 04 asked of companions.'};
  $$('#read .pill').forEach(function(b){b.addEventListener('click',function(){$$('#read .pill').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});$('#readOut').innerHTML='<p>'+R[b.dataset.r]+' '+chip('INFERENCE')+'</p>';});});
})();

/* ROOM C · rest ledger */
(function(){
  var S=[
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

/* ROOM D · timeline */
(function(){
  var T=[
   {y:'1961',h:'A uniform day of rest',t:'The Supreme Court upheld Maryland\'s Sunday closing laws in McGowan v. Maryland, finding that "the present purpose and effect of most of them is to provide a uniform day of rest for all citizens."',l:'FACT'},
   {y:'2001',h:'A Sabbath elevator by law',t:'Israel\'s Knesset required a Sabbath-mode elevator, one that stops at every floor so no one presses a button, in new multi-elevator buildings.',l:'REPORTED'},
   {y:'2017',h:'The right to disconnect',t:'France gave workers a right to disconnect from work email after hours; more than a dozen countries have a version.',l:'REPORTED'},
   {y:'2024',h:'Australia follows',t:'Australia\'s right to disconnect took effect on 26 August 2024, letting employees refuse unreasonable out-of-hours contact.',l:'REPORTED'},
   {y:'Feb 2026',h:'Europe and infinite scroll',t:'The European Commission preliminarily found TikTok\'s addictive design in breach of the Digital Services Act and said it should phase out infinite scroll and add screen-time breaks, "including during the night." The findings are preliminary.',l:'FACT'},
   {y:'Feb 2026',h:'A church asks, without a law',t:'Pope Leo XIV asked Catholics in Lent to make "space for silence by turning off televisions, radios and cell phones for a while."',l:'FACT'},
   {y:'Mar 2026',h:'Phones out of class',t:'Kansas became the 33rd state with a K-12 school cellphone ban.',l:'FACT'},
   {y:'Jan 2027',h:'Quiet hours for minors',t:'New York\'s rules, final in July 2026, bar platforms from sending notifications to minors from midnight to 6 a.m. without a parent\'s consent, starting 25 January 2027.',l:'FACT'}];
  var box=$('#tl'), out=$('#tlOut'); if(!box) return;
  box.innerHTML=T.map(function(x,i){return '<button class="yr" data-i="'+i+'" aria-pressed="'+(i===0)+'"><b>'+x.y+'</b><span>'+x.h+'</span></button>';}).join('');
  function show(i){out.innerHTML='<h3>'+T[i].y+' · '+T[i].h+'</h3><p>'+T[i].t+' '+chip(T[i].l)+'</p>';$$('.yr',box).forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.i===i));});}
  $$('.yr',box).forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.i);});}); show(0);
})();

/* FINALE · charter and rose window */
(function(){
  var box=$('#clauses'); if(!box) return;
  var CL=[
   {n:'01',x:'The Quiet Guest',h:'the-quiet-guest.html',o:{pulpit:'We stream the pulpit and choir only; faces in the pews stay off camera.',members:'We stream to signed-in members only.',audio:'We stream audio only.',none:'We do not stream our services.',open:'We stream openly and keep the archive, and we tell visitors so at the door.'}},
   {n:'02',x:'Guardian Angel Inc.',h:'guardian-angel-inc.html',o:{told:'We know only what members choose to tell us, and we never infer the rest.',invite:'A member may invite a pastor to see more, one conversation at a time, and nothing is kept after.',nolog:'Our prayer and counsel tools keep no logs.'}},
   {n:'03',x:'Check-In',h:'check-in.html',o:{purge:'Children\'s check-in records are deleted three years after a child leaves our ministry.',minimal:'We keep only a child\'s name, guardians and allergies, and nothing but a first name and a code prints on a sticker.'}},
   {n:'04',x:'The Companion Confessor',h:'the-companion-confessor.html',o:{handback:'Any tool we offer young people hands them back to a person, and never speaks as God.',none:'We offer no AI companion to minors.'}},
   {n:'05',x:'Inferred Faith',h:'inferred-faith.html',o:{noads:'Our website and app share no data with ad networks.',noloc:'We never buy or use location data to find worshippers or voters.'}},
   {n:'06',x:'The Second Death',h:'the-second-death.html',o:{consent:'No AI voice of a member is made without their written consent, and every memorial has an end date.',real:'Our digital churchyard keeps real words only, never a bot.'}},
   {n:'07',x:'The Pulpit Feed',h:'the-pulpit-feed.html',o:{d:'When AI drafts what is preached here, we say so from the pulpit. We never play a cloned voice of someone who has died.'}},
   {n:'08',x:'Babel or Pentecost',h:'babel-or-pentecost.html',o:{d:'Members receive scripture and care in their own language; any machine translation is reviewed by a fluent speaker before it is used. Any AI our congregation offers is a library that searches our texts, cites them and says it is a machine. It goes no further.'}},
   {n:'09',x:'A Palace in Time',h:'a-palace-in-time.html',o:{day:'One day a week, our apps and channels send nothing.',night:'Our channels are quiet from 10 p.m. to 6 a.m., every night.',teach:'We teach a weekly rest from screens, and our staff keep it first.'}}];
  function initial(c){
    var sv=FAITH.clause(c.n); if(sv&&sv.text){var ex=(c.n==='07'||c.n==='08');return {k:ex?'saved':sv.k,text:sv.text,from:ex?'your choice in Exhibit '+c.n:''};}
    if(c.n==='01'){var s=FAITH.get('stream',null);if(s){var k=s.aud==='none'?'none':s.aud==='audio'?'audio':s.aud==='login'?'members':s.frame==='pulpit'?'pulpit':'open';return {k:k,text:c.o[k],from:'from your stream dial in Exhibit 01'};}}
    if(c.n==='06'){var l=FAITH.get('idolatryLine',null);if(l!==null&&l!==undefined){var k6=l<=1?'real':'consent';return {k:k6,text:c.o[k6],from:'from your idolatry line in Exhibit 06'};}}
    var k0=Object.keys(c.o)[0]; return {k:k0,text:c.o[k0],from:''};}
  var S={};
  function render(){
    box.innerHTML=CL.map(function(c){var s=S[c.n];var opts=Object.keys(c.o);
      return '<div class="cl"><div class="clh"><a href="'+c.h+'"><b>'+c.n+'</b> '+c.x+'</a>'+(s.from?'<span class="from">'+s.from+'</span>':'')+'</div>'+
        (opts.length>1?'<div class="pills">'+opts.map(function(k){return '<button class="pill" data-n="'+c.n+'" data-k="'+k+'" aria-pressed="'+(s.k===k)+'">'+c.o[k]+'</button>';}).join('')+'</div>':'<p class="fixed">'+s.text+'</p><p class="note small">Set this clause in <a href="'+c.h+'">Exhibit '+c.n+'</a>.</p>')+'</div>';}).join('');
    $$('.pill[data-n]',box).forEach(function(b){b.addEventListener('click',function(){var c=CL.filter(function(x){return x.n===b.dataset.n;})[0];S[c.n]={k:b.dataset.k,text:c.o[b.dataset.k],from:''};FAITH.clause(c.n,{k:b.dataset.k,text:c.o[b.dataset.k]});render();});});
    $('#charterText').innerHTML=CL.map(function(c){return '<li>'+S[c.n].text+'</li>';}).join('');
  }
  function load(){CL.forEach(function(c){S[c.n]=initial(c);});render();rose();}
  function rose(){
    var v=FAITH.visited(), svg=$('#rose'), C=150, g='', COL=['#5b7cc7','#b48a2c','#2d7d6f','#7a5bb0','#a8384f','#5b3f8c','#b4442a','#2b4c9b','#c98a1b'];
    for(var i=0;i<9;i++){var a=i/9*Math.PI*2-Math.PI/2, a2=(i+1)/9*Math.PI*2-Math.PI/2, r0=46, r1=138, lit=v.indexOf(('0'+(i+1)).slice(-2))>-1;
      var p=[[C+Math.cos(a)*r0,C+Math.sin(a)*r0],[C+Math.cos(a)*r1,C+Math.sin(a)*r1],[C+Math.cos(a2)*r1,C+Math.sin(a2)*r1],[C+Math.cos(a2)*r0,C+Math.sin(a2)*r0]];
      var am=(a+a2)/2, lp=[C+Math.cos(am)*96,C+Math.sin(am)*96];
      g+='<path d="M'+p[0].join(' ')+' L'+p[1].join(' ')+' A'+r1+' '+r1+' 0 0 1 '+p[2].join(' ')+' L'+p[3].join(' ')+' A'+r0+' '+r0+' 0 0 0 '+p[0].join(' ')+'Z" fill="'+(lit?COL[i]:'#efeae1')+'" fill-opacity="'+(lit?.78:1)+'" stroke="#2a2430" stroke-width="2"/>';
      g+='<text x="'+lp[0].toFixed(1)+'" y="'+(lp[1]+5).toFixed(1)+'" text-anchor="middle" font-size="15" font-family="IBM Plex Mono,monospace" fill="'+(lit?'#fff':'#8c8492')+'">0'+(i+1)+'</text>';}
    g+='<circle cx="'+C+'" cy="'+C+'" r="44" fill="#fbf6e9" stroke="#2a2430" stroke-width="2"/><text x="'+C+'" y="'+(C+7)+'" text-anchor="middle" font-size="20" font-family="Newsreader,serif" fill="#1b1820">'+v.length+' / 9</text>';
    svg.innerHTML=g;
    $('#roseNote').textContent=v.length>=9?'Every pane is lit: you walked the whole Faith Layer.':'Lit panes are the exhibits you have opened in this browser. Unlit panes are still open to you.';
  }
  $('#copyC').addEventListener('click',function(){var txt='Our congregation\'s data charter (draft)\n\n'+CL.map(function(c,i){return (i+1)+'. '+S[c.n].text;}).join('\n')+'\n\nDrafted with The Faith Layer, Infera · series.melophon.com';
    var done=function(){$('#copyMsg').textContent='Copied. Paste it into your next council or board meeting.';};
    try{navigator.clipboard.writeText(txt).then(done,function(){$('#copyMsg').textContent=txt;});}catch(e){$('#copyMsg').textContent=txt;}});
  $('#printC').addEventListener('click',function(){document.body.classList.add('print-charter');window.print();setTimeout(function(){document.body.classList.remove('print-charter');},500);});
  $('#forgetC').addEventListener('click',function(){FAITH.forget();load();$('#copyMsg').textContent='Forgotten. Nothing about your choices remains in this browser.';});
  load();
})();
})();

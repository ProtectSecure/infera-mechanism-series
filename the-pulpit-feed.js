(function(){
'use strict';
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function $(s,r){return (r||document).querySelector(s);} function $$(s,r){return [].slice.call((r||document).querySelectorAll(s));}
function chip(l,sub){var c={FACT:'fact',REPORTED:'rep',INFERENCE:'inf',WATCH:'watch'}[l];return '<span class="chip '+c+'">'+l+'</span>'+(sub?'<span class="sub">'+sub+'</span>':'');}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1});
$$('.rv').forEach(function(n){io.observe(n);});

/* hero: a lectern under a lancet window; posts rise and are sorted, some amplified, most fading */
(function(){
  var cv=$('#heroArt'); if(!cv) return; var ctx=cv.getContext('2d'), W, H, dpr=Math.min(2,window.devicePixelRatio||1), P=[], t0=performance.now();
  var COL=['#a8384f','#2f5597','#8a5a0c','#2d7d6f','#5b3f8c','#c2562a'];
  function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
  size(); window.addEventListener('resize',size);
  for(var i=0;i<26;i++)P.push({x:Math.random(),y:Math.random(),v:.0006+Math.random()*.0012,c:COL[i%COL.length],amp:Math.random()<.18});
  function frame(now){
    var t=(now-t0)/1000; ctx.clearRect(0,0,W,H);
    var cx=W*.55, base=H*.86, aw=Math.min(W*.5,260), ah=H*.62;
    // lancet window
    ctx.save(); ctx.beginPath(); ctx.moveTo(cx-aw/2,base-60); ctx.lineTo(cx-aw/2,base-ah+aw/2); ctx.quadraticCurveTo(cx-aw/2,base-ah-aw*.15,cx,base-ah-aw*.25); ctx.quadraticCurveTo(cx+aw/2,base-ah-aw*.15,cx+aw/2,base-ah+aw/2); ctx.lineTo(cx+aw/2,base-60); ctx.closePath(); ctx.clip();
    var g=ctx.createLinearGradient(0,base-ah,0,base); g.addColorStop(0,'rgba(194,86,42,.10)'); g.addColorStop(1,'rgba(47,85,151,.07)'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    for(var r=0;r<9;r++)for(var c=0;c<6;c++){var x=cx-aw/2+c*aw/6, y=base-ah-aw*.2+r*(ah/8); ctx.fillStyle=COL[(r+c)%6]; ctx.globalAlpha=.07+.05*Math.sin(t*.6+r+c); ctx.fillRect(x+2,y+2,aw/6-4,ah/8-4);} ctx.globalAlpha=1; ctx.restore();
    ctx.strokeStyle='rgba(27,24,32,.35)'; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(cx-aw/2,base-60); ctx.lineTo(cx-aw/2,base-ah+aw/2); ctx.quadraticCurveTo(cx-aw/2,base-ah-aw*.15,cx,base-ah-aw*.25); ctx.quadraticCurveTo(cx+aw/2,base-ah-aw*.15,cx+aw/2,base-ah+aw/2); ctx.lineTo(cx+aw/2,base-60); ctx.stroke();
    // lectern
    ctx.fillStyle='#2a2430'; ctx.beginPath(); ctx.moveTo(cx-46,base-58); ctx.lineTo(cx+46,base-58); ctx.lineTo(cx+30,base); ctx.lineTo(cx-30,base); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#c2562a'; ctx.fillRect(cx-46,base-64,92,6);
    // rising posts: amplified ones grow and stay bright; the rest thin out
    P.forEach(function(p){ if(!RM){p.y-=p.v;} if(p.y<-.05){p.y=1.02;p.x=Math.random();}
      var yy=p.y*H, xx=W*.08+p.x*W*.86, life=1-p.y, s=p.amp?10+life*26:9-life*4, a=p.amp?.85:Math.max(.08,.6-life*.7);
      ctx.globalAlpha=a; ctx.fillStyle='#fffdf9'; ctx.strokeStyle=p.c; ctx.lineWidth=p.amp?1.6:1; ctx.beginPath(); ctx.roundRect?ctx.roundRect(xx-s,yy-s*.62,s*2,s*1.24,3):ctx.rect(xx-s,yy-s*.62,s*2,s*1.24); ctx.fill(); ctx.stroke();
      ctx.fillStyle=p.c; ctx.fillRect(xx-s+3,yy-s*.62+3,s*.5,s*.5); ctx.globalAlpha=1; });
    if(!RM) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* ROOM A · ranking */
(function(){
  var POSTS=[
    {n:'A Friday khutbah clip',w:'Neighborhood mosque · 4 min',eng:.35,fol:.8,orig:.95,c:'#2d7d6f'},
    {n:'A Latin Mass homily',w:'Parish livestream excerpt · 9 min',eng:.25,fol:.85,orig:.95,c:'#5b3f8c'},
    {n:'A worship reel',w:'Pentecostal church · 45 sec',eng:.6,fol:.6,orig:.9,c:'#c2562a'},
    {n:'A Shabbat explainer',w:'Synagogue educator · 2 min',eng:.3,fol:.7,orig:.95,c:'#2f5597'},
    {n:'An AI "Bible movie trailer"',w:'Engagement farm · 60 sec',eng:.8,fol:.15,orig:.2,c:'#8a5a0c'},
    {n:'"Amen if you love Jesus"',w:'Image page run from abroad',eng:.9,fol:.05,orig:.05,c:'#a8384f'}];
  var feed=$('#feed'), wE=$('#wE'), wD=$('#wD'), wI=$('#wI'), plain=$('#rankPlain'); if(!feed) return;
  var PRE={eng:[80,85,5],fol:[30,15,30],int:[60,60,90]};
  feed.innerHTML=POSTS.map(function(p,i){return '<li class="post" data-i="'+i+'"><span class="sw" style="background:'+p.c+'"></span><div><b>'+p.n+'</b><small>'+p.w+'</small></div><span class="band"></span></li>';}).join('');
  var lis=$$('.post',feed);
  function run(){
    var e=wE.value/100, d=wD.value/100, ig=wI.value/100;
    $('#oE').textContent=bandW(e); $('#oD').textContent=bandW(d); $('#oI').textContent=bandW(ig);
    var sc=POSTS.map(function(p,i){return {i:i,s:e*p.eng + d*p.eng*(1-p.fol)*1.1 + (1-d)*p.fol*.7 - ig*(1-p.orig)*1.4};});
    sc.sort(function(a,b){return b.s-a.s;});
    sc.forEach(function(o,r){var li=lis[o.i], p=POSTS[o.i]; li.style.transform='translateY('+(r*62)+'px)'; li.dataset.rank=r;
      var b=r<2?'Travels far':r<4?'Some reach':'Stays local'; li.querySelector('.band').textContent=b; li.querySelector('.band').className='band b'+(r<2?3:r<4?2:1);
      });
    feed.style.height=(POSTS.length*62)+'px';
    var top=POSTS[sc[0].i], bait=sc[0].i>=4;
    plain.innerHTML='<b>What this shows</b>'+(bait?
      'With these weights the top post is <i>'+top.n+'</i>, and most of the people who see it never chose the page. That is the pattern a 2019 internal Facebook report found: the largest "Christian" page reached 75 million US users a month, and 95% had never followed any of the network\'s pages. '+chip('FACT','internal document, as reported'):
      'With these weights the top post is <i>'+top.n+'</i>, from a page its audience chose. The congregations rise when reach is earned from followers or when inauthentic pages are penalized. '+chip('INFERENCE','editorial model'));
  }
  function bandW(v){return v<.2?'low':v<.45?'moderate':v<.7?'high':'very high';}
  [wE,wD,wI].forEach(function(s){s.addEventListener('input',function(){$$('#presets .pill').forEach(function(b){b.setAttribute('aria-pressed','false');});run();});});
  $$('#presets .pill').forEach(function(b){b.addEventListener('click',function(){var v=PRE[b.dataset.p];wE.value=v[0];wD.value=v[1];wI.value=v[2];$$('#presets .pill').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});run();});});
  run();
})();

/* ROOM B · missing denominator */
(function(){
  var C=[
   {t:'"Shaheed"',y:'2024',f:'Muslim · Arabic',d:'down',g:'Oversight Board decision',l:'FACT',x:'Meta told its Oversight Board that this Arabic word, usually translated "martyr" and used in many non-violent religious and civic ways, drove more removals than any other single word. The Board called the blanket rule disproportionate in March 2024; Meta narrowed it in July.'},
   {t:'"Alhamdulillah"',y:'2023',f:'Muslim · Arabic',d:'down',g:'Oversight Board decision',l:'FACT',x:'A Pakistani user\'s wedding photo captioned "praise be to God" was removed under the dangerous-organizations policy, then restored. Meta declined to publish error rates for that policy by region and language.'},
   {t:'An atheist\'s question',y:'2023',f:'Atheist · Bengali',d:'down',g:'Oversight Board decision',l:'FACT',x:'A post asking why Islamic scholars avoid debating atheists was removed under a different policy, then restored on appeal.',x2:'Our reading: low-context enforcement outside English sits behind wrongful removals of both Muslim speech and criticism of Islam.'},
   {t:'Arabic over, Hebrew under',y:'2021',f:'Muslim and Jewish · Arabic, Hebrew',d:'both',g:'Audit commissioned by Meta',l:'FACT',x:'An independent audit found Meta over-enforced on Arabic content and under-enforced on Hebrew during May 2021, partly because it had an Arabic hostile-speech classifier and no Hebrew one. It found unintentional bias, not intentional bias.'},
   {t:'A satire site locked',y:'2022',f:'Christian · English',d:'down',g:'News reports',l:'REPORTED',x:'Twitter locked the Babylon Bee under its hateful-conduct policy for a satirical post about a transgender official. The account was restored in November 2022 after the company changed owners.'},
   {t:'Sisters\' channel removed',y:'2023',f:'Catholic · English',d:'down',g:'News report',l:'REPORTED',x:'YouTube removed the English channel of the Home of the Mother religious sisters for "spam, deceptive practices, and scams" and refused to restore it on appeal, according to the sisters.'},
   {t:'Reports ignored',y:'2024',f:'Jewish · English',d:'up',g:'Advocacy group test',l:'REPORTED',x:'ADL reported antisemitic posts through normal user tools and found most platforms acted only after ADL escalated through trusted channels, and even then on only some posts. Grades ranged from C to F.'},
   {t:'"Smash the mosques" left up',y:'2025',f:'Muslim · English',d:'up',g:'Oversight Board decision',l:'FACT',x:'The Board found Meta wrongly left up posts during the 2024 UK riots, including one calling for mosques to be smashed, and said Meta changed its hateful-conduct rules "hastily."'},
   {t:'1 to 2 in 10',y:'2024',f:'All content',d:'both',g:'Company statement',l:'FACT',x:'Meta estimated that one to two of every ten of its removals may be mistakes. It did not break that rate down by religion or language.'}];
  var box=$('#tiles'), out=$('#caseOut'); if(!box) return;
  box.innerHTML=C.map(function(c,i){return '<button class="tile d-'+c.d+'" data-i="'+i+'"><small>'+c.y+' · '+(c.d==='down'?'removed in error':c.d==='up'?'left up in error':'both directions')+'</small><b>'+c.t+'</b><span>'+c.f+'</span><em>'+c.g+'</em></button>';}).join('')+
    '<div class="tile rate"><small>The denominator</small><b>Error rate by religion or language</b><span>Every platform, every faith</span><em>Not published</em></div>';
  function show(i){var c=C[i];out.innerHTML='<h3>'+c.t+' <span class="yr">'+c.y+'</span></h3><p>'+c.x+' '+chip(c.l,c.g.toLowerCase())+(c.x2?' '+c.x2+' '+chip('INFERENCE'):'')+'</p>';$$('.tile',box).forEach(function(t){t.classList.toggle('on',t.dataset.i==String(i));});}
  $$('.tile[data-i]',box).forEach(function(t){t.addEventListener('click',function(){show(+t.dataset.i);});});
  $$('#dirF .pill').forEach(function(b){b.addEventListener('click',function(){var f=b.dataset.f;$$('#dirF .pill').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});
    $$('.tile[data-i]',box).forEach(function(t){var d=C[+t.dataset.i].d;t.hidden=!(f==='all'||d===f||d==='both');});});});
  show(0);
})();

/* ROOM C · costume */
(function(){
  var K=[
   {n:'St. Anne\'s Parish',s:['Page since 2011','Admins in the same town','Mass stream, bulletin, a funeral notice','Asks you to come to the parish fish fry'],real:true,r:'Genuine. A fictional example of what most religious pages are: the congregation itself, posting for people who know it.'},
   {n:'Army of Jesus',s:['Grew fast to millions of likes','Admins not disclosed','Bright Jesus memes, "Like if you believe"','Later, political posts'],real:false,r:'A Russian Internet Research Agency page, its sixth-largest on Facebook, with about 2.3 million likes, per a 2018 report for the Senate Intelligence Committee.',l:'REPORTED'},
   {n:'A Sikh community voice',s:['New accounts, cross-posted','Admins not disclosed','Posters for a protest movement called "Operation K"','Likely AI-made images'],real:false,r:'Part of a China-based network of fake accounts posing as Sikhs, removed by Meta in May 2024.',l:'REPORTED'},
   {n:'Orthodox mothers\' channel',s:['Dozens of linked channels','Telegram, TikTok, Instagram','Warns that Europe threatens the faith','Urges priests to guide votes'],real:false,r:'A Russia-linked operation of 67 channels aimed at Orthodox voters before Moldova\'s September 2025 election, documented by DFRLab.',l:'FACT'},
   {n:'Daily Blessings',s:['Page history includes a church name','Admins abroad','AI images of Jesus made of bread or shrimp','Links to ad-heavy sites, "Amen?"'],real:false,r:'An engagement-farm type documented in 2024: pages posting AI images such as "Shrimp Jesus" drew huge engagement, some spam pages linked out to ad-filled sites, and NBC News reported one such page had been taken over from a Georgia church.',l:'REPORTED'},
   {n:'Masjid al-Noor',s:['Page since 2014','Run by the mosque board','Ramadan schedule, khutbah clips','Asks for iftar volunteers'],real:true,r:'Genuine. A fictional example; a costume copies exactly this look, which is why history and admins matter more than imagery.'}];
  var box=$('#costumes'), sc=$('#costScore'); if(!box) return; var done=0;
  box.innerHTML=K.map(function(k,i){return '<div class="cos" data-i="'+i+'"><h3>'+k.n+'</h3><ul>'+k.s.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul><div class="ask"><button class="pill" data-a="1">What it says it is</button><button class="pill" data-a="0">A costume</button></div><div class="rev" hidden></div></div>';}).join('');
  $$('.cos',box).forEach(function(c){var k=K[+c.dataset.i];$$('.ask .pill',c).forEach(function(b){b.addEventListener('click',function(){
    var guess=b.dataset.a==='1', right=guess===k.real, rev=c.querySelector('.rev');
    if(rev.hidden){done++;sc.textContent=done+' of 6 decided';}
    $$('.ask .pill',c).forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});
    rev.hidden=false; c.classList.toggle('real',k.real); c.classList.toggle('op',!k.real);
    rev.innerHTML='<b>'+(right?'Right. ':'Not quite. ')+(k.real?'Genuine':'A costume')+'</b> '+k.r+(k.l?' '+chip(k.l,k.sub):' '+chip('INFERENCE','fictional example'));});});});
})();

/* ROOM D · authorship and clause */
(function(){
  var S=[
   {k:'The pastor wrote every word',c:'What most congregations assume. A theologian at Abilene Christian University argues AI has no place in the pulpit because "the drudgery is part of the point" of preaching.',l:'REPORTED'},
   {k:'AI helped with research',c:'A Reform rabbi in St. Louis teaches other rabbis to use AI to debate texts, and argues the deeper purpose of study is understanding one\'s partner and oneself.',l:'REPORTED'},
   {k:'AI edited or polished it',c:'A Lutheran pastor in North Carolina generated a full sermon, chose not to preach it, and now uses AI to start drafts and polish conclusions. "Why not, why can\'t, and why wouldn\'t the Holy Spirit work through AI?" she asked.',l:'REPORTED'},
   {k:'AI drafted it; the pastor revised it',c:'About a quarter of US Protestant pastors say they use AI to write or edit sermons, in one industry-funded survey. The Southern Baptist Convention urges "the utmost care and discernment."',l:'REPORTED'},
   {k:'A clone of the pastor answers for him',c:'A Vallejo, California pastor built an AI twin from his sermons and books to answer members around the clock; on serious matters it says, "That\'s too much for me. Call the pastor." An earlier Catholic bot, "Father Justin," claimed to be a priest and offered absolution; its makers renamed it "Justin," saying "he never was a real priest."',l:'REPORTED'},
   {k:'A cloned voice of someone who has died',c:'After Charlie Kirk was killed in September 2025, an AI clone of his voice was played to several evangelical megachurch congregations the following Sunday. An Episcopal bishop said talking to the dead through AI avoids "the reality of death."',l:'REPORTED'}];
  var r=$('#auth'), out=$('#authOut'), ticks=$('#ticks'); if(!r) return;
  ticks.innerHTML=S.map(function(s,i){return '<span data-i="'+i+'">'+(i+1)+'</span>';}).join('');
  function draw(){var i=+r.value;out.innerHTML='<h3>'+(i+1)+' · '+S[i].k+'</h3><p>'+S[i].c+' '+chip(S[i].l)+'</p>';$$('span',ticks).forEach(function(t){t.classList.toggle('on',+t.dataset.i<=i);});}
  r.addEventListener('input',draw); draw();
  var D={d:'3',dead:'never'}; try{var sv=window.InferaFaith&&InferaFaith.clause('07');if(sv&&sv.d){D=sv;}}catch(e){}
  function sel(g,attr,val){$$(g+' .pill').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset[attr]===val));});}
  function clause(save){
    var a={'0':'We treat AI as a tool like any other and do not announce it from the pulpit.','1':'When AI does more than research for what is preached here, we say so from the pulpit.','2':'When AI does more than edit what is preached here, we say so from the pulpit.','3':'When AI drafts what is preached here, we say so from the pulpit.'}[D.d];
    var b={never:'We never play a cloned voice of someone who has died.',family:'We play a cloned voice of someone who has died only with the family\'s written consent, and we label it.',open:'Our pastors decide case by case whether to play a cloned voice of someone who has died.'}[D.dead];
    D.text=a+' '+b; $('#clauseTxt').textContent=D.text;
    if(save){try{window.InferaFaith&&InferaFaith.clause('07',D);}catch(e){}}
  }
  sel('#discl','d',D.d); sel('#dead','v',D.dead);
  $$('#discl .pill').forEach(function(b){b.addEventListener('click',function(){D.d=b.dataset.d;sel('#discl','d',D.d);clause(true);});});
  $$('#dead .pill').forEach(function(b){b.addEventListener('click',function(){D.dead=b.dataset.v;sel('#dead','v',D.dead);clause(true);});});
  clause(false);
})();
})();

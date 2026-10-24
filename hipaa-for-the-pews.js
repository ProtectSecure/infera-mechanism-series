(function(){
'use strict';
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function $(s,r){return (r||document).querySelector(s);} function $$(s,r){return [].slice.call((r||document).querySelectorAll(s));}
function chip(l,sub){var c={FACT:'fact',REPORTED:'rep',INFERENCE:'inf',WATCH:'watch'}[l];return '<span class="chip '+c+'">'+l+'</span>'+(sub?'<span class="sub">'+sub+'</span>':'');}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1});
$$('.rv').forEach(function(n){io.observe(n);});
var FAITH=window.InferaFaith||{get:function(k,d){return d;},set:function(){},clause:function(){return null;},visited:function(){return [];},forget:function(){}};

/* hero: a register page. Lines of names; some stay, some are covered, one by one. */
(function(){
  var cv=$('#heroArt'); if(!cv) return; var ctx=cv.getContext('2d'),W,H,dpr=Math.min(2,window.devicePixelRatio||1),rows=[];
  function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
  size(); window.addEventListener('resize',size);
  for(var i=0;i<26;i++)rows.push({w:.35+Math.random()*.5,c:Math.random()*40,s:Math.random()<.18});
  function frame(now){var t=now/1000;ctx.clearRect(0,0,W,H);
    var x0=W*(W<860?.08:.56),x1=W*.94,y0=H*.12,lh=(H*.78)/rows.length;
    ctx.fillStyle='rgba(255,252,244,.75)';ctx.fillRect(x0-18,y0-24,x1-x0+36,lh*rows.length+40);
    ctx.strokeStyle='rgba(43,76,155,.18)';ctx.lineWidth=1;
    rows.forEach(function(r,i){var y=y0+i*lh;ctx.beginPath();ctx.moveTo(x0,y+lh*.8);ctx.lineTo(x1,y+lh*.8);ctx.stroke();
      ctx.fillStyle='rgba(27,24,32,.28)';ctx.fillRect(x0+8,y+lh*.35,(x1-x0)*.08,lh*.3);
      ctx.fillStyle='rgba(27,24,32,.45)';ctx.fillRect(x0+(x1-x0)*.14,y+lh*.3,(x1-x0)*r.w*.8,lh*.36);
      var on=RM?r.s:((t*0.25+r.c)%14)<2.2;
      if(on||r.s){ctx.fillStyle=r.s?'rgba(27,24,32,.88)':'rgba(201,138,27,.55)';ctx.fillRect(x0+(x1-x0)*.13,y+lh*.18,(x1-x0)*r.w*.82,lh*.6);}
    });
    ctx.strokeStyle='rgba(168,56,79,.5)';ctx.beginPath();ctx.moveTo(x0+(x1-x0)*.11,y0-10);ctx.lineTo(x0+(x1-x0)*.11,y0+lh*rows.length);ctx.stroke();
    if(!RM)requestAnimationFrame(frame);}
  requestAnimationFrame(frame);
})();

/* ROOM A · the three-box test */
(function(){
  var tray=$('#tray'); if(!tray) return;
  var R=[
   {n:'Prayer list naming a hospitalized member',b:'N',w:'A congregation that does not bill insurers electronically is not a covered entity, so a prayer list is outside HIPAA. A church-law publication warns that publishing a medical condition without consent could still support a privacy lawsuit.',l:['FACT','REPORTED']},
   {n:'Pastoral counseling notes',b:'N',w:'Outside HIPAA unless the counseling is a provider billing electronically. A licensed counselor still answers to state confidentiality rules, which vary.',l:['FACT','WATCH']},
   {n:'Online giving and card data',b:'N',w:'No privacy rule specific to churches; breach-notice laws apply after a breach. California\'s breach law expressly covers organizations "whether or not organized to operate at a profit."',l:['FACT']},
   {n:'Children\'s check-in: names, allergies, custody notes',b:'N',w:'The federal children\'s privacy law, COPPA, generally does not apply to nonprofits, the FTC says. Exhibit 03 showed how long these records can live.',l:['FACT']},
   {n:'Fingerprint or face-scan check-in in Illinois',b:'O',w:'Illinois\' biometric privacy law covers any "private entity," with no exclusion for nonprofits or religious groups. We found no case against a church.',l:['FACT','WATCH']},
   {n:'Member list of a 150,000-person ministry in Oregon',b:'O',w:'Oregon\'s privacy law applies to nonprofits above its thresholds and lists religious beliefs as sensitive data. A typical congregation is far below any threshold.',l:['FACT']},
   {n:'Livestream archive of Sunday services',b:'N',w:'No privacy law covers a congregation\'s own video archive. Exhibit 01 measured what it exposes.',l:['INFERENCE']},
   {n:'Logs from a church AI or prayer chatbot',b:'N',w:'Outside HIPAA, and privilege as described covers words spoken to a minister, not server logs (Exhibit 02).',l:['INFERENCE']},
   {n:'A church-sponsored staff health plan',b:'H',w:'A group health plan with 50 or more participants, or run by someone other than the employer, is a HIPAA health plan. How church plans fit turns on their setup; we found no federal guidance naming them.',l:['FACT','WATCH']},
   {n:'A church-run clinic that bills insurers electronically',b:'H',w:'A covered provider like any other. HIPAA has no religious exemption.',l:['FACT']}];
  tray.innerHTML=R.map(function(r,i){return '<button type="button" class="rec" data-i="'+i+'">'+r.n+'</button>';}).join('');
  function show(i){var r=R[i];$('#boxOut').innerHTML='<h3>'+r.n+'</h3><p>'+r.w+' '+r.l.map(function(x){return chip(x);}).join(' ')+'</p>';$$('.rec').forEach(function(b){b.classList.toggle('on',+b.dataset.i===i);});}
  $$('.rec').forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.i);});});
  var ran=false;
  function run(){ if(ran) return; ran=true; $('#runBoxes').textContent='Sorted';
    $$('.rec').forEach(function(b,k){ setTimeout(function(){ $('#bin'+R[+b.dataset.i].b+' .slot').appendChild(b); b.classList.add('landed'); if(k===R.length-1) count(); }, RM?0:180*k); }); }
  function count(){ var h=R.filter(function(r){return r.b==='H';}).length; $('#binH h3').textContent='HIPAA · '+h; $('#binO h3').textContent='Some other law · '+R.filter(function(r){return r.b==='O';}).length; $('#binN h3').textContent='No privacy rule · '+R.filter(function(r){return r.b==='N';}).length; }
  $('#runBoxes').addEventListener('click',run);
})();

/* ROOM B · privilege timeline */
(function(){
  var T=[
   {y:'1997',h:'Allentown',t:'Pennsylvania\'s Supreme Court held that clergy privilege covers confidential communication to a confessor or spiritual adviser, not "information regarding the manner in which a religious institution conducts its affairs." Diocesan archive records were discoverable after private review by the judge. Two justices dissented.',l:'FACT'},
   {y:'2004',h:'Investigation files',t:'An Illinois appeals court ordered a diocese to produce its internal investigation records, as summarized by a church-law publication.',l:'REPORTED'},
   {y:'2018',h:'Half a million pages',t:'A Pennsylvania grand jury report covering six dioceses was built on about half a million pages of subpoenaed church documents, including a "secret archive" only the bishop could open.',l:'REPORTED'},
   {y:'Oct 2018',h:'Federal subpoenas',t:'A US attorney served grand jury subpoenas on at least five Pennsylvania dioceses for secret archives, confidential files and treatment records.',l:'REPORTED'},
   {y:'2022',h:'No subpoena needed',t:'In FBI v. Fazaga the Supreme Court ruled for the government on a narrow question and sent back a suit over an informant who gathered names, numbers and beliefs of hundreds of Muslim Americans in California mosques. Collection can happen without any request to the congregation.',l:'REPORTED'},
   {y:'2025',h:'The confession itself',t:'Washington added clergy as mandatory reporters of child abuse with no exception for confession. A federal judge blocked that provision, and the state agreed not to enforce it.',l:'REPORTED'},
   {y:'Dec 2025',h:'Brooklyn',t:'A New York appeals court ordered a diocese to produce parts of two priests\' personnel files: it had not shown the material was a confidential communication for spiritual guidance, and the First Amendment did not bar disclosure.',l:'FACT'}];
  var box=$('#tl'), out=$('#tlOut'); if(!box) return;
  box.innerHTML=T.map(function(x,i){return '<button class="yr" type="button" data-i="'+i+'" aria-pressed="'+(i===0)+'"><b>'+x.y+'</b><span>'+x.h+'</span></button>';}).join('');
  function show(i){out.innerHTML='<h3>'+T[i].y+' · '+T[i].h+'</h3><p>'+T[i].t+' '+chip(T[i].l)+'</p>';$$('.yr',box).forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.i===i));});}
  $$('.yr',box).forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.i);});}); show(0);
})();

/* ROOM C · who else holds the file */
(function(){
  var C=[
   {y:'2020',f:'breach',h:'Blackbaud',t:'Ransomware at a donor-software company used by many nonprofits, including church charities; more than 13,000 customers. The FTC\'s 2024 order cited failures on data retention.',n:null,l:'REPORTED'},
   {y:'2020',f:'breach',h:'Pray.com',t:'Misconfigured storage exposed about 1.8 million files, including contacts uploaded from users\' phones and church attendee lists.',n:10000000,nl:'up to 10 million people, per the researchers',l:'REPORTED'},
   {y:'2020',f:'broker',h:'Muslim Pro',t:'A prayer-times app with more than 98 million downloads, by the company\'s count, sent location data to a broker whose buyers included US military contractors. The company ended its data partnerships.',n:null,l:'REPORTED'},
   {y:'2021',f:'broker',h:'A priest identified from app data',t:'A Catholic publication used commercially available app signal data to show a senior church official\'s use of a dating app; he resigned.',n:1,nl:'one person, and a precedent',l:'REPORTED'},
   {y:'2022',f:'breach',h:'The Church of Jesus Christ of Latter-day Saints',t:'An intrusion that federal law enforcement linked to a state-sponsored campaign exposed member names, record numbers, birth dates and contact details. No count was given.',n:null,l:'REPORTED'},
   {y:'2023',f:'broker',h:'Buying data to find priests',t:'A Catholic lay group was reported to have bought app tracking data to identify priests using gay dating apps, and to have shared it with bishops.',n:null,l:'REPORTED'},
   {y:'2023',f:'court',h:'Diocese of Norwich bankruptcy',t:'The diocese\'s claims agent published names and addresses of abuse claimants; the diocese dropped it, and the agent later settled.',n:null,l:'REPORTED'},
   {y:'2024',f:'breach',h:'Diocese of Phoenix',t:'A network intrusion reached names, addresses, birth dates and Social Security numbers of benefit-plan participants, per the diocese\'s own notice filed with a state attorney general.',n:null,l:'FACT'},
   {y:'2025',f:'court',h:'Baltimore archdiocese bankruptcy',t:'Hacks at the creditors\' committee\'s financial adviser and its law firm, disclosed months apart, put abuse survivors\' data at risk. The adviser paid the attackers.',n:1000,nl:'up to about 1,000 claimants in the case',l:'REPORTED'},
   {y:'2026',f:'breach',h:'The Vatican\'s Click to Pray app',t:'A flaw exposed names, emails and countries. A researcher found it in January; it was still open when Dark Reading reported it in July, and was closed soon after.',n:700000,nl:'700,000+ accounts',l:'REPORTED'},
   {y:'2026',f:'breach',h:'Two Seoul megachurches',t:'Member data, donation histories and internal files were reportedly stolen; a security firm said it found traces of AI agents in the attack.',n:960000,nl:'up to about 960,000 member records at one church',l:'REPORTED'}];
  var ol=$('#cases'); if(!ol) return; var F='all';
  var FN={breach:'Breach',broker:'Bought from a broker',court:'Around a court case'};
  function w(n){return Math.max(2,Math.log10(n)/7*100);}
  function draw(){ ol.innerHTML=C.filter(function(c){return F==='all'||c.f===F;}).map(function(c){
    return '<li class="case '+c.f+'"><div class="cy"><b>'+c.y+'</b><small>'+FN[c.f]+'</small></div><div><h3>'+c.h+'</h3><p>'+c.t+' '+chip(c.l)+'</p>'+(c.n?'<div class="scale"><i style="--w:'+w(c.n).toFixed(1)+'%"></i><span>'+c.nl+'</span></div>':'')+'</div></li>';}).join('');
    $$('#hpick .pill').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.f===F));}); }
  $$('#hpick .pill').forEach(function(b){b.addEventListener('click',function(){F=b.dataset.f;draw();});});
  draw();
})();

/* ROOM D · the baptism and the eraser */
(function(){
  var reg=$('#register'); if(!reg) return;
  var names=['M. A. Verhoeven','J. De Smet','P. Claes','L. Wouters','A. Peeters','R. Maes','H. Jacobs','S. Mertens'];
  reg.innerHTML='<div class="rhead"><b>Liber Baptizatorum</b><span>illustrative page · names invented</span></div>'+names.map(function(n,i){return '<div class="rrow'+(i===3?' him':'')+'"><span class="rd">'+(1950+i)+'</span><span class="rn">'+n+'</span><span class="rm"></span></div>';}).join('');
  var O={
   keep:{t:'The parish keeps the entry unchanged.',s:[['A church view','Many churches treat baptism as permanent and the register as a record of a historical fact, not of present membership.','INFERENCE'],['Belgian regulator, Dec 2023','Ordered the Diocese of Ghent to honor a former member\'s objection and erasure request.','FACT']]},
   margin:{t:'The parish adds a note in the margin that he has left.',s:[['Belgian regulator, Dec 2023','A note in the margin was not enough.','FACT'],['The idea behind it','A margin note records that he left without altering the record of the sacrament.','INFERENCE']]},
   cover:{t:'The parish covers the entry so it can no longer be read.',s:[['EU Advocate General, 1 Oct 2026','Advised that adults baptized as children may seek erasure unless the church shows compelling grounds, and that data must be "rendered illegible"; opaque stickers would be acceptable.','REPORTED'],['EU Court of Justice','No judgment yet. An Advocate General\'s opinion is advice to the court.','WATCH']]},
   delete:{t:'The parish removes the entry entirely.',s:[['A church view','Removing the record of a sacrament the church holds permanent may contradict its own teaching.','INFERENCE'],['The law','No authority we found has required physical removal; the debate is over legibility.','INFERENCE']]}};
  function draw(v){ var r=$('.rrow.him',reg); r.className='rrow him '+v; $('.rm',r).textContent= v==='margin'?'left the Church, 2021':'';
    $$('#bpick .pill').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.v===v));});
    $('#baptOut').innerHTML='<p class="bt">'+O[v].t+'</p>'+O[v].s.map(function(s){return '<div class="bs"><small>'+s[0]+'</small><p>'+s[1]+' '+chip(s[2])+'</p></div>';}).join('')+'<p class="note small">The man at the center of the Belgian case was baptized in the 1950s and asked to be removed decades later. Europe\'s data law lets churches keep their own comprehensive rules if they are brought in line with it and overseen independently; Germany\'s Catholic and Protestant churches run their own data laws. '+chip('FACT')+' '+chip('REPORTED')+'</p>'; }
  $$('#bpick .pill').forEach(function(b){b.addEventListener('click',function(){draw(b.dataset.v);});}); draw('margin');
})();

/* FINALE · charter and a rose window of seven panes */
(function(){
  var box=$('#clauses'); if(!box) return;
  var CL=[
   {n:'01',x:'The Quiet Guest',h:'the-quiet-guest.html',o:{pulpit:'We stream the pulpit and choir only; faces in the pews stay off camera.',members:'We stream to signed-in members only.',audio:'We stream audio only.',none:'We do not stream our services.',open:'We stream openly and keep the archive, and we tell visitors so at the door.'},p:['Church of England parish guidance says consent may be needed to list members in a church directory, and that consent means opting in.','FACT']},
   {n:'02',x:'The Angel at 2 A.M.',h:'the-angel-at-2am.html#clause',o:{request:'Our care and prayer tools keep only a request for a person to call back, never what was said. We look at a member\'s online life only when they invite a pastor in. Any AI we offer speaks about God, says it is AI, and never speaks as God, an angel or a saint.',none:'Our care and prayer tools keep no record; each conversation ends when the screen goes dark. We do not look at a member\'s online life beyond what they choose to tell us.',member:'Our care and prayer tools keep only what a member chooses to save, and that member can read and erase it at any time.'},sv:function(s){return s&&s.keep&&s.watch&&s.text;},p:['One GDPR exemption lets a religious body process members\' data on condition that it is not disclosed outside that body without their consent (Article 9(2)(d)).','FACT']},
   {n:'03',x:'Check-In',h:'check-in.html',o:{purge:'Children\'s check-in records are deleted three years after a child leaves our ministry.',minimal:'We keep only a child\'s name, guardians and allergies, and nothing but a first name and a code prints on a sticker.'},p:['The 2025 amendments to the children\'s privacy rule require commercial children\'s services to keep a written data retention policy.','REPORTED']},
   {n:'04',x:'Inferred Faith',h:'inferred-faith.html',o:{noads:'Our website and app share no data with ad networks.',noloc:'We never buy or use location data to find worshippers or voters.'},p:['Oregon lets a nonprofit keep deidentified statistics on religion but not tie religion to a person without express consent.','FACT']},
   {n:'05',x:'The Second Death',h:'the-second-death.html',o:{consent:'No AI voice of a member is made without their written consent, and every memorial has an end date.',real:'Our digital churchyard keeps real words only, never a bot.'},p:['Many Catholic parishes already keep a Book of the Names of the Dead from All Saints to Advent.','REPORTED']},
   {n:'06',x:'Redeeming the Time',h:'redeeming-the-time.html#ladder2',o:{line1:'Our outreach may go as far as reminders people ask for, and never uses reminders sent by default or anything beyond it. One day a week, our apps and channels send nothing.',line2:'Our outreach may go as far as reminders sent by default, and never uses streaks a person can lose or anything beyond it. Our channels are quiet from 10 p.m. to 6 a.m., every night.',line0:'Our outreach may go as far as public invitation, and never uses reminders people ask for or anything beyond it. We teach a weekly rest from screens, and our staff keep it first.'},sv:function(s){return s&&typeof s.line==='number'&&s.line>=0&&s.text;},p:['New York will bar platforms from sending notifications to minors from midnight to 6 a.m. without a parent\'s consent, from 25 January 2027.','FACT']},
   {n:'07',x:'HIPAA for the Pews',h:'#boxes',o:{less:'We keep the least we can, delete on a written schedule, and hold nothing we would not want read aloud in court.',vendor:'No vendor may hold our members\' records unless our contract says they come back to us, or are destroyed, if the vendor is sold or fails.',notice:'If anyone demands our records, we tell the people named in them, unless a court forbids it.'},p:['The FTC\'s 2024 order against Blackbaud, a donor-software firm used by church charities, addressed its failures to delete data it no longer needed.','REPORTED']}];
  function initial(c){
    var sv=FAITH.clause(c.n);
    if(c.sv){ if(sv&&sv.finale&&c.o[sv.k]) return {k:sv.k,text:c.o[sv.k],from:''}; if(c.sv(sv)) return {k:'saved',text:sv.text,from:'your choice in Exhibit '+c.n}; }
    else if(sv&&sv.text&&c.o[sv.k]) return {k:sv.k,text:c.o[sv.k],from:''};
    if(c.n==='01'){var s=FAITH.get('stream',null);if(s){var k=s.aud==='none'?'none':s.aud==='audio'?'audio':s.aud==='login'?'members':s.frame==='pulpit'?'pulpit':'open';return {k:k,text:c.o[k],from:'from your stream dial in Exhibit 01'};}}
    if(c.n==='05'){var l=FAITH.get('idolatryLine',null);if(l!==null&&l!==undefined){var k5=l<=1?'real':'consent';return {k:k5,text:c.o[k5],from:'from your idolatry line in Exhibit 05'};}}
    var k0=Object.keys(c.o)[0]; return {k:k0,text:c.o[k0],from:''};}
  var S={};
  function render(){
    box.innerHTML=CL.map(function(c){var s=S[c.n];var opts=Object.keys(c.o);
      var pills=(s.k==='saved'?'<button class="pill" data-n="'+c.n+'" data-k="saved" aria-pressed="true">'+s.text+'</button>':'')+opts.map(function(k){return '<button class="pill" data-n="'+c.n+'" data-k="'+k+'" aria-pressed="'+(s.k===k)+'">'+c.o[k]+'</button>';}).join('');
      return '<div class="cl"><div class="clh"><a href="'+c.h+'"><b>'+c.n+'</b> '+c.x+'</a>'+(s.from?'<span class="from">'+s.from+'</span>':'')+'</div><div class="pills">'+pills+'</div><p class="prec"><b>Where this rule already exists</b> '+c.p[0]+' '+chip(c.p[1])+'</p></div>';}).join('');
    $$('.pill[data-n]',box).forEach(function(b){b.addEventListener('click',function(){var c=CL.filter(function(x){return x.n===b.dataset.n;})[0]; if(b.dataset.k==='saved') return;
      S[c.n]={k:b.dataset.k,text:c.o[b.dataset.k],from:''};FAITH.clause(c.n,c.sv?{k:b.dataset.k,text:c.o[b.dataset.k],finale:true}:{k:b.dataset.k,text:c.o[b.dataset.k]});render();});});
    $('#charterText').innerHTML=CL.map(function(c){return '<li>'+S[c.n].text+'</li>';}).join('');
  }
  function load(){CL.forEach(function(c){S[c.n]=initial(c);});render();rose();}
  function rose(){
    var v=FAITH.visited(), svg=$('#rose'), C=150, g='', COL=['#5b7cc7','#b48a2c','#2d7d6f','#7a5bb0','#a8384f','#3a3f7a','#2b4c9b'];
    for(var i=0;i<7;i++){var a=i/7*Math.PI*2-Math.PI/2, a2=(i+1)/7*Math.PI*2-Math.PI/2, r0=46, r1=138, lit=v.indexOf('0'+(i+1))>-1;
      var p=[[C+Math.cos(a)*r0,C+Math.sin(a)*r0],[C+Math.cos(a)*r1,C+Math.sin(a)*r1],[C+Math.cos(a2)*r1,C+Math.sin(a2)*r1],[C+Math.cos(a2)*r0,C+Math.sin(a2)*r0]];
      var am=(a+a2)/2, lp=[C+Math.cos(am)*96,C+Math.sin(am)*96];
      g+='<path d="M'+p[0].join(' ')+' L'+p[1].join(' ')+' A'+r1+' '+r1+' 0 0 1 '+p[2].join(' ')+' L'+p[3].join(' ')+' A'+r0+' '+r0+' 0 0 0 '+p[0].join(' ')+'Z" fill="'+(lit?COL[i]:'#efeae1')+'" fill-opacity="'+(lit?.78:1)+'" stroke="#2a2430" stroke-width="2"/>';
      g+='<text x="'+lp[0].toFixed(1)+'" y="'+(lp[1]+5).toFixed(1)+'" text-anchor="middle" font-size="15" font-family="IBM Plex Mono,monospace" fill="'+(lit?'#fff':'#8c8492')+'">0'+(i+1)+'</text>';}
    g+='<circle cx="'+C+'" cy="'+C+'" r="44" fill="#fbf6e9" stroke="#2a2430" stroke-width="2"/><text x="'+C+'" y="'+(C+7)+'" text-anchor="middle" font-size="20" font-family="Newsreader,serif" fill="#1b1820">'+Math.min(7,v.length)+' / 7</text>';
    svg.innerHTML=g;
    $('#roseNote').textContent=v.length>=7?'Every pane is lit: you walked the whole Faith Layer.':'Lit panes are the exhibits you have opened in this browser. Unlit panes are still open to you.';
  }
  $('#copyC').addEventListener('click',function(){var txt='Our congregation\'s data charter (draft)\n\n'+CL.map(function(c,i){return (i+1)+'. '+S[c.n].text;}).join('\n')+'\n\nDrafted with The Faith Layer, Infera · series.melophon.com. Not legal advice.';
    var done=function(){$('#copyMsg').textContent='Copied. Paste it into your next council or board meeting.';};
    try{navigator.clipboard.writeText(txt).then(done,function(){$('#copyMsg').textContent=txt;});}catch(e){$('#copyMsg').textContent=txt;}});
  $('#printC').addEventListener('click',function(){document.body.classList.add('print-charter');window.print();setTimeout(function(){document.body.classList.remove('print-charter');},500);});
  $('#forgetC').addEventListener('click',function(){FAITH.forget();load();$('#copyMsg').textContent='Forgotten. Nothing about your choices remains in this browser.';});
  load();
})();
})();

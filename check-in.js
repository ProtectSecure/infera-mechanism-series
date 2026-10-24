function xgBand(v){return v<=20?"Low":v<=45?"Moderate":v<=70?"High":"Very high";}

(function(){
'use strict';
var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var NS='http://www.w3.org/2000/svg';
function $(id){return document.getElementById(id);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function el(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
var io='IntersectionObserver' in window? new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12}):null;
document.querySelectorAll('.rv').forEach(function(n){ if(io&&!RM) io.observe(n); else n.classList.add('in'); });
function vid(v){ if(!v||RM) return; var o=new IntersectionObserver(function(es){es.forEach(function(e){ if(e.isIntersecting) v.play().catch(function(){}); else v.pause(); });},{threshold:.15}); o.observe(v);
  v.addEventListener('playing',function(){ var p=v.parentNode.querySelector('.poster'); if(p) p.style.opacity=0; }); }
vid($('heroVid')); vid($('faceVid'));

/* ROOM A: sticker */
var F=[
 {id:'first',n:'First name',s:'',def:2,canPrint:true,sens:0,learn:'her first name'},
 {id:'last',n:'Last name',s:'',def:1,canPrint:true,sens:0,learn:'her family name'},
 {id:'photo',n:'Her photo',s:'Shown at the station',def:1,canPrint:false,sens:1,learn:''},
 {id:'allergy',n:'Allergy',s:'e.g. peanuts',def:2,canPrint:true,sens:2,learn:'a health condition'},
 {id:'med',n:'Medical note',s:'e.g. inhaler, seizures',def:2,canPrint:true,sens:2,learn:'a medical condition'},
 {id:'code',n:'Pickup security code',s:'4 characters',def:2,canPrint:true,sens:0,learn:''},
 {id:'room',n:'Classroom and service time',s:'',def:2,canPrint:true,sens:1,learn:'where to find her every week'},
 {id:'phone',n:'Parent phone',s:'',def:1,canPrint:true,sens:1,learn:'how to reach her parent'},
 {id:'trusted',n:'Trusted adults, with photos',s:'Grandparents, sitters',def:1,canPrint:false,sens:1,learn:''},
 {id:'notauth',n:'Not Authorized adult',s:'Often from a custody order',def:1,canPrint:false,sens:3,learn:''},
 {id:'custody',n:'Custody note',s:'Free text',def:1,canPrint:false,sens:3,learn:''},
 {id:'history',n:'Attendance history',s:'Every check-in, kept',def:1,canPrint:false,sens:1,learn:''}
];
var V={}; F.forEach(function(f){V[f.id]=f.def;});
var OPT=['Don\'t collect','Store','Store and print'];
$('fields').innerHTML=F.map(function(f){ return '<div class="frow"><div class="fn">'+esc(f.n)+(f.s?'<small>'+esc(f.s)+'</small>':'')+'</div><div class="tri" role="group" aria-label="'+esc(f.n)+'">'+OPT.map(function(o,j){ return '<button type="button" data-f="'+f.id+'" data-v="'+j+'" aria-pressed="'+(V[f.id]===j)+'"'+(j===2&&!f.canPrint?' disabled title="Not printable"':'')+'>'+o+'</button>'; }).join('')+'</div></div>'; }).join('');
$('fields').querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ var id=b.dataset.f; V[id]=+b.dataset.v; $('fields').querySelectorAll('button[data-f="'+id+'"]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); drawSticker(true); }); });
var SCREEN=['first','last','photo','allergy','med','room','trusted','notauth','custody','code'];
function drawSticker(anim){
  var p=function(id){return V[id]===2;}, has=function(id){return V[id]>=1;};
  var lab=$('label'), nm=(p('first')?'Ava':'')+(p('last')?' Moreno':'');
  var lines=[]; if(p('room')) lines.push('Room 4 · 9:15'); if(p('allergy')) lines.push('<span class="warn">ALLERGY: PEANUTS</span>'); if(p('med')) lines.push('<span class="warn">MED: INHALER</span>'); if(p('phone')) lines.push('Mom 555-0142');
  lab.innerHTML=(p('code')?'<span class="code">7K4Q</span>':'')+'<div class="nm">'+(nm.trim()||'<span class="empty">no name printed</span>')+'</div><div class="ln">'+lines.join('')+'</div>';
  if(anim&&!RM){ lab.classList.remove('printing'); void lab.offsetWidth; lab.classList.add('printing'); }
  var back=F.filter(function(f){return p(f.id);}), scr=F.filter(function(f){return has(f.id)&&SCREEN.indexOf(f.id)>=0;}), file=F.filter(function(f){return has(f.id);});
  function fill(n,l,arr){ $(n).textContent=arr.length; $(l).innerHTML=arr.map(function(f){return '<li>'+esc(f.n)+'</li>';}).join('')||'<li>Nothing</li>'; }
  fill('nBack','lBack',back); fill('nScr','lScr',scr); fill('nFile','lFile',file);
  var L=back.map(function(f){return f.learn;}).filter(Boolean);
  var sens=file.filter(function(f){return f.sens>=2;}).map(function(f){return f.n.toLowerCase();});
  $('learns').textContent=(L.length?'From two steps away, a stranger learns '+L.join(', ').replace(/, ([^,]*)$/,' and $1')+'.':'From two steps away, a stranger learns nothing but that she is checked in.')+(sens.length?' The file also holds '+sens.join(', ').replace(/, ([^,]*)$/,' and $1')+', kept long after the sticker is gone.':'');
  $('zoomnote').textContent=back.length+' item'+(back.length===1?'':'s')+' readable from two steps away';
}
drawSticker(false);

/* ROOM B: retention clock */
var sv=$('scrubVid'), spiral=$('spiral'), pol=0, playing=null;
var dots=[], MAXAGE=35;
function ringR(y){ return 34 + y*7.3; }
function buildSpiral(){
  while(spiral.firstChild) spiral.removeChild(spiral.firstChild);
  for(var y=0;y<MAXAGE;y++) el('circle',{cx:300,cy:300,r:ringR(y),fill:'none',stroke:'#e0d4c3','stroke-width':1},spiral);
  el('text',{x:300,y:304,'text-anchor':'middle','font-family':'JetBrains Mono, monospace','font-size':11,fill:'#8a7d70'},spiral).textContent='BIRTH';
  dots=[]; var g=el('g',{},spiral);
  for(var y2=0;y2<MAXAGE;y2++) for(var w=0;w<52;w++){ var a=(w/52)*Math.PI*2-Math.PI/2, r=ringR(y2);
    dots.push({y:y2,w:w,e:el('circle',{cx:(300+Math.cos(a)*r).toFixed(1),cy:(300+Math.sin(a)*r).toFixed(1),r:2.4,fill:'#b4502c',opacity:0},g)}); }
  var lab=el('g',{},spiral); spiral._lab=lab;
}
buildSpiral();
function attends(y,w,leave,sun){ if(y<1||y>=leave) return false; var h=Math.sin(y*127.1+w*311.7)*43758.5453; h=h-Math.floor(h); return h < sun/52; }
function update(){
  var age=+$('age').value, leave=+$('leave').value, sun=+$('sun').value;
  $('oAge').textContent=age; $('oLeave').textContent=leave; $('oSun').textContent=sun; $('ageBadge').textContent='Age '+age;
  var checks=0, named=0, gone=Math.max(0,age-leave);
  dots.forEach(function(d){
    var on=attends(d.y,d.w,leave,sun) && d.y<age;
    if(!on){ d.e.setAttribute('opacity',0); return; }
    var alive=true, nm=true;
    if(pol===2 && age>leave) nm=false;
    if(pol===3 && age>=leave+3) alive=false;
    if(!alive){ d.e.setAttribute('opacity',0); return; }
    checks++; if(nm) named++;
    d.e.setAttribute('fill', nm ? (pol===1&&age>leave?'#c98a6e':'#b4502c') : '#a39888');
    d.e.setAttribute('opacity', d.y>=leave? 0 : 1);
  });
  var lab=spiral._lab; while(lab.firstChild) lab.removeChild(lab.firstChild);
  el('circle',{cx:300,cy:300,r:ringR(Math.min(age,MAXAGE-1)),fill:'none',stroke:'#22384f','stroke-width':2,'stroke-dasharray':'4 4'},lab);
  if(age>leave){ el('circle',{cx:300,cy:300,r:ringR(leave),fill:'none',stroke:'#2c7b74','stroke-width':2},lab);
    el('text',{x:300,y:300-ringR(leave)-6,'text-anchor':'middle','font-family':'JetBrains Mono, monospace','font-size':11,fill:'#2c7b74'},lab).textContent='SHE LEFT AT '+leave; }
  el('text',{x:300,y:Math.max(14,300-ringR(Math.min(age,MAXAGE-1))-6),'text-anchor':'middle','font-family':'JetBrains Mono, monospace','font-size':11,fill:'#22384f'},lab).textContent= age>leave? 'TODAY, AGE '+age : '';
  $('kChecks').textContent=checks; $('kNamed').textContent=named; $('kYears').textContent= (pol===3? Math.min(gone,3) : gone);
  var v;
  if(age<=leave) v= age<1 ? 'Drag her age forward. Her first check-in is the nursery.' : 'She is still in children\'s ministry. '+checks+' check-ins so far, each with whatever the sticker room stored.';
  else if(pol===0) v='She left '+gone+' year'+(gone===1?'':'s')+' ago. All '+checks+' check-ins still carry her name, as the vendors describe.';
  else if(pol===1) v='Inactivated: she no longer appears on lists, but her profile and all '+checks+' check-ins are kept and can be switched back on.';
  else if(pol===2) v='Profile deleted: the '+checks+' check-ins remain for reporting, with no name attached. The pattern of a family\'s Sundays is still there.';
  else v= gone>=3 ? 'Purged three years after she left. Nothing remains. No law we found requires this for check-ins; a church would have to choose it.' : 'She left '+gone+' year'+(gone===1?'':'s')+' ago. Under a three-year rule, the record has '+(3-gone)+' year'+(3-gone===1?'':'s')+' left.';
  $('verdict').textContent=v;
  if(sv && sv.readyState>=1 && sv.duration){ try{ sv.currentTime=Math.min(sv.duration-0.05, (age/MAXAGE)*sv.duration); var pp=$('scrubPoster'); if(pp) pp.style.opacity= age>0?0:1; }catch(e){} }
}
['age','leave','sun'].forEach(function(id){ $(id).addEventListener('input',function(){ if(playing){clearInterval(playing);playing=null;} update(); }); });
$('pol').querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ pol=+b.dataset.p; $('pol').querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); update(); }); });
function play(){ if(playing) clearInterval(playing); var a=0; $('age').value=0; update(); if(RM){ $('age').value=30; update(); return; }
  playing=setInterval(function(){ a++; $('age').value=a; update(); if(a>=30){ clearInterval(playing); playing=null; } },260); }
$('play').addEventListener('click',play);
if(sv){ sv.addEventListener('loadedmetadata',update); }
update();
if(io && !RM){ var o=new IntersectionObserver(function(es){ if(es[0].isIntersecting){ o.disconnect(); play(); } },{threshold:.4}); o.observe(spiral); }

/* ROOM C: face at the door */
var fb=$('faceBox');
(function(){ el('rect',{x:290,y:200,width:190,height:280,rx:10,fill:'none',stroke:'#b4502c','stroke-width':3,'stroke-dasharray':'26 10'},fb);
  var P=[[345,290],[420,300],[395,350],[360,405],[425,410],[380,245],[320,350],[455,350],[395,455]];
  P.forEach(function(p,i){ P.forEach(function(q,j){ if(j>i && Math.hypot(p[0]-q[0],p[1]-q[1])<120) el('line',{x1:p[0],y1:p[1],x2:q[0],y2:q[1],stroke:'#b4502c','stroke-width':1.2,opacity:.7},fb); }); el('circle',{cx:p[0],cy:p[1],r:4.5,fill:'#b4502c'},fb); });
  var s=el('g',{'class':'scanline'},fb); el('rect',{x:290,y:200,width:190,height:3,fill:'#b4502c',opacity:.8},s);
  el('rect',{x:270,y:492,width:230,height:30,rx:4,fill:'#241c16'},fb);
  var t=el('text',{x:385,y:512,'text-anchor':'middle','font-family':'JetBrains Mono, monospace','font-size':14,fill:'#fff'},fb); t.textContent='MATCH 0.97 · CHILD #0412';
})();
var LAW={
 IL:{h:'Illinois · Biometric Information Privacy Act',chip:'rep',li:['Covers any private entity "regardless of how it is set up"; we read that as reaching churches.','Before scanning: written notice and a signed written release, which for a child means a parent.','A public retention schedule; destroy the face data when its purpose ends or within 3 years of the last interaction, whichever comes first.','Families can sue: $1,000 per negligent violation, $5,000 per intentional or reckless one.']},
 TX:{h:'Texas · Capture or Use of Biometric Identifier Act',chip:'rep',li:['Notice and consent before capturing a face geometry.','Enforced only by the Texas attorney general; families cannot sue on their own.','Civil penalties up to $25,000 per violation.']},
 WA:{h:'Washington · biometric identifier law (2017)',chip:'watch',li:['Washington became the third state with a targeted biometric law, in 2017.','We did not summarize its terms for this exhibit; read the statute before relying on it.']},
 OT:{h:'Most other states',chip:'inf',li:['No biometric-specific law we found that would govern a church scanning a child\'s face.','The federal children\'s online privacy law (COPPA) generally reaches commercial operators, not noncommercial churches.','Protection rests on the church\'s policy and the vendor\'s contract.']}
};
var st='IL', faceOn=false;
function drawLaw(){ var L=LAW[st]; $('law').innerHTML='<h3>'+esc(L.h)+' <span class="chip '+L.chip+'">'+({rep:'REPORTED',watch:'WATCH',inf:'INFERENCE'})[L.chip]+'</span></h3>'+(faceOn?'':'<p class="note" style="margin:4px 0 0">Recognition is off. These rules apply the moment it is switched on.</p>')+'<ul>'+L.li.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>'; }
$('faceToggle').addEventListener('click',function(){ faceOn=!faceOn; this.setAttribute('aria-pressed',String(faceOn)); $('scanner').classList.toggle('on',faceOn); drawLaw(); });
$('states').querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ st=b.dataset.s; $('states').querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); drawLaw(); }); });
drawLaw();

/* ROOM D: policy press */
var Q=[
 {k:'print',q:'What prints on the sticker',o:[['First name and pickup code only',5,1,'Name tags will show only a child\'s first name and the pickup code.'],['Add allergies and medical alerts',8,3,'Name tags will show a child\'s first name, the pickup code, and any allergy or medical alert a parent asks us to print.'],['Add last name, room and parent phone',8,6,'Name tags will show a child\'s full name, classroom, a parent\'s phone, allergies and the pickup code.']]},
 {k:'photo',q:'Photos in the system',o:[['None',3,0,'We will not store photos.'],['Parents and trusted adults only',8,2,'We will store photos of parents and trusted adults to confirm pickups, not photos of children.'],['Children too',8,5,'We will store photos of children and the adults who pick them up.']]},
 {k:'custody',q:'Custody and Not Authorized information',o:[['Paper, locked, with the director',6,1,'Custody orders and Not Authorized adults will be kept on paper in a locked file held by the children\'s director, and shared with the volunteers on duty that day.'],['In the system, admins only',8,3,'Custody orders and Not Authorized adults will be recorded in the system and visible only to staff administrators.'],['In the system, visible to volunteers',9,6,'Custody orders and Not Authorized adults will be visible to check-in volunteers.']]},
 {k:'keep',q:'How long records are kept',o:[['Purged one year after a family leaves',0,0,'We will delete a family\'s records one year after their last check-in.'],['Purged three years after',0,2,'We will delete a family\'s records three years after their last check-in.'],['Kept indefinitely',0,8,'Records are kept indefinitely, as our software does by default.']]},
 {k:'face',q:'Face recognition',o:[['Never',0,0,'We will not use face recognition or any biometric scanning.'],['Only with written parental consent',2,5,'We will use biometric scanning only with a parent\'s written consent, a published retention schedule, and deletion when no longer needed.']]},
 {k:'delete',q:'When a parent asks to delete',o:[['Honored within 30 days',0,0,'If a parent asks, we will delete their family\'s records within 30 days and confirm it in writing.'],['No process',0,3,'We do not currently have a process for deletion requests.']]}
];
var A={print:1,photo:1,custody:0,keep:1,face:0,delete:0};
$('qsBox').innerHTML=Q.map(function(q){ return '<div class="q2"><div class="qq">'+esc(q.q)+'</div><div class="opts">'+q.o.map(function(o,j){return '<button type="button" data-k="'+q.k+'" data-v="'+j+'" aria-pressed="'+(A[q.k]===j)+'">'+esc(o[0])+'</button>';}).join('')+'</div></div>'; }).join('');
$('qsBox').querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ var k=b.dataset.k; A[k]=+b.dataset.v; $('qsBox').querySelectorAll('button[data-k="'+k+'"]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));}); doc(); }); });
function doc(){
  var safe=0, later=0, txt=[];
  Q.forEach(function(q){ var o=q.o[A[q.k]]; safe+=o[1]; later+=o[2]; txt.push(o[3]); });
  var sp=Math.round(safe/35*100), lp=Math.round(later/31*100);
  $('doc').innerHTML='<h3>Children\'s check-in data policy · draft</h3><p>Our check-in system exists for one purpose: to return every child to the right adult. We collect only what serves that purpose.</p>'+txt.map(function(t){return '<p>'+esc(t)+'</p>';}).join('')+'<p>We will review this policy each year and tell families when it changes.</p><div class="sig">Adopted by ________ on ________</div>';
  $('mSafe').style.width=sp+'%'; $('vSafe').textContent=xgBand(sp); $('mLater').style.width=lp+'%'; $('vLater').textContent=xgBand(lp);
}
doc();
$('copy').addEventListener('click',function(){ var t=$('doc').innerText; var b=this; try{ navigator.clipboard.writeText(t).then(function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy the policy';},1600);},function(){b.textContent='Select and copy the text above';}); }catch(e){ b.textContent='Select and copy the text above'; } });
})();

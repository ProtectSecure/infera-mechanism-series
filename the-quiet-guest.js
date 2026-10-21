(function(){
const NS="http://www.w3.org/2000/svg";
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const chip=c=>({F:'<span class="chip fact">FACT</span>',R:'<span class="chip rep">REPORTED</span>',I:'<span class="chip inf">INFERENCE</span>',W:'<span class="chip watch">WATCH</span>'})[c];

/* ---------- A: route ---------- */
const S=[
 {k:"drive",name:"The drive",guests:["License plate readers"],
  watch:"Plate cameras on public roads, run by local police or private owners. Flock says 6,000+ communities use its cameras. "+chip("R"),
  keep:"Plate, time, place and vehicle photo. Flock's default retention is 30 days. "+chip("R"),
  ask:"The agency that owns the camera, and agencies it shares with. Flock says federal sharing is off by default and one-to-one only. "+chip("R"),
  record:"A Savannah officer was fired after her ICE agent husband ran about 983 searches in six states through her login from January to July 2026. "+chip("R"),
  law:"A federal judge in Norfolk ruled in January that plate photos on public roads and database searches are not Fourth Amendment searches; the plaintiffs said they will appeal. "+chip("R")},
 {k:"lot",name:"The parking lot",guests:["Church security cameras","Plate readers at the entrance"],
  watch:"Many congregations have added their own cameras after threats and attacks. "+chip("R"),
  keep:"Whatever the church's system records, for as long as the church sets it. "+chip("I"),
  ask:"The church holds it. Like any private record, it can be sought with a warrant or subpoena. "+chip("I"),
  record:"The Family Research Council counted 415 hostile incidents against U.S. churches in 2024, mostly vandalism, from open sources. "+chip("R"),
  law:"Protection here is a church decision: what to record, how long to keep it, and how to answer a request. "+chip("I")},
 {k:"door",name:"The door",guests:["Agents outside","Agents inside, undercover"],
  watch:"Since January 2025, federal guidance no longer keeps immigration enforcement away from houses of worship. "+chip("R"),
  keep:"In Minnesota, an undercover agent at a church meeting recorded license plates and allegedly compiled dossiers. "+chip("R"),
  ask:"Court injunctions now bar enforcement at named plaintiffs' houses of worship, with exceptions for warrants and emergencies. "+chip("R"),
  record:"A church member's sworn declaration says DHS watched people entering and leaving University Baptist on Sundays. "+chip("R"),
  law:"Coverage depends on the case: plaintiff congregations in one Fourth Circuit case, plaintiffs in a Massachusetts order, and a DC case now sent back for a merits ruling. "+chip("R")},
 {k:"pew",name:"The pew",guests:["Phones","A face-match app"],
  watch:"Anyone with a phone, and agents with ICE's Mobile Fortify app, which identifies people from a photo. "+chip("R"),
  keep:"Mobile Fortify checks more than 270 million records in DHS's IDENT system; ICE says photos are kept 15 years, including for citizens. "+chip("R"),
  ask:"ICE says people cannot decline a scan. "+chip("R"),
  record:"Attorneys reported the app gave two different wrong names for the same woman in one encounter. "+chip("R"),
  law:"ICE has not completed a privacy impact assessment for the app, according to compiled reporting. "+chip("R")},
 {k:"stream",name:"The stream",guests:["Everyone online","The archive"],
  watch:"73% of congregations offered hybrid worship in 2023. A public stream can be watched, recorded and re-shared by anyone. "+chip("R"),
  keep:"Platform archives stay up until the church removes them. "+chip("I"),
  ask:"Anyone with the page. A public broadcast carries no expectation of privacy. "+chip("I"),
  record:"We found no public record of ICE using a church livestream to identify anyone. "+chip("W"),
  law:"Here the choice is entirely the congregation's. Exhibit B shows the trade. "+chip("I")}
];
let sel=2;
function drawRoute(){
  const s=document.getElementById("route");s.innerHTML="";
  const L=60,R=700,Y=70,X=i=>L+i*(R-L)/(S.length-1);
  el("path",{d:`M${L} ${Y}H${R}`,stroke:css("--rule"),"stroke-width":3,fill:"none","stroke-linecap":"round"},s);
  el("path",{d:`M${L} ${Y}H${X(sel)}`,stroke:css("--vest"),"stroke-width":3,fill:"none","stroke-linecap":"round"},s);
  S.forEach((st,i)=>{
    const g=el("g",{tabindex:0,role:"button","aria-label":st.name,style:"cursor:pointer"},s);
    el("rect",{x:X(i)-60,y:20,width:120,height:120,fill:"transparent"},g);
    const on=i===sel;
    for(let j=0;j<st.guests.length;j++)el("circle",{cx:X(i)-6+j*12,cy:Y-30,r:4,fill:css("--candle"),"fill-opacity":on?1:.5},g);
    el("circle",{cx:X(i),cy:Y,r:on?12:9,fill:on?css("--vest"):css("--card"),stroke:on?css("--vest"):css("--ink-3"),"stroke-width":2},g);
    const t=el("text",{x:X(i),y:Y+36,"text-anchor":"middle","font-size":13,"font-weight":on?600:400,fill:on?css("--ink"):css("--ink-2")},g);t.textContent=st.name;
    const n=el("text",{x:X(i),y:Y+54,"text-anchor":"middle","font-size":11,fill:css("--ink-3")},g);n.textContent=st.guests.length+(st.guests.length>1?" guests":" guest");
    const pick=()=>{sel=i;drawRoute();};
    g.addEventListener("click",pick);g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick();}});
  });
  const h=el("text",{x:L-10,y:16,"font-size":11,fill:css("--ink-3")},s);h.textContent="HOME";
  const h2=el("text",{x:R+10,y:16,"font-size":11,fill:css("--ink-3"),"text-anchor":"end"},s);h2.textContent="BENEDICTION, AND AFTER";
  const st=S[sel];
  document.getElementById("stationOut").innerHTML=`<div class="eyebrow" style="margin-top:6px">Station ${sel+1} of ${S.length}</div><div class="stitle">${st.name}</div><div class="guests">${st.guests.map(g=>`<span class="guest">${g}</span>`).join("")}</div>
  <div class="station"><div class="cell"><div class="k">Who may be watching</div><div class="v">${st.watch}</div></div><div class="cell"><div class="k">What is kept</div><div class="v">${st.keep}</div></div>
  <div class="cell"><div class="k">Who can get it</div><div class="v">${st.ask}</div></div><div class="cell"><div class="k">On the record</div><div class="v">${st.record}</div></div>
  <div class="cell wide"><div class="k">What protects you here</div><div class="v">${st.law}</div></div></div>`;
}

/* ---------- B: stream dial ---------- */
const st={aud:"public",frame:"room",keep:"forever"};
const RA={public:5,link:4,login:3,audio:4,none:0},EA={public:4,link:3,login:1,audio:1,none:0};
const EF={room:4,pulpit:0},RK={forever:3,week:2,live:0},EK={forever:4,week:1,live:0};
function drawDial(){
  const video=st.aud!=="audio"&&st.aud!=="none", streaming=st.aud!=="none";
  document.querySelectorAll('.seg[data-d="frame"] button').forEach(b=>b.disabled=!video);
  document.querySelectorAll('.seg[data-d="keep"] button').forEach(b=>b.disabled=!streaming);
  const r=RA[st.aud]+(streaming?RK[st.keep]:0), e=EA[st.aud]+(video?EF[st.frame]:0)+(streaming?EK[st.keep]:0);
  const reach=Math.round(r/8*100), exp=Math.round(e/12*100);
  reachV.textContent=reach;expV.textContent=exp;reachB.style.width=reach+"%";expB.style.width=exp+"%";
  let rp,ep;
  if(!streaming)rp="Only people who can come in person can worship with you. That leaves out the 8% of adults who worship only online. "+chip("F");
  else if(st.aud==="login")rp="Members can join, but a visitor or seeker cannot find you. Replays help those working or sick on Sunday. "+chip("I");
  else rp=(st.keep==="live"?"Anyone can join live, but no one can watch later. ":"Anyone can join, and those who miss Sunday can watch later. ")+chip("I");
  if(!streaming)ep="Only those physically present see who attended. The parking lot and the drive still have their own guests (Exhibit A). "+chip("I");
  else if(!video)ep="Voices can still identify people, but no faces leave the room. "+chip("I");
  else if(st.frame==="pulpit")ep="The preacher and choir are visible; the congregation is not. "+(st.keep==="forever"?"The archive keeps the leaders on record indefinitely. ":"")+chip("I");
  else ep=(st.aud==="public"?"Anyone, anywhere, can see who sat where":"Anyone holding the link can see who sat where")+(st.keep==="forever"?", for as long as the archive stays up. ":st.keep==="week"?", for a week. ":", while it airs. ")+chip("I");
  reachP.innerHTML=rp;expP.innerHTML=ep;
}
document.querySelectorAll(".seg").forEach(g=>g.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{if(b.disabled)return;st[g.dataset.d]=b.dataset.v;g.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));drawDial();})));
const reachV=document.getElementById("reachV"),expV=document.getElementById("expV"),reachB=document.getElementById("reachB"),expB=document.getElementById("expB"),reachP=document.getElementById("reachP"),expP=document.getElementById("expP");

/* ---------- C: timeline ---------- */
const T=[
 {d:"2021-10",lab:"2021",kind:"p",t:"Protected areas guidance",x:"Biden-era DHS guidance directs agents to avoid enforcement in or near places where people get essential services, including houses of worship.",c:"R"},
 {d:"2025-01",lab:"Jan 2025",kind:"p",t:"Guidance rescinded",x:"DHS: \"Criminals will no longer be able to hide in America's schools and churches to avoid arrest.\"",c:"R"},
 {d:"2025-02",lab:"Feb 2025",kind:"p",t:"First injunction, plaintiffs only",x:"Judge Theodore Chuang orders DHS to follow the 2021 policy at the houses of worship of Quaker meetings, the Cooperative Baptist Fellowship and Sikh Temple Sacramento. Warrants and emergencies are excepted. He declines to apply it nationwide.",c:"R"},
 {d:"2025-04",lab:"Apr 2025",kind:"p",t:"DC court denies a second bid",x:"A district judge finds the Episcopal Church and partners had not shown an imminent threat.",c:"R"},
 {d:"2026-01",lab:"Jan 2026",kind:"s",t:"Service interrupted at Cities Church",x:"Protesters chanting \"ICE out\" interrupt Sunday worship at a St. Paul church where an ICE field office director appears to be a pastor. They livestream it. DOJ opens a civil rights probe.",c:"R"},
 {d:"2026-02",lab:"Feb 2026",kind:"s",t:"Undercover at Prince of Peace",x:"An undercover DHS agent attends a protesters' meeting at a Roseville Lutheran church and records license plates, per court filings. The same month a Massachusetts court bars enforcement on the church property of two Baptist bodies.",c:"R"},
 {d:"2026-05",lab:"May 2026",kind:"s",t:"A wire at University Baptist",x:"An undercover agent wears a wire to a self-defense class in a Minneapolis church gym; her recorder falls to the floor.",c:"R"},
 {d:"2026-07",lab:"Jan to Jul 2026",kind:"s",t:"983 plate searches on a borrowed login",x:"An ICE agent runs about 983 Flock searches in six states through his wife's Savannah police account. She is fired in August.",c:"R"},
 {d:"2026-08",lab:"Aug 2026",kind:"p",t:"Fourth Circuit upholds; contempt sought",x:"The appeals court affirms the first injunction, finding the policy \"already has caused declines in attendance.\" Two days later, Baptist bodies ask a court to hold DHS in contempt over the Minnesota surveillance.",c:"R"},
 {d:"2026-10",lab:"20 Oct 2026",kind:"p",t:"DC Circuit revives the Episcopal case",x:"A 2-1 panel finds members of the Episcopal Church and 26 partner groups \"likely face imminent harm\" and sends the case back for a ruling on the merits.",c:"R"}
];
let tsel=T.length-1;
function drawTL(){
  const s=document.getElementById("tl");s.innerHTML="";
  const L=40,R=720,Y=80,m=d=>{const[a,b]=d.split("-").map(Number);return a*12+b-1};
  const lo=m("2021-07"),hi=m("2026-12"),X=d=>L+(m(d)-lo)/(hi-lo)*(R-L);
  el("line",{x1:L,x2:R,y1:Y,y2:Y,stroke:css("--rule"),"stroke-width":2},s);
  for(let y=2022;y<=2026;y++){const x=X(y+"-01");el("line",{x1:x,x2:x,y1:Y-6,y2:Y+6,stroke:css("--ink-3")},s);const t=el("text",{x,y:Y+26,"text-anchor":"middle","font-size":11,fill:css("--ink-3")},s);t.textContent=y;}
  let lastX=-99,lane=0;
  T.forEach((e,i)=>{
    const x=X(e.d);lane=(x-lastX<26)?(lane+1)%3:0;lastX=x;
    const yy=Y-18-lane*16,on=i===tsel,col=e.kind==="p"?css("--vest"):css("--candle");
    const g=el("g",{tabindex:0,role:"button","aria-label":e.lab+": "+e.t,style:"cursor:pointer"},s);
    el("rect",{x:x-11,y:yy-12,width:22,height:Y-yy+24,fill:"transparent"},g);
    el("line",{x1:x,x2:x,y1:yy,y2:Y,stroke:col,"stroke-width":1,"stroke-opacity":.5},g);
    el("circle",{cx:x,cy:yy,r:on?8:6,fill:on?col:css("--card"),stroke:col,"stroke-width":2},g);
    const pick=()=>{tsel=i;drawTL();};
    g.addEventListener("click",pick);g.addEventListener("keydown",ev=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();pick();}});
  });
  const e=T[tsel];
  const lt=el("text",{x:Math.min(Math.max(X(e.d),L+60),R-60),y:Y+50,"text-anchor":"middle","font-size":12,"font-weight":600,fill:css("--ink")},s);lt.textContent=e.lab;
  document.getElementById("tlOut").innerHTML=`<div class="d">${e.lab.toUpperCase()} · ${e.kind==="p"?"POLICY OR COURT":"SURVEILLANCE OR INTRUSION"}</div><div class="t">${e.t}</div><p>${e.x} ${chip(e.c)}</p>`;
}

function all(){drawRoute();drawDial();drawTL();}
all();
try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",all);}catch(e){}
new MutationObserver(all).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
})();

(function(){
const NS="http://www.w3.org/2000/svg";
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const money=v=>"$"+v.toFixed(2);

/* ---------- A: auction prices ---------- */
const A=[{y:"2024/25",p:28.92,n:"Before the shock."},{y:"2025/26",p:269.92,n:"A 9.3-fold jump; on bills from June 2025."},{y:"2026/27",p:329.17,n:"Record, held at the cap."},{y:"2027/28",p:333.44,n:"Record, held at the cap."},{y:"2028/29",p:325.00,n:"At the cap; 6,831 MW short of the reliability target."}];
let aSel=1;
function drawA(){
  const s=document.getElementById("aChart");s.innerHTML="";
  const L=64,R=740,T=24,B=250,max=350,bw=(R-L)/A.length;
  const Y=v=>B-(v/max)*(B-T);
  [0,100,200,300].forEach(t=>{el("line",{x1:L,x2:R,y1:Y(t),y2:Y(t),stroke:css("--rule"),"stroke-width":1},s);const tx=el("text",{x:L-10,y:Y(t)+4,"text-anchor":"end","font-size":12,fill:css("--ink-3")},s);tx.textContent="$"+t;});
  A.forEach((d,i)=>{
    const x=L+i*bw+bw*.2,w=bw*.6,y=Y(d.p),on=i===aSel;
    const g=el("g",{tabindex:0,role:"button","aria-label":d.y+" $"+d.p.toFixed(2)+" per MW-day",style:"cursor:pointer"},s);
    el("rect",{x:L+i*bw,y:T,width:bw,height:B-T+30,fill:"transparent"},g);
    el("path",{d:`M${x} ${B}V${y+4}q0 -4 4 -4h${w-8}q4 0 4 4V${B}z`,fill:on?css("--s1"):css("--ink-3"),"fill-opacity":on?1:.45},g);
    const v=el("text",{x:x+w/2,y:y-8,"text-anchor":"middle","font-size":12.5,"font-weight":on?600:400,fill:css("--ink")},g);v.textContent="$"+d.p.toFixed(2);
    const lb=el("text",{x:x+w/2,y:B+20,"text-anchor":"middle","font-size":12,fill:on?css("--ink"):css("--ink-3")},g);lb.textContent=d.y;
    const pick=()=>{aSel=i;drawA();const r=document.getElementById("aRead");const prev=i?A[i-1]:null;r.innerHTML=`<b>${d.y}</b> cleared at <b>$${d.p.toFixed(2)}</b> per MW-day${prev?`, against $${prev.p.toFixed(2)} the year before`:""}. ${d.n} <span class="chip fact">FACT</span>`;};
    g.addEventListener("click",pick);g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick();}});
  });
  el("line",{x1:L,x2:R,y1:B,y2:B,stroke:css("--ink-3"),"stroke-width":1},s);
}

/* ---------- B: driver claims ---------- */
const TOTAL=14.7,BASE=2.2;
const D={dc:{v:9.33,lab:"Data center load",src:"IMM",c:"--s1"},acc:{v:4.4,lab:"Accreditation rule",src:"Synapse",c:"--s2"},rmr:{v:4.3,lab:"Plants held for reliability",src:"Synapse",c:"--s3"}};
const on={dc:true,acc:false,rmr:false};
function drawB(){
  const s=document.getElementById("bChart");s.innerHTML="";
  const L=20,R=740,max=23,X=v=>L+(v/max)*(R-L);
  const lab=(x,y,t,o={})=>{const e=el("text",Object.assign({x,y,"font-size":12,fill:css("--ink-2")},o),s);e.textContent=t;return e};
  lab(L,22,"ACTUAL 2025/26 AUCTION COST",{fill:css("--ink-3"),"font-size":11});
  el("rect",{x:L,y:30,width:X(BASE)-L,height:26,rx:4,fill:css("--ink-3"),"fill-opacity":.35},s);
  el("rect",{x:X(BASE)+2,y:30,width:X(TOTAL)-X(BASE)-2,height:26,rx:4,fill:css("--ink-3"),"fill-opacity":.7},s);
  lab(X(TOTAL)+8,48,"$14.7B",{fill:css("--ink"),"font-weight":600});
  lab(L,74,"$2.2B prior year",{fill:css("--ink-3"),"font-size":11});
  lab(L,112,"CLAIMED BY EACH DRIVER, STACKED",{fill:css("--ink-3"),"font-size":11});
  let x=X(BASE),sum=0;
  el("rect",{x:L,y:120,width:X(BASE)-L,height:26,rx:4,fill:css("--ink-3"),"fill-opacity":.35},s);
  Object.keys(D).forEach(k=>{if(!on[k])return;const d=D[k];const w=X(sum+BASE+d.v)-X(sum+BASE);
    el("rect",{x:x+2,y:120,width:Math.max(w-2,1),height:26,rx:4,fill:css(d.c)},s);
    if(w>70)lab(x+8,138,"$"+d.v.toFixed(2)+"B",{fill:"#fff","font-weight":600});
    x+=w;sum+=d.v;});
  el("line",{x1:X(TOTAL),x2:X(TOTAL),y1:24,y2:160,stroke:css("--ink"),"stroke-width":1.25,"stroke-dasharray":"4 4"},s);
  lab(X(TOTAL)+6,176,"actual total",{fill:css("--ink-3"),"font-size":11});
  if(sum>0)lab(x+10,138,"$"+(BASE+sum).toFixed(1)+"B",{fill:css("--ink"),"font-weight":600});
  [0,5,10,15,20].forEach(t=>{lab(X(t),200,"$"+t+"B",{"text-anchor":"middle",fill:css("--ink-3"),"font-size":11});});
  const inc=TOTAL-BASE,pct=Math.round(sum/inc*100);
  const names=Object.keys(D).filter(k=>on[k]).map(k=>D[k].lab.toLowerCase()+" ("+D[k].src+")");
  const r=document.getElementById("bRead");
  if(!names.length){r.innerHTML="Switch on a driver to see the share of the <b>$12.5 billion</b> increase it is credited with.";return;}
  r.innerHTML=`Claimed: <b>$${sum.toFixed(2)}B</b>, or <b>${pct}%</b> of the $12.5 billion increase, from ${names.join(" and ")}. `+(pct>100?`<b>The claims exceed the increase.</b> Each estimate removes one driver while holding the others fixed, so the shares overlap. <span class="chip inf">INFERENCE</span>`:`<span class="chip rep">REPORTED</span>`);
}
document.querySelectorAll(".tog[data-k]").forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.k;on[k]=!on[k];b.setAttribute("aria-pressed",on[k]);drawB();}));

/* ---------- C: household split ---------- */
function drawC(){
  const sh=+document.getElementById("share").value/100;
  document.getElementById("shareVal").textContent=Math.round(sh*100)+"%";
  const s=document.getElementById("cChart");s.innerHTML="";
  const L=20,R=740,max=13,X=v=>L+(v/max)*(R-L);
  const t=(x,y,str,o={})=>{const e=el("text",Object.assign({x,y,"font-size":12,fill:css("--ink-2")},o),s);e.textContent=str;};
  const dc=10*sh,other=10-dc;
  el("rect",{x:L,y:28,width:X(3)-L,height:30,rx:4,fill:css("--ink-3"),"fill-opacity":.35},s);
  if(dc>0.05)el("rect",{x:X(3)+2,y:28,width:Math.max(X(3+dc)-X(3)-2,1),height:30,rx:4,fill:css("--s1")},s);
  if(other>0.05)el("rect",{x:X(3+dc)+2,y:28,width:Math.max(X(13)-X(3+dc)-2,1),height:30,rx:4,fill:css("--ink-3"),"fill-opacity":.7},s);
  t(L,18,"$3 before (2024/25)",{fill:css("--ink-3"),"font-size":11});
  t(R,18,"$13 after (2025/26)",{"text-anchor":"end",fill:css("--ink-3"),"font-size":11});
  t(L,84,"Data centers: "+money(dc)+" a month",{fill:css("--ink"),"font-weight":600});
  t(R,84,"Everything else: "+money(other),{"text-anchor":"end"});
  t(L,106,money(dc*12)+" a year at this share",{fill:css("--ink-3"),"font-size":11});
  document.getElementById("cRead").innerHTML=`At <b>${Math.round(sh*100)}%</b>, data centers account for <b>${money(dc)}</b> of the household's monthly capacity increase, about <b>${money(dc*12)}</b> a year. At 0%, the whole increase comes from rule changes, retirements and other load. <span class="chip inf">INFERENCE</span>`;
}
document.getElementById("share").addEventListener("input",drawC);

/* ---------- D: windows ---------- */
const W=[{n:"EPRI (Watten et al.)",a:2015,b:2024,side:"lo"},{n:"Rutgers (Garimella)",a:2014,b:2024,side:"lo"},{n:"LBNL and Brattle",a:2019,b:2025,side:"lo"},{n:"IMM auction analysis",a:2025,b:2028,side:"hi"}];
function drawD(){
  const yr=+document.getElementById("yr").value;document.getElementById("yrVal").textContent=yr;
  const s=document.getElementById("dChart");s.innerHTML="";
  const L=190,R=740,Y0=2014,Y1=2030,X=y=>L+(y-Y0)/(Y1-Y0)*(R-L),T=30;
  el("rect",{x:X(2025.42),y:T-10,width:X(2029.42)-X(2025.42),height:W.length*42+12,fill:css("--high"),"fill-opacity":.10},s);
  const tb=el("text",{x:X(2025.42)+6,y:T-14,"font-size":11,fill:css("--high")},s);tb.textContent="new capacity prices on bills";
  W.forEach((w,i)=>{const y=T+i*42+14;
    const nm=el("text",{x:L-12,y:y+4,"text-anchor":"end","font-size":12,fill:css("--ink")},s);nm.textContent=w.n;
    el("line",{x1:L,x2:R,y1:y,y2:y,stroke:css("--rule"),"stroke-width":1},s);
    const sees=yr>=w.a&&yr<=w.b;
    el("rect",{x:X(w.a),y:y-8,width:X(w.b+1)-X(w.a),height:16,rx:8,fill:w.side==="lo"?css("--low"):css("--high"),"fill-opacity":sees?.85:.3},s);});
  for(let y=2014;y<=2030;y+=2){const t=el("text",{x:X(y),y:T+W.length*42+26,"text-anchor":"middle","font-size":11,fill:css("--ink-3")},s);t.textContent=y;}
  el("line",{x1:X(yr+.5),x2:X(yr+.5),y1:T-4,y2:T+W.length*42+8,stroke:css("--ink"),"stroke-width":1.5},s);
  const seeing=W.filter(w=>yr>=w.a&&yr<=w.b).map(w=>w.n);
  const onBills=yr>=2026||yr===2025;
  let msg=`In <b>${yr}</b>, ${seeing.length?"the sources that can see this year are "+seeing.join(", "):"none of these sources has data"}. `;
  msg+= onBills?(yr===2025?"The 2025/26 prices reach household bills in June. ":"Capacity prices near the cap are on bills this year. "):"Capacity prices are still low. ";
  if(yr>=2026)msg+="None of the studies that found lower bills covers this year. <span class=\"chip fact\">FACT</span>";
  else if(yr<=2024)msg+="This is the period behind the lower-bills findings. <span class=\"chip fact\">FACT</span>";
  else msg+="Of the studies that found lower bills, only LBNL's 2026 edition reaches into this year, and it finds the residential link weaker. <span class=\"chip fact\">FACT</span>";
  document.getElementById("dRead").innerHTML=msg;
}
document.getElementById("yr").addEventListener("input",drawD);

/* ---------- E: dials ---------- */
const st={supply:"ample",alloc:"own",demand:"yes"};
function drawE(){
  const lo=st.supply==="ample",own=st.alloc==="own",yes=st.demand==="yes";
  let dir,cls,pts=[];
  if(lo&&own&&yes){dir="Evidence points to downward pressure on household rates";cls="--low";}
  else if(!lo&&!own){dir="Evidence points to upward pressure, carried by households";cls="--high";}
  else if(!lo){dir="Evidence points to upward pressure, even with a tariff";cls="--high";}
  else if(!yes){dir="Evidence points to risk of upward pressure";cls="--high";}
  else{dir="Mixed: lower average rates, with costs shifted toward households";cls="--mid";}
  pts.push(lo?"Spare supply lets new load connect without new plants; EPRI and Marketplace find lower rates in places like North Dakota. <span class='chip rep'>REPORTED</span>":"Where supply is short, new load bids up capacity prices for everyone; PJM's monitor calls data centers the primary reason for its spike. <span class='chip rep'>REPORTED</span>");
  pts.push(own?"A large-load tariff aims to make the data center pay for its own substations and lines, as the Rutgers author recommends. LBNL warns such tariffs may not fully protect other customers. <span class='chip rep'>REPORTED</span>":"If grid costs are spread across all customers, households carry part of the buildout, the pattern S2·07 projects from Vogtle. <span class='chip inf'>INFERENCE</span>");
  pts.push(yes?"Built demand spreads fixed costs over more kilowatt-hours, the mechanism behind the lower-bills findings. <span class='chip rep'>REPORTED</span>":"Unbuilt demand still costs money. EPRI warns fixed costs then fall on fewer kilowatt-hours, and forecast data center load alone added $6.24 billion to PJM's 2027/28 auction. <span class='chip fact'>FACT</span>");
  if(!lo&&own)pts.push("A tariff covers wires and substations, but not the higher capacity price every customer pays in a tight market. <span class='chip inf'>INFERENCE</span>");
  document.getElementById("verdict").innerHTML=`<div class="eyebrow">Your setting</div><div class="arrow" style="color:var(${cls})">${dir}</div><ul>${pts.map(p=>"<li>"+p+"</li>").join("")}</ul><div class="note">This is Infera's synthesis of the sources' own conditions, not a model forecast. <span class="chip inf">INFERENCE</span></div>`;
}
document.querySelectorAll(".seg").forEach(g=>g.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{st[g.dataset.d]=b.dataset.v;g.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));drawE();})));

function all(){drawA();drawB();drawC();drawD();drawE();}
all();
try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",all);}catch(e){}
new MutationObserver(all).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
})();

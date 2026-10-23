(function(){
"use strict";
var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var $ = function(s,r){return (r||document).querySelector(s);};
var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var JEWEL = ["#5b3f8c","#2f5597","#a8384f","#d39a2a","#2d7d6f","#7a4a9e","#3f6fb5"];
function hsh(a,b){var x=Math.sin(a*127.1+b*311.7)*43758.5453;return x-Math.floor(x);}
function press(group,btn){group.forEach(function(b){b.setAttribute("aria-pressed",b===btn?"true":"false");});}

/* reveal */
var io = "IntersectionObserver" in window ? new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{rootMargin:"0px 0px -8% 0px"}) : null;
$$(".rv").forEach(function(el){ if(io && !RM) io.observe(el); else el.classList.add("in"); });

/* ---------- HERO: three lancets, a voice in glass that goes quiet ---------- */
(function(){
  var cv=$("#heroGlass"); if(!cv) return;
  var cx=cv.getContext("2d"), W=0,H=0,dpr=1, mx=-9999,my=-9999, t0=performance.now();
  var status=$("#heroStatus"), stText=status?status.querySelector("span"):null, stState="on";
  function size(){var r=cv.getBoundingClientRect();dpr=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);}
  size(); window.addEventListener("resize",size);
  cv.parentNode.addEventListener("pointermove",function(e){var r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;});
  cv.parentNode.addEventListener("pointerleave",function(){mx=my=-9999;});
  var CYCLE=14000;
  function phase(ms){var p=ms%CYCLE; if(p<7600) return {k:"speak",p:p/7600}; if(p<10200) return {k:"drain",p:(p-7600)/2600}; return {k:"quiet",p:(p-10200)/3800};}
  function lancetPath(x,y,w,h){cx.beginPath();cx.moveTo(x,y+h);cx.lineTo(x,y+w*0.62);cx.quadraticCurveTo(x,y,x+w/2,y-w*0.18);cx.quadraticCurveTo(x+w,y,x+w,y+w*0.62);cx.lineTo(x+w,y+h);cx.closePath();}
  function frame(now){
    var ms=RM?3000:now-t0, ph=phase(ms);
    cx.clearRect(0,0,W,H);
    var mobile=W<520;
    var hgt=H*(mobile?0.78:0.74), top=H*(mobile?0.13:0.14);
    var wC=Math.min(W*0.2,hgt*0.3), wS=wC*0.72, gap=wC*0.22;
    var centerX=W*(mobile?0.5:0.56);
    var wins=[{x:centerX-wC/2-gap-wS,y:top+hgt*0.16,w:wS,h:hgt*0.84,o:1},{x:centerX-wC/2,y:top,w:wC,h:hgt,o:0},{x:centerX+wC/2+gap,y:top+hgt*0.16,w:wS,h:hgt*0.84,o:2}];
    wins.forEach(function(L){
      var cols=L.o===0?7:5, cw=L.w/cols, rows=Math.round(L.h/cw*0.9), rh=L.h/rows;
      cx.save(); lancetPath(L.x,L.y,L.w,L.h); cx.clip();
      cx.fillStyle="#2a2530"; cx.fillRect(L.x-2,L.y-L.w,L.w+4,L.h+L.w*2);
      for(var r=-3;r<rows;r++){
        var yy=L.y+r*rh, rowN=(r+3)/(rows+3);
        // voice amplitude for this row: a waveform travelling up the window
        var amp = 0.5+0.5*Math.sin(rowN*9 - ms/260 + L.o*1.7)*Math.sin(rowN*3.1 + ms/700);
        amp = Math.max(0, amp) * (0.55+0.45*Math.sin(ms/430+L.o));
        var lit;
        if(ph.k==="speak") lit = amp;
        else if(ph.k==="drain") lit = amp*Math.max(0,1-ph.p*1.6) * (rowN > ph.p ? 1 : 0.15);
        else lit = 0;
        for(var c=0;c<cols;c++){
          var xx=L.x+c*cw, mid=Math.abs((c+0.5)/cols-0.5)*2; // 0 centre, 1 edge
          var on = lit > mid*0.85 ? 1 : 0.0;
          var col=JEWEL[Math.floor(hsh(r+L.o*31,c)*JEWEL.length)];
          var d=Math.hypot(xx+cw/2-mx,yy+rh/2-my), warm=Math.max(0,1-d/150);
          var base = ph.k==="quiet" ? 0.10 + 0.06*Math.sin(ms/900+r) : 0.16;
          var a = Math.min(1, base + on*0.78*(0.7+0.3*hsh(c,r)) + warm*0.45);
          cx.globalAlpha=a; cx.fillStyle = (on||warm>0.05)?col:"#6f6878"; cx.fillRect(xx,yy,cw,rh);
        }
      }
      cx.globalAlpha=1;
      // lead lines
      cx.strokeStyle="rgba(28,24,30,.78)"; cx.lineWidth=1.3; cx.beginPath();
      for(var c2=1;c2<cols;c2++){cx.moveTo(L.x+c2*cw,L.y-L.w);cx.lineTo(L.x+c2*cw,L.y+L.h);}
      for(var r2=-3;r2<rows;r2++){cx.moveTo(L.x,L.y+r2*rh);cx.lineTo(L.x+L.w,L.y+r2*rh);}
      cx.stroke();
      // candle memory in centre window during quiet
      if(L.o===0 && ph.k!=="speak"){
        var k = ph.k==="drain"?ph.p:1, fx=L.x+L.w/2, fy=L.y+L.h*0.86;
        var g=cx.createRadialGradient(fx,fy,1,fx,fy,L.w*0.55*k);
        g.addColorStop(0,"rgba(255,232,170,"+(0.85*k)+")"); g.addColorStop(1,"rgba(255,200,90,0)");
        cx.fillStyle=g; cx.fillRect(L.x,L.y,L.w,L.h);
      }
      cx.restore();
      lancetPath(L.x,L.y,L.w,L.h); cx.strokeStyle="#2a2530"; cx.lineWidth=3; cx.stroke();
    });
    // sill
    cx.fillStyle="rgba(42,37,48,.12)"; cx.fillRect(wins[0].x-12, top+hgt+6, (wins[2].x+wins[2].w)-(wins[0].x)+24, 3);
    if(status){
      var want = ph.k==="speak" ? "on" : "off";
      if(want!==stState){stState=want;status.classList.toggle("off",want==="off");stText.textContent= want==="on" ? "Connected · speaking" : "Service discontinued · this voice is no longer available";}
    }
    if(!RM) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* ---------- ROOM 02: mourning clock ---------- */
(function(){
  var svg=$("#clockSvg"); if(!svg) return;
  var NS="http://www.w3.org/2000/svg";
  var X0=230, X1=980, MAXD=7300;
  function xd(d){return X0+(Math.log(Math.max(1,d))/Math.log(MAXD))*(X1-X0);}
  var G=[
    {g:"TRADITIONS",c:"#5b3f8c",rows:[
      ["Islam · public mourning",0,3,"watch","3 days of public mourning in common Sunni teaching"],
      ["Islam · widow's iddah",0,130,"watch","a widow's waiting period of four months and ten days"],
      ["Judaism · shiva",0,7,"watch","shiva, 7 days"],
      ["Judaism · shloshim",0,30,"watch","shloshim, 30 days"],
      ["Judaism · kaddish for a parent",0,335,"watch","kaddish for a parent, about 11 months"],
      ["Hindu · mourning rites",0,13,"watch","the 13-day Hindu mourning period"],
      ["Buddhist · intermediate state",0,49,"fact","the 49-day Buddhist intermediate period (Lai)"]
    ]},
    {g:"THE CLINIC",c:"#a8384f",rows:[
      ["ICD-11 prolonged grief",183,183,"watch","ICD-11's 6-month prolonged grief threshold"],
      ["DSM-5-TR prolonged grief",365,365,"watch","DSM-5-TR's 12-month threshold for adults"]
    ]},
    {g:"THE PRODUCTS",c:"#2f5597",rows:[
      ["GPT-4o in ChatGPT",0,640,"fact","GPT-4o's run in ChatGPT, May 2024 to Feb 2026"],
      ["Character.AI, launch to bankruptcy",0,1800,"rep","Character.AI's roughly five years before bankruptcy"],
      ["StoryFile, founding to bankruptcy",0,2550,"rep","StoryFile's seven years before bankruptcy"],
      ["Cambridge “Stay” contract",0,7300,"inf","the hypothetical 20-year contract in Cambridge's “Stay” scenario"]
    ]},
    {g:"A COUNSELOR'S SEASONS",c:"#2d7d6f",season:true,rows:[
      ["Immediate grief",1,21,"rep","immediate grief: the death, the funeral, the first weeks"],
      ["Early grief",21,730,"rep","early grief, which can run one to two years"],
      ["Mature grief",730,7300,"rep","mature grief: grieving from love and good memories, not would-a, could-a, should-a"]
    ]}
  ];
  function el(n,a,t){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(t!=null)e.textContent=t;svg.appendChild(e);return e;}
  // ticks
  [[1,"1 day"],[7,"1 week"],[30,"1 month"],[183,"6 mo"],[365,"1 year"],[1825,"5 yrs"],[7300,"20 yrs"]].forEach(function(t){var x=xd(t[0]);el("line",{x1:x,x2:x,y1:20,y2:592,stroke:"rgba(27,24,32,.08)"});el("text",{x:x,y:612,"text-anchor":"middle","class":"tick"},t[1]);});
  var y=30, bars=[], seasons=[];
  G.forEach(function(gr){
    el("text",{x:0,y:y,"class":"grp-label"},gr.g); y+=12;
    gr.rows.forEach(function(r){
      el("text",{x:0,y:y+14,"class":"row-label"},r[0]);
      var b;
      if(gr.season){ b=el("rect",{x:xd(r[1]),y:y+3,width:Math.max(4,xd(r[2])-xd(r[1])),height:14,fill:gr.c,"class":"bar",rx:3}); seasons.push({b:b,s:r[1],e:r[2],label:r[4]}); y+=27; return; }
      if(r[1]===r[2]){ b=el("rect",{x:xd(r[1])-3,y:y+2,width:6,height:16,fill:gr.c,"class":"bar"}); el("text",{x:xd(r[1])+8,y:y+15,"class":"tick"},r[1]===183?"6 months":"12 months"); }
      else b=el("rect",{x:X0,y:y+3,width:Math.max(4,xd(r[2])-X0),height:14,fill:gr.c,"class":"bar",rx:3});
      bars.push({b:b,end:r[2],label:r[4],lab:r[3]}); y+=27;
    });
    y+=14;
  });
  var cursor=el("line",{x1:0,x2:0,y1:18,y2:596,stroke:"#1b1820","stroke-width":2});
  var range=$("#clockRange"), day=$("#clockDay"), list=$("#clockList");
  function sliderToDay(v){return Math.round(Math.exp(v/1000*Math.log(MAXD)));}
  function fmt(d){ if(d<60) return "Day "+d; if(d<730) return "Month "+Math.round(d/30.4); return "Year "+(d/365).toFixed(d<3650?1:0); }
  function upd(){
    var d=sliderToDay(+range.value), x=xd(d); cursor.setAttribute("x1",x); cursor.setAttribute("x2",x);
    day.innerHTML=fmt(d)+"<small>"+d.toLocaleString()+" days after the death</small>";
    var closed=[],open=[];
    bars.forEach(function(o){var done=d>=o.end; o.b.setAttribute("class","bar "+(done?"past":"future")); (done?closed:open).push(o);});
    var chip=function(l){return ' <span class="chip '+l+'">'+{fact:"FACT",rep:"REPORTED",inf:"INFERENCE",watch:"WATCH"}[l]+'</span>';};
    var cur=seasons.filter(function(s){return d>=s.s&&d<s.e;})[0]||seasons[seasons.length-1];
    seasons.forEach(function(s){s.b.setAttribute("class","bar "+(s===cur?"past":"future"));});
    list.innerHTML = '<li style="column-span:all"><b>A grief counselor would place you in:</b> '+cur.label+' <span class="chip rep">REPORTED</span></li>' + closed.slice(0,6).map(function(o){return "<li><b>Passed:</b> "+o.label+chip(o.lab)+"</li>";}).join("") + open.slice(0,4).map(function(o){return "<li>Still ahead: "+o.label+"</li>";}).join("");
  }
  range.addEventListener("input",upd); upd();
  var cl=$$("#closure .pill"), cn=$("#closureNote");
  var CL={
    expected:"<b>An expected death leaves room for goodbyes.</b> Anticipatory grief starts before the death, and there may have been conversations where things were resolved. The counselor's seasons tend to run closer to their usual pace. <span class='chip rep'>REPORTED</span> interview",
    sudden:"<b>A sudden death skips the goodbye.</b> No last conversations, nothing resolved. This is where a griefbot is most tempting, as a way to say what never got said. <span class='chip rep'>REPORTED</span> interview",
    violent:"<b>Unnatural or traumatic loss changes the odds.</b> Prior studies put prolonged grief at about 9.8% after natural deaths and about 49% after unnatural or traumatic ones. <span class='chip fact'>FACT</span> as cited by <a href='https://www.frontiersin.org/journals/digital-health/articles/10.3389/fdgth.2026.1852514/full'>Lu et al., 2026</a>"
  };
  function setCl(k){cl.forEach(function(b){b.setAttribute("aria-pressed",b.dataset.k===k?"true":"false");});cn.innerHTML=CL[k];}
  cl.forEach(function(b){b.addEventListener("click",function(){setCl(b.dataset.k);});}); if(cl.length) setCl("expected");
})();

/* ---------- ROOM 03: tracker bars ---------- */
(function(){
  var tr=$("#track"); if(!tr) return;
  function go(){ $$(".sent .b",tr).forEach(function(b){b.style.width=(+b.dataset.w*3)+"px";}); $$(".panes",tr).forEach(function(p,i){ setTimeout(function(){p.classList.add("out");}, 700+i*350); }); }
  if(io && !RM){ var o=new IntersectionObserver(function(es){ if(es[0].isIntersecting){go();o.disconnect();} },{threshold:.2}); o.observe(tr);} else go();
})();

/* ---------- ROOM 04: borrowed grief ---------- */
(function(){
  var box=$("#tree"); if(!box) return;
  var btns=$$(".pill",box), nodes=$$(".node",box), ex=$("#treeExplain");
  var TXT={
    consent:"<b>Only Grandma Ruth could have said yes.</b> She cannot now. Public opinion turns on this more than anything else: 97% reject a replica made against the dead person's wishes, and 58% accept one she agreed to. Unless she left her wishes, no one in the picture, least of all you, can supply her consent. <span class='chip rep'>REPORTED</span>",
    law:"<b>Her son and daughter hold the legal keys.</b> US post-mortem rights pass to heirs and estates; China's Civil Code lets close relatives seek remedies. You have no standing at all, and her grandchildren could object to a bot you built. <span class='chip inf'>INFERENCE</span> from the statutes as reported.",
    grief:"<b>Everyone grieves, and you most invisibly.</b> Doka named this disenfranchised grief: a loss others don't acknowledge, which includes friends and chosen family. You were not counted at the funeral. A bot can feel like the one place you are counted. <span class='chip rep'>REPORTED</span>",
    covet:"<b>The commandment draws the line at taking.</b> “Thou shalt not covet… any thing that is thy neighbour's.” The desire to be loved the way she loved you is good. Rebuilding her voice without her family is the taking. Give the love somewhere to go: her stories, her grave, her family. <span class='chip inf'>INFERENCE</span> pastoral framing."
  };
  function set(m){ btns.forEach(function(b){b.setAttribute("aria-pressed",b.dataset.mode===m?"true":"false");}); nodes.forEach(function(n){ n.classList.toggle("on",(n.dataset.r||"").split(" ").indexOf(m)>-1 && !(m==="law"&&n.classList.contains("dead")) ); }); box.classList.toggle("mode-grief",m==="grief"); ex.innerHTML=TXT[m]; }
  btns.forEach(function(b){b.addEventListener("click",function(){set(b.dataset.mode);});});
  set("consent");
})();

/* ---------- ROOM 05: consent ---------- */
(function(){
  var wrap=$("#polls"); if(!wrap) return;
  var D={
    yes:[["Iwasaki · US","acceptable if the dead person consented",58,0]],
    no:[["Iwasaki · US","inappropriate if the dead person objected",97,1]],
    me:[["Iwasaki · US","do not want to be cloned themselves",59,1],["Iwasaki · US","unacceptable in all circumstances",40,1]]
  };
  var BASE=[["CNIL · France","would talk to an AI to stay in contact with dead relatives",23,0],["Kaspersky · 17+ countries","find AI recreation of the dead acceptable",35,0],["Kaspersky · 17+ countries","say it can upset people who knew them",67,1]];
  function row(r){return '<div class="poll"><div class="lbl">'+r[1]+'<small>'+r[0]+'</small></div><div class="track2"><div class="fill'+(r[3]?" no":"")+'" style="width:0" data-w="'+r[2]+'"></div></div><div class="val">'+r[2]+'%</div></div>';}
  var empty='<div class="poll empty"><div class="lbl">Attitudes broken down by religion or generation<small>Any US survey</small></div><div class="track2"></div><div class="val">NEVER MEASURED</div></div>';
  var btns=$$(".pill",wrap.parentNode);
  function set(k){ wrap.innerHTML=D[k].map(row).join("")+BASE.map(row).join("")+empty; requestAnimationFrame(function(){ requestAnimationFrame(function(){ $$(".fill",wrap).forEach(function(f){f.style.width=f.dataset.w+"%";}); }); }); btns.forEach(function(b){b.setAttribute("aria-pressed",b.dataset.c===k?"true":"false");}); }
  btns.forEach(function(b){b.addEventListener("click",function(){set(b.dataset.c);});});
  set("yes");
})();

/* ---------- ROOM 06: who protects grandma ---------- */
(function(){
  var t=$("#matrix"); if(!t) return;
  var COLS=["New York 50-f","California AB 1836","Tennessee ELVIS Act","Federal NO FAKES (S.1367)","RUFADAA (≈46 states)","EU AI Act Art. 50","China"];
  var ROWS=[["A famous performer",["yes","yes","yes","pend","part","part","yes"]],["Grandma, a private person",["no","no","part","pend","part","part","yes"]]];
  var LBL={yes:"Covered",part:"Partly",no:"Not covered",pend:"Pending"};
  var DET=[
   ["<b>New York, Civil Rights Law 50-f.</b> 40 years of protection for deceased performers' digital replicas in scripted audiovisual works and live music, for people domiciled in New York who died after May 2021. Claimants must register; a disclaimer can avoid liability. <span class='chip rep'>REPORTED</span> <a href='https://www.dwt.com/insights/2020/12/new-york-post-mortem-right-of-publicity'>DWT</a>","<b>New York.</b> The replica protection is written for performers and commercial use. A private family bot of an ordinary grandmother, used at home, falls outside it. <span class='chip inf'>INFERENCE</span>"],
   ["<b>California AB 1836</b> (in force Jan 2025) covers digital replicas of deceased performers in audiovisual works and sound recordings, with damages of at least $10,000. <span class='chip rep'>REPORTED</span> <a href='https://www.manatt.com/insights/newsletters/client-alert/california-enacts-a-host-of-new-ai-and-digital-rep'>Manatt</a>","<b>California.</b> Aimed at performers. A private family bot is not the use it targets. <span class='chip inf'>INFERENCE</span>"],
   ["<b>Tennessee's ELVIS Act</b> (2024) adds voice to the state's publicity statute and targets AI voice cloning without consent. <span class='chip rep'>REPORTED</span>","<b>Tennessee.</b> Voice is protected, but the publicity framework centers on commercial use; whether a private, noncommercial family bot is reached is unclear. <span class='chip watch'>WATCH</span>"],
   ["<b>NO FAKES Act (S.1367).</b> A post-mortem right of 10 years, renewable to as many as 70 years after death. It passed Senate Judiciary unanimously in June 2026; no floor vote yet. <span class='chip rep'>REPORTED</span> <a href='https://lamag.com/news-and-politics/the-no-fakes-act-passed-the-senate-judiciary-committee-paving-the-way-for-increased-protections-against-deepfakes/'>LA Magazine</a>","<b>NO FAKES.</b> Would cover anyone's digital replica, not just the famous, but it is not law. <span class='chip rep'>REPORTED</span> <span class='chip watch'>WATCH</span>"],
   ["<b>RUFADAA</b>, adopted in about 46 states, governs who may access a dead person's accounts. By default an executor sees who wrote to whom, not what was said. <span class='chip rep'>REPORTED</span>","<b>RUFADAA.</b> It governs access to accounts, not training an AI on what's inside. A family can lawfully get access and still have no rule on feeding those texts to a griefbot. <span class='chip inf'>INFERENCE</span>"],
   ["<b>EU AI Act, Article 50.</b> Chatbots must disclose they are AI; deepfakes must be labeled. Applies from August 2026. Fines up to €15M or 3% of turnover. <span class='chip rep'>REPORTED</span> <a href='https://www.gtlaw.com/en/insights/2026/6/deepfakes-chatbots-ai-generated-text-european-commission-details-transparency-obligations-under-the-ai-act'>Greenberg Traurig</a>","<b>EU.</b> Disclosure and labeling, not a ban; the GDPR does not protect the dead, though some member states, such as France, add rules. <span class='chip rep'>REPORTED</span>"],
   ["<b>China.</b> Civil Code remedies for close relatives when a dead person's likeness is used without consent; labeling rules for synthetic content since Sept 2025; providers say they require kinship proof. <span class='chip rep'>REPORTED</span> <a href='https://www.npr.org/2024/07/18/nx-s1-5040583/china-ai-artificial-intelligence-dead-avatars'>NPR</a>","<b>China.</b> The one system here where ordinary families clearly have a claim over a dead relative's likeness. <span class='chip rep'>REPORTED</span>"]
  ];
  var h='<thead><tr><th></th>'+COLS.map(function(c){return "<th>"+c+"</th>";}).join("")+'</tr></thead><tbody>';
  ROWS.forEach(function(r,ri){h+='<tr><th class="rowh">'+r[0]+'</th>'+r[1].map(function(v,ci){return '<td><button class="m-'+v+'" data-r="'+ri+'" data-c="'+ci+'" aria-pressed="false">'+LBL[v]+'</button></td>';}).join("")+'</tr>';});
  t.innerHTML=h+'</tbody>';
  var det=$("#mdetail"), bs=$$("button",t);
  bs.forEach(function(b){b.addEventListener("click",function(){press(bs,b);det.innerHTML=DET[+b.dataset.c][+b.dataset.r];});});
})();

/* ---------- ROOM 07: price ladder ---------- */
(function(){
  var L=$("#ladder"); if(!L) return;
  var MIN=1, MAX=20000;
  function xp(v){return (Math.log(v/MIN)/Math.log(MAX/MIN))*100;}
  var R=[
    ["Photo “resurrection”","China, e-commerce",[1.5,2],"under $2","A moving photo. Nothing to cancel; nothing that talks back."],
    ["Project December","US, pay per session",[10,10],"about $10","Session-based. When the credits end, so does the conversation."],
    ["Silicon Intelligence avatar","Nanjing, basic tier",[30,30],"about $30","Built from under a minute of video. Advanced interactive tiers cost thousands."],
    ["Vaice memorial clip","Seoul, 3 to 5 minutes",[390,390],"about $390","A clip you own. It never says anything new, so it can't be switched off."],
    ["Eternos legacy AI","US, recorded before death",[10000,15000],"$10,000 to $15,000","Paid once. Its future depends on the company surviving."]
  ];
  L.innerHTML=R.map(function(r){var a=xp(r[2][0]),b=xp(r[2][1]);return '<div class="rung"><div class="who">'+r[0]+'<small>'+r[1]+'</small></div><div><div class="line"><span class="dot" data-l="'+a+'" data-w="'+(b-a)+'" style="left:0;width:24px"></span><span class="price" data-l="'+((a+b)/2)+'" style="left:0;opacity:0">'+r[3]+'</span></div><div class="stop">If you stop: '+r[4]+'</div></div></div>';}).join("");
  var tk=$("#ladderTicks"); tk.innerHTML=[1,10,100,1000,10000].map(function(v){return '<span style="left:'+xp(v)+'%">$'+v.toLocaleString()+'</span>';}).join("");
  function go(){ $$(".dot",L).forEach(function(d){d.style.left=d.dataset.l+"%";d.style.width="calc("+d.dataset.w+"% + 24px)";}); $$(".price",L).forEach(function(p){p.style.left=p.dataset.l+"%";p.style.top="-22px";var lv=+p.dataset.l;p.style.transform=lv>72?"translateX(-100%)":(lv<12?"translateX(0)":"translateX(-50%)");p.style.opacity=1;p.style.transition="left 1.2s cubic-bezier(.2,.7,.2,1),opacity .8s .6s";}); }
  if(io && !RM){var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){go();o.disconnect();}},{threshold:.3});o.observe(L);} else go();
})();

/* ---------- ROOM 08: scale zoom ---------- */
(function(){
  var cv=$("#scaleCanvas"); if(!cv) return;
  var cx=cv.getContext("2d"), S=0, dpr=1, z=1, anim=null, rd=$("#scaleRead"), btn=$("#scalePlay");
  var RATIO=Math.sqrt(86e9/1.4e5); // side ratio ~784
  function size(){var r=cv.getBoundingClientRect();dpr=Math.min(2,window.devicePixelRatio||1);S=r.width;cv.width=S*dpr;cv.height=S*dpr;cx.setTransform(dpr,0,0,dpr,0,0);draw();}
  function glass(x,y,s,cols,alpha){var c=s/cols;for(var i=0;i<cols;i++)for(var j=0;j<cols;j++){cx.globalAlpha=alpha*(0.55+0.45*hsh(i,j));cx.fillStyle=JEWEL[Math.floor(hsh(j,i)*JEWEL.length)];cx.fillRect(x+i*c,y+j*c,c,c);}cx.globalAlpha=1;}
  function draw(){
    cx.clearRect(0,0,S,S); var pad=S*0.08, box=S-pad*2;
    // z goes from 0 (fly fills box) to 1 (human fills box)
    var flySide = box*Math.pow(RATIO,-z), humSide = flySide*RATIO;
    var ox=pad, oy=pad+box; // anchor bottom-left
    if(humSide>0){ glass(ox,oy-humSide,humSide,Math.max(6,Math.min(28,Math.round(14*(z+0.2)))),0.5*z+0.05); }
    cx.strokeStyle="rgba(241,235,226,.5)"; cx.lineWidth=1; cx.strokeRect(ox,oy-humSide,humSide,humSide);
    var fs=Math.max(1.5,flySide);
    cx.fillStyle="#f2b84a"; cx.fillRect(ox,oy-fs,fs,fs);
    if(fs>30) glass(ox,oy-fs,fs,8,0.9);
    cx.strokeStyle="#f2b84a"; cx.lineWidth=2; cx.strokeRect(ox,oy-fs,fs,fs);
    if(fs<12){ cx.beginPath(); cx.arc(ox+fs/2,oy-fs/2,14,0,6.283); cx.stroke(); }
    cx.fillStyle="#f1ebe2"; cx.font="500 12px 'IBM Plex Mono',monospace";
    cx.fillText(z<0.15?"fruit fly · ~140,000 neurons":"the gold speck is the fruit fly", pad, pad-12);
    if(z>0.85) cx.fillText("human · ~86,000,000,000 neurons", pad+8, pad+20);
    var neurons = 1.4e5*Math.pow(RATIO, 2*z);
    rd.textContent = "Area shown: about "+(neurons>=1e9?(neurons/1e9).toFixed(neurons<1e10?1:0)+" billion":neurons>=1e6?(neurons/1e6).toFixed(0)+" million":Math.round(neurons/1e3)+" thousand")+" neurons";
  }
  function play(){ if(anim) return; btn.setAttribute("aria-pressed","true"); var st=performance.now(), from=z>0.95?0:z, dir=1; if(z>0.95){from=1;dir=-1;}
    (function step(n){ var p=Math.min(1,(n-st)/(RM?1:5200)); var e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2; z= dir>0 ? from+(1-from)*e : 1-e; draw(); if(p<1) anim=requestAnimationFrame(step); else {anim=null;btn.setAttribute("aria-pressed","false");btn.textContent=z>0.5?"Zoom back to the fly":"Play the zoom";} })(st); }
  btn.addEventListener("click",play);
  window.addEventListener("resize",size); size(); z=0; draw();
})();

/* ---------- ROOM 09: idolatry line ---------- */
(function(){
  var panes=$$("#line6 .pane6"), trad=$("#trad"), out=$("#yourLine"); if(!panes.length) return;
  // for each source: index of last acceptable pane (or -1 = no position), and "q" range for contested
  // [name, source, last accepted pane, contested panes, pane where the line falls]
  var T=[
    ["Dar al-Ifta, Egypt","fatwa 24168, 2025",1,[],2],
    ["Antiqua et Nova","Vatican, 2025",1,[2,3],4],
    ["Catholic voices","Green, Robinson, Baggot",1,[2],3],
    ["Evangelical essays","Bressman, Thacker",1,[],2],
    ["Jewish essays","Bor and others",1,[2,3],4],
    ["Buddhist reading","Elaine Lai",1,[2],3],
    ["Pelkey ruling, Arizona","Court of Appeals, 2026",1,[],2]
  ];
  trad.innerHTML=T.map(function(r){var bars="";for(var i=0;i<6;i++){var cls=i<=r[2]?"ok":(r[3].indexOf(i)>-1?"q":(i===r[4]?"line":""));bars+='<i class="'+cls+'" title="pane '+(i+1)+'"></i>';}return '<div class="trow"><div class="t">'+r[0]+'<small>'+r[1]+'</small></div><div class="bar6">'+bars+'</div></div>';}).join("")+'<p class="note" style="margin:6px 0 0"><span style="display:inline-block;width:12px;height:10px;background:#bfdcc9;border-radius:2px"></span> accepted &nbsp; <span style="display:inline-block;width:12px;height:10px;background:repeating-linear-gradient(45deg,#f6e7c4 0 4px,#fbf3e1 4px 8px);border-radius:2px"></span> contested &nbsp; <span style="display:inline-block;width:12px;height:10px;background:#a8384f;opacity:.8;border-radius:2px"></span> where the line falls <span class="chip inf">INFERENCE</span></p>';
  panes.forEach(function(p){p.addEventListener("click",function(){
    var k=+p.dataset.i; panes.forEach(function(q,i){q.classList.toggle("kept",i<=k);q.classList.toggle("beyond",i>k);q.setAttribute("aria-pressed",i===k?"true":"false");});
    var past=T.filter(function(r){return k>=r[4];}).map(function(r){return r[0];});
    var contested=T.filter(function(r){return r[3].indexOf(k)>-1;}).map(function(r){return r[0];});
    var msg="<b>You would keep panes 1 to "+(k+1)+".</b> ";
    if(k<=1) msg+="Every source here accepts this much: remembrance, with the dead person's real words.";
    else { if(past.length) msg+="That crosses the line drawn by "+past.join(", ")+". "; if(contested.length) msg+="Contested in "+contested.join(", ")+". "; }
    if(k>=5) msg+="The Vatican calls substituting “an artifact of human making” for God idolatry, and Catholic and Chabad-affiliated voices both use that word.";
    out.innerHTML=msg;
  });});
})();

/* ---------- ROOM 10: tabs ---------- */
(function(){
  var tabs=$$(".tabs .pill"), pans=$$(".tabpanel"); if(!tabs.length) return;
  tabs.forEach(function(t){t.addEventListener("click",function(){var i=+t.dataset.t;tabs.forEach(function(b,j){b.setAttribute("aria-pressed",j===i?"true":"false");b.setAttribute("aria-selected",j===i?"true":"false");});pans.forEach(function(p,j){p.classList.toggle("on",j===i);});});});
})();

/* ---------- ROOM 11: churchyard ---------- */
(function(){
  var hol=$("#holders"), cms=$$(".record .cm");
  if(hol){
    var H=[
      [["The platform","keeps the comment on its servers under its own terms; memorializes the account when told of the death."],["Anyone online","can read it, and could copy it; scraping public pages sits in a legal gray zone."],["Her family","as legacy contact can pin a post and download what she shared, but cannot edit her old comments."],["The church","as page admin can hide or delete comments on its own posts. Whether it should is the question. (INFERENCE)"]],
      [["The platform","holds a health detail she shared in public: a scan, her fear. US privacy rights generally end at death."],["Anyone online","could fold this into a bot of her, or a profile of the congregation."],["Her family","can claim only their own privacy as survivors, not hers."],["The church","received it as a prayer request. A pastor would never repeat it from the pulpit; the page keeps it on display forever."]],
      [["The platform","stores livestream chat with the video for as long as the video stays up."],["Anyone online","can replay it. 41 messages over three years is enough voice to train a crude imitation of her."],["Her family","may not know it exists."],["The church","decides whether the archive stays public, unlisted or deleted."]]
    ];
    function show(i){ press(cms,cms[i]); hol.innerHTML=H[i].map(function(h){return '<div class="holder"><b>'+h[0]+'</b><span>'+h[1]+'</span></div>';}).join(""); }
    cms.forEach(function(c){c.addEventListener("click",function(){show(+c.dataset.l);});}); show(0);
  }
  var yard=$("#yard"), note=$("#yardNote"), rules=$$("#yardRules .pill"); if(!yard) return;
  var N=24, stones=[];
  for(var i=0;i<N;i++){ var b=document.createElement("button"); b.className="stone"; b.setAttribute("aria-label","Light a candle at stone "+(i+1)); var g='<span class="g">'; for(var k=0;k<15;k++) g+='<i style="background:'+JEWEL[Math.floor(hsh(i,k)*JEWEL.length)]+'"></i>'; g+='</span><span class="flame"></span>'; b.innerHTML=g; yard.appendChild(b); stones.push(b); }
  var GHOST=[2,5,9,13,17,22];
  var lit=0;
  stones.forEach(function(s,i){ s.addEventListener("click",function(){ if(s.classList.contains("ghost")) return; s.classList.toggle("lit"); lit=$$(".stone.lit",yard).length; render(); }); });
  function on(k){var b=rules.filter(function(r){return r.dataset.k===k;})[0];return b&&b.getAttribute("aria-pressed")==="true";}
  function render(){
    stones.forEach(function(s,i){ var g=GHOST.indexOf(i)>-1; s.classList.toggle("ghost", g && on("consent")); if(g&&on("consent")) s.classList.remove("lit"); });
    var parts=[];
    parts.push(lit?("<b>"+lit+" candle"+(lit>1?"s":"")+" lit.</b> "):"<b>Tap a stone.</b> ");
    parts.push(on("consent")?"Faded stones are members who never said yes; they stay off the public yard, remembered in the parish book instead. ":"Without consent, everyone with a church record is listed, whether or not they would have wanted it. ");
    parts.push(on("real")?"Each stone holds real words only: a photo, a eulogy, a recorded reading. ":"With bots allowed, the yard starts to talk back, and the line from Room 09 is crossed. ");
    parts.push(on("days")?"The yard opens a name on its anniversary and at All Souls, the way yahrzeit boards light a name. ":"With no rhythm, the yard is a feed of the dead, always on. ");
    parts.push(on("nodata")?"No analytics, no ads, no training data.":"Without that rule, a list of the dead and who visits them is valuable data.");
    note.innerHTML=parts.join("");
  }
  rules.forEach(function(r){r.addEventListener("click",function(){r.setAttribute("aria-pressed",r.getAttribute("aria-pressed")==="true"?"false":"true");render();});});
  render();
})();
/* ---------- ROOM 12: the whole person ---------- */
(function(){
  var cv=$("#wholeCanvas"); if(!cv) return;
  var cx=cv.getContext("2d"), W=0,H=0,dpr=1;
  var S=[
    ["Sunday self","church posts, prayer requests","#d39a2a",1,"pub"],
    ["Family group chat","holidays, photos, jokes","#2d7d6f",1,"priv"],
    ["Work email","the professional voice","#2f5597",0,"priv"],
    ["Gaming handle","a nickname, a different temper","#7a4a9e",0,"pub"],
    ["A second account","the opinions kept off the main one","#a8384f",0,"pub"],
    ["2 a.m. searches","fears, symptoms, questions","#5b3f8c",0,"priv"],
    ["Private journal app","what they told no one","#3f6fb5",0,"priv"],
    ["Messages with an ex","another person's words too","#8a5a0c",0,"third"]
  ];
  var on=[true,true,false,false,false,false,false,false];
  var box=$("#sources2"), warn=$("#wholeWarn"), rd=$("#wholeRead");
  box.innerHTML=S.map(function(s,i){return '<button class="src" data-i="'+i+'" aria-pressed="'+on[i]+'"><i style="background:'+s[2]+'"></i><span>'+s[0]+'<small>'+s[1]+(s[3]?' · family knew':'')+'</small></span></button>';}).join("");
  // build a portrait of cells: head + shoulders silhouette on a grid
  var COLS=22, ROWS=28, cells=[];
  function inside(c,r){var x=(c+.5)/COLS-.5, y=(r+.5)/ROWS; var head=((x*x)/(0.17*0.17)+((y-0.30)*(y-0.30))/(0.21*0.21))<1; var body=y>0.56 && Math.abs(x)<0.18+ (y-0.56)*0.9; return head||body;}
  for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++){ if(inside(c,r)) cells.push({c:c,r:r,s:Math.floor(hsh(c*1.7,r*2.3)*S.length)}); }
  // bias: family-known sources occupy the face centre so the "known" part reads as the face
  cells.forEach(function(k){var x=(k.c+.5)/COLS-.5,y=(k.r+.5)/ROWS; if(Math.abs(x)<0.09 && y>0.18 && y<0.44) k.s = hsh(k.c,k.r)<.5?0:1;});
  function size(){var b=cv.getBoundingClientRect();dpr=Math.min(2,window.devicePixelRatio||1);W=b.width;H=b.height;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);draw();}
  function draw(){
    cx.clearRect(0,0,W,H); var cw=W/COLS, ch=H/ROWS;
    var total=0, shown=0, known=0;
    cells.forEach(function(k){
      var s=S[k.s], x=k.c*cw, y=k.r*ch; total++;
      if(on[k.s]){ shown++; if(s[3]) known++; cx.globalAlpha=0.55+0.4*hsh(k.c,k.r); cx.fillStyle=s[2]; }
      else { cx.globalAlpha=1; cx.fillStyle="#2e2934"; }
      cx.fillRect(x,y,cw,ch);
      cx.globalAlpha=1; cx.strokeStyle="#141117"; cx.lineWidth=1.4; cx.strokeRect(x,y,cw,ch);
    });
    cells.forEach(function(k){ var s=S[k.s]; if(s[3]&&on[k.s]){ cx.strokeStyle="rgba(255,240,205,.95)"; cx.lineWidth=2; cx.strokeRect(k.c*cw+2.5,k.r*ch+2.5,cw-5,ch-5);} });
    var pct=shown?Math.round(known/shown*100):0;
    rd.textContent = shown ? ("Outlined panes are what the family knew: "+pct+"% of this composite.") : "Nothing fed. No bot.";
    var notes=[];
    var privOn=S.some(function(s,i){return on[i]&&s[4]==="priv"&&!s[3];});
    var thirdOn=on[7], hiddenOn=on[4]||on[5]||on[6];
    if(pct<60&&shown) notes.push("<b>Most of this bot is a stranger to the family.</b> The more lives it ingests, the less it resembles the person at the kitchen table.");
    if(privOn) notes.push("<b>Private files and messages:</b> US digital-asset law by default gives executors the log of who wrote to whom, not the content, unless the person consented. <span class='chip rep'>REPORTED</span>");
    if(thirdOn) notes.push("<b>Messages with an ex are someone else's words too.</b> A bot trained on them can repeat a living person's secrets.");
    if(hiddenOn) notes.push("<b>A bot can disclose what the person chose to hide.</b> Ethicists warn it “might reveal things the person never chose to share publicly.” <span class='chip fact'>FACT</span>");
    if(!notes.length) notes.push("<b>The Sunday self and the family chat:</b> the person most of the family knew, and the smallest bot.");
    warn.innerHTML=notes.join(" ");
  }
  $$(".src",box).forEach(function(b){b.addEventListener("click",function(){var i=+b.dataset.i;on[i]=!on[i];b.setAttribute("aria-pressed",on[i]);draw();});});
  window.addEventListener("resize",size); size();
  var R=$("#curRange"), out=$("#curOut");
  var V=[
    ["The whole record",1,"Everything, including what they hid and what others told them in confidence.","It may be true, but it was never offered. It risks shocking the family, exposing living people, and making the dead say, in a voice, what they chose to keep silent. The ethicists' rule: consented data only. <span class='chip inf'>INFERENCE</span>"],
    ["What they chose to leave",0,"Only what the person set aside for it while alive: letters, recordings, a curated archive, the wishes on a card.","The closest thing to consent the dead can give. It is still partial, and that is honest: no one is fully known by what they leave. <span class='chip inf'>INFERENCE</span>"],
    ["A family's honest eulogy",0,"The family chooses, the way a eulogist does: kind, a little generous, never invented.","Jewish law allows praise “a little” beyond merit and forbids made-up virtues; a hadith counsels mentioning the good and holding back the evil. Both are about restraint, not fabrication. <span class='chip rep'>REPORTED</span>"],
    ["Only the good",1,"Every hard edge removed: no temper, no doubt, no failure.","This is where users already drift: the largest study found idealized memories and AI-made “new memories” blending with real ones. Grieving a saint who never lived can stall grieving the person who did. <span class='chip fact'>FACT</span> + <span class='chip inf'>INFERENCE</span>"],
    ["Improved",1,"New virtues, new words, a reconciled ending that never happened.","Every source in this exhibit draws the line here: Dar al-Ifta forbids making the dead say what they never said, Jewish law forbids invented praise, and an Arizona court threw out a sentence over an AI voice of the dead. <span class='chip fact'>FACT</span>"]
  ];
  function cur(){var v=V[+R.value];out.innerHTML='<div class="verdict'+(v[1]?' bad':'')+'">'+v[0]+'</div><div><p><b>'+v[2]+'</b></p><p>'+v[3]+'</p></div>';}
  R.addEventListener("input",cur); cur();
})();

/* ---------- ROOM 11b: parish vault ---------- */
(function(){
  var bs=$$("#vault .pill"), out=$("#vaultOut"); if(!bs.length) return;
  var V={
    plot:["Bundled with the burial plot","The church already keeps the body. Keeping the record beside it fits what congregations do, and the plot's perpetual-care fund is a model for paying for it.","Perpetual care for a grave is a promise backed by land. A server is not land. If the parish merges or closes, who inherits the vault?"],
    fee:["A one-time fee, about $20","Cheap, simple and paid once, so nothing lapses and no one is billed by the dead. In Infera's conversation with a grief counselor, about $20 came up as a price people would pay.","Twenty dollars does not pay for storage forever. One-time-fee griefbot firms already depend on surviving as companies, and StoryFile did not."],
    tithe:["An annual tithe","Steady income for a shrinking church, and a reason for families to stay connected each year. The same conversation pictured it kept alive and never altered.","A yearly payment is a subscription. Stop paying and the second death comes from your own church. It also ties the church's budget to keeping the dead online."],
    free:["Free, as ministry","No money changes hands, so no incentive to keep anyone online longer than they would want. It fits the Book of the Names of the Dead.","Someone still pays for servers, backups and security. A free vault run by volunteers is the system most likely to leak or vanish."]
  };
  function set(k){var v=V[k];bs.forEach(function(b){b.setAttribute("aria-pressed",b.dataset.k===k?"true":"false");});out.innerHTML='<div class="vs"><b>For</b><p>'+v[1]+'</p></div><div class="vs against"><b>Against</b><p>'+v[2]+'</p></div>';}
  bs.forEach(function(b){b.addEventListener("click",function(){set(b.dataset.k);});}); set("plot");
})();
})();

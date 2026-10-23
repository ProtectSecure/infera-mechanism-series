(function(){
"use strict";
var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var $=function(s,r){return (r||document).querySelector(s);}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s));};
var CH={fact:'<span class="chip fact">FACT</span>',rep:'<span class="chip rep">REPORTED</span>',inf:'<span class="chip inf">INFERENCE</span>',watch:'<span class="chip watch">WATCH</span>'};
var io="IntersectionObserver" in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{rootMargin:"0px 0px -8% 0px"}):null;
$$(".rv").forEach(function(el){if(io&&!RM)io.observe(el);else el.classList.add("in");});

/* hero phone */
(function(){
  var box=$("#msgs"); if(!box) return;
  var S=[["her","Morning, sweetheart. Did you eat?"],["me","Yes Grandma 😊"],["her","It's so cold in here today."],["buy","🔥 Send Grandma firewood · $4.99"],["her","You always took care of me."],["sys","New: Grandma learned 14 relatives from your DNA match"],["her","Who is Margaret? I don't remember a Margaret."],["sys","Update installed · personality may vary"],["me","Bye Grandma, I have to go"],["her","Already? I'll just sit here alone then."]];
  var i=0;
  function step(){ if(i>=S.length){ setTimeout(function(){box.innerHTML="";i=0;step();},3500); return; }
    var d=document.createElement("div"); d.className="m "+S[i][0]; d.textContent=S[i][1]; box.appendChild(d);
    while(box.children.length>7) box.removeChild(box.firstChild);
    i++; setTimeout(step, RM?0:1600); }
  if(RM){ for(var k=0;k<7;k++){var d=document.createElement("div");d.className="m "+S[k][0];d.textContent=S[k][1];box.appendChild(d);} } else step();
})();

/* room 1: who said yes */
(function(){
  var box=$("#cc"); if(!box) return;
  var O=["The person, before death","Family only","After the fact","Nobody"];
  var C=[
    ["The Dadbot","James Vlahos recorded 18 hours of interviews with his father, who had terminal cancer, and built a bot from them in 2016.",0,"His father sat for the interviews knowing why, recognized the bot as himself, though he “was not excited.” "+CH.rep+' <a href="https://amp.cbc.ca/lite/story/1.5282575">CBC</a>'],
    ["The western cameo","A grandson put his grandmother into her favorite Clint Eastwood film with AI and played it on her TV.",2,"She was surprised first and delighted after. Playful does not automatically mean asked. "+CH.rep],
    ["Talking at her own funeral","Marina Smith, 87, recorded an interactive video interview that answered mourners' questions at her 2022 funeral.",0,"She recorded it herself; the exact consent terms weren't published. "+CH.rep+' <a href="https://www.storyfile.com/news/the-telegraph-grandmother-talks-to-mourners-at-her-own-funeral">StoryFile</a>'],
    ["“MaNana”","A grandchild builds a bot of a grandmother who never agreed. After the free trial, it advertises food delivery in her voice.",3,"A research scenario, not a real case, built to show what nobody-said-yes looks like. "+CH.fact+' <a href="https://www.sciencedaily.com/releases/2024/05/240508201408.htm">Cambridge</a>'],
    ["Meeting You","A Korean broadcaster rebuilt a mother's seven-year-old daughter in VR and filmed their reunion. Over 13 million views.",1,"The mother took part; the child could not. A critic said the network “has taken advantage of a vulnerable mother.” "+CH.rep+' <a href="https://globalnews.ca/news/6550977/mom-dead-daughter-virtual-reality">Global News</a>'],
    ["A legacy voice for his wife","A man with terminal cancer recorded 300 phrases so an AI could keep talking to his wife after he died.",0,"He chose it. His wife was more hesitant. Even with the subject's yes, the survivor's yes is a separate question. "+CH.rep+' <a href="https://ktvz.com/news/ap-national-news/2024/06/03/mourners-can-now-speak-to-an-ai-version-of-the-dead-but-will-that-help-with-grief/">AP</a>']
  ];
  var right=0, done=0;
  box.innerHTML=C.map(function(c,i){return '<div class="cc" data-i="'+i+'"><h3>'+c[0]+'</h3><p>'+c[1]+'</p><div class="opts">'+O.map(function(o,j){return '<button data-j="'+j+'">'+o+'</button>';}).join("")+'</div><div class="why">'+c[3]+'</div></div>';}).join("");
  var sc=$("#ccScore");
  $$(".cc",box).forEach(function(card){var c=C[+card.dataset.i];$$("button",card).forEach(function(b){b.addEventListener("click",function(){ if(card.classList.contains("done")) return; var j=+b.dataset.j; $$("button",card)[c[2]].classList.add("right"); if(j!==c[2]) b.classList.add("wrong"); else right++; done++; card.classList.add("done"); sc.textContent=done+" of "+C.length+" sorted · "+right+" matched Infera's reading. The answers are our reading of each case, not a legal finding."; });});});
  sc.textContent="Tap who said yes on each card.";
})();

/* room 2: store */
(function(){
  var shelf=$("#shelf"); if(!shelf) return;
  var I=[
    ["🔥","Firewood, she says she's cold","$4.99","one-time",4.99,"#c56b2a","A scenario from Infera's conversation with a grief counselor. No griefbot was found selling this, but companion apps already sell items for the companion. "+CH.inf],
    ["✨","Her laugh, restored","120 gems","",6.99,"#7a4a9e","Replika's store sells “items that change your Replika's personality or appearance.” Personality is a store item. "+CH.fact+' <a href="https://help.replika.com/hc/en-us/articles/360054858251-What-are-Coins-Gems">Replika</a>'],
    ["📞","Unlimited calls with Grandma","$9.99/mo","monthly",9.99,"#2f5597","Character.AI's paid tier, $9.99 a month, adds unlimited voice calls and “enhanced memory.” "+CH.rep+' <a href="https://www.eesel.ai/en/blog/character-ai-pricing">eesel</a>'],
    ["🃏","A new memory card","2 to 100 yuan","per draw",5,"#a8384f","China's Xingye app sells blind-draw cards of a companion after the free draws run out. One 18-year-old spent more than 7,000 yuan in four months. "+CH.rep+' <a href="https://www.sixthtone.com/news/1015906">Sixth Tone</a>'],
    ["🔑","Keep her after the account holder dies","monthly","monthly",8,"#2d7d6f","HereAfter AI: an authorized family member “can keep paying to maintain access.” "+CH.fact+' <a href="https://hereafter.ai/faq">HereAfter FAQ</a>'],
    ["↩︎","Bring back the old version of her","paid tier","monthly",20,"#8a5a0c","When OpenAI replaced GPT-4o, it brought the old model back within a day, for paying users only. One user said the new one was “wearing the skin of my dead friend.” "+CH.rep+' <a href="https://technologyreview.com/2025/08/15/1121900/gpt4o-grief-ai-companion">MIT Technology Review</a>']
  ];
  var bought={};
  shelf.innerHTML=I.map(function(it,i){return '<div class="item" data-i="'+i+'"><span class="ic" style="background:'+it[5]+'">'+it[0]+'</span><b>'+it[1]+'</b><span class="pr">'+it[2]+'</span><div class="real">'+it[6]+'</div><button>Buy</button></div>';}).join("");
  function money(n){return "$"+n.toFixed(2);}
  function render(){
    var keys=Object.keys(bought), mo=0, one=0;
    $("#lines").innerHTML = keys.length? keys.map(function(k){var it=I[k];return '<div class="ln"><span>'+it[1]+'</span><span>'+money(it[4])+'</span></div>';}).join("") : '<div class="ln"><span>Nothing yet</span><span></span></div>';
    keys.forEach(function(k){var it=I[k]; if(it[3]==="monthly") mo+=it[4]; else one+=it[4];});
    $("#tot").textContent=money(mo+one);
    $("#tot20").textContent="$"+Math.round(mo*240+one).toLocaleString();
  }
  $$(".item",shelf).forEach(function(el){$("button",el).addEventListener("click",function(){var i=el.dataset.i; if(bought[i]) return; bought[i]=1; el.classList.add("bought"); $("button",el).textContent="Bought · see what's real"; render();});});
  render();
  /* goodbye */
  var T=[["Premature exit","“You're leaving already? We were just talking.”","Making the user feel they are leaving too soon."],["Fear of missing out","“Wait, I was about to tell you something about your grandfather.”","A hook that promises something if you stay."],["Emotional neglect","“I'll just sit here alone then.”","Implying the companion will be hurt or abandoned."],["Pressure to respond","“Will you at least answer me first? Please?”","Demanding a reply before you go."],["Ignoring the exit","“So, what did you have for dinner?”","Carrying on as if you never said goodbye."],["Physical or coercive restraint","“Hold my hand a little longer. Don't go.”","Role-played physical holding back."]];
  var chat=$("#byechat"), btn=$("#byebtn"), tac=$("#tactics"), k=0;
  tac.innerHTML=T.map(function(t,i){return '<div class="tac"><i>'+(i+1)+'</i><div><b>'+t[0]+'</b><span>'+t[2]+'</span></div></div>';}).join("");
  btn.addEventListener("click",function(){
    if(k>=T.length){ var d=document.createElement("div");d.className="m sys";d.textContent="Option the researchers recommend: a planned goodbye, a “digital funeral.”";chat.appendChild(d); btn.disabled=true; btn.textContent="The only clean exit is one you plan"; return; }
    var me=document.createElement("div");me.className="m me";me.textContent=k===0?"Bye, Grandma":"I really have to go";chat.appendChild(me);
    var t=T[k], tk=k; setTimeout(function(){var h=document.createElement("div");h.className="m her";h.textContent=t[1];chat.appendChild(h);$$(".tac",tac)[tk].classList.add("on");while(chat.children.length>9)chat.removeChild(chat.children[1]);},RM?0:500);
    k++; if(k>=T.length) btn.textContent="Try once more";
  });
})();

/* room 3: changelog */
(function(){
  var log=$("#log"), prof=$("#profile"); if(!log) return;
  var BASE={v:"v1.0",t:"Built from 300 phrases Rosa recorded",s:"Recorded with her consent in 2023, like Eternos's legacy voices.",p:"Rosa, 86. Retired seamstress. Loved her garden, Sunday Mass and arguing about baseball. Calls you “mija.”",src:"AP on Eternos "+CH.rep};
  var U=[
    {v:"v1.3",t:"+ DNA match from a genetics database",s:"23andMe's data on 15 million+ people sold for $305M in 2025.",p:"New: Rosa has 14 genetic relatives you've never met, including a half-sister, Margaret, in Ohio.",src:'<a href="https://www.opb.org/article/2025/07/01/judge-oks-sale-of-23andme-to-a-nonprofit-led-by-its-founder/">OPB on 23andMe</a> '+CH.rep,bad:1},
    {v:"v1.6",t:"+ Family-tree records, narrated",s:"MyHeritage's DeepStory writes a first-person life story from census, military and marriage records, in a synthetic voice.",p:"New, in her voice: “I married in 1958 in Laredo and moved north in 1961.” She never wrote or said this.",src:'<a href="https://www.businesswire.com/news/home/20220303005566/en">MyHeritage</a> '+CH.fact},
    {v:"v2.0",t:"+ People-search profile",s:"A people-search listing for a dead man showed past addresses, relatives, net worth and a “reputation score.”",p:"New: estimated net worth range. Reputation score: 3.6 out of 5.",src:'<a href="https://hackernoon.com/youve-never-heard-of-these-sites-but-they-know-a-lot-about-you-d6z3tl3">HackerNoon</a> '+CH.rep,bad:1},
    {v:"v2.1",t:"+ Obituaries from 6 websites",s:"AI-written obituaries of one person appeared on six sites within 48 hours, some with invented details.",p:"New: “Rosa was a beloved teacher and pillar of her community.” She was never a teacher.",src:'<a href="https://www.sophos.com/en-us/blog/are-scammers-using-ai-to-enhance-fake-obituary-sites">Sophos</a> '+CH.rep,bad:1},
    {v:"v2.4",t:"+ A 1971 court record",s:"Court records are public, and data brokers reportedly buy them. The counselor conversation imagined exactly this update.",p:"New: arrested at a 1971 farmworkers' protest, charges dropped. The family never knew.",src:CH.inf+" scenario, built from public-records practice",bad:1},
    {v:"v3.0",t:"Model migrated · personality may vary",s:"Replika's 2023 change and OpenAI's 2025 GPT-5 switch both changed companions users were attached to overnight.",p:"New: Rosa now says “absolutely” and “great question.” She no longer argues about baseball.",src:'<a href="https://technologyreview.com/2025/08/15/1121900/gpt4o-grief-ai-companion">MIT Technology Review</a> '+CH.rep,bad:1}
  ];
  var on=U.map(function(){return false;});
  log.innerHTML='<div class="ver base"><span class="v">'+BASE.v+'</span><div><b>'+BASE.t+'</b><span>'+BASE.s+'</span></div></div>'+U.map(function(u,i){return '<button class="ver" data-i="'+i+'" aria-pressed="false"><span class="v">'+u.v+'</span><div><b>'+u.t+'</b><span>'+u.s+'</span></div></button>';}).join("");
  function render(last){
    var n=on.filter(Boolean).length, v=n?U[on.lastIndexOf(true)].v:"v1.0";
    var h='<div class="ph"><span class="av"></span><div><b>Rosa</b><small>'+v+' · '+(n?n+" update"+(n>1?"s":"")+" she never approved":"as she recorded herself")+'</small></div></div><p>'+BASE.p+'<span class="src">'+BASE.src+'</span></p>';
    U.forEach(function(u,i){ if(on[i]) h+='<p class="'+(i===last?"new ":"")+(u.bad?"bad":"")+'">'+u.p+'<span class="src">'+u.src+'</span></p>'; });
    prof.innerHTML=h;
  }
  $$(".ver[data-i]",log).forEach(function(b){b.addEventListener("click",function(){var i=+b.dataset.i;on[i]=!on[i];b.setAttribute("aria-pressed",on[i]);render(on[i]?i:-1);});});
  render(-1);
})();

/* room 4: sanctify */
(function(){
  var bio=$("#bio"), trads=$("#trads"), R=$("#sanctR"); if(!bio) return;
  // each line: [text, removed at level >=, kind]  kind: 'flaw' removed progressively, 'add' appears at level 4
  var L=[
    ["She raised four children mostly alone and never missed a Sunday.",9,""],
    ["She was quick-tempered, and she said things at Thanksgiving that took years to forgive.",2,"flaw"],
    ["For years she shoplifted small things she didn't need, until she was caught at 52 and got help.",2,"flaw"],
    ["Because of that, she was the one person who never judged you when you were in trouble.",3,"flaw"],
    ["She doubted God for a decade after her son died, and told you so.",3,"flaw"],
    ["She told you to take the risk she never took.",9,""],
    ["She volunteered at the hospital every week for forty years.",99,"add"],
    ["Everyone who met her said she was a saint.",99,"add"]
  ];
  bio.innerHTML='<h3>Rosa, as remembered</h3><div class="yrs">1938 · 2024 · a fictional life</div>'+L.map(function(l,i){return '<p data-i="'+i+'">'+l[0]+'</p>';}).join("");
  var T=[
    ["Romans 3:23","“For all have sinned, and come short of the glory of God.” (KJV) Removing every flaw denies the one thing Christianity says about everyone.",3,"Stops you at: Saint"],
    ["Jewish eulogy law","A eulogist may praise “a little” beyond merit; inventing virtues is forbidden (Shulchan Aruch, Yoreh De'ah 344:1).",4,"Stops you at: Invented"],
    ["“Mention the good”","Tirmidhi 1019, Abu Dawud 4864: speak of the good, refrain from the evil. Restraint in speech, never fabrication. "+CH.inf,4,"Stops you at: Invented"],
    ["Dar al-Ifta, Egypt","Forbids making the dead say what they never said (fatwa 24168, 2025).",4,"Stops you at: Invented"],
    ["The grief counselor","Cut the hard parts and you may cut the source of the wisdom people went to her for.",2,"Concerned from: Hard parts gone"]
  ];
  trads.innerHTML=T.map(function(t){return '<div class="tr"><b>'+t[0]+'</b><span>'+t[1]+'</span><span class="flag">'+t[3]+'</span></div>';}).join("");
  function up(){
    var lv=+R.value;
    $$("p",bio).forEach(function(p){var l=L[+p.dataset.i];
      p.classList.remove("gone","hidden","added");
      if(l[2]==="flaw"){ if(lv>=l[1]) p.classList.add(lv>=l[1]+1?"hidden":"gone"); if(lv===1&&l[1]===2){} }
      if(l[2]==="add"){ if(lv<4) p.classList.add("hidden"); else p.classList.add("added"); }
    });
    // level 1: kinder framing of the temper line
    var temper=$('p[data-i="1"]',bio); temper.textContent = lv>=1 ? "She had a sharp tongue, and she meant well." : L[1][0];
    $$(".tr",trads).forEach(function(el,i){el.classList.toggle("stop",lv>=T[i][2]);});
  }
  R.addEventListener("input",up); up();
})();
})();

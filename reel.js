
  /* ---------- reels and title-card reveals ---------- */
  (function(){
    var CRED={};
    try{fetch("assets/plates/credits.json").then(function(r){return r.ok?r.json():null}).then(function(j){if(j){CRED=j;$$(".reel .slide").forEach(function(s){var k=s.dataset.plate;var c=CRED[k];var el=$(".cr",s);if(el&&c&&c.credit)el.textContent=c.credit})}}).catch(function(){})}catch(e){}
    function wrapWords(el){ // wrap text nodes in spans, leave tags (sup, em, b) intact
      var walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null);var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);var i=0;
      nodes.forEach(function(t){if(t.parentNode.closest&&t.parentNode.closest("sup"))return;var parts=t.nodeValue.split(/(\s+)/);var frag=document.createDocumentFragment();parts.forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){frag.appendChild(document.createTextNode(p));return}var s=document.createElement("span");s.className="w";s.style.transitionDelay=Math.min(1400,i*28)+"ms";s.textContent=p;frag.appendChild(s);i++});t.parentNode.replaceChild(frag,t)})}
    // Auto-reel: group consecutive prose paragraphs in chapter stacks into slides, splitting long ones at sentences
    function splitSentences(p,max){var html=p.innerHTML;var parts=html.split(/(?<=[.!?”"])\s+(?=[A-Z<“"(])/);var out=[],cur="";parts.forEach(function(s){var words=(cur+" "+s).replace(/<[^>]+>/g,"").split(/\s+/).length;if(cur&&words>max){out.push(cur);cur=s}else cur=cur?cur+" "+s:s});if(cur)out.push(cur);return out}
    $$(".chapter").forEach(function(ch){
      var key=null;var pl=$(".plate",ch);if(pl)key=pl.dataset.plate;
      $$(".stack",ch).forEach(function(st){
        var ps=$$(":scope > p",st).filter(function(p){return !p.classList.contains("lead")&&!p.classList.contains("pull")&&!p.classList.contains("eyebrow")});
        if(ps.length<1)return;
        var extra=(st.dataset.reel||"").split(",").map(function(x){return x.trim()}).filter(Boolean);
        var slides=[];ps.forEach(function(p){var chunks=splitSentences(p,60);chunks.forEach(function(h){slides.push({html:h})})});
        if(slides.length<2)return;
        var reel=document.createElement("div");reel.className="reel";var vp=document.createElement("div");vp.className="vp";reel.appendChild(vp);
        var keys=extra.length?extra:(key?[key]:[]);
        slides.forEach(function(s,i){var d=document.createElement("div");d.className="slide";var k=keys.length?keys[i%keys.length]:null;if(k)d.dataset.plate=k;
          var bg=document.createElement("div");bg.className="bg"+(k?"":" none");if(k){var im=document.createElement("img");im.src="assets/plates/"+k+".jpg";im.alt="";im.loading="lazy";im.addEventListener("error",function(){bg.className="bg none";bg.innerHTML=""});bg.appendChild(im)}d.appendChild(bg);
          var cr=document.createElement("span");cr.className="cr";cr.textContent=k&&CRED[k]&&CRED[k].credit?CRED[k].credit:"";d.appendChild(cr);
          var kk=document.createElement("div");kk.className="k";kk.textContent=(i+1)+" / "+slides.length;d.appendChild(kk);
          var tx=document.createElement("div");tx.className="tx";tx.innerHTML=s.html;d.appendChild(tx);vp.appendChild(d)});
        var nav=document.createElement("div");nav.className="nav";nav.innerHTML='<button class="pv" aria-label="Previous">‹</button><div class="dots" role="tablist"></div><span class="ct"></span><button class="nx" aria-label="Next">›</button>';reel.appendChild(nav);
        ps[0].parentNode.insertBefore(reel,ps[0]);ps.forEach(function(p){p.remove()});
        init(reel)})});
    function init(reel){var slides=$$(".slide",reel),dots=$(".dots",reel),ct=$(".ct",reel),i=0;slides.forEach(function(s,j){wrapWords($(".tx",s));var d=document.createElement("i");d.setAttribute("role","tab");d.addEventListener("click",function(){go(j)});dots.appendChild(d)});
      function go(n){i=(n+slides.length)%slides.length;slides.forEach(function(s,j){s.classList.toggle("on",j===i)});$$("i",dots).forEach(function(d,j){d.classList.toggle("on",j===i)});ct.textContent=(i+1)+" of "+slides.length}
      $(".pv",reel).addEventListener("click",function(){go(i-1)});$(".nx",reel).addEventListener("click",function(){go(i+1)});
      $(".vp",reel).addEventListener("click",function(e){if(e.target.closest("a"))return;go(i+1)});
      reel.tabIndex=0;reel.addEventListener("keydown",function(e){if(e.key==="ArrowRight"){go(i+1);e.preventDefault()}if(e.key==="ArrowLeft"){go(i-1);e.preventDefault()}});
      var x0=null;reel.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});reel.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(dx<0?i+1:i-1);x0=null});
      go(0)}
    $$(".reel[data-authored]").forEach(init);
    // title-card reveals on leads and pull quotes
    var rv=$$(".lead, .pull");rv.forEach(function(p){p.classList.add("rv");wrapWords(p)});
    if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}})},{rootMargin:"0px 0px -10% 0px"});rv.forEach(function(p){io.observe(p)})}else rv.forEach(function(p){p.classList.add("on")});
  })();

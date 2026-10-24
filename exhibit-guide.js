/* Infera · shared exhibit guide: "Read the argument" route toggle. Without JS the argument stays visible. */
(function(){
  document.querySelectorAll('.xg').forEach(function(x){
    var b=x.querySelector('[data-xg-toggle]'), a=x.querySelector('.xg-arg');
    if(!b||!a) return;
    a.hidden=true; b.hidden=false; b.setAttribute('aria-expanded','false');
    b.addEventListener('click',function(){
      var open=a.hidden; a.hidden=!open; b.setAttribute('aria-expanded',String(open));
      b.querySelector('.xg-bl').textContent=open?'Hide the argument':'Read the argument';
      if(open){ try{ a.querySelector('li a, li b').scrollIntoView({block:'nearest',behavior:'smooth'}); }catch(e){} }
    });
  });
})();

/* Infera · Faith Layer thread. Remembers, in this browser only, which exhibits a reader has visited
   and the charter clauses they chose. Nothing is sent anywhere. Every call is wrapped so the pages
   work when storage is blocked. */
(function(){
  var P='infera.faith.', MAP={'the-quiet-guest':'01','guardian-angel-inc':'02','check-in':'03','the-companion-confessor':'04','inferred-faith':'05','the-second-death':'06','the-pulpit-feed':'07','babel-or-pentecost':'08','a-palace-in-time':'09'};
  function get(k,d){try{var v=localStorage.getItem(P+k);return v==null?d:JSON.parse(v);}catch(e){return d;}}
  function set(k,v){try{localStorage.setItem(P+k,JSON.stringify(v));}catch(e){}}
  function forget(){try{Object.keys(localStorage).forEach(function(k){if(k.indexOf(P)===0)localStorage.removeItem(k);});}catch(e){}}
  var slug=(location.pathname.split('/').pop()||'').replace(/\.html$/,'');
  var num=MAP[slug];
  if(num){var v=get('visited',[]);if(v.indexOf(num)<0){v.push(num);set('visited',v);}}
  window.InferaFaith={get:get,set:set,forget:forget,visited:function(){return get('visited',[]);},clause:function(n,v){if(v===undefined)return get('clause.'+n,null);set('clause.'+n,v);}};
})();

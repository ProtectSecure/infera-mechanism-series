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

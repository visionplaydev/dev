/* 비전 개발 서비스 — 공유 JS (/dev/ + /dev/contact/) */
(function(){
  // header scrolled state
  var header=document.querySelector('.site-header');
  if(header){
    var onScroll=function(){ header.classList.toggle('scrolled', window.scrollY>10); };
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  }

  // mobile menu
  var tgl=document.querySelector('.nav-toggle'), menu=document.querySelector('.mobile-menu');
  if(tgl && menu){
    tgl.addEventListener('click',function(){
      var open=tgl.getAttribute('aria-expanded')==='true';
      tgl.setAttribute('aria-expanded',String(!open));
      menu.hidden=open;
    });
    menu.addEventListener('click',function(e){ if(e.target.tagName==='A'){menu.hidden=true;tgl.setAttribute('aria-expanded','false');} });
  }

  // stars
  var s=document.getElementById('stars');
  if(s){var html='';for(var i=0;i<46;i++){var sz=(Math.random()*2+1).toFixed(1);html+='<span class="star-dot" style="left:'+(Math.random()*100).toFixed(2)+'%;top:'+(Math.random()*100).toFixed(2)+'%;width:'+sz+'px;height:'+sz+'px;animation-delay:'+(Math.random()*4).toFixed(2)+'s"></span>';}s.innerHTML=html;}

  // scroll reveal
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  // light content protection (form fields exempt)
  var isField=function(t){return t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable);};
  document.addEventListener('contextmenu',function(e){if(!isField(e.target))e.preventDefault();});
  document.addEventListener('dragstart',function(e){if(!isField(e.target))e.preventDefault();});
  document.addEventListener('keydown',function(e){
    var k=(e.key||'').toLowerCase();
    if(e.key==='F12'){e.preventDefault();return;}
    if((e.ctrlKey||e.metaKey)&&(k==='u'||k==='s')){e.preventDefault();return;}
    if((e.ctrlKey||e.metaKey)&&e.shiftKey&&(k==='i'||k==='j'||k==='c')){e.preventDefault();}
  });

  // custom indigo cursor ripple — 클릭 가능한 곳 위에서 커서 팁에서 링이 퍼짐 (터치기기 제외). 스타일은 dev.css
  if(!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches)){
    var _ring=document.createElement('div');
    _ring.className='cursor-ripple';
    document.body.appendChild(_ring);
    var _cOn=false;
    var _cSel='a[href],button,[role="button"],select,summary,label,.btn,.nav-toggle,.file-btn,.rm,.consent';
    // pseudo 링 상시 마운트+상시 애니(dev.css)로 컴포지터 레이어 로드시 워밍 → 첫 hover 콜드스타트 없음. 초기 위치만 화면 밖.
    _ring.style.transform='translate3d(-100px,-100px,0)';
    // mousemove = rAF 스로틀 + transform 이동(left/top 리플로우 제거)
    var _lastE=null,_raf=0;
    var _paint=function(){
      _raf=0;
      var e=_lastE; if(!e) return;
      _ring.style.transform='translate3d('+e.clientX+'px,'+e.clientY+'px,0)';
      var el=(e.target&&e.target.closest)?e.target.closest(_cSel):null;
      var clickable=!!el && !el.disabled && el.getAttribute('aria-disabled')!=='true';
      if(clickable!==_cOn){ _cOn=clickable; _ring.classList.toggle('on',_cOn); }
    };
    document.addEventListener('mousemove',function(e){
      _lastE=e;
      if(!_raf) _raf=requestAnimationFrame(_paint);
    },{passive:true});
    document.addEventListener('mouseleave',function(){ _cOn=false; _ring.classList.remove('on'); });
  }
})();

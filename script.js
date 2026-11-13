(function(){
  var c=document.getElementById('net'),x=c.getContext('2d'),pts=[],W,H,dpr=Math.min(window.devicePixelRatio||1,2);
  var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size(){
    W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.round(W*H/14000);pts=[];
    for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:1.2+Math.random()*2.2});
  }
  function draw(){
    x.clearRect(0,0,W,H);
    var D=190;
    for(var i=0;i<pts.length;i++){
      var a=pts[i];
      for(var j=i+1;j<pts.length;j++){
        var b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<D){x.strokeStyle='rgba(150,160,180,'+(0.22*(1-d/D))+')';x.lineWidth=1;
          x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke();}
      }
    }
    for(var k=0;k<pts.length;k++){
      var p=pts[k];x.fillStyle='rgba(150,160,180,.4)';
      x.beginPath();x.arc(p.x,p.y,p.r,0,6.2832);x.fill();
      if(!still){p.x+=p.vx;p.y+=p.vy;
        if(p.x<-20)p.x=W+20;if(p.x>W+20)p.x=-20;if(p.y<-20)p.y=H+20;if(p.y>H+20)p.y=-20;}
    }
    if(!still)requestAnimationFrame(draw);
  }
  size();draw();
  var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(function(){size();if(still)draw();},150)});
})();

addEventListener('keydown',function(e){
  if(e.key==='`'||e.code==='Backquote'){e.preventDefault();location.replace('https://www.google.com/');}
});

// Navbar Up & Down Controls
var navbar=document.getElementById('navbar');
var upBtn=document.getElementById('upBtn');
var downBtn=document.getElementById('downBtn');

if(navbar && upBtn && downBtn){
  upBtn.addEventListener('click',function(){
    navbar.classList.add('nav-hidden');
  });
  downBtn.addEventListener('click',function(){
    navbar.classList.remove('nav-hidden');
  });
}

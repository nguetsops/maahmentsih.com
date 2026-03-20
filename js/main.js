// === NAV hide/show on scroll ===
!function(){var n=document.querySelector(".nav");if(!n)return;var ly=0,t=false;window.addEventListener("scroll",function(){if(!t){window.requestAnimationFrame(function(){var y=window.scrollY;y>80&&y>ly?n.classList.add("hidden"):n.classList.remove("hidden");ly=y;t=false});t=true}})}();

// === Scroll reveal ===
!function(){var els=document.querySelectorAll(".reveal");if(!els.length)return;var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}})},{threshold:.02});els.forEach(function(el){obs.observe(el)})}();

// === Lightbox ===
function openLightbox(el){var img=el.querySelector?el.querySelector("img"):el;if(!img||!img.src)return;document.getElementById("lb-img").src=img.src;document.getElementById("lightbox").classList.add("open");document.body.style.overflow="hidden"}
function closeLightbox(){var lb=document.getElementById("lightbox");if(lb){lb.classList.remove("open");document.body.style.overflow=""}}
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeLightbox()});

// === Tree node click → navigate to family card ===
document.querySelectorAll("[data-fam]").forEach(function(node){
  node.addEventListener("click",function(e){
    e.stopPropagation();
    var famId=this.getAttribute("data-fam");
    var card=document.getElementById(famId);
    if(!card){return}
    if(!card.classList.contains("open"))card.classList.add("open");
    card.scrollIntoView({behavior:"smooth",block:"center"});
    card.style.borderColor="var(--gold)";
    setTimeout(function(){card.style.borderColor=""},1500);
  });
});

// === Livre d'or ===
var SK="memorial_mentsih_msgs";
function getMsgs(){try{return JSON.parse(localStorage.getItem(SK)||"[]")}catch(e){return[]}}
function saveMsgs(m){try{localStorage.setItem(SK,JSON.stringify(m))}catch(e){}}
function renderMsgs(){var l=document.getElementById("msg-list");if(!l)return;var ms=getMsgs();if(!ms.length){l.innerHTML="";return}l.innerHTML=ms.map(function(m){return'<div class="msg-item"><div class="msg-author">'+esc(m.name)+'</div><div class="msg-date">'+m.date+'</div><div class="msg-text">'+esc(m.text)+'</div></div>'}).join("")}
function submitMsg(){var ne=document.getElementById("msg-name"),te=document.getElementById("msg-text");if(!ne||!te)return;var n=ne.value.trim(),t=te.value.trim();if(!n||!t)return;var ms=getMsgs();ms.unshift({name:n,text:t,date:new Date().toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"})});saveMsgs(ms);ne.value="";te.value="";renderMsgs()}
function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML}
renderMsgs();

// === Share buttons ===
!function(){var u=window.location.origin||window.location.href;var t="Hommage à la Reine Mère Maah Mentsih Tsobgni Marie Claire — Obsèques du 24 au 27 juin 2026 à Miatsuet, Bafou.";var wa=document.getElementById("sh-wa");if(wa)wa.href="https://wa.me/?text="+encodeURIComponent(t+"\n\n"+u);var sms=document.getElementById("sh-sms");if(sms)sms.href="sms:?body="+encodeURIComponent(t+" "+u);var fb=document.getElementById("sh-fb");if(fb)fb.href="https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(u)}();
function copyLink(e){e.preventDefault();navigator.clipboard.writeText(window.location.origin||window.location.href).then(function(){var b=document.getElementById("sh-copy");if(!b)return;var o=b.innerHTML;b.innerHTML="✓ Copié !";setTimeout(function(){b.innerHTML=o},2000)})}

// === Mobile menu toggle with X ===
var toggle=document.getElementById("nav-toggle");
if(toggle){toggle.addEventListener("click",function(){
  var nl=document.getElementById("nav-links");
  nl.classList.toggle("open");
  this.textContent=nl.classList.contains("open")?"✕":"☰";
})}
document.querySelectorAll(".nav-links a").forEach(function(a){a.addEventListener("click",function(){
  var nl=document.getElementById("nav-links");
  if(nl)nl.classList.remove("open");
  if(toggle)toggle.textContent="☰";
})});
// Close menu on scroll
window.addEventListener("scroll",function(){
  var nl=document.getElementById("nav-links");
  if(nl&&nl.classList.contains("open")){
    nl.classList.remove("open");
    if(toggle)toggle.textContent="☰";
  }
},{passive:true});

// === Nav active state ===
!function(){
  var path=window.location.pathname.replace(/\/$/,'');
  var links=document.querySelectorAll(".nav-links a");
  links.forEach(function(a){
    var href=a.getAttribute("href").replace(/\/$/,'');
    if(href==="/"||href===""){
      if(path===""||path==="/")a.classList.add("active");
    } else {
      if(path===href||path===href+"/index.html")a.classList.add("active");
    }
  });
}();

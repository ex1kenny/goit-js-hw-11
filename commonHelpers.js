import{i as l,S as u}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const c=document.querySelector(".custom-input"),d=document.querySelector(".custom-button"),p=document.querySelector(".gallery-container"),a=document.querySelector(".loading-overlay"),h="41491807-1b535ad0388c573d86abaf339",m=()=>{const s=new URL("https://pixabay.com/api/");return s.searchParams.append("key",h),s};function f(){const s=c.value.trim();if(p.innerHTML="",a.style.display="flex",s===""){l.error({title:"Something wrong",message:"Please enter a search term.",position:"topRight",progressBarColor:"rgb(255, 0, 0)"}),a.style.display="none";return}const r=m();r.searchParams.append("q",s),r.searchParams.append("image_type","photo"),r.searchParams.append("orientation","horizontal"),r.searchParams.append("safesearch","true"),fetch(r).then(o=>{if(o.ok)return o.json();throw new Error("Network response not ok")}).then(o=>{a.style.display="none",o.hits&&o.hits.length>0?(c.value="",g(o.hits)):l.info({title:"Something wrong",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",progressBarColor:"rgb(255, 0, 0)"})}).catch(o=>{a.style.display="none",l.error({title:"Something wrong",message:"Sorry, there was an error. Please try again.",position:"topRight",progressBarColor:"rgb(255, 0, 0)"})})}d.addEventListener("click",f);function g(s){const r=s.map(n=>`
        <a href="${n.largeImageURL}" class="image-card">
          <img src="${n.webformatURL}" alt="${n.tags}">
          <div class="image-info">
            <p>Likes: ${n.likes}</p>
            <p>Views: ${n.views}</p>
            <p>Comments: ${n.comments}</p>
            <p>Downloads: ${n.downloads}</p>
          </div>
        </a>
      `).join("");p.innerHTML=r,new u(".gallery-container a",{captionsData:"alt",captionsDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
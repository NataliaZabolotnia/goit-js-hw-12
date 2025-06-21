import{a as f,S as m,i as a}from"./assets/vendor-Dy2ZTtfi.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const p="50865810-65dd075ae8c3362400e1c5e2f";function y(t){return f("https://pixabay.com/api/",{params:{key:p,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(({data:r})=>r).catch(r=>{throw console.log(r),r})}function h(t){const r=document.querySelector(".gallery"),i=t.map(({webformatURL:s,largeImageURL:e,tags:o,likes:n,views:l,comments:u,downloads:d})=>`
      <li class="list-item">
      <a href="${e}">
      <img src="${s}" alt="${o}" width="360"/>
      </a>
       <div class="info">
            <p>Likes ${n}</p>
            <p>Views ${l}</p>
            <p>Comments ${u}</p>
            <p>Downloads ${d}</p>
        </div>
        
      </li>  
        `).join("");r.insertAdjacentHTML("beforeend",i),S.refresh()}function g(){const t=document.querySelector(".gallery");t.innerHTML=""}function L(){const t=document.querySelector(".loader");t&&t.classList.remove("hidden")}function q(){const t=document.querySelector(".loader");t&&t.classList.add("hidden")}const S=new m(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom"}),c=document.querySelector(".input-text"),b=document.querySelector(".form");b.addEventListener("submit",w);async function w(t){t.preventDefault();const r=c.value.trim();if(g(),L(),r===""){a.show({title:"Warning",color:"red",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}try{const i=await y(r);if(i.hits.length===0){a.show({title:"Hey",color:"red",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}h(i.hits)}catch(i){console.error("Fetch error:",i)}finally{q(),c.value=""}}
//# sourceMappingURL=index.js.map

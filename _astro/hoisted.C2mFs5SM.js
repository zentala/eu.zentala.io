import"./hoisted.CHl1yjyf.js";document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("algolia-search-input"),h=document.getElementById("initial-message"),u=document.getElementById("search-loading"),g=document.getElementById("search-results-list"),m=document.getElementById("search-no-results");if(!r||!h||!u||!g||!m){console.error("Search page elements not found");return}const c=h,n=u,a=g,i=m,E={search:async(t,e)=>({hits:[]})},d=new URLSearchParams(window.location.search).get("q");d&&(r.value=d,L(d));const p=document.querySelector(".algolia-search-wrapper");p&&p.addEventListener("keydown",t=>{if(t.key==="Enter"){t.preventDefault();const e=r.value.trim();if(e){const s=new URL(window.location.href);s.searchParams.set("q",e),window.history.pushState({},"",s),L(e)}}});const l=(t,e)=>{if(!e.trim())return t;try{const s=new RegExp(`(${e.trim().replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");return t.replace(s,'<span class="search-highlight">$1</span>')}catch{return t}},w=(t,e)=>{if(a.innerHTML="",t.length===0){c.classList.add("hidden"),n.classList.add("hidden"),a.classList.add("hidden"),i.classList.remove("hidden");return}c.classList.add("hidden"),n.classList.add("hidden"),i.classList.add("hidden"),a.classList.remove("hidden"),t.forEach(s=>{const o=document.createElement("div");o.className="search-result-item";const y=l(s.title||"Untitled",e),v=s.description?l(s.description,e):s.excerpt?l(s.excerpt,e):"";let f="";s.tags&&s.tags.length>0&&(f=`
            <div class="search-result-tags">
              ${s.tags.map($=>`
                <span class="search-result-tag">${$}</span>
              `).join("")}
            </div>
          `),o.innerHTML=`
          <a href="${s.slug}" class="block">
            <div class="search-result-title">${y}</div>
            ${v?`<div class="search-result-description">${v}</div>`:""}
            <div class="search-result-path">${s.slug}</div>
            ${f}
          </a>
        `,a.appendChild(o)})};async function L(t){if(!t.trim()){c.classList.remove("hidden"),n.classList.add("hidden"),a.classList.add("hidden"),i.classList.add("hidden");return}c.classList.add("hidden"),n.classList.remove("hidden"),a.classList.add("hidden"),i.classList.add("hidden");try{const{hits:e}=await E.search(t,{attributesToRetrieve:["title","description","excerpt","slug","tags"],hitsPerPage:20});w(e,t)}catch(e){console.error("Error searching:",e),n.classList.add("hidden"),i.classList.remove("hidden")}}});

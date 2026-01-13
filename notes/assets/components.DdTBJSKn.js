var yn=Object.defineProperty,vn=Object.defineProperties;var Sn=Object.getOwnPropertyDescriptors;var ie=Object.getOwnPropertySymbols;var Te=Object.prototype.hasOwnProperty,$e=Object.prototype.propertyIsEnumerable;var xe=(e,n,r)=>n in e?yn(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,P=(e,n)=>{for(var r in n||(n={}))Te.call(n,r)&&xe(e,r,n[r]);if(ie)for(var r of ie(n))$e.call(n,r)&&xe(e,r,n[r]);return e},F=(e,n)=>vn(e,Sn(n));var be=(e,n)=>{var r={};for(var o in e)Te.call(e,o)&&n.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&ie)for(var o of ie(e))n.indexOf(o)<0&&$e.call(e,o)&&(r[o]=e[o]);return r};var W=(e,n,r)=>xe(e,typeof n!="symbol"?n+"":n,r);var E=(e,n,r)=>new Promise((o,s)=>{var a=c=>{try{d(r.next(c))}catch(u){s(u)}},l=c=>{try{d(r.throw(c))}catch(u){s(u)}},d=c=>c.done?o(c.value):Promise.resolve(c.value).then(a,l);d((r=r.apply(e,n)).next())});import{r as i,j as t,R as Be,a as kn}from"./react-core.zo7RGMO7.js";import{p as Oe,i as He,s as Nn,b as J,a as Ue,c as We,d as pe,e as Ee,f as Ce,g as Me,m as ne,n as En,h as Pe,j as Cn,l as Fe,k as oe,o as Mn,q as Rn,r as In,t as An,u as Tn,v as $n,w as Pn,x as Fn}from"./ui-libs.DszMR8z7.js";import{d as Ln,u as Q,c as zn,C as Dn,S as _n,a as Bn,b as L,t as ce,D as On,e as we,f as Hn,P as Un,E as ge,g as Wn,h as qn,m as Gn,i as qe}from"./vendor.Cl4_iSFc.js";const Vn={production:"https://mdfriday.sunwei.xyz"},_=Vn.production,G={IMAGES:`${_}/api/images`,IMAGE_SEARCH:`${_}/api/image/search`,IMAGE_TAGS:`${_}/api/image/tags`,SHORTCODES:`${_}/api/scs`,SHORTCODE_SEARCH:`${_}/api/sc/search`,SHORTCODE_TAGS:`${_}/api/sc/tags`,SHORTCODE_DETAILS:`${_}/api/sc`},de={type:"Image",count:10,offset:0,order:"desc"},K={type:"ShortCode",count:10,offset:0,order:"desc"},je=new Map;class ue extends Error{constructor(r,o){super(r);W(this,"status");this.status=o,this.name="ApiError"}}function Jn(e,n){if(!n)return e;const r=new URLSearchParams;Object.entries(n).forEach(([s,a])=>{a!==void 0&&r.append(s,String(a))});let o=r.toString();if(n.q){const s=`q=${encodeURIComponent(String(n.q))}`,a=new RegExp("q=[^&]*");o=o.replace(a,s)}return o?`${e}?${o}`:e}function he(r){return E(this,arguments,function*(e,n={}){var u;const c=n,{params:o,disableCache:s=!1}=c,a=be(c,["params","disableCache"]),l=Jn(e,o),d=new Headers(a.headers||{});!d.has("Content-Type")&&!((u=a.method)!=null&&u.toUpperCase().includes("GET"))&&d.set("Content-Type","application/json"),!s&&je.has(l)&&d.set("If-None-Match",je.get(l));try{const h=yield fetch(l,F(P({},a),{headers:d})),f=h.headers.get("Etag");if(f&&je.set(l,f),h.status===304){const x=localStorage.getItem(`api_cache_${l}`);if(x)return JSON.parse(x);console.log(`Received 304 but no cached data for URL: ${l}`)}if(!h.ok)throw new ue(`API request failed: ${h.statusText}`,h.status);if(h.status===204)return{};const b=yield h.text();if(!b)return console.error(`Empty response body for URL: ${l}`),{};try{const x=JSON.parse(b);return!s&&h.ok&&localStorage.setItem(`api_cache_${l}`,JSON.stringify(x)),x}catch(x){throw console.error(`Error parsing JSON for URL: ${l}`,b,x),new ue(`Invalid JSON response: ${x.message}`,h.status)}}catch(h){throw h instanceof ue?h:(console.error(`Network error for URL: ${l}`,h),new ue(`Network error: ${h.message}`,0))}})}const q={get:(e,n={})=>he(e,F(P({},n),{method:"GET"})),post:(e,n,r={})=>he(e,F(P({},r),{method:"POST",body:JSON.stringify(n)})),put:(e,n,r={})=>he(e,F(P({},r),{method:"PUT",body:JSON.stringify(n)})),delete:(e,n={})=>he(e,F(P({},n),{method:"DELETE"}))};function Ge(e,n,r,o){const s=e/n;let a=r,l=o;return s>1?(l=a/s,l>o&&(l=o,a=l*s)):(a=l*s,a>r&&(a=r,l=a/s)),{width:Math.round(a),height:Math.round(l)}}function Yn({id:e,assetUrl:n,width:r,height:o,maxWidth:s=300,maxHeight:a=300}){if(n.startsWith("http"))return n;const l=n.startsWith("/")?n.substring(1):n;return Ge(r,o,s,a),`${_}/${l}`}function Qn(e,n,r,o,s=300,a=200){const l=Ve(n),{width:d,height:c}=Ge(r,o,s,a);return{url:l,displayWidth:d,displayHeight:c}}function Ve(e){if(e.startsWith("http"))return e;const n=e.startsWith("/")?e:`/${e}`;return`${_}${n}`}function me(e){return{id:e.uuid,title:e.name,slug:e.slug,description:e.desc,template:e.template,example:e.example,tags:e.tags,asset:Ve(e.asset),thumbnail:Yn({id:e.id,assetUrl:e.asset,width:e.width,height:e.height}),width:e.width,height:e.height}}function Xn(e){return e.flat().filter(Boolean)}function Zn(e,n){const r=[];if(e.trim()){const s=e.trim(),a=[`name:${s}`,`slug:${s}`,`tags:${s}`];r.push(a.join(" OR ")),console.log("Added search term conditions:",a.join(" OR "))}if(n.length>0){const s=n.map(a=>`tags:${a}`).join(" OR ");r.push(s),console.log("Added tag filter conditions:",s)}let o="";return r.length>1?o=r.map(s=>`(${s})`).join(" AND "):o=r[0]||"",console.log("Final constructed query:",o),o}const ke={fetchShortcodes(){return E(this,arguments,function*(e=1,n=K.count,r=[],o=""){return this.searchShortcodes(e,n,o,r)})},searchShortcodes(){return E(this,arguments,function*(e=1,n=K.count,r="",o=[]){const s=e-1;try{console.log("Searching shortcodes with:",{page:e,limit:n,searchTerm:r,selectedTags:o});const a=r.trim()!==""||o.length>0;let l;const d={type:K.type,count:n,offset:s,order:K.order};if(a){const h=Zn(r,o);if(h){const f=F(P({},d),{q:h});console.log("Search query:",h),console.log("Search params:",f),l=yield q.get(G.SHORTCODE_SEARCH,{params:f})}else console.log("Empty search query, using regular endpoint"),l=yield q.get(G.SHORTCODES,{params:d})}else l=yield q.get(G.SHORTCODES,{params:d});if(!l||!l.data)return console.error("Invalid API response:",l),{shortcodes:[],hasMore:!1};const c=l.data.map(h=>{try{return me(h)}catch(f){return console.error("Error mapping API shortcode:",h,f),null}}).filter(Boolean),u=c.length===n;return console.log(`Fetched ${c.length} shortcodes, hasMore: ${u}`),{shortcodes:c,hasMore:u}}catch(a){return console.error("Error searching shortcodes:",a),{shortcodes:[],hasMore:!1}}})},fetchAllTags(){return E(this,null,function*(){try{console.log("Fetching all shortcode tags");const e={type:K.type},n=yield q.get(G.SHORTCODE_TAGS,{params:e});return!n||!n.data?(console.error("Invalid API response for tags:",n),[]):Array.isArray(n.data)?Xn(n.data):(console.error("Tags data is not an array:",n.data),[])}catch(e){return console.error("Error fetching tags:",e),[]}})},fetchShortcodeById(e){return E(this,null,function*(){try{console.log(`Fetching shortcode with ID: ${e}`);const n={type:K.type,id:e,status:void 0},r=yield q.get(G.SHORTCODE_DETAILS,{params:n});return console.log("Shortcode details API response:",JSON.stringify(r,null,2)),!r||!r.data||!Array.isArray(r.data)||r.data.length===0?(console.error("Invalid API response for shortcode details:",r),null):me(r.data[0])}catch(n){return console.error(`Error fetching shortcode with ID: ${e}`,n),null}})},fetchShortcodeBySlug(e){return E(this,null,function*(){try{console.log(`Fetching shortcode with slug: ${e}`);const n={type:K.type,count:1,offset:0,q:`slug:${e}`},r=yield q.get(G.SHORTCODE_SEARCH,{params:n});return console.log("Shortcode by slug API response:",JSON.stringify(r,null,2)),!r||!r.data||!Array.isArray(r.data)||r.data.length===0?(console.error("Invalid API response for shortcode by slug:",r),null):me(r.data[0])}catch(n){return console.error(`Error fetching shortcode with slug: ${e}`,n),null}})},createShortcodeMetadata(e){return{id:parseInt(e.id,10)||0,name:e.title,template:e.template,uuid:e.id,tags:e.tags}},fetchShortcodeByName(e){return E(this,null,function*(){try{console.log(`Fetching shortcode by name: ${e}`);const n=`${_}/api/sc/hash?name=${encodeURIComponent(e)}`,r=yield q.get(n);if(!r||!r.data||!Array.isArray(r.data)||r.data.length===0)return console.error("Invalid or empty response when fetching shortcode by name:",r),null;const o=r.data[0];return me(o)}catch(n){return console.error(`Error fetching shortcode by name '${e}':`,n),null}})}},V=new Ln.Shortcode;function Le(e){try{const n=atob(e),r=new Uint8Array(n.length);for(let o=0;o<n.length;o++)r[o]=n.charCodeAt(o);return new TextDecoder("utf-8").decode(r)}catch(n){return console.error("Error decoding base64 string:",n),""}}function Kn(e){try{return JSON.parse(e)}catch(n){return console.error("Error parsing JSON:",n),null}}const ee={getInstance(){return V},registerShortcode(e){if(!e||!e.template){console.error("Invalid shortcode item or missing template:",e);return}try{const n=Le(e.template);if(!n){console.error(`Failed to decode template for shortcode: ${e.title}`),console.log("Original template:",e.template.substring(0,100)+"..."),this.registerWithOriginalTemplate(e);return}const r=Kn(n);if(r&&typeof r=="object"){console.log(`Decoded template JSON for ${e.title} with ${Object.keys(r).length} shortcodes`);const o=r[e.title];if(o){const s={id:parseInt(e.id,10),name:e.title,template:o,uuid:e.id,tags:e.tags};let a=V.registerShortcode(s);console.log(`Registered main shortcode: ${e.title}, with ${o}, result: ${a}`),Object.entries(r).forEach(([l,d],c)=>{if(l===e.title)return;const h={id:parseInt(e.id,10)+1e4+c,name:l,template:d,uuid:e.id+"-"+l,tags:[]};let f=V.registerShortcode(h);console.log(`Registered sub-shortcode: ${l}, with ${d}, result: ${f}`)})}else{console.error(`Main template not found for shortcode: ${e.title}`),console.log("Available keys:",Object.keys(r));const s=Object.keys(r)[0];if(s){console.log(`Using first available template key: ${s}`);const a={id:parseInt(e.id,10),name:e.title,template:r[s],uuid:e.id,tags:e.tags};V.registerShortcode(a)}else this.registerWithOriginalTemplate(e)}}else{console.warn(`Template for ${e.title} is not in the expected JSON format, using as plain template`),console.log("Decoded template sample:",n.substring(0,100)+"...");const o={id:parseInt(e.id,10),name:e.title,template:n,uuid:e.id,tags:e.tags};V.registerShortcode(o)}}catch(n){console.error(`Error registering shortcode ${e.title}:`,n),this.registerWithOriginalTemplate(e)}},registerWithOriginalTemplate(e){console.warn(`Falling back to original template for shortcode: ${e.title}`);try{const n={id:parseInt(e.id,10),name:e.title,template:e.template,uuid:e.id,tags:e.tags};V.registerShortcode(n),console.log(`Registered shortcode with original template: ${e.title}`)}catch(n){console.error(`Critical failure registering shortcode ${e.title}:`,n)}},isShortcodeRegistered(e){return!!V.findByName(e)},extractShortcodeNames(e){return V.extractShortcodeNames(e)},fetchShortcodeByName(e){return E(this,null,function*(){return ke.fetchShortcodeByName(e)})},decodeExample(e){if(!e||!e.example)return console.log("No example content to decode"),"";try{const n=Le(e.example);return n?n.startsWith("http://")||n.startsWith("https://")?(console.log("Example content is a URL:",n),n):(console.log(`Successfully decoded example for ${e.title}`),n):(console.warn(`Failed to decode example for ${e.title}, using original`),e.example)}catch(n){return console.error(`Error decoding example for ${e.title}:`,n),e.example}},ensureShortcodesRegistered(e){return E(this,null,function*(){const n=this.extractShortcodeNames(e);if(console.log("Extracted shortcode names:",n),n.length===0){console.log("No shortcodes found in content");return}const r=n.filter(s=>!this.isShortcodeRegistered(s));if(console.log("Unregistered shortcodes:",r),r.length===0){console.log("All shortcodes are already registered");return}const o=r.map(s=>E(this,null,function*(){const a=yield this.fetchShortcodeByName(s);a?(this.registerShortcode(a),console.log(`Registered shortcode: ${s}`)):console.warn(`Failed to fetch shortcode: ${s}`)}));yield Promise.all(o)})},stepRender(e){return V.stepRender(e)},finalRender(e){return V.finalRender(e)}},ye={error:e=>console.error(e),success:e=>console.log(e)},Je=ee.getInstance(),Ye=i.createContext({isCreatingProject:!1,shortcodeTags:[],selectedTags:[],searchTerm:"",shortcodes:[],hasMoreShortcodes:!1,isLoadingShortcodes:!1,selectedShortcode:null,shortcodeInstance:Je,setCreatingProject:()=>{},selectTag:()=>{},loadMoreShortcodes:()=>{},selectShortcode:()=>{},createProjectFromShortcode:()=>E(void 0,null,function*(){return null}),setSearchTerm:()=>{},clearFilters:()=>{},stepRender:e=>e,finalRender:e=>e});function et(e){return E(this,null,function*(){try{const n=yield fetch(e);if(!n.ok)throw new Error(`Failed to fetch: ${n.status} ${n.statusText}`);return yield n.text()}catch(n){throw console.error("Error fetching remote content:",n),n}})}const Kt=({children:e})=>{const{i18n:n}=Q(),[r,o]=i.useState(!1),[s,a]=i.useState([]),[l,d]=i.useState([]),[c,u]=i.useState(""),[h,f]=i.useState([]),[b,x]=i.useState(!1),[w,m]=i.useState(!1),[p,S]=i.useState(1),[N,T]=i.useState(null);i.useEffect(()=>{k()},[]),i.useEffect(()=>{C(1)},[c,l]);const k=()=>E(void 0,null,function*(){try{const v=yield ke.fetchAllTags();a(v)}catch(v){console.error("Error loading shortcode tags:",v)}}),R=i.useCallback(()=>{u(""),d([])},[]),C=v=>E(void 0,null,function*(){m(!0);try{const I=yield ke.searchShortcodes(v,10,c,l);f(v===1?I.shortcodes:B=>[...B,...I.shortcodes]),x(I.hasMore),S(v)}catch(I){console.error("Error loading shortcodes:",I)}finally{m(!1)}}),A={isCreatingProject:r,shortcodeTags:s,selectedTags:l,searchTerm:c,shortcodes:h,hasMoreShortcodes:b,isLoadingShortcodes:w,selectedShortcode:N,shortcodeInstance:Je,setCreatingProject:o,selectTag:v=>{d(I=>I.includes(v)?I.filter(B=>B!==v):[...I,v])},loadMoreShortcodes:()=>{!w&&b&&C(p+1)},selectShortcode:v=>{T(v),ee.registerShortcode(v)},createProjectFromShortcode:v=>E(void 0,null,function*(){m(!0);try{if(console.log("Creating project from shortcode:",v),!v)throw new Error("No shortcode selected");ee.registerShortcode(v);let I=ee.decodeExample(v)||`{{< ${v.title} >}}`;if(I.startsWith("https://"))try{ye.success("正在下载模板内容..."),I=yield et(I)}catch(le){console.error("Error fetching remote example:",le),ye.error("下载模板内容失败，将使用默认内容"),I=`{{< ${v.title} >}}`}yield ee.ensureShortcodesRegistered(I);const B=Date.now().toString(),X={id:`project_${B}`,name:v.title,type:v.tags.includes("resume")?"resume":v.tags.includes("website")?"website":"xiaohongshu",templateId:v.id,files:[{id:`file_${B}`,name:"index.md",content:I,path:"/index.md",isDirectory:!1}],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},Z=JSON.parse(localStorage.getItem("md_friday_projects")||"[]");Z.push(X),localStorage.setItem("md_friday_projects",JSON.stringify(Z)),localStorage.setItem("md_friday_current_project_id",X.id),T(null);const ae=new CustomEvent("project-changed",{detail:{projectId:X.id}});return window.dispatchEvent(ae),console.log("Project created successfully:",X),X}catch(I){return console.error("Failed to create project from shortcode:",I),ye.error("Failed to create project from shortcode"),null}finally{m(!1)}}),setSearchTerm:u,clearFilters:R,stepRender:v=>ee.stepRender(v),finalRender:v=>ee.finalRender(v)};return t.jsx(Ye.Provider,{value:A,children:e})},nt=()=>{const e=i.useContext(Ye);if(e===void 0)throw new Error("useProject must be used within a ProjectProvider");return e},ve={navItems:[]},tt=o=>{var s=o,{size:e=24,height:n}=s,r=be(s,["size","height"]);return t.jsx("svg",F(P({xmlns:"http://www.w3.org/2000/svg",viewBox:"203.83 275.21 201.06 201.06",width:e,height:n!=null?n:e},r),{children:t.jsx("path",{fill:"#004ea2",d:`M259.32,275.21c-37.47,0-49.64,20.5-53.59,50.89h13l35.62,54.28
      l35.38-54.28h43.42V426.75h17l-40.36,38.19l-42.15-38.19H289V360.58l-42.72,66.17H242L203.83,369v6.78
      c0,55.52,0,100.53,55.49,100.53s145.57-45,145.57-100.53S314.84,275.21,259.32,275.21Z`})}))},Re=()=>t.jsx("svg",{fill:"none",height:"14",viewBox:"0 0 24 24",width:"14",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{d:"M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z",fill:"currentColor"})});var rt=`.container-layout{
  background-color: #e5e5e5;
  padding: 32px;
}

/* light */
.article {
  padding: 32px;
  border-radius: 8px;
  background: white;
  color-scheme: light;
  color: #1f2328;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.25;
}

h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid #d1d9e0b3;
}

h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #d1d9e0b3;
}

h3 {
  font-size: 1.25em;
}

h4 {
  font-size: 1em;
}

h5 {
  font-size: 0.875em;
}

h6 {
  font-size: 0.85em;
  color: #59636e;
}

p,
blockquote,
ul,
ol,
dl,
table,
pre,
details {
  margin-top: 0;
  margin-bottom: 1rem;
}

a {
  color: #0969da;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  border-style: none;
  width: 100%;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
}

th,
td {
  padding: 6px 13px;
  border: 1px solid #d1d9e0;
}

blockquote {
  margin: 0;
  padding: 0 1em;
  color: #59636e;
  border-left: 0.25em solid #d1d9e0;
}

ul {
  list-style-type: disc;
  padding-left: 2em;
}

code {
  margin: 0 2px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 3px 4px;
}

pre {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px;
}

pre code {
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  word-wrap: normal;
  max-width: initial;
  display: inline;
  overflow: initial;
  line-height: inherit;
}

ol {
  padding-left: 2em;
  list-style-type: auto;
}

hr {
  border-bottom: 1px solid #d1d9e0b3;
  margin: 1.5rem 0;
}

details {
  display: block;
}

summary {
  display: list-item;
}

[hidden] {
  display: none !important;
}

/* Highlight.js */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #383a42;
  background: #fafafa;
}

.hljs-comment,
.hljs-quote {
  color: #a0a1a7;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #a626a4;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e45649;
}

.hljs-literal {
  color: #0184bb;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #50a14f;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #986801;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #4078f2;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #c18401;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
`,ot=`.container-layout{
  background-color: #c0c0c0;
  padding: 16px;
}

.article {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  background-color: #f5f5f5;
  padding: 32px;
  border-radius: 8px;
  color: #333333;
  line-height: 1.6;
}

/* 标题样式 */
h1 {
  font-size: 36px;
  text-align: center;
  font-weight: bold;
  color: #333333;
  border-bottom: 2px solid #333333;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

h2 {
  font-size: 28px;
  font-weight: bold;
  color: #222222;
  margin-top: 30px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #bbbbbb;
}

/* 段落样式 */
p {
  font-size: 16px;
  margin-bottom: 20px;
  text-align: justify;
}

/* 引用样式 */
blockquote {
  border-left: 4px solid #333333;
  margin: 20px 0;
  padding: 10px 20px;
  font-style: italic;
  color: #555555;
  background-color: #f0f0f0;
}

/* 列表样式 */
ul {
  list-style-type: square;
  padding-left: 20px;
  margin-bottom: 20px;
}

li {
  margin: 10px 0;
}

/* 图片样式 */
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
  border: 2px solid #dddddd;
}

/* 代码块样式 */
pre {
  background-color: #fafafa;
  padding: 15px;
  border: 1px solid #dddddd;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.4;
}

code {
  background-color: #fafafa;
  padding: 2px 4px;
  font-size: 14px;
  color: #d6336c;
}

/* 表格样式 */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

thead th {
  background-color: #333333;
  color: #ffffff;
  padding: 10px;
  text-align: left;
}

tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

tbody td,
thead th {
  padding: 10px;
  border: 1px solid #dddddd;
}

/* 链接样式 */
a {
  color: #006699;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* 按钮与输入框样式 */
input[type="checkbox"] {
  margin-right: 8px;
}

/* 分割线 */
hr {
  border: none;
  border-top: 2px solid #cccccc;
  margin: 40px 0;
}

/* Highlight.js */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #383a42;
  background: #fafafa;
}

.hljs-comment,
.hljs-quote {
  color: #a0a1a7;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #a626a4;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e45649;
}

.hljs-literal {
  color: #0184bb;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #50a14f;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #986801;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #4078f2;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #c18401;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
`,st=`.container-layout{
  background-color: #39236b;
  padding: 32px;
}

/* 通用设置 */
.article {
  gap: 16px;
  padding: 32px;
  background: linear-gradient(
    to bottom right,
    #6b46c1,
    rgba(79, 70, 229, 0.9),
    #5a34b0
  );
  line-height: 1.5;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  user-select: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-align: center;
}

h1 {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #fff;
  padding-bottom: 8px;
  margin-bottom: 16px;
}

h2 {
  font-size: 28px;
  margin-top: 24px;
  padding-bottom: 6px;
  border-bottom: 1px solid #fff;
  margin-bottom: 12px;
}

ul,
ol {
  list-style-type: auto;
  padding-left: 2em;
}

p {
  font-size: 16px;
  text-align: center;
}

a {
  color: #fff;
  text-decoration: underline;
}

blockquote {
  font-size: 18px;
  font-style: italic;
  padding: 12px;
  background-color: #f9f9f9;
  border-left: 4px solid #333333;
  color: #666666;
  margin: 12px 0;
}

img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  margin: 16px 0;
}

ol {
  list-style-type: decimal;
  padding-left: 24px;
}

li {
  margin: 8px 0;
}

strong {
  font-weight: bold;
}

code {
  background-color: #fff;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 14px;
  color: #ef4444;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  width: max-content;
  max-width: 100%;
  overflow: auto;
}

th,
td {
  padding: 6px 13px;
  border: 1px solid #fff;
}

/* Highlight.js */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #abb2bf;
  background: #282c34;
}

.hljs-comment,
.hljs-quote {
  color: #5c6370;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #c678dd;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e06c75;
}

.hljs-literal {
  color: #56b6c2;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #98c379;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #d19a66;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #61aeee;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #e6c07b;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
`,at=`.container-layout{
  background-color: #000000;
  padding: 24px;
}

/* 文章内容设置 */
.article {
  padding: 2em 60px;
  font-size: 16px;
  border-radius: 8px;
  color: #333;
  background: #fff;
  font-family:
    PingFang SC,
    Verdana,
    Helvetica Neue,
    Microsoft Yahei,
    Hiragino Sans GB,
    Microsoft Sans Serif,
    WenQuanYi Micro Hei,
    sans-serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
}

/* 标题样式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 300;
  color: #333;
  line-height: 1.35;
  margin-top: 1.2rem;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.4em;
  padding-bottom: 1em;
  border-bottom: 3px double #eee;
}
h2 {
  font-size: 1.8em;
}
h3 {
  font-size: 1.6em;
}
h4 {
  font-size: 1.4em;
}
h5,
h6 {
  font-size: 1.2em;
}

/* 段落样式 */
p {
  font-weight: 300;
  margin-bottom: 1.2em;
}

strong {
  font-weight: bolder;
  color: #000;
}

em {
  font-style: italic;
}

/* 列表样式 */
ul,
ol {
  font-weight: 300;
  margin-left: 1.3em;
}

ul {
  font-weight: 300;
  list-style: circle;
}

ol {
  font-weight: 300;
  list-style: decimal;
}

li ul {
  font-weight: 300;
  list-style: circle;
}

/* 引用块样式 */
blockquote {
  color: #999;
  border-left: 1px solid #1abc9c;
  padding-left: 1em;
  margin: 1em 3em 1em 2em;
}

/* 链接样式 */
a {
  color: #1abc9c;
  text-decoration: none;
  border-bottom: 1px solid #1abc9c;
}

a:hover {
  text-decoration: underline;
  color: #555;
  border-bottom-color: #555;
}

/* 水平分割线 */
hr {
  border: none;
  border-bottom: 1px solid #cfcfcf;
  margin-bottom: 0.8em;
  height: 10px;
}

/* 代码块和内联代码 */
pre,
code {
  font-family: "Courier New", monospace;
  background: #ededeb;
  color: #eb5757;
  border-radius: 4px;
  padding: 0.2em 0.4em;
}

pre {
  margin: 1rem 0;
  border: 1px solid #ddd;
  padding: 1em 0.5em;
  overflow-x: auto;
}

code {
  /*font-size: 85%;*/
}

/* 表格样式 */
table {
  font-weight: 300;
  border-collapse: collapse;
  width: 100%;
}

thead th {
  background: #f1f1f1;
  border: 1px solid #ddd;
}

tbody td {
  border: 1px solid #ddd;
  padding: 0.5em 1em;
  color: #666;
}

/* 图片样式 */
img {
  max-width: 100%;
}

/* Highlight.js */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #383a42;
  /*background: #fafafa;*/
}

.hljs-comment,
.hljs-quote {
  color: #a0a1a7;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #a626a4;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e45649;
}

.hljs-literal {
  color: #0184bb;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #50a14f;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #986801;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #4078f2;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #c18401;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
`,lt=`.container-layout{
    background-color: #efe7db;
    padding: 36px;
}

/* light */
.article {
    padding: 32px;
    border-radius: 8px;
    background: white;
    color-scheme: light;
    color: #222222;
    font-family: AvenirNext-Regular, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
}

/* title */
h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 1.5rem 0 0.75em;
    font-family: AvenirNext-Medium, serif;
    font-weight: 600;
    line-height: 1.5em;
    color: #262626;
}

h1 {
    font-size: 1.5em;
}

h2 {
    font-size: 1.3em;
}

h3 {
    font-size: 1.1em;
}

h4 {
    font-size: 1em;
}

h5 {
    font-size: 1em;
}

h6 {
    font-size: 1em;
}

/* general themes */
p, pre, ul, ol, dl, form, details, dl, blockquote, table, xmp, plaintext, listing, figure,
pre[class*="language-"] {
    margin: 0.75em 0 0.45em;
}

/* 段落样式 */
p {
    margin-left: 0;
    margin-right: 0;
}

/* 引用样式 */
blockquote {
    background-color: #ffffff;
    padding-left: 0.8em;
    border-left: 0.2em solid #007acb;
    margin: 1rem 0;
}

blockquote > blockquote {
    margin: 0;
    border-left: 0.2em double #007acb;
}

li > blockquote {
    margin: 0.5rem;
    margin-left: -0.8rem;
}

/* 列表样式 */
ul ul, ul ol, ol ul, ol ol {
    margin-bottom: 0px;
    margin-top: 0.25em;
    margin-left: 2em;
}
li ul, li ol {
    margin-top: 0.25em;
    margin-left: 2em;
}

li {
    word-wrap: break-all;
}

ul, ol {
    list-style-type: disc;
}

ul {
    margin-left: 1.3em;
    padding: 0;
}

ol {
    margin-left: 1.3em;
    padding: 0;
    counter-reset: ol_counter;
    list-style-type: auto;
}

ul > li {
    position: relative;
}

ol > li {
    position: relative;
}

li + li {
    margin-top: 0.25em;
}

/* 图片样式 */
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20px auto;
    border: 2px solid #dddddd;
}

/* 代码块样式 */
pre, pre[class*="language-"] {
    padding: 0;
    border: 0;
}
pre, xmp, plaintext, listing, code, kbd, tt, samp {
    font-family: Menlo-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

code {
    display: inline;
    border: solid 2px #f3f5f7;
    padding: 0.2em 0.5em;
    font-size: 0.9em;
    color: #444444;
    background-color: #f3f5f7;
}

pre > code {
    display: block;
    border: none;
    padding: 0.7em 1em;
    font-size: 0.9em;
    overflow-x: auto
}

pre {
    background-color: #fafafa;
    padding: 15px;
    border: 1px solid #dddddd;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.4;
}

mark {
    color: inherit;
    display: inline;
    padding: 0.2em 0.5em;
    background-color: #fcffc0;
}

figcaption {
    text-align: center;
}

/* 表格样式 */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 0px;
    margin-right: 0px;
    color: #222222;
    background-color: white;
    font-size: 1em;
    border-spacing: 0;
    border: 1px solid #cecece;
}

th, td {
    padding: 0.7em 1em;
    font-size: 0.9em;
    border: 1px solid #cecece;
    border-top: none;
    border-bottom: none;
}

caption, th, td {
    text-align: left;
    font-weight: normal;
    vertical-align: middle
}

thead th {
    background-color: #f3f4f6;
    color: #434343;
    font-weight: bold;
    padding: 10px;
    text-align: left;
}

tbody tr:nth-child(even) {
    background-color: #f3f4f6;
}

/* 链接样式 */
a {
    color: #007acb;
    text-decoration: underline;
}

/* divider */

hr {
    height: 1px;
    border: 0;
    background-color: #bfbfbf;
    border-style: inset;
    border-width: 1px;
}

details {
    display: block;
}

summary {
    display: list-item;
}

[hidden] {
    display: none !important;
}

/* Highlight.js */

pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
}

code.hljs {
    padding: 3px 5px;
}

.hljs {
    color: #444444;
    background: #fafafa;
}

.hljs-comment,
.hljs-quote {
    color: #a0a1a7;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
    color: #007acb;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
    color: #e45649;
}

.hljs-literal {
    color: #0184bb;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
    color: #c92626;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
    color: #005f87;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
    color: #4078f2;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
    color: #c18401;
}

.hljs-emphasis {
    font-style: italic;
}

.hljs-strong {
    font-weight: bold;
}

.hljs-link {
    text-decoration: underline;
}
`,it=`.container-layout{
  background-color: #163c4d;
  padding: 28px;
}

/* light */
.article {
  padding: 32px;
  background: #ffffff;
  color-scheme: light;
  color: #1f2328;
  font-family: Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.25;
  color: #e16a7c;
}

h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid #d1d9e0b3;
}

h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #d1d9e0b3;
}

h3 {
  font-size: 1.25em;
}

h4 {
  font-size: 1em;
}

h5 {
  font-size: 0.875em;
}

h6 {
  font-size: 0.85em;
}

p,
blockquote,
ul,
ol,
dl,
table,
pre,
details {
  margin-top: 0;
  margin-bottom: 1rem;
}

a {
  color: #0969da;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  border-style: none;
  width: 100%;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
}

th,
td {
  padding: 6px 13px;
  border: 1px solid #d1d9e0;
}

blockquote {
  margin: 0;
  padding: 0 1em;
  color: #59636e;
  border-left: 0.25em solid #d1d9e0;
}

ul {
  list-style-type: disc;
  padding-left: 2em;
}

code {
  margin: 0 2px;
  padding: 2px 3px;
  background-color: #eef1f3;
  border: 1px solid #ddd;
  /*border-radius: 4px;*/
}

pre {
  background-color: #eef1f3;
  border: 1px solid #ddd;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  /*border-radius: 6px;*/
}

pre code {
  margin: 0;
  padding: 0;
  background-color: #eef1f3;
  border: none;
  word-wrap: normal;
  max-width: initial;
  display: inline;
  overflow: initial;
  line-height: inherit;
}

ol {
  padding-left: 2em;
  list-style-type: auto;
}

hr {
  border-bottom: 1px solid #d1d9e0b3;
  margin: 1.5rem 0;
}

details {
  display: block;
}

summary {
  display: list-item;
}

[hidden] {
  display: none !important;
}

/* Highlight.js */
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #000000;
  background-color: #eef1f3;
}

.hljs-comment,
.hljs-quote {
  color: #6a737d;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #f2617a;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #634f7d;
}

.hljs-literal {
  color: #6b9e78;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #47a1ad;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #cc850a;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #6b9e78;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #47a1ad;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
`;const Ie=[{name:"github",css:rt},{name:"newspaper",css:ot},{name:"poster",css:st},{name:"slim",css:at},{name:"note",css:lt},{name:"tw",css:it}],Qe=e=>{var n;return(n=Ie.find(r=>r.name===e))==null?void 0:n.css};var ct=`{{< cardBanner

logo="不黑学长"
avatar="https://notes.sunwei.xyz/avatar.png"
mainTitle="让完播率>50% (3/3)"
subtitle="6种文案公式"
description="爆款拆解/爆款要素/文案结构"
newTagText="全新整理"
footerContent="运营技巧,爆款选题,文案写作,数据复盘"

/>}}`,dt=`{{< mdfFormulaSingle
    title="[爆款文案结构公式]"
    brand="BUHEIXUEZHANG"
    pageNumber="3"
>}}

{{< mdfFormulaSingleSection
    number="05"
    title="强化IP结构"
    formulaItems="痛点,用户获得感,IP信任感,解决方案"
    caseTitle="案例解析"
    footerText="价值内容的来源/多去收集与行业相关的知识信息与行业内比较厉害的人的交流或者故事也能成为你知识的载体|注意/千万不要说教式的去表达，内容见好就收（控制时长/预留观众想象与思考的空间）；本身平台就是娱乐性质，知识类内容也要寓教于乐！"
>}}
{{< mdfFormulaSinglePoint
    number="1"
    title="痛点"
    description="将痛点放到视频开头的好处是，吸引来的都是精准粉丝；所以要思考你的目标群体的真正痛点！"
    examples="如何免F读书还能每个月3000+|年轻人如何不靠打工才能够养活自己"
/>}}

{{< mdfFormulaSinglePoint
    number="2"
    title="获得感"
    description="你需要在2秒钟内告诉用户我将会为你提供巨大的价值，例如速成类知识"
    examples="3步教大家快速学习新的赚0技能|5分钟教会你7种减脂做法，简单好吃"
/>}}

{{< mdfFormulaSinglePoint
    number="3"
    title="信任感"
    description="强化你将要陈述的内容的可信度，以及你本人的可信度/别人为什么信任你、同时也是为吸引用户看下去的钩子，递进式塑造期待感"
    examples="我曾经帮助2000+学员解决什么问题|曾经获得官方的什么认证/奖项/技能"
/>}}

{{< mdfFormulaSinglePoint
    number="4"
    title="解决方案"
    description="价值是前面所有铺垫工作的最终结果，同时也是观众是否点赞关注的重要因素，如果故弄玄虚只会让用户厌烦"
    examples="盘点真正有用的信息|展示卖点1/卖点2/卖点3"
/>}}

{{< /mdfFormulaSingleSection >}}
{{< /mdfFormulaSingle >}}
`,ut=`{{< mdfFormulaPair
    headerTitle="[爆款文案结构公式]"
    headerLogo="BUHEIXUEZHANG"
    pageNumber="2"
>}}

{{< mdfFormulaPairCard
    number="03"
    name="FIRE结构"
    items="Fact事实+Interpret解读+Reaction反应+Ends结果"
>}}
{{< mdfFormulaPairExample 
    number="1" 
    label="Fact/事实" 
    content="最近好多博主都在抱怨流量不如之前了" 
/>}}
{{< mdfFormulaPairExample 
    number="2" 
    label="Interpret解读" 
    content="那是因为机制从流量转化效率调整到了曝光转化效率" 
/>}}
{{< mdfFormulaPairExample 
    number="3" 
    label="Reaction反应" 
    content="不光短视频，直播间的流量也是一样的结果" 
/>}}
{{< mdfFormulaPairExample 
    number="4" 
    label="Ends结果" 
    content="我们需要优化前两秒使用视听语言" 
/>}}

{{< /mdfFormulaPairCard >}}

{{< mdfFormulaPairCard
    number="04"
    name="RIDE结构"
    items="Risk风险+Interest利益+Difference差异+Effect影响"
>}}
{{< mdfFormulaPairExample
    number="1" 
    label="Risk风险" 
    content="消极口头禅会影响运气" 
/>}}
{{< mdfFormulaPairExample 
    number="2" 
    label="Interest利益" 
    content="使用积极的口头禅来吸引好运对你最有利" 
/>}}
{{< mdfFormulaPairExample 
    number="3" 
    label="Difference差异" 
    content="说我会成功而不是我可能会失败" 
/>}}
{{< mdfFormulaPairExample 
    number="4" 
    label="Effect影响" 
    content="积极的口头禅对人的心态和运气有显著影响" 
/>}}
{{< /mdfFormulaPairCard >}}

{{< /mdfFormulaPair >}}
`,ht=`{{< mdfFormulaFlow
    title="[爆款文案结构公式]"
    brand="BUHEIXUEZHANG"
    number="06"
    name="脚本模式化结构"
    subtitle="(细化版)"
    pageNumber="4"
>}}
    {{< mdfFormulaFlowBlock
        number="1"
        title="故事类爆款脚本结构"
        flowItems="猎奇抓眼球的开头|故事的起因|钩子|故事的经过|钩子|故事的高潮|钩子|结果|引出观点|总结观点"
    />}}
    
    {{< mdfFormulaFlowBlock
        number="2"
        title="爆款短视频结构"
        flowItems="抛出利益点或者痛点|通过案例或者数据证明这个利益点或者痛点来增加信任|针对目标群体强调看这条视频的重要性|如果不看产生的损失跟后|具体的方法或者解决办法|总结/利他感性的结尾"
        usePlusSigns="true"
    />}}

{{< /mdfFormulaFlow >}}
`;const Xe=[{name:"empty",md:""},{name:"cardBanner",md:ct},{name:"formulaSingle",md:dt},{name:"formulaPair",md:ut},{name:"formulaFlow",md:ht}],Ze=e=>{var n;return(n=Xe.find(r=>r.name===e))==null?void 0:n.md},mt=[{name:"default",value:0},{name:"1080p",value:1080},{name:"720p",value:720},{name:"540p",value:540},{name:"360p",value:360}],ft=()=>{const[e,n]=i.useState(Ie[0].name),[r,o]=i.useState(Qe(e)),[s,a]=i.useState(Xe[0].name),[l,d]=i.useState(Ze(s)),[c,u]=i.useState(0);return{selectedStyle:e,setSelectedStyle:n,articleStyle:r,setArticleStyle:o,selectedTemplate:s,setSelectedTemplate:a,template:l,setTemplate:d,rightPaneWidth:c,setRightPaneWidth:u}},Ke=zn(ft),ze=e=>Object.entries(e).map(([n,r])=>`${n}: ${r};`).join(" "),gt=e=>{const n={};return e.split(";").filter(Boolean).forEach(o=>{const[s,a]=o.split(":").map(l=>l.trim());s&&a&&(n[s]=a)}),n},De=e=>{const n=e.match(/\.container-layout\s*\{([^}]+)}/);return n?n[1].trim():""},pt=({newStyle:e,setNewStyle:n})=>t.jsxs(Ue,{showArrow:!0,offset:10,placement:"bottom",shouldBlockScroll:!0,children:[t.jsx(We,{children:t.jsx("div",{className:"size-6 rounded-full flex-shrink-0",style:{backgroundColor:e["background-color"]}})}),t.jsx(Oe,{className:"p-0",children:t.jsx(Dn,{color:e["background-color"],disableAlpha:!0,onChange:r=>{n(F(P({},e),{"background-color":`${r.hex}`,background:`${r.hex}`}))}})})]}),xt=()=>{const{t:e}=Q(),{articleStyle:n,setArticleStyle:r,setRightPaneWidth:o}=Ke.useContainer(),[s,a]=i.useState(gt(De(n)));i.useEffect(()=>{ze(s)&&r(d=>d.replace(De(d),ze(s)))},[s]);const l=d=>{o(d),setTimeout(()=>{window.dispatchEvent(new Event("resize"))},10)};return t.jsx(Oe,{className:"w-[360px]",children:d=>t.jsxs("div",{className:"px-1 py-2 w-full",children:[t.jsx("p",F(P({className:"text-small font-bold text-foreground pb-3"},d),{children:e("customize.layoutCustomizer")})),t.jsx(He,{label:e("customize.containerBackground"),labelPlacement:"outside",startContent:t.jsx("div",{style:{cursor:"pointer"},children:t.jsx(pt,{newStyle:s,setNewStyle:a})}),value:s["background-color"],onChange:c=>{a(F(P({},s),{"background-color":`${c.target.value}`,background:`${c.target.value}`}))}}),t.jsx("div",{className:"mt-4 flex flex-col gap-3 w-full",children:t.jsx(Nn,{className:"max-w-md",defaultValue:Number(s.padding.slice(0,-2))||16,getValue:c=>`${c}px`,label:e("customize.containerPadding"),maxValue:64,minValue:0,step:4,onChange:c=>{a(F(P({},s),{padding:`${c}px`}))}})}),t.jsxs("div",{className:"mt-4",children:[t.jsx("p",{className:"text-small font-medium mb-2",children:e("toolbar.quickSizeText")}),t.jsxs("div",{className:"flex flex-wrap gap-2",children:[t.jsx(J,{size:"sm",variant:"flat",onClick:()=>l(0),children:e("toolbar.defaultSize")}),mt.filter(c=>c.name!=="default").map(c=>t.jsx(J,{size:"sm",variant:"flat",onClick:()=>l(c.value+40),children:`${c.value}px`},c.name))]})]})]})})},bt=()=>{const{t:e}=Q();return t.jsx(pe,{className:"w-full",variant:"flat",children:t.jsxs(Ue,{showArrow:!0,offset:10,placement:"bottom",shouldBlockScroll:!0,children:[t.jsx(We,{children:t.jsxs(J,{className:"h-[40px] w-full",children:[t.jsx(_n,{size:18}),e("customize.buttonName")]})}),t.jsx(xt,{})]})})},wt=e=>E(void 0,null,function*(){const n=document.getElementById(e);if(!n){console.error("Element not found");return}const r=n.cloneNode(!0),o=l=>{const d=window.getComputedStyle(l),c=Array.from(d);for(const u of c)l.style[u]=d.getPropertyValue(u)},s=l=>{o(l),Array.from(l.children).forEach(d=>s(d))};s(r);const a=r.outerHTML;try{yield navigator.clipboard.write([new ClipboardItem({"text/html":new Blob([a],{type:"text/html"})})])}catch(l){console.error("Failed to copy content with style:",l)}}),en=/^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);function jt(){const{t:e}=Q(),[n,r]=Be.useState(new Set(["email"])),o={email:e("copyEmail.buttonDescription"),image:e("copyImage.buttonDescription")},s={email:e("copyEmail.buttonName"),image:e("copyImage.buttonName")},a=Array.from(n)[0],l=c=>E(this,null,function*(){return yield ce(c),yield ce(c),yield ce(c)}),d=()=>{if(n.has("email"))wt("markdown-body"),L.success(e("copyEmail.successMessage"),{description:e("copyEmail.successDescription"),duration:4e3,position:"top-center"});else if(n.has("image")){const c=document.getElementById("markdown-body");if(!c)return;if(L.success(e("commonToast.processing"),{duration:4e3,position:"top-center"}),en){const u=new ClipboardItem({"image/png":l(c).then(h=>h)});navigator.clipboard.write([u]),L.success(e("copyImage.successMessage"),{duration:4e3,position:"top-center"})}else ce(c).then(function(u){navigator.clipboard.write([new ClipboardItem({"image/png":u})]).then(()=>{L.success(e("copyImage.successMessage"),{duration:4e3,position:"top-center"})}).catch(h=>{L.error(e("copyImage.failedMessage")),console.error("Failed to copy image to clipboard:",h)})}).catch(function(u){L.error(e("copyImage.failedMessage")),console.error("oops, something went wrong!",u)})}};return t.jsxs(pe,{className:"w-full",variant:"flat",children:[t.jsxs(J,{className:"h-[40px] w-full",onClick:d,children:[t.jsx(Bn,{size:18}),s[a]]}),t.jsxs(Ee,{placement:"bottom-end",children:[t.jsx(Ce,{children:t.jsx(J,{isIconOnly:!0,className:"h-[40px]",children:t.jsx(Re,{})})}),t.jsxs(Me,{disallowEmptySelection:!0,"aria-label":"Merge options",className:"max-w-[300px]",selectedKeys:n,selectionMode:"single",onSelectionChange:r,children:[t.jsx(ne,{description:o.email,children:s.email},"email"),t.jsx(ne,{description:o.image,children:s.image},"image")]})]})]})}function yt({markdown:e}){const{t:n}=Q(),[r,o]=Be.useState(new Set(["image"])),s={image:n("downloadImage.buttonDescription"),pdf:n("downloadPDF.buttonDescription"),html:n("downloadHTML.buttonDescription"),markdown:n("downloadMarkdown.buttonDescription")},a={image:n("downloadImage.buttonName"),pdf:n("downloadPDF.buttonName"),html:n("downloadHTML.buttonName"),markdown:n("downloadMarkdown.buttonName")},l=Array.from(r)[0],d=()=>E(this,null,function*(){const c=document.getElementById("markdown-body");if(c){if(r.has("pdf"))L.success(n("commonToast.developing"),{duration:4e3,position:"top-center"});else if(r.has("image")){L.success(n("commonToast.processing"),{duration:4e3,position:"top-center"});try{en&&(yield we(c),yield we(c));const u=yield we(c),h=document.createElement("a");h.download="markdown-post.png",h.href=u,h.click(),L.success(n("downloadImage.successMessage"),{description:n("downloadImage.successDescription"),duration:4e3,position:"top-center"})}catch(u){console.error("oops, something went wrong!",u),L.error(n("downloadImage.failedMessage"))}}else if(r.has("html"))try{const u=c.outerHTML,h=new Blob([u],{type:"text/html"}),f=URL.createObjectURL(h),b=document.createElement("a");b.download="markdown-post.html",b.href=f,b.click(),URL.revokeObjectURL(f),L.success(n("downloadHTML.successMessage"),{description:n("downloadHTML.successDescription"),duration:4e3,position:"top-center"})}catch(u){console.error("Failed to download HTML:",u),L.error(n("downloadHTML.failedMessage"))}else if(r.has("markdown"))try{const u=new Blob([e],{type:"text/markdown"}),h=URL.createObjectURL(u),f=document.createElement("a");f.download="markdown-post.md",f.href=h,f.click(),URL.revokeObjectURL(h),L.success(n("downloadMarkdown.successMessage"),{description:n("downloadMarkdown.successDescription"),duration:4e3,position:"top-center"})}catch(u){console.error("Failed to download Markdown:",u),L.error(n("downloadMarkdown.failedMessage"))}}});return t.jsxs(pe,{className:"w-full",variant:"flat",children:[t.jsxs(J,{className:"h-[40px] w-full",onClick:d,children:[t.jsx(On,{size:18}),a[l]]}),t.jsxs(Ee,{placement:"bottom-end",children:[t.jsx(Ce,{children:t.jsx(J,{isIconOnly:!0,className:"h-[40px]",children:t.jsx(Re,{})})}),t.jsxs(Me,{disallowEmptySelection:!0,"aria-label":"Merge options",className:"max-w-[300px]",selectedKeys:r,selectionMode:"single",onSelectionChange:o,children:[t.jsx(ne,{description:s.image,children:a.image},"image"),t.jsx(ne,{description:s.html,children:a.html},"html"),t.jsx(ne,{description:s.markdown,children:a.markdown},"markdown"),t.jsx(ne,{description:s.pdf,children:a.pdf},"pdf")]})]})]})}const er=({markdown:e})=>{const{t:n,i18n:r}=Q(),{selectedStyle:o,setSelectedStyle:s,setArticleStyle:a,selectedTemplate:l,setSelectedTemplate:d,setTemplate:c}=Ke.useContainer();return i.useEffect(()=>{a(Qe(o))},[o]),i.useEffect(()=>{c(Ze(l))},[l]),t.jsxs(En,{maxWidth:"full",position:"sticky",className:"px-4 shadow-sm",children:[t.jsxs(Pe,{className:"basis-auto",justify:"start",children:[t.jsx(Cn,{className:"gap-2 max-w-fit mr-4",children:t.jsxs(Fe,{className:"flex justify-start items-center gap-1",color:"foreground",href:"/",children:[t.jsx(tt,{}),t.jsx("p",{className:"font-bold text-inherit",children:"MDFriday Notes"})]})}),t.jsx("div",{className:"flex gap-2 justify-start items-center",children:ve.navItems&&ve.navItems.length>0&&ve.navItems.map(u=>t.jsx(oe,{children:t.jsx(Fe,{className:Hn(Mn({color:"foreground"}),"data-[active=true]:text-primary data-[active=true]:font-medium"),color:"foreground",href:u.href,children:u.label})},u.href))})]}),t.jsxs(Pe,{justify:"end",className:"gap-2",children:[t.jsx(oe,{children:t.jsxs(pe,{className:"w-full",variant:"flat",children:[t.jsxs(J,{className:"h-[40px] w-full",onClick:()=>{},children:[t.jsx(Un,{size:18}),n(`postStyle.${o}`)]}),t.jsxs(Ee,{placement:"bottom-end",children:[t.jsx(Ce,{children:t.jsx(J,{isIconOnly:!0,className:"h-[40px]",children:t.jsx(Re,{})})}),t.jsx(Me,{disallowEmptySelection:!0,"aria-label":n("toolbar.selectStyleText"),className:"max-w-[300px]",selectedKeys:[o],selectionMode:"single",onSelectionChange:u=>{const h=Array.from(u)[0];s(h)},children:Ie.map(u=>t.jsx(ne,{children:n(`postStyle.${u.name}`)},u.name))})]})]})}),t.jsx(oe,{children:t.jsx(bt,{})}),t.jsx(oe,{children:t.jsx(jt,{})}),t.jsx(oe,{children:t.jsx(yt,{markdown:e})})]})]})};function vt(){const[e,n]=i.useState({width:null,height:null});return i.useLayoutEffect(()=>{const r=()=>{n({width:window.innerWidth,height:window.innerHeight})};return r(),window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r)}},[]),e}const se={sm:640,md:768,lg:1024,xl:1280,"2xl":1536},St=()=>{const[e,n]=i.useState(new Set),{width:r}=vt();return i.useLayoutEffect(()=>{if(r===null)return;const o=new Set;r<se["2xl"]&&o.add("2xl"),r<se.xl&&o.add("xl"),r<se.lg&&o.add("lg"),r<se.md&&o.add("md"),r<se.sm&&o.add("sm"),n(o)},[r]),e};function nr({leftPane:e,rightPane:n,initialLeftWidth:r=50,minLeftWidth:o=20,maxLeftWidth:s=80,rightPaneWidth:a=0}){const l=i.useRef(null),[d,c]=i.useState(r),[u,h]=i.useState(!1),f=i.useRef(a),b=i.useRef({isDragging:!1,startX:0,startLeftWidth:0}),x=i.useRef(null),w=St();i.useEffect(()=>{if(a!==f.current)if(f.current=a,l.current&&a>0){const k=l.current.getBoundingClientRect().width;if(k>0){const R=(k-a-6)/k*100,C=Math.min(Math.max(R,o),s);c(C)}}else a===0&&c(r)},[a,o,s,r]);const m=i.useCallback(k=>{k.preventDefault(),b.current={isDragging:!0,startX:k.clientX,startLeftWidth:d},h(!0)},[d]),p=i.useCallback(()=>{b.current.isDragging=!1,h(!1),x.current&&(cancelAnimationFrame(x.current),x.current=null)},[]),S=i.useCallback(()=>{if(!b.current.isDragging||!l.current)return;const k=l.current.getBoundingClientRect(),R=k.width,$=((b.current.currentX||0)-k.left)/R*100,O=Math.min(Math.max($,o),s);c(O),b.current.isDragging&&(x.current=requestAnimationFrame(S))},[o,s]),N=i.useCallback(k=>{b.current.isDragging&&(b.current.currentX=k.clientX,x.current||(x.current=requestAnimationFrame(S)))},[S]),T=i.useCallback(()=>{c(r)},[r]);return i.useEffect(()=>(document.addEventListener("mousemove",N),document.addEventListener("mouseup",p),()=>{document.removeEventListener("mousemove",N),document.removeEventListener("mouseup",p),x.current&&cancelAnimationFrame(x.current)}),[N,p]),t.jsx("div",{className:"h-full w-full",children:w.has("md")?t.jsxs("div",{className:"flex flex-col border border-solid border-gray-200 shadow-sm overflow-hidden h-full bg-white",children:[t.jsx("div",{className:"flex-1 overflow-auto",children:n}),t.jsx("div",{className:"h-1 bg-gray-200"}),t.jsx("div",{className:"flex-1 overflow-auto",children:e})]}):t.jsxs("div",{ref:l,className:"flex h-full w-full overflow-hidden border border-solid border-gray-200 shadow-sm bg-white",children:[t.jsx("div",{className:"h-full overflow-auto",style:{width:`${d}%`},children:e}),t.jsx("div",{className:"cursor-col-resize bg-gray-200 hover:bg-gray-300 transition-colors",style:{width:"6px"},onDoubleClick:T,onMouseDown:m}),t.jsx("div",{className:"h-full overflow-auto flex-1",children:n})]})})}const nn={};function kt(e){const n=Ct();return nn[n]=e,n}function Nt(e){return nn[e]}function tr(e){if(!e.includes("browser://"))return e;const n=/<img[^>]*src="browser:\/\/([^"]+)"[^>]*>/g;return e.replace(n,(r,o)=>{const s=Nt(o);return s?r.replace(`browser://${o}`,s):r})}function Et(e){return`![Image](browser://${e})`}function Ct(){return"img_"+Math.random().toString(36).substr(2,9)}const Mt=ge.baseTheme({"&":{fontSize:"16px",height:"100%"},"&.cm-focused":{outline:"none"},".cm-gutters":{fontWeight:"bold",border:"none",backgroundColor:"white"},".cm-scroller":{fontFamily:"var(--font-mono)",height:"100%"},".cm-content":{padding:"10px"}}),rr=({value:e,onChange:n})=>{const{t:r}=Q(),o=i.useRef(null),s=i.useRef(),a=i.useCallback(l=>E(void 0,null,function*(){var c;const d=(c=l.clipboardData)==null?void 0:c.items;if(d){for(let u=0;u<d.length;u++)if(d[u].type.indexOf("image")!==-1){l.preventDefault();const h=d[u].getAsFile();if(h)try{const f=new FileReader;f.onload=b=>E(void 0,null,function*(){var p;const x=(p=b.target)==null?void 0:p.result,w=kt(x),m=Et(w);if(s.current){const S=s.current.state.selection.main.head;s.current.dispatch({changes:{from:S,insert:m}})}}),f.readAsDataURL(h)}catch(f){console.error(f),L.error(r("commonToast.error"))}break}}}),[]);return i.useEffect(()=>{if(!o.current)return;const l=Wn.create({doc:e,extensions:[qn,Gn(),ge.lineWrapping,ge.updateListener.of(c=>{if(c.docChanged){const u=c.state.doc.toString();n(u)}}),Mt]}),d=new ge({state:l,parent:o.current});return s.current=d,()=>{d.destroy()}},[]),i.useEffect(()=>{if(!s.current)return;const l=s.current.state.doc.toString();e!==l&&s.current.dispatch({changes:{from:0,to:s.current.state.doc.length,insert:e}})},[e]),t.jsx("div",{ref:o,onPaste:a,className:"h-full"})};function Rt(e){if(e.startsWith("http://")||e.startsWith("https://"))return e;const n=e.startsWith("/")?e:`/${e}`;return`${_}${n}`}function tn(e,n,r,o){if(e<=r&&n<=o)return{width:e,height:n};const s=e/n;let a=r,l=r/s;return l>o&&(l=o,a=o*s),{width:Math.round(a),height:Math.round(l)}}function It(e,n,r={}){const{maxWidth:o=200,maxHeight:s=300,maintainAspectRatio:a=!0}=r;let l=r.width,d=r.height;if(a&&l&&d){const c=tn(e,n,o,s);l=c.width,d=c.height}return l=l||o,d=d||s,`${_}/image/id/${r.id}/${l}/${d}`}function rn(e,n,r){return It(n,r,{id:e,width:n,height:r,maintainAspectRatio:!0})}let on=class Ne{constructor(n){W(this,"id");W(this,"uuid");W(this,"url");W(this,"title");W(this,"description");W(this,"width");W(this,"height");W(this,"tags");W(this,"asset");this.id=n.id,this.uuid=n.uuid,this.url=n.url,this.title=n.title,this.description=n.description,this.width=n.width,this.height=n.height,this.tags=n.tags,this.asset=n.asset}getAspectRatio(){return this.width/this.height}getDisplayDimensions(n,r){return tn(this.width,this.height,n,r)}toImageItem(){return{id:this.id,uuid:this.uuid,url:this.url,title:this.title,description:this.description,width:this.width,height:this.height,tags:this.tags,asset:this.asset}}static fromImageItem(n){return new Ne(n)}static fromImageItems(n){return n.map(r=>new Ne(r))}};const sn=({isVisible:e,position:n,children:r,onPositionChange:o,zIndex:s=50})=>{const a=i.useRef(null);return i.useEffect(()=>{if(a.current&&o&&e){const l=a.current.getBoundingClientRect();o(l)}},[e,o]),e?kn.createPortal(t.jsx("div",{ref:a,className:"fixed origin-top-left",style:{top:n.top,left:n.left,width:280,opacity:1,backgroundColor:"rgba(31, 41, 55, 0.9)",borderRadius:"0.5rem",backdropFilter:"blur(4px)",boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",padding:"1rem",animation:"fadeIn 0.2s ease-out forwards",zIndex:s},children:r}),document.body):null},At=()=>{if(typeof document!="undefined"&&!document.getElementById("ui-popover-styles")){const e=document.createElement("style");e.id="ui-popover-styles",e.innerHTML=`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    `,document.head.appendChild(e)}};typeof document!="undefined"&&At();const an=({triggerRect:e,popoverWidth:n=280,popoverHeight:r=300,gap:o=16,minMargin:s=20})=>{const a=window.innerWidth,l=window.innerHeight;let d=e.top,c=e.right+o;return c+n>a-s&&(e.left>n+s?c=e.left-n-o:(c=e.left,d=e.bottom+o,d+r>l-s&&(d=e.top-r-o))),d<s&&(d=s),c<s&&(c=s),{top:d,left:c}},Tt=({image:e,onClick:n,prefetched:r=!1})=>{const{id:o,title:s,description:a,tags:l,width:d,height:c}=e;new on(e);const u=rn(o,d,c),[h,f]=i.useState(r),[b,x]=i.useState(!1),[w,m]=i.useState(!1),[p,S]=i.useState({top:0,left:0}),[N,T]=i.useState({width:0,height:0}),k=i.useRef(null),R=i.useRef(null);i.useEffect(()=>{const j=u.match(/\/(\d+)\/(\d+)$/);if(j){const A=parseInt(j[1],10),v=parseInt(j[2],10);T({width:A,height:v})}},[u]);const C=()=>{n(e)},z=()=>{f(!0)},$=()=>{b&&k.current&&(D(),m(!0))},O=()=>{m(!1)},D=()=>{if(!k.current)return;const j=k.current.getBoundingClientRect(),A=an({triggerRect:j});S(A)};i.useEffect(()=>{if(w){const j=()=>{D()};return window.addEventListener("resize",j),window.addEventListener("scroll",j),()=>{window.removeEventListener("resize",j),window.removeEventListener("scroll",j)}}},[w]),i.useEffect(()=>{if(r){f(!0);return}if(b&&!h&&R.current){R.current.loading="eager";const j=new window.Image;return j.crossOrigin="anonymous",j.onload=z,j.onerror=()=>{console.error(`Failed to load image: ${u}`)},j.src=u,()=>{j.onload=null,j.onerror=null}}},[u,b,h,r]),i.useEffect(()=>{if(r){x(!0);return}const j=k.current;if(!j)return;const A=new IntersectionObserver(v=>{v[0].isIntersecting&&(x(!0),A.unobserve(j))},{rootMargin:"200px",threshold:.01});return A.observe(j),()=>{A.unobserve(j),A.disconnect()}},[r]);const H=16;return t.jsxs("div",{ref:k,className:"relative group overflow-hidden rounded-lg shadow-md bg-white mb-4 transition-transform hover:shadow-xl hover:-translate-y-1 cursor-pointer",onClick:C,onMouseEnter:$,onMouseLeave:O,style:{width:N.width>0?N.width+H*2:"auto"},children:[t.jsxs("div",{className:"relative overflow-hidden",style:{height:N.height>0?N.height+H:0,padding:H/2},children:[!h&&t.jsx("div",{className:"absolute inset-0 bg-gray-100 animate-pulse"}),(b||r)&&t.jsx("img",{ref:R,src:u,alt:s,className:`transition-opacity duration-300 ${h?"opacity-100":"opacity-0"}`,loading:r?"eager":"lazy",decoding:"async",onLoad:z,width:N.width,height:N.height,style:{display:"block",margin:"0 auto"}})]}),b&&t.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300",children:t.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300",children:[t.jsx("h3",{className:"text-white font-semibold text-base line-clamp-1",children:s}),l.length>0&&t.jsxs("div",{className:"mt-1 text-xs text-gray-200",children:[l.length," 个标签"]})]})}),t.jsxs(sn,{isVisible:b&&w,position:p,zIndex:50,children:[t.jsx("h3",{className:"font-semibold text-lg text-white",children:s}),a&&t.jsx("div",{className:"mt-2 max-h-48 overflow-y-auto custom-scrollbar",children:t.jsx("p",{className:"text-gray-200 text-sm whitespace-pre-line",children:a})}),l.length>0&&t.jsx("div",{className:"flex flex-wrap gap-2 mt-3",children:l.map(j=>t.jsx("span",{className:"text-xs px-2 py-1 bg-white/20 text-white rounded-full",children:j},j))}),t.jsx("div",{className:"mt-3 text-xs text-gray-300",children:N.width>0?`${N.width} × ${N.height}`:`${d} × ${c}`})]})]})};var $t=i.memo(Tt);const Pt=({image:e,isOpen:n,onClose:r})=>{const[o,s]=i.useState(!1),[a,l]=i.useState({width:0,height:0}),[d,c]=i.useState("idle");i.useEffect(()=>{s(!1),c("idle")},[e]);const u=i.useCallback(()=>{const S=Math.round(window.innerWidth*.9),N=Math.round(window.innerHeight*(1-2*.05));l({width:S,height:N}),console.log("Modal dimensions:",S,N)},[]);if(i.useEffect(()=>{if(n)return u(),window.addEventListener("resize",u),()=>{window.removeEventListener("resize",u)}},[n,u]),i.useEffect(()=>{const p=S=>{n&&S.key==="Escape"&&r()};return window.addEventListener("keydown",p),()=>{window.removeEventListener("keydown",p)}},[n,r]),i.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[n]),i.useEffect(()=>{let p;return d==="copied"&&(p=window.setTimeout(()=>{c("idle")},2e3)),()=>{p&&clearTimeout(p)}},[d]),!e||!n)return null;const h=new on(e),f=e.asset?Rt(e.asset):e.url,b=()=>`${_}/image/id/${e.id}/${e.width}/${e.height}`,x=()=>E(void 0,null,function*(){const p=b();try{yield navigator.clipboard.writeText(p),c("copied")}catch(S){console.error("Failed to copy",S)}}),w=()=>{s(!0)},m=h.getDisplayDimensions(a.width*.95,a.height*.75);return t.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[t.jsx("div",{className:"absolute inset-0 bg-black/80 backdrop-blur-sm",onClick:r}),t.jsxs("div",{className:"relative z-10 flex flex-col bg-white rounded-xl overflow-hidden shadow-2xl",style:{width:`${a.width}px`,height:`${a.height}px`},children:[t.jsx("button",{onClick:r,className:"absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full text-gray-700 hover:text-gray-900 transition-colors shadow-md","aria-label":"Close",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),!o&&t.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-gray-100",children:t.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"})}),t.jsx("div",{className:"relative flex-grow overflow-hidden flex items-center justify-center p-4",children:t.jsx("img",{src:f,alt:e.title,className:`transition-opacity duration-200 ${o?"opacity-100":"opacity-0"}`,loading:"eager",decoding:"async",onLoad:w,style:{width:`${m.width}px`,height:`${m.height}px`,objectFit:"contain"}})}),t.jsx("div",{className:"p-6 bg-white border-t border-gray-200",children:t.jsxs("div",{className:"flex flex-col",children:[t.jsx("h2",{className:"text-xl font-bold text-gray-900",children:e.title}),e.description&&t.jsx("p",{className:"mt-2 text-gray-600",children:e.description}),e.tags&&e.tags.length>0&&t.jsx("div",{className:"mt-4 flex flex-wrap gap-2",children:e.tags.map(p=>t.jsx("span",{className:"px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full",children:p},p))}),t.jsxs("div",{className:"mt-3 flex justify-between items-center",children:[t.jsxs("div",{className:"text-sm text-gray-500",children:["Dimensions: ",e.width," × ",e.height]}),t.jsx(J,{color:d==="copied"?"success":"primary",variant:"flat",size:"sm",onClick:x,className:"transition-colors",children:d==="copied"?t.jsxs("div",{className:"flex items-center",children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),"已复制"]}):t.jsxs("div",{className:"flex items-center",children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"})}),"复制链接"]})})]})]})})]})]})};var Ft=i.memo(Pt);const Lt={mobile:1,tablet:2,desktop:3},ln=i.memo(({children:e,columnCount:n=Lt,gap:r="1rem",autoLayout:o=!0,minItemWidth:s=200})=>{const[a,l]=i.useState(n.desktop),d=i.useRef(null),c=i.useRef(null),u=i.useRef(null),[h,f]=i.useState(!1);i.useEffect(()=>{if(!o)if(typeof ResizeObserver!="undefined"){const w=m=>{m.length&&(u.current&&window.clearTimeout(u.current),u.current=window.setTimeout(()=>{const p=m[0].contentRect.width;f(!0),p<640?l(n.mobile):p<1024?l(n.tablet):l(n.desktop),u.current=window.setTimeout(()=>{f(!1)},50)},100))};return c.current=new ResizeObserver(w),d.current&&c.current.observe(d.current),()=>{c.current&&c.current.disconnect(),u.current&&clearTimeout(u.current)}}else{const w=()=>{const S=window.innerWidth;S<640?l(n.mobile):S<1024?l(n.tablet):l(n.desktop)};w();let m;const p=()=>{clearTimeout(m),f(!0),m=window.setTimeout(()=>{w(),f(!1)},100)};return window.addEventListener("resize",p),()=>{window.removeEventListener("resize",p),clearTimeout(m)}}},[n,o]);const b=i.useMemo(()=>{if(o)return[e];if(!e||e.length===0)return Array(a).fill([]);const w=Array(a).fill(null).map(()=>[]);return e.forEach((m,p)=>{const S=p%a;w[S].push(m)}),w},[e,a,o]),x=h?"masonry-grid-layouting":"";return o?t.jsx("div",{ref:d,className:`w-full ${x}`,style:{display:"grid",gridTemplateColumns:`repeat(auto-fill, minmax(${s}px, max-content))`,gap:r,justifyContent:"center",contain:"paint layout style"},children:e}):t.jsx("div",{ref:d,className:`w-full ${x}`,style:{display:"grid",gridTemplateColumns:`repeat(${a}, 1fr)`,gap:r,containIntrinsicSize:"auto",contain:"paint layout style",willChange:"contents",contentVisibility:"auto"},children:b.map((w,m)=>t.jsx("div",{className:"flex flex-col",style:{gap:r,transform:"translateZ(0)",willChange:"contents",contain:"layout paint"},children:w.map((p,S)=>{const N=`item-${m}-${S}`;return t.jsx("div",{style:{willChange:h?"transform":"auto",contain:"content",transform:"translateZ(0)",margin:0,padding:0},children:p},N)})},`column-${m}`))})});ln.displayName="MasonryGrid";function zt(e){return{id:String(e.id),uuid:e.uuid,url:e.asset,title:e.name,description:e.desc,width:e.width,height:e.height,tags:e.tags,asset:e.asset}}function Dt(e){return e.flat().filter(Boolean)}function _t(e,n){const r=[];if(e.trim()){const s=e.trim(),a=[`name:${s}`,`description:${s}`,`tags:${s}`];r.push(a.join(" OR ")),console.log("Added search term conditions:",a.join(" OR "))}if(n.length>0){const s=n.map(a=>`tags:${a}`).join(" OR ");r.push(s),console.log("Added tag filter conditions:",s)}let o="";return r.length>1?o=r.map(s=>`(${s})`).join(" AND "):o=r[0]||"",console.log("Final constructed query:",o),o}const cn={fetchImages(){return E(this,arguments,function*(e=1,n=de.count,r="",o=[]){const s=e-1;try{const a=r.trim()!==""||o.length>0,l={type:de.type,count:n,offset:s,order:de.order};console.log("Fetching images with:",{endpoint:a?"search":"list",page:e,limit:n,searchTerm:r.trim(),selectedTags:o,params:l});let d;if(a){const h=_t(r,o);if(h){const f=F(P({},l),{q:h});console.log("Search query:",h),console.log("Search params:",f);const b=G.IMAGE_SEARCH;console.log("Search API URL format:",`${b}?${new URLSearchParams(f).toString()}`),console.log("After encoding fixes, the URL should use %20 instead of + for spaces"),d=yield q.get(G.IMAGE_SEARCH,{params:f})}else console.log("Empty search query, using regular endpoint"),d=yield q.get(G.IMAGES,{params:l})}else d=yield q.get(G.IMAGES,{params:l});if(!d)return console.error("Empty API response"),{images:[],hasMore:!1};if(!d.data)return console.error("API response missing data field:",d),{images:[],hasMore:!1};if(!Array.isArray(d.data))return console.error("API response data is not an array:",d.data),{images:[],hasMore:!1};const c=d.data.map(h=>{try{return zt(h)}catch(f){return console.error("Error mapping API image:",h,f),null}}).filter(Boolean),u=c.length===n;return console.log(`Fetched ${c.length} images, hasMore: ${u}`),{images:c,hasMore:u}}catch(a){return console.error("Error fetching images:",a),{images:[],hasMore:!1}}})},fetchAllTags(){return E(this,null,function*(){try{console.log("Fetching all image tags");const e={type:de.type},n=yield q.get(G.IMAGE_TAGS,{params:e});return!n||!n.data?(console.error("Invalid API response for tags:",n),[]):Array.isArray(n.data)?Dt(n.data):(console.error("Tags data is not an array:",n.data),[])}catch(e){return console.error("Error fetching tags:",e),[]}})}},Bt=()=>E(void 0,null,function*(){return yield cn.fetchAllTags()}),_e=(...s)=>E(void 0,[...s],function*(e=1,n=15,r="",o=[]){return yield cn.fetchImages(e,n,r,o)}),dn=({onSearch:e,initialValue:n="",placeholder:r="Search...",className:o="",showKeyboardShortcut:s=!1,autoFocus:a=!1})=>{const[l,d]=i.useState(n),[c,u]=i.useState(!1),h=i.useRef(null),f=i.useRef(null);i.useEffect(()=>{d(n)},[n]),i.useEffect(()=>{a&&f.current&&f.current.focus()},[a]);const b=m=>{const p=m.target.value;d(p),h.current&&clearTimeout(h.current),h.current=setTimeout(()=>{e&&e(p)},500)};i.useEffect(()=>()=>{h.current&&clearTimeout(h.current)},[]);const x=m=>{m.preventDefault(),h.current&&clearTimeout(h.current),e&&e(l)},w=()=>{d(""),e&&e(""),f.current&&f.current.focus()};return t.jsxs("form",{onSubmit:x,className:`relative transition-all duration-200 ${c?"ring-2 ring-offset-2 ring-primary/60":""} ${o}`,children:[t.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:t.jsx("svg",{className:"w-5 h-5 text-gray-500","aria-hidden":"true",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})}),t.jsx("input",{ref:f,type:"search",className:"block w-full p-3 pl-10 pr-12 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none",placeholder:r,value:l,onChange:b,onFocus:()=>u(!0),onBlur:()=>u(!1)}),l&&t.jsx("button",{type:"button",className:"absolute inset-y-0 right-12 flex items-center px-2 text-gray-500 hover:text-gray-700",onClick:w,"aria-label":"Clear search",children:t.jsx("svg",{className:"w-5 h-5",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})}),s&&t.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none",children:t.jsx("span",{className:"border border-gray-300 rounded px-1.5 py-0.5 text-xs font-mono",children:"⌘K"})}),!s&&t.jsxs("button",{type:"submit",className:"absolute inset-y-0 right-0 flex items-center px-3 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-colors",children:[t.jsx("span",{className:"sr-only",children:"Search"}),t.jsx("svg",{className:"w-5 h-5 text-gray-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 5l7 7-7 7"})})]})]})},Se=new Map,Ot=(e,n=500)=>{if(!e)return!1;const r=e.getBoundingClientRect();return r.top<=window.innerHeight+n&&r.bottom>=-n},un=()=>{const[e,n]=i.useState([]),[r,o]=i.useState(!0),[s,a]=i.useState(!0),[l,d]=i.useState(null),[c,u]=i.useState(null),[h,f]=i.useState(!1),[b,x]=i.useState(1),[w,m]=i.useState(!0),[p,S]=i.useState(""),[N,T]=i.useState([]),[k,R]=i.useState([]),[C,z]=i.useState(0),[$,O]=i.useState(40),D=i.useRef(null),H=i.useRef(null),j=i.useRef(null),A=i.useRef(new Map),v=i.useRef(null),I=i.useRef(0),B=i.useRef(new Set),X=i.useCallback(g=>{const y=rn(g.id,g.width,g.height);if(Se.has(y))return Se.get(y);const M=new Image;return M.crossOrigin="anonymous",M.src=y,Se.set(y,M),M},[]),Z=i.useCallback((g,y=!1)=>{const M=U=>{U.forEach(Y=>X(Y))};y?(M(g.slice(0,12)),g.length>12&&("requestIdleCallback"in window?window.requestIdleCallback(()=>{M(g.slice(12))}):setTimeout(()=>M(g.slice(12)),200))):"requestIdleCallback"in window?window.requestIdleCallback(()=>{M(g)}):setTimeout(()=>M(g),500)},[X]);i.useEffect(()=>{E(void 0,null,function*(){try{a(!0),o(!0),x(1),B.current.clear();const y=yield Bt();T(y);const{images:M,hasMore:U}=yield _e(1,10,p,k);n(M),m(U),d(null),Z(M,!0)}catch(y){d("Failed to load images. Please try again later."),console.error("Error loading images:",y)}finally{a(!1),o(!1)}})},[p,k,Z]);const ae=i.useCallback((g,y=!1)=>{if(e.length+g.length<50){z(0),O(e.length+g.length-1);return}const U=Math.max($,e.length+Math.min(g.length,20)-1);O(U);for(let Y=e.length;Y<e.length+g.length;Y++)B.current.add(Y);y&&g.length>0&&setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},100)},[e.length,$]),le=i.useCallback(()=>E(void 0,null,function*(){if(!r&&w)try{o(!0),I.current=window.scrollY;const g=b+1,{images:y,hasMore:M}=yield _e(g,10,p,k);y.length>0&&(n(U=>{const Y=[...U,...y];return Z(y,!1),Y}),ae(y),x(g)),m(M&&y.length>0)}catch(g){console.error("Error loading more images:",g)}finally{o(!1),setTimeout(()=>{I.current>0&&window.scrollTo(0,I.current)},50)}}),[r,w,b,p,k,Z,ae]),re=i.useCallback(()=>{v.current&&window.clearTimeout(v.current),v.current=window.setTimeout(()=>{if(!j.current||e.length===0)return;if(e.length<50){z(0),O(e.length-1),v.current=null;return}const g={start:Math.max(0,C-4),end:Math.min(e.length-1,$+4)};if(A.current.forEach((y,M)=>{const U=e.findIndex(Y=>Y.id===M);U!==-1&&Ot(y)&&(g.start=Math.min(g.start,U),g.end=Math.max(g.end,U))}),g.start=Math.max(0,g.start-15),g.end=Math.min(e.length-1,g.end+15),B.current.forEach(y=>{y>=g.start-5&&y<=g.end+5&&(g.start=Math.min(g.start,y),g.end=Math.max(g.end,y))}),g.start!==C||g.end!==$){z(g.start),O(g.end);for(let y=g.start;y<=g.end;y++)B.current.add(y)}v.current=null},100)},[e.length,C,$]),xn=i.useCallback((g,y)=>{y?A.current.set(g,y):A.current.delete(g)},[]);i.useEffect(()=>{const g=()=>{re()};return window.addEventListener("scroll",g,{passive:!0}),re(),()=>{window.removeEventListener("scroll",g),v.current&&window.clearTimeout(v.current)}},[re]),i.useEffect(()=>{const g=H.current;if(g)return D.current&&D.current.disconnect(),D.current=new IntersectionObserver(y=>{y[0].isIntersecting&&w&&!r&&le()},{threshold:.1,rootMargin:"500px"}),D.current.observe(g),()=>{D.current&&g&&D.current.unobserve(g)}},[w,r,le]),i.useMemo(()=>{if(e.length===0)return[];if(e.length<50)return e;const g=e.slice(C,$+1);return g.length<20&&e.length>20?e.slice(0,Math.min(40,e.length)):g},[e,C,$]),i.useEffect(()=>{!s&&!r&&e.length>0&&re()},[e.length,s,r,re]);const bn=i.useCallback(g=>{S(g)},[]),wn=i.useCallback(g=>{R(y=>y.includes(g)?y.filter(M=>M!==g):[...y,g])},[]),jn=i.useCallback(()=>{S(""),R([])},[]);return s?t.jsx("div",{className:"flex justify-center items-center min-h-[60vh]",children:t.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"})}):l&&e.length===0?t.jsx("div",{className:"flex justify-center items-center min-h-[60vh]",children:t.jsxs("div",{className:"text-center p-4 bg-red-50 rounded-lg max-w-md",children:[t.jsx("h3",{className:"text-red-800 text-lg font-semibold mb-2",children:"Error"}),t.jsx("p",{className:"text-red-600",children:l})]})}):t.jsxs("div",{ref:j,className:"w-full h-full flex flex-col",children:[t.jsxs("div",{className:"flex flex-col items-center justify-center mb-8",children:[t.jsx("h1",{className:"text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6",children:"Image Gallery"}),t.jsx("div",{className:"w-full max-w-xl mx-auto mb-6",children:t.jsx(dn,{onSearch:bn,initialValue:p,placeholder:"Search images...",autoFocus:!1})}),N.length>0&&t.jsx("div",{className:"w-full max-w-2xl mx-auto",children:t.jsxs("div",{className:"flex flex-wrap justify-center gap-2 mt-2",children:[k.length>0&&t.jsx("button",{onClick:jn,className:"px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-full text-sm font-medium transition-colors",children:"Clear Filters"}),N.map(g=>t.jsx("button",{onClick:()=>wn(g),className:`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${k.includes(g)?"bg-blue-500 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}
                  `,children:g},g))]})})]}),!1,t.jsxs("div",{className:"w-full flex-grow",children:[r&&e.length===0?t.jsx("div",{className:"w-full h-64 flex items-center justify-center",children:t.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-gray-200"})}):l?t.jsxs("div",{className:"w-full p-8 text-center",children:[t.jsx("p",{className:"text-red-500",children:l}),t.jsx("button",{className:"mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",onClick:()=>window.location.reload(),children:"Retry"})]}):e.length===0?t.jsx("div",{className:"w-full p-8 text-center",children:t.jsx("p",{className:"text-gray-500 dark:text-gray-400",children:"No images found. Try adjusting your search criteria."})}):t.jsx(ln,{children:e.map((g,y)=>(y>=C&&y<=$||B.current.has(y))&&t.jsx("div",{ref:M=>M&&xn(g.id,M),"data-index":y,children:t.jsx($t,{image:g,onClick:M=>{u(M),f(!0)},prefetched:y<20})},g.id))}),!s&&w&&t.jsx("div",{ref:H,className:"w-full flex justify-center py-8",children:r&&t.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 dark:border-gray-300"})})]}),t.jsx(Ft,{image:c,isOpen:h,onClose:()=>f(!1)})]})};var or=Object.freeze({__proto__:null,default:un});const hn="md_friday_projects",Ae="md_friday_current_project_id",te=()=>{const e=localStorage.getItem(hn);return e?JSON.parse(e):[]},mn=()=>localStorage.getItem(Ae),fn=e=>{localStorage.setItem(Ae,e)},Ht=()=>{const e=mn();return e?te().find(r=>r.id===e)||null:(console.log("MD_FRIDAY_DEBUG: getCurrentProject - 没有当前项目ID"),null)},gn=e=>te().find(r=>r.id===e)||null,Ut=e=>{try{const n=JSON.stringify(e);localStorage.setItem(hn,n)}catch(n){console.error("MD_FRIDAY_DEBUG: saveProjects - 保存失败，错误:",n)}},Wt=e=>{const n=te(),r=n.findIndex(o=>o.id===e.id);if(r!==-1){const o=new Date().toISOString();n[r]=F(P({},e),{updatedAt:o}),Ut(n)}else console.warn("MD_FRIDAY_DEBUG: updateProject - 未找到项目，无法更新",e.id)},sr=(e,n)=>{const r=gn(e);if(!r)return null;const o=s=>{for(const a of s){if(a.id===n)return a;if(a.isDirectory&&a.children){const l=o(a.children);if(l)return l}}return null};return o(r.files)},ar=(e,n,r)=>{const o=gn(e);if(!o){console.warn("MD_FRIDAY_DEBUG: updateFileContent - 未找到项目，无法更新",e);return}const s=a=>{for(let l=0;l<a.length;l++){if(a[l].id===n)return a[l].content=r,!0;if(a[l].isDirectory&&a[l].children){const d=a[l].children||[];if(s(d))return!0}}return!1};try{const a=JSON.parse(JSON.stringify(o.files));if(s(a)){const d=F(P({},o),{files:a,updatedAt:new Date().toISOString()});Wt(d)}else console.warn("MD_FRIDAY_DEBUG: updateFileContent - 未找到文件，无法更新",n)}catch(a){console.error("MD_FRIDAY_DEBUG: updateFileContent - 更新过程中发生错误",a)}},lr=(e="zh")=>{const n=te();if(n.length===0)return localStorage.removeItem(Ae),null;const r=mn();return!r||!n.some(o=>o.id===r)?(fn(n[0].id),n[0]):Ht()},pn=({isOpen:e,onClose:n,title:r,searchTerm:o="",onSearch:s,tags:a=[],selectedTags:l=[],onTagSelect:d,onClearFilters:c,children:u,isLoading:h=!1,loadingMessage:f="加载中...",onScroll:b})=>{const x={wrapper:"p-0",base:"max-w-[90%] w-[90%] h-[90%] max-h-[90%] m-auto",body:"p-0 h-full",backdrop:"bg-black/80"};return t.jsx(Rn,{isOpen:e,onClose:n,size:"full",classNames:x,scrollBehavior:"inside",children:t.jsxs(In,{children:[t.jsx(An,{className:"border-b pb-3",children:t.jsx("h3",{className:"text-lg font-semibold",children:r})}),t.jsx(Tn,{children:t.jsxs("div",{className:"px-4 py-3 flex flex-col h-full modal-content-container",children:[s&&t.jsx("div",{className:"w-full max-w-xl mx-auto mb-6",children:t.jsx(dn,{onSearch:s,initialValue:o,placeholder:"搜索...",autoFocus:!1})}),a.length>0&&d&&t.jsx("div",{className:"w-full max-w-2xl mx-auto mb-4",children:t.jsxs("div",{className:"flex flex-wrap justify-center gap-2 mt-2",children:[l&&l.length>0&&c&&t.jsx("button",{onClick:c,className:"px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-full text-sm font-medium transition-colors",children:"清除筛选"}),a.map(w=>t.jsx("button",{onClick:()=>d(w),className:`
                        px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                        ${l&&l.includes(w)?"bg-blue-500 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}
                      `,children:w},w))]})}),t.jsxs("div",{className:"flex-1 overflow-y-auto modal-body-content no-scrollbar",onScroll:b,children:[u,h&&t.jsxs("div",{className:"py-4 text-center",children:[t.jsx($n,{size:"sm",color:"primary"}),t.jsx("span",{className:"ml-2",children:f})]})]})]})})]})})},qt=({shortcode:e,isSelected:n,onClick:r,prefetched:o=!1})=>{const{id:s,title:a,description:l,tags:d,asset:c,width:u,height:h}=e,f=Qn(s,c,u,h,300,200),[b,x]=i.useState(o),[w,m]=i.useState(!1),[p,S]=i.useState(!1),[N,T]=i.useState({top:0,left:0}),k=i.useRef(null),R=i.useRef(null),C=()=>{r(e)},z=()=>{x(!0)},$=()=>{w&&k.current&&(D(),S(!0))},O=()=>{S(!1)},D=()=>{if(!k.current)return;const j=k.current.getBoundingClientRect(),A=an({triggerRect:j});T(A)};i.useEffect(()=>{if(p){const j=()=>{D()};return window.addEventListener("resize",j),window.addEventListener("scroll",j),()=>{window.removeEventListener("resize",j),window.removeEventListener("scroll",j)}}},[p]),i.useEffect(()=>{if(o){x(!0);return}if(w&&!b&&R.current){const j=new window.Image;return j.crossOrigin="anonymous",j.onload=z,j.onerror=()=>{console.error(`Failed to load image: ${f.url}`)},j.src=f.url,()=>{j.onload=null,j.onerror=null}}},[f.url,w,b,o]),i.useEffect(()=>{if(o){m(!0);return}const j=k.current;if(!j)return;const A=new IntersectionObserver(v=>{v[0].isIntersecting&&(m(!0),A.unobserve(j))},{rootMargin:"200px",threshold:.01});return A.observe(j),()=>{A.unobserve(j),A.disconnect()}},[o]);const H=16;return t.jsxs("div",{ref:k,className:`relative group overflow-hidden rounded-lg shadow-md bg-white transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer optimized-card ${n?"ring-2 ring-blue-500 border-blue-500":"border border-gray-200"}`,onClick:C,onMouseEnter:$,onMouseLeave:O,style:{width:f.displayWidth>0?f.displayWidth+H*2:"auto"},children:[t.jsxs("div",{className:"relative overflow-hidden optimized-card-image-container",style:{height:f.displayHeight>0?f.displayHeight+H:0,padding:H/2},children:[!b&&t.jsx("div",{className:"absolute inset-0 bg-gray-100 animate-pulse optimized-card-loading"}),(w||o)&&t.jsx("img",{ref:R,src:f.url,alt:a,className:`transition-opacity duration-300 optimized-card-image ${b?"opacity-100":"opacity-0"}`,loading:o?"eager":"lazy",decoding:"async",onLoad:z,width:f.displayWidth,height:f.displayHeight,style:{display:"block",margin:"0 auto",objectFit:"contain",maxWidth:"100%",maxHeight:"100%"}})]}),w&&t.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300",children:t.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300",children:[t.jsx("h3",{className:"text-white font-semibold text-base line-clamp-1",children:a}),d.length>0&&t.jsxs("div",{className:"mt-1 text-xs text-gray-200",children:[d.length," 个标签"]})]})}),t.jsxs(sn,{isVisible:w&&p,position:N,zIndex:50,children:[t.jsx("h3",{className:"font-semibold text-lg text-white",children:a}),l&&t.jsx("div",{className:"mt-2 max-h-48 overflow-y-auto custom-scrollbar",children:t.jsx("p",{className:"text-gray-200 text-sm whitespace-pre-line",children:l})}),d.length>0&&t.jsx("div",{className:"flex flex-wrap gap-2 mt-3",children:d.map(j=>t.jsx("span",{className:"text-xs px-2 py-1 bg-white/20 text-white rounded-full",children:j},j))}),t.jsxs("div",{className:"mt-3 text-xs text-gray-300",children:[u," × ",h]})]})]})};var Gt=i.memo(qt);const Vt=({shortcodes:e,selectedShortcode:n,onShortcodeSelect:r,emptyMessage:o="没有找到模板",isLoading:s=!1})=>{const[a,l]=i.useState(!1),d=i.useRef(null),c=i.useRef(null),u=i.useRef(null),h=i.useMemo(()=>e.slice(0,9),[e]),f=x=>h.some(w=>w.id===x.id);if(i.useEffect(()=>{if(typeof ResizeObserver!="undefined"){const x=w=>{w.length&&(u.current&&window.clearTimeout(u.current),u.current=window.setTimeout(()=>{l(!0),u.current=window.setTimeout(()=>{l(!1)},50)},100))};return c.current=new ResizeObserver(x),d.current&&c.current.observe(d.current),()=>{c.current&&c.current.disconnect(),u.current&&clearTimeout(u.current)}}},[]),e.length===0&&!s)return t.jsx("div",{className:"flex justify-center items-center py-12 text-gray-500",children:o});const b=a?"masonry-grid-layouting":"";return t.jsx("div",{ref:d,className:`w-full ${b}`,style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))",gap:"1.5rem",justifyContent:"center",containIntrinsicSize:"auto",contain:"paint layout style"},children:e.map(x=>t.jsx("div",{style:{willChange:a?"transform":"auto",contain:"content",transform:"translateZ(0)"},children:t.jsx(Gt,{shortcode:x,isSelected:(n==null?void 0:n.id)===x.id,onClick:r,prefetched:f(x)})},x.id))})},fe={success:e=>console.log("SUCCESS:",e),error:e=>console.error("ERROR:",e)},Jt=({isOpen:e,onClose:n,onProjectCreated:r})=>{const{t:o}=Q(),{shortcodeTags:s,searchTerm:a,selectedTags:l,shortcodes:d,hasMoreShortcodes:c,isLoadingShortcodes:u,selectedShortcode:h,setCreatingProject:f,selectTag:b,loadMoreShortcodes:x,selectShortcode:w,createProjectFromShortcode:m,setSearchTerm:p,clearFilters:S}=nt();i.useEffect(()=>{f(!!e)},[e,f]);const N=i.useCallback(R=>{p(R)},[p]),T=i.useCallback(R=>{const{scrollTop:C,scrollHeight:z,clientHeight:$}=R.currentTarget;z-C<=$*1.5&&c&&!u&&x()},[c,u,x]),k=R=>E(void 0,null,function*(){try{w(R),fe.success("正在创建项目...");const C=yield m(R);C?(fe.success(`项目 "${C.name}" 创建成功`),n(),r&&C.id&&r(C.id)):fe.error("项目创建失败，请重试")}catch(C){console.error("Error creating project:",C),fe.error(C instanceof Error?C.message:"创建项目时发生错误")}});return t.jsx(pn,{isOpen:e,onClose:n,title:o("选择模板"),searchTerm:a,onSearch:N,tags:s,selectedTags:l,onTagSelect:b,onClearFilters:S,isLoading:u,loadingMessage:o("加载模板中..."),onScroll:T,children:t.jsx(Vt,{shortcodes:d,selectedShortcode:h,onShortcodeSelect:k,emptyMessage:o(a?"没有找到匹配的模板":"没有找到模板"),isLoading:u})})};function ir({isOpen:e,onToggle:n,onProjectSelect:r}){const{i18n:o,t:s}=Q(),[a,l]=i.useState([]),[d,c]=i.useState(null),[u,h]=i.useState(!1),[f,b]=i.useState(!1);i.useEffect(()=>{const m=()=>{const N=te();l(N);const T=localStorage.getItem("md_friday_current_project_id");c(T)};m();const p=()=>{m()},S=()=>{m()};return window.addEventListener("storage",p),window.addEventListener("project-updated",S),()=>{window.removeEventListener("storage",p),window.removeEventListener("project-updated",S)}},[]);const x=m=>{fn(m),c(m),r&&r(m),window.dispatchEvent(new CustomEvent("project-changed",{detail:{projectId:m}}))},w=m=>{const p=te();l(p),c(m),r&&r(m),window.dispatchEvent(new CustomEvent("project-changed",{detail:{projectId:m}})),console.log("Project created and selected:",m)};return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white transition-all duration-300 z-10 border-r border-gray-200 shadow-sm flex flex-col ${e?"w-64":"w-14"}`,children:[t.jsx("button",{onClick:n,className:"absolute -right-3 top-5 bg-white rounded-full p-1 border border-gray-200 shadow-sm hover:shadow-md transition-shadow",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:`w-4 h-4 transition-transform ${e?"rotate-0":"rotate-180"}`,children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5L8.25 12l7.5-7.5"})})}),t.jsxs("div",{className:"p-3 overflow-y-auto flex-grow",children:[t.jsxs("div",{className:"mb-4",children:[t.jsxs("div",{className:"flex items-center justify-between mb-2",children:[t.jsx("h3",{className:`font-medium text-sm ${e?"opacity-100":"opacity-0"} transition-opacity`,children:e?"项目":""}),t.jsx("button",{onClick:()=>h(!0),className:"text-blue-600 hover:text-blue-800 mr-1",title:"创建新项目",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})})})]}),t.jsx("div",{className:"space-y-1.5",children:a.length>0?a.map(m=>t.jsxs("div",{className:`flex items-center p-2 rounded-md cursor-pointer transition-colors ${m.id===d?"bg-blue-100 text-blue-700":"hover:bg-gray-100"}`,onClick:()=>x(m.id),children:[t.jsxs("div",{className:"mr-2",children:[m.type==="xiaohongshu"&&t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"})}),m.type==="resume"&&t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"})}),m.type==="website"&&t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"})})]}),t.jsx("div",{className:`truncate ${e?"block":"hidden"}`,children:m.name})]},m.id)):t.jsxs("div",{className:`p-2 ${e?"block":"hidden"}`,children:[t.jsx("div",{className:"text-sm text-gray-500",children:"还没有项目，点击上方 + 按钮创建"}),t.jsx("button",{onClick:()=>h(!0),className:"mt-2 w-full py-2 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200",children:"创建第一个项目"})]})})]}),t.jsx(Pn,{className:"my-3"}),t.jsxs("div",{className:`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${e?"justify-start":"justify-center"}`,onClick:()=>b(!0),children:[t.jsx("div",{className:"",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"})})}),t.jsx("div",{className:`truncate ${e?"block":"hidden"}`,children:"素材库"})]})]})]}),t.jsx(Jt,{isOpen:u,onClose:()=>h(!1),onProjectCreated:w}),t.jsx(pn,{isOpen:f,onClose:()=>b(!1),title:"素材库",children:t.jsx(un,{})})]})}const cr=({project:e,onFileSelect:n,onProjectUpdate:r,selectedFileId:o,isCollapsed:s,onToggleCollapse:a,className:l=""})=>{const[d,c]=i.useState(!1),[u,h]=i.useState(e.name),[f,b]=i.useState(e.updatedAt);i.useEffect(()=>{h(e.name)},[e.name]),i.useEffect(()=>{b(e.updatedAt),console.log("ProjectExplorer - 项目更新时间已更新",new Date(e.updatedAt).toLocaleString())},[e.updatedAt]);const x=()=>{if(u.trim()!==e.name){const m=F(P({},e),{name:u.trim(),updatedAt:new Date().toISOString()});r(m)}c(!1)},w=(m,p=0)=>{var T;const S=m.id===o,N=`${p*12+8}px`;return m.isDirectory?t.jsxs("div",{children:[t.jsxs("div",{className:"flex items-center px-2 py-1.5 hover:bg-gray-100 cursor-pointer",style:{paddingLeft:N},children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-4 h-4 mr-1.5 text-gray-600",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"})}),t.jsx("span",{className:"truncate",children:m.name})]}),(T=m.children)==null?void 0:T.map(k=>w(k,p+1))]},m.id):t.jsxs("div",{className:`flex items-center px-2 py-1.5 hover:bg-gray-100 cursor-pointer ${S?"bg-blue-100 text-blue-700":""}`,style:{paddingLeft:N},onClick:()=>n(m.id),children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-4 h-4 mr-1.5 text-gray-600",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"})}),t.jsx("span",{className:"truncate",children:m.name})]},m.id)};return s?t.jsx("div",{className:`h-full flex flex-col border-r border-gray-200 ${l}`,children:t.jsx("button",{onClick:a,className:"p-2 hover:bg-gray-100 text-center",title:"展开项目浏览器",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5 mx-auto",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 4.5l7.5 7.5-7.5 7.5"})})})}):t.jsxs("div",{className:`h-full flex flex-col border-r border-gray-200 w-64 ${l}`,children:[t.jsxs("div",{className:"p-3 border-b border-gray-200",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("h3",{className:"font-medium text-sm text-gray-700",children:"项目信息"}),t.jsx("button",{onClick:a,className:"text-gray-500 p-1 hover:bg-gray-100 rounded",title:"收起项目浏览器",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-4 h-4",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5L8.25 12l7.5-7.5"})})})]}),d?t.jsx("div",{className:"mt-2 flex items-center",children:t.jsx(He,{value:u,onChange:m=>h(m.target.value),onBlur:x,onKeyDown:m=>{m.key==="Enter"&&x(),m.key==="Escape"&&(h(e.name),c(!1))},size:"sm",autoFocus:!0,className:"flex-1"})}):t.jsxs("div",{className:"mt-2 font-semibold cursor-pointer hover:bg-gray-100 py-1 px-2 rounded",onClick:()=>c(!0),children:[e.name,t.jsx(Fn,{content:"点击编辑项目名称",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-3.5 h-3.5 ml-2 inline text-gray-500",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"})})})]}),t.jsxs("div",{className:"mt-1 text-xs text-gray-500 flex items-center",children:[t.jsx("span",{className:"mr-2",children:"类型:"}),t.jsxs("span",{children:[e.type==="xiaohongshu"&&"小红书",e.type==="resume"&&"简历",e.type==="website"&&"网站"]})]}),t.jsxs("div",{className:"mt-1 text-xs text-gray-500",children:["更新时间: ",new Date(f).toLocaleString()]})]}),t.jsx("div",{className:"flex-1 overflow-y-auto",children:t.jsxs("div",{className:"py-2",children:[t.jsx("h3",{className:"px-3 text-xs font-medium text-gray-700 mb-1",children:"文件"}),t.jsx("div",{className:"text-sm",children:e.files.map(m=>w(m))})]})})]})},dr=qe({base:"tracking-tight inline font-semibold",variants:{color:{violet:"from-[#FF1CF7] to-[#b249f8]",yellow:"from-[#FF705B] to-[#FFB457]",blue:"from-[#5EA2EF] to-[#0072F5]",cyan:"from-[#00b7fa] to-[#01cfea]",green:"from-[#6FEE8D] to-[#17c964]",pink:"from-[#FF72E1] to-[#F54C7A]",foreground:"dark:from-[#FFFFFF] dark:to-[#4B4B4B]"},size:{sm:"text-3xl lg:text-4xl",md:"text-[2.3rem] lg:text-5xl leading-9",lg:"text-4xl lg:text-6xl"},fullWidth:{true:"w-full block"}},defaultVariants:{size:"md"},compoundVariants:[{color:["violet","yellow","blue","cyan","green","pink","foreground"],class:"bg-clip-text text-transparent bg-gradient-to-b"}]});qe({base:"w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",variants:{fullWidth:{true:"!w-full"}},defaultVariants:{fullWidth:!0}});export{or as G,er as I,rr as M,cr as P,nr as R,ir as S,Ke as T,Wt as a,sr as b,ar as c,Kt as d,Ht as g,lr as i,tr as r,ee as s,dr as t,nt as u};

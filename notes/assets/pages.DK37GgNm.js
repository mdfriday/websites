const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/components-DquCPQod.css"])))=>i.map(i=>d[i]);
var ie=Object.defineProperty,ae=Object.defineProperties;var le=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var ce=Object.prototype.hasOwnProperty,de=Object.prototype.propertyIsEnumerable;var $=(r,n,s)=>n in r?ie(r,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[n]=s,R=(r,n)=>{for(var s in n||(n={}))ce.call(n,s)&&$(r,s,n[s]);if(O)for(var s of O(n))de.call(n,s)&&$(r,s,n[s]);return r},T=(r,n)=>ae(r,le(n));var k=(r,n,s)=>new Promise((v,h)=>{var w=o=>{try{a(s.next(o))}catch(i){h(i)}},d=o=>{try{a(s.throw(o))}catch(i){h(i)}},a=o=>o.done?v(o.value):Promise.resolve(o.value).then(w,d);a((s=s.apply(r,n)).next())});import{I as ue,T as fe,u as me,g as B,i as he,S as pe,R as ge,s as S,r as xe,P as ye,M as we,a as je,b as ve,c as Se,t as F}from"./components.DdTBJSKn.js";import{j as e,r as c}from"./react-core.zo7RGMO7.js";import{M as Ee,j as ke,k as Pe,u as be,H as G}from"./vendor.Cl4_iSFc.js";import{l as Ne}from"./ui-libs.DszMR8z7.js";const Me=function(){const n=typeof document!="undefined"&&document.createElement("link").relList;return n&&n.supports&&n.supports("modulepreload")?"modulepreload":"preload"}(),De=function(r){return"/"+r},Q={},Fe=function(n,s,v){let h=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),a=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));h=Promise.allSettled(s.map(o=>{if(o=De(o),o in Q)return;Q[o]=!0;const i=o.endsWith(".css"),x=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${x}`))return;const f=document.createElement("link");if(f.rel=i?"stylesheet":Me,i||(f.as="script"),f.crossOrigin="",f.href=o,a&&f.setAttribute("nonce",a),document.head.appendChild(f),i)return new Promise((P,p)=>{f.addEventListener("load",P),f.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${o}`)))})}))}function w(d){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=d,window.dispatchEvent(a),!a.defaultPrevented)throw d}return h.then(d=>{for(const a of d||[])a.status==="rejected"&&w(a.reason);return n().catch(w)})};function M({children:r,markdown:n=""}){return e.jsxs("div",{className:"relative flex flex-col h-screen w-screen overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]",children:[e.jsx(ue,{markdown:n}),e.jsx("main",{className:"w-full flex-grow overflow-hidden",children:r}),e.jsx("footer",{className:"w-full bg-white border-t border-gray-200 shadow-sm",children:e.jsx("div",{className:"container mx-auto px-4 py-2 flex justify-end items-center",children:e.jsxs(Ne,{isExternal:!0,className:"flex items-center gap-1 text-current",href:"https://mdfriday.com",title:"MDFriday",children:[e.jsx("span",{className:"text-default-600 text-sm",children:"Made by"}),e.jsx("p",{className:"text-primary text-sm font-medium",children:"MDFriday"})]})})})]})}function Ce(r,n){if(!r||!n)return r;const s=document.createElement("div");s.innerHTML=r;const v={};n.split("}").forEach(h=>{const w=h.split("{");if(w.length!==2)return;const[d,a]=w;if(!(d!=null&&d.trim())||!(a!=null&&a.trim()))return;const o=d.trim();v[o]={},a.split(";").forEach(i=>{const[x,f]=i.split(":");x!=null&&x.trim()&&(f!=null&&f.trim())&&(v[o][x.trim()]=f.trim())})});try{Object.entries(v).forEach(([h,w])=>{s.querySelectorAll(h).forEach(a=>{a instanceof HTMLElement&&Object.entries(w).forEach(([o,i])=>{a.style.setProperty(o,i)})})})}catch(h){console.error("Error applying inline themes:",h)}return s.innerHTML}var I=`# MDFriday Notes

👋 欢迎来到\`MDFriday Notes\`！很高兴见到你！

你只需要专注于内容创作，**MDFriday Notes** 帮助你转换为\`邮件\`、\`图片\`、\`PDF\`等格式。

## 快速上手

1. 编写内容：输入 Markdown 文本📝，粘贴图片🏞️
2. 选择主题：挑选一个适合您内容的主题🎨
3. 复制内容：一键复制排版后的内容
4. 粘贴分享：粘贴到电子邮件、聊天软件等任何地方，快速分享

![预览图](https://picsum.photos/600/300)

## 使用场景

**MDFriday Notes** 的多种输出格式（正在开发中），可以满足不同的使用场景：

| 格式     | 描述                    | 场景        |
|--------|-----------------------|-----------|
| 🖼️ 图片 | 根据 Markdown 生成便于分享的图片 | 社交媒体分享图   |
| 📧 邮件  | 创建可直接嵌入电子邮件的内容        | 新闻简报、文章分享 |
| 📄 PDF | PDF 格式便于保存、分享、打印      | 文章归档、文件传输 |

## 功能亮点

- 💡 **简洁易用:** 实时预览效果，所见即所得。
- 🏞️ **图片上传:** 粘贴图片，自动生成图片链接。
- 🧮 **数学公式:** 支持 $\\LaTeX$ 数学公式。
- 🎨 **多种主题:** 不断更新多种主题以满足不同排版需求。
- 📧 **快速分享:** 一键复制，即可发布在多种平台。
- 📄 **自动适应:** 在邮件中可以自适应窗口宽度，更美观的展示内容。
- 🔒 **数据安全:** 文本和图片完全在浏览器中处理，不会上传到服务器。
- 🌟 **免费开源:** 完全免费使用，欢迎社区贡献。

## 在线支持

不知道怎么使用？使用的过程中有疑惑？想了解更多？

加入我们！

**微信号：** mdfriday
**QQ号：** 578973027

`,_=`# MDFriday Notes

👋 Welcome to **MDFriday Notes**! Nice to meet you!

Just focus on creating your content, **MDFriday Notes** will convert it to \`email\`, \`image\`, \`PDF\` and more.

## Quick Start

1. Write content: Enter Markdown text📝, paste images🏞️.
2. Choose a theme: Pick a theme🎨 that suits your content.
3. Copy content: Copy the formatted content with one click.
4. Paste & Share: Paste it into emails, chat software, or anywhere else for quick sharing.

![Preview](https://picsum.photos/600/300)

## Use Cases

**MDFriday Notes**'s various output formats (currently under development) can meet different use cases:

| Format    | Description                                              | Scenario                          |
|-----------|----------------------------------------------------------|-----------------------------------|
| 🖼️ Image | Generate shareable images from Markdown                  | Social media sharing              |
| 📧 Email  | Create content that can be embedded directly into emails | Newsletters, article sharing      |
| 📄 PDF    | PDF format for easy saving, sharing, and printing        | Document archiving, file transfer |

## Features

- 💡 **Simple to Use:** Real-time preview, what you see is what you get.
- 🏞️ **Image Upload:** Paste images, automatically generate image links.
- 🧮 **Math Formula:** Support for $\\LaTeX$ math formula.
- 🎨 **Multiple Themes:** Continuously updated to meet different layout needs.
- 📧 **Quick Sharing:** One-click copy, ready to publish on multiple platforms.
- 📄 **Auto-Adapt:** Adapts to email window widths for a more attractive display.
- 🔒 **Data Security:** Text and images are processed entirely in the browser, not uploaded to servers.
- 🌟 **Free & Open Source:** Completely free to use, community contributions welcome.

## Support

Don't know how to use it? Have questions during use? Want to learn more?

Join us!

**WeChat:** mdfriday
**QQ:** 578973027
`;const Le=new Ee(ke({emptyLangClass:"hljs",langPrefix:"hljs language-",highlight(r,n){const s=G.getLanguage(n)?n:"plaintext";return G.highlight(r,{language:s}).value}}),Pe({throwOnError:!1}),{breaks:!0}),Re=r=>`<div class="container-layout" style="margin: 0; position: relative;">
      <div class="article" style="max-width: 1080px;margin: 0 auto;">${r}</div>
      <div class="watermark" style="position: absolute; bottom: 6px; right: 10px; color: #999; font-size: 12px; z-index: 2; white-space: nowrap;">
      <a href="https://notes.sunwei.xyz" style="color: #999; text-decoration: none;">MDFriday</a>&#160;制作&#160;❤️
    </div>
    </div>`;function We(){const{i18n:r}=be(),{articleStyle:n,template:s,rightPaneWidth:v}=fe.useContainer(),{shortcodeInstance:h,stepRender:w,finalRender:d}=me(),a=r.language,o=c.useMemo(()=>{const l=B();if(!l)return{project:null,fileId:"",file:null,content:""};const t=l.files.find(u=>!u.isDirectory);return{project:l,fileId:(t==null?void 0:t.id)||"",file:t||null,content:(t==null?void 0:t.content)||""}},[]),[i,x]=c.useState(o.project),[f,P]=c.useState(o.fileId),[p,D]=c.useState(o.file),[j,m]=c.useState(()=>o.content?o.content:a==="zh"?I:_),[C,E]=c.useState(!1),[H,q]=c.useState(""),[J,Y]=c.useState(!0),[L,V]=c.useState(!0),[A,X]=c.useState(!1),b=c.useRef(null),z=c.useRef(j);c.useEffect(()=>{z.current=j},[j]);const W=()=>{b.current!==null&&(window.clearTimeout(b.current),b.current=null)};c.useEffect(()=>{if(i&&p)p.content!==j&&!C&&b.current===null&&(m(p.content),console.log("MD_FRIDAY_DEBUG: useEffect - 初始加载或切换文件，更新编辑器内容")),k(this,null,function*(){try{yield S.ensureShortcodesRegistered(p.content)}catch(u){console.error("Error processing shortcodes:",u)}});else if(i){if(i&&!p){const t=i.files.find(u=>!u.isDirectory);t&&(P(t.id),D(t),k(this,null,function*(){try{yield S.ensureShortcodesRegistered(t.content),m(t.content)}catch(g){console.error("Error processing shortcodes:",g),m(t.content)}}))}}else{const t=he(a);if(t){if(x(t),t.files.length>0){const u=t.files.find(g=>!g.isDirectory);u&&(P(u.id),D(u),k(this,null,function*(){try{yield S.ensureShortcodesRegistered(u.content),m(u.content)}catch(y){console.error("Error processing shortcodes:",y),m(u.content)}}))}}else m(a==="zh"?I:_)}const l=t=>{var g;if((g=t.detail)!=null&&g.projectId){const y=B();if(y&&(x(y),y.files.length>0)){const N=y.files.find(U=>!U.isDirectory);N&&(P(N.id),D(N),k(this,null,function*(){try{yield S.ensureShortcodesRegistered(N.content),m(N.content),E(!1)}catch(oe){console.error("Error processing shortcodes:",oe),m(N.content),E(!1)}}))}}};return window.addEventListener("project-changed",l),()=>{window.removeEventListener("project-changed",l)}},[a,i,p,f]);const K=l=>{if(!i){console.log("MD_FRIDAY_DEBUG: handleFileSelect - 无当前项目");return}const t=ve(i.id,l);t&&!t.isDirectory?(P(l),D(t),E(!1),k(this,null,function*(){try{yield S.ensureShortcodesRegistered(t.content),m(t.content),E(!1)}catch(g){m(t.content),E(!1)}})):console.log("MD_FRIDAY_DEBUG: handleFileSelect - 文件不存在或是目录")},Z=l=>{l&&(je(l),x(l),window.dispatchEvent(new CustomEvent("project-updated",{detail:{projectId:l.id}})))};c.useEffect(()=>{(!i||!p)&&m(s!==""?s:r.language==="zh"?I:_)},[r.language,s,i,p]),c.useEffect(()=>{k(this,null,function*(){try{let t="";yield S.ensureShortcodesRegistered(j);const u=S.stepRender(j),g=yield Le.parse(u);t=S.finalRender(g);const y=Re(xe(t));q(Ce(y,n))}catch(t){console.error("Error parsing markdown:",t)}})},[j,n]);const ee=l=>{m(l),E(!0),i&&p&&(W(),b.current=window.setTimeout(()=>{const t=z.current;Se(i.id,p.id,t);const u=new Date().toISOString(),g=T(R({},i),{updatedAt:u});x(g),D(y=>y?T(R({},y),{content:t}):null),E(!1),b.current=null},5e3))},te=()=>{V(!L)},ne=()=>{X(!A)};c.useEffect(()=>()=>{W()},[]),c.useEffect(()=>{const l=t=>{t.preventDefault(),t.returnValue=""};return C&&window.addEventListener("beforeunload",l),()=>{window.removeEventListener("beforeunload",l)}},[C]),c.useEffect(()=>{const l=()=>{Y(t=>t)};return window.addEventListener("resize",l),()=>{window.removeEventListener("resize",l)}},[]);const re=e.jsxs("div",{className:"flex h-full w-full",children:[i?e.jsx(ye,{project:i,onFileSelect:K,onProjectUpdate:Z,selectedFileId:f,isCollapsed:A,onToggleCollapse:ne,className:"shrink-0"}):e.jsx("div",{className:"w-64 h-full border-r border-gray-200 p-4 shrink-0",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-gray-500 mb-2",children:"没有项目"}),e.jsx("div",{className:"text-sm text-gray-400",children:"请从侧边栏创建新项目"})]})}),e.jsx("div",{className:"flex-1 h-full min-w-0",children:e.jsx(we,{value:j,onChange:ee})})]}),se=e.jsx("div",{className:"h-full w-full p-3 overflow-auto",children:J?e.jsx("div",{dangerouslySetInnerHTML:{__html:H},id:"markdown-body"}):H});return e.jsx(M,{markdown:j,children:e.jsxs("div",{className:"flex h-full",children:[e.jsx(pe,{isOpen:L,onToggle:te}),e.jsx("div",{className:`transition-all duration-300 h-full w-full flex ${L?"ml-64":"ml-14"}`,children:e.jsx("div",{className:"w-full h-full px-2 py-2",children:e.jsx(ge,{initialLeftWidth:45,leftPane:re,maxLeftWidth:80,minLeftWidth:20,rightPane:se,rightPaneWidth:v})})})]})})}function Ue(){return e.jsx(M,{markdown:"",children:e.jsx("section",{className:"flex flex-col items-center justify-center gap-4 py-8 md:py-10",children:e.jsx("div",{className:"inline-block max-w-lg text-center justify-center",children:e.jsx("h1",{className:F(),children:"Docs"})})})})}function Oe(){return e.jsx(M,{markdown:"",children:e.jsx("section",{className:"flex flex-col items-center justify-center gap-4 py-8 md:py-10",children:e.jsx("div",{className:"inline-block max-w-lg text-center justify-center",children:e.jsx("h1",{className:F(),children:"Pricing"})})})})}function $e(){return e.jsx(M,{markdown:"",children:e.jsx("section",{className:"flex flex-col items-center justify-center gap-4 py-8 md:py-10",children:e.jsx("div",{className:"inline-block max-w-lg text-center justify-center",children:e.jsx("h1",{className:F(),children:"Blog"})})})})}function Be(){return e.jsx(M,{markdown:"",children:e.jsx("section",{className:"flex flex-col items-center justify-center gap-4 py-8 md:py-10",children:e.jsx("div",{className:"inline-block max-w-lg text-center justify-center",children:e.jsx("h1",{className:F(),children:"About"})})})})}const Te=c.lazy(()=>Fe(()=>import("./components.DdTBJSKn.js").then(function(r){return r.G}),__vite__mapDeps([0])));function Ge(){return e.jsx(M,{markdown:"",children:e.jsxs("section",{className:"flex flex-col items-center justify-center gap-4 py-8 md:py-10",children:[e.jsxs("div",{className:"inline-block max-w-lg text-center justify-center",children:[e.jsx("h1",{className:F(),children:"Photos"}),e.jsx("p",{className:"text-default-600 mt-2",children:"A beautiful responsive image gallery with masonry layout"})]}),e.jsx("div",{className:"w-full max-w-7xl",children:e.jsx(c.Suspense,{fallback:e.jsx("div",{className:"flex justify-center items-center min-h-[60vh]",children:e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"})}),children:e.jsx(Te,{})})})]})})}export{Be as A,$e as B,Ue as D,We as I,Oe as P,Fe as _,Ge as a};

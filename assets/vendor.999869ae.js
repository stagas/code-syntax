(function(){if(typeof document=="undefined"||"adoptedStyleSheets"in document)return;var e="ShadyCSS"in window&&!ShadyCSS.nativeShadow,n=document.implementation.createHTMLDocument(""),t=new WeakMap,r=typeof DOMException=="object"?Error:DOMException,o=Object.defineProperty,c=Array.prototype.forEach,a=/@import.+?;?$/gm;function u(s){var i=s.replace(a,"");return i!==s&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),i.trim()}function y(s){return"isConnected"in s?s.isConnected:document.contains(s)}function L(s){return s.filter(function(i,l){return s.indexOf(i)===l})}function pe(s,i){return s.filter(function(l){return i.indexOf(l)===-1})}function he(s){s.parentNode.removeChild(s)}function q(s){return s.shadowRoot||t.get(s)}var me=["addRule","deleteRule","insertRule","removeRule"],ge=CSSStyleSheet,N=ge.prototype;N.replace=function(){return Promise.reject(new r("Can't call replace on non-constructed CSSStyleSheets."))},N.replaceSync=function(){throw new r("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function W(s){return typeof s=="object"?b.isPrototypeOf(s)||N.isPrototypeOf(s):!1}function ye(s){return typeof s=="object"?N.isPrototypeOf(s):!1}var S=new WeakMap,_=new WeakMap,T=new WeakMap,k=new WeakMap;function Se(s,i){var l=document.createElement("style");return T.get(s).set(i,l),_.get(s).push(i),l}function E(s,i){return T.get(s).get(i)}function _e(s,i){T.get(s).delete(i),_.set(s,_.get(s).filter(function(l){return l!==i}))}function F(s,i){requestAnimationFrame(function(){i.textContent=S.get(s).textContent,k.get(s).forEach(function(l){return i.sheet[l.method].apply(i.sheet,l.args)})})}function O(s){if(!S.has(s))throw new TypeError("Illegal invocation")}function x(){var s=this,i=document.createElement("style");n.body.appendChild(i),S.set(s,i),_.set(s,[]),T.set(s,new WeakMap),k.set(s,[])}var b=x.prototype;b.replace=function(i){try{return this.replaceSync(i),Promise.resolve(this)}catch(l){return Promise.reject(l)}},b.replaceSync=function(i){if(O(this),typeof i=="string"){var l=this;S.get(l).textContent=u(i),k.set(l,[]),_.get(l).forEach(function(f){f.isConnected()&&F(l,E(l,f))})}},o(b,"cssRules",{configurable:!0,enumerable:!0,get:function(){return O(this),S.get(this).sheet.cssRules}}),me.forEach(function(s){b[s]=function(){var i=this;O(i);var l=arguments;k.get(i).push({method:s,args:l}),_.get(i).forEach(function(m){if(m.isConnected()){var d=E(i,m).sheet;d[s].apply(d,l)}});var f=S.get(i).sheet;return f[s].apply(f,l)}}),o(x,Symbol.hasInstance,{configurable:!0,value:W});var U={childList:!0,subtree:!0},z=new WeakMap;function w(s){var i=z.get(s);return i||(i=new V(s),z.set(s,i)),i}function G(s){o(s.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return w(this).sheets},set:function(i){w(this).update(i)}})}function M(s,i){for(var l=document.createNodeIterator(s,NodeFilter.SHOW_ELEMENT,function(m){return q(m)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),f=void 0;f=l.nextNode();)i(q(f))}var R=new WeakMap,v=new WeakMap,A=new WeakMap;function Ee(s,i){return i instanceof HTMLStyleElement&&v.get(s).some(function(l){return E(l,s)})}function K(s){var i=R.get(s);return i instanceof Document?i.body:i}function $(s){var i=document.createDocumentFragment(),l=v.get(s),f=A.get(s),m=K(s);f.disconnect(),l.forEach(function(d){i.appendChild(E(d,s)||Se(d,s))}),m.insertBefore(i,null),f.observe(m,U),l.forEach(function(d){F(d,E(d,s))})}function V(s){var i=this;i.sheets=[],R.set(i,s),v.set(i,[]),A.set(i,new MutationObserver(function(l,f){if(!document){f.disconnect();return}l.forEach(function(m){e||c.call(m.addedNodes,function(d){d instanceof Element&&M(d,function(C){w(C).connect()})}),c.call(m.removedNodes,function(d){d instanceof Element&&(Ee(i,d)&&$(i),e||M(d,function(C){w(C).disconnect()}))})})}))}if(V.prototype={isConnected:function(){var s=R.get(this);return s instanceof Document?s.readyState!=="loading":y(s.host)},connect:function(){var s=K(this);A.get(this).observe(s,U),v.get(this).length>0&&$(this),M(s,function(i){w(i).connect()})},disconnect:function(){A.get(this).disconnect()},update:function(s){var i=this,l=R.get(i)===document?"Document":"ShadowRoot";if(!Array.isArray(s))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+l+": Iterator getter is not callable.");if(!s.every(W))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+l+": Failed to convert value to 'CSSStyleSheet'");if(s.some(ye))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+l+": Can't adopt non-constructed stylesheets");i.sheets=s;var f=v.get(i),m=L(s),d=pe(f,m);d.forEach(function(C){he(E(C,i)),_e(C,i)}),v.set(i,m),i.isConnected()&&m.length>0&&$(i)}},window.CSSStyleSheet=x,G(Document),"ShadowRoot"in window){G(ShadowRoot);var Y=Element.prototype,we=Y.attachShadow;Y.attachShadow=function(i){var l=we.call(this,i);return i.mode==="closed"&&t.set(this,l),l}}var B=w(document);B.isConnected()?B.connect():document.addEventListener("DOMContentLoaded",B.connect.bind(B))})();const ve=CustomElementRegistry,J=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;let Ce=Math.round(Math.random()*1e5);const Z="-|\\.|[0-9]|[a-z]",be=new RegExp(`[a-z](${Z})*-(${Z})*`),Ne=e=>be.exec(e)!==null,Te=(e,n)=>!!n.get(e),Q=(e,n)=>{const t=`${e}-${Ce+=1}`;return Te(t,n)?Q(e,n):t};function ke(e,n=customElements){if(!Ne(e))throw new Error("tagName is invalid");return Q(e,n)}class Re{constructor(){this._items=[]}add(n){["tagName","originalTagName","registry"].forEach(u=>{if(!n[u])throw new Error(`"${u}" is mandatory`)});const{tagName:t,originalTagName:r,constructor:o,registry:c}=n;if(this.findByConstructor(o))throw new Error("this constructor has already been used with this registry");const a=this.findByTagName(t);if(a){if(a.constructor)throw new Error(`the name "${t}" has already been used with this registry`);a.constructor=o}else this._items.push({tagName:t,originalTagName:r,constructor:o,registry:c})}getTagName(n,t){const{tagName:r}=this.findByRegistry(t).find(({originalTagName:o})=>o===n)||{};if(r)return r;if(!t.__isRoot()){const o=ke(n);return this.add({registry:t,constructor:void 0,tagName:o,originalTagName:n}),o}return n}findByTagName(n){if(!!n)return this._items.find(({tagName:t})=>t===n)}findByOriginalTagName(n){return this._items.filter(({originalTagName:t})=>t===n)}findByConstructor(n){if(!!n)return this._items.find(({constructor:t})=>t===n)}findByRegistry(n){return this._items.filter(({registry:t})=>t===n)}}const p=new Re,X=e=>(e.__define=e.define,e.__get=e.get,e.__whenDefined=e.whenDefined,e.__isRoot=()=>e instanceof ve,e.define=(n,t,r)=>{const o=e.__isRoot(),c=p.getTagName(n,e),a=o?t:class extends t{};return o&&p.add({tagName:c,originalTagName:n,constructor:a,registry:e}),e.__define(c,a,r),a},e.get=n=>{let t=e;for(;t;){const r=p.findByRegistry(t).find(({originalTagName:o})=>o===n);if(r)return r.constructor;t=t.parent}},e.getRegistry=n=>{let t=e;for(;t;){if(!!p.findByRegistry(t).find(({originalTagName:o})=>o===n))return t;t=t.parent}},e.whenDefined=n=>e.__isRoot()?e.__whenDefined(n):e.__whenDefined(p.getTagName(n,e)),e);class Ae{constructor(){X(this)}define(n,t,r){return customElements.define(n,t,r)}get(n){return customElements.get(n)}upgrade(n){customElements.upgrade(n)}whenDefined(n){return customElements.whenDefined(n)}}const Be=" *,()>+~|",h={CHAR:1,CLASS:2,ID:3,PSEUDO_CLASS:4,ATTRIBUTE:5,SINGLE:6,BLOCK:7},D=e=>{if(Be.includes(e))return h.SINGLE;switch(e){case":":return h.PSEUDO_CLASS;case".":return h.CLASS;case"#":return h.ID;case"[":return h.ATTRIBUTE;case"{":return h.BLOCK;default:return h.CHAR}},Le=(e,n)=>{const{originalTagName:t}=p.findByTagName(e)||{};return t?p.getTagName(t,n):p.getTagName(e,n)},Oe=(e,n,t)=>{let r=!1,o=n,c;do o+=1,c=D(e[o]),r=r||e[o]==="-";while(o<e.length&&c===h.CHAR);let a=e.substring(n,o);return r&&(a=Le(a,t)),{token:a,index:o}},xe=(e,n)=>({token:e.substring(n,n+1),index:n+1}),Me=(e,n)=>{let t=n,r;do t+=1,r=D(e[t]);while(t<e.length&&r===h.CHAR);if(e.substring(n,t)===":lang")do t+=1;while(t<e.length&&e[t]!==")");return{token:e.substring(n,t),index:t}},ee=e=>(n,t)=>{let r=t;do r+=1;while(r<n.length&&n[r]!==e);return{token:n.substring(t,r),index:r}},g=(e,n=window.customElements)=>{if(n===window.customElements)return e;const t=[];let r=0,o;for(;r<e.length;){switch(D(e[r])){case h.SINGLE:o=xe;break;case h.PSEUDO_CLASS:case h.CLASS:case h.ID:o=Me;break;case h.ATTRIBUTE:o=ee("]");break;case h.BLOCK:o=ee("}");break;default:o=Oe}const{index:c,token:a}=o(e,r,n);t.push(a),r=c}return t.join("")},$e=`"'`.split(""),De=e=>$e.includes(e),te=(e,n,t)=>{let r=t,o=!1;for(;r!==e.length;){if(De(e[r]))o=!o;else if(!o&&e[r]===n&&(n===">"||e[r+1]!=="!"))return r;r+=1}return-1},ne=(e,n=0)=>te(e,"<",n),Ie=(e,n)=>te(e,">",n),Pe=e=>e.includes("-"),je=(e,n)=>{const{originalTagName:t=e}=p.findByTagName(e)||{};return p.getTagName(t,n)},He=(e,n,t)=>{const[r,...o]=e.substring(n?2:1).split(/\s/);if(!Pe(r)||t===customElements)return e;const c=je(r,t);return n?`</${c}`:(o.splice(0,0,c),`<${o.join(" ")}`)},I=(e,n)=>{let t="",r=ne(e),o=0,c=!1,a=!1,u,y;for(;r!==-1;)u=e.slice(o,r),t+=a?g(u,n):u,a=!1,c=e[r+1]==="/",o=Ie(e,r+1),y=He(e.slice(r,o),c,n),t+=y,a=y.toLowerCase().startsWith("<style"),r=ne(e,o+1);return t+=e.slice(o,e.length),t},re=(e,n)=>{e.childNodes.forEach(t=>re(t,n)),e.__scope=n},P=e=>e.includes("-"),qe=e=>e.nodeType===1&&P(e.tagName),We=e=>Object.getPrototypeOf(e).constructor!==HTMLElement,oe=Object.getOwnPropertyDescriptor(ShadowRoot.prototype,"innerHTML");Object.defineProperty(ShadowRoot.prototype,"innerHTML",{...oe,set:function(e){const n=this.customElements||window.customElements,t=oe.set.call(this,I(e,n));return this.childNodes.forEach(r=>re(r,this)),t}});if(J){const e=Object.getOwnPropertyDescriptor(ShadowRoot.prototype,"adoptedStyleSheets");Object.defineProperty(ShadowRoot.prototype,"adoptedStyleSheets",{...e,set:function(n){const t=this.customElements||window.customElements;return t===window.customElements?e.set.call(this,n):(t.styleSheets=t.styleSheets||new WeakMap,e.set.call(this,n.map(r=>{if(t.styleSheets.has(r))return t.styleSheets.get(r);const o=new CSSStyleSheet;for(const c of r.cssRules)o.insertRule(`${g(c.selectorText,t)} { ${c.style.cssText} }`,o.cssRules.length);return r.subscribe(({name:c,args:a})=>{switch(c){case"replaceSync":case"replace":{const[u]=a;o.replaceSync(g(u,t))}break;case"addRule":{const[u,y,L]=a;o.addRule(g(u,t),y,L)}break;case"removeRule":case"deleteRule":o.removeRule(...a);break;case"insertRule":{const[u,y]=a;o.insertRule(g(u,t),y)}break}}),t.styleSheets.set(r,o),o})))}})}const Fe=(e,n=window.customElements)=>(e.customElements=n,e.__querySelector=e.querySelector,e.__querySelectorAll=e.querySelectorAll,e.__appendChild=e.appendChild,e.__insertBefore=e.insertBefore,e.createElement=function(r,o){if(!P(r)){const u=document.createElement(r,o);return u.__scope=e,u}const c=n.getRegistry(r)||n,a=document.createElement(p.getTagName(r,c),o);return c.__isRoot()||(a.__scope=c),a},e.createElementNS=function(r,o,c){if(!P(o))return document.createElementNS(r,o,c);const a=n.getRegistry(o)||n,u=document.createElementNS(r,p.getTagName(o,a),c);return a.__isRoot()||(u.__scope=a),u},e.importNode=function(r,o){return this.__importNode(r,o)},e.__importNode=function(r,o=!0){return this.__transformCustomElements(r.cloneNode(o))},e.__transformCustomElements=function(r){if(r.tagName==="STYLE"){const o=document.createElement("STYLE");return o.appendChild(document.createTextNode(g(r.firstChild.textContent,n))),o}return r.childNodes.forEach(o=>{const c=this.__transformCustomElements(o);c!==o&&r.replaceChild(c,o)}),this.__shouldScope(r)?this.__transformNode(r):r},e.__transformNode=function(r){const o=[],c=this.createElement("div");r.childNodes.forEach(u=>{o.push(u),r.removeChild(u)}),c.innerHTML=r.outerHTML;const a=c.firstElementChild;return Object.getOwnPropertyNames(r).forEach(u=>{a[u]=r[u]}),o.forEach(u=>a.appendChild(u)),a},e.__shouldScope=function(r){return qe(r)&&!We(r)},e.querySelector=function(r){return this.__querySelector(g(r,this.customElements))},e.querySelectorAll=function(r){return this.__querySelectorAll(g(r,this.customElements))},e.appendChild=function(r){const o=this.__transformCustomElements(r);return r.parentNode&&r.parentNode.removeChild(r),this.__appendChild(o)},e.insertBefore=function(r,o){const c=this.__transformCustomElements(r);return r.parentNode&&r.parentNode.removeChild(r),this.__insertBefore(c,o)},e);class se{constructor(n){return n.forEach((t,r)=>{this[r]=t}),this._length=n.length,Object.freeze(this)}get length(){return this._length}item(n){return this[n]!=null?this[n]:null}namedItem(n){for(let t=0;t<this.length;t+=1)if(this[t].id===n||this[t].getAttribute("name")===n)return this[t];return null}}const ie=window.trustedTypes&&window.trustedTypes.createPolicy("scoped-registry-polifyll",{createHTML:e=>e}),j=e=>{const n=e.getRootNode();return n instanceof ShadowRoot||n instanceof Document?n:e.scope instanceof ShadowRoot?e.scope:document},H=e=>e instanceof ShadowRoot?e.customElements:window.customElements,ce=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML"),ae=(e,n)=>{e.childNodes.forEach(t=>ae(t,n)),e.__scope=n};Object.defineProperty(Element.prototype,"innerHTML",{...ce,set:function(e){const n=j(this),t=H(n),r=ie===void 0?I(e,t):ie.createHTML(I(e.toString(),t)),o=ce.set.call(this,r);return n!==document&&this.childNodes.forEach(c=>ae(c,n)),o}});const le=Object.getOwnPropertyDescriptor(Element.prototype,"tagName");Object.defineProperty(Element.prototype,"tagName",{...le,get:function(){const e=le.get.call(this),{originalTagName:n=e}=p.findByTagName(e.toLowerCase())||{};return n.toUpperCase()}});Object.defineProperty(Element.prototype,"scope",{get:function(){return this.__scope||document},set:function(){throw new Error("'scope' is a readonly property")}});const Ue=()=>{const e=Element.prototype;e.__attachShadow=e.attachShadow,e.__querySelector=e.querySelector,e.__querySelectorAll=e.querySelectorAll,e.__getElementsByTagName=e.getElementsByTagName,e.__getElementsByTagNameNS=e.getElementsByTagNameNS,e.__appendChild=e.appendChild,e.__insertBefore=e.insertBefore,e.attachShadow=function({mode:t,customElements:r=window.customElements}){return Fe(this.__attachShadow({mode:t}),r)},e.querySelector=function(t){const r=j(this),o=H(r);return this.__querySelector(g(t,o))},e.querySelectorAll=function(t){const r=j(this),o=H(r);return this.__querySelectorAll(g(t,o))},e.getElementsByTagName=function(t){const r=p.findByOriginalTagName(t);switch(r.length){case 0:return this.__getElementsByTagName(t);case 1:return this.__getElementsByTagName(r[0].tagName);default:return new se(r.map(({tagName:o})=>Array.from(this.__getElementsByTagName(o))).reduce((o,c)=>o.concat(...c),[]))}},e.getElementsByTagNameNS=function(t,r){const o=p.findByOriginalTagName(r);switch(o.length){case 0:return this.__getElementsByTagNameNS(t,r);case 1:return this.__getElementsByTagNameNS(t,o[0].tagName);default:return new se(o.map(({tagName:c})=>Array.from(this.__getElementsByTagNameNS(t,c))).reduce((c,a)=>c.concat(...a),[]))}},e.appendChild=function(t){if(this.scope===document)return this.__appendChild(t);const r=this.scope.__transformCustomElements(t);return t.parentNode&&t.parentNode.removeChild(t),this.__appendChild(r)},e.insertBefore=function(t,r){if(this.scope===document)return this.__insertBefore(t,r);const o=this.scope.__transformCustomElements(t);return t.parentNode&&t.parentNode.removeChild(t),this.__insertBefore(o,r)}};Object.defineProperty(CSSStyleSheet.prototype,"subscriptions",{get:function(){return this.__subscriptions||(this.__subscriptions=[]),this.__subscriptions},set:function(e){this.__subscriptions=e}});const ze=()=>{const e=CSSStyleSheet.prototype;e.subscribe=function(o){this.subscriptions.push(o)};const n=e.replace;e.replace=async function(o){const c=await n.call(this,o);return this.subscriptions.forEach(a=>a({name:"replace",args:[o]})),c};const t=r=>{if(e[r]){const o=e[r];e[r]=function(...c){const a=o.call(this,...c);return this.subscriptions.forEach(u=>u({name:r,args:c})),a}}};["replaceSync","addRule","removeRule","insertRule","deleteRule"].forEach(r=>t(r))};customElements.getRegistry||(X(customElements),CustomElementRegistry=Ae,Ue(),J&&ze());const{replace:Ge}="",Ke=/[&<>'"]/g,Ve={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},Ye=e=>Ve[e],rt=e=>Ge.call(e,Ke,Ye),ot=e=>{let n=!1,t=[];function r(){try{e.apply(this,t)}finally{n=!1}}return function(...o){t=o,!n&&(n=!0,queueMicrotask(r))}},ue={bootstrap:"npm/bootstrap-icons@1/icons/{icon}.svg",boxicons:"npm/boxicons@2/svg/{type}/{prefix}-{icon}.svg",bytesize:"npm/bytesize-icons@1/dist/icons/{icon}.svg",cssgg:"npm/css.gg@2/icons/svg/{icon}.svg",emojicc:"npm/emoji-cc@1/svg/{icon}.svg",eos:"gh/lekoala/eos-icons-mirror/{type}/{icon}.svg",feather:"npm/feather-icons@4/dist/icons/{icon}.svg",flags:"npm/flag-svg-collection@1/flags/{kind}/{icon}.svg",fontawesome:"npm/@fortawesome/fontawesome-free@5/svgs/{type}/{icon}.svg",iconoir:"gh/lucaburgio/iconoir/icons/{icon}.svg",iconpark:"gh/bytedance/IconPark/source/{type}/{icon}.svg",material:"npm/@material-icons/svg@1/svg/{icon}/{kind}.svg",supertiny:"npm/super-tiny-icons@0.4.0/images/svg/{icon}.svg",tabler:"npm/@tabler/icons@1/icons/{icon}.svg"},Je={boxicons:{solid:"bxs",regular:"bx",logos:"bxl"}},de=new CSSStyleSheet,Ze=({strokeWidth:e})=>{de.replaceSync(`
    :host {
      ${e?`stroke-width: ${e};`:""}
      --stroke: currentColor;
      --fill: #9994;
      --fill-secondary: #9996;
      display: inline-flex;
      vertical-align: middle;
    }

    [part=svg] {
      width: 100%;
      height: 100%;
    }
  `)};class st extends HTMLElement{static get observedAttributes(){return["icon","set","type","kind","raw","stroke-width"]}constructor(){super();this.attachShadow({mode:"open"}).adoptedStyleSheets=[de],this.updateSvg()}async updateSvg(){const n={set:this.getAttribute("set"),icon:this.getAttribute("icon"),type:this.getAttribute("type"),kind:this.getAttribute("kind"),raw:this.hasAttribute("raw"),strokeWidth:this.getAttribute("stroke-width")};!fe(n)||(Ze(n),this.shadowRoot.innerHTML=(await et(n)).replace(/(<svg.*?)>/,'$1 part="svg">'))}attributeChangedCallback(){this.updateSvg()}}const Qe=(e,n=Object.create(null))=>function(...r){const o=r.join();return n[o]??(n[o]=e.apply(this,r))},Xe=Qe(async e=>{const n=await fetch(e),t=await n.text();return n.ok?t:(console.error(e+": "+t),`<span title="Error loading icon: ${e}">\u26A0\uFE0F</span>`)}),et=async e=>{const n=nt(e);let t=(await Xe(n)).trim();return e.raw||["emojicc","flags"].includes(e.set)||(t=t.replace(/(?<=^<svg[^>]*)\s(width|height)="[\d.]+"(?=.*>)/gis,"").replace(/(^<svg[^>]*?)>/gis,'$1 fill="var(--stroke)">').replace('<rect width="48" height="48" fill="white" fill-opacity="0.01"/>',"").replace('<path d="M48 0H0V48H48V0Z" fill="white" fill-opacity="0.01"/>',""),e.strokeWidth!=null&&(t=t.replace(/(stroke-width=")([^"]*?)(")/gi,`$1${e.strokeWidth}$3`).replace(/(<(?:path|circle|rect|polyline)[^>]*?)(\/?>)/gis,'$1 vector-effect="non-scaling-stroke"$2')),t=t.replace(/"#2F88FF"/gis,'"var(--fill)"').replace(/"#43CCF8"/gis,'"var(--fill-secondary)"').replace(/"(currentColor|white|black)"/gis,'"var(--stroke)"')),t},tt="https://cdn.jsdelivr.net",nt=e=>{if(!fe(e))throw new TypeError("IconSvg: Missing properties");const n=Je[e.set]?.[e.type],t=Object.assign({},e,{prefix:n});return tt+"/"+ue[e.set].replace(/{(.*?)}/g,(r,o)=>t[o])},fe=e=>{if(!("set"in e)||e.set==null)return!1;const t=[...ue[e.set].matchAll(/{(.*?)}/g)].map(r=>r[1]);for(const r of t)if(r!=="prefix"&&(!(r in e)||e[r]==null))return!1;return!0};export{st as I,ot as d,rt as e};
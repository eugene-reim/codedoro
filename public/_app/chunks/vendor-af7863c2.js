function _(){}function F(t,n){for(const e in n)t[e]=n[e];return t}function q(t){return t()}function M(){return Object.create(null)}function m(t){t.forEach(q)}function H(t){return typeof t=="function"}function I(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function G(t){return Object.keys(t).length===0}function J(t,...n){if(t==null)return _;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function lt(t,n,e){t.$$.on_destroy.push(J(n,e))}function st(t,n,e,i){if(t){const c=z(t,n,e,i);return t[0](c)}}function z(t,n,e,i){return t[1]&&i?F(e.ctx.slice(),t[1](i(n))):e.ctx}function ft(t,n,e,i){if(t[2]&&i){const c=t[2](i(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const s=[],u=Math.max(n.dirty.length,c.length);for(let o=0;o<u;o+=1)s[o]=n.dirty[o]|c[o];return s}return n.dirty|c}return n.dirty}function at(t,n,e,i,c,s){if(c){const u=z(n,e,i,s);t.p(u,c)}}function dt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let b=!1;function K(){b=!0}function P(){b=!1}function W(t,n,e,i){for(;t<n;){const c=t+(n-t>>1);e(c)<=i?t=c+1:n=c}return t}function Q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let l=0;l<n.length;l++){const a=n[l];a.claim_order!==void 0&&r.push(a)}n=r}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let c=0;for(let r=0;r<n.length;r++){const l=n[r].claim_order,a=(c>0&&n[e[c]].claim_order<=l?c+1:W(1,c,y=>n[e[y]].claim_order,l))-1;i[r]=e[a]+1;const f=a+1;e[f]=r,c=Math.max(f,c)}const s=[],u=[];let o=n.length-1;for(let r=e[c]+1;r!=0;r=i[r-1]){for(s.push(n[r-1]);o>=r;o--)u.push(n[o]);o--}for(;o>=0;o--)u.push(n[o]);s.reverse(),u.sort((r,l)=>r.claim_order-l.claim_order);for(let r=0,l=0;r<u.length;r++){for(;l<s.length&&u[r].claim_order>=s[l].claim_order;)l++;const a=l<s.length?s[l]:null;t.insertBefore(u[r],a)}}function R(t,n){if(b){for(Q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function _t(t,n,e){b&&!e?R(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode.removeChild(t)}function V(t){return document.createElement(t)}function X(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function E(t){return document.createTextNode(t)}function ht(){return E(" ")}function mt(){return E("")}function pt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function yt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function Y(t){return Array.from(t.childNodes)}function Z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function B(t,n,e,i,c=!1){Z(t);const s=(()=>{for(let u=t.claim_info.last_index;u<t.length;u++){const o=t[u];if(n(o)){const r=e(o);return r===void 0?t.splice(u,1):t[u]=r,c||(t.claim_info.last_index=u),o}}for(let u=t.claim_info.last_index-1;u>=0;u--){const o=t[u];if(n(o)){const r=e(o);return r===void 0?t.splice(u,1):t[u]=r,c?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=u,o}}return i()})();return s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,s}function L(t,n,e,i){return B(t,c=>c.nodeName===n,c=>{const s=[];for(let u=0;u<c.attributes.length;u++){const o=c.attributes[u];e[o.name]||s.push(o.name)}s.forEach(u=>c.removeAttribute(u))},()=>i(n))}function bt(t,n,e){return L(t,n,e,V)}function gt(t,n,e){return L(t,n,e,X)}function tt(t,n){return B(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>E(n),!0)}function xt(t){return tt(t," ")}function $t(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function wt(t,n=document.body){return Array.from(n.querySelectorAll(t))}let g;function x(t){g=t}function S(){if(!g)throw new Error("Function called outside component initialization");return g}function Et(t){S().$$.on_mount.push(t)}function St(t){S().$$.after_update.push(t)}function kt(t,n){S().$$.context.set(t,n)}const p=[],O=[],$=[],T=[],nt=Promise.resolve();let k=!1;function et(){k||(k=!0,nt.then(D))}function A(t){$.push(t)}let N=!1;const j=new Set;function D(){if(!N){N=!0;do{for(let t=0;t<p.length;t+=1){const n=p[t];x(n),it(n.$$)}for(x(null),p.length=0;O.length;)O.pop()();for(let t=0;t<$.length;t+=1){const n=$[t];j.has(n)||(j.add(n),n())}$.length=0}while(p.length);for(;T.length;)T.pop()();k=!1,N=!1,j.clear()}}function it(t){if(t.fragment!==null){t.update(),m(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(A)}}const w=new Set;let d;function At(){d={r:0,c:[],p:d}}function Nt(){d.r||m(d.c),d=d.p}function rt(t,n){t&&t.i&&(w.delete(t),t.i(n))}function jt(t,n,e,i){if(t&&t.o){if(w.has(t))return;w.add(t),d.c.push(()=>{w.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}}function vt(t,n){const e={},i={},c={$$scope:1};let s=t.length;for(;s--;){const u=t[s],o=n[s];if(o){for(const r in u)r in o||(i[r]=1);for(const r in o)c[r]||(e[r]=o[r],c[r]=1);t[s]=o}else for(const r in u)c[r]=1}for(const u in i)u in e||(e[u]=void 0);return e}function Ct(t){return typeof t=="object"&&t!==null?t:{}}function qt(t){t&&t.c()}function Mt(t,n){t&&t.l(n)}function ct(t,n,e,i){const{fragment:c,on_mount:s,on_destroy:u,after_update:o}=t.$$;c&&c.m(n,e),i||A(()=>{const r=s.map(q).filter(H);u?u.push(...r):m(r),t.$$.on_mount=[]}),o.forEach(A)}function ut(t,n){const e=t.$$;e.fragment!==null&&(m(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ot(t,n){t.$$.dirty[0]===-1&&(p.push(t),et(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function zt(t,n,e,i,c,s,u,o=[-1]){const r=g;x(t);const l=t.$$={fragment:null,ctx:null,props:s,update:_,not_equal:c,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(r?r.$$.context:[])),callbacks:M(),dirty:o,skip_bound:!1,root:n.target||r.$$.root};u&&u(l.root);let a=!1;if(l.ctx=e?e(t,n.props||{},(f,y,...v)=>{const C=v.length?v[0]:y;return l.ctx&&c(l.ctx[f],l.ctx[f]=C)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](C),a&&ot(t,f)),y}):[],l.update(),a=!0,m(l.before_update),l.fragment=i?i(l.ctx):!1,n.target){if(n.hydrate){K();const f=Y(n.target);l.fragment&&l.fragment.l(f),f.forEach(U)}else l.fragment&&l.fragment.c();n.intro&&rt(t.$$.fragment),ct(t,n.target,n.anchor,n.customElement),P(),D()}x(r)}class Bt{$destroy(){ut(this,1),this.$destroy=_}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const c=i.indexOf(e);c!==-1&&i.splice(c,1)}}$set(n){this.$$set&&!G(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const h=[];function Lt(t,n=_){let e;const i=new Set;function c(o){if(I(t,o)&&(t=o,e)){const r=!h.length;for(const l of i)l[1](),h.push(l,t);if(r){for(let l=0;l<h.length;l+=2)h[l][0](h[l+1]);h.length=0}}}function s(o){c(o(t))}function u(o,r=_){const l=[o,r];return i.add(l),i.size===1&&(e=n(c)||_),o(t),()=>{i.delete(l),i.size===0&&(e(),e=null)}}return{set:c,update:s,subscribe:u}}export{Et as A,F as B,Lt as C,X as D,gt as E,R as F,_ as G,pt as H,st as I,at as J,dt as K,ft as L,m as M,lt as N,wt as O,Bt as S,Y as a,yt as b,bt as c,U as d,V as e,_t as f,tt as g,$t as h,zt as i,qt as j,ht as k,mt as l,Mt as m,xt as n,ct as o,vt as p,Ct as q,At as r,I as s,E as t,jt as u,ut as v,Nt as w,rt as x,kt as y,St as z};
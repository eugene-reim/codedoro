import{S as Et,i as yt,s as bt,k,j as jt,e as a,t as A,D as h,O as Ct,d as s,n as w,m as Tt,c as l,a as r,g as q,E as f,b as t,f as dt,o as Bt,F as e,G as $t,x as Dt,u as It,v as Mt}from"../chunks/vendor-af7863c2.js";import{C as Pt}from"../chunks/create-task-modal-566ade28.js";function Vt(gt){let $,B,K,c,x,D,Q,W,I,X,Y,_,g,M,Z,tt,P,et,st,m,i,n,rt,E,V,ot,at,p,z,v,y,lt,N,u,b,j,nt,R,d,C,T,F;return B=new Pt({}),{c(){$=k(),jt(B.$$.fragment),K=k(),c=a("div"),x=a("div"),D=a("h1"),Q=A("CURRENT TASK"),W=k(),I=a("p"),X=A("Press + to create a new task"),Y=k(),_=a("div"),g=a("div"),M=a("p"),Z=A("00:00"),tt=k(),P=a("p"),et=A("0 of 0 sessions"),st=k(),m=h("svg"),i=h("circle"),n=h("circle"),rt=k(),E=a("div"),V=a("p"),ot=A("Create Task to start"),at=k(),p=a("div"),z=a("button"),v=h("svg"),y=h("path"),lt=k(),N=a("button"),u=h("svg"),b=h("path"),j=h("path"),nt=k(),R=a("button"),d=h("svg"),C=h("path"),T=h("path"),this.h()},l(o){Ct('[data-svelte="svelte-iywp9i"]',document.head).forEach(s),$=w(o),Tt(B.$$.fragment,o),K=w(o),c=l(o,"DIV",{class:!0});var U=r(c);x=l(U,"DIV",{class:!0});var G=r(x);D=l(G,"H1",{class:!0});var ht=r(D);Q=q(ht,"CURRENT TASK"),ht.forEach(s),W=w(G),I=l(G,"P",{class:!0});var ft=r(I);X=q(ft,"Press + to create a new task"),ft.forEach(s),G.forEach(s),Y=w(U),_=l(U,"DIV",{class:!0});var H=r(_);g=l(H,"DIV",{class:!0});var J=r(g);M=l(J,"P",{class:!0});var pt=r(M);Z=q(pt,"00:00"),pt.forEach(s),tt=w(J),P=l(J,"P",{class:!0});var vt=r(P);et=q(vt,"0 of 0 sessions"),vt.forEach(s),J.forEach(s),st=w(H),m=f(H,"svg",{class:!0,width:!0,height:!0});var ct=r(m);i=f(ct,"circle",{class:!0,stroke:!0,"stroke-width":!0,fill:!0,r:!0,cx:!0,cy:!0}),r(i).forEach(s),n=f(ct,"circle",{class:!0,stroke:!0,"stroke-linecap":!0,"stroke-width":!0,fill:!0,r:!0,cx:!0,cy:!0}),r(n).forEach(s),ct.forEach(s),H.forEach(s),rt=w(U),E=l(U,"DIV",{class:!0});var L=r(E);V=l(L,"P",{class:!0});var kt=r(V);ot=q(kt,"Create Task to start"),kt.forEach(s),at=w(L),p=l(L,"DIV",{class:!0});var O=r(p);z=l(O,"BUTTON",{class:!0});var wt=r(z);v=f(wt,"svg",{xmlns:!0,class:!0,fill:!0,viewBox:!0,stroke:!0});var mt=r(v);y=f(mt,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),r(y).forEach(s),mt.forEach(s),wt.forEach(s),lt=w(O),N=l(O,"BUTTON",{class:!0});var xt=r(N);u=f(xt,"svg",{xmlns:!0,class:!0,fill:!0,viewBox:!0,stroke:!0});var it=r(u);b=f(it,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),r(b).forEach(s),j=f(it,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),r(j).forEach(s),it.forEach(s),xt.forEach(s),nt=w(O),R=l(O,"BUTTON",{class:!0});var _t=r(R);d=f(_t,"svg",{xmlns:!0,class:!0,fill:!0,viewBox:!0,stroke:!0});var ut=r(d);C=f(ut,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),r(C).forEach(s),T=f(ut,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),r(T).forEach(s),ut.forEach(s),_t.forEach(s),O.forEach(s),L.forEach(s),U.forEach(s),this.h()},h(){document.title="Codedoro - Timer",t(D,"class","header text-gray-400 font-semibold text-sm"),t(I,"class","task text-white text-xl font-bold"),t(x,"class","task-title pt-5 md:pt-10 text-center h-1/5"),t(M,"class","countdown-text text-white text-5xl font-bold pb-3"),t(P,"class","sessions leading-10 text-gray-400"),t(g,"class","countdown-content absolute place-self-center self-center text-center"),t(i,"class","animate-pulse"),t(i,"stroke","currentColor"),t(i,"stroke-width","7"),t(i,"fill","transparent"),t(i,"r","120"),t(i,"cx","130"),t(i,"cy","130"),t(n,"class","progress-ring__circle text-yellow-300 transform -rotate-90 translate-y-full duration-700"),t(n,"stroke","currentColor"),t(n,"stroke-linecap","round"),t(n,"stroke-width","9"),t(n,"fill","transparent"),t(n,"r","120"),t(n,"cx","130"),t(n,"cy","130"),t(m,"class","progress-ring text-gray-500"),t(m,"width","260"),t(m,"height","260"),t(_,"class","countdown h-2/5 flex justify-center items-center"),t(V,"class","session-status text-white text-center self-top"),t(y,"stroke-linecap","round"),t(y,"stroke-linejoin","round"),t(y,"stroke-width","1.5"),t(y,"d","M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"),t(v,"xmlns","http://www.w3.org/2000/svg"),t(v,"class","h-16 w-16"),t(v,"fill","none"),t(v,"viewBox","0 0 24 24"),t(v,"stroke","currentColor"),t(z,"class","reset-btn text-gray-500"),t(b,"stroke-linecap","round"),t(b,"stroke-linejoin","round"),t(b,"stroke-width","2"),t(b,"d","M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"),t(j,"stroke-linecap","round"),t(j,"stroke-linejoin","round"),t(j,"stroke-width","2"),t(j,"d","M21 12a9 9 0 11-18 0 9 9 0 0118 0z"),t(u,"xmlns","http://www.w3.org/2000/svg"),t(u,"class","h-16 w-16 pointer-events-none select-none"),t(u,"fill","none"),t(u,"viewBox","0 0 24 24"),t(u,"stroke","currentColor"),t(N,"class","pause-btn text-white bg-yellow-300 rounded-full p-2 transform duration-700"),t(C,"stroke-linecap","round"),t(C,"stroke-linejoin","round"),t(C,"stroke-width","1.5"),t(C,"d","M21 12a9 9 0 11-18 0 9 9 0 0118 0z"),t(T,"stroke-linecap","round"),t(T,"stroke-linejoin","round"),t(T,"stroke-width","1.5"),t(T,"d","M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"),t(d,"xmlns","http://www.w3.org/2000/svg"),t(d,"class","h-16 w-16"),t(d,"fill","none"),t(d,"viewBox","0 0 24 24"),t(d,"stroke","currentColor"),t(R,"class","stop-btn text-gray-500"),t(p,"class","countdown-controls flex justify-between items-center pl-10 pr-10"),t(E,"class","countdown-footer h-2/5 flex flex-col justify-center gap-14"),t(c,"class","content h-full flex flex-col justify-center")},m(o,S){dt(o,$,S),Bt(B,o,S),dt(o,K,S),dt(o,c,S),e(c,x),e(x,D),e(D,Q),e(x,W),e(x,I),e(I,X),e(c,Y),e(c,_),e(_,g),e(g,M),e(M,Z),e(g,tt),e(g,P),e(P,et),e(_,st),e(_,m),e(m,i),e(m,n),e(c,rt),e(c,E),e(E,V),e(V,ot),e(E,at),e(E,p),e(p,z),e(z,v),e(v,y),e(p,lt),e(p,N),e(N,u),e(u,b),e(u,j),e(p,nt),e(p,R),e(R,d),e(d,C),e(d,T),F=!0},p:$t,i(o){F||(Dt(B.$$.fragment,o),F=!0)},o(o){It(B.$$.fragment,o),F=!1},d(o){o&&s($),Mt(B,o),o&&s(K),o&&s(c)}}}class Rt extends Et{constructor($){super();yt(this,$,null,Vt,bt,{})}}export{Rt as default};
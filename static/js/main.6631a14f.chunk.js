(this["webpackJsonpnumber-munchers"]=this["webpackJsonpnumber-munchers"]||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(7),u=n.n(r),a=n(1),i=n(2),s=n(6),c=n(5),o=n(4),l=n(3),h=n.n(l),m=(n(15),n(16),n(0));var f=function(e){var t=e.options,n=e.width,r=e.top,u=e.onClick,a=t.map((function(t,n){var r=t.getName();return n===e.selected?Object(m.jsx)("li",{className:"selected",onClick:function(){return u(n)},onKeyPress:function(){return u(n)},children:r},r):Object(m.jsx)("li",{onClick:function(){return u(n)},onKeyPress:function(){return u(n)},children:r},r)})),i=n||"w300",s=r||"t20";return Object(m.jsx)("div",{className:"options",children:Object(m.jsx)("ol",{className:"".concat(i," ").concat(s),children:a})})},g="Multiples",v="Factors",y="Primes",d=n(9),k=n(10);n(18);var b=function(e){var t=e.cell,n=e.value,r=e.onClick;return Object(m.jsx)("div",{id:"c".concat(t),className:"square",onClick:r,onKeyPress:r,children:n},t)};n(19),n(20);var p=function(e){var t=e.display,n="muncher";return void 0!==t&&(n="".concat(n," ").concat(t)),Object(m.jsx)("div",{ref:function(t){var n=t;n&&(n.style.left="".concat(n.getBoundingClientRect().width*e.position.x,"px"),n.style.top="".concat(n.getBoundingClientRect().height*e.position.y,"px"))},className:n})};n(21);var j=function(e){var t=e.message,n=e.onClick;return Object(m.jsxs)("div",{className:"notification",onClick:n,onKeyPress:n,children:[t,Object(m.jsx)("br",{}),"Press Space Bar to continue."]})};n(22);function x(e,t){var n=Math.floor(Math.random()*e),r=Math.floor(Math.random()*t);return n>0&&n<e-1&&(r=Math.abs(t-1-r)<Math.abs(0-r)?t-1:0),r>0&&r<t-1&&(n=Math.abs(e-1-n)<Math.abs(0-n)?e-1:0),{position:{x:n,y:r},direction:0===n?{x:1,y:0}:n===e-1?{x:-1,y:0}:0===r?{x:0,y:1}:{x:0,y:-1}}}var O=function(e){var t=e.position,n=e.troggle,r="troggle ".concat(n);return Object(m.jsx)("div",{ref:function(e){var n=e;n&&(n.style.left="".concat(n.getBoundingClientRect().width*t.x,"px"),n.style.top="".concat(n.getBoundingClientRect().height*t.y,"px"))},className:r})};function w(e,t,n,r){for(var u=[],a=function(a){var i=t*e+a;u.push(Object(m.jsx)(b,{cell:i,value:n[i],onClick:function(){return r.click(a,t)}},"c".concat(i)))},i=0;i<e;i++)a(i);return u}var q=function(e){var t,n=e.height,r=e.width,u=e.squares,a=e.muncher,i=e.troggles,s=e.notification,c=e.movement,o=Object(k.useSwipeable)({onSwipedUp:function(){return c.keyDown({code:"ArrowUp"})},onSwipedDown:function(){return c.keyDown({code:"ArrowDown"})},onSwipedLeft:function(){return c.keyDown({code:"ArrowLeft"})},onSwipedRight:function(){return c.keyDown({code:"ArrowRight"})},preventDefaultTouchmoveEvent:!0});null!=s&&""!==s.trim()&&(t=Object(m.jsx)(j,{message:s,onClick:function(){c.keyDown({code:"Space"})}}));for(var l=[],h=0;h<i.length;h++){var f=i[h];void 0!==f.position&&l.push(Object(m.jsx)(O,{position:f.position,troggle:f.troggle},h))}var g=function(e,t,n,r){for(var u=[],a=0;a<e;a++){var i=w(t,a,n,r);u.push(Object(m.jsx)("div",{className:"board-row",children:i},"row".concat(a)))}return u}(n,r,u,c);return Object(m.jsxs)("div",Object(d.a)(Object(d.a)({className:"board"},o),{},{children:[Object(m.jsx)(p,{position:a,display:a.display}),l,t,g]}))};n(23);var N=function(e){var t=e.status,n="";return void 0!==t&&""!==t&&(n=Object(m.jsx)("div",{className:"status",children:t})),n},M=(n(24),function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).state={selected:1},r.keyDown=r.keyDown.bind(Object(s.a)(r)),r}return Object(i.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.keyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.keyDown)}},{key:"keyDown",value:function(e){var t=this.state.selected;switch(e.code){case"ArrowLeft":return this.select(2),this.select(0);case"ArrowRight":return this.select(2),this.select(1);case"Enter":return this.select(t)}return 0}},{key:"select",value:function(e){var t=this.state.selected;if(t===e){var n=this.props,r=n.yes,u=n.no;t?u():r()}else t=e,this.setState({selected:t})}},{key:"render",value:function(){var e=this,t="quit-button quit-yes",n="quit-button quit-no";return 0===this.state.selected?t+=" quit-selected":n+=" quit-selected",Object(m.jsxs)("div",{className:"quit",children:[Object(m.jsx)("br",{}),"Do you really want to quit?",Object(m.jsx)("span",{onClick:function(){return e.select(0)},onKeyPress:function(){return e.select(0)},className:t,children:"Yes"}),Object(m.jsx)("span",{onClick:function(){return e.select(1)},onKeyPress:function(){return e.select(1)},className:n,children:"No"})]})}}]),n}(h.a.Component)),S=(n(25),function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(e){var r;Object(a.a)(this,n),r=t.call(this,e);var u=e.game,i={x:2,y:2};return r.state={game:u,pause:!1,quit:!1,level:1,score:0,lives:3,notification:"",status:"",muncher:i,troggles:[],squares:r.setupBoard(u,i)},r.keyDown=r.keyDown.bind(Object(s.a)(r)),r.clickedSquare=r.clickedSquare.bind(Object(s.a)(r)),r}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("keydown",this.keyDown),this.timer=setInterval((function(){e.troggle()}),4e3)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.keyDown),clearInterval(this.timer)}},{key:"setupBoard",value:function(e,t){e.resetNumber();var n=Array(30);n[6*t.y+t.x]="";for(var r=0;r<n.length;r++)""!==n[r]&&(n[r]=e.getFiller());return n}},{key:"troggle",value:function(){var e=this.state,t=e.squares,n=e.game,r=e.pause,u=e.level,a=e.troggles;if(!r){for(var i=function(e,t,n,r){for(var u="",a=0;a<e.length;a++){var i=e[a];if(void 0===i.position){var s=x(n,r),c=s.position,o=s.direction;i.position=c,i.direction=o}}return e.length<Math.ceil(t/2)&&Math.random()<.2&&(e.push({troggle:"normalus"}),u="Troggle!"),{troggles:e,status:u}}(function(e,t,n){for(var r=[],u=0;u<e.length;u++){var a=e[u];void 0!==a.position&&(a.position.x+=a.direction.x,a.position.y+=a.direction.y,(a.position.x<0||a.position.y<0||a.position.x>t-1||a.position.y>n-1)&&r.push(u))}for(var i=0;i<r.length;i++)e.splice(i,1);return e}(a,6,5),u,6,5),s=0;s<i.troggles.length;s++){var c=i.troggles[s];void 0!==c.position&&""!==t[6*c.position.y+c.position.x]&&(t[6*c.position.y+c.position.x]=n.getFiller())}this.setState({troggles:i.troggles,status:i.status,squares:t}),this.troggleMuncherCheck()}}},{key:"keyDown",value:function(e){var t=this.state,n=t.pause,r=t.quit,u=t.game,a=t.muncher;if(n)r?"Escape"===e.code&&this.keyDownEscape():this.keyDownNotQuit(e);else switch(e.code){case"Space":if(this.update(this.munch()),this.checkLevel()){var i=this.state.level;this.moveMuncher(2-a.x,2-a.y),this.setState({pause:!0,notification:"You beat the level!",level:i+1,troggles:[],status:"",squares:this.setupBoard(u,{x:2,y:2})})}break;case"ArrowLeft":this.moveMuncher(-1,0);break;case"ArrowRight":this.moveMuncher(1,0);break;case"ArrowUp":this.moveMuncher(0,-1);break;case"ArrowDown":this.moveMuncher(0,1);break;case"Escape":this.setState({pause:!0,quit:!0});break;case"Enter":this.setState({pause:!0,status:"Time out"})}}},{key:"keyDownNotQuit",value:function(e){var t=this.state,n=t.status,r=t.notification;"Escape"===e.code?this.setState({quit:!0}):"Enter"===e.code&&""===r?this.setState({pause:!1,status:""}):"Space"===e.code&&"Time out"!==n&&this.setState({pause:!1,notification:""})}},{key:"keyDownEscape",value:function(){var e=this.state.status;this.setState({quit:!1}),"Time out"!==e&&this.setState({pause:!1})}},{key:"clickedSquare",value:function(e,t){var n=this,r=this.state,u=r.muncher;if(!r.pause)if(e===u.x&&t===u.y)this.keyDown({code:"Space"});else{var a=Math.max(Math.min(e-u.x,1),-1),i=Math.max(Math.min(t-u.y,1),-1);this.timerX=setInterval((function(){n.moveMuncher(a,0);var t=n.state.muncher;e===t.x&&clearInterval(n.timerX)}),200),setTimeout((function(){n.timerY=setInterval((function(){n.moveMuncher(0,i);var e=n.state.muncher;t===e.y&&clearInterval(n.timerY)}),200)}),100)}}},{key:"moveMuncher",value:function(e,t){var n=this.state.muncher;this.setState({muncher:{x:Math.min(Math.max(0,n.x+e),5),y:Math.min(Math.max(0,n.y+t),4)}}),this.troggleMuncherCheck()}},{key:"troggleMuncherCheck",value:function(){for(var e=this.state,t=e.troggles,n=e.muncher,r=this.state.lives,u=0;u<t.length;u++){var a=t[u];if(void 0!==a.position&&a.position.x===n.x&&a.position.y===n.y){r--,n.display="none",clearInterval(this.timerX),clearInterval(this.timerY),this.setState({pause:!0,notification:"Yikes! You were eaten by a Trogglus ".concat(a.troggle,"."),lives:r,muncher:n}),this.endGame();break}n.display="",this.setState({muncher:n})}}},{key:"endGame",value:function(){var e=this.state,t=e.lives,n=e.game;0===t&&this.setState({squares:this.setupBoard(n,{x:2,y:2}),muncher:{x:2,y:2},score:0,lives:3,level:1,pause:!0,notification:"You lost the game!",troggles:[],status:""})}},{key:"munch",value:function(){var e=this.state,t=e.squares,n=e.muncher,r=e.game,u=t[6*n.y+n.x];t[6*n.y+n.x]="",this.setState({squares:t});var a=!0;return""!==u&&(a=r.isCorrect(u)),{isValid:a,value:u}}},{key:"update",value:function(e){var t=e.isValid,n=e.value,r=this.state,u=r.score,a=r.lives,i=this.state.game;t&&""!==n?u+=5:t||(this.setState({pause:!0,notification:i.getError(n)}),a--),this.setState({score:u,lives:a}),this.endGame()}},{key:"checkLevel",value:function(){for(var e=this.state,t=e.squares,n=e.game,r=0;r<t.length;r++)if(""!==t[r]&&n.isCorrect(t[r]))return!1;return!0}},{key:"render",value:function(){for(var e,t=this,n=this.state,r=n.level,a=n.game,i=n.quit,s=n.muncher,c=n.troggles,o=n.squares,l=n.score,h=n.lives,f=n.notification,g=n.status,v=[],y=0;y<h;y++)v.push(Object(m.jsx)("span",{className:"life"},y));return i&&(e=Object(m.jsx)(M,{no:function(){return t.keyDown({code:"Escape"})},yes:function(){return u.a.render(re.mainMenu(),document.getElementById("root"))}})),Object(m.jsxs)("div",{className:"full",children:[e,Object(m.jsxs)("div",{className:"info",children:[Object(m.jsx)("div",{className:"level",children:"Level: ".concat(r)}),Object(m.jsx)("div",{className:"title",children:a.getTitle()})]}),Object(m.jsx)(N,{status:g}),Object(m.jsx)(q,{height:5,width:6,troggles:c,muncher:s,squares:o,notification:f,movement:{keyDown:this.keyDown,click:function(e,n){return t.clickedSquare(e,n)}}}),Object(m.jsxs)("div",{className:"info",children:[Object(m.jsxs)("div",{className:"score",children:[Object(m.jsx)("span",{children:"Score:"})," ",Object(m.jsx)("span",{className:"points",children:l})]}),Object(m.jsx)("div",{className:"lives",children:v})]})]})}}]),n}(h.a.Component)),C=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,[{key:"getName",value:function(){return"Set Content"}}]),e}(),E=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,[{key:"getName",value:function(){return"Erase Hall of Fame"}}]),e}(),D=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,[{key:"getName",value:function(){return"Set Password"}}]),e}(),I=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,[{key:"getName",value:function(){return"Turn Joystick ON"}}]),e}(),P=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,[{key:"getName",value:function(){return"Calibrate Joystick"}}]),e}(),A=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,[{key:"getName",value:function(){return"Options"}},{key:"getScreen",value:function(){return Object(m.jsx)(re,{title:this.getName(),question:"Choose an option:",options:[new V,new C,new E,new D,new I,new P],escape:re.mainMenu(),extraClass:"options-border",instructions:Object(m.jsxs)("span",{children:[Object(m.jsx)("p",{children:"Use Arrows to move, then press Enter."}),Object(m.jsx)("p",{children:"Escape: Main Menu"})]}),width:"w550"})}}]),e}(),F=["3rd Grade Easy","3rd Grade Advanced","4th Grade Easy","4th Grade Advanced","5th Grade Easy","5th Grade Advanced","6th Grade Easy","6th Grade Advanced","7th Grade Easy","7th Grade Advanced","8th Grade and Above"],L=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return"Set Difficulty Level"}},{key:"getSelected",value:function(){return parseInt(localStorage.getItem("difficulty"),10)||1}},{key:"getScreen",value:function(){var e=localStorage.getItem("difficulty")||1;return Object(m.jsx)(re,{title:"Select Difficulty",question:Object(m.jsxs)("span",{children:[Object(m.jsxs)("p",{children:["Current Difficulty: ",F[e]]}),Object(m.jsx)("p",{children:"Choose a level:"})]}),options:[new B,new T,new U,new R,new Y,new K,new J,new W,new Q,new X,new H],escape:(new A).getScreen(),extraClass:"options-border",instructions:Object(m.jsxs)("span",{children:[Object(m.jsx)("p",{children:"Use Arrows to move, then press Enter."}),Object(m.jsx)("p",{children:"Escape: Options Menu"})]}),width:"w550",top:"tn40"})}}],[{key:"getDifficulty",value:function(e){switch(parseInt(e,10)){case 0:return B;case 1:return T;case 2:return U;case 3:return R;case 4:return Y;case 5:return K;case 6:return J;case 7:return W;case 8:return Q;case 9:return X;case 10:return H;default:return T}}}]),n}(h.a.Component),G=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getScreen",value:function(){return localStorage.setItem("difficulty",F.indexOf(this.getName())),(new A).getScreen()}}]),n}(h.a.Component),B=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[0]}}],[{key:"getMultiples",value:function(){return{use:!1,range:{min:2,max:5},sequence:!0,other:5}}},{key:"getFactors",value:function(){return{use:!1,range:{min:3,max:5},sequence:!0}}},{key:"getPrimes",value:function(){return{use:!1,range:{min:2,max:25}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:20},sequence:!0,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:10},sequence:!0,other:["+","-"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),T=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[1]}}],[{key:"getMultiples",value:function(){return{use:!0,range:{min:2,max:5},sequence:!0,other:5}}},{key:"getFactors",value:function(){return{use:!0,range:{min:3,max:25},sequence:!0}}},{key:"getPrimes",value:function(){return{use:!1,range:{min:2,max:25}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:20},sequence:!0,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:20},sequence:!0,other:["+","-"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),U=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[2]}}],[{key:"getMultiples",value:function(){return{use:!0,range:{min:2,max:9},sequence:!0,other:5}}},{key:"getFactors",value:function(){return{use:!0,range:{min:3,max:25},sequence:!0}}},{key:"getPrimes",value:function(){return{use:!1,range:{min:2,max:50}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:24},sequence:!0,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:20},sequence:!0,other:["+","-"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),R=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[3]}}],[{key:"getMultiples",value:function(){return{use:!0,range:{min:2,max:9},sequence:!1,other:9}}},{key:"getFactors",value:function(){return{use:!0,range:{min:3,max:64},sequence:!1}}},{key:"getPrimes",value:function(){return{use:!1,range:{min:2,max:50}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:24},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:20},sequence:!1,other:["+","-","x"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),Y=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[4]}}],[{key:"getMultiples",value:function(){return{use:!0,range:{min:2,max:9},sequence:!1,other:9}}},{key:"getFactors",value:function(){return{use:!0,range:{min:3,max:64},sequence:!1}}},{key:"getPrimes",value:function(){return{use:!1,range:{min:2,max:50}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:24},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:24},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),K=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[5]}}],[{key:"getMultiples",value:function(){return{use:!0,range:{min:2,max:11},sequence:!1,other:13}}},{key:"getFactors",value:function(){return{use:!0,range:{min:3,max:81},sequence:!1}}},{key:"getPrimes",value:function(){return{use:!0,range:{min:2,max:50}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:24},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),J=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[6]}}],[{key:"getMultiples",value:function(){return{use:!0,range:{min:2,max:11},sequence:!1,other:13}}},{key:"getFactors",value:function(){return{use:!0,range:{min:3,max:81},sequence:!1}}},{key:"getPrimes",value:function(){return{use:!0,range:{min:2,max:50}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),W=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[7]}}],[{key:"getMultiples",value:function(){return{use:!0,range:{min:2,max:12},sequence:!1,other:13}}},{key:"getFactors",value:function(){return{use:!0,range:{min:3,max:99},sequence:!1}}},{key:"getPrimes",value:function(){return{use:!0,range:{min:2,max:99}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),Q=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[8]}}],[{key:"getMultiples",value:function(){return{use:!0,range:{min:2,max:12},sequence:!1,other:18}}},{key:"getFactors",value:function(){return{use:!0,range:{min:3,max:99},sequence:!1}}},{key:"getPrimes",value:function(){return{use:!0,range:{min:2,max:99}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),X=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[9]}}],[{key:"getMultiples",value:function(){return{use:!0,range:{min:2,max:20},sequence:!1,other:20}}},{key:"getFactors",value:function(){return{use:!0,range:{min:3,max:99},sequence:!1}}},{key:"getPrimes",value:function(){return{use:!0,range:{min:2,max:199}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),H=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"getName",value:function(){return F[10]}}],[{key:"getMultiples",value:function(){return{use:!0,range:{min:2,max:20},sequence:!1,other:50}}},{key:"getFactors",value:function(){return{use:!0,range:{min:3,max:99},sequence:!1}}},{key:"getPrimes",value:function(){return{use:!0,range:{min:2,max:199}}}},{key:"getEquality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getInequality",value:function(){return{use:!0,range:{min:1,max:50},sequence:!1,other:["+","-","x","\xf7"]}}},{key:"getChallenge",value:function(){return{use:!0}}}]),n}(G),V=L,z=function(){function e(t,n,r){Object(a.a)(this,e);var u=V.getDifficulty(localStorage.getItem("difficulty")).getMultiples();this.minNum=t||u.range.min,this.maxNum=n||u.range.max,this.minMult=1,this.maxMult=r||u.other,this.resetNumber()}return Object(i.a)(e,[{key:"resetNumber",value:function(){for(var e=this.number;e===this.number;)this.number=Math.floor(this.minNum+Math.random()*(this.maxNum-this.minNum+1))}},{key:"getName",value:function(){return g}},{key:"getScreen",value:function(){return Object(m.jsx)(S,{game:this})}},{key:"getNumber",value:function(){return this.number}},{key:"getTitle",value:function(){return"".concat(this.getName()," of ").concat(this.number)}},{key:"getMultiple",value:function(){var e=this.minMult+Math.round(Math.random()*(this.maxMult-this.minMult));return this.number*e}},{key:"getNonMultiple",value:function(){for(var e=0;this.isCorrect(e);)e=Math.floor(Math.random()*(this.maxMult*this.number))+1;return e}},{key:"getFiller",value:function(){return Math.random()<.4?this.getMultiple():this.getNonMultiple()}},{key:"isCorrect",value:function(e){return e%this.number===0}},{key:"getError",value:function(e){return'"'.concat(e,'" is not a multiple of "').concat(this.getNumber(),'".')}}]),e}(),Z=function(){function e(t,n){Object(a.a)(this,e);var r=V.getDifficulty(localStorage.getItem("difficulty")).getFactors();this.minNum=t||r.range.min,this.maxNum=n||r.range.max,this.resetNumber()}return Object(i.a)(e,[{key:"resetNumber",value:function(){for(var e=this,t=this.number;t===this.number;)this.number=Math.floor(this.minNum+Math.random()*(this.maxNum-this.minNum+1));this.factors=Array.from(Array(this.number+1),(function(e,t){return t})).filter((function(t){return e.number%t===0}))}},{key:"getName",value:function(){return v}},{key:"getScreen",value:function(){return Object(m.jsx)(S,{game:this})}},{key:"getNumber",value:function(){return this.number}},{key:"getTitle",value:function(){return"".concat(this.getName()," of ").concat(this.number)}},{key:"getFactor",value:function(){return this.factors[Math.floor(Math.random()*this.factors.length)]}},{key:"getNonFactor",value:function(){for(var e=1;this.isCorrect(e);)e=1+Math.floor(Math.random()*this.number);return e}},{key:"getFiller",value:function(){return Math.random()<.4?this.getFactor():this.getNonFactor()}},{key:"isCorrect",value:function(e){return this.factors.includes(e)}},{key:"getError",value:function(e){return'"'.concat(e,'" is not a factor of "').concat(this.getNumber(),'".')}}]),e}(),$=function(){function e(t,n){var r=this;Object(a.a)(this,e);var u=V.getDifficulty(localStorage.getItem("difficulty")).getPrimes();this.minNum=t||u.range.min,this.maxNum=n||u.range.max;this.primes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199].filter((function(e){return e>=r.minNum&&e<=r.maxNum})),this.resetNumber()}return Object(i.a)(e,[{key:"resetNumber",value:function(){this.number=null}},{key:"getName",value:function(){return y}},{key:"getScreen",value:function(){return Object(m.jsx)(S,{game:this})}},{key:"getNumber",value:function(){return this.number}},{key:"getTitle",value:function(){return"Prime Numbers"}},{key:"getPrime",value:function(){return this.primes[Math.floor(Math.random()*this.primes.length)]}},{key:"getNonPrime",value:function(){for(var e=2;this.isCorrect(e);)e=1+Math.floor(Math.random()*this.maxNum);return e}},{key:"getFiller",value:function(){return Math.random()<.4?this.getPrime():this.getNonPrime()}},{key:"isCorrect",value:function(e){return this.primes.includes(e)}},{key:"getError",value:function(e){return'The number "'.concat(e,'" is not prime.')}}]),e}(),_=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,[{key:"getName",value:function(){return"Play Number Munchers"}},{key:"getScreen",value:function(){var e=[];return V.getDifficulty(localStorage.getItem("difficulty")).getMultiples().use&&e.push(new z),V.getDifficulty(localStorage.getItem("difficulty")).getFactors().use&&e.push(new Z),V.getDifficulty(localStorage.getItem("difficulty")).getPrimes().use&&e.push(new $),Object(m.jsx)(re,{question:"Which Number Munchers game would you like to play",options:e,escape:re.mainMenu(),extraClass:"menu-border",instructions:"Use Arrows to move, then press Enter"})}}]),e}(),ee=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,[{key:"getName",value:function(){return"Hall of Fame"}}]),e}(),te=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,[{key:"getName",value:function(){return"Information"}}]),e}(),ne=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,[{key:"getName",value:function(){return"Quit"}}]),e}(),re=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).state={selected:0},r.keyDown=r.keyDown.bind(Object(s.a)(r)),r.clickedOption=r.clickedOption.bind(Object(s.a)(r)),r}return Object(i.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.keyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.keyDown)}},{key:"keyDown",value:function(e){var t=this.props.escape;switch(e.code){case"Enter":this.select();break;case"ArrowLeft":case"ArrowUp":this.select(-1);break;case"ArrowRight":case"ArrowDown":this.select(1);break;case"Escape":void 0!==t&&(this.setState({selected:0}),u.a.render(t,document.getElementById("root")))}}},{key:"clickedOption",value:function(e){e===this.state.selected?this.select():this.setState({selected:e})}},{key:"select",value:function(e){var t=this.state.selected,n=this.props.options;void 0===e?(this.setState({selected:n[t].getSelected?n[t].getSelected():0}),u.a.render(n[t].getScreen(),document.getElementById("root"))):((t+=e)<0?t=n.length-1:t>=n.length&&(t=0),this.setState({selected:t}))}},{key:"render",value:function(){var e=this,t=this.props,n=t.title,r=t.question,u=t.options,a=t.instructions,i=t.extraClass,s=t.width,c=t.top,o=this.state.selected,l=n?Object(m.jsx)("div",{className:"menu-title",children:n}):"";return Object(m.jsxs)("div",{className:"all",children:[l,Object(m.jsxs)("div",{className:"menu ".concat(i),children:[Object(m.jsx)("div",{className:"text",children:r}),Object(m.jsx)(f,{options:u,selected:o,width:s,top:c,onClick:function(t){return e.clickedOption(t)}}),Object(m.jsx)("div",{role:"button",className:"text",onClick:function(){return e.keyDown({code:"Escape"})},onKeyPress:function(){return e.keyDown({code:"Escape"})},children:a},"go-back")]})]})}}],[{key:"mainMenu",value:function(){return Object(m.jsx)(n,{options:[new _,new ee,new te,new A,new ne],instructions:"Use Arrows to move, then press Enter",extraClass:"opening",width:"w550",top:"t140"})}}]),n}(h.a.Component);n(26);u.a.render(re.mainMenu(),document.getElementById("root"))}],[[27,1,2]]]);
//# sourceMappingURL=main.6631a14f.chunk.js.map
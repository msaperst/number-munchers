(this["webpackJsonpnumber-munchers"]=this["webpackJsonpnumber-munchers"]||[]).push([[0],[,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var i=n(1),a=n.n(i),s=n(5),r=n.n(s),c=n(2),u=n(3),o=n(7),l=n(6),h=(n(12),n(13),n(0));var m=function(e){var t=e.cell,n=e.value;return Object(h.jsx)("div",{id:"c".concat(t),className:"square",children:n},t)};n(15),n(16);var v=function(e){return Object(h.jsx)("div",{ref:function(t){var n=t;n&&(n.style.left="".concat(n.getBoundingClientRect().width*e.position.x,"px"),n.style.top="".concat(n.getBoundingClientRect().height*e.position.y,"px"))},className:"muncher"})};n(17);var f=function(e){var t=e.message;return Object(h.jsxs)("div",{className:"notification",children:[t,Object(h.jsx)("br",{}),"Press Space Bar to continue."]})};function d(e,t,n){for(var i=[],a=0;a<e;a++){var s=t*e+a;i.push(Object(h.jsx)(m,{cell:s,value:n[s]},"c".concat(s)))}return i}var b=function(e){var t,n=e.height,i=e.width,a=e.squares,s=e.muncher,r=e.notification;null!=r&&""!==r.trim()&&(t=Object(h.jsx)(f,{message:r}));var c=function(e,t,n){for(var i=[],a=0;a<e;a++){var s=d(t,a,n);i.push(Object(h.jsx)("div",{className:"board-row",children:s},"row".concat(a)))}return i}(n,i,a);return Object(h.jsxs)("div",{className:"board",children:[Object(h.jsx)(v,{position:s}),t,c]})},j="Multiples",x=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;Object(c.a)(this,e),this.minNum=t,this.maxNum=n,this.minMult=1,this.maxMult=i,this.resetNumber()}return Object(u.a)(e,[{key:"resetNumber",value:function(){for(var e=this.number;e===this.number;)this.number=Math.floor(this.minNum+Math.random()*(this.maxNum-this.minNum+1))}},{key:"getGame",value:function(){return j}},{key:"getNumber",value:function(){return this.number}},{key:"getMultiple",value:function(){if(Math.random()>.4)return Math.floor(Math.random()*(this.maxMult*this.number));var e=Math.floor(this.minMult+Math.random()*(this.maxMult-this.minMult));return this.number*e}},{key:"isMultiple",value:function(e){return e%this.number===0}}]),e}(),p=function(e){Object(o.a)(n,e);var t=Object(l.a)(n);function n(e){var i;Object(c.a)(this,n),i=t.call(this,e);var a=new x,s={x:2,y:2};return i.state={game:a,level:1,score:0,lives:3,notification:"",muncher:s,squares:i.setupBoard(a,s)},i}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("keydown",(function(t){e.keyDown(t.code)}))}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.keyDown)}},{key:"setupBoard",value:function(e,t){e.resetNumber();var n=Array(30);n[6*t.y+t.x]="";for(var i=0;i<n.length;i++)""!==n[i]&&(n[i]=this.numberFill(e));return n}},{key:"keyDown",value:function(e){var t=this.state,n=t.notification,i=t.game,a=t.muncher;if(""===n)switch(e){case"Space":if(this.update(this.munch()),this.checkLevel()){var s=this.state.level;this.moveMuncher(2-a.x,2-a.y),this.setState({notification:"You beat the level!",level:s+1,squares:this.setupBoard(i,{x:2,y:2})})}break;case"ArrowLeft":this.moveMuncher(-1,0);break;case"ArrowRight":this.moveMuncher(1,0);break;case"ArrowUp":this.moveMuncher(0,-1);break;case"ArrowDown":this.moveMuncher(0,1)}else"Space"===e&&this.setState({notification:""})}},{key:"moveMuncher",value:function(e,t){var n=this.state.muncher;this.setState({muncher:{x:Math.min(Math.max(0,n.x+e),5),y:Math.min(Math.max(0,n.y+t),4)}})}},{key:"numberFill",value:function(e){switch(e.getGame()){case j:return e.getMultiple();default:return""}}},{key:"munch",value:function(){var e,t=this.state,n=t.squares,i=t.muncher,a=t.game,s=n[6*i.y+i.x];switch(n[6*i.y+i.x]="",this.setState({squares:n}),a.getGame()){case j:e=a.isMultiple(s);break;default:e=!1}return{isValid:e,value:s}}},{key:"update",value:function(e){var t=e.isValid,n=e.value,i=this.state,a=i.score,s=i.lives,r=this.state.game;if(t&&""!==n)a+=5;else if(!t){var c=r.getGame().slice(0,r.getGame().length-1);this.setState({notification:'"'.concat(n,'" is not a ').concat(c.toLowerCase(),' of "').concat(r.getNumber(),'".')}),s--}this.setState({score:a,lives:s}),0===s&&this.setState({squares:this.setupBoard(r,{x:2,y:2}),muncher:{x:2,y:2},score:0,lives:3,level:1,notification:"You lost the game!"})}},{key:"checkLevel",value:function(){for(var e=this.state,t=e.squares,n=e.game,i=0;i<t.length;i++)if(""!==t[i])switch(n.getGame()){case j:if(n.isMultiple(t[i]))return!1;break;default:return!1}return!0}},{key:"render",value:function(){for(var e=this.state,t=e.level,n=e.game,i=e.muncher,a=e.squares,s=e.score,r=e.lives,c=e.notification,u=[],o=0;o<r;o++)u.push(Object(h.jsx)("span",{className:"life"},o));return Object(h.jsxs)("div",{className:"full",children:[Object(h.jsxs)("div",{className:"info",children:[Object(h.jsx)("div",{className:"level",children:"Level: ".concat(t)}),Object(h.jsx)("div",{className:"title",children:"".concat(n.getGame()," of ").concat(n.getNumber())})]}),Object(h.jsx)(b,{height:5,width:6,muncher:i,squares:a,notification:c}),Object(h.jsxs)("div",{className:"info",children:[Object(h.jsxs)("div",{className:"score",children:[Object(h.jsx)("span",{children:"Score:"})," ",Object(h.jsx)("span",{className:"points",children:s})]}),Object(h.jsx)("div",{className:"lives",children:u})]})]})}}]),n}(a.a.Component);n(18);r.a.render(Object(h.jsx)(p,{}),document.getElementById("root"))}],[[19,1,2]]]);
//# sourceMappingURL=main.9b710580.chunk.js.map
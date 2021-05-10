(this["webpackJsonpnumber-munchers"]=this["webpackJsonpnumber-munchers"]||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),s=n(5),a=n.n(s),c=n(2),o=n(3),u=n(4),l=n(7),h=n(6),m=(n(13),n(14),n(0));var f=function(e){var t=e.up,n=e.down,r=e.left,i=e.right,s=e.space,a=e.enter;return Object(m.jsxs)("div",{className:"keyboard",children:[Object(m.jsx)("button",{type:"button",className:"enter",onClick:a,children:"Enter"}),Object(m.jsx)("button",{type:"button",className:"up",onClick:t,children:"Up"}),Object(m.jsx)("button",{type:"button",className:"left",onClick:r,children:"Left"}),Object(m.jsx)("button",{type:"button",className:"right",onClick:i,children:"Right"}),Object(m.jsx)("button",{type:"button",className:"down",onClick:n,children:"Down"}),Object(m.jsx)("button",{type:"button",className:"space",onClick:s,children:"Space"})]})};n(16);var v=function(e){var t=e.options.map((function(t,n){return n===e.selected?Object(m.jsx)("li",{className:"selected",children:t.getGame()},t.getGame()):Object(m.jsx)("li",{children:t.getGame()},t.getGame())}));return Object(m.jsx)("div",{className:"options",children:Object(m.jsx)("ol",{children:t})})};n(17),n(18);var d=function(e){var t=e.cell,n=e.value;return Object(m.jsx)("div",{id:"c".concat(t),className:"square",children:n},t)};n(19),n(20);var b=function(e){return Object(m.jsx)("div",{ref:function(t){var n=t;n&&(n.style.left="".concat(n.getBoundingClientRect().width*e.position.x,"px"),n.style.top="".concat(n.getBoundingClientRect().height*e.position.y,"px"))},className:"muncher"})};n(21);var j=function(e){var t=e.message;return Object(m.jsxs)("div",{className:"notification",children:[t,Object(m.jsx)("br",{}),"Press Space Bar to continue."]})};function y(e,t,n){for(var r=[],i=0;i<e;i++){var s=t*e+i;r.push(Object(m.jsx)(d,{cell:s,value:n[s]},"c".concat(s)))}return r}var p=function(e){var t,n=e.height,r=e.width,i=e.squares,s=e.muncher,a=e.notification;null!=a&&""!==a.trim()&&(t=Object(m.jsx)(j,{message:a}));var c=function(e,t,n){for(var r=[],i=0;i<e;i++){var s=y(t,i,n);r.push(Object(m.jsx)("div",{className:"board-row",children:s},"row".concat(i)))}return r}(n,r,i);return Object(m.jsxs)("div",{className:"board",children:[Object(m.jsx)(b,{position:s}),t,c]})},k="Multiples",w="Factors",x=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var r;Object(c.a)(this,n),r=t.call(this,e);var i=e.game,s={x:2,y:2};return r.state={game:i,level:1,score:0,lives:3,notification:"",muncher:s,squares:r.setupBoard(i,s)},r.keyDown=r.keyDown.bind(Object(u.a)(r)),r}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("keydown",(function(t){e.keyDown(t.code)}))}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.keyDown)}},{key:"setupBoard",value:function(e,t){e.resetNumber();var n=Array(30);n[6*t.y+t.x]="";for(var r=0;r<n.length;r++)""!==n[r]&&(n[r]=this.numberFill(e));return n}},{key:"keyDown",value:function(e){var t=this.state,n=t.notification,r=t.game,i=t.muncher;if(""===n)switch(e){case"Space":if(this.update(this.munch()),this.checkLevel()){var s=this.state.level;this.moveMuncher(2-i.x,2-i.y),this.setState({notification:"You beat the level!",level:s+1,squares:this.setupBoard(r,{x:2,y:2})})}break;case"ArrowLeft":this.moveMuncher(-1,0);break;case"ArrowRight":this.moveMuncher(1,0);break;case"ArrowUp":this.moveMuncher(0,-1);break;case"ArrowDown":this.moveMuncher(0,1)}else"Space"===e&&this.setState({notification:""})}},{key:"moveMuncher",value:function(e,t){var n=this.state.muncher;this.setState({muncher:{x:Math.min(Math.max(0,n.x+e),5),y:Math.min(Math.max(0,n.y+t),4)}})}},{key:"numberFill",value:function(e){switch(e.getGame()){case k:return e.getMultiple();case w:return e.getFactor();default:return""}}},{key:"munch",value:function(){var e,t=this.state,n=t.squares,r=t.muncher,i=t.game,s=n[6*r.y+r.x];switch(n[6*r.y+r.x]="",this.setState({squares:n}),i.getGame()){case k:e=i.isMultiple(s);break;case w:e=i.isFactor(s);break;default:e=!1}return{isValid:e,value:s}}},{key:"update",value:function(e){var t=e.isValid,n=e.value,r=this.state,i=r.score,s=r.lives,a=this.state.game;if(t&&""!==n)i+=5;else if(!t){var c=a.getGame().slice(0,a.getGame().length-1);this.setState({notification:'"'.concat(n,'" is not a ').concat(c.toLowerCase(),' of "').concat(a.getNumber(),'".')}),s--}this.setState({score:i,lives:s}),0===s&&this.setState({squares:this.setupBoard(a,{x:2,y:2}),muncher:{x:2,y:2},score:0,lives:3,level:1,notification:"You lost the game!"})}},{key:"checkLevel",value:function(){for(var e=this.state,t=e.squares,n=e.game,r=0;r<t.length;r++)if(""!==t[r])switch(n.getGame()){case k:if(n.isMultiple(t[r]))return!1;break;case w:if(n.isFactor(t[r]))return!1;break;default:return!1}return!0}},{key:"render",value:function(){for(var e=this,t=this.state,n=t.level,r=t.game,i=t.muncher,s=t.squares,a=t.score,c=t.lives,o=t.notification,u=[],l=0;l<c;l++)u.push(Object(m.jsx)("span",{className:"life"},l));return Object(m.jsxs)("div",{className:"full",children:[Object(m.jsxs)("div",{className:"info",children:[Object(m.jsx)("div",{className:"level",children:"Level: ".concat(n)}),Object(m.jsx)("div",{className:"title",children:"".concat(r.getGame()," of ").concat(r.getNumber())})]}),Object(m.jsx)(p,{height:5,width:6,muncher:i,squares:s,notification:o}),Object(m.jsxs)("div",{className:"info",children:[Object(m.jsxs)("div",{className:"score",children:[Object(m.jsx)("span",{children:"Score:"})," ",Object(m.jsx)("span",{className:"points",children:a})]}),Object(m.jsx)("div",{className:"lives",children:u})]}),Object(m.jsx)(f,{up:function(){return e.keyDown("ArrowUp")},down:function(){return e.keyDown("ArrowDown")},left:function(){return e.keyDown("ArrowLeft")},right:function(){return e.keyDown("ArrowRight")},space:function(){return e.keyDown("Space")}})]})}}]),n}(i.a.Component),g=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).state={selected:0},r.keyDown=r.keyDown.bind(Object(u.a)(r)),r}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("keydown",(function(t){e.keyDown(t.code)}))}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.keyDown)}},{key:"keyDown",value:function(e){switch(e){case"Enter":this.select();break;case"ArrowLeft":case"ArrowUp":this.select(-1);break;case"ArrowRight":case"ArrowDown":this.select(1)}}},{key:"select",value:function(e){var t=this.state.selected,n=this.props.options;if(void 0===e){var r=n[t];a.a.render(Object(m.jsx)(x,{game:r}),document.getElementById("root"))}else(t+=e)<0?t=n.length-1:t>=n.length&&(t=0),this.setState({selected:t})}},{key:"render",value:function(){var e=this,t=this.props,n=t.question,r=t.options,i=t.instructions,s=this.state.selected;return Object(m.jsxs)("div",{className:"all",children:[Object(m.jsxs)("div",{className:"menu",children:[Object(m.jsx)("div",{className:"text",children:n}),Object(m.jsx)(v,{options:r,selected:s}),Object(m.jsx)("div",{className:"text",children:i})]}),Object(m.jsx)(f,{up:function(){return e.keyDown("ArrowUp")},down:function(){return e.keyDown("ArrowDown")},left:function(){return e.keyDown("ArrowLeft")},right:function(){return e.keyDown("ArrowRight")},enter:function(){return e.keyDown("Enter")}})]})}}]),n}(i.a.Component),O=(n(22),function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;Object(c.a)(this,e),this.minNum=t,this.maxNum=n,this.minMult=1,this.maxMult=r,this.resetNumber()}return Object(o.a)(e,[{key:"resetNumber",value:function(){for(var e=this.number;e===this.number;)this.number=Math.floor(this.minNum+Math.random()*(this.maxNum-this.minNum+1))}},{key:"getGame",value:function(){return k}},{key:"getNumber",value:function(){return this.number}},{key:"getMultiple",value:function(){if(Math.random()>.4)return Math.floor(Math.random()*(this.maxMult*this.number));var e=Math.floor(this.minMult+Math.random()*(this.maxMult-this.minMult));return this.number*e}},{key:"isMultiple",value:function(e){return e%this.number===0}}]),e}()),N=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;Object(c.a)(this,e),this.minNum=t,this.maxNum=n,this.resetNumber()}return Object(o.a)(e,[{key:"resetNumber",value:function(){for(var e=this,t=this.number;t===this.number;)this.number=Math.floor(this.minNum+Math.random()*(this.maxNum-this.minNum+1));this.factors=Array.from(Array(this.number+1),(function(e,t){return t})).filter((function(t){return e.number%t===0}))}},{key:"getGame",value:function(){return w}},{key:"getNumber",value:function(){return this.number}},{key:"getFactor",value:function(){return Math.random()<.4?this.factors[Math.floor(Math.random()*this.factors.length)]:Math.floor(Math.random()*this.number)}},{key:"isFactor",value:function(e){return this.factors.includes(e)}}]),e}();a.a.render(Object(m.jsx)(g,{question:"Which Number Munchers game would you like to play",options:[new O,new N],instructions:"Use Arrows to move, then press Enter"}),document.getElementById("root"))}],[[23,1,2]]]);
//# sourceMappingURL=main.71d049bc.chunk.js.map
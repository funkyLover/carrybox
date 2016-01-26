/*! Zepto 1.1.6 (generated with Zepto Builder) - zepto touch event - zeptojs.com/license */
var Zepto=function(){function t(t){return null==t?String(t):X[J.call(t)]||"object"}function e(e){return"function"==t(e)}function n(t){return null!=t&&t==t.window}function i(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function r(e){return"object"==t(e)}function o(t){return r(t)&&!n(t)&&Object.getPrototypeOf(t)==Object.prototype}function s(t){return"number"==typeof t.length}function u(t){return A.call(t,function(t){return null!=t})}function a(t){return t.length>0?N.fn.concat.apply([],t):t}function c(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(t){return t in D?D[t]:D[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function f(t,e){return"number"!=typeof e||j[c(t)]?e:e+"px"}function h(t){var e,n;return $[t]||(e=Z.createElement(t),Z.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),$[t]=n),$[t]}function p(t){return"children"in t?L.call(t.children):N.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function d(t,e){var n,i=t?t.length:0;for(n=0;i>n;n++)this[n]=t[n];this.length=i,this.selector=e||""}function g(t,e,n){for(T in e)n&&(o(e[T])||Q(e[T]))?(o(e[T])&&!o(t[T])&&(t[T]={}),Q(e[T])&&!Q(t[T])&&(t[T]=[]),g(t[T],e[T],n)):e[T]!==x&&(t[T]=e[T])}function m(t,e){return null==e?N(t):N(t).filter(e)}function v(t,n,i,r){return e(n)?n.call(t,i,r):n}function y(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function w(t,e){var n=t.className||"",i=n&&n.baseVal!==x;return e===x?i?n.baseVal:n:void(i?n.baseVal=e:t.className=e)}function b(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?N.parseJSON(t):t):t}catch(e){return t}}function E(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)E(t.childNodes[n],e)}var x,T,N,P,C,S,O=[],M=O.concat,A=O.filter,L=O.slice,Z=window.document,$={},D={},j={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},k=/^\s*<(\w+|!)[^>]*>/,z=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,R=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,_=/^(?:body|html)$/i,I=/([A-Z])/g,V=["val","css","html","text","data","width","height","offset"],B=["after","prepend","before","append"],q=Z.createElement("table"),F=Z.createElement("tr"),U={tr:Z.createElement("tbody"),tbody:q,thead:q,tfoot:q,td:F,th:F,"*":Z.createElement("div")},Y=/complete|loaded|interactive/,H=/^[\w-]*$/,X={},J=X.toString,G={},W=Z.createElement("div"),K={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},Q=Array.isArray||function(t){return t instanceof Array};return G.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=W).appendChild(t),i=~G.qsa(r,e).indexOf(t),o&&W.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},S=function(t){return A.call(t,function(e,n){return t.indexOf(e)==n})},G.fragment=function(t,e,n){var i,r,s;return z.test(t)&&(i=N(Z.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(R,"<$1></$2>")),e===x&&(e=k.test(t)&&RegExp.$1),e in U||(e="*"),s=U[e],s.innerHTML=""+t,i=N.each(L.call(s.childNodes),function(){s.removeChild(this)})),o(n)&&(r=N(i),N.each(n,function(t,e){V.indexOf(t)>-1?r[t](e):r.attr(t,e)})),i},G.Z=function(t,e){return new d(t,e)},G.isZ=function(t){return t instanceof G.Z},G.init=function(t,n){var i;if(!t)return G.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&k.test(t))i=G.fragment(t,RegExp.$1,n),t=null;else{if(n!==x)return N(n).find(t);i=G.qsa(Z,t)}else{if(e(t))return N(Z).ready(t);if(G.isZ(t))return t;if(Q(t))i=u(t);else if(r(t))i=[t],t=null;else if(k.test(t))i=G.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==x)return N(n).find(t);i=G.qsa(Z,t)}}return G.Z(i,t)},N=function(t,e){return G.init(t,e)},N.extend=function(t){var e,n=L.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){g(t,n,e)}),t},G.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,s=H.test(o);return t.getElementById&&s&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:L.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},N.contains=Z.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},N.type=t,N.isFunction=e,N.isWindow=n,N.isArray=Q,N.isPlainObject=o,N.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},N.inArray=function(t,e,n){return O.indexOf.call(e,t,n)},N.camelCase=C,N.trim=function(t){return null==t?"":String.prototype.trim.call(t)},N.uuid=0,N.support={},N.expr={},N.noop=function(){},N.map=function(t,e){var n,i,r,o=[];if(s(t))for(i=0;i<t.length;i++)n=e(t[i],i),null!=n&&o.push(n);else for(r in t)n=e(t[r],r),null!=n&&o.push(n);return a(o)},N.each=function(t,e){var n,i;if(s(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},N.grep=function(t,e){return A.call(t,e)},window.JSON&&(N.parseJSON=JSON.parse),N.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){X["[object "+e+"]"]=e.toLowerCase()}),N.fn={constructor:G.Z,length:0,forEach:O.forEach,reduce:O.reduce,push:O.push,sort:O.sort,splice:O.splice,indexOf:O.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=G.isZ(e)?e.toArray():e;return M.apply(G.isZ(this)?this.toArray():this,n)},map:function(t){return N(N.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return N(L.apply(this,arguments))},ready:function(t){return Y.test(Z.readyState)&&Z.body?t(N):Z.addEventListener("DOMContentLoaded",function(){t(N)},!1),this},get:function(t){return t===x?L.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return O.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return e(t)?this.not(this.not(t)):N(A.call(this,function(e){return G.matches(e,t)}))},add:function(t,e){return N(S(this.concat(N(t,e))))},is:function(t){return this.length>0&&G.matches(this[0],t)},not:function(t){var n=[];if(e(t)&&t.call!==x)this.each(function(e){t.call(this,e)||n.push(this)});else{var i="string"==typeof t?this.filter(t):s(t)&&e(t.item)?L.call(t):N(t);this.forEach(function(t){i.indexOf(t)<0&&n.push(t)})}return N(n)},has:function(t){return this.filter(function(){return r(t)?N.contains(this,t):N(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!r(t)?t:N(t)},last:function(){var t=this[this.length-1];return t&&!r(t)?t:N(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?N(t).filter(function(){var t=this;return O.some.call(n,function(e){return N.contains(e,t)})}):1==this.length?N(G.qsa(this[0],t)):this.map(function(){return G.qsa(this,t)}):N()},closest:function(t,e){var n=this[0],r=!1;for("object"==typeof t&&(r=N(t));n&&!(r?r.indexOf(n)>=0:G.matches(n,t));)n=n!==e&&!i(n)&&n.parentNode;return N(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=N.map(n,function(t){return(t=t.parentNode)&&!i(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return m(e,t)},parent:function(t){return m(S(this.pluck("parentNode")),t)},children:function(t){return m(this.map(function(){return p(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||L.call(this.childNodes)})},siblings:function(t){return m(this.map(function(t,e){return A.call(p(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return N.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=h(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var n=e(t);if(this[0]&&!n)var i=N(t).get(0),r=i.parentNode||this.length>1;return this.each(function(e){N(this).wrapAll(n?t.call(this,e):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){N(this[0]).before(t=N(t));for(var e;(e=t.children()).length;)t=e.first();N(t).append(this)}return this},wrapInner:function(t){var n=e(t);return this.each(function(e){var i=N(this),r=i.contents(),o=n?t.call(this,e):t;r.length?r.wrapAll(o):i.append(o)})},unwrap:function(){return this.parent().each(function(){N(this).replaceWith(N(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var e=N(this);(t===x?"none"==e.css("display"):t)?e.show():e.hide()})},prev:function(t){return N(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return N(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;N(this).empty().append(v(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=v(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function(t,e){var n;return"string"!=typeof t||1 in arguments?this.each(function(n){if(1===this.nodeType)if(r(t))for(T in t)y(this,T,t[T]);else y(this,t,v(this,e,n,this.getAttribute(t)))}):this.length&&1===this[0].nodeType?!(n=this[0].getAttribute(t))&&t in this[0]?this[0][t]:n:x},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){y(this,t)},this)})},prop:function(t,e){return t=K[t]||t,1 in arguments?this.each(function(n){this[t]=v(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(t,e){var n="data-"+t.replace(I,"-$1").toLowerCase(),i=1 in arguments?this.attr(n,e):this.attr(n);return null!==i?b(i):x},val:function(t){return 0 in arguments?this.each(function(e){this.value=v(this,t,e,this.value)}):this[0]&&(this[0].multiple?N(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var n=N(this),i=v(this,t,e,n.offset()),r=n.offsetParent().offset(),o={top:i.top-r.top,left:i.left-r.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)});if(!this.length)return null;if(!N.contains(Z.documentElement,this[0]))return{top:0,left:0};var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(e,n){if(arguments.length<2){var i,r=this[0];if(!r)return;if(i=getComputedStyle(r,""),"string"==typeof e)return r.style[C(e)]||i.getPropertyValue(e);if(Q(e)){var o={};return N.each(e,function(t,e){o[e]=r.style[C(e)]||i.getPropertyValue(e)}),o}}var s="";if("string"==t(e))n||0===n?s=c(e)+":"+f(e,n):this.each(function(){this.style.removeProperty(c(e))});else for(T in e)e[T]||0===e[T]?s+=c(T)+":"+f(T,e[T])+";":this.each(function(){this.style.removeProperty(c(T))});return this.each(function(){this.style.cssText+=";"+s})},index:function(t){return t?this.indexOf(N(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?O.some.call(this,function(t){return this.test(w(t))},l(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){P=[];var n=w(this),i=v(this,t,e,n);i.split(/\s+/g).forEach(function(t){N(this).hasClass(t)||P.push(t)},this),P.length&&w(this,n+(n?" ":"")+P.join(" "))}}):this},removeClass:function(t){return this.each(function(e){if("className"in this){if(t===x)return w(this,"");P=w(this),v(this,t,e,P).split(/\s+/g).forEach(function(t){P=P.replace(l(t)," ")}),w(this,P.trim())}})},toggleClass:function(t,e){return t?this.each(function(n){var i=N(this),r=v(this,t,n,w(this));r.split(/\s+/g).forEach(function(t){(e===x?!i.hasClass(t):e)?i.addClass(t):i.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return t===x?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return t===x?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),i=_.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(N(t).css("margin-top"))||0,n.left-=parseFloat(N(t).css("margin-left"))||0,i.top+=parseFloat(N(e[0]).css("border-top-width"))||0,i.left+=parseFloat(N(e[0]).css("border-left-width"))||0,{top:n.top-i.top,left:n.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||Z.body;t&&!_.test(t.nodeName)&&"static"==N(t).css("position");)t=t.offsetParent;return t})}},N.fn.detach=N.fn.remove,["width","height"].forEach(function(t){var e=t.replace(/./,function(t){return t[0].toUpperCase()});N.fn[t]=function(r){var o,s=this[0];return r===x?n(s)?s["inner"+e]:i(s)?s.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){s=N(this),s.css(t,v(this,r,e,s[t]()))})}}),B.forEach(function(e,n){var i=n%2;N.fn[e]=function(){var e,r,o=N.map(arguments,function(n){return e=t(n),"object"==e||"array"==e||null==n?n:G.fragment(n)}),s=this.length>1;return o.length<1?this:this.each(function(t,e){r=i?e:e.parentNode,e=0==n?e.nextSibling:1==n?e.firstChild:2==n?e:null;var u=N.contains(Z.documentElement,r);o.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!r)return N(t).remove();r.insertBefore(t,e),u&&E(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},N.fn[i?e+"To":"insert"+(n?"Before":"After")]=function(t){return N(t)[e](this),this}}),G.Z.prototype=d.prototype=N.fn,G.uniq=S,G.deserializeValue=b,N.zepto=G,N}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function e(t){return t._zid||(t._zid=h++)}function n(t,n,o,s){if(n=i(n),n.ns)var u=r(n.ns);return(m[e(t)]||[]).filter(function(t){return t&&(!n.e||t.e==n.e)&&(!n.ns||u.test(t.ns))&&(!o||e(t.fn)===e(o))&&(!s||t.sel==s)})}function i(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function r(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function o(t,e){return t.del&&!y&&t.e in w||!!e}function s(t){return b[t]||y&&w[t]||t}function u(n,r,u,a,l,h,p){var d=e(n),g=m[d]||(m[d]=[]);r.split(/\s/).forEach(function(e){if("ready"==e)return t(document).ready(u);var r=i(e);r.fn=u,r.sel=l,r.e in b&&(u=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?r.fn.apply(this,arguments):void 0}),r.del=h;var d=h||u;r.proxy=function(t){if(t=c(t),!t.isImmediatePropagationStopped()){t.data=a;var e=d.apply(n,t._args==f?[t]:[t].concat(t._args));return e===!1&&(t.preventDefault(),t.stopPropagation()),e}},r.i=g.length,g.push(r),"addEventListener"in n&&n.addEventListener(s(r.e),r.proxy,o(r,p))})}function a(t,i,r,u,a){var c=e(t);(i||"").split(/\s/).forEach(function(e){n(t,e,r,u).forEach(function(e){delete m[c][e.i],"removeEventListener"in t&&t.removeEventListener(s(e.e),e.proxy,o(e,a))})})}function c(e,n){return(n||!e.isDefaultPrevented)&&(n||(n=e),t.each(N,function(t,i){var r=n[t];e[t]=function(){return this[i]=E,r&&r.apply(n,arguments)},e[i]=x}),(n.defaultPrevented!==f?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(e.isDefaultPrevented=E)),e}function l(t){var e,n={originalEvent:t};for(e in t)T.test(e)||t[e]===f||(n[e]=t[e]);return c(n,t)}var f,h=1,p=Array.prototype.slice,d=t.isFunction,g=function(t){return"string"==typeof t},m={},v={},y="onfocusin"in window,w={focus:"focusin",blur:"focusout"},b={mouseenter:"mouseover",mouseleave:"mouseout"};v.click=v.mousedown=v.mouseup=v.mousemove="MouseEvents",t.event={add:u,remove:a},t.proxy=function(n,i){var r=2 in arguments&&p.call(arguments,2);if(d(n)){var o=function(){return n.apply(i,r?r.concat(p.call(arguments)):arguments)};return o._zid=e(n),o}if(g(i))return r?(r.unshift(n[i],n),t.proxy.apply(null,r)):t.proxy(n[i],n);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var E=function(){return!0},x=function(){return!1},T=/^([A-Z]|returnValue$|layer[XY]$)/,N={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,n,i,r,o){var s,c,h=this;return e&&!g(e)?(t.each(e,function(t,e){h.on(t,n,i,e,o)}),h):(g(n)||d(r)||r===!1||(r=i,i=n,n=f),(r===f||i===!1)&&(r=i,i=f),r===!1&&(r=x),h.each(function(f,h){o&&(s=function(t){return a(h,t.type,r),r.apply(this,arguments)}),n&&(c=function(e){var i,o=t(e.target).closest(n,h).get(0);return o&&o!==h?(i=t.extend(l(e),{currentTarget:o,liveFired:h}),(s||r).apply(o,[i].concat(p.call(arguments,1)))):void 0}),u(h,e,r,i,n,c||s)}))},t.fn.off=function(e,n,i){var r=this;return e&&!g(e)?(t.each(e,function(t,e){r.off(t,n,e)}),r):(g(n)||d(i)||i===!1||(i=n,n=f),i===!1&&(i=x),r.each(function(){a(this,e,i,n)}))},t.fn.trigger=function(e,n){return e=g(e)||t.isPlainObject(e)?t.Event(e):c(e),e._args=n,this.each(function(){e.type in w&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,i){var r,o;return this.each(function(s,u){r=l(g(e)?t.Event(e):e),r._args=i,r.target=u,t.each(n(u,e.type||e),function(t,e){return o=e.proxy(r),r.isImmediatePropagationStopped()?!1:void 0})}),o},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){g(t)||(e=t,t=e.type);var n=document.createEvent(v[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),c(n)}}(Zepto),function(t){function e(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function n(){l=null,h.last&&(h.el.trigger("longTap"),h={})}function i(){l&&clearTimeout(l),l=null}function r(){u&&clearTimeout(u),a&&clearTimeout(a),c&&clearTimeout(c),l&&clearTimeout(l),u=a=c=l=null,h={}}function o(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function s(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var u,a,c,l,f,h={},p=750;t(document).ready(function(){var d,g,m,v,y=0,w=0;"MSGesture"in window&&(f=new MSGesture,f.target=document.body),t(document).bind("MSGestureEnd",function(t){var e=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;e&&(h.el.trigger("swipe"),h.el.trigger("swipe"+e))}).on("touchstart MSPointerDown pointerdown",function(e){(!(v=s(e,"down"))||o(e))&&(m=v?e:e.touches[0],e.touches&&1===e.touches.length&&h.x2&&(h.x2=void 0,h.y2=void 0),d=Date.now(),g=d-(h.last||d),h.el=t("tagName"in m.target?m.target:m.target.parentNode),u&&clearTimeout(u),h.x1=m.pageX,h.y1=m.pageY,g>0&&250>=g&&(h.isDoubleTap=!0),h.last=d,l=setTimeout(n,p),f&&v&&f.addPointer(e.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(v=s(t,"move"))||o(t))&&(m=v?t:t.touches[0],i(),h.x2=m.pageX,h.y2=m.pageY,y+=Math.abs(h.x1-h.x2),w+=Math.abs(h.y1-h.y2))}).on("touchend MSPointerUp pointerup",function(n){(!(v=s(n,"up"))||o(n))&&(i(),h.x2&&Math.abs(h.x1-h.x2)>30||h.y2&&Math.abs(h.y1-h.y2)>30?c=setTimeout(function(){h.el.trigger("swipe"),h.el.trigger("swipe"+e(h.x1,h.x2,h.y1,h.y2)),h={}},0):"last"in h&&(30>y&&30>w?a=setTimeout(function(){var e=t.Event("tap");e.cancelTouch=r,h.el.trigger(e),h.isDoubleTap?(h.el&&h.el.trigger("doubleTap"),h={}):u=setTimeout(function(){u=null,h.el&&h.el.trigger("singleTap"),h={}},250)},0):h={}),y=w=0)}).on("touchcancel MSPointerCancel pointercancel",r),t(window).on("scroll",r)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(Zepto);
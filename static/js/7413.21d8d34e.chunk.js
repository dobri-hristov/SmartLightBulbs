"use strict";(self.webpackChunksmart_light_bulbs=self.webpackChunksmart_light_bulbs||[]).push([[7413],{9965:function(n,t,e){e.d(t,{A:function(){return a}});var r=e(3433),i=e(8427),a=function(n,t){var e=new Map,i=n,a=function(n,t){Array.isArray(n)?(0,r.Z)(n).forEach((function(n){t[n]=i[n]})):t[n]=Object.assign({},i)},u=function(n,t){return e.has(n)||(e.set(n,t),a(t,n)),function(){e.has(n)&&e.delete(n)}};return{Provider:function(n,t){var r=n.state;return i=r,e.forEach(a),t},Consumer:function(n,e){return t(u,e[0])},injectProps:function(n,t){var r=n.prototype,i=r.connectedCallback,a=r.disconnectedCallback;r.connectedCallback=function(){if(u(this,t),i)return i.call(this)},r.disconnectedCallback=function(){e.delete(this),a&&a.call(this)}}}}({historyType:"browser",location:{pathname:"",query:{},key:""},titleSuffix:"",root:"/",routeViewsUpdated:function(){}},(function(n,t){return(0,i.h)("context-consumer",{subscribe:n,renderer:t})}))},8363:function(n,t,e){e.d(t,{a:function(){return j},b:function(){return S},c:function(){return I},d:function(){return v},e:function(){return g},f:function(){return E},g:function(){return x},h:function(){return p},i:function(){return d},j:function(){return y},k:function(){return C},l:function(){return M},m:function(){return _},n:function(){return U},o:function(){return m},p:function(){return k},q:function(){return $},s:function(){return q}});var r=e(4506),i=e(9439),a=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g"),u=function(n){return n.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")},c=function(n){return n.replace(/([=!:$/()])/g,"\\$1")},o=function(n){return n&&n.sensitive?"":"i"},s=function(n,t,e){for(var r=[],i=0;i<n.length;i++)r.push(l(n[i],t,e).source);return new RegExp("(?:"+r.join("|")+")",o(e))},f=function(n,t,e){return h(function(n,t){for(var e,r=[],i=0,o=0,s="",f=t&&t.delimiter||"/",h=t&&t.delimiters||"./",l=!1;null!==(e=a.exec(n));){var p=e[0],d=e[1],v=e.index;if(s+=n.slice(o,v),o=v+p.length,d)s+=d[1],l=!0;else{var g="",m=n[o],y=e[2],b=e[3],x=e[4],A=e[5];if(!l&&s.length){var O=s.length-1;h.indexOf(s[O])>-1&&(g=s[O],s=s.slice(0,O))}s&&(r.push(s),s="",l=!1);var k=""!==g&&void 0!==m&&m!==g,E="+"===A||"*"===A,w="?"===A||"*"===A,R=g||f,_=b||x;r.push({name:y||i++,prefix:g,delimiter:R,optional:w,repeat:E,partial:k,pattern:_?c(_):"[^"+u(R)+"]+?"})}}return(s||o<n.length)&&r.push(s+n.substr(o)),r}(n,e),t,e)},h=function(n,t,e){for(var r=(e=e||{}).strict,i=!1!==e.end,a=u(e.delimiter||"/"),c=e.delimiters||"./",s=[].concat(e.endsWith||[]).map(u).concat("$").join("|"),f="",h=!1,l=0;l<n.length;l++){var p=n[l];if("string"===typeof p)f+=u(p),h=l===n.length-1&&c.indexOf(p[p.length-1])>-1;else{var d=u(p.prefix||""),v=p.repeat?"(?:"+p.pattern+")(?:"+d+"(?:"+p.pattern+"))*":p.pattern;t&&t.push(p),p.optional?p.partial?f+=d+"("+v+")?":f+="(?:"+d+"("+v+"))?":f+=d+"("+v+")"}}return i?(r||(f+="(?:"+a+")?"),f+="$"===s?"$":"(?="+s+")"):(r||(f+="(?:"+a+"(?="+s+"))?"),h||(f+="(?="+a+"|"+s+")")),new RegExp("^"+f,o(e))},l=function(n,t,e){return n instanceof RegExp?function(n,t){if(!t)return n;var e=n.source.match(/\((?!\?)/g);if(e)for(var r=0;r<e.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return n}(n,t):Array.isArray(n)?s(n,t,e):f(n,t,e)},p=function(n,t){return new RegExp("^"+t+"(\\/|\\?|#|$)","i").test(n)},d=function(n,t){return p(n,t)?n.substr(t.length):n},v=function(n){return"/"===n.charAt(n.length-1)?n.slice(0,-1):n},g=function(n){return"/"===n.charAt(0)?n:"/"+n},m=function(n){return"/"===n.charAt(0)?n.substr(1):n},y=function(n){var t=n.pathname,e=n.search,r=n.hash,i=t||"/";return e&&"?"!==e&&(i+="?"===e.charAt(0)?e:"?".concat(e)),r&&"#"!==r&&(i+="#"===r.charAt(0)?r:"#".concat(r)),i},b=function(n){return"/"===n.charAt(0)},x=function(n){return Math.random().toString(36).substr(2,n)},A=function(n,t){for(var e=t,r=e+1,i=n.length;r<i;e+=1,r+=1)n[e]=n[r];n.pop()},O=function n(t,e){if(t===e)return!0;if(null==t||null==e)return!1;if(Array.isArray(t))return Array.isArray(e)&&t.length===e.length&&t.every((function(t,r){return n(t,e[r])}));var r=typeof t;if(r!==typeof e)return!1;if("object"===r){var i=t.valueOf(),a=e.valueOf();if(i!==t||a!==e)return n(i,a);var u=Object.keys(t),c=Object.keys(e);return u.length===c.length&&u.every((function(r){return n(t[r],e[r])}))}return!1},k=function(n,t){return n.pathname===t.pathname&&n.search===t.search&&n.hash===t.hash&&n.key===t.key&&O(n.state,t.state)},E=function(n,t,e,r){var a,u;"string"===typeof n?(a=function(n){var t=n||"/",e="",r="",i=t.indexOf("#");-1!==i&&(r=t.substr(i),t=t.substr(0,i));var a=t.indexOf("?");return-1!==a&&(e=t.substr(a),t=t.substr(0,a)),{pathname:t,search:"?"===e?"":e,hash:"#"===r?"":r,query:{},key:""}}(n),void 0!==t&&(a.state=t)):((a=Object.assign({pathname:""},n)).search&&"?"!==a.search.charAt(0)&&(a.search="?"+a.search),a.hash&&"#"!==a.hash.charAt(0)&&(a.hash="#"+a.hash),void 0!==t&&void 0===a.state&&(a.state=t));try{a.pathname=decodeURI(a.pathname)}catch(c){throw c instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):c}return a.key=e,r?a.pathname?"/"!==a.pathname.charAt(0)&&(a.pathname=function(n){var t,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=e&&e.split("/")||[],i=0,a=n&&n.split("/")||[],u=n&&b(n),c=e&&b(e),o=u||c;if(n&&b(n)?r=a:a.length&&(r.pop(),r=r.concat(a)),!r.length)return"/";if(r.length){var s=r[r.length-1];t="."===s||".."===s||""===s}else t=!1;for(var f=r.length;f>=0;f--){var h=r[f];"."===h?A(r,f):".."===h?(A(r,f),i++):i&&(A(r,f),i--)}if(!o)for(;i--;i)r.unshift("..");!o||""===r[0]||r[0]&&b(r[0])||r.unshift("");var l=r.join("/");return t&&"/"!==l.substr(-1)&&(l+="/"),l}(a.pathname,r.pathname)):a.pathname=r.pathname:a.pathname||(a.pathname="/"),a.query=(u=a.search||"")?(/^[?#]/.test(u)?u.slice(1):u).split("&").reduce((function(n,t){var e=t.split("="),r=(0,i.Z)(e,2),a=r[0],u=r[1];return n[a]=u?decodeURIComponent(u.replace(/\+/g," ")):"",n}),{}):{},a},w=0,R={},_=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"string"===typeof t&&(t={path:t});var e=t,i=e.path,a=void 0===i?"/":i,u=e.exact,c=void 0!==u&&u,o=e.strict,s=function(n,t){var e="".concat(t.end).concat(t.strict),r=R[e]||(R[e]={}),i=JSON.stringify(n);if(r[i])return r[i];var a=[],u={re:l(n,a,t),keys:a};return w<1e4&&(r[i]=u,w+=1),u}(a,{end:c,strict:void 0!==o&&o}),f=s.re,h=s.keys,p=f.exec(n);if(!p)return null;var d=(0,r.Z)(p),v=d[0],g=d.slice(1),m=n===v;return c&&!m?null:{path:a,url:"/"===a&&""===v?"/":v,isExact:m,params:h.reduce((function(n,t,e){return n[t.name]=g[e],n}),{})}},j=function(n,t){return null==n&&null==t||null!=t&&(n&&t&&n.path===t.path&&n.url===t.url&&O(n.params,t.params))},C=function(n,t,e){return e(n.confirm(t))},$=function(n){return n.metaKey||n.altKey||n.ctrlKey||n.shiftKey},S=function(n){var t=n.navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&(n.history&&"pushState"in n.history)},I=function(n){return-1===n.userAgent.indexOf("Trident")},U=function(n){return-1===n.userAgent.indexOf("Firefox")},M=function(n,t){return void 0===t.state&&-1===n.userAgent.indexOf("CriOS")},q=function(n,t){var e=n[t],r="__storage_test__";try{return e.setItem(r,r),e.removeItem(r),!0}catch(i){return i instanceof DOMException&&(22===i.code||1014===i.code||"QuotaExceededError"===i.name||"NS_ERROR_DOM_QUOTA_REACHED"===i.name)&&0!==e.length}}}}]);
//# sourceMappingURL=7413.21d8d34e.chunk.js.map
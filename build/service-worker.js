"use strict";var precacheConfig=[["/index.html","65bd91165489f00d32ea21be81ffda11"],["/static/css/main.5d7990d3.css","032718122fbc5da0f6db504b7a1330e7"],["/static/js/about.d8d90dbc.chunk.js","3fcc3a7ef954418d37d6d53c62f4f0b0"],["/static/js/dashboard.3aaadf99.chunk.js","ec226f2029c59f0ed31cc9628073c3bd"],["/static/js/homepage.38134479.chunk.js","209e14193a9079d394ff049f1cd5e36f"],["/static/js/login.bd8ea3a2.chunk.js","2a984f95c825e9a33174b85fd78384ea"],["/static/js/logout.ceae1c62.chunk.js","a4b9411f43a28c6482599057424fa412"],["/static/js/main.0d05b72c.js","b2b51da74e1d18de8cf19b9733d1e142"],["/static/js/profile.8353661b.chunk.js","a9313866e3d82c5655498a941fde7cf5"],["/static/media/PTSerif-Bold.107beb4d.svg","107beb4da75b54b8b29d48a2bfc0f1ac"],["/static/media/PTSerif-Bold.4b61d02c.ttf","4b61d02c1a6ed6956666ffb0fed35eca"],["/static/media/PTSerif-Bold.6d521ef7.eot","6d521ef7c2aa4896091800a1d90579b1"],["/static/media/PTSerif-Bold.9df9103f.woff","9df9103f1af0da349bd36e95ddde5fa4"],["/static/media/PTSerif-Regular.804900e3.eot","804900e3ff90cfe245f5585473ee6bfd"],["/static/media/PTSerif-Regular.8e1d167f.woff","8e1d167f68df46fdd2962fae8efe6558"],["/static/media/PTSerif-Regular.9417fa4c.svg","9417fa4cf0a689319f0ebbc9cd26e87d"],["/static/media/PTSerif-Regular.ae585d91.ttf","ae585d91ff895849f607a9bfbd439c6f"],["/static/media/SourceSansPro-Regular.48dcd95a.woff","48dcd95a9b8071de5309bb992da82da1"],["/static/media/SourceSansPro-Regular.5182da42.ttf","5182da425f811908bed9f5b8c72fa44f"],["/static/media/SourceSansPro-Regular.569a0330.eot","569a033050e4e6786b86cef0cad67e4d"],["/static/media/SourceSansPro-Regular.c9a2231d.svg","c9a2231d2013aa9eeb57238fcf770ae5"],["/static/media/SourceSansPro-SemiBold.774c05cc.ttf","774c05ccae92d11b95a2ef722c9566a8"],["/static/media/SourceSansPro-SemiBold.d481a151.woff","d481a151e2ba3cf93cb90285fcc600d0"],["/static/media/SourceSansPro-SemiBold.d4aec154.svg","d4aec154b9842312cf07bf16201595d0"],["/static/media/SourceSansPro-SemiBold.e4a59df9.eot","e4a59df99a240accbfbb0fc09759ebd6"],["/static/media/arvidsson.4d6f8e0d.jpg","4d6f8e0da24447e09749bc12d046498c"],["/static/media/background.db779bca.png","db779bca4f7f983602cada782da80c92"],["/static/media/icon_chevron_up.745f6296.svg","745f62960098481b703fa2e5f6acc50f"],["/static/media/logo.8caa15b8.jpg","8caa15b8a896d9bc438e4bf38fae208d"],["/static/media/logo_yukstay.105d0386.svg","105d038605b3d5f16e668559a300d91e"],["/static/media/pekka.1eab475c.jpg","1eab475cc3905841c08c997252f77dde"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var r=new URL(e);return c&&r.pathname.match(c)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),r=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var r="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});
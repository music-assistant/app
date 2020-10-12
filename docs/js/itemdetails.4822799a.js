(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["itemdetails"],{"32a2":function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",[i("InfoHeader",{attrs:{itemDetails:t.itemDetails}}),i("v-tabs",{attrs:{dark:"","show-arrows":"",grow:"","hide-slider":"","background-color":"rgba(0,0,0,.45)"},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}},[t._l(t.tabs,(function(e){return i("v-tab",{key:e.label},[t._v(" "+t._s(t.$t(e.label)))])})),t._l(t.tabs,(function(t){return i("v-tab-item",{key:t.label},[i("ItemsListing",{attrs:{endpoint:t.endpoint}})],1)}))],2)],1)},a=[],s=(i("b0c0"),i("96cf"),i("1da1")),n=i("0dac"),o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-flex",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:t.visibilityChanged,expression:"visibilityChanged"}]},[r("v-card",{staticClass:"white--text",staticStyle:{"margin-top":"-60px"},attrs:{tile:"",color:"black",img:i("abd2"),height:"290"}},[r("v-img",{staticClass:"white--text",attrs:{width:"100%",height:"360",position:"center top",src:t.$server.getImageUrl(t.itemDetails,"fanart"),gradient:"to bottom, rgba(0,0,0,.90), rgba(0,0,0,.75)"}},[r("div",{staticClass:"text-xs-center",staticStyle:{height:"40px"},attrs:{id:"whitespace_top"}}),t.itemDetails?r("v-layout",{staticStyle:{"margin-left":"5pxmargin-right:5px"}},[t.$store.isMobile?t._e():r("v-flex",{attrs:{xs5:"","pa-5":""}},[r("v-img",{staticStyle:{border:"4px solid rgba(0,0,0,.33)","border-radius":"6px"},attrs:{src:t.$server.getImageUrl(t.itemDetails),"lazy-src":i("4bfb"),width:"220px",height:"220px"}})],1),r("v-flex",[r("v-card-title",{staticStyle:{"text-shadow":"1px 1px #000000"}},[t._v(" "+t._s(t.itemDetails.name)+" ")]),r("v-card-subtitle",[t.itemDetails.version?r("div",{staticClass:"caption",staticStyle:{color:"white"}},[t._v(" "+t._s(t.itemDetails.version)+" ")]):t._e(),t.itemDetails.artists?r("div",{staticClass:"title",staticStyle:{"text-shadow":"1px 1px #000000"}},[r("v-icon",{staticStyle:{"margin-left":"-3px","margin-right":"3px"},attrs:{color:"#cccccc",small:""}},[t._v("person")]),t._l(t.itemDetails.artists,(function(e,i){return r("span",{key:e.db_id},[r("a",{staticStyle:{color:"primary"},on:{click:function(i){return t.artistClick(e)}}},[t._v(t._s(e.name))]),i+1<t.itemDetails.artists.length?r("span",{key:i,staticStyle:{color:"#cccccc"}},[t._v(t._s(" / "))]):t._e()])}))],2):t._e(),t.itemDetails.artist?r("div",{staticClass:"title"},[r("v-icon",{staticStyle:{"margin-left":"-3px","margin-right":"3px"},attrs:{color:"#cccccc",small:""}},[t._v("person")]),r("a",{staticStyle:{color:"primary"},on:{click:function(e){return t.artistClick(t.itemDetails.artist)}}},[t._v(t._s(t.itemDetails.artist.name))])],1):t._e(),t.itemDetails.owner?r("div",{staticClass:"title",staticStyle:{"text-shadow":"1px 1px #000000"}},[r("v-icon",{staticStyle:{"margin-left":"-3px","margin-right":"3px"},attrs:{color:"#cccccc",small:""}},[t._v("person")]),r("a",{staticStyle:{color:"primary"}},[t._v(t._s(t.itemDetails.owner))])],1):t._e(),t.itemDetails.album?r("div",{staticStyle:{color:"#ffffff","text-shadow":"1px 1px #000000"}},[r("v-icon",{staticStyle:{"margin-left":"-3px","margin-right":"3px"},attrs:{color:"#cccccc",small:""}},[t._v("album")]),r("a",{staticStyle:{color:"#ffffff"},on:{click:function(e){return t.albumClick(t.itemDetails.album)}}},[t._v(t._s(t.itemDetails.album.name))])],1):t._e()]),r("div",{staticStyle:{"margin-left":"14px"}},[r("v-btn",{attrs:{color:"primary",tile:""},on:{click:function(e){return t.$server.$emit("showPlayMenu",t.itemDetails)}}},[r("v-icon",{attrs:{left:"",dark:""}},[t._v("play_circle_filled")]),t._v(" "+t._s(t.$t("play"))+" ")],1),!t.$store.isMobile&&t.itemDetails.in_library&&0==t.itemDetails.in_library.length?r("v-btn",{staticStyle:{"margin-left":"10px"},attrs:{color:"primary",tile:""},on:{click:function(e){return t.toggleLibrary(t.itemDetails)}}},[r("v-icon",{attrs:{left:"",dark:""}},[t._v("favorite_border")]),t._v(" "+t._s(t.$t("add_library"))+" ")],1):t._e(),!t.$store.isMobile&&t.itemDetails.in_library&&t.itemDetails.in_library.length>0?r("v-btn",{staticStyle:{"margin-left":"10px"},attrs:{color:"primary",tile:""},on:{click:function(e){return t.toggleLibrary(t.itemDetails)}}},[r("v-icon",{attrs:{left:"",dark:""}},[t._v("favorite")]),t._v(" "+t._s(t.$t("remove_library"))+" ")],1):t._e()],1),r("v-card-subtitle",{staticClass:"body-2"},[r("div",{staticClass:"justify-left",staticStyle:{"text-shadow":"1px 1px #000000"}},[r("ReadMore",{attrs:{text:t.getDescription(),"max-chars":t.$store.isMobile?140:260}})],1)])],1),r("div",{staticStyle:{"margin-top":"15px"}},[r("ProviderIcons",{attrs:{providerIds:t.itemDetails.provider_ids,height:25}})],1)],1):t._e()],1)],1)],1)},l=[],c=(i("a4d3"),i("e01a"),i("4160"),i("caad"),i("fb6a"),i("159b"),i("b85c")),d=i("2b0e"),u=i("e00a"),v=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("a",{staticStyle:{color:"white"},domProps:{innerHTML:t._s(t.formattedString)},on:{click:function(e){return t.triggerReadMore(e,!0)}}}),i("v-dialog",{attrs:{width:"80%"},model:{value:t.isReadMore,callback:function(e){t.isReadMore=e},expression:"isReadMore"}},[i("v-card",[i("v-card-text",{staticClass:"subheading",domProps:{innerHTML:t._s("<br>"+t.text)}})],1)],1)],1)},p=[],f=(i("a9e3"),i("9911"),d["a"].extend({props:{lessStr:{type:String,default:""},text:{type:String,required:!0},link:{type:String,default:"#"},maxChars:{type:Number,default:100}},data:function(){return{isReadMore:!1}},computed:{formattedString:function(){var t=this.text;return this.text.length>this.maxChars&&(t=t.substring(0,this.maxChars)+"..."),t}},mounted:function(){},methods:{triggerReadMore:function(t,e){"#"===this.link&&t.preventDefault(),null===this.lessStr&&""===this.lessStr||(this.isReadMore=e)}}})),m=f,h=i("2877"),b=i("6544"),y=i.n(b),g=i("b0af"),_=i("99d9"),x=i("169a"),k=Object(h["a"])(m,v,p,!1,null,null,null),D=k.exports;y()(k,{VCard:g["a"],VCardText:_["c"],VDialog:x["a"]});var S=i("85fe");d["a"].use(S["a"]);var w=d["a"].extend({components:{ProviderIcons:u["a"],ReadMore:D},props:["itemDetails"],data:function(){return{}},mounted:function(){},created:function(){this.$store.topBarTransparent=!0},beforeDestroy:function(){this.$store.topBarTransparent=!1,this.$store.topBarContextItem=null},watch:{itemDetails:function(t){t&&(this.$store.topBarContextItem=t)}},methods:{visibilityChanged:function(t,e){this.$store.topBarTransparent=!!t},artistClick:function(t){var e="/artists/"+t.item_id;this.$router.push({path:e,query:{provider:t.provider}})},albumClick:function(t){var e="/albums/"+t.item_id;this.$router.push({path:e,query:{provider:t.provider}})},toggleLibrary:function(t){this.$server.toggleLibrary(t)},getDescription:function(){var t="";return this.itemDetails?this.itemDetails.metadata&&this.itemDetails.metadata.description?this.itemDetails.metadata.description:this.itemDetails.metadata&&this.itemDetails.metadata.biography?this.itemDetails.metadata.biography:this.itemDetails.metadata&&this.itemDetails.metadata.copyright?this.itemDetails.metadata.copyright:(this.itemDetails.artists&&this.itemDetails.artists.forEach((function(e){e.metadata&&e.metadata.biography&&(t=e.metadata.biography)})),t):""},getQualityInfo:function(){},getUniqueProviders:function(){var t=[],e=[];if(!this.providerIds)return[];var i=this.providerIds.slice();i.sort((function(t,e){return t.quality<e.quality?1:e.quality<t.quality?-1:0}));var r,a=Object(c["a"])(i);try{for(a.s();!(r=a.n()).done;){var s=r.value;t.includes(s.provider)||(e.push(s),t.push(s.provider))}}catch(n){a.e(n)}finally{a.f()}return e}}}),$=w,C=i("8336"),I=i("0e8f"),T=i("132d"),O=i("adda"),V=i("a722"),M=Object(h["a"])($,o,l,!1,null,null,null),R=M.exports;y()(M,{VBtn:C["a"],VCard:g["a"],VCardSubtitle:_["b"],VCardTitle:_["d"],VFlex:I["a"],VIcon:T["a"],VImg:O["a"],VLayout:V["a"]});var j={components:{ItemsListing:n["a"],InfoHeader:R},props:{media_id:String,provider:String,media_type:String},data:function(){return{itemDetails:{},activeTab:0,tabs:[]}},created:function(){"artists"===this.media_type?this.tabs=[{label:"artist_toptracks",endpoint:"artists/"+this.media_id+"/toptracks?provider="+this.provider},{label:"artist_albums",endpoint:"artists/"+this.media_id+"/albums?provider="+this.provider}]:"albums"===this.media_type?this.tabs=[{label:"album_tracks",endpoint:"albums/"+this.media_id+"/tracks?provider="+this.provider},{label:"album_versions",endpoint:"albums/"+this.media_id+"/versions?provider="+this.provider}]:"tracks"===this.media_type?this.tabs=[{label:"track_versions",endpoint:"tracks/"+this.media_id+"/versions?provider="+this.provider}]:"playlists"===this.media_type&&(this.tabs=[{label:"playlist_tracks",endpoint:"playlists/"+this.media_id+"/tracks?provider="+this.provider}]),this.$server.connected&&this.getItemDetails(),this.$server.$on("connected",this.getItemDetails),this.$server.$on("refresh_listing",this.getItemDetails)},methods:{getItemDetails:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.loading=!0,i=t.media_type+"/"+t.media_id,e.next=4,t.$server.getData(i,{provider:t.provider});case 4:r=e.sent,t.itemDetails=r,t.$store.windowtitle=r.name,t.$store.loading=!1;case 8:case"end":return e.stop()}}),e)})))()}}},L=j,q=(i("ceab"),i("71a3")),P=i("c671"),A=i("fe57"),B=Object(h["a"])(L,r,a,!1,null,"4ec08e54",null);e["default"]=B.exports;y()(B,{VTab:q["a"],VTabItem:P["a"],VTabs:A["a"]})},"4b32":function(t,e,i){},"85fe":function(t,e,i){"use strict";(function(t){function i(t){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,i){return e&&a(t.prototype,e),i&&a(t,i),t}function n(t){return o(t)||l(t)||c()}function o(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}function l(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(t){var e;return e="function"===typeof t?{callback:t}:t,e}function u(t,e){var i,r,a,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=function(o){for(var l=arguments.length,c=new Array(l>1?l-1:0),d=1;d<l;d++)c[d-1]=arguments[d];if(a=c,!i||o!==r){var u=s.leading;"function"===typeof u&&(u=u(o,r)),i&&o===r||!u||t.apply(void 0,[o].concat(n(a))),r=o,clearTimeout(i),i=setTimeout((function(){t.apply(void 0,[o].concat(n(a))),i=0}),e)}};return o._clear=function(){clearTimeout(i),i=null},o}function v(t,e){if(t===e)return!0;if("object"===i(t)){for(var r in t)if(!v(t[r],e[r]))return!1;return!0}return!1}var p=function(){function t(e,i,a){r(this,t),this.el=e,this.observer=null,this.frozen=!1,this.createObserver(i,a)}return s(t,[{key:"createObserver",value:function(t,e){var i=this;if(this.observer&&this.destroyObserver(),!this.frozen){if(this.options=d(t),this.callback=function(t,e){i.options.callback(t,e),t&&i.options.once&&(i.frozen=!0,i.destroyObserver())},this.callback&&this.options.throttle){var r=this.options.throttleOptions||{},a=r.leading;this.callback=u(this.callback,this.options.throttle,{leading:function(t){return"both"===a||"visible"===a&&t||"hidden"===a&&!t}})}this.oldResult=void 0,this.observer=new IntersectionObserver((function(t){var e=t[0];if(t.length>1){var r=t.find((function(t){return t.isIntersecting}));r&&(e=r)}if(i.callback){var a=e.isIntersecting&&e.intersectionRatio>=i.threshold;if(a===i.oldResult)return;i.oldResult=a,i.callback(a,e)}}),this.options.intersection),e.context.$nextTick((function(){i.observer&&i.observer.observe(i.el)}))}}},{key:"destroyObserver",value:function(){this.observer&&(this.observer.disconnect(),this.observer=null),this.callback&&this.callback._clear&&(this.callback._clear(),this.callback=null)}},{key:"threshold",get:function(){return this.options.intersection&&this.options.intersection.threshold||0}}]),t}();function f(t,e,i){var r=e.value;if(r)if("undefined"===typeof IntersectionObserver);else{var a=new p(t,r,i);t._vue_visibilityState=a}}function m(t,e,i){var r=e.value,a=e.oldValue;if(!v(r,a)){var s=t._vue_visibilityState;r?s?s.createObserver(r,i):f(t,{value:r},i):h(t)}}function h(t){var e=t._vue_visibilityState;e&&(e.destroyObserver(),delete t._vue_visibilityState)}var b={bind:f,update:m,unbind:h};function y(t){t.directive("observe-visibility",b)}var g={version:"0.4.6",install:y},_=null;"undefined"!==typeof window?_=window.Vue:"undefined"!==typeof t&&(_=t.Vue),_&&_.use(g),e["a"]=g}).call(this,i("c8ba"))},abd2:function(t,e,i){t.exports=i.p+"img/info_gradient.4db55f47.jpg"},ceab:function(t,e,i){"use strict";var r=i("4b32"),a=i.n(r);a.a}}]);
//# sourceMappingURL=itemdetails.4822799a.js.map
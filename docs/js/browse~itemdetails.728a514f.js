(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["browse~itemdetails"],{"0dac":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",[i("v-app-bar",{attrs:{flat:"",dense:"",color:"transparent"}},[i("v-label",[t._v(t._s(t.items.length+" "+t.$t("items")))]),i("v-spacer"),i("v-menu",{attrs:{left:"","close-on-content-click":!1},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[i("v-btn",t._g({attrs:{icon:""}},n),[i("v-icon",[t._v("sort")])],1)]}}])},[i("v-list",t._l(t.sortKeys,(function(e){return i("v-list-item",{key:e.value,domProps:{textContent:t._s(e.text)},on:{click:function(i){t.sortBy=e.value}}})})),1)],1),i("v-btn",{attrs:{icon:""},on:{click:function(e){t.sortDesc=!t.sortDesc}}},[t.sortDesc?t._e():i("v-icon",[t._v("arrow_upward")]),t.sortDesc?i("v-icon",[t._v("arrow_downward")]):t._e()],1),i("v-menu",{attrs:{left:"","close-on-content-click":!1},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[i("v-btn",t._g({attrs:{icon:""}},n),[i("v-icon",[t._v("search")])],1)]}}])},[i("v-card",[i("v-text-field",{attrs:{clearable:"","prepend-inner-icon":"search",label:"Search","hide-details":"",solo:"",dense:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),i("v-btn",{staticStyle:{"margin-right":"-15px"},attrs:{icon:""},on:{click:function(e){return t.toggleViewMode()}}},["panel"==t.viewMode?i("v-icon",[t._v("view_list")]):t._e(),"list"==t.viewMode?i("v-icon",[t._v("grid_on")]):t._e()],1)],1),i("v-data-iterator",{attrs:{items:t.items,search:t.search,"sort-by":t.sortBy,"sort-desc":t.sortDesc,"custom-filter":t.filteredItems,"hide-default-footer":"","disable-pagination":"",loading:""},scopedSlots:t._u([{key:"default",fn:function(e){return["panel"==t.viewMode?i("v-container",{attrs:{fluid:""}},[i("v-row",{attrs:{dense:"","align-content":"stretch",align:"stretch"}},t._l(e.items,(function(e){return i("v-col",{key:e.item_id,attrs:{"align-self":"stretch"}},[i("PanelviewItem",{attrs:{item:e,thumbWidth:t.thumbWidth,thumbHeight:t.thumbHeight}})],1)})),1)],1):t._e(),"list"==t.viewMode?i("v-list",{attrs:{"two-line":""}},[i("RecycleScroller",{staticClass:"scroller",attrs:{items:e.items,"item-size":72,"key-field":"item_id","page-mode":""},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.item;return[i("ListviewItem",{attrs:{item:n,hideavatar:"track"==n.media_type&&t.$store.state.isMobile,hidetracknum:!0,hideproviders:!!["artist","album","track"].includes(n.media_type)&&t.$store.state.isMobile,hidelibrary:!0,hidemenu:"track"==n.media_type&&t.$store.state.isMobile,hideduration:"radio"==n.media_type}})]}}],null,!0)})],1):t._e()]}}])})],1)},s=[],a=(i("caad"),i("b0c0"),i("2532"),i("b85c")),r=i("d3cc"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{directives:[{name:"longpress",rawName:"v-longpress",value:t.menuClick,expression:"menuClick"}],attrs:{"min-height":t.thumbHeight,"min-width":t.thumbWidth,"max-width":1.4*t.thumbWidth,hover:"",outlined:""},on:{click:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:void(t.onclickHandler?t.onclickHandler(t.item):t.itemClicked(t.item))},contextmenu:[t.menuClick,function(t){t.preventDefault()}]}},[n("MediaItemThumb",{key:t.item.item_id,attrs:{item:t.item,size:t.thumbWidth}}),t.isHiRes?n("div",{staticStyle:{position:"absolute","margin-left":"5px","margin-top":"-20px",height:"30px","background-color":"white","border-radius":"3px"}},[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[n("img",t._g({attrs:{src:i("f5e3"),height:"35"}},s))]}}],null,!1,2253368969)},[n("span",[t._v(t._s(t.isHiRes))])])],1):t._e(),n("v-divider"),n("v-card-title",{class:t.$store.state.isMobile?"body-2":"title",staticStyle:{padding:"8px",color:"primary","margin-top":"8px"},domProps:{textContent:t._s(t.item.name)}}),t.item.artist?n("v-card-subtitle",{class:t.$store.state.isMobile?"caption":"body-1",staticStyle:{padding:"8px"},domProps:{textContent:t._s(t.item.artist.name)}}):t._e(),t.item.artists?n("v-card-subtitle",{class:t.$store.state.isMobile?"caption":"body-1",staticStyle:{padding:"8px"},domProps:{textContent:t._s(t.item.artists[0].name)}}):t._e()],1)},u=[],c=(i("4160"),i("a9e3"),i("96cf"),i("1da1")),l=i("2b0e"),p=i("d89e"),d=600;l["a"].directive("longpress",{bind:function(t,e,i){var n=e.value;if("function"===typeof n){var s=null,a=function(t){"click"===t.type&&0!==t.button||null===s&&(s=setTimeout((function(){return n(t)}),d))},r=function(){null!==s&&(clearTimeout(s),s=null)};["mousedown","touchstart"].forEach((function(e){return t.addEventListener(e,a)})),["click","mouseout","touchend","touchcancel"].forEach((function(e){return t.addEventListener(e,r)}))}else l["a"].$log.warn("Expect a function, got ".concat(n))}});var h=l["a"].extend({components:{MediaItemThumb:p["a"]},props:{item:Object,thumbHeight:Number,thumbWidth:Number,hideproviders:Boolean,hidelibrary:Boolean,onclickHandler:null},data:function(){return{touchMoving:!1,cancelled:!1}},computed:{isHiRes:function(){var t,e=Object(a["a"])(this.item.provider_ids);try{for(e.s();!(t=e.n()).done;){var i=t.value;if(99!==i.quality&&i.quality>6)return i.details?i.details:7===i.quality?"44.1/48khz 24 bits":8===i.quality?"88.2/96khz 24 bits":9===i.quality?"176/192khz 24 bits":"+192kHz 24 bits"}}catch(n){e.e(n)}finally{e.f()}return""}},created:function(){},beforeDestroy:function(){this.cancelled=!0},mounted:function(){},methods:{itemClicked:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e="";if("artist"===t.media_type)e="/artists/"+t.item_id;else if("album"===t.media_type)e="/albums/"+t.item_id;else{if("playlist"!==t.media_type)return void this.$server.$emit("showPlayMenu",t);e="/playlists/"+t.item_id}this.$router.push({path:e,query:{provider:t.provider}})},menuClick:function(){this.cancelled||this.$server.$emit("showContextMenu",this.item)},toggleLibrary:function(t){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return e.cancelled=!0,i.next=3,e.$server.toggleLibrary(t);case 3:e.cancelled=!1;case 4:case"end":return i.stop()}}),i)})))()}}}),g=h,m=i("2877"),f=i("6544"),v=i.n(f),b=i("b0af"),y=i("99d9"),O=i("ce7e"),j=i("3a2f"),S=Object(m["a"])(g,o,u,!1,null,null,null),P=S.exports;v()(S,{VCard:b["a"],VCardSubtitle:y["a"],VCardTitle:y["c"],VDivider:O["a"],VTooltip:j["a"]});var x={components:{ListviewItem:r["a"],PanelviewItem:P},props:["mediatype","items"],data:function(){return{viewMode:"list",search:"",sortDesc:!1,sortBy:"name",sortKeys:[{text:this.$t("sort_name"),value:"name"}]}},created:function(){"playlisttracks"===this.mediatype?(this.sortKeys.push({text:this.$t("sort_position"),value:"position"}),this.sortKeys.push({text:this.$t("sort_artist"),value:"artists[0].name"}),this.sortKeys.push({text:this.$t("sort_album"),value:"album.name"}),this.sortBy="position",this.viewMode="list"):"tracks"===this.mediatype?(this.sortKeys.push({text:this.$t("sort_artist"),value:"artists[0].name"}),this.sortKeys.push({text:this.$t("sort_album"),value:"album.name"}),this.viewMode="list"):"albums"===this.mediatype?(this.sortKeys.push({text:this.$t("sort_artist"),value:"artist.name"}),this.sortKeys.push({text:this.$t("sort_date"),value:"year"}),this.viewMode="panel"):this.viewMode="list";var t=localStorage.getItem("viewMode"+this.mediatype);null!==t&&(this.viewMode=t)},computed:{thumbWidth:function(){return this.$store.state.isMobile?120:175},thumbHeight:function(){return 1.5*this.thumbWidth}},methods:{toggleViewMode:function(){"panel"===this.viewMode?this.viewMode="list":this.viewMode="panel",localStorage.setItem("viewMode"+this.mediatype,this.viewMode)},filteredItems:function(t,e){if(!e)return t;e=e.toLowerCase();var i,n=[],s=Object(a["a"])(t);try{for(s.s();!(i=s.n()).done;){var r=i.value;(r.name.toLowerCase().includes(e)||r.artist&&r.artist.name.toLowerCase().includes(e)||r.album&&r.album.name.toLowerCase().includes(e)||r.artists&&r.artists[0].name.toLowerCase().includes(e))&&n.push(r)}}catch(o){s.e(o)}finally{s.f()}return n}}},$=x,I=(i("0ddb"),i("40dc")),w=i("8336"),_=(i("13d5"),i("45fc"),i("4ec9"),i("b64b"),i("d3b7"),i("ac1f"),i("3ca3"),i("5319"),i("2ca0"),i("159b"),i("ddb0"),i("ade3")),k=i("5530"),B=(i("4b85"),i("d9f7")),C=i("80d2"),D=["sm","md","lg","xl"],L=function(){return D.reduce((function(t,e){return t[e]={type:[Boolean,String,Number],default:!1},t}),{})}(),E=function(){return D.reduce((function(t,e){return t["offset"+Object(C["E"])(e)]={type:[String,Number],default:null},t}),{})}(),M=function(){return D.reduce((function(t,e){return t["order"+Object(C["E"])(e)]={type:[String,Number],default:null},t}),{})}(),F={col:Object.keys(L),offset:Object.keys(E),order:Object.keys(M)};function A(t,e,i){var n=t;if(null!=i&&!1!==i){if(e){var s=e.replace(t,"");n+="-".concat(s)}return"col"!==t||""!==i&&!0!==i?(n+="-".concat(i),n.toLowerCase()):n.toLowerCase()}}var T=new Map,K=l["a"].extend({name:"v-col",functional:!0,props:Object(k["a"])(Object(k["a"])(Object(k["a"])(Object(k["a"])({cols:{type:[Boolean,String,Number],default:!1}},L),{},{offset:{type:[String,Number],default:null}},E),{},{order:{type:[String,Number],default:null}},M),{},{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,e){var i=e.props,n=e.data,s=e.children,a=(e.parent,"");for(var r in i)a+=String(i[r]);var o=T.get(a);return o||function(){var t,e;for(e in o=[],F)F[e].forEach((function(t){var n=i[t],s=A(e,t,n);s&&o.push(s)}));var n=o.some((function(t){return t.startsWith("col-")}));o.push((t={col:!n||!i.cols},Object(_["a"])(t,"col-".concat(i.cols),i.cols),Object(_["a"])(t,"offset-".concat(i.offset),i.offset),Object(_["a"])(t,"order-".concat(i.order),i.order),Object(_["a"])(t,"align-self-".concat(i.alignSelf),i.alignSelf),t)),T.set(a,o)}(),t(i.tag,Object(B["a"])(n,{class:o}),s)}}),V=i("a523"),N=(i("a623"),i("4de4"),i("d81d"),i("07ac"),i("3835")),W=(i("99af"),i("c740"),i("fb6a"),i("a434"),i("841c"),i("2909")),H=l["a"].extend({name:"v-data",inheritAttrs:!1,props:{items:{type:Array,default:function(){return[]}},options:{type:Object,default:function(){return{}}},sortBy:{type:[String,Array],default:function(){return[]}},sortDesc:{type:[Boolean,Array],default:function(){return[]}},customSort:{type:Function,default:C["D"]},mustSort:Boolean,multiSort:Boolean,page:{type:Number,default:1},itemsPerPage:{type:Number,default:10},groupBy:{type:[String,Array],default:function(){return[]}},groupDesc:{type:[Boolean,Array],default:function(){return[]}},customGroup:{type:Function,default:C["u"]},locale:{type:String,default:"en-US"},disableSort:Boolean,disablePagination:Boolean,disableFiltering:Boolean,search:String,customFilter:{type:Function,default:C["C"]},serverItemsLength:{type:Number,default:-1}},data:function(){var t={page:this.page,itemsPerPage:this.itemsPerPage,sortBy:Object(C["F"])(this.sortBy),sortDesc:Object(C["F"])(this.sortDesc),groupBy:Object(C["F"])(this.groupBy),groupDesc:Object(C["F"])(this.groupDesc),mustSort:this.mustSort,multiSort:this.multiSort};this.options&&(t=Object.assign(t,this.options));var e,i,n=t,s=n.sortBy,a=n.sortDesc,r=n.groupBy,o=n.groupDesc,u=s.length-a.length,c=r.length-o.length;u>0&&(e=t.sortDesc).push.apply(e,Object(W["a"])(Object(C["l"])(u,!1)));c>0&&(i=t.groupDesc).push.apply(i,Object(W["a"])(Object(C["l"])(c,!1)));return{internalOptions:t}},computed:{itemsLength:function(){return this.serverItemsLength>=0?this.serverItemsLength:this.filteredItems.length},pageCount:function(){return this.internalOptions.itemsPerPage<=0?1:Math.ceil(this.itemsLength/this.internalOptions.itemsPerPage)},pageStart:function(){return-1!==this.internalOptions.itemsPerPage&&this.items.length?(this.internalOptions.page-1)*this.internalOptions.itemsPerPage:0},pageStop:function(){return-1===this.internalOptions.itemsPerPage?this.itemsLength:this.items.length?Math.min(this.itemsLength,this.internalOptions.page*this.internalOptions.itemsPerPage):0},isGrouped:function(){return!!this.internalOptions.groupBy.length},pagination:function(){return{page:this.internalOptions.page,itemsPerPage:this.internalOptions.itemsPerPage,pageStart:this.pageStart,pageStop:this.pageStop,pageCount:this.pageCount,itemsLength:this.itemsLength}},filteredItems:function(){var t=this.items.slice();return!this.disableFiltering&&this.serverItemsLength<=0&&(t=this.customFilter(t,this.search)),t},computedItems:function(){var t=this.filteredItems.slice();return!this.disableSort&&this.serverItemsLength<=0&&(t=this.sortItems(t)),!this.disablePagination&&this.serverItemsLength<=0&&(t=this.paginateItems(t)),t},groupedItems:function(){return this.isGrouped?this.groupItems(this.computedItems):null},scopedProps:function(){var t={sort:this.sort,sortArray:this.sortArray,group:this.group,items:this.computedItems,options:this.internalOptions,updateOptions:this.updateOptions,pagination:this.pagination,groupedItems:this.groupedItems,originalItemsLength:this.items.length};return t},computedOptions:function(){return Object(k["a"])({},this.options)}},watch:{computedOptions:{handler:function(t,e){Object(C["j"])(t,e)||this.updateOptions(t)},deep:!0,immediate:!0},internalOptions:{handler:function(t,e){Object(C["j"])(t,e)||this.$emit("update:options",t)},deep:!0,immediate:!0},page:function(t){this.updateOptions({page:t})},"internalOptions.page":function(t){this.$emit("update:page",t)},itemsPerPage:function(t){this.updateOptions({itemsPerPage:t})},"internalOptions.itemsPerPage":function(t){this.$emit("update:items-per-page",t)},sortBy:function(t){this.updateOptions({sortBy:Object(C["F"])(t)})},"internalOptions.sortBy":function(t,e){!Object(C["j"])(t,e)&&this.$emit("update:sort-by",Array.isArray(this.sortBy)?t:t[0])},sortDesc:function(t){this.updateOptions({sortDesc:Object(C["F"])(t)})},"internalOptions.sortDesc":function(t,e){!Object(C["j"])(t,e)&&this.$emit("update:sort-desc",Array.isArray(this.sortDesc)?t:t[0])},groupBy:function(t){this.updateOptions({groupBy:Object(C["F"])(t)})},"internalOptions.groupBy":function(t,e){!Object(C["j"])(t,e)&&this.$emit("update:group-by",Array.isArray(this.groupBy)?t:t[0])},groupDesc:function(t){this.updateOptions({groupDesc:Object(C["F"])(t)})},"internalOptions.groupDesc":function(t,e){!Object(C["j"])(t,e)&&this.$emit("update:group-desc",Array.isArray(this.groupDesc)?t:t[0])},multiSort:function(t){this.updateOptions({multiSort:t})},"internalOptions.multiSort":function(t){this.$emit("update:multi-sort",t)},mustSort:function(t){this.updateOptions({mustSort:t})},"internalOptions.mustSort":function(t){this.$emit("update:must-sort",t)},pageCount:{handler:function(t){this.$emit("page-count",t)},immediate:!0},computedItems:{handler:function(t){this.$emit("current-items",t)},immediate:!0},pagination:{handler:function(t,e){Object(C["j"])(t,e)||this.$emit("pagination",this.pagination)},immediate:!0}},methods:{toggle:function(t,e,i,n,s,a){var r=e.slice(),o=i.slice(),u=r.findIndex((function(e){return e===t}));return u<0?(a||(r=[],o=[]),r.push(t),o.push(!1)):u>=0&&!o[u]?o[u]=!0:s?o[u]=!1:(r.splice(u,1),o.splice(u,1)),Object(C["j"])(r,e)&&Object(C["j"])(o,i)||(n=1),{by:r,desc:o,page:n}},group:function(t){var e=this.toggle(t,this.internalOptions.groupBy,this.internalOptions.groupDesc,this.internalOptions.page,!0,!1),i=e.by,n=e.desc,s=e.page;this.updateOptions({groupBy:i,groupDesc:n,page:s})},sort:function(t){if(Array.isArray(t))return this.sortArray(t);var e=this.toggle(t,this.internalOptions.sortBy,this.internalOptions.sortDesc,this.internalOptions.page,this.internalOptions.mustSort,this.internalOptions.multiSort),i=e.by,n=e.desc,s=e.page;this.updateOptions({sortBy:i,sortDesc:n,page:s})},sortArray:function(t){var e=this,i=t.map((function(t){var i=e.internalOptions.sortBy.findIndex((function(e){return e===t}));return i>-1&&e.internalOptions.sortDesc[i]}));this.updateOptions({sortBy:t,sortDesc:i})},updateOptions:function(t){this.internalOptions=Object(k["a"])(Object(k["a"])(Object(k["a"])({},this.internalOptions),t),{},{page:this.serverItemsLength<0?Math.max(1,Math.min(t.page||this.internalOptions.page,this.pageCount)):t.page||this.internalOptions.page})},sortItems:function(t){var e=this.internalOptions.sortBy,i=this.internalOptions.sortDesc;return this.internalOptions.groupBy.length&&(e=[].concat(Object(W["a"])(this.internalOptions.groupBy),Object(W["a"])(e)),i=[].concat(Object(W["a"])(this.internalOptions.groupDesc),Object(W["a"])(i))),this.customSort(t,e,i,this.locale)},groupItems:function(t){return this.customGroup(t,this.internalOptions.groupBy,this.internalOptions.groupDesc)},paginateItems:function(t){return-1===this.serverItemsLength&&t.length<=this.pageStart&&(this.internalOptions.page=Math.max(1,this.internalOptions.page-1)),t.slice(this.pageStart,this.pageStop)}},render:function(){return this.$scopedSlots.default&&this.$scopedSlots.default(this.scopedProps)}}),R=(i("7db0"),i("25f0"),i("53ca")),q=(i("495d"),i("b974")),z=i("9d26"),G=i("afdd"),J=l["a"].extend({name:"v-data-footer",props:{options:{type:Object,required:!0},pagination:{type:Object,required:!0},itemsPerPageOptions:{type:Array,default:function(){return[5,10,15,-1]}},prevIcon:{type:String,default:"$prev"},nextIcon:{type:String,default:"$next"},firstIcon:{type:String,default:"$first"},lastIcon:{type:String,default:"$last"},itemsPerPageText:{type:String,default:"$vuetify.dataFooter.itemsPerPageText"},itemsPerPageAllText:{type:String,default:"$vuetify.dataFooter.itemsPerPageAll"},showFirstLastPage:Boolean,showCurrentPage:Boolean,disablePagination:Boolean,disableItemsPerPage:Boolean,pageText:{type:String,default:"$vuetify.dataFooter.pageText"}},computed:{disableNextPageIcon:function(){return this.options.itemsPerPage<=0||this.options.page*this.options.itemsPerPage>=this.pagination.itemsLength||this.pagination.pageStop<0},computedDataItemsPerPageOptions:function(){var t=this;return this.itemsPerPageOptions.map((function(e){return"object"===Object(R["a"])(e)?e:t.genDataItemsPerPageOption(e)}))}},methods:{updateOptions:function(t){this.$emit("update:options",Object.assign({},this.options,t))},onFirstPage:function(){this.updateOptions({page:1})},onPreviousPage:function(){this.updateOptions({page:this.options.page-1})},onNextPage:function(){this.updateOptions({page:this.options.page+1})},onLastPage:function(){this.updateOptions({page:this.pagination.pageCount})},onChangeItemsPerPage:function(t){this.updateOptions({itemsPerPage:t,page:1})},genDataItemsPerPageOption:function(t){return{text:-1===t?this.$vuetify.lang.t(this.itemsPerPageAllText):String(t),value:t}},genItemsPerPageSelect:function(){var t=this.options.itemsPerPage,e=this.computedDataItemsPerPageOptions;return e.length<=1?null:(e.find((function(e){return e.value===t}))||(t=e[0]),this.$createElement("div",{staticClass:"v-data-footer__select"},[this.$vuetify.lang.t(this.itemsPerPageText),this.$createElement(q["a"],{attrs:{"aria-label":this.itemsPerPageText},props:{disabled:this.disableItemsPerPage,items:e,value:t,hideDetails:!0,auto:!0,minWidth:"75px"},on:{input:this.onChangeItemsPerPage}})]))},genPaginationInfo:function(){var t=["–"];if(this.pagination.itemsLength&&this.pagination.itemsPerPage){var e=this.pagination.itemsLength,i=this.pagination.pageStart+1,n=e<this.pagination.pageStop||this.pagination.pageStop<0?e:this.pagination.pageStop;t=this.$scopedSlots["page-text"]?[this.$scopedSlots["page-text"]({pageStart:i,pageStop:n,itemsLength:e})]:[this.$vuetify.lang.t(this.pageText,i,n,e)]}return this.$createElement("div",{class:"v-data-footer__pagination"},t)},genIcon:function(t,e,i,n){return this.$createElement(G["a"],{props:{disabled:e||this.disablePagination,icon:!0,text:!0},on:{click:t},attrs:{"aria-label":i}},[this.$createElement(z["a"],n)])},genIcons:function(){var t=[],e=[];return t.push(this.genIcon(this.onPreviousPage,1===this.options.page,this.$vuetify.lang.t("$vuetify.dataFooter.prevPage"),this.$vuetify.rtl?this.nextIcon:this.prevIcon)),e.push(this.genIcon(this.onNextPage,this.disableNextPageIcon,this.$vuetify.lang.t("$vuetify.dataFooter.nextPage"),this.$vuetify.rtl?this.prevIcon:this.nextIcon)),this.showFirstLastPage&&(t.unshift(this.genIcon(this.onFirstPage,1===this.options.page,this.$vuetify.lang.t("$vuetify.dataFooter.firstPage"),this.$vuetify.rtl?this.lastIcon:this.firstIcon)),e.push(this.genIcon(this.onLastPage,this.options.page>=this.pagination.pageCount||-1===this.options.itemsPerPage,this.$vuetify.lang.t("$vuetify.dataFooter.lastPage"),this.$vuetify.rtl?this.firstIcon:this.lastIcon))),[this.$createElement("div",{staticClass:"v-data-footer__icons-before"},t),this.showCurrentPage&&this.$createElement("span",[this.options.page.toString()]),this.$createElement("div",{staticClass:"v-data-footer__icons-after"},e)]}},render:function(){return this.$createElement("div",{staticClass:"v-data-footer"},[this.genItemsPerPageSelect(),this.genPaginationInfo(),this.genIcons()])}}),U=i("e4cd"),Q=i("7560"),X=i("58df"),Y=i("d9bd"),Z=Object(X["a"])(U["a"],Q["a"]).extend({name:"v-data-iterator",props:Object(k["a"])(Object(k["a"])({},H.options.props),{},{itemKey:{type:String,default:"id"},value:{type:Array,default:function(){return[]}},singleSelect:Boolean,expanded:{type:Array,default:function(){return[]}},mobileBreakpoint:Object(k["a"])(Object(k["a"])({},U["a"].options.props.mobileBreakpoint),{},{default:600}),singleExpand:Boolean,loading:[Boolean,String],noResultsText:{type:String,default:"$vuetify.dataIterator.noResultsText"},noDataText:{type:String,default:"$vuetify.noDataText"},loadingText:{type:String,default:"$vuetify.dataIterator.loadingText"},hideDefaultFooter:Boolean,footerProps:Object,selectableKey:{type:String,default:"isSelectable"}}),data:function(){return{selection:{},expansion:{},internalCurrentItems:[]}},computed:{everyItem:function(){var t=this;return!!this.selectableItems.length&&this.selectableItems.every((function(e){return t.isSelected(e)}))},someItems:function(){var t=this;return this.selectableItems.some((function(e){return t.isSelected(e)}))},sanitizedFooterProps:function(){return Object(C["d"])(this.footerProps)},selectableItems:function(){var t=this;return this.internalCurrentItems.filter((function(e){return t.isSelectable(e)}))}},watch:{value:{handler:function(t){var e=this;this.selection=t.reduce((function(t,i){return t[Object(C["o"])(i,e.itemKey)]=i,t}),{})},immediate:!0},selection:function(t,e){Object(C["j"])(Object.keys(t),Object.keys(e))||this.$emit("input",Object.values(t))},expanded:{handler:function(t){var e=this;this.expansion=t.reduce((function(t,i){return t[Object(C["o"])(i,e.itemKey)]=!0,t}),{})},immediate:!0},expansion:function(t,e){var i=this;if(!Object(C["j"])(t,e)){var n=Object.keys(t).filter((function(e){return t[e]})),s=n.length?this.items.filter((function(t){return n.includes(String(Object(C["o"])(t,i.itemKey)))})):[];this.$emit("update:expanded",s)}}},created:function(){var t=this,e=[["disable-initial-sort","sort-by"],["filter","custom-filter"],["pagination","options"],["total-items","server-items-length"],["hide-actions","hide-default-footer"],["rows-per-page-items","footer-props.items-per-page-options"],["rows-per-page-text","footer-props.items-per-page-text"],["prev-icon","footer-props.prev-icon"],["next-icon","footer-props.next-icon"]];e.forEach((function(e){var i=Object(N["a"])(e,2),n=i[0],s=i[1];t.$attrs.hasOwnProperty(n)&&Object(Y["a"])(n,s,t)}));var i=["expand","content-class","content-props","content-tag"];i.forEach((function(e){t.$attrs.hasOwnProperty(e)&&Object(Y["e"])(e)}))},methods:{toggleSelectAll:function(t){for(var e=Object.assign({},this.selection),i=0;i<this.selectableItems.length;i++){var n=this.selectableItems[i];if(this.isSelectable(n)){var s=Object(C["o"])(n,this.itemKey);t?e[s]=n:delete e[s]}}this.selection=e,this.$emit("toggle-select-all",{items:this.internalCurrentItems,value:t})},isSelectable:function(t){return!1!==Object(C["o"])(t,this.selectableKey)},isSelected:function(t){return!!this.selection[Object(C["o"])(t,this.itemKey)]||!1},select:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(this.isSelectable(t)){var n=this.singleSelect?{}:Object.assign({},this.selection),s=Object(C["o"])(t,this.itemKey);if(e?n[s]=t:delete n[s],this.singleSelect&&i){var a=Object.keys(this.selection),r=a.length&&Object(C["o"])(this.selection[a[0]],this.itemKey);r&&r!==s&&this.$emit("item-selected",{item:this.selection[r],value:!1})}this.selection=n,i&&this.$emit("item-selected",{item:t,value:e})}},isExpanded:function(t){return this.expansion[Object(C["o"])(t,this.itemKey)]||!1},expand:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=this.singleExpand?{}:Object.assign({},this.expansion),n=Object(C["o"])(t,this.itemKey);e?i[n]=!0:delete i[n],this.expansion=i,this.$emit("item-expanded",{item:t,value:e})},createItemProps:function(t){var e=this;return{item:t,select:function(i){return e.select(t,i)},isSelected:this.isSelected(t),expand:function(i){return e.expand(t,i)},isExpanded:this.isExpanded(t),isMobile:this.isMobile}},genEmptyWrapper:function(t){return this.$createElement("div",t)},genEmpty:function(t,e){if(0===t&&this.loading){var i=this.$slots["loading"]||this.$vuetify.lang.t(this.loadingText);return this.genEmptyWrapper(i)}if(0===t){var n=this.$slots["no-data"]||this.$vuetify.lang.t(this.noDataText);return this.genEmptyWrapper(n)}if(0===e){var s=this.$slots["no-results"]||this.$vuetify.lang.t(this.noResultsText);return this.genEmptyWrapper(s)}return null},genItems:function(t){var e=this,i=this.genEmpty(t.originalItemsLength,t.pagination.itemsLength);return i?[i]:this.$scopedSlots.default?this.$scopedSlots.default(Object(k["a"])(Object(k["a"])({},t),{},{isSelected:this.isSelected,select:this.select,isExpanded:this.isExpanded,expand:this.expand})):this.$scopedSlots.item?t.items.map((function(t){return e.$scopedSlots.item(e.createItemProps(t))})):[]},genFooter:function(t){if(this.hideDefaultFooter)return null;var e={props:Object(k["a"])(Object(k["a"])({},this.sanitizedFooterProps),{},{options:t.options,pagination:t.pagination}),on:{"update:options":function(e){return t.updateOptions(e)}}},i=Object(C["p"])("footer.",this.$scopedSlots);return this.$createElement(J,Object(k["a"])({scopedSlots:i},e))},genDefaultScopedSlot:function(t){var e=Object(k["a"])(Object(k["a"])({},t),{},{someItems:this.someItems,everyItem:this.everyItem,toggleSelectAll:this.toggleSelectAll});return this.$createElement("div",{staticClass:"v-data-iterator"},[Object(C["r"])(this,"header",e,!0),this.genItems(t),this.genFooter(t),Object(C["r"])(this,"footer",e,!0)])}},render:function(){var t=this;return this.$createElement(H,{props:this.$props,on:{"update:options":function(e,i){return!Object(C["j"])(e,i)&&t.$emit("update:options",e)},"update:page":function(e){return t.$emit("update:page",e)},"update:items-per-page":function(e){return t.$emit("update:items-per-page",e)},"update:sort-by":function(e){return t.$emit("update:sort-by",e)},"update:sort-desc":function(e){return t.$emit("update:sort-desc",e)},"update:group-by":function(e){return t.$emit("update:group-by",e)},"update:group-desc":function(e){return t.$emit("update:group-desc",e)},pagination:function(e,i){return!Object(C["j"])(e,i)&&t.$emit("pagination",e)},"current-items":function(e){t.internalCurrentItems=e,t.$emit("current-items",e)},"page-count":function(e){return t.$emit("page-count",e)}},scopedSlots:{default:this.genDefaultScopedSlot}})}}),tt=i("132d"),et=i("24c9"),it=i("8860"),nt=i("da13"),st=i("e449"),at=["sm","md","lg","xl"],rt=["start","end","center"];function ot(t,e){return at.reduce((function(i,n){return i[t+Object(C["E"])(n)]=e(),i}),{})}var ut=function(t){return[].concat(rt,["baseline","stretch"]).includes(t)},ct=ot("align",(function(){return{type:String,default:null,validator:ut}})),lt=function(t){return[].concat(rt,["space-between","space-around"]).includes(t)},pt=ot("justify",(function(){return{type:String,default:null,validator:lt}})),dt=function(t){return[].concat(rt,["space-between","space-around","stretch"]).includes(t)},ht=ot("alignContent",(function(){return{type:String,default:null,validator:dt}})),gt={align:Object.keys(ct),justify:Object.keys(pt),alignContent:Object.keys(ht)},mt={align:"align",justify:"justify",alignContent:"align-content"};function ft(t,e,i){var n=mt[t];if(null!=i){if(e){var s=e.replace(t,"");n+="-".concat(s)}return n+="-".concat(i),n.toLowerCase()}}var vt=new Map,bt=l["a"].extend({name:"v-row",functional:!0,props:Object(k["a"])(Object(k["a"])(Object(k["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:ut}},ct),{},{justify:{type:String,default:null,validator:lt}},pt),{},{alignContent:{type:String,default:null,validator:dt}},ht),render:function(t,e){var i=e.props,n=e.data,s=e.children,a="";for(var r in i)a+=String(i[r]);var o=vt.get(a);return o||function(){var t,e;for(e in o=[],gt)gt[e].forEach((function(t){var n=i[t],s=ft(e,t,n);s&&o.push(s)}));o.push((t={"no-gutters":i.noGutters,"row--dense":i.dense},Object(_["a"])(t,"align-".concat(i.align),i.align),Object(_["a"])(t,"justify-".concat(i.justify),i.justify),Object(_["a"])(t,"align-content-".concat(i.alignContent),i.alignContent),t)),vt.set(a,o)}(),t(i.tag,Object(B["a"])(n,{staticClass:"row",class:o}),s)}}),yt=i("2fa4"),Ot=i("8654"),jt=Object(m["a"])($,n,s,!1,null,"4123d546",null);e["a"]=jt.exports;v()(jt,{VAppBar:I["a"],VBtn:w["a"],VCard:b["a"],VCol:K,VContainer:V["a"],VDataIterator:Z,VIcon:tt["a"],VLabel:et["a"],VList:it["a"],VListItem:nt["a"],VMenu:st["a"],VRow:bt,VSpacer:yt["a"],VTextField:Ot["a"]})},"0ddb":function(t,e,i){"use strict";var n=i("7b20"),s=i.n(n);s.a},"495d":function(t,e,i){},"7b20":function(t,e,i){},"841c":function(t,e,i){"use strict";var n=i("d784"),s=i("825a"),a=i("1d80"),r=i("129f"),o=i("14c3");n("search",1,(function(t,e,i){return[function(e){var i=a(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,i):new RegExp(e)[t](String(i))},function(t){var n=i(e,t,this);if(n.done)return n.value;var a=s(t),u=String(this),c=a.lastIndex;r(c,0)||(a.lastIndex=0);var l=o(a,u);return r(a.lastIndex,c)||(a.lastIndex=c),null===l?-1:l.index}]}))}}]);
//# sourceMappingURL=browse~itemdetails.728a514f.js.map
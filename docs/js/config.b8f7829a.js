(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["config"],{1071:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[e.configKey?e._e():n("v-card",{attrs:{flat:""}},[n("v-list",{attrs:{tile:""}},e._l(e.conf,(function(t,i){return n("v-list-item",{key:i,attrs:{tile:""},on:{click:function(t){return e.$router.push("/config/"+i)}}},[n("v-list-item-icon",{staticStyle:{"margin-left":"15px"}},[n("v-icon",{attrs:{large:""}},[e._v(e._s(t.icon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(t.label))])],1)],1)})),1)],1),e.configKey?n("v-card",{attrs:{flat:""}},[n("v-list",{attrs:{"two-line":"",tile:""}},e._l(e.config_items,(function(t,a){return n("v-list-group",{key:a,attrs:{"no-action":""},scopedSlots:e._u([{key:"activator",fn:function(){return[n("v-list-item",[n("v-list-item-avatar",{staticStyle:{"margin-left":"-15px"},attrs:{tile:""}},["base"==e.configKey?n("img",{staticStyle:{"border-radius":"5px",border:"1px solid rgba(0,0,0,.85)"},attrs:{src:i("9e01")("./"+a+".png")}}):e._e(),["player_providers","music_providers","metadata_providers","plugins"].includes(e.configKey)?n("img",{staticStyle:{"border-radius":"5px",border:"1px solid rgba(0,0,0,.85)"},attrs:{src:e.$server.getProviderIconUrl(a)}}):e._e(),"player_settings"==e.configKey?n("img",{staticStyle:{"border-radius":"5px",border:"1px solid rgba(0,0,0,.85)"},attrs:{src:e.$server.getProviderIconUrl(e.$server.players[a].provider_id)}}):e._e()]),n("v-list-item-content",[t["__name__"]?n("v-list-item-title",[e._v(e._s(t["__name__"]["label"]))]):"player_settings"==e.configKey?n("v-list-item-title",[n("b",[e._v(e._s(e.$server.players[a].name))])]):n("v-list-item-title",[e._v(e._s(a))]),"player_settings"==e.configKey?n("v-list-item-subtitle",e._l(e.$server.players[a].device_info,(function(t,i){return n("span",{key:i},[n("b",[t?n("span",[e._v(e._s(i+": "))]):e._e()]),t?n("span",[e._v(e._s(t+" "))]):e._e()])})),0):e._e()],1)],1)]},proxy:!0}],null,!0)},[n("v-list",{attrs:{tile:""}},e._l(e.getCleanValues(t),(function(i,s){return n("v-list-item",{key:s,staticStyle:{"margin-top":"15px","margin-bottom":"15px"},attrs:{tile:""}},["label"!=i["entry_type"]||i["hidden"]?e._e():n("v-label",[e._v(e._s(i["label"]))]),"boolean"==i["entry_type"]?n("v-switch",{attrs:{placeholder:i["default_value"],label:i["label"],hint:i["description"],disabled:e.getDisabledState(t,i)},on:{change:function(t){return e.saveConfig(e.configKey,a,s,i["value"])}},model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}}):e._e(),"string"!=i["entry_type"]&&"integer"!=i["entry_type"]&&"float"!=i["entry_type"]||i["values"].length||i["range"].length?e._e():n("v-text-field",{attrs:{placeholder:i["default_value"]?i["default_value"].toString():"",label:i["label"],hint:i["description"],disabled:e.getDisabledState(t,i),filled:""},on:{change:function(t){return e.saveConfig(e.configKey,a,s,i["value"])}},model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}}),"password"==i["entry_type"]?n("v-text-field",{attrs:{placeholder:i["default_value"],label:i["label"],hint:i["description"],disabled:e.getDisabledState(t,i),type:"password",filled:""},on:{change:function(t){return e.saveConfig(e.configKey,a,s,i["value"])}},model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}}):e._e(),i["values"].length&&!i["range"].length?n("v-select",{attrs:{chips:i["multi_value"],clearable:"",multiple:i["multi_value"],items:i["values"],placeholder:i["default_value"]?i["default_value"].toString():"",label:i["label"],hint:i["description"],disabled:e.getDisabledState(t,i),filled:""},on:{change:function(t){return e.saveConfig(e.configKey,a,s,i["value"])}},model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}}):e._e(),i["range"].length?n("v-slider",{attrs:{placeholder:i["default_value"].toString(),label:i["label"],hint:i["description"],disabled:e.getDisabledState(t,i),min:i["range"][0],max:i["range"][1]},on:{change:function(t){return e.saveConfig(e.configKey,a,s,i["value"])}},scopedSlots:e._u([{key:"append",fn:function(){return[n("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"60px"},attrs:{type:"number"},model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}})]},proxy:!0}],null,!0),model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}}):e._e()],1)})),1),n("v-divider")],1)})),1)],1):e._e()],1)},a=[],s=(i("ac1f"),i("1276"),i("96cf"),i("1da1")),r=i("2b0e"),l={components:{},props:["configKey"],data:function(){return{conf:{base:{label:this.$t("conf.base"),icon:"mdi-tune"},music_providers:{label:this.$t("conf.music_providers"),icon:"mdi-folder-music"},player_providers:{label:this.$t("conf.player_providers"),icon:"mdi-disc-player"},metadata_providers:{label:this.$t("conf.metadata_providers"),icon:"mdi-image-search"},plugins:{label:this.$t("conf.plugins"),icon:"mdi-toy-brick-marker"},player_settings:{label:this.$t("conf.player_settings"),icon:"mdi-headphones-settings"}},players:{},active:0}},computed:{config_items:function(){return this.conf?this.configKey?this.conf[this.configKey]:this.conf:{}}},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$store.windowtitle=e.$t("settings"),e.configKey&&(e.$store.windowtitle+=" | "+e.$t("conf."+e.configKey)),e.getConfig(),e.$server.$on("connected",e.getConfig),e.$server.$on("config changed",e.getConfig),e.$server.$on("player changed",e.getConfig);case 6:case"end":return t.stop()}}),t)})))()},methods:{getConfig:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.configKey&&e.$server.connected){t.next=2;break}return t.abrupt("return");case 2:return i=navigator.language.split("-")[0],t.next=5,e.$server.getData("config/"+e.configKey,{lang:i});case 5:n=t.sent,r["a"].set(e.conf,e.configKey,n);case 7:case"end":return t.stop()}}),t)})))()},saveConfig:function(e,t,i,n){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function s(){var r;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return r="config/"+e+"/"+t+"/"+i,s.next=3,a.$server.putData(r,n);case 3:case"end":return s.stop()}}),s)})))()},getDisabledState:function(e,t){return"enabled"!==t.entry_key&&(!(!e.enabled||e.enabled.value)||!(!t.depends_on||e[t.depends_on].value))},getCleanValues:function(e){var t={};for(var i in e)e[i].hidden||(t[i]=e[i]);return t}}},o=l,c=i("2877"),u=i("6544"),d=i.n(u),v=i("b0af"),f=i("ce7e"),g=i("132d"),p=i("24c9"),h=i("8860"),_=i("56b0"),m=i("da13"),b=i("8270"),y=i("5d23"),w=i("34c3"),$=i("b974"),S=i("ba0d"),x=(i("0481"),i("4069"),i("5530")),C=(i("ec29"),i("9d01"),i("fe09")),k=i("c37a"),K=i("c3f0"),V=i("0789"),D=i("490a"),L=i("80d2"),I=C["a"].extend({name:"v-switch",directives:{Touch:K["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(x["a"])(Object(x["a"])({},k["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(x["a"])(Object(x["a"])({},this.attrs),this.attrs$)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(x["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(x["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(V["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(D["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(e){(e.keyCode===L["w"].left&&this.isActive||e.keyCode===L["w"].right&&!this.isActive)&&this.onChange()}}}),j=i("8654"),O=Object(c["a"])(o,n,a,!1,null,null,null);t["default"]=O.exports;d()(O,{VCard:v["a"],VDivider:f["a"],VIcon:g["a"],VLabel:p["a"],VList:h["a"],VListGroup:_["a"],VListItem:m["a"],VListItemAvatar:b["a"],VListItemContent:y["a"],VListItemIcon:w["a"],VListItemSubtitle:y["b"],VListItemTitle:y["c"],VSelect:$["a"],VSlider:S["a"],VSwitch:I,VTextField:j["a"]})},"9d01":function(e,t,i){}}]);
//# sourceMappingURL=config.b8f7829a.js.map
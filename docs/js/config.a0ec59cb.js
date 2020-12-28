(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["config"],{1071:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[e.configKey?e._e():n("v-card",{attrs:{flat:""}},[n("v-list",{attrs:{tile:""}},e._l(e.configMenu,(function(t,i){return n("v-list-item",{key:i,attrs:{tile:""},on:{click:function(t){return e.$router.push("/config/"+i)}}},[n("v-list-item-icon",{staticStyle:{"margin-left":"15px"}},[n("v-icon",{attrs:{large:""}},[e._v(e._s(t.icon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(t.label))])],1)],1)})),1)],1),e.configKey?n("v-card",{attrs:{flat:""}},[n("v-list",{attrs:{"two-line":"",tile:""}},e._l(e.config_items,(function(t,a){return n("v-list-group",{key:a,attrs:{"no-action":""},scopedSlots:e._u([{key:"activator",fn:function(){return[n("v-list-item",[n("v-list-item-avatar",{staticStyle:{"margin-left":"-15px"},attrs:{tile:""}},["base"==e.configKey?n("img",{staticStyle:{"border-radius":"5px",border:"1px solid rgba(0,0,0,.85)"},attrs:{src:i("9e01")("./"+a+".png")}}):e._e(),["player_providers","music_providers","metadata_providers","plugins"].includes(e.configKey)?n("img",{staticStyle:{"border-radius":"5px",border:"1px solid rgba(0,0,0,.85)"},attrs:{src:e.getProviderIcon(a)}}):e._e(),"player_settings"==e.configKey?n("img",{staticStyle:{"border-radius":"5px",border:"1px solid rgba(0,0,0,.85)"},attrs:{src:e.getProviderIcon(e.getPlayer(a).provider_id)}}):e._e(),"security"==e.configKey?n("v-icon",[e._v("mdi-shield-lock")]):e._e()],1),n("v-list-item-content",[t["__name__"]?n("v-list-item-title",[e._v(e._s(t["__name__"]["label"]))]):"player_settings"==e.configKey?n("v-list-item-title",[n("b",[e._v(e._s(e.getPlayer(a).name))])]):n("v-list-item-title",{staticStyle:{"text-transform":"capitalize"}},[e._v(e._s(a))]),"player_settings"==e.configKey?n("v-list-item-subtitle",e._l(e.getPlayer(a).device_info,(function(t,i){return n("span",{key:i},[n("b",[t?n("span",[e._v(e._s(i+": "))]):e._e()]),t?n("span",[e._v(e._s(t+" "))]):e._e()])})),0):e._e()],1)],1)]},proxy:!0}],null,!0)},[n("v-list",{attrs:{tile:""}},e._l(e.getCleanValues(t),(function(i,l){return n("v-list-item",{key:l,staticStyle:{"margin-top":"15px","margin-bottom":"15px"},attrs:{tile:""}},["label"!=i["entry_type"]||i["hidden"]?e._e():n("v-label",[e._v(e._s(i["label"]))]),"boolean"==i["entry_type"]?n("v-switch",{attrs:{placeholder:i["default_value"],label:e.$t(i["label"]),hint:e.$t(i["description"]),disabled:e.getDisabledState(t,i)},on:{change:function(t){return e.saveConfig(e.configKey,a,l,i["value"])}},model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}}):e._e(),"string"!=i["entry_type"]&&"integer"!=i["entry_type"]&&"float"!=i["entry_type"]||i["values"].length||i["range"].length?e._e():n("v-text-field",{attrs:{placeholder:i["default_value"]?i["default_value"].toString():"",label:e.$t(i["label"]),hint:e.$t(i["description"]),disabled:e.getDisabledState(t,i),filled:""},on:{change:function(t){return e.saveConfig(e.configKey,a,l,i["value"])}},model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}}),"password"==i["entry_type"]?n("v-text-field",{attrs:{placeholder:i["default_value"],label:e.$t(i["label"]),hint:e.$t(i["description"]),disabled:e.getDisabledState(t,i),type:"password",filled:""},on:{change:function(t){return e.saveConfig(e.configKey,a,l,i["value"])}},model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}}):e._e(),i["values"].length&&!i["range"].length?n("v-select",{attrs:{chips:i["multi_value"],clearable:"",multiple:i["multi_value"],items:i["values"],placeholder:i["default_value"]?i["default_value"].toString():"",label:e.$t(i["label"]),hint:e.$t(i["description"]),disabled:e.getDisabledState(t,i),filled:""},on:{change:function(t){return e.saveConfig(e.configKey,a,l,i["value"])}},model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}}):e._e(),i["range"].length?n("v-slider",{attrs:{placeholder:i["default_value"].toString(),label:e.$t(i["label"]),hint:e.$t(i["description"]),disabled:e.getDisabledState(t,i),min:i["range"][0],max:i["range"][1]},on:{change:function(t){return e.saveConfig(e.configKey,a,l,i["value"])}},scopedSlots:e._u([{key:"append",fn:function(){return[n("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"60px"},attrs:{type:"number"},model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}})]},proxy:!0}],null,!0),model:{value:i["value"],callback:function(t){e.$set(i,"value",t)},expression:"conf_item_value['value']"}}):e._e(),"dict"==i["entry_type"]&&"app_tokens"==a?n("v-switch",{attrs:{value:"true",label:e.$t(i["label"]),hint:"Last login: "+e.dateStrFromTimestamp(i["value"]["last_login"]),"persistent-hint":""},on:{change:function(t){return e.revokeAppToken(l)}}}):e._e()],1)})),1),n("v-divider")],1)})),1)],1):e._e()],1)},a=[],l=(i("96cf"),i("1da1")),r=i("5530"),s=i("2f62"),o={components:{},props:["configKey"],data:function(){return{configMenu:{base:{label:this.$t("config.base"),icon:"mdi-tune"},security:{label:this.$t("config.security"),icon:"mdi-shield-lock"},music_providers:{label:this.$t("config.music_providers"),icon:"mdi-folder-music"},player_providers:{label:this.$t("config.player_providers"),icon:"mdi-disc-player"},metadata_providers:{label:this.$t("config.metadata_providers"),icon:"mdi-image-search"},plugins:{label:this.$t("config.plugins"),icon:"mdi-toy-brick-marker"},player_settings:{label:this.$t("config.player_settings"),icon:"mdi-headphones-settings"}}}},computed:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(s["d"])(["config"])),Object(s["c"])(["getProviderIcon","getPlayer"])),{},{config_items:function(){return this.config?this.configKey?this.config[this.configKey]:this.config:{}}}),created:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$store.state.windowTitle=e.$t("settings"),e.configKey&&(e.$store.state.windowTitle+=" | "+e.$t("config."+e.configKey));case 2:case"end":return t.stop()}}),t)})))()},methods:{saveConfig:function(e,t,i,n){var a=this;return Object(l["a"])(regeneratorRuntime.mark((function l(){var r;return regeneratorRuntime.wrap((function(l){while(1)switch(l.prev=l.next){case 0:r="config/"+e+"/"+t+"/"+i,a.$server.sendWsCommand(r,{new_value:n});case 2:case"end":return l.stop()}}),l)})))()},getDisabledState:function(e,t){return"enabled"!==t.entry_key&&(!(!e.enabled||e.enabled.value)||!(!t.depends_on||e[t.depends_on].value))},getCleanValues:function(e){var t={};for(var i in e)e[i].hidden||(t[i]=e[i]);return t},revokeAppToken:function(e){confirm("Are you sure you want to revoke this app ?")&&this.$server.sendWsCommand("revoke_token",{client_id:e})},dateStrFromTimestamp:function(e){if(!e)return"never";var t=new Date(1e3*e).toLocaleDateString("en-US");return t}}},c=o,u=i("2877"),d=i("6544"),v=i.n(d),f=i("b0af"),g=i("ce7e"),p=i("132d"),_=i("24c9"),m=i("8860"),b=i("56b0"),y=i("da13"),h=i("8270"),$=i("5d23"),k=i("34c3"),x=i("b974"),S=i("ba0d"),w=i("b73d"),K=i("8654"),V=Object(u["a"])(c,n,a,!1,null,null,null);t["default"]=V.exports;v()(V,{VCard:f["a"],VDivider:g["a"],VIcon:p["a"],VLabel:_["a"],VList:m["a"],VListGroup:b["a"],VListItem:y["a"],VListItemAvatar:h["a"],VListItemContent:$["a"],VListItemIcon:k["a"],VListItemSubtitle:$["b"],VListItemTitle:$["c"],VSelect:x["a"],VSlider:S["a"],VSwitch:w["a"],VTextField:K["a"]})}}]);
//# sourceMappingURL=config.a0ec59cb.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["playerqueue"],{b097:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",[i("v-tabs",{attrs:{grow:"","show-arrows":""},model:{value:e.activeTab,callback:function(t){e.activeTab=t},expression:"activeTab"}},[i("v-tab",[e._v(" "+e._s(e.$t("queue_next_tracks")+" ("+e.next_items.length+")"))]),i("v-tab-item",[i("v-list",{attrs:{"two-line":""}},[i("RecycleScroller",{staticClass:"scroller",attrs:{items:e.next_items,"item-size":72,"key-field":"queue_item_id","page-mode":""},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.item;return[i("ListviewItem",{attrs:{item:s,hideavatar:3==s.media_type&&e.$store.state.isMobile,hidetracknum:!0,hideproviders:e.$store.state.isMobile,hidelibrary:e.$store.state.isMobile,hidemenu:e.$store.state.isMobile,onclickHandler:e.itemClicked}})]}}])})],1)],1),i("v-tab",[e._v(" "+e._s(e.$t("queue_previous_tracks")+" ("+e.previous_items.length+")"))]),i("v-tab-item",[i("v-list",{attrs:{"two-line":""}},[i("RecycleScroller",{staticClass:"scroller",attrs:{items:e.previous_items,"item-size":72,"key-field":"queue_item_id","page-mode":""},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.item;return[i("ListviewItem",{attrs:{item:s,hideavatar:3==s.media_type&&e.$store.state.isMobile,hidetracknum:!0,hideproviders:e.$store.state.isMobile,hidelibrary:e.$store.state.isMobile,hidemenu:e.$store.state.isMobile,onclickHandler:e.itemClicked}})]}}])})],1)],1),e.getSelectedPlayerQueue?i("v-menu",{attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on;return[e.$store.state.isMobile?e._e():i("v-btn",e._g({staticClass:"align-self-center mr-4",attrs:{text:""}},s),[e._v(" "+e._s(e.$t("queue_options"))+" "),i("v-icon",{attrs:{right:""}},[e._v("arrow_drop_down")])],1),e.$store.state.isMobile?i("v-btn",e._g({staticClass:"align-self-center mr-4",attrs:{icon:""}},s),[i("v-icon",[e._v("settings")])],1):e._e()]}}],null,!1,3897132585)},[i("v-list",[i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("repeat_enabled",{enable_repeat:!e.getSelectedPlayerQueue.repeat_enabled})}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("repeat")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.getSelectedPlayerQueue.repeat_enabled?e.$t("disable_repeat"):e.$t("enable_repeat"))}})],1)],1),i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("shuffle_enabled",{enable_shuffle:!e.getSelectedPlayerQueue.shuffle_enabled})}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("shuffle")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.getSelectedPlayerQueue.shuffle_enabled?e.$t("disable_shuffle"):e.$t("enable_shuffle"))}})],1)],1),i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("clear")}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("clear")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.$t("queue_clear"))}})],1)],1)],1)],1):e._e()],1),i("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.showPlayMenu,callback:function(t){e.showPlayMenu=t},expression:"showPlayMenu"}},[i("v-card",[i("v-subheader",{staticClass:"title"},[e._v(e._s(e.selectedItem.name))]),i("v-list",[i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("play_index/"+e.selectedItem.queue_item_id)}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("play_circle_outline")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.$t("play_now"))}})],1)],1),i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("move",{queue_item_id:e.selectedItem.queue_item_id,pos_shift:0})}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("queue_play_next")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.$t("play_next"))}})],1)],1),i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("move",{queue_item_id:e.selectedItem.queue_item_id,pos_shift:-1})}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("arrow_upward")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.$t("queue_move_up"))}})],1)],1),i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("move",{queue_item_id:e.selectedItem.queue_item_id,pos_shift:1})}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("arrow_downward")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.$t("queue_move_down"))}})],1)],1)],1)],1)],1)],1)},n=[],a=(i("99af"),i("fb6a"),i("96cf"),i("1da1")),u=i("5530"),l=i("2b0e"),o=i("d3cc"),r=i("2f62"),c=l["a"].extend({components:{ListviewItem:o["a"]},props:{},data:function(){return{items:[],activeTab:0,showPlayMenu:!1,selectedItem:{}}},watch:{getSelectedPlayerId:function(e){this.getQueueItems()},curQueueItemId:function(e){this.getQueueItems()}},computed:Object(u["a"])(Object(u["a"])({},Object(r["c"])(["getSelectedPlayerId","getSelectedPlayerQueue"])),{},{next_items:function(){return this.getSelectedPlayerQueue?this.items.slice(this.getSelectedPlayerQueue.cur_index):[]},previous_items:function(){return this.getSelectedPlayerQueue&&this.getSelectedPlayerId?this.items.slice(0,this.getSelectedPlayerQueue.cur_index):[]},curQueueItemId:function(){return this.getSelectedPlayerQueue&&this.getSelectedPlayerQueue.cur_item?this.getSelectedPlayerQueue.cur_item.queue_item_id:null}}),created:function(){this.$store.state.windowTitle=this.$t("queue"),this.getQueueItems(),this.$server.$on("queue items updated",this.getQueueItems)},methods:{itemClicked:function(e){this.selectedItem=e,this.showPlayMenu=!this.showPlayMenu},getQueueItems:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.getSelectedPlayerQueue){t.next=2;break}return t.abrupt("return");case 2:i="players/"+e.getSelectedPlayerQueue.queue_id+"/queue/items",e.$server.sendWsCommand(i,null,function(e){this.items=e}.bind(e));case 4:case"end":return t.stop()}}),t)})))()},sendQueueCommand:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i="players/".concat(this.getSelectedPlayerQueue.queue_id,"/queue/cmd/").concat(e);this.$server.sendWsCommand(i,t)}}}),d=c,m=i("2877"),_=i("6544"),v=i.n(_),p=i("8336"),f=i("b0af"),h=i("169a"),b=i("132d"),y=i("8860"),g=i("da13"),P=i("5d23"),w=i("34c3"),C=i("e449"),x=i("e0c7"),Q=i("71a3"),I=i("c671"),$=i("fe57"),k=Object(m["a"])(d,s,n,!1,null,null,null);t["default"]=k.exports;v()(k,{VBtn:p["a"],VCard:f["a"],VDialog:h["a"],VIcon:b["a"],VList:y["a"],VListItem:g["a"],VListItemContent:P["a"],VListItemIcon:w["a"],VListItemTitle:P["c"],VMenu:C["a"],VSubheader:x["a"],VTab:Q["a"],VTabItem:I["a"],VTabs:$["a"]})}}]);
//# sourceMappingURL=playerqueue.32855085.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["playerqueue"],{b097:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",[i("v-tabs",{attrs:{grow:"","show-arrows":""},model:{value:e.activeTab,callback:function(t){e.activeTab=t},expression:"activeTab"}},[i("v-tab",[e._v(" "+e._s(e.$t("queue_next_tracks")+" ("+e.next_items.length+")"))]),i("v-tab-item",[i("v-list",{attrs:{"two-line":""}},[i("RecycleScroller",{staticClass:"scroller",attrs:{items:e.next_items,"item-size":72,"key-field":"queue_item_id","page-mode":""},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.item;return[i("ListviewItem",{attrs:{item:s,hideavatar:3==s.media_type&&e.$store.state.isMobile,hidetracknum:!0,hideproviders:e.$store.state.isMobile,hidelibrary:e.$store.state.isMobile,hidemenu:e.$store.state.isMobile,onclickHandler:e.itemClicked}})]}}])})],1)],1),i("v-tab",[e._v(" "+e._s(e.$t("queue_previous_tracks")+" ("+e.previous_items.length+")"))]),i("v-tab-item",[i("v-list",{attrs:{"two-line":""}},[i("RecycleScroller",{staticClass:"scroller",attrs:{items:e.previous_items,"item-size":72,"key-field":"queue_item_id","page-mode":""},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.item;return[i("ListviewItem",{attrs:{item:s,hideavatar:3==s.media_type&&e.$store.state.isMobile,hidetracknum:!0,hideproviders:e.$store.state.isMobile,hidelibrary:e.$store.state.isMobile,hidemenu:e.$store.state.isMobile,onclickHandler:e.itemClicked}})]}}])})],1)],1),e.getSelectedPlayerQueue?i("v-menu",{attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on;return[e.$store.state.isMobile?e._e():i("v-btn",e._g({staticClass:"align-self-center mr-4",attrs:{text:""}},s),[e._v(" "+e._s(e.$t("queue_options"))+" "),i("v-icon",{attrs:{right:""}},[e._v("arrow_drop_down")])],1),e.$store.state.isMobile?i("v-btn",e._g({staticClass:"align-self-center mr-4",attrs:{icon:""}},s),[i("v-icon",[e._v("settings")])],1):e._e()]}}],null,!1,3897132585)},[i("v-list",[i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("repeat_enabled",!e.getSelectedPlayerQueue.repeat_enabled)}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("repeat")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.getSelectedPlayerQueue.repeat_enabled?e.$t("disable_repeat"):e.$t("enable_repeat"))}})],1)],1),i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("shuffle_enabled",!e.getSelectedPlayerQueue.shuffle_enabled)}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("shuffle")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.getSelectedPlayerQueue.shuffle_enabled?e.$t("disable_shuffle"):e.$t("enable_shuffle"))}})],1)],1),i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("clear")}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("clear")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.$t("queue_clear"))}})],1)],1)],1)],1):e._e()],1),i("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.showPlayMenu,callback:function(t){e.showPlayMenu=t},expression:"showPlayMenu"}},[i("v-card",[i("v-subheader",{staticClass:"title"},[e._v(e._s(e.selectedItem.name))]),i("v-list",[i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("index",e.selectedItem.queue_item_id)}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("play_circle_outline")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.$t("play_now"))}})],1)],1),i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("next",e.selectedItem.queue_item_id)}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("queue_play_next")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.$t("play_next"))}})],1)],1),i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("move_up",e.selectedItem.queue_item_id)}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("arrow_upward")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.$t("queue_move_up"))}})],1)],1),i("v-list-item",{on:{click:function(t){return e.sendQueueCommand("move_down",e.selectedItem.queue_item_id)}}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:e._s("arrow_downward")}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:e._s(e.$t("queue_move_down"))}})],1)],1)],1)],1)],1)],1)},n=[],a=(i("fb6a"),i("96cf"),i("1da1")),o=i("5530"),l=i("2b0e"),r=i("d3cc"),u=i("2f62"),c=l["a"].extend({components:{ListviewItem:r["a"]},props:{},data:function(){return{items:[],activeTab:0,showPlayMenu:!1,selectedItem:{}}},watch:{getSelectedPlayerQueue:function(e){this.getQueueItems()}},computed:Object(o["a"])(Object(o["a"])({},Object(u["c"])(["getSelectedPlayerQueue"])),{},{next_items:function(){return this.getSelectedPlayerQueue?this.items.slice(this.getSelectedPlayerQueue.cur_index):[]},previous_items:function(){return this.getSelectedPlayerQueue&&this.selectedPlayer?this.items.slice(0,this.getSelectedPlayerQueue.cur_index):[]}}),created:function(){this.$store.state.windowTitle=this.$t("queue"),this.$server.$on("queue items updated",this.getQueueItems),this.getQueueItems()},methods:{itemClicked:function(e){this.selectedItem=e,this.showPlayMenu=!this.showPlayMenu},getQueueItems:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.getSelectedPlayerQueue){t.next=2;break}return t.abrupt("return");case 2:i="players/"+e.getSelectedPlayerQueue.queue_id+"/queue/items",e.$server.sendWsCommand(i,null,function(e){this.items=e}.bind(e));case 4:case"end":return t.stop()}}),t)})))()},sendQueueCommand:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=this.$server.players[this.$store.selectedPlayerId].active_queue,s="players/"+i+"/queue/"+e;this.$server.putData(s,t)}}}),m=c,d=i("2877"),v=i("6544"),_=i.n(v),p=i("8336"),h=i("b0af"),f=i("169a"),b=i("132d"),y=i("8860"),w=i("da13"),P=i("5d23"),g=i("34c3"),x=i("e449"),C=i("e0c7"),$=i("71a3"),k=i("c671"),Q=i("fe57"),I=Object(d["a"])(m,s,n,!1,null,null,null);t["default"]=I.exports;_()(I,{VBtn:p["a"],VCard:h["a"],VDialog:f["a"],VIcon:b["a"],VList:y["a"],VListItem:w["a"],VListItemContent:P["a"],VListItemIcon:g["a"],VListItemTitle:P["c"],VMenu:x["a"],VSubheader:C["a"],VTab:$["a"],VTabItem:k["a"],VTabs:Q["a"]})}}]);
//# sourceMappingURL=playerqueue.551c9874.js.map
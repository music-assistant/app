(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["browse"],{afdd:function(t,i,e){"use strict";var s=e("8336");i["a"]=s["a"]},b210:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("section",[e("ItemsListing",{attrs:{mediatype:t.mediatype,items:t.items}})],1)},a=[],r=e("5530"),n=e("0dac"),c=e("2f62"),o={name:"browse",components:{ItemsListing:n["a"]},props:{mediatype:String,provider:String},data:function(){return{}},created:function(){this.$store.state.windowTitle=this.$t(this.mediatype)},computed:Object(r["a"])(Object(r["a"])({},Object(c["c"])(["getLibraryTracks","getLibraryAlbums","getLibraryArtists","getLibraryPlaylists","getLibraryRadios"])),{},{items:function(){return"tracks"===this.mediatype?this.getLibraryTracks:"albums"===this.mediatype?this.getLibraryAlbums:"artists"===this.mediatype?this.getLibraryArtists:"playlists"===this.mediatype?this.getLibraryPlaylists:"radios"===this.mediatype?this.getLibraryRadios:[]}}),methods:{}},d=o,b=e("2877"),m=Object(b["a"])(d,s,a,!1,null,null,null);i["default"]=m.exports}}]);
//# sourceMappingURL=browse.59cf5edf.js.map
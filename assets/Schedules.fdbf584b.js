var v=Object.defineProperty;var i=Object.getOwnPropertySymbols;var b=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var r=(t,e,a)=>e in t?v(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,m=(t,e)=>{for(var a in e||(e={}))b.call(e,a)&&r(t,a,e[a]);if(i)for(var a of i(e))f.call(e,a)&&r(t,a,e[a]);return t};import{_ as x,V as y,a as T}from"./index.2c62aea5.js";import w from"./EditableTable.74919d12.js";import{d as $,r as u,c as s,e as n,w as p,F as c,o,f as B,t as E,b as V}from"./vendor.83c679c4.js";import"./v4.055dd912.js";const g=$({components:{ViewSelector:y,ViewItem:T,EditableTable:w},data(){return{items:[],columns:[{text:"\u5E74",value:"year",inputType:"number"},{text:"\u6708",value:"month",inputType:"number"},{text:"\u65E5",value:"day",inputType:"number"},{text:"\u6642",value:"hour",inputType:"number"},{text:"\u5206",value:"minute",inputType:"number"},{text:"\u79D2",value:"second",inputType:"number"},{text:"\u9577\u3055",value:"length"},{text:"\u6982\u8981",value:"summary"},{text:"\u958B\u59CB",value:"start",inputType:"datetime-local"},{text:"\u7D42\u4E86",value:"end",inputType:"datetime-local"},{text:"\u5B9A\u7FA9",value:"definition"}]}},mounted(){this.refresh()},methods:{async refresh(){const t=await this.$api.get(this.$route.path);this.items=t.map(e=>m({url:`${this.$route.path}/${e.id}`},e))}}}),j=V("h1",null,"Schedule",-1);function C(t,e,a,S,D,F){const d=u("view-selector"),_=u("editable-table"),l=u("view-item");return o(),s(c,null,[n(d,{items:[{name:"table",scope:"read"}]}),n(l,{name:"table"},{default:p(()=>[n(_,{columns:t.columns},null,8,["columns"])]),_:1}),n(l,null,{default:p(()=>[j,(o(!0),s(c,null,B(t.items,h=>(o(),s("div",null,E(h.title),1))),256))]),_:1})],64)}var q=x(g,[["render",C]]);export{q as default};
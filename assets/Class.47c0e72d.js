import{d as V,r,c,e as u,w as i,F as h,o as p,x as C,f as _,b as t,h as a,l as d,t as $}from"./vendor.83c679c4.js";import{_ as U,V as w,a as k}from"./index.2c62aea5.js";import y from"./EditableTable.74919d12.js";import{T}from"./Table.e5b9d727.js";import"./v4.055dd912.js";const B=V({components:{ViewSelector:w,ViewItem:k,EditableTable:y,Table:T},data(){return{columns:[{text:"\u8B58\u5225\u5B50",value:"id"},{text:"\u540D\u79F0",value:"name"},{text:"\u6559\u5BA4",value:"department",scope:"department"},{text:"\u7D44",value:"class",scope:"class"},{text:"source",value:"source"},{text:"",value:"actions"}],items:[],edits:[],id:void 0}},computed:{scopedColumns(){return this.columns.filter(e=>!e.scope||this.$auth.has(e.scope))},filteredItems(){return this.items.filter(e=>this.scopedColumns.some(n=>!!e[n.value]))}},mounted(){this.refresh()},methods:{async refresh(){this.items=await this.$api.get("class")},async add(){await this.$api.put(`/class/${this.id}`,{}),this.refresh()},cancel(e){const n=this.edits.indexOf(e);n>=0&&this.edits.splice(n,1)},async save(e,n){await this.$api.put(`/class/${e}`,n),this.cancel(e),this.refresh()},async remove(e){await this.$api.delete(`/class/${e}`),this.refresh()}}}),g=["onUpdate:modelValue"],j=["onUpdate:modelValue"],D=["onUpdate:modelValue"],E=["onUpdate:modelValue"],F=["onUpdate:modelValue"],I=["onUpdate:modelValue"],S=["onUpdate:modelValue"],N=["onClick"],z=["onClick"],A=["onClick"],L=["onClick"],M=t("h1",null,"Class",-1);function O(e,n,q,x,G,H){const f=r("view-selector"),v=r("Table"),b=r("editable-table"),m=r("view-item");return p(),c(h,null,[u(f,{items:[{name:"table"}]}),u(m,{name:"table"},{default:i(()=>[u(v,{columns:e.scopedColumns,items:e.filteredItems},C({"header.actions":i(()=>[t("button",{onClick:n[0]||(n[0]=(...l)=>e.refresh&&e.refresh(...l))},"refresh")]),"item.actions":i(({item:l})=>[t("button",{onClick:s=>e.edits.push(l.id)},"edit",8,A),t("button",{onClick:s=>e.remove(l.id)},"remove",8,L)]),tfoot:i(()=>[a(t("input",{"onUpdate:modelValue":n[1]||(n[1]=l=>e.id=l)},null,512),[[d,e.id]]),t("button",{onClick:n[2]||(n[2]=(...l)=>e.add&&e.add(...l))},"add")]),_:2},[_(e.edits,l=>({name:`row.${l}`,fn:i(({item:s})=>[t("tr",null,[t("td",null,[a(t("input",{"onUpdate:modelValue":o=>s.id=o},null,8,g),[[d,s.id,void 0,{lazy:!0}]])]),t("td",null,[a(t("input",{"onUpdate:modelValue":o=>s.name=o},null,8,j),[[d,s.name]])]),t("td",null,[a(t("input",{"onUpdate:modelValue":o=>s.postal_code=o},null,8,D),[[d,s.postal_code]])]),t("td",null,[a(t("input",{"onUpdate:modelValue":o=>s.region=o},null,8,E),[[d,s.region]])]),t("td",null,[a(t("input",{"onUpdate:modelValue":o=>s.locality=o},null,8,F),[[d,s.locality]])]),t("td",null,[a(t("input",{"onUpdate:modelValue":o=>s.street_address=o},null,8,I),[[d,s.street_address]])]),t("td",null,[a(t("input",{"onUpdate:modelValue":o=>s.map_url=o},null,8,S),[[d,s.map_url]])]),t("td",null,[t("button",{onClick:o=>e.save(l,s)},"save",8,N),t("button",{onClick:o=>e.cancel(l)},"cancel",8,z)])])])}))]),1032,["columns","items"]),u(b,{columns:e.scopedColumns},null,8,["columns"])]),_:1}),u(m,null,{default:i(()=>[M,(p(!0),c(h,null,_(e.items,l=>(p(),c("div",null,$(l.name),1))),256))]),_:1})],64)}var W=U(B,[["render",O]]);export{W as default};
import{_ as i}from"./index.2c62aea5.js";import{d as o,c as d,b as a,t as s,j as t,g as n,o as r}from"./vendor.83c679c4.js";const l=o({data(){return{detail:void 0,address:void 0}},mounted(){this.refresh()},watch:{detail(e){"address"in e&&this.getAddress(e.address)}},methods:{async refresh(){this.detail=await this.$api.get(this.$route.path)},async getAddress(e){this.address=await this.$api.get(`/address/${e}`)}}}),h={key:0},u={key:0},p={key:1},c=n(" TEL: "),m=["href"],f=["src"];function _(e,y,g,$,v,k){return e.detail?(r(),d("div",h,[a("div",null,s(e.detail.name),1),e.address?(r(),d("address",u,[a("div",null,"\u3012"+s(e.address.postal_code),1),a("div",null,s(e.address.region)+s(e.address.locality)+s(e.address.street_address),1)])):t("",!0),"phone_number"in e.detail?(r(),d("div",p,[c,a("a",{href:`tel://${e.detail.phone_number}`},s(e.detail.phone_number),9,m)])):t("",!0),e.address&&"map_url"in e.address?(r(),d("iframe",{key:2,src:e.address.map_url,width:"600",height:"450",style:{border:"0"},allowfullscreen:"false",loading:"lazy"},null,8,f)):t("",!0)])):t("",!0)}var j=i(l,[["render",_]]);export{j as default};

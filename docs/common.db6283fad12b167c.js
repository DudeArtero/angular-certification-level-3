"use strict";(self.webpackChunkangular_certification_level_2=self.webpackChunkangular_certification_level_2||[]).push([[592],{8444:(d,_,o)=>{o.d(_,{j:()=>s});var t,n,c,r,e=o(655),i=o(1135),a=o(8256);class s{constructor(){t.add(this),n.set(this,"locations"),c.set(this,new i.X((0,e.Q_)(this,t,"m",r).call(this)))}get locations$(){return(0,e.Q_)(this,c,"f").asObservable()}addLocation(l){let p=(0,e.Q_)(this,t,"m",r).call(this);p.some(m=>m.zipcode===l.zipcode&&m.name===l.name)||(p.push(l),localStorage.setItem((0,e.Q_)(this,n,"f"),JSON.stringify(p)),(0,e.Q_)(this,c,"f").next(p))}getLocation(l,p){return(0,e.Q_)(this,t,"m",r).call(this).find(m=>m.zipcode===l&&m.name===p)}removeLocation(l,p){let u=(0,e.Q_)(this,t,"m",r).call(this).filter(f=>!(f.name===p&&f.zipcode===l));localStorage.setItem((0,e.Q_)(this,n,"f"),JSON.stringify(u)),(0,e.Q_)(this,c,"f").next(u)}}n=new WeakMap,c=new WeakMap,t=new WeakSet,r=function(){return JSON.parse(localStorage.getItem((0,e.Q_)(this,n,"f"))??"[]")??[]},s.\u0275fac=function(l){return new(l||s)},s.\u0275prov=a.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"})},1834:(d,_,o)=>{o.d(_,{F:()=>n});var t,e=o(655),i=o(8256),a=o(529);class n{constructor(r){this.http=r,t.set(this,"0416cc4e2e58897d8eb75c89028fe526")}searchLocation(r,s=""){return this.http.get(`https://api.openweathermap.org/data/2.5/weather?zip=${r},${s}&appid=${(0,e.Q_)(this,t,"f")}`)}searchFiveDayForecast(r,s=""){return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${r},${s}&appid=${(0,e.Q_)(this,t,"f")}`)}}t=new WeakMap,n.\u0275fac=function(r){return new(r||n)(i.LFG(a.eN))},n.\u0275prov=i.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})},2925:(d,_,o)=>{o.d(_,{O:()=>i});var e=o(8256);let i=(()=>{class a{constructor(){}}return a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=e.Xpm({type:a,selectors:[["spinner"]],decls:0,vars:0,template:function(n,c){},styles:['[_nghost-%COMP%]{display:flex;width:64px;height:64px;justify-content:center;align-items:center;margin:0 auto}[_nghost-%COMP%]:after{content:" ";width:100%;height:100%;box-sizing:border-box;display:block;border-radius:50%;border:6px solid rgb(124,124,124);border-color:rgb(118,138,255) transparent rgb(118,138,255) transparent;animation:lds-dual-ring 1.2s linear infinite}@keyframes lds-dual-ring{0%{transform:rotate(0)}to{transform:rotate(360deg)}}']}),a})()},615:(d,_,o)=>{o.d(_,{L:()=>e});class e{constructor(){}static mapLocation(a,t=0,n="US"){return{name:a.name,zipcode:t,countryCode:n}}static mapLocationData(a){return{main:a.weather[0]?.main||"",icon:a.weather[0]?.icon||"",currentTemp:a.main.temp,minTemp:a.main.temp_min,maxTemp:a.main.temp_max}}}},4466:(d,_,o)=>{o.d(_,{m:()=>a});var e=o(6895),i=o(8256);let a=(()=>{class t{}return t.\u0275fac=function(c){return new(c||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[e.ez]}),t})()}}]);
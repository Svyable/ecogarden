/* EcoGarden future farm systems — pure scenario model, not engineering design. */
(function(root){ "use strict";
function num(x,k,min=0,max=Infinity){if(!Number.isFinite(x)||x<min||x>max)throw RangeError(k+" must be between "+min+" and "+max);return x}
function model(o){
const n=(k,a=0,b=Infinity)=>num(o[k],k,a,b);
const acres=n("acres",.05,100),site=acres*43560,field=n("fieldArea",0,site),roof=n("roofArea",0,site),dual=n("dualArea",0,field),roofPanel=n("roofPanel",0,100)/100,dualPanel=n("dualPanel",0,100)/100,watt=n("wattsPerSqft",1,40);
if(roof+field>site+.001)throw RangeError("Roof and field areas exceed the parcel");
const mode=o.mode;if(!["none","roof","dual","both"].includes(mode))throw RangeError("Invalid mode");
const roofKW=["roof","both"].includes(mode)?roof*roofPanel*watt/1000:0,dualKW=["dual","both"].includes(mode)?dual*dualPanel*watt/1000:0,kw=roofKW+dualKW;
const annual=kw*n("specificYield",0,2500),load=n("loadKwh"),self=Math.min(annual*n("selfUse",0,100)/100,load),exported=annual-self;
const value=self*n("retailRate",0,10)+exported*n("exportRate",0,10),solarCap=roofKW*1000*n("roofCost",0,50)+dualKW*1000*n("dualCost",0,50);
const bat=n("batteryKwh",0,100000),batteryCap=bat*n("batteryCost",0,10000),reserve=n("batteryUsable",0,100)/100,critical=n("criticalKw"),hours=critical>0?bat*reserve/critical:null;
const cropRevenue=n("fieldRevenue"),cropDelta=field>0&&dualKW>0?cropRevenue*dual/field*n("cropChange",-100,100)/100:0;
const annualOM=(solarCap+batteryCap)*n("omPct",0,100)/100;
const waterArea=n("catchment",0,site),rain=n("rainInches",0,300),water=waterArea*rain*.623*n("capture",0,100)/100;
const waterCap=n("waterCapital"),otherCap=n("otherCapital"),cap=solarCap+batteryCap+waterCap+otherCap,annualNet=value+cropDelta-annualOM-n("otherAnnual"),cash=n("availableCash"),payback=annualNet>0?cap/annualNet:null;
return {site,roofKW,dualKW,kw,annual,self,exported,value,cropDelta,annualOM,solarCap,batteryCap,waterCap,otherCap,cap,annualNet,cashRemaining:cash-cap,shortfall:Math.max(0,cap-cash),payback,hours,water};
}
const api={model};if(typeof module==="object"&&module.exports)module.exports=api;else root.EcoGardenFuture=api;
})(globalThis);

/* EcoGarden planning tools: deterministic, dependency-free, independently testable. */
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;else root.EcoGardenPlanning=api})(typeof globalThis!=="undefined"?globalThis:this,function(){
"use strict";
function nonnegative(n,name){if(!Number.isFinite(n)||n<0)throw new RangeError(name+" must be a finite nonnegative number");return n}
function pct(n,name,max=100){nonnegative(n,name);if(n>max)throw new RangeError(name+" exceeds "+max);return n/100}
function stress(rows,opening,options){
 if(!Array.isArray(rows)||rows.length!==12||!Number.isFinite(opening))throw new RangeError("Twelve months and finite opening cash required");
 const loss=pct(options.cropLoss,"crop loss"),price=pct(options.priceDrop,"price drop"),input=pct(options.inputIncrease,"input increase",300),labor=pct(options.laborIncrease,"labor increase",300),shock=nonnegative(options.shock,"shock");
 if(!Number.isInteger(options.shockMonth)||options.shockMonth<0||options.shockMonth>11)throw new RangeError("Invalid shock month");
 let cash=opening,min=cash,baseCash=opening,baseMin=opening,annualSales=0,annualNet=0,baseNet=0;
 const months=rows.map((r,i)=>{
  for(const k of ["sales","input","labor","fixed"])nonnegative(r[k],k);
  const sales=r.sales*(1-loss)*(1-price),variable=r.input*(1+input),wages=r.labor*(1+labor),fixed=r.fixed,oneOff=i===options.shockMonth?shock:0,net=sales-variable-wages-fixed-oneOff,baseline=r.sales-r.input-r.labor-r.fixed;
  cash+=net;baseCash+=baseline;min=Math.min(min,cash);baseMin=Math.min(baseMin,baseCash);annualSales+=sales;annualNet+=net;baseNet+=baseline;
  return {month:r.m,sales,variable,wages,fixed,oneOff,net,cash,baselineCash:baseCash};
 });
 return {months,annualSales,annualNet,baseNet,closingCash:cash,minimumCash:min,baselineMinimumCash:baseMin,additionalFunding:Math.max(0,-min),firstShortfall:opening<0?"Before planting":months.find(m=>m.cash<0)?.month||null};
}
function irrigation({fieldArea,protectedArea,weeklyInches,weeks,rainInches,rainCapture,efficiency}){
 for(const [k,v] of Object.entries({fieldArea,protectedArea,weeklyInches,weeks,rainInches}))nonnegative(v,k);
 const capture=pct(rainCapture,"effective rain"),eff=pct(efficiency,"application efficiency");
 if(eff<=0)throw new RangeError("Efficiency must be positive");
 const target=weeklyInches*weeks,credit=Math.min(target,rainInches*capture),outdoor=fieldArea*Math.max(0,target-credit)*.623/eff,protectedGallons=protectedArea*target*.623/eff;
 return {targetInches:target,effectiveRainInches:credit,outdoor,protected:protectedGallons,total:outdoor+protectedGallons,averageDaily:weeks>0?(outdoor+protectedGallons)/(weeks*7):0};
}
function capacity(rows,weeklyHours){nonnegative(weeklyHours,"weekly capacity");if(!Array.isArray(rows)||rows.length!==12)throw new RangeError("Twelve months required");const days=[31,28,31,30,31,30,31,31,30,31,30,31];let total=0;const months=rows.map((r,i)=>{let hours=nonnegative(r.hours,"labor hours"),available=weeklyHours*days[i]/7,shortfall=Math.max(0,hours-available);total+=shortfall;return {month:r.m,hours,available,shortfall}});return {months,totalShortfall:total,peak:months.reduce((a,b)=>b.hours>a.hours?b:a,months[0])}}
return Object.freeze({stress,irrigation,capacity});
});

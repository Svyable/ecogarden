const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const planning=require("../planning-tools.js");
const root=path.join(__dirname,"..");
const rows=Array.from({length:12},(_,i)=>({m:String(i+1),sales:1000,input:200,labor:300,fixed:100,hours:40}));
const base={cropLoss:0,priceDrop:0,inputIncrease:0,laborIncrease:0,shock:0,shockMonth:0};
test("zero shock reconciles base cash",()=>{const s=planning.stress(rows,500,base);assert.equal(s.annualNet,4800);assert.equal(s.closingCash,5300);assert.equal(s.additionalFunding,0);assert.equal(s.firstShortfall,null)});
test("loss and price multiply, emergency charged exactly once",()=>{const s=planning.stress(rows,500,{...base,cropLoss:50,priceDrop:20,inputIncrease:25,shock:1000,shockMonth:2});assert.equal(s.annualSales,4800);assert.equal(s.annualNet,-4000);assert.equal(s.closingCash,-3500);assert.equal(s.months.filter(m=>m.oneOff).length,1);assert.equal(s.firstShortfall,"3")});
test("unfunded startup is recognized even if cash later recovers",()=>{let s=planning.stress(rows,-100,base);assert.equal(s.additionalFunding,100);assert.equal(s.firstShortfall,"Before planting")});
test("rain credits only outdoor beds, not protected cultivation",()=>{let s=planning.irrigation({fieldArea:1000,protectedArea:1000,weeklyInches:1,weeks:4,rainInches:4,rainCapture:100,efficiency:100});assert.equal(s.outdoor,0);assert.equal(s.protected,2492);assert.equal(s.total,2492)});
test("irrigation rejects zero efficiency and negative area",()=>{const p={fieldArea:100,protectedArea:0,weeklyInches:1,weeks:4,rainInches:0,rainCapture:100,efficiency:0};assert.throws(()=>planning.irrigation(p),RangeError);assert.throws(()=>planning.irrigation({...p,efficiency:80,fieldArea:-1}),RangeError)});
test("labor shortfalls cannot be offset by spare hours in another month",()=>{const r=rows.map((m,i)=>({...m,hours:i===0?300:0})),s=planning.capacity(r,40);assert.equal(s.peak.month,"1");assert.ok(s.totalShortfall>120);assert.equal(planning.capacity(rows,0).totalShortfall,480)});
const html=fs.readFileSync(path.join(root,"generator.html"),"utf8");
const script=html.match(/<script>\s*("use strict";[\s\S]*?)<\/script>/)?.[1];
test("generator script parses and imports planning tools",()=>{assert.ok(script);new vm.Script(script);assert.match(html,/src="planning-tools\.js"/)});
function between(start,end){const a=script.indexOf(start),b=script.indexOf(end,a);assert.ok(a>=0&&b>a,"missing model section "+start);return script.slice(a,b)}
test("area, exclusion, startup cap, monthly cash and seasonal SVG across six profiles",()=>{
 const code=between("const crops=","const e=id")+between("const mons=","function renderYearMap")+between("function phaseBuildout","const generateBase=generate")+between("const fullMonths=","function drawWorld()")+String.raw`
 const vals={coverCost:180,extraCost:0,stage:"first"};
 const e=id=>({value:vals[id]}),fmt=n=>Math.round(n).toString();
 let config;const f={acres:1,aspect:1,zone:7,climate:"temperate",soil:"loam",drain:"good",ph:6.5,sun:8,frost:175,water:"yes",beds:"field",cover:"tunnel",coverPct:25,categories:["herbs","produce","fruit","flowers"],exclude:[],animals:{},goal:"random",seed:73,diversity:4,sell:80,wage:24,rent:6000,overhead:7000,regenShare:20,budgetMode:"on",buildoutLimit:0,landPurchase:0,extraCap:0,cashReserve:5000,openingCash:25000,buildPct:100,buildPriority:"field"};
 let checked=0;
 for(const c of [f,{...f,acres:.05,aspect:.5},{...f,acres:5,aspect:2,animals:{chickens:20,bees:2},openingCash:150000},{...f,exclude:crops.map(c=>c[0])},{...f,openingCash:0},{...f,climate:"hot",zone:9,beds:"raised",exclude:["lavender","basil"]}]){
 config=c;const r=phaseBuildout(generate(c,crops,animals),c);if(r.budget.active&&!r.budget.unfunded&&r.budget.planned>r.budget.limit+.001)throw Error("capital cap exceeded");
 let opening=c.openingCash-(r.cap||0);
 for(let year=1;year<=10;year++){const b=rotation(r.blocks,c,year);if(b.reduce((s,x)=>s+x.area,0)!==r.area||b.some(x=>x.crop&&c.exclude.includes(x.crop[0])))throw Error("land or exclusion failure");const a=makeBudget(b,year,opening,r.cap||0);if(Math.abs(a.cash-opening-a.net)>.001||a.rows.length!==12||!Number.isFinite(a.net))throw Error("cash reconciliation failure");opening=a.cash;
 if([1,5,10].includes(year))for(const m of [0,3,6,9])for(const mode of ["iso","aerial","build"])for(const light of ["day","gold","night"]){const svg=worldSVG(b,year,m,mode,light,a.rows[m].cl,0,c);if(!svg.startsWith("<svg")||!svg.endsWith("</svg>")||/NaN|Infinity|undefined/.test(svg))throw Error("invalid SVG");checked++}
 }}
 return checked;
 `;
 assert.equal(new Function(code)(),648);
});

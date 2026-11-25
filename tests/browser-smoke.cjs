const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const {pathToFileURL}=require("node:url");
const path=require("node:path");
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on("pageerror",err=>errors.push(String(err)));
 const url=pathToFileURL(path.join(__dirname,"..","generator.html")).href;
 await page.goto(url);await page.locator("#worldCanvas svg").waitFor();
 assert.equal(await page.locator("#worldMonths button").count(),12);
 assert.ok(await page.locator("#riskMetrics").innerText().then(s=>s.includes("Stressed crop sales")));
 assert.ok(await page.locator("#waterMetrics").innerText().then(s=>s.includes("Monthly irrigation")));
 await page.locator("#worldMonths button").nth(0).click();assert.match(await page.locator("#worldMonthLabel").innerText(),/January/);
 await page.locator("#worldView").selectOption("aerial");assert.equal(await page.locator("#worldCanvas svg").count(),1);
 await page.locator("#worldYears button").nth(1).click();assert.match(await page.locator("#worldMonthLabel").innerText(),/Year 2/);
 await page.locator("#riskBase").click();assert.match(await page.locator("#riskMetrics").innerText(),/Difference from base/);
 await page.locator("#riskSevere").click();assert.match(await page.locator("#riskMetrics").innerText(),/Additional funding/);
 await page.locator("#waterTarget").fill("2");assert.match(await page.locator("#waterMetrics").innerText(),/Monthly irrigation/);
 await page.locator("#surpriseNewEngland").click();assert.match(await page.locator("#profileStatus").innerText(),/hypothetical acres/);
 await page.locator("#cash").fill("0");await page.locator("#budgetMode").selectOption("on");await page.locator("#form button[type=submit]").click();assert.match(await page.locator("#buildNote").innerText(),/not feasible/);
 assert.deepEqual(errors,[]);
 await page.setViewportSize({width:390,height:844});await page.reload();await page.locator("#worldCanvas svg").waitFor();
 assert.equal(await page.locator("#worldCanvas svg").count(),1);assert.deepEqual(errors,[]);
 console.log("Desktop and mobile browser smoke checks passed");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

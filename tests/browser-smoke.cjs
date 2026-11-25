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
 await page.goto(pathToFileURL(path.join(__dirname,"..","index.html")).href);
 await page.locator("#heroArt svg").waitFor();
 await page.locator("#launchSeasons button").nth(3).click();
 assert.match(await page.locator("#launchSeasonLabel").innerText(),/Winter/i);
 await page.goto(url);await page.locator("#worldCanvas svg").waitFor();
 assert.equal(await page.locator("#evidenceYields tr").count(),4);
 await page.locator("#regionalYields").click();
 assert.match(await page.locator("#yieldStatus").innerText(),/Applied USDA/i);
 assert.ok(Math.abs(Number(await page.locator("#yield-tomatoes").inputValue())-297.16)<.01);
 
 assert.equal(await page.locator("#worldMonths button").count(),12);
 assert.ok(await page.locator("#riskMetrics").innerText().then(s=>s.includes("Stressed crop sales")));
 assert.ok(await page.locator("#waterMetrics").innerText().then(s=>s.includes("Monthly irrigation")));
 await page.locator("#worldMonths button").nth(0).click();assert.match(await page.locator("#worldMonthLabel").innerText(),/January/i);
 await page.locator("#worldView").selectOption("aerial");assert.equal(await page.locator("#worldCanvas svg").count(),1);
 await page.locator("#worldYears button").nth(1).click();assert.match(await page.locator("#worldMonthLabel").innerText(),/Year 2/i);
 await page.locator("#riskBase").click();assert.match(await page.locator("#riskMetrics").innerText(),/Difference from base/);
 await page.locator("#riskSevere").click();assert.match(await page.locator("#riskMetrics").innerText(),/Additional funding/);
 await page.locator("#waterTarget").fill("2");assert.match(await page.locator("#waterMetrics").innerText(),/Monthly irrigation/);
 await page.locator("#surpriseNewEngland").click();assert.match(await page.locator("#profileStatus").innerText(),/hypothetical acres/);
 await page.locator("#cash").fill("0");await page.locator("#budgetMode").selectOption("on");await page.locator("#form button[type=submit]").click();assert.match(await page.locator("#buildNote").innerText(),/not feasible/);
 assert.deepEqual(errors,[]);
 await page.setViewportSize({width:390,height:844});await page.reload();await page.locator("#worldCanvas svg").waitFor();
 assert.equal(await page.locator("#worldCanvas svg").count(),1);assert.deepEqual(errors,[]);
 await page.goto(pathToFileURL(path.join(__dirname,"..","future.html")).href);
 await page.locator("#art svg").waitFor();
 assert.match(await page.locator("#metrics").innerText(),/Annual generation/i);
 await page.locator('[data-preset="both"]').click();
 assert.match(await page.locator("#water").innerText(),/Battery runtime/i);
 await page.locator("#dualArea").fill("1000000");
 assert.match(await page.locator("#warning").innerText(),/dualArea/i);
 assert.deepEqual(errors,[]);
 console.log("Desktop and mobile browser smoke checks passed");
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

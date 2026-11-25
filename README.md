# EcoGarden

One-acre farm-development atlas for coastal New England. A dependency-free, mobile-responsive GitHub Pages site with five editable enterprise scenarios, four seasonal illustrations per concept, area-scaled diagrams, and a cross-plan base-case comparison.

## Publish

Open [index.html](index.html) locally in a modern browser. In GitHub, go to Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save. The expected project URL is https://svyable.github.io/ecogarden/ once deployment succeeds. No API keys, build steps, external artwork or dependencies required.

## Base case (illustrative USD)

| Blueprint | Sales | Operating surplus | Startup capital |
|---|---:|---:|---:|
| Lavender Estate | 80,000 | 11,310 | 38,000 |
| Chef’s Garden | 79,360 | 395 | 52,000 |
| Flower & Herb Farm | 92,880 | 130 | 47,000 |
| Coastal Market Garden | 92,840 | -6,230 | 46,000 |
| Four-Season Acre | 96,800 | -11,460 | 89,000 |

Each parcel is 198 × 220 ft (43,560 sq ft). The 20-ft service spine occupies 4,400 sq ft. Blocks are scaled by area and include internal paths. Tunnel envelopes, clearances and orientation need parcel-specific engineering and survey review. Seasonal scenes are original SVG illustrations, not photographs or architectural renderings.

The calculator models 80% base sell-through, labor at $24/hour, $6,000 annual land cost, overhead, direct unit costs and a 10% capital reserve. Excludes purchase of land, taxes, interest, major utilities and abnormal site works. Mature-year assumptions are not verified yields, prices or forecasts. The first version compares fixed conceptual layouts; it does not solve a constrained optimization problem. Validate soil, water, zoning, price, yield, buyer commitments, actual labor and construction costs before investing. One acre does not automatically qualify for Massachusetts agricultural zoning protections.

The website provides source links, scenario presets, CSV export and a printable layout.

## Farm design studio

Open [generator.html](generator.html) from the homepage. Set parcel size and shape, climate, hardiness zone, frost-free days, soil, drainage, pH, sun and irrigation; include or exclude crop categories and specific crops; reserve space for livestock, raised beds and protected growing. The seeded generator supports repeatable layouts and comparison of 24 alternatives. Customize mature-year harvest units, selling price, direct input costs and labor per 1,000 net planted square feet. Export or restore a blueprint JSON and export land, monthly and multiyear CSV schedules.

The studio supports 1–10 years of block-by-block rotation and cover crops, fixed perennial and infrastructure areas, adjustable habitat/rotation reserve, first-year establishment assumptions, annual cash flow and selectable monthly schedules for each year. Baseline soil organic matter and infiltration fields record observations only; no simulated improvement or guaranteed carbon gains. Regenerative guidance: [NRCS soil health for small-scale agriculture](https://www.nrcs.usda.gov/conservation-basics/soil/soil-health/soil-health-and-small-scale-agriculture).

Optional location lookups use Zippopotam.us (US ZIP centroids), [Open-Meteo historical reanalysis](https://open-meteo.com/en/docs/historical-weather-api) (2021–2025 sample) and OpenStreetMap Overpass (named farm, farm-shop, marketplace and greengrocer listings). These services require network access, have usage limits and may fail; manual mode remains available. Review their usage terms before commercial deployment. Nearby listings are leads, not verified competitors or buyers, and distances are straight-line. Use [USDA local food directories](https://www.ams.usda.gov/services/local-regional/food-directories-listings) for independent confirmation. Location lookup is initiated by the user.

The generator is a heuristic, not a mathematical optimizer, engineering plan, agronomic prescription or livestock stocking calculator. Animal revenue is excluded; enter additional expenses and infrastructure allowances. Heated greenhouse energy and site-specific costs are not inferred. Annual financial outputs are flat-dollar assumptions, not forecasts. Browser and live third-party endpoint testing remain necessary before public launch.

## Starting capital and surprise farms

The optional buildout cap uses the lesser of an explicit spend limit and available starting cash after upfront land acquisition and the launch reserve. Users can prioritize field beds, protected growing or a proportional mix and cap the first-year crop area. Unfunded acreage is reserved and does not generate sales; no later expansion is automatically financed. Basic service infrastructure and additional startup allowances are budgeted before crop construction. Monthly cash flow deducts optional land acquisition separately and may still reveal operating deficits. Livestock allowances, actual utility work and other site costs must be supplied by the user.

The homepage offers a one-click New England surprise farm; the studio also supports eight regional profiles across the US. ZIP, estimated hardiness zone and climate profile are coherent regional starting assumptions, not validated parcel observations. Soil, water, acreage and available capital are simulated. Users may refine the location with historical weather, enter an actual listing URL and acreage manually, and use official USDA soil and zone resources. No Zillow/Redfin scraping, live inventory integration, or guarantee of listing availability. Example Westport and Tiverton land links are research starting points, not the generated parcel itself.

Budget regression check: 21 combinations of seven starting cash amounts and three build priorities on a one-acre case conserved all 43,560 ft² and stayed within the cap whenever the base service/extra-cost requirement was feasible. JavaScript syntax compilation passed; live browser testing and deployment verification remain outstanding.


## Living farm atlas

The generator now opens with an original interactive procedural farm visualization: isometric, aerial and pre-construction views, daylight/golden-hour/moonlight palettes, month-by-month playback and selectable years. Each depicted block comes from the chosen year’s acreage allocation, with selectable land-use detail, harvest windows, modeled monthly sales/costs/cash, and farmer tasks. The atlas can expand and export an SVG. The monthly cash-flow chart and multiyear land-allocation chart derive from the existing financial and rotation models. Art is illustrative, not a photorealistic reconstruction, surveyed landscape, actual weather forecast or buildable structure plan; the pre-construction view leaves the planned financial scenario unchanged.

Visual-model regression check: 648 SVG renders across six configurations (including tiny, mixed-livestock, excluded-crop, zero-budget and hot-climate examples), three years, four months, three view modes and three lighting modes passed area and finite-output checks. JavaScript syntax compiled; complete browser and live Pages testing remain outstanding.


## Resilience and operational capacity

The studio includes deterministic stress testing for the selected year (saleable harvest losses, price reductions, input and labor inflation, and a one-off emergency expense), with baseline/stressed cash traces and CSV export. It also includes monthly irrigation sizing from editable water targets, net planted area, rain credit, and application efficiency; protected crops receive no rainfall credit. Storage sizing is illustrative. The crop labor chart compares each month's modeled hours against user-entered weekly capacity; it does not assume spare hours can be transferred between months. No crop-specific water recommendations, water-source capacity, animal water/labor, or probability of adverse scenarios are implied.

## Verification

Run `node --test tests/planning.test.cjs` with Node 22. For browser tests, run `npm install --no-save --no-package-lock playwright`, `npx playwright install chromium`, then `node tests/browser-smoke.cjs`. The GitHub Actions workflow runs both suites on pushes and pull requests. Eight deterministic test cases passed in a connector-side JavaScript test harness, including 648 seasonal SVG checks and six ten-year model scenarios; actual GitHub Actions and browser results are not yet verified. No third-party climate/market requests are made by the smoke tests.

Development sequence: maintain automated model/browser checks first; then improve operational realism (crop-specific water/soil data, weekly tasks, livestock accounting), followed by parcel geometry, validated land and market sources, and constrained multi-year investment planning. Keep every financial and agronomic assumption explicit.

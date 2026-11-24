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

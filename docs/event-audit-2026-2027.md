# Event audit — 2026 baseline and 2027 planning

Audit snapshot: 27 November 2026.

## 1. Purpose and scope

This document is the consolidated record of two audits:

- the 2026 schedule review, including source comparisons and decisions about dates, recurrence, hours and venues;
- the audit of 58 generated date-specific Chiswick Calendar URLs and the replacement of unstable destinations with stable event pages.

The audit distinguishes confirmed organiser-published information from recurring patterns carried forward for planning. A recurring pattern does not, by itself, confirm every 2027 date. The public calendar year remains controlled by `ACTIVE_YEAR`; this audit does not activate 2027.

## 2. Recurring-event exclusion model

The annual schedule uses one `exclude` object for exceptions to recurring events:

```js
exclude: {
  months: [1],                 // 1–12; 1 is January
  dates: ["2026-12-06"]        // exact local calendar dates, YYYY-MM-DD
}
```

- `months` and `dates` are optional arrays; an omitted array means no exclusions at that granularity.
- Month numbers are one-based, matching `overridesByMonth` and ordinary calendar notation.
- Date exclusions must be real calendar dates in `YYYY-MM-DD` form.
- The event engine validates the object shape, supported keys, month range and date values before applying exclusions.
- The same rules apply to monthly and weekly recurring events. This keeps the exception mechanism independent of recurrence frequency.

This replaces the separate `skipMonths` and `skipDates` properties. Keeping two typed arrays inside one object is clearer than a flat list of tagged exception records: month-wide and date-specific exclusions remain easy to scan, while validation and future extension have one namespace. The old fields were internal annual-data details, not a public API; all in-repository schedules and tests are migrated together, so no compatibility shim is retained. Individual one-off events are still represented in `individualEvents`, not as recurring exclusions.

## 3. Schedule discrepancy decisions

The following decisions were applied to the calendar after comparing the available sources.

| # | Event | Selected source | Decision applied |
|---:|---|---|---|
| 1 | Flower Market normal winter hours | Official Flower Market calendar | Use 09:30–15:30 from October through April. |
| 2 | Flower Market 4 October 2026 listing | Chiswick Calendar dated listing, consistent with the official calendar | Retain 09:30–15:30. |
| 3 | Flower Market 6 December 2026 | Official Flower Market homepage | Apply a one-date exception of 09:00–15:30 for the Christmas Market; do not change normal winter hours. |
| 4 | Flower Market permitted trading hours | Official advertised visitor hours | Use public visitor hours, not the council's broader permitted trading window. |
| 5–6 | Duck Pond festive weekends and weekdays | Duck Pond individual listings | Use 10:00–15:00 for all eight published dates, 5–6 and 19–24 December. This prefers the organiser's individual event listings over the venue's blanket 10:00–16:00 Christmas programme. |
| 7 | Open Art Spaces August | Organiser's August update | Replace the unsupported 30 August entry with the announced 2 August Chiswick Flower Market collaboration. |
| 8 | Open Art Spaces November | Organiser's November update | Add the announced 1 November Chiswick Flower Market collaboration. |
| 9 | Flower Market January recurrence | Official Flower Market calendar | Keep the January exclusion in both annual schedules. |

## 4. Event schedule findings

| Event | Recurrence / dates checked | Hours and location | 2027 status / action |
|---|---|---|---|
| Chiswick Flower Market | First Sunday monthly except January. | Summer (May–September) 09:00–16:00; normal winter (October–April) 09:30–15:30. The 6 December 2026 Christmas Market has a date-specific 09:00–15:30 exception. | Recurrence carried forward provisionally; recheck 2027 hours when published. |
| Duck Pond Market | First Sunday monthly, plus festive dates 5, 6, 19, 20, 21, 22, 23 and 24 December 2026. The normal recurring 6 December entry is suppressed and replaced by one individual festive entry. | Regular market 10:00–16:00. Festive listings use 10:00–15:00, Chiswick House & Gardens. | Festive dates are 2026 only. Confirm any future programme independently. |
| Chiswick Car Boot Sale | First Sunday monthly except January; organiser publishes 6 December 2026 and 7 February, 7 March and 4 April 2027. | 06:30–12:30, Chiswick School. | Recurrence and January exception match code; published early-2027 dates support the recurrence. |
| Chiswick Antiques & Vintage Market | Second Sunday monthly; checked 8 November 2026 listing. | 09:00–15:00, Old Market Place / south side of High Road. | Recurrence carried forward provisionally. |
| Chiswick Cheese Market | Third Sunday monthly; official site lists all 2026 monthly dates. | 09:30–15:00, Old Market Place. | Recurrence carried forward provisionally. |
| FoodSt | Fourth Sunday monthly; checked October and December 2026 listings. | 11:00–16:00, Old Market Place. | Recurrence carried forward provisionally. |
| The Food Market | Weekly Sunday market; checked official site and location page. | 10:00–14:00, Pavilion, Market Drive, Chiswick W4 2RX. | The organiser's trader application states that the market trades every week except Easter Sunday and the Sunday after Christmas. Exclude Easter Sunday, 28 March 2027, under that standing policy. |
| Acton Makers Market | Your Acton BID page lists 18 April, 20 June, 19 September and 12 December 2026; no 2027 dates found. | 10:00–16:30, Churchfield Road, Acton W3 6AY. Dates subject to change. | Do not invent 2027 dates. |
| Open Art Spaces | Organiser updates support Chiswick collaborations on 29 March, 31 May, 2 August, 1 November and 29 November 2026. The unsupported 30 August entry has been removed. | 11:00–16:00, Chiswick High Road / Flower Market collaboration dates as announced. | No 2027 dates found; do not invent. |
| W4 Art & Design Winter Fair | Official site confirms 20 and 21 November 2026. | 20 November 18:00–21:00; 21 November 10:30–18:00; Christchurch Acton Green, South Parade, Chiswick W4 5LG. | No 2027 dates found; do not invent. |

## 5. 2026 event-link audit

### 5.1 Generated date-specific URLs checked

The 2026 schedule generated 58 date-specific Chiswick Calendar URLs for recurring events. The links were generated from the actual 2026 recurrence rules and checked against the live site.

| Event | Generated 2026 links |
|---|---:|
| Chiswick Flower Market | 11 |
| Duck Pond Market (regular first-Sunday dates) | 11 |
| Chiswick Antiques & Vintage Market | 12 |
| Chiswick Cheese Market | 12 |
| FoodSt | 12 |
| **Total** | **58** |

A material issue was found: old date-specific listings are not dependable permanent destinations. Some resolve to a later occurrence of the same event rather than the date encoded in the URL.

| Event | Generated URL date | Date shown after resolution |
|---|---|---|
| Flower Market | 1 February 2026 | 1 November 2026 |
| Antiques | 8 March 2026 | 8 November 2026 |
| FoodSt | 26 April 2026 | 22 November 2026 |

Other checked URLs still returned their requested date, while some older pages returned no readable page content through the audit browser. The date suffix therefore does not guarantee that a listing will remain available for that exact date; links can silently lead to another occurrence.

No 2026 schedule entry was found to contain a hard-coded 2027 event URL. The two W4 Winter Fair links were explicitly dated 2026 URLs and were replaced with the organiser's stable event page.

### 5.2 Stable event destinations now used

The shared event catalogue uses stable, non-date-specific destinations. Annual schedule entries do not need to repeat the same URL for Duck Pond festive dates or the two Winter Fair sessions.

| Event | Link now used | Source / reason |
|---|---|---|
| Chiswick Flower Market | https://chiswickflowermarket.com/calendar/ | Official organiser calendar; lists recurring dates and seasonal visitor hours. |
| Duck Pond Market | https://duckpondmarket.com/chiswick | Official organiser's Chiswick location page. |
| Chiswick Antiques & Vintage Market | https://chiswickcalendar.co.uk/this-is-chiswick/places/chiswick-antiques-vintage-market/ | Stable Chiswick Calendar market profile; dated listings are not reliable permanent links. |
| Chiswick Cheese Market | https://www.chiswickcheesemarket.uk/ | Official organiser site, with recurring information and 2026 dates. |
| FoodSt | https://www.foodst.co.uk/ | Official Food St website. |
| The Food Market | https://thefoodmarketchiswick.com/ | Existing official organiser site; retained. |
| Chiswick Car Boot Sale | https://chiswickcarbootsale.com/ | Existing official organiser site; retained. |
| Your Acton Maker's Market | https://www.youractonbid.co.uk/your-acton-makers-market/ | Existing official BID event page; retained. |
| Open Art Spaces | https://www.openartspaces.co.uk/market | Existing official organiser market page; retained. |
| W4 Art & Design Winter Fair | https://www.w4artanddesign.co.uk/ | Official organiser page confirms the 20–21 November 2026 event; replaces both dated Chiswick Calendar URLs. |

All ten destinations in the table were opened successfully during the link audit. The eight Duck Pond festive dates use the official Chiswick location page and retain their individual 10:00–15:00 time overrides. The two Winter Fair sessions remain separate dates and times but use the same stable organiser page.

### 5.3 Link policy

- Prefer a stable organiser page or market profile for recurring events.
- Use a date-specific listing only for a genuinely one-off event when no stable event page exists and the dated page has been verified.
- Do not automatically append a date to a recurring event URL. A URL pattern is not evidence that the corresponding page exists or will remain available.
- When auditing links, check where the page resolves, not merely whether the URL returns a successful response.

## 6. Source register

The following sources informed the schedule and link decisions. The link audit's stable-destination table in section 5.2 records the destinations currently used by the calendar.

- Flower Market official calendar: https://chiswickflowermarket.com/calendar/
- Flower Market visitor FAQ: https://chiswickflowermarket.com/frequently-asked-questions-visitors/
- Flower Market dated October listing: https://chiswickcalendar.co.uk/event/chiswick-flower-market-old-market-place/2026-10-04/
- Flower Market official homepage: https://chiswickflowermarket.com/
- Duck Pond official market page: https://duckpondmarket.com/chiswick
- Chiswick House Christmas programme: https://www.chiswickhouseandgardens.org.uk/whats-on/christmas/
- Chiswick Car Boot Sale official site: https://chiswickcarbootsale.com/home
- Chiswick Cheese Market visitor information: https://www.chiswickcheesemarket.uk/visit-us/
- The Food Market official site: https://thefoodmarketchiswick.com/
- The Food Market organiser's trader application (weekly trading exception policy): https://www.surveymonkey.com/r/FoodMarketChiswick
- Your Acton BID Makers Market: https://www.youractonbid.co.uk/your-acton-makers-market/
- Open Art Spaces market: https://www.openartspaces.co.uk/market
- W4 Art & Design: https://www.w4artanddesign.co.uk/

## 7. Outstanding checks and confidence

1. Recheck date-specific event pages and links when 2027 dates are announced. A recurring URL pattern is not proof that a future page has been published.
2. Treat all carried-forward 2027 recurring schedules as provisional until organisers confirm them.
3. The Duck Pond festive dates and selected 10:00–15:00 hours are based on the organiser's individual listings; the venue's blanket 10:00–16:00 Christmas programme remains a conflicting source.
4. No 2027 dates were found for Acton Makers Market, Open Art Spaces or W4 Art & Design Winter Fair at the time of this audit; do not invent them.

The audit records the selected source for each discrepancy rather than implying that all sources agree. It is a dated snapshot and should be updated when organisers publish new information.

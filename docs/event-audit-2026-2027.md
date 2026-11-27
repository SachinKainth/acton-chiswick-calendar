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
| 5–6 | Duck Pond Christmas Market dates, hours and identity | Duck Pond individual listings, organiser poster reported by Chiswick Today, and Chiswick House programme | Treat 5–6 and 19–24 December as eight advertised Christmas-market dates. The 6 December date coincides with the regular first-Sunday Duck Pond Market: it is that month's regular occurrence presented as the Christmas edition, not an additional event. The other seven dates are additional festive-market dates. Chiswick House's festive programme also includes 1 November 2026, which coincides with the regular first-Sunday market; the calendar currently labels 1 November as the regular Duck Pond Market. The organiser's individual event listings and its Chiswick Christmas booking note both specify 10:00–15:00 on all eight dates. Chiswick House's programme and the organiser poster reported by Chiswick Today instead show 10:00–16:00 on the four weekend dates and 10:00–15:00 on 21–24 December. Retain 10:00–15:00: the organiser's specific event listings and booking note are the more direct operational evidence. Record the conflicting weekend information as unresolved rather than silently treating it as settled. Give the Christmas Market its own colour. |
| 7 | Open Art Spaces August | Organiser's August update | Replace the unsupported 30 August entry with the announced 2 August Chiswick Flower Market collaboration. |
| 8 | Open Art Spaces November | Organiser's November update | Add the announced 1 November Chiswick Flower Market collaboration. |
| 9 | Flower Market January recurrence | Official Flower Market calendar | Keep the January exclusion in both annual schedules. |

## 4. Event schedule findings

| Event | Recurrence / dates checked | Hours and location | 2027 status / action |
|---|---|---|---|
| Chiswick Flower Market | First Sunday monthly except January; the organiser's calendar states this standing rule and seasonal hours. | Summer (May–September) 09:00–16:00; normal winter (October–April) 09:30–15:30. The 6 December 2026 Christmas Market has a date-specific 09:00–15:30 exception. | Standing recurrence and hours are confirmed; the official calendar has not yet listed individual 2027 dates. The trader FAQ already publishes 2027 pitch fees, indicating 2027 planning. |
| Duck Pond Market | First Sunday monthly; the organiser's Chiswick page states this standing recurrence. The regular first-Sunday market is distinct from the separately advertised 2026 Christmas Market. | Regular market 10:00–16:00, Chiswick House & Gardens. | Standing recurrence and normal hours are published, but no individual 2027 dates are listed. Check for 2027 date-specific changes and venue movements before treating every occurrence as final. |
| Duck Pond Christmas Market | Eight advertised Christmas-market dates: 5–6 and 19–24 December 2026. The 6 December date overlaps the regular first-Sunday market and is its Christmas edition, not an additional occurrence; the other seven dates are additional festive dates. Chiswick House's festive programme also includes 1 November, which is the regular first-Sunday occurrence and remains labelled Duck Pond Market in the calendar. | Chiswick House & Gardens. The organiser's individual event listings and its Chiswick Christmas booking note both specify 10:00–15:00 on all eight dates; the calendar retains those hours. | Modelled as a separate event with its own name and colour. Weekend hours conflict: Chiswick House's programme and the organiser poster reported by Chiswick Today say 10:00–16:00 on 5–6 and 19–20 December. However, the organiser's individual event listings and its Chiswick Christmas booking note both specify 10:00–15:00 on all eight dates. Retain 10:00–15:00 because the specific organiser listings and booking note are the more direct operational evidence; document the conflicting weekend information as unresolved. |
| Chiswick Car Boot Sale | First Sunday monthly except January; organiser publishes 6 December 2026 and 7 February, 7 March and 4 April 2027. | 06:30–12:30, Chiswick School. | The three early-2027 dates and January closure are explicitly published by the organiser; the remaining monthly dates follow its standing recurrence rule. |
| Chiswick Antiques & Vintage Market | Second Sunday monthly; Chiswick Calendar's stable market profile describes the recurrence. | 09:00–15:00, Old Market Place / south side of High Road. | Chiswick Calendar now has generated 2027 recurrence pages, but these are not separate organiser confirmations. Keep individual 2027 dates provisional. |
| Chiswick Cheese Market | Third Sunday monthly; the organiser's official site states the standing recurrence and hours and lists all 2026 dates. | 09:30–15:00, Old Market Place. | Standing recurrence and hours are confirmed; the official site still lists only 2026 individual dates. |
| FoodSt | Fourth Sunday monthly; Chiswick Calendar describes the recurrence. | 11:00–16:00, Old Market Place. | Chiswick Calendar has generated 2027 dated pages (for example June and July), but these appear to be recurrence-generated and are not organiser-specific 2027 announcements. Keep individual dates provisional. |
| The Food Market | Weekly Sunday market; official site says every Sunday. The organiser's trader application specifies two annual closures: Easter Sunday and the Sunday after Christmas. | 10:00–14:00, Pavilion, Market Drive, Chiswick W4 2RX. | Apply the standing policy to all relevant years: 5 April and 27 December 2026; 28 March and 26 December 2027. The Christmas closures were missing from the previous schedules and are added by this readiness update. |
| Acton Makers Market | Your Acton BID page lists 18 April, 20 June, 19 September and 12 December 2026; no 2027 dates found. | 10:00–16:30, Churchfield Road, Acton W3 6AY. Dates subject to change. | Do not invent 2027 dates. |
| Open Art Spaces | Organiser updates support Chiswick collaborations on 29 March, 31 May, 2 August, 1 November and 29 November 2026. The unsupported 30 August entry has been removed. | 11:00–16:00, Chiswick High Road / Flower Market collaboration dates as announced. | No 2027 dates found; do not invent. |
| W4 Art & Design Winter Fair | Official site confirms 20 and 21 November 2026. | 20 November 18:00–21:00; 21 November 10:30–18:00; Christchurch Acton Green, South Parade, Chiswick W4 5LG. | No 2027 dates found; do not invent. |

## 5. 2027 readiness review — 27 November 2026

The review separates standing recurrence rules from individually published dates. A third-party calendar's future dated URL is not treated as organiser confirmation when it appears to be generated from a recurring event series.

| Event | Evidence found on 27 November 2026 | Readiness decision |
|---|---|---|
| Flower Market | Official calendar confirms first Sunday except January and seasonal hours. The organiser's trader FAQ already lists 2027 pitch fees, but its public calendar still lists only October–December 2026 dates. | Keep the existing recurrence and seasonal hours. Do not claim that individual 2027 dates have been separately announced. |
| Duck Pond | Official Chiswick page confirms first Sunday monthly, 10:00–16:00. Its event listings still show only 2026 Chiswick festive dates. | Keep the monthly recurrence, but check for 2027 date-specific changes and venue movements. Do not carry forward 2026 festive dates. |
| Car Boot Sale | Official organiser page lists 7 February, 7 March and 4 April 2027 and says there is no January sale; it also states the first-Sunday recurrence. | Existing 2027 monthly recurrence and January exclusion are supported. |
| Antiques | Chiswick Calendar's stable market profile states second Sunday monthly. Future 2027 dated pages are visible on that calendar, but appear to be generated from the series recurrence rather than individual organiser announcements. | Keep dates provisional; do not mistake generated URLs for confirmation. |
| Cheese Market | Official organiser site states third Sunday monthly and 09:30–15:00, but its explicit date list is still for 2026. | Standing recurrence and hours are supported; recheck the organiser's 2027 date list when published. |
| FoodSt | Chiswick Calendar has future dated 2027 pages (including 27 June and 25 July) generated from its fourth-Sunday series. The official FoodSt site has no 2027 date list. | Do not treat those generated pages as organiser confirmation. Keep individual dates provisional. |
| The Food Market | Official site states every Sunday, 10:00–14:00. The organiser's trader application explicitly excludes Easter Sunday and the Sunday after Christmas. | Apply both closures in 2026 and 2027; see the four exact dates in section 4. |
| Acton Makers Market | Your Acton BID page still lists only four 2026 dates. | No 2027 dates to add. |
| Open Art Spaces | Organiser updates found relate to 2026 Chiswick collaborations only. | No 2027 dates to add. |
| W4 Art & Design Winter Fair | Official site remains focused on the 2026 fair. | No 2027 dates to add. |

The 2027 schedule remains provisional overall. The strongest evidence is for standing monthly/weekly recurrence and the Car Boot Sale's first three published dates; this is not the same as confirmation of every future market date. No new 2027 one-off events have been added.

## 6. 2026 event-link audit

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

All ten destinations in the table were opened successfully during the link audit. The seven additional December festive dates, plus the 6 December regular monthly occurrence presented as its Christmas edition, are represented under the separate Christmas Market definition/colour. Chiswick House's festive programme also included 1 November, but the calendar retains that date's regular Duck Pond Market label. The calendar retains 10:00–15:00 from the organiser's individual listings and Chiswick Christmas booking note. The conflicting weekend hours in Chiswick House's programme and the organiser poster reported by Chiswick Today remain documented but unresolved. The two Winter Fair sessions remain separate dates and times but use the same stable organiser page.

### 5.3 Link policy

- Prefer a stable organiser page or market profile for recurring events.
- Use a date-specific listing only for a genuinely one-off event when no stable event page exists and the dated page has been verified.
- Do not automatically append a date to a recurring event URL. A URL pattern is not evidence that the corresponding page exists or will remain available.
- When auditing links, check where the page resolves, not merely whether the URL returns a successful response.

## 7. Source register

The following sources informed the schedule and link decisions. The link audit's stable-destination table in section 5.2 records the destinations currently used by the calendar.

- Flower Market official calendar: https://chiswickflowermarket.com/calendar/
- Flower Market visitor FAQ: https://chiswickflowermarket.com/frequently-asked-questions-visitors/
- Flower Market dated October listing: https://chiswickcalendar.co.uk/event/chiswick-flower-market-old-market-place/2026-10-04/
- Flower Market official homepage: https://chiswickflowermarket.com/
- Duck Pond official market page: https://duckpondmarket.com/chiswick
- Chiswick Antiques & Vintage Market stable profile (recurrence description): https://chiswickcalendar.co.uk/this-is-chiswick/places/chiswick-antiques-vintage-market/
- FoodSt official market page: https://www.foodst.co.uk/about-our-markets
- Chiswick House Christmas programme: https://www.chiswickhouseandgardens.org.uk/whats-on/christmas/
- Chiswick Car Boot Sale official site: https://chiswickcarbootsale.com/home
- Chiswick Cheese Market visitor information: https://www.chiswickcheesemarket.uk/visit-us/
- The Food Market official site: https://thefoodmarketchiswick.com/
- The Food Market organiser's trader application (weekly trading exception policy): https://www.surveymonkey.com/r/FoodMarketChiswick
- Your Acton BID Makers Market: https://www.youractonbid.co.uk/your-acton-makers-market/
- Open Art Spaces market: https://www.openartspaces.co.uk/market
- W4 Art & Design: https://www.w4artanddesign.co.uk/

## 8. Outstanding checks and confidence

1. Recheck individual 2027 dates and links as organisers publish them. Do not mistake a recurrence-generated third-party URL for an organiser's date-specific announcement.
2. The Flower Market, Duck Pond, Cheese Market and Food Market publish standing recurrence rules, but date-specific exceptions and cancellations can still occur. Car Boot's published early-2027 dates support its recurrence.
3. FoodSt and Antiques have future dated 2027 pages on Chiswick Calendar, but these appear to be generated from recurring series rather than independently announced by organisers.
4. The Duck Pond Christmas Market is separately advertised on eight December dates (5–6 and 19–24). However, 6 December coincides with the regular first-Sunday market and is that month's regular occurrence presented as the Christmas edition, not an additional event; the other seven dates are additional festive dates. Chiswick House's festive programme also includes 1 November, coinciding with the regular first-Sunday market, which the calendar currently labels as the regular Duck Pond Market. Hours evidence: the organiser's individual event listings and its Chiswick Christmas booking note both specify 10:00–15:00 on all eight dates. Chiswick House's programme and the organiser poster reported by Chiswick Today instead show 10:00–16:00 on the four weekend dates and 10:00–15:00 on 21–24 December. The calendar retains 10:00–15:00 because the organiser's specific listings and booking note are the more direct operational evidence; the conflicting weekend information remains recorded as unresolved.
5. No 2027 dates were found for Acton Makers Market, Open Art Spaces or W4 Art & Design Winter Fair at the time of this review; do not invent them.

The audit records the selected source for each discrepancy rather than implying that all sources agree. It is a dated snapshot and should be updated when organisers publish new information.

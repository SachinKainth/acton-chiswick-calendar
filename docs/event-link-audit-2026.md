# 2026 event-link audit

Audit snapshot: 27 November 2026.

## Summary

The 2026 schedule generated 58 date-specific Chiswick Calendar URLs for recurring Flower Market, Duck Pond, Antiques, Cheese and FoodSt occurrences:

| Event | Generated 2026 links |
|---|---:|
| Chiswick Flower Market | 11 |
| Duck Pond Market (regular first-Sunday dates) | 11 |
| Chiswick Antiques & Vintage Market | 12 |
| Chiswick Cheese Market | 12 |
| FoodSt | 12 |
| **Total** | **58** |

The URLs were generated from the actual 2026 recurrence rules, then checked against the live site. A material issue was found: old date-specific listings are not dependable permanent destinations. Examples of generated links that now resolve to a later occurrence of the same event include:

| Event | Generated URL date | Date shown after resolution |
|---|---|---|
| Flower Market | 1 February 2026 | 1 November 2026 |
| Antiques | 8 March 2026 | 8 November 2026 |
| FoodSt | 26 April 2026 | 22 November 2026 |

Other checked URLs still returned their requested date, while some older pages returned no readable page content through the audit browser. The key point is that the date suffix does not guarantee that the listing will remain available for that exact date. These links can silently lead to another occurrence and are therefore unsuitable as the calendar's long-term event destinations.

No 2026 schedule entry was found to contain a hard-coded 2027 event URL. The two W4 Winter Fair links were explicitly dated 2026 URLs, but were replaced with the organiser's stable event page.

## Link corrections

The shared event catalogue now uses stable, non-date-specific destinations. The annual schedule no longer needs to repeat the same URL for Duck Pond festive dates or the two Winter Fair sessions.

| Event | Link now used | Source / reason |
|---|---|---|
| Chiswick Flower Market | https://chiswickflowermarket.com/calendar/ | Official organiser calendar; lists recurring dates and seasonal visitor hours. |
| Duck Pond Market | https://duckpondmarket.com/chiswick | Official organiser's Chiswick location page. |
| Chiswick Antiques & Vintage Market | https://chiswickcalendar.co.uk/this-is-chiswick/places/chiswick-antiques-vintage-market/ | Stable Chiswick Calendar market profile; the dated listings are not reliable permanent links. |
| Chiswick Cheese Market | https://www.chiswickcheesemarket.uk/ | Official organiser site, with recurring information and 2026 dates. |
| FoodSt | https://www.foodst.co.uk/ | Official Food St website. |
| The Food Market | https://thefoodmarketchiswick.com/ | Existing official organiser site; retained. |
| Chiswick Car Boot Sale | https://chiswickcarbootsale.com/ | Existing official organiser site; retained. |
| Your Acton Maker's Market | https://www.youractonbid.co.uk/your-acton-makers-market/ | Existing official BID event page; retained. |
| Open Art Spaces | https://www.openartspaces.co.uk/market | Existing official organiser market page; retained. |
| W4 Art & Design Winter Fair | https://www.w4artanddesign.co.uk/ | Official organiser page confirms the 20–21 November 2026 event; replaces both dated Chiswick Calendar URLs. |

The eight Duck Pond festive dates continue to use the official Chiswick location page. Their individual 10:00–15:00 time overrides are unchanged. The two Winter Fair dates and their separate times are also unchanged; only their destination link has changed.

## Verification notes

- All ten destinations in the table were opened successfully during this audit.
- The Flower Market organiser calendar identifies the first Sunday of each month except January and publishes its seasonal hours.
- The Duck Pond page identifies Chiswick House & Gardens and its regular first-Sunday market.
- The Antiques profile describes the second-Sunday market and its Chiswick location.
- The Cheese Market official site identifies the third-Sunday market and publishes its 2026 dates.
- The Food St official site identifies the Chiswick market address.
- The official Car Boot, Food Market, Your Acton BID, Open Art Spaces and W4 Art & Design pages were also reachable.

This is a link-destination audit, not a re-audit of dates, times, venues or recurrence rules. Any content discrepancies discovered while checking those details belong in the separate schedule audit.

## Ongoing policy

Prefer a stable organiser page or market profile for recurring events. Use a date-specific listing only for a genuinely one-off event when no stable event page exists and the date-specific page has been verified. Do not automatically append a date to a recurring event URL: a URL pattern is not evidence that the corresponding page exists or will remain available.

The 2027 schedule inherits the shared catalogue destinations, but its dates and schedule remain provisional and are not activated by this change.

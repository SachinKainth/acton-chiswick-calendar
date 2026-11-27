# Market event audit — 2026 baseline and 2027 planning

Audit snapshot: 27 November 2026. This document records the source checks used for the calendar data. A source's publication of a recurring pattern does not by itself confirm every 2027 date.

## Findings and disposition

| Event | Recurrence / dates checked | Hours and location | Link handling | 2027 status / action |
|---|---|---|---|---|
| Chiswick Flower Market | First Sunday monthly except January. Official calendar states the January exception. | Summer (May–September) 09:00–16:00; winter (October–April) 09:30–15:30 used in code. The organiser FAQ and December home-page listing also show a 09:00 winter start, conflicting with the calendar and dated October listing. | Dated Chiswick Calendar event URL appends YYYY-MM-DD. | Recurrence carried forward provisionally; organiser confirmation of winter start time remains outstanding. |
| Duck Pond Market | First Sunday monthly. Checked regular 1 November listing and official market calendar. | Regular market 10:00–16:00, Chiswick House & Gardens. December festive programme lists 5, 6, 19, 20, 21, 22, 23 and 24 December 2026. Sources conflict on weekend closing time (15:00 vs 16:00). | Dated Chiswick Calendar event URL appends YYYY-MM-DD. | Festive dates are not added until the organiser confirms hours and event-specific URL details. Avoid duplicating 6 December if added. |
| Chiswick Car Boot Sale | First Sunday monthly except January; official organiser publishes 6 December 2026 and 7 February, 7 March and 4 April 2027. | 06:30–12:30, Chiswick School. | Official organiser homepage; no date suffix. | Recurrence and January exception match code; published early 2027 dates support recurrence. |
| Chiswick Antiques & Vintage Market | Second Sunday monthly; checked 8 November 2026 listing. | 09:00–15:00, Old Market Place / south side of High Road. | Dated Chiswick Calendar event URL appends YYYY-MM-DD. | Recurrence carried forward provisionally. |
| Chiswick Cheese Market | Third Sunday monthly; official site lists all 2026 monthly dates. | 09:30–15:00, Old Market Place. | Dated Chiswick Calendar event URL appends YYYY-MM-DD. | Recurrence carried forward provisionally. |
| FoodSt | Fourth Sunday monthly; checked October and December 2026 listings. | 11:00–16:00, Old Market Place. | Dated Chiswick Calendar event URL appends YYYY-MM-DD. | Recurrence carried forward provisionally. |
| The Food Market | Weekly Sunday market; checked official site and location page. | 10:00–14:00, Pavilion, Market Drive, Chiswick W4 2RX. | Official homepage; no date suffix. | No 2027 Easter closure is assumed. The 2026 Easter exclusion remains in place; 2027 Easter operation must be confirmed with the organiser. |
| Acton Makers Market | Official Your Acton BID page lists 18 April, 20 June, 19 September and 12 December 2026; no 2027 dates found. | 10:00–16:30, Churchfield Road, Acton W3 6AY. Dates subject to change. | Official Your Acton BID market page; no date suffix. | Do not invent 2027 dates. |
| Open Art Spaces | Official market page confirms a Chiswick 2026 event on 29 November. Other 2026 schedule entries require date-by-date confirmation from the organiser's announcements. No 2027 dates found. | Calendar currently carries 11:00–16:00, Chiswick High Road. | Official market page; no date suffix. | Do not invent 2027 dates; complete verification of all four 2026 dates before treating the schedule as fully audited. |
| W4 Art & Design Winter Fair | Official site confirms 20 and 21 November 2026. | 20 Nov 18:00–21:00; 21 Nov 10:30–18:00; Christchurch Acton Green, South Parade, Chiswick W4 5LG. | Individual dated Chiswick Calendar event URLs stored explicitly. | No 2027 dates found; do not invent. |

## Source register

- Flower Market official calendar: https://chiswickflowermarket.com/calendar/
- Flower Market official visitor FAQ: https://chiswickflowermarket.com/frequently-asked-questions-visitors/
- Flower Market dated October listing: https://chiswickcalendar.co.uk/event/chiswick-flower-market-old-market-place/2026-10-04/
- Flower Market official homepage: https://chiswickflowermarket.com/
- Duck Pond official market page: https://duckpondmarket.com/chiswick
- Chiswick House Christmas programme: https://www.chiswickhouseandgardens.org.uk/whats-on/christmas/
- Chiswick Car Boot Sale official site: https://chiswickcarbootsale.com/home
- Chiswick Cheese Market visitor information: https://www.chiswickcheesemarket.uk/visit-us/
- The Food Market official site: https://thefoodmarketchiswick.com/
- Your Acton BID Makers Market: https://www.youractonbid.co.uk/your-acton-makers-market/
- Open Art Spaces market: https://www.openartspaces.co.uk/market
- W4 Art & Design: https://www.w4artanddesign.co.uk/

## Remaining checks before calling the audit complete

1. Ask Chiswick Flower Market to resolve the winter opening-time discrepancy (09:00 vs 09:30).
2. Ask Duck Pond to confirm the festive programme's day-by-day hours and event URLs; add confirmed special dates and suppress the normal 6 December entry if necessary.
3. Verify all four 2026 Open Art Spaces dates against organiser announcements, not only the 29 November official market page.
4. Confirm the 2027 Food Market Easter Sunday operating status with the organiser.
5. Recheck date-specific event pages and links when 2027 dates are announced. The recurring date URL pattern is not proof that a future page has been published.
6. Treat all carried-forward 2027 recurring schedules as provisional until the organisers confirm them.

## Scope and confidence

This audit verifies the organiser/venue material available at the audit date; it does not claim that every historical or future generated URL has been individually HTTP-checked. The unresolved items above are intentionally visible rather than silently guessed. The public calendar year remains controlled by `ACTIVE_YEAR`; this change does not activate 2027.

# Greater London Markets & Events Calendar

A static vanilla-JavaScript calendar for markets and public events across Greater London. The 2026 schedule is retained as the historical Acton and Chiswick record; the expanded geographic coverage begins with 2027.

Live application: https://sachinkainth.github.io/greater-london-markets-events-calendar/

## Architecture

The application separates shared calendar functionality from annual schedules:

- `config/calendar.config.js` selects the year displayed by the public site.
- `js/core/` contains the year-independent calendar renderer, event engine, date utilities, DOM helpers and navigation.
- `js/data/eventCatalog.js` contains shared event defaults, including semantic categories, event-specific presentation classes, names, links and times. Categories describe what an event is; presentation classes independently control its colour.
- `js/data/YEAR/calendar.js` contains the schedule for an individual year, including its recurring rules, individual dates and exceptions.

Annual data is loaded dynamically from the selected year's folder. There is no central year registry to update.

## Selecting the public calendar year

The only setting needed to select the public calendar is `ACTIVE_YEAR` in `config/calendar.config.js`.

It remains set to `2026` until the 2027 calendar has been verified and is ready to be published.

To add a future year:

1. Create `js/data/YEAR/calendar.js` with a `calendarData` export whose `year` matches the folder name.
2. Define that year's individual dates, recurring schedules and exceptions.
3. Add only year-specific differences from the shared catalogue as event `overrides`.
4. Add tests and verify dates, exceptions and links.
5. Change `ACTIVE_YEAR` when the public site should display that year.

No import or registry needs to be edited when a year is added.

## Shared defaults and annual overrides

Event descriptions are shared where they genuinely remain the same. An annual schedule can override individual properties without copying the whole definition.

A schedule can use:

- `overrides` for values that differ throughout a whole year.
- `overridesByMonth` for month-specific values, keyed by month number from `1` to `12`.

The shared catalogue can also define `overridesByMonth` when a seasonal value is genuinely common across years. An annual override takes precedence over the shared default; an annual month override takes precedence over both.

For example:

```javascript
{
  sunday: 1,
  eventId: "flowers",
  overridesByMonth: {
    "1": {
      time: "09:30–15:30",
      link: "https://example.com/winter-market/",
      appendDateToLink: false
    },
    "6": {
      time: "09:00–16:00"
    }
  }
}
```

Only changed fields need to be specified. This allows event timings and links to vary by season or month without copying the whole event definition. A specific date can still be represented as an individual event when it has its own details.

## Annual data status

The 2026 dataset preserves the dates and recurrence rules from the original application, includes the four published Open Art Spaces dates and records the W4 Art & Design Winter Fair on 20–21 November.

The 2027 dataset is deliberately marked provisional. Its recurring pattern is carried forward from 2026, and individually announced events are added only when their dates and venues are published. The Open Art Show is represented by six individual dates, 4–9 February 2027. Confirmed Greater London additions include Local Makers Market dates, Adams Antiques Fairs, The Decorative Fair, London Art Fair, Affordable Art Fair, specialist art and antiques fairs, food festivals and the Spirit of Christmas Fair. The Food Market's Easter and post-Christmas closures follow the organiser's published policy.

Seasonal and special event dates must be verified against organiser information each year. In particular, don't assume all first-Sunday markets keep identical opening hours or schedules through the year.

## Running locally

This is a static site. From the repository root, start a local HTTP server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Tests

Install dependencies with:

```bash
npm ci
```

Run the Jest suite:

```bash
npm test
```

Generate coverage:

```bash
npm run test:coverage
```

CI checks calendar rendering, event counts and deterministic URL generation. It does not make every historic event page a blocking live request: organisers and listing sites may retire date-specific pages after an event. Upcoming event pages and canonical organiser links should be checked separately before each annual release.

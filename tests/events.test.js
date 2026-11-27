import * as events from "../js/events.js"
import * as dateUtils from "../js/dateUtils.js"

describe("eventsForSunday", () => {

  test("returns events for matching Sunday", () => {

    const sunday = 1
    const date = new Date(2026, 1, 1)
    const ymd = "2026-02-01"

    const result = events.eventsForSunday(sunday, date, ymd)

    const expected = events.regularEvents
      .filter(e => e.sunday === 1)
      .map(e => {
        const { appendDateToLink = true, ...eventData } = e;
        return {
          ...eventData,
          link: appendDateToLink ? e.link + ymd : e.link
        };
      })
      .concat(events.everySundayEvents)

    expect(result).toEqual(expected)
    expect(result.length).toEqual(4)

  })

  test("skips those events that don't happen in January", () => {

    const sunday = 1
    const date = new Date(2026, 0, 4)
    const ymd = "2026-01-04"

    const result = events.eventsForSunday(sunday, date, ymd)

    const expected = events.regularEvents
      .filter(e => e.sunday === 1 && !e.skipJanuary)
      .map(e => {
        const { appendDateToLink = true, ...eventData } = e;
        return {
          ...eventData,
          link: appendDateToLink ? e.link + ymd : e.link
        };
      })
      .concat(events.everySundayEvents)

    expect(result).toEqual(expected)
    expect(result.length).toEqual(3)

  })


  test("uses the organiser's official website for the Car Boot Sale without adding a date", () => {
    const result = events.eventsForSunday(1, new Date(2026, 1, 1), "2026-02-01");
    const carBoot = result.find(event => event.name === "Car Boot Sale");

    expect(carBoot.link).toBe("https://chiswickcarbootsale.com/");
    expect(carBoot).not.toHaveProperty("appendDateToLink");
  });

  test("skips food market for Easter Sunday", () => {

    const sunday = 1
    const date = new Date(2026, 3, 5)
    const ymd = "2026-04-05"

    const result = events.eventsForSunday(sunday, date, ymd)

    const expected = events.regularEvents
      .filter(e => e.sunday === 1)
      .map(e => {
        const { appendDateToLink = true, ...eventData } = e;
        return {
          ...eventData,
          link: appendDateToLink ? e.link + ymd : e.link
        };
      })

    expect(result).toEqual(expected)
    expect(result.length).toEqual(3)

  })

})

describe("getEventsForDate", () => {

  test("includes the W4 Art & Design Winter Fair on both published dates with their separate times", () => {
    const friday = events.getEventsForDate(new Date(2026, 10, 20));
    const saturday = events.getEventsForDate(new Date(2026, 10, 21));

    const fridayFair = friday.find(event => event.name === "W4 Art & Design Winter Fair");
    const saturdayFair = saturday.find(event => event.name === "W4 Art & Design Winter Fair");

    expect(fridayFair).toMatchObject({
      location: "Christchurch Acton Green",
      time: "18:00–21:00",
      class: "winterfair",
      link: "https://chiswickcalendar.co.uk/event/w4-art-design-winter-fair-2026-christchurch-acton-green/2026-11-20/"
    });
    expect(saturdayFair).toMatchObject({
      location: "Christchurch Acton Green",
      time: "10:30–18:00",
      class: "winterfair",
      link: "https://chiswickcalendar.co.uk/event/w4-art-design-winter-fair-2026-christchurch-acton-green/2026-11-21/"
    });
  });


  test("contains all four announced 2026 Chiswick Open Art Market dates", () => {
    const artEvents = events.individualEvents.filter(event => event.name === "Art");

    expect(artEvents.map(event => event.date)).toEqual([
      "2026-03-29",
      "2026-05-31",
      "2026-08-30",
      "2026-11-29"
    ]);

    artEvents.forEach(event => {
      expect(event.time).toBe("11:00–16:00");
      expect(event.link).toBe("https://www.openartspaces.co.uk/market");
    });
  });

  test("includes events for matching date", () => {

    const event = events.individualEvents[0]
    const date = new Date(event.date)

    const result = events.getEventsForDate(date)

    expect(result.some(e => e.name === event.name)).toBe(true)

  })

})

describe("recurringEvents", () => {

  const date = new Date("2026-03-22")

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test("returns empty array if the date is not Sunday", () => {

    jest.spyOn(dateUtils, "isSunday").mockReturnValue(false)

    const result = events.recurringEvents(date)

    expect(result).toEqual([])
    expect(dateUtils.isSunday).toHaveBeenCalledWith(date)
  })

  test("returns events", () => {

    jest.spyOn(dateUtils, "isSunday").mockReturnValue(true)
    jest.spyOn(dateUtils, "sundayOfMonth").mockReturnValue(4)
    jest.spyOn(dateUtils, "formatDate").mockReturnValue("2026-03-22")

    var actual = events.recurringEvents(date)

    expect(actual).toEqual([
      {
         "area": "chiswick",
         "class": "streetfood",
         "link": "https://chiswickcalendar.co.uk/event/foodst-old-market-place/2026-03-22",
         "location": "Old Market Place",
         "name": "FoodSt",
         "sunday": 4,
         "time": "11:00–16:00",
      },
      {
        name: "The Food Market",
        skip: ["2026-04-05"],
        location: "Pavilion, Market Drive",
        time: "10:00–14:00",
        area: "chiswick",
        class: "foodmarket",
        link: "https://thefoodmarketchiswick.com/"
	    }
    ])

  })

})

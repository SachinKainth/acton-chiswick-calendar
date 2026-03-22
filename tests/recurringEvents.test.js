import * as dateUtils from "../js/dateUtils.js"
import * as recurringEvents from "../js/recurringEvents.js"

describe("recurringEvents", () => {

  const date = new Date("2026-03-22")

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test("returns empty array if the date is not Sunday", () => {

    jest.spyOn(dateUtils, "isSunday").mockReturnValue(false)

    const result = recurringEvents.recurringEvents(date)

    expect(result).toEqual([])
    expect(dateUtils.isSunday).toHaveBeenCalledWith(date)
  })

  test("returns an event", () => {

    jest.spyOn(dateUtils, "isSunday").mockReturnValue(true)
    jest.spyOn(dateUtils, "sundayOfMonth").mockReturnValue(4)
    jest.spyOn(dateUtils, "formatDate").mockReturnValue("2026-03-22")

    var actual = recurringEvents.recurringEvents(date)

    expect(actual).toEqual([
      {
         "area": "chiswick",
         "class": "streetfood",
         "link": "https://chiswickcalendar.co.uk/event/foodst-old-market-place/2026-03-22",
         "location": "Old Market Place",
         "name": "FoodSt",
         "sunday": 4,
         "time": "11:00–16:00",
      }
    ])

  })

})

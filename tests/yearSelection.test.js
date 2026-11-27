import { ACTIVE_YEAR } from "../config/calendar.config.js";
import { getCalendarData } from "../js/data/index.js";

describe("annual calendar selection", () => {
  test("keeps 2026 selected until the deliberate year switch", () => {
    expect(ACTIVE_YEAR).toBe(2026);
  });

  test("loads annual datasets directly from their year folders", async () => {
    const [calendar2026, calendar2027] = await Promise.all([
      getCalendarData(2026),
      getCalendarData(2027)
    ]);

    expect(calendar2026.year).toBe(2026);
    expect(calendar2027.year).toBe(2027);
  });

  test("rejects invalid calendar years", async () => {
    await expect(getCalendarData(20)).rejects.toThrow(RangeError);
  });

  test("fails clearly when a year folder has not been created", async () => {
    await expect(getCalendarData(2028)).rejects.toThrow(
      "Unable to load annual calendar data for 2028"
    );
  });
});

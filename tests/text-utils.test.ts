import { cleanDurationText, padNumber } from "../src/utils/text-utils.ts";

describe("padNumber", () => {
  test("pads 2 to 02", () => {
    expect(padNumber(2)).toBe("02");
  });

  test("pads 7 to 07", () => {
    expect(padNumber(7)).toBe("07");
  });

  test("does not pad 10", () => {
    expect(padNumber(10)).toBe("10");
  });
});

describe("cleanDurationText", () => {
  test("remove bracket text from (11:00) to 11:00", () => {
    expect(cleanDurationText("(11:00)")).toBe("11:00");
  });

  test("remove bracket text from 11:00 to 11:00", () => {
    expect(cleanDurationText("11:00")).toBe("11:00");
  });

  test("remove bracket text from (11:00 to 11:00", () => {
    expect(cleanDurationText("(11:00")).toBe("11:00");
  });
});

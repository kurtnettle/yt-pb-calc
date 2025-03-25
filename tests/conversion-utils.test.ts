import {
  durationTextToSecond,
  secondToDurationText,
} from "../src/utils/conversion-utils.ts";

describe("durationTextToSecond", () => {
  test('converts "00:00" to seconds', () => {
    expect(durationTextToSecond("00:00")).toBe(0);
  });

  test('converts "0:05" to seconds', () => {
    expect(durationTextToSecond("0:05")).toBe(5);
  });

  test('converts "0:27" to seconds', () => {
    expect(durationTextToSecond("0:27")).toBe(27);
  });

  test('converts "0:45" to seconds', () => {
    expect(durationTextToSecond("0:45")).toBe(45);
  });

  test('converts "1:00" to seconds', () => {
    expect(durationTextToSecond("1:00")).toBe(60);
  });

  test('converts "1:01" to seconds', () => {
    expect(durationTextToSecond("1:01")).toBe(61);
  });

  test('converts "1:11" to seconds', () => {
    expect(durationTextToSecond("1:11")).toBe(71);
  });

  test('converts "1:59" to seconds', () => {
    expect(durationTextToSecond("1:59")).toBe(119);
  });

  test('converts "8:21" to seconds', () => {
    expect(durationTextToSecond("8:21")).toBe(501);
  });

  test('converts "10:00" to seconds', () => {
    expect(durationTextToSecond("10:00")).toBe(600);
  });

  test('converts "10:07" to seconds', () => {
    expect(durationTextToSecond("10:07")).toBe(607);
  });

  test('converts "10:27" to seconds', () => {
    expect(durationTextToSecond("10:27")).toBe(627);
  });

  test('converts "59:59" to seconds', () => {
    expect(durationTextToSecond("59:59")).toBe(3599);
  });

  test('converts "0:01:00" to seconds', () => {
    expect(durationTextToSecond("0:01:00")).toBe(60);
  });

  test('converts "1:00:00" to seconds', () => {
    expect(durationTextToSecond("1:00:00")).toBe(3600);
  });

  test('converts "1:00:05" to seconds', () => {
    expect(durationTextToSecond("1:00:05")).toBe(3605);
  });

  test('converts "1:00:32" to seconds', () => {
    expect(durationTextToSecond("1:00:32")).toBe(3632);
  });

  test('converts "1:05:00" to seconds', () => {
    expect(durationTextToSecond("1:05:00")).toBe(3900);
  });

  test('converts "1:05:05" to seconds', () => {
    expect(durationTextToSecond("1:05:05")).toBe(3905);
  });

  test('converts "1:05:25" to seconds', () => {
    expect(durationTextToSecond("1:05:25")).toBe(3925);
  });

  test('converts "1:10:00" to seconds', () => {
    expect(durationTextToSecond("1:10:00")).toBe(4200);
  });

  test('converts "1:10:05" to seconds', () => {
    expect(durationTextToSecond("1:10:05")).toBe(4205);
  });

  test('converts "1:12:05" to seconds', () => {
    expect(durationTextToSecond("1:12:05")).toBe(4325);
  });

  test('converts "1:53:35" to seconds', () => {
    expect(durationTextToSecond("1:53:35")).toBe(6815);
  });

  test('converts "1:59:59" to seconds', () => {
    expect(durationTextToSecond("1:59:59")).toBe(7199);
  });

  test('converts "23:59:00" to seconds', () => {
    expect(durationTextToSecond("23:59:00")).toBe(86_340);
  });

  test('converts "1:00:00:00" to seconds', () => {
    expect(durationTextToSecond("1:00:00:00")).toBe(86_400);
  });

  test('converts "1:00:00:01" to seconds', () => {
    expect(durationTextToSecond("1:00:00:01")).toBe(86_401);
  });

  test('converts "1:00:01:00" to seconds', () => {
    expect(durationTextToSecond("1:00:01:00")).toBe(86_460);
  });

  test('converts "1:01:00:00" to seconds', () => {
    expect(durationTextToSecond("1:01:00:00")).toBe(90_000);
  });

  test('converts "1:01:00:43" to seconds', () => {
    expect(durationTextToSecond("1:01:00:43")).toBe(90_043);
  });

  test('converts "1:01:03:43" to seconds', () => {
    expect(durationTextToSecond("1:01:03:43")).toBe(90_223);
  });

  test('converts "1:01:13:35" to seconds', () => {
    expect(durationTextToSecond("1:01:13:35")).toBe(90_815);
  });

  test('converts "1:11:00:00" to seconds', () => {
    expect(durationTextToSecond("1:11:00:00")).toBe(126_000);
  });

  test('throws error for invalid format "1"', () => {
    expect(() => durationTextToSecond("1")).toThrow(RangeError);
  });

  test("throws error for invalid format", () => {
    expect(() => durationTextToSecond("invalid")).toThrow(RangeError);
  });

  test("throws error for empty string", () => {
    expect(() => durationTextToSecond("")).toThrow(RangeError);
  });

  test("throws error for non-string input", () => {
    expect(() => durationTextToSecond(123 as any)).toThrow(RangeError);
  });
});

describe("secondToDurationText", () => {
  test('converts 0 seconds to "0:00"', () => {
    expect(secondToDurationText(0)).toBe("0:00");
  });

  test('converts 1 seconds to "0:01"', () => {
    expect(secondToDurationText(1)).toBe("0:01");
  });

  test('converts 9 seconds to "0:09"', () => {
    expect(secondToDurationText(9)).toBe("0:09");
  });

  test('converts 27 seconds to "0:27"', () => {
    expect(secondToDurationText(27)).toBe("0:27");
  });

  test('converts 50 seconds to "0:50"', () => {
    expect(secondToDurationText(50)).toBe("0:50");
  });

  test('converts 60 seconds to "1:00"', () => {
    expect(secondToDurationText(60)).toBe("1:00");
  });

  test('converts 61 seconds to "1:01"', () => {
    expect(secondToDurationText(61)).toBe("1:01");
  });

  test('converts 83 seconds to "1:23"', () => {
    expect(secondToDurationText(83)).toBe("1:23");
  });

  test('converts 119 seconds to "1:59"', () => {
    expect(secondToDurationText(119)).toBe("1:59");
  });

  test('converts 123 seconds to "2:03"', () => {
    expect(secondToDurationText(123)).toBe("2:03");
  });

  test('converts 600 seconds to "10:00"', () => {
    expect(secondToDurationText(600)).toBe("10:00");
  });

  test('converts 607 seconds to "10:07"', () => {
    expect(secondToDurationText(607)).toBe("10:07");
  });

  test('converts 3599 seconds to "59:59"', () => {
    expect(secondToDurationText(3599)).toBe("59:59");
  });

  test('converts 3600 seconds to "1:00:00"', () => {
    expect(secondToDurationText(3600)).toBe("1:00:00");
  });

  test('converts 3605 seconds to "1:00:05"', () => {
    expect(secondToDurationText(3605)).toBe("1:00:05");
  });

  test('converts 3905 seconds to "1:05:05"', () => {
    expect(secondToDurationText(3905)).toBe("1:05:05");
  });

  test('converts 4200 seconds to "1:10:00"', () => {
    expect(secondToDurationText(4200)).toBe("1:10:00");
  });

  test('converts 5025 seconds to "1:23:45"', () => {
    expect(secondToDurationText(5025)).toBe("1:23:45");
  });

  test('converts 7199 seconds to "1:59:59"', () => {
    expect(secondToDurationText(7199)).toBe("1:59:59");
  });

  test('converts 7209 seconds to "02:00:09"', () => {
    expect(secondToDurationText(7209)).toBe("2:00:09");
  });

  test('converts 7240 seconds to "2:00:40"', () => {
    expect(secondToDurationText(7240)).toBe("2:00:40");
  });

  test('converts 7800 seconds to "2:10:00"', () => {
    expect(secondToDurationText(7800)).toBe("2:10:00");
  });

  test('converts 65_432 seconds to "18:10:32"', () => {
    expect(secondToDurationText(65_432)).toBe("18:10:32");
  });

  test('converts 86_340 seconds to "23:59:00"', () => {
    expect(secondToDurationText(86_340)).toBe("23:59:00");
  });

  test('converts 86_400 seconds to "1:00:00:00"', () => {
    expect(secondToDurationText(86_400)).toBe("1:00:00:00");
  });

  test('converts 86_401 seconds to "1:00:00:01"', () => {
    expect(secondToDurationText(86_401)).toBe("1:00:00:01");
  });

  test('converts 87_000 seconds to "1:00:10:00"', () => {
    expect(secondToDurationText(87_000)).toBe("1:00:10:00");
  });

  test('converts 90_043 seconds to "1:01:00:43"', () => {
    expect(secondToDurationText(90_043)).toBe("1:01:00:43");
  });

  test('converts 90_600 seconds to "1:01:10:00"', () => {
    expect(secondToDurationText(90_600)).toBe("1:01:10:00");
  });

  test('converts 102_030 seconds to "1:04:20:30"', () => {
    expect(secondToDurationText(102_030)).toBe("1:04:20:30");
  });

  test('converts 115_220 seconds to "1:08:00:20"', () => {
    expect(secondToDurationText(115_220)).toBe("1:08:00:20");
  });

  test('converts 122_400 seconds to "1:10:00:00"', () => {
    expect(secondToDurationText(122_400)).toBe("1:10:00:00");
  });

  test('converts 122_401 seconds to "1:10:00:01"', () => {
    expect(secondToDurationText(122_401)).toBe("1:10:00:01");
  });

  test('converts 122_700 seconds to "1:10:05:00"', () => {
    expect(secondToDurationText(122_700)).toBe("1:10:05:00");
  });

  test('converts 123_000 seconds to "1:10:10:00"', () => {
    expect(secondToDurationText(123_000)).toBe("1:10:10:00");
  });

  test('converts 126_000 seconds to "1:11:00:00"', () => {
    expect(secondToDurationText(126_000)).toBe("1:11:00:00");
  });

  test('converts 171_367 seconds to "1:23:36:07"', () => {
    expect(secondToDurationText(171_367)).toBe("1:23:36:07");
  });

  test('converts 172_800 seconds to "2:00:00:00"', () => {
    expect(secondToDurationText(172_800)).toBe("2:00:00:00");
  });

  test("throws error for negative input", () => {
    expect(() => secondToDurationText(-1)).toThrow(RangeError);
  });

  test("throws error for non-number input", () => {
    expect(() => secondToDurationText("invalid" as any)).toThrow(RangeError);
  });
});

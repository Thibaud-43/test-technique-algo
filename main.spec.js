const { solver } = require("./main");

test("SUCCESS", () => {
  expect(solver("thibaud")).toBe("IIIIIII:8s");
  expect(solver("BANANA")).toBe("AAAAAA:3s");
  expect(solver("FBHC")).toBe("AAAA:4s");
  expect(solver("FOXEN")).toBe("OOOOO:5s");
  expect(solver("SUFIANE")).toBe("SSSSSSS:8s");
});

test("ERRORS", () => {
  expect(() => solver("4")).toThrow(
    "Format error: the word must contains only letters"
  );
});

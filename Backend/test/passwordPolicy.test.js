const test = require("node:test");
const assert = require("node:assert/strict");
const { getUnmetPasswordRequirements } = require("../src/utils/passwordPolicy");

test("accepts a password that satisfies every registration rule", () => {
  assert.deepEqual(getUnmetPasswordRequirements("StrongPass7!"), []);
});

test("reports the rules missing from a short password", () => {
  assert.deepEqual(getUnmetPasswordRequirements("bad"), [
    "At least 8 characters",
    "One uppercase letter",
    "One number",
    "One special character from @$!%*?&",
  ]);
});

test("rejects unsupported characters and trailing newlines", () => {
  assert.ok(getUnmetPasswordRequirements("StrongPass7#").includes(
    "Only letters, numbers, and the allowed special characters",
  ));
  assert.ok(getUnmetPasswordRequirements("StrongPass7!\n").includes(
    "Only letters, numbers, and the allowed special characters",
  ));
});

test("rejects passwords longer than bcrypt's supported input length", () => {
  assert.ok(getUnmetPasswordRequirements(`StrongPass7!${"a".repeat(61)}`).includes(
    "No more than 72 characters",
  ));
});

test("rejects non-string passwords", () => {
  assert.equal(getUnmetPasswordRequirements({}).length, 7);
});
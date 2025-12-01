import { expect } from "chai";
import { calcArea, calcPerimeter, isSquare } from "../src/app.js";
import { describe } from "mocha";

describe("calculation", () => {
  it("Should calc ...1", (done) => {
    expect(calcArea(3, 4)).to.equal(12);
    done();
  });
  it("should calc ...2", (done) => {
    expect(calcPerimeter(5, 7)).to.equal(24);
    done();
  });
  it("should calc ...3", (done) => {
    expect(isSquare(6, 6)).to.be.true;
    expect(isSquare(6, 10)).to.be.false;
    done();
  });
});

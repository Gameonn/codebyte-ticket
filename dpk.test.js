const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Pass object without partition key, returns crypto hash", () => {
    const trivialKey = deterministicPartitionKey({ user: "Ankit" });
    expect(trivialKey).not.toBe("0");
  });

  it("Pass event object with partition key, returns partition key", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: "Ep1lnYxI9LTH8NaX5yrbM3oGuGPcSdwCSbt32O5H",
    });
    expect(trivialKey).toBe("Ep1lnYxI9LTH8NaX5yrbM3oGuGPcSdwCSbt32O5H");
  });

  it("Pass event object with exceeding max partition key length, does not return the partition key", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey:
        "472B4B6250655368566D597133743677397A24432646294A404D635166546A57",
    });
    expect(trivialKey).not.toBe(
      "FYH2J3K5N6P7Q9SATBVDWEXGZH2J4M5N6Q8R9SBUCVDXFYGZJ3K4M5P7Q8"
    );
  });
});

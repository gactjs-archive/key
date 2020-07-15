import { createKeyFactory, createKeyFactoryWithPool } from "../src";

describe("key", () => {
  test("keyFactory iterates through minimal length keys", function() {
    const alphabet = "abc";
    const getKey = createKeyFactory({ alphabet });
    expect(getKey()).toBe("a");
    expect(getKey()).toBe("b");
    expect(getKey()).toBe("c");
    expect(getKey()).toBe("aa");
    expect(getKey()).toBe("ba");
    expect(getKey()).toBe("ca");
    expect(getKey()).toBe("ab");
    expect(getKey()).toBe("bb");
    expect(getKey()).toBe("cb");
    expect(getKey()).toBe("ac");
    expect(getKey()).toBe("bc");
    expect(getKey()).toBe("cc");
    expect(getKey()).toBe("aaa");
  });

  test("keyFactory adds correct prefix", function() {
    const alphabet = "abc";
    const prefix = "_";
    const getKey = createKeyFactory({ alphabet, prefix });
    expect(getKey()).toBe("_a");
    expect(getKey()).toBe("_b");
    expect(getKey()).toBe("_c");
  });

  test("keyFactory adds correct suffix", function() {
    const alphabet = "abc";
    const suffix = "_";
    const getKey = createKeyFactory({ alphabet, suffix });
    expect(getKey()).toBe("a_");
    expect(getKey()).toBe("b_");
    expect(getKey()).toBe("c_");
  });

  test("keyFactory adds correct prefix and suffix", function() {
    const alphabet = "abc";
    const prefix = "_";
    const suffix = "_";
    const getKey = createKeyFactory({ alphabet, prefix, suffix });
    expect(getKey()).toBe("_a_");
    expect(getKey()).toBe("_b_");
    expect(getKey()).toBe("_c_");
  });

  test("keyFactoryWithPool", function() {
    const alphabet = "abc";
    const { get, put } = createKeyFactoryWithPool({ alphabet });
    expect(get()).toBe("a");
    expect(get()).toBe("b");
    put("b");
    expect(get()).toBe("b");
    expect(get()).toBe("c");
    put("a");
    expect(get()).toBe("a");
  });
});

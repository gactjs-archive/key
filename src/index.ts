export type Factory<T> = () => T;

export type FactoryWithPool<T> = {
  get: Factory<T>;
  put: (x: T) => void;
};

function withPool<T>(generator: () => T): FactoryWithPool<T> {
  const pool: Array<T> = [];

  return {
    get(): T {
      if (pool.length) {
        return pool.pop()!;
      }

      return generator();
    },
    put(x): void {
      pool.push(x);
    },
  };
}

type KeyFactoryConfig = {
  alphabet: string;
  prefix?: string;
  suffix?: string;
};

/**
 * Creates a key factory, which provides an infinite stream of minimal length
 * unique strings in a given alphabet.
 */
export function createKeyFactory({
  alphabet,
  prefix = "",
  suffix = "",
}: KeyFactoryConfig): Factory<string> {
  const n: Array<number> = [];

  function increment(): void {
    let carry = false;
    let index = 0;
    do {
      if (n[index] == null) {
        n[index] = 0;
      } else {
        n[index]++;
      }
      carry = n[index] === alphabet.length;
      if (carry) {
        n[index] %= alphabet.length;
      }
      index++;
    } while (carry);
  }

  return function factory(): string {
    increment();
    const base = n
      .map(function(i) {
        return alphabet[i];
      })
      .join("");
    const str = prefix + base + suffix;
    return str;
  };
}

/**
 * Creates a key factory with a pool, which provides an infinite stream
 * of recyclable, minimal length unique strings in a given alphabet.
 */
export function createKeyFactoryWithPool(
  config: KeyFactoryConfig
): FactoryWithPool<string> {
  return withPool(createKeyFactory(config));
}

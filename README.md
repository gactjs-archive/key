# key

![CircleCI](https://img.shields.io/circleci/build/github/gactjs/key?style=for-the-badge)
![Coveralls github](https://img.shields.io/coveralls/github/gactjs/key?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/gactjs/key?style=for-the-badge)
![npm](https://img.shields.io/npm/v/@gact/key?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/min/@gact/key?style=for-the-badge)

`@gact/key` generates the maximally efficient series of unique keys for a given alphabet.

The characters in the provided alphabet are treated as the symbols in a base-[`alphabet.length`] number system. The key generator simply outputs the natural numbers in this number system.

This way of generating keys has the following advantages:
  - super fast 
  - memory efficient (the smallest possible keys are always used first)
  - guarantees that keys conform to a certain alphabet, which enables key generation when there are restrictions on allowed characters (e.g. CSS classes)
  
## API
  
### `createKeyFactory(config)`
  
Creates a key factory.
  
#### Arguments
  
1. config: (`KeyFactoryConfig`): A record that declares the `alphabet` to use for the keys and optionally a suffix/prefix that will be added to each key.
  
#### Returns
  
(`Factory`): A key factory that returns a unique key on each call.
  
#### Example
  
```ts
// Characters that are allowed in CSS class names.
const CLASS_ALPHABET = "_-abcdefghijklmnopqrstuvwxyz0123456789";

const classNameGenerator = createKeyFactory({
  alphabet: CLASS_ALPHABET,
  prefix: "_"
});

classNameGenerator() // __
classNameGenerator() // _-
classNameGenerator() // _a
classNameGenerator() // _b
```
  
### `createKeyFactoryWithPool(config)`

Creates a pooled key factory.

#### Arguments
  
1. config: (`KeyFactoryConfig`): A record that declares the `alphabet` to use for the keys and optionally a suffix/prefix that will be added to each key.

#### Returns

(`FactoryWithPool`): A pooled key factory, which provides two functions: `get` and `put`. `get` returns a key from the pool or creates a new one if the pool is empty. `put` returns a key to the pool. 

#### Example

```ts
// Characters that are allowed in CSS class names.
const CLASS_ALPHABET = "0123456789";

const keyPool = createKeyFactoryWithPool({
  alphabet: CLASS_ALPHABET,
  prefix: "$",
  suffix: ";"
});

keyPool.get() // $0;
keyPool.get() // $1;
keyPool.get() // $2;
keyPool.put("$1;")
keyPool.get() // "$1;"
```

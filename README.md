# Extendable Error

**YOU PROBABLY DON'T NEED THIS PACKAGE ANYMORE.**

The 6 lines of code below works well enough in modern JavaScript engines:

```ts
export abstract class ExtendableError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
  }
}
```

---

A simple abstract extendable error class that extends `Error`, which handles the error `name`, `message` and `stack` property.

## Install

```sh
npm install extendable-error --save
```

## Usage

```ts
import ExtendableError from "extendable-error";

class SomeError extends ExtendableError {
  constructor(message: string, public code: number) {
    super(message);
  }
}

let someError = new SomeError("Some error", 0x0001);
```

## License

MIT License.

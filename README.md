# 🔀 React use bireducer [![tests](https://img.shields.io/github/workflow/status/soywod/react-use-bireducer/integration?label=tests&logo=github&style=flat-square)](https://github.com/soywod/react-use-bireducer/actions/workflows/test.yaml) [![codecov](https://img.shields.io/codecov/c/github/soywod/react-use-bireducer?logo=codecov&style=flat-square)](https://app.codecov.io/gh/soywod/react-use-bireducer) [![npm](https://img.shields.io/npm/v/react-use-bireducer?logo=npm&label=npm&color=success&style=flat-square)](https://www.npmjs.com/package/react-use-bireducer)

React hook for managing effects within reducers.

## Installation

```bash
yarn add react-use-bireducer
# or
npm install react-use-bireducer
```

## Usage

The API is very close to `useReducer`, except that:

- The state reducer returns `[State, Effect[]]` instead of `State`
- You need to pass an effect reducer

```typescript
import {useBireducer} from "react-use-bireducer";

declare function stateReducer(state: State, action: Action): [State, Effect[]];
declare function effectReducer(effect: Effect): EffectCleanup | void;

const [state, dispatch] = useBireducer(stateReducer, effectReducer, defaultState);
```

See a complete [live example on
CodeSandbox](https://codesandbox.io/s/react-use-bireducer-example-20n30w?file=/src/App.tsx).

## Development

Development environment is managed by [Nix](https://nixos.org/). First
you need to install it:

```bash
curl -L https://nixos.org/nix/install | sh
```

Then you can start your development environment by spawning a Nix
shell:

```bash
nix-shell
```

Now you should be able to clone the repo and install Node.js
dependencies:

```bash
git clone https://github.com/soywod/react-use-bireducer.git
cd react-use-bireducer
yarn
```

You can leave the development environment either by killing your
terminal or by entering the command `exit`.

## Tests

Tests are handled by [Jest](https://jestjs.io/) (`.test` files) and
[React Testing
Library](https://testing-library.com/docs/react-testing-library/intro/)
(`.spec` files).

```bash
yarn test
```

## Sponsoring

[![github](https://img.shields.io/badge/-GitHub%20Sponsors-fafbfc?logo=GitHub%20Sponsors&style=flat-square)](https://github.com/sponsors/soywod)
[![paypal](https://img.shields.io/badge/-PayPal-0079c1?logo=PayPal&logoColor=ffffff&style=flat-square)](https://www.paypal.com/paypalme/soywod)
[![ko-fi](https://img.shields.io/badge/-Ko--fi-ff5e5a?logo=Ko-fi&logoColor=ffffff&style=flat-square)](https://ko-fi.com/soywod)
[![buy-me-a-coffee](https://img.shields.io/badge/-Buy%20Me%20a%20Coffee-ffdd00?logo=Buy%20Me%20A%20Coffee&logoColor=000000&style=flat-square)](https://www.buymeacoffee.com/soywod)
[![liberapay](https://img.shields.io/badge/-Liberapay-f6c915?logo=Liberapay&logoColor=222222&style=flat-square)](https://liberapay.com/soywod)

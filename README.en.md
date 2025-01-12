# outilx

[![NPM Version](https://img.shields.io/npm/v/outilx.svg)](https://www.npmjs.com/package/outilx)
[![Build Status](https://img.shields.io/github/workflow/status/sunny-117/outilx/CI)](https://github.com/sunny-117/outilx/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![](https://img.shields.io/github/followers/sunny-117.svg?style=social&label=Follow%20Me)](https://github.com/Sunny-117)

A modern JavaScript utility library delivering modularity, performance & extras.

English | [简体中文](./README.md)

## ✨ Features

- 🚀 Modern and lightweight
- 📦 Tree-shakeable ESM
- 💪 Written in TypeScript
- 🧪 Thoroughly tested
- 📝 Well documented

## 📦 Installation

```bash
# Using npm
npm install outilx

# Using yarn
yarn add outilx

# Using pnpm
pnpm add outilx
```

## 🔨 Usage

```javascript
import { toArray, createIncrementingArray } from "outilx";

// Convert value to array
toArray('foo') // => ['foo']
toArray(['foo']) // => ['foo']
toArray(null) // => []

// Create incrementing array
createIncrementingArray(3) // => [1, 2, 3]
```

## 📚 API Documentation

### Array

- `toArray(val, defaultValue?)` - Converts a value to an array
- `createIncrementingArray(length)` - Creates an array of incrementing numbers
- `pipeFromArray(fns)` - Composes an array of functions into a single function
- `shuffleArray(array)` - Randomly shuffles an array

### Cache

- `TipCache` - LRU Cache implementation with TTL support
- `memoize(fn)` - Creates a function that memoizes the result

### Config

- `getConfigFromDataSource(dataSource)` - Maps configuration data into lookup objects

### JSON

- `isJsonString(str)` - Checks if a string is valid JSON
- `stringifyJsonWithFallback(json, fallback)` - Safely stringifies JSON with fallback
- `parseJsonWithFallback(jsonValue, fallback)` - Safely parses JSON with fallback

### URL

- `getUrlParams(query)` - Converts URL query string to an object

For more detailed documentation, visit: https://sunny-117.github.io/outilx/

## 🤝 Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## 📄 License

[MIT](LICENSE) © Sunny-117 
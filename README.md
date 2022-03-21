# TinyPNG

> A simple and tiny library for shrinking images using TinyPNG’s API

[![Coverage Status](https://coveralls.io/repos/github/rasshofer/tinypng/badge.svg?branch=master)](https://coveralls.io/github/rasshofer/tinypng?branch=master)

## Usage

```sh
npm install --save tinypng
```

```ts
import { TinyPNG } from 'tinypng';
import { readFileSync } from 'fs';

// Head over to https://tinypng.com/developers to get an API key
const client = new TinyPNG('<YOUR API KEY>');
```

```ts
(async () => {
  // Compress file
  const file = await client.compress(readFileSync('./some-file.png'));
  console.log(file);

  // Compress URL
  const url = await client.compress('http://example.com/example.jpg');
  console.log(url);
})();
```

## Resizing images

The resizing methods `scale`, `fit`, `cover`, and `thumb` are currently supported. See <https://tinypng.com/developers/reference#request-options> for more details.

```ts
(async () => {
  // Compress file
  const file = await client.compress(readFileSync('./some-file.png'), {
    width: 123,
    height: 456,
    method: 'fit',
  });
  console.log(file);

  // Compress URL
  const url = await client.compress('http://example.com/example.jpg', {
    width: 123,
    height: 456,
    method: 'fit',
  });
  console.log(url);
})();
```

## Preserving metadata

Preserving `copyright` information, the GPS `location`, and the `creation` date are currently supported.

```ts
(async () => {
  // Compress file
  const file = await client.compress(readFileSync('./some-file.png'), {
    preserve: ['copyright'],
  });
  console.log(file);

  // Compress URL
  const url = await client.compress('http://example.com/example.jpg', {
    preserve: ['copyright'],
  });
  console.log(url);
})();
```

## Changelog

- 1.0.0
  - Initial version

## License

Copyright (c) 2022 [Thomas Rasshofer](https://thomasrasshofer.com/)  
Licensed under the MIT license.

See LICENSE for more info.

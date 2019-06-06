# DropStream
> Drop beginning bytes in a stream

```
npm install drop-stream
```

## Usage

```js
const bl = require('bl')
const { drop, dropBytes, dropUntil } = require('drop-stream')


bl('hello\nworld')
  .pipe(drop((buf) => buf.indexOf('\n'))
  .on('drop', (buf) => console.log(`${buf}`)) // hello\n
  .pipe(bl(err, buf) => console.log(`${buf}`)) // world

bl('hello\nworld')
  .pipe(dropBytes(6))
  .on('drop', (buf) => console.log(`${buf}`)) // hello\n
  .pipe(bl(err, buf) => console.log(`${buf}`)) // world

bl('hello\nworld')
  .pipe(dropUntil('\n'))
  .on('drop', (buf) => console.log(`${buf}`)) // hello\n
  .pipe(bl(err, buf) => console.log(`${buf}`)) // world
```

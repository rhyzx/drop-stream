const test = require('tape')
const bl = require('bl')
const { dropBytes, dropUntil } = require('.')

test('dropBytes', (t) => {
  t.plan(2)

  const input = bl()
  const output = bl((err, buf) => {
    t.equal(`${buf}`, 'world')
  })

  input.push('hello\nw')
  input.push('orld')

  input
    .pipe(dropBytes(6))
    .on('droped', (buf) => t.equal(`${buf}`, 'hello\n'))
    .pipe(output)
})

test('dropUntil', (t) => {
  t.plan(2)

  const input = bl()
  const output = bl((err, buf) => {
    t.equal(`${buf}`, 'world')
  })

  input.push('hello\nw')
  input.push('orld')

  input
    .pipe(dropUntil('\n'))
    .on('droped', (buf) => t.equal(`${buf}`, 'hello\n'))
    .pipe(output)
})


test('dropUntil: drop first occurrence only', (t) => {
  t.plan(1)

  const input = bl('1\n2\n3')
  const output = bl((err, buf) => {
    t.equal(`${buf}`, '2\n3')
  })

  input
    .pipe(dropUntil('\n'))
    .pipe(output)
})

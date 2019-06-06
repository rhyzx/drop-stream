const { Transform } = require('stream')

class DropStream extends Transform {
  constructor(search) {
    super()
    this.buf = Buffer.from([])
    this.search = search
  }
  _transform(chunk, encoding, cb) {
    // already dropped, pass through
    if (!this.buf) return cb(null, chunk)

    const buf = Buffer.concat([this.buf, chunk])
    this.buf = buf

    const index = this.search(buf) + 1
    if (index > 0) {
      const drop = buf.slice(0, index)
      const remain = buf.slice(index)

      this.emit('drop', drop)
      this.push(remain)
      this.buf = null
    }
    cb(null)
  }
}

const drop = (search) => new DropStream(search)
const dropBytes = (n) => drop((buffer) => buffer.length >= n ? n-1 : -1)
const dropUntil = (pattern) => drop((buffer) => buffer.indexOf(pattern))

exports.drop = drop
exports.dropBytes = dropBytes
exports.dropUntil = dropUntil

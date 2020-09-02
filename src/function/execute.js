const {exec} = require('child_process')
const iconv = require('iconv-lite')
const options = {
  encoding: 'buffer'
}

function execute(command, encoding = 'gbk') {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      resolve({
        stdout: iconv.decode(stdout, encoding),
        stderr: iconv.decode(stderr, encoding)
      })
    })
  })
}

module.exports = execute

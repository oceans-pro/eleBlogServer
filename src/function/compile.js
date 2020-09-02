const execute = require('./execute')


function compile(inputFilename, outputFilename = inputFilename) {
  return new Promise((resolve, reject) => {
    execute(`tsc ${inputFilename} --outfile ${outputFilename}`)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = compile

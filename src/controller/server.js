const fs = require('fs')
const express = require('express')
const app = express()
const tsc = require('../function/compile')
const {resolve} = require('path')
const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const bodyParser = require('body-parser')
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})
app.all('*', function(req, res, next) {
  // 设为指定的域
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('X-Powered-By', ' 3.2.1')
  next()
})
app.get('/', (req, res) => {
  res.send('home')
})

function getRealPath(path) {
  return resolve(__dirname, path)
}

// http://localhost:3000/tsc/hello
app.get('/tsc/hello', (req, res) => {
  let input = getRealPath('../resource/test.ts')
  let output = getRealPath('../resource/test.js')
  console.log(input, output)
  tsc(input, output).then(data => {
    fs.readFile(output, (err, data) => {
      if (err) {
        res.send('error-read-js')
      }
      let jsStr = data.toString()
      res.send({jsStr: jsStr})
    })
  }).catch(err => {
    console.log(err)
  })
})

app.post('/tsc/', urlencodedParser, (req, res) => {
  let ts = req.body.ts
  let input = getRealPath('../resource/input.ts')
  let output = getRealPath('../resource/output.js')
  fs.writeFile(input, ts, err => {
    if (err) {
      res.send(err)
    }
    tsc(input, output).then(data => {
      fs.readFile(output, (err, data) => {
        if (err) {
          res.send('error-read-js')
        }
        let js = data.toString()
        res.send(js)
      })
    }).catch(err => {
      console.log(err)
    })
  })
})

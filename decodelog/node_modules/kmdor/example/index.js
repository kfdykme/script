const kmdor = require('../src/index.js')
// import kmdor from '../src/index'
kmdor.Do(['ls', ['ls -a', ['pwd']]], './', function () {
  console.info('end')
})

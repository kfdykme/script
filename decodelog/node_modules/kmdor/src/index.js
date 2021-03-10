'use strict'

/**
 * @module Kmdor
 * @desc 一个js调用命令行的工具
 * @example Do(['ls',['ls -l']], './', function () { console.info('end')})
 */

/**
 * @method Do
 * @param {array} obj 一个结构为['命令', [' 第二个命令', ['第三个命令']]]　的数组
 * @param {string} cwd　运行命令的当前目录
 * @param {function} doOnEnd　运行结束后所进行的操作
 */
function Do(obj, cwd, doOnEnd) {
  if (cwd == null) {
    cwd = './'
  }

  let order = obj[0]
  let next = obj[1]

  let exec = require('child_process').exec

  let re = exec(order, {cwd: cwd})
  Log('\n----------------\nDo\t' +  order + '\n')

  re.stdout.on('data', data => {
    Log(data)
  })

  re.stderr.on('data', data => {
    Error(data)
  })

  re.on('exit', (code, signal) => {
    Log('Exit\t' + order　+ '\n----------------\n\n')
    if (next != null) {
      Do(next, cwd, doOnEnd)
    } else {
      if (doOnEnd != null) {
        doOnEnd()
      }
    }
  })
}


let mLog = console.info
let mError = console.error

function Log (data) {
  mLog(data)
}

function Error (data) {
  mError(data)
}

/**
 * @method
 * @param {function} log 非必选 , 如果为空则使用console.info 和 console.error
 * @param {function} err 非必选 , 如果为空则与log相同
 */
function init(log, err) {
  if (log != null) {
    mLog = log
    if (err == null) {
      mError = log
    } else {
      mError = err
    }
  } else {
    mLog = console.info
    mError = console.error
  }
}


module.exports.Do = Do
module.exports.Log = Log
module.exports.Error = Error
module.exports.init = init

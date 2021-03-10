# Kmdor

This is a tool you can use shell command by js.


## example

``` javascript
const kmdor = require('kmdor')

kmdor.Do(['ls', ['ls -a']], './', function () {
  console.info('end function ')
})
```

## Methods

### Do

```
/**
 * @method Do
 * @param {array} obj 一个结构为['命令', [' 第二个命令', ['第三个命令']]]　的数组
 * @param {string} cwd　运行命令的当前目录
 * @param {function} doOnEnd　运行结束后所进行的操作
 */
```

### init

```

/**
 * @method
 * @param {function} log 非必选 , 如果为空则使用console.info 和 console.error
 * @param {function} err 非必选 , 如果为空则与log相同
 */
```

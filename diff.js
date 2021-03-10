const argvs = process.argv
 

const targetFile = argvs[2]

if (targetFile === undefined) {
    console.info('no file input')
    return
}

// try to get file
const fs = require('fs')
const text = fs.readFileSync(targetFile) + ''

// console.info(text)
const currentStart = '<<<<<<< HEAD'
const middle = '======='
const masterEnd = '>>>>>>> master'


const hasOneDiff = (text) => {
    const reg = /<<<<<<< HEAD/g
    const res = text.match(reg)
    return res && res.length === 1
}

const getCIndex = (text) => {
    const startReg = new RegExp(currentStart)
    return text.match(startReg).index
}

const getMIndex = (text) => {
    const middleReg = new RegExp(middle)

    const middleIndex = text.match(middleReg).index
    return middleIndex
}

const getEIndex = (text) => {
    const masterEndReg = new RegExp(masterEnd)
    const masterIndex = text.match(masterEndReg).index + masterEnd.length
    return masterIndex
}

const getCurrentContent = (text) => { 

    const sIndex = getCIndex(text)
    const middleIndex = getMIndex(text)
    const masterIndex = getEIndex(text)

    const currentContent = text.substring(0, sIndex) + 
    text.substring(sIndex + currentStart.length, middleIndex) +
    text.substring(masterIndex)
 
    return currentContent
}

const getMasterConntent = (text) => {
    
    const sIndex = getCIndex(text)
    const middleIndex = getMIndex(text)
    const masterIndex = getEIndex(text)

    const currentContent = text.substring(0, sIndex) + 
    text.substring(middleIndex + middle.length, masterIndex - masterEnd.length) +
    text.substring(masterIndex)
 
    return currentContent
}

const hasOne = hasOneDiff(text)

console.info('hasOne', hasOne)

if (!hasOne) {
    return
}


const currentContent = getCurrentContent(text)
const inCommingContent = getMasterConntent(text)
const backupFileName = targetFile + '.bk'

// fs.writeFileSync(backupFileName, inCommingContent)
fs.writeFileSync(targetFile, currentContent)

const { exec } = require('child_process');

exec('git add ' + targetFile, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    fs.writeFileSync(targetFile, inCommingContent)
  });
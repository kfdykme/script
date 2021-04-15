const exec = require('child_process').exec

const IS_DEBUG = false
let TARGE_PROCESS_NAME = process.argv[2] + '.exe' 
/**
 * 
 * @param {name, pid} processInfo 
 */
const killProcess = (processInfo) => {
    const TASK_KILL_CMD = 'taskkill /F /pid '
    processInfo.forEach((info) => {
        if (!info.pid) {
            return 
        }
        const currentCmd = TASK_KILL_CMD + info.pid 

        console.info(currentCmd)

        exec(currentCmd, { maxBuffer: 5000 * 1024}, (err, stdout, stderr) => {
            if (err) {
                // console.error(err)
                return false
            }
            // console.info(stdout)
            return true;
        })
    })
}

const getProcessFromExe = (res) => {


    res = res.split('\n').filter((line) => {
        return line.toLowerCase().indexOf(TARGE_PROCESS_NAME) !== -1 || IS_DEBUG
    }).map((line) => {
        return line.toLowerCase().trim()
    }).map((line) => {
        const [name, pid, cons] = line.replace(/ +/g, ' ').split(' ')
        return {
            name,
            pid
        }
    })
    
    console.info(res)
    killProcess(res)
}

const windowService = (cmd) => { 

    exec(cmd, {maxBuffer: 5000 * 1024}, (err, stdout, stderr) => {
        if (err) {
            console.error(err)
            return false
        }
        getProcessFromExe(stdout)
    })
}
 
const initArg = (opt) => {
    TARGE_PROCESS_NAME = opt + '.exe'
}

const handle = (opt) => {
    windowService('tasklist')
}

exports.initArg = initArg
exports.handle = handle

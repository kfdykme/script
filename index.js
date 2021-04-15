#!/usr/bin/env node
 
const Processer = require('./processer')

const args = process.argv
 
const FLAG_GET_OPTION = 'const FLAG_GET_OPTION'
const FLAG_GET_PROCESS_ARG = 'const FLAG_GET_PROCESS_ARG'

let flag = FLAG_GET_OPTION

const handleGetOption = (opt) => {
    if (opt == '-p') {
        flag = FLAG_GET_PROCESS_ARG
    }
}

const handleGetProcessArg = (opt) => {
    Processer.initArg(opt)
    Processer.handle()
}

const main = async (options) => {
    
    options.forEach((opt) => { 
        if (FLAG_GET_OPTION == flag) {
            handleGetOption(opt)
            return;
        }

        if (FLAG_GET_PROCESS_ARG) {
            handleGetProcessArg(opt)
        }
    })
}


main(args.splice(2))
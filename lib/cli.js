#!/usr/bin/env node

// sungiso ./test

const commandLineArgs = require('command-line-args');
const optionDefinitions = [
    { name: 'html', type: Boolean },
    { name: 'src', type: String, defaultOption: true, defaultValue: "./src" },
];
const options = commandLineArgs(optionDefinitions);

const htmlOptimization = require('./html/index');

htmlOptimization(options);
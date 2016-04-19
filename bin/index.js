#!/usr/bin/env node
(function () {

    var DirectoryLayout = require('../lib/index.js'),
        program = require('commander'),
        options;

    program
        .version('1.0.2')
        .usage('[options] <path, ...>')
        .option('-g, --generate <path> <output-directory-layout-file-path>', 'Generate directory layout')
        .option('-v, --verify <input-directory-layout-file-path> <path>', 'Verify directory layout')
        .parse(process.argv);

    if(program.generate) {
        options = {
            output: program.args[0] || 'layout.md',
            ignore: []
        };

        console.log('Generating layout for ' + program.generate + '... \n')

        DirectoryLayout
            .generate(program.generate, options)
            .then(function() {
                console.log('Layout generated at: ' + options.output);
            });
    }
    else if(program.verify) {
        options = {
            root: program.args[0]
        };

        console.log('Verifying layout for ' + options.root + ' ...\n');

        DirectoryLayout
            .verify(program.verify, options)
            .then(function() {
                console.log('Successfully verified layout available in ' + program.verify + '.');
            });
    }

}());
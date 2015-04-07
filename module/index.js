/* global require, module */
'use strict';

var generators = require('yeoman-generator');
// var util = require('util');
// var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');

var ModuleGenerator = generators.NamedBase.extend({

    initializing: function() {
        this.moduleName = this._.camelize(this.name);
    },

    prompting: function() {

        var done = this.async();

        // have Yeoman greet the user
        this.log(yosay('Create other awesome module into ' + chalk.red('coreJS') + ' webapp!'));

        var prompts = [{
            type: 'confirm',
            name: 'addCssFolder',
            message: 'Would you like to have some \'css\' in your module?',
            default: true
        }, {
            type: 'confirm',
            name: 'addViewsFolder',
            message: 'Would you like to have some \'view\' in your module?',
            default: true
        }, {
            type: 'confirm',
            name: 'addLayoutsFolder',
            message: 'Would you like to have some \'layout\' in your module?',
            default: true
        }, {
            type: 'confirm',
            name: 'addTemplatesFolder',
            message: 'Will you need templates into your views ?',
            default: true
        }, {
            type: 'confirm',
            name: 'addResFolder',
            message: 'This new module, will need own configuration?',
            default: true
        }];

        this.prompt(prompts, function(props) {
            this.addCssFolder = props.addCssFolder;
            this.addViewsFolder = props.addViewsFolder;
            this.addLayoutsFolder = props.addLayoutsFolder;
            this.addTemplatesFolder = props.addTemplatesFolder;
            this.addResFolder = props.addResFolder;

            done()
        }.bind(this));
    },

    configuring: function() {

        this.moduleDir = 'app/scripts/modules/' + this.name;

        this.context = {
            moduleName: this.moduleName
        };

    },

    writing: {

        scaffoldFolder: function() {

            this.mkdir(this.moduleDir);

            if (this.addCssFolder) {
                this.mkdir(this.moduleDir + '/css');
            }
            if (this.addViewsFolder) {
                this.mkdir(this.moduleDir + '/views');
            }
            if (this.addLayoutsFolder) {
                this.mkdir(this.moduleDir + '/layouts');
            }
            if (this.addTemplatesFolder) {
                this.mkdir(this.moduleDir + '/templates');
            }
            if (this.addResFolder) {
                this.mkdir(this.moduleDir + '/res');
            }
        },

        copyMainFiles: function() {

            if (this.addCssFolder) {
                this.copy('css/main.scss', this.moduleDir + '/css/main.scss');
                this.template('css/_module.scss', this.moduleDir + '/css/_' + this.moduleName + '.scss', this.context);
            }
            // if (this.addViewsFolder) {
            //     this.copy(this.name + '/views');
            // }
            // if (this.addLayoutsFolder) {
            //     this.copy(this.name + '/layouts');
            // }
            // if (this.addTemplatesFolder) {
            //     this.copy(this.name + '/templates');
            // }
            if (this.addResFolder) {
                this.copy('res/config.json', this.moduleDir + '/res/config.json');
            }

            this.template('_controller.js', this.moduleDir + '/controller.js', this.context);
            this.template('_dispatcher.js', this.moduleDir + '/dispatcher.js', this.context);
            this.template('_start.js', this.moduleDir + '/start.js', this.context);
        }
    },

    conflicts: function() {},
    install: function() {},
    end: function() {
        this.log(yosay('The module ' + chalk.green(this.moduleName) + ' has been built! :) ' + chalk.red('Bye!')));
    }

});

module.exports = ModuleGenerator;

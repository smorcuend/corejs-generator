/* global require, module */
'use strict';

var generators = require('yeoman-generator');
// var util = require('util');
// var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');

var CoreJSGenerator = generators.Base.extend({

    // Override the Base constructor to provide custom options
    // note: arguments and options should be defined in the constructor.
    constructor: function() {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        // This makes `appname` a required argument.
        // this.argument('appname', {
        //     type: String,
        //     required: true
        // });
    },

    //Yeoman run loop. Priorities are defined as special prototype method names. For more info,
    //see http://yeoman.io/authoring/running-context.html

    initializing: function() {
        this.appName = this._.camelize(this.appname);
    },

    prompting: function() {

        var done = this.async();

        // have Yeoman greet the user
        this.log(yosay('Create other awesome ' + chalk.red('coreJS') + ' webapp!'));

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: 'What is the app\'s name?',
            default: this.appName
        }, {
            type: 'input',
            name: 'appRepository',
            message: 'What is the app\'s repository url?',
        }, {
            type: 'input',
            name: 'appHomepage',
            message: 'What is the app\'s homepage?',
        }];

        this.prompt(prompts, function(props) {

            this.appName = props.appName;
            this.appRepository = props.appRepository;
            this.appHomepage = props.appHomepage;

            done();

        }.bind(this));
    },

    configuring: function() {

        this.context = {
            appName: this.appName,
            appRepository: this.appRepository,
            appHomepage: this.appHomepage
        };

        this.copy('Gruntfile.js', 'Gruntfile.js');
        this.copy('.bowerrc', '.bowerrc');
        this.copy('.npmrc', '.npmrc');
        this.copy('.jshintrc', '.jshintrc');
        this.copy('.selenium', '.selenium');
        this.copy('.gitignore', '.gitignore');
        this.copy('.editorconfig', '.editorconfig');
        this.copy('.jsdoc', '.jsdoc');
        this.copy('README.md', 'README.md');
    },

    writing: {

        copyRootDirFiles: function() {
            this.template('_package.json', 'package.json', this.context);
            this.template('_bower.json', 'bower.json', this.context);
        },
        scaffoldFolders: function() {
            //App folder scaffold
            this.mkdir('app');
            this.mkdir('app/css');
            this.mkdir('app/res');
            this.mkdir('app/res/config');
            this.mkdir('app/img');
            this.mkdir('app/scripts');
            this.mkdir('app/scripts/modules');
            this.mkdir('app/scripts/modules/init');

            //Test folder scaffold
            this.mkdir('test');
            this.mkdir('test/selenium');
            this.mkdir('test/selenium/paths');
            this.mkdir('test/selenium/spec');
            this.mkdir('test/spec');
            this.mkdir('test/src');
            this.mkdir('test/src/myPage');
        },

        //App directory boilerplate files
        copyAppDirFiles: function() {
            this.copy('app/oauth.html', 'app/oauth.html');

            this.copy('app/css/main.scss', 'app/css/main.scss');
            this.copy('app/css/_variables.scss', 'app/css/_variables.scss');

            this.copy('app/scripts/define.js', 'app/scripts/define.js');
            this.copy('app/scripts/main.js', 'app/scripts/main.js');

            this.copy('app/scripts/modules/loader.js', 'app/scripts/modules/loader.js');
            this.copy('app/scripts/modules/init/start.js', 'app/scripts/modules/init/start.js');

            this.copy('app/res/config/facebook.json', 'app/res/config/facebook.json');
            this.copy('app/res/config/google.json', 'app/res/config/google.json');

            this.template('app/_index.html', 'app/index.html', this.context);

            this.template('app/res/config/_config.json', 'app/res/config/config.json', this.context);
        },

        //Test directory boilerplate files
        copyTestDirFiles: function() {
            this.copy('test/define.js', 'test/define.js');
            this.copy('test/index.html', 'test/index.html');

            this.copy('test/selenium/testSuite.js', 'test/selenium/testSuite.js');
            this.copy('test/selenium/paths/paths.js', 'test/selenium/paths/paths.js');
            this.copy('test/selenium/spec/myPage.js', 'test/selenium/spec/myPage.js');
            this.copy('test/selenium/src/myPage/MyPage.js', 'test/selenium/src/myPage/MyPage.js');
            this.copy('test/selenium/src/myPage/MyPageModel.js', 'test/selenium/src/myPage/MyPageModel.js');

            this.copy('test/spec/example.js', 'test/spec/example.js');
            this.copy('test/spec/testSuite.js', 'test/spec/testSuite.js');
        }

    },
    conflicts: function() {},
    install: function() {
        this.installDependencies({
            skipInstall: this.options['skip-install'],
            bower: false
        });
    },
    end: function() {
        this.log(yosay('The webapp ' + chalk.green(this.appName) + ' has been built! :) ' + chalk.red('Bye!')));
    }

});

module.exports = CoreJSGenerator;

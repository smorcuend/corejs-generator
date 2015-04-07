'use strict';

module.exports = function(grunt) {

    // Init our modular gruntfile and return the tasks it uses
    require('grunt-corejs-build')(grunt);

    grunt.config.merge({});

    grunt.registerTask('locatelocales', 'Search lost locales.', function() {
        var fs = require('fs');
        var hiddenFilePattern = /^\./;

        var options = this.options({
            originLanguage: 'es-ES',
            path: 'app/res/locales',
            lostLocalesPath: 'target/locatelocales/lostLocales.json',
            duplicatedLocalesPath: 'target/locatelocales/duplicatedLocales.json'
        });

        var folders = fs.readdirSync(options.path);

        var availableLanguages = [];

        folders.forEach(function(file) {
            if (!hiddenFilePattern.test(file)) {
                availableLanguages.push(file);
            }

        });

        grunt.log.write('Idiomas detectados: ' + availableLanguages + ' ').ok();

        var locales = {};

        //rellenamos la variable local, con todos los literales
        for (var i = 0; i < availableLanguages.length; i++) {
            locales[availableLanguages[i]] = grunt.file.readJSON(options.path + '/' + availableLanguages[i] + '/locales.json');
        }

        //mapeamos los q falta
        var mapLostLocales = {};
        var mapDuplicatedLocales = {};

        for (var key in locales[options.originLanguage]) {
            for (var searchedLanguage in locales) {
                if (searchedLanguage !== options.originLanguage) {

                    //buscamos si no existen o estan vacios
                    if (!locales[searchedLanguage][key]) {

                        if (!mapLostLocales[searchedLanguage]) {
                            mapLostLocales[searchedLanguage] = [];
                        }
                        mapLostLocales[searchedLanguage].push({
                            key: key,
                            spanish: locales['es-ES'][key],
                            english: locales['en-GB'][key]
                        });

                    } else if (locales[searchedLanguage][key] === locales[options.originLanguage][key]) {
                        //buscamos si estan duplicados
                        if (!mapDuplicatedLocales[searchedLanguage]) {
                            mapDuplicatedLocales[searchedLanguage] = [];
                        }
                        mapDuplicatedLocales[searchedLanguage].push({
                            key: key,
                            spanish: locales['es-ES'][key],
                            english: locales['en-GB'][key],
                            current: locales[searchedLanguage][key]
                        });
                    }
                }
            }
        }
        grunt.log.write('Buscamos vacios o duplicados ').ok();
        //los sacamos a un fichero
        grunt.file.write(options.lostLocalesPath, JSON.stringify(mapLostLocales));
        grunt.file.write(options.duplicatedLocalesPath, JSON.stringify(mapDuplicatedLocales));
        grunt.log.write('Generamos Ficheros ').ok();

    });

    grunt.registerTask('update:locales', 'update locales.', function(language) {

        var options = this.options({
            sourceFilePath: 'update.json',
            path: 'app/res/locales',
            languageToUpdate: 'it-IT'
        });

        options.languageToUpdate = language || options.languageToUpdate;

        grunt.log.write('Updating locales: ' + options.languageToUpdate + ' from file: ' + options.sourceFilePath + ' ').ok();

        var source = grunt.file.readJSON(options.sourceFilePath);

        var destinyPath = options.path + '/' + options.languageToUpdate + '/locales.json';

        var destiny = grunt.file.readJSON(destinyPath);

        for (var key in source) {
            destiny[key] = source[key];
        }

        grunt.file.write(destinyPath, JSON.stringify(destiny));

        grunt.log.write('Generating output ').ok();

    });

};

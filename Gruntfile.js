module.exports = function(grunt) {

    var banner = '/**\n    @name: <%= pkg.name %> \n    @version: <%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>) \n    @author: <%= pkg.author %> \n    @url: <%= pkg.homepage %> \n    @license: <%= pkg.license %>\n*/\n';

    var files = [
                    'src/aping-flickr-directive.js',
                    'src/aping-flickr-helper.js',
                    'node_modules/angular-flickr-api-factory/src/angular-flickr-api-factory.js'
                ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files : {
                    'dist/aping-plugin-flickr.min.js' : files
                }
            },
            options: {
                banner: banner,
            }
        },
        concat: {
            options: {
                separator: ';',
                banner: banner,
            },
            dist: {
                files : {
                    'dist/aping-plugin-flickr.js' : files
                }
            },
        },
        watch: {
            minifiyJs: {
                files: files,
                tasks: ['uglify', 'concat'],
                options: {
                    spawn: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};


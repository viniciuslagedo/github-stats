module.exports = function(grunt) {
    var pkg = {
        src: {
              base: 'source/'
            , modulesSass: 'apps/**/*.sass'
            , angularModules: 'apps/**/*.module.js'
            , js: 'apps/**/!(*.specs).js'
            , angularTemplates: 'apps/**/*.html'
            , images: 'images/**/*'
            , html: 'index.html'
            , fonts: 'fonts/**/*'
        }
        , dest: {
            public: ['./public/**/*', '!./www/lib/']
        }
    };

    grunt.initConfig({
        copy: {
            images: {
                files: [{expand: true, cwd: pkg.src.base, src: pkg.src.images, dest: 'public/'}]
            }
            , html: {
                files: [{expand: true,  cwd: pkg.src.base, src: pkg.src.html, dest: 'public/'}]
            }
            , fonts: {
                files: [{expand: true, cwd: pkg.src.base, src: pkg.src.fonts, dest: 'public/'}]
            }
            , angularTemplates: {
                files: [{expand: true, cwd: pkg.src.base, src: pkg.src.angularTemplates, dest: 'public/'}]
            }
        }
        , jshint: {
            scripts: {
                options: {
                    jshintrc: true
                    , reporter: require('jshint-stylish')
                }
                , default: [pkg.src.base + pkg.src.angularModules, pkg.src.base + pkg.src.js]
            }
        }
        , concat: {
            scripts: {
                options: {
                    separator: ';'
                }
                , src: [pkg.src.base + pkg.src.angularModules, pkg.src.base + pkg.src.js]
                , dest: 'public/js/bundle.min.js'
            }
            , sass: {
                options: {
                    separator: '\n',
                }
                , src: 'public/css/apps/**/*.css'
                , dest: 'public/css/bundle.min.css'
            }
        }
        , ngAnnotate: {
            options: {
                add: true
            }
            , scripts: {
                files: {
                    'public/js/bundle.min.js': ['public/js/bundle.min.js']
                }
            }
        }
        , uglify: {
            scripts: {
                files: {
                    'public/js/bundle.min.js': ['public/js/bundle.min.js']
                }
            }
        }
        , sass: {
            options: {
                sourceMap: true
                , outputStyle: 'compact'
            }
            , default: {
                files: [{expand: true, cwd: pkg.src.base, src: pkg.src.modulesSass, dest: 'public/css/', ext: '.css'}]
            }
        }
        , clean: {
            sass: ["public/css/apps/", "!public/css/*.min.css"]
        }
        , watch: {
            options: {
              livereload: true
            }
            , sass: {
                files: [pkg.src.base + pkg.src.modulesSass]
                , tasks: ['compileSass']
            }
            , scripts: {
                files: [
                    pkg.src.base + pkg.src.js
                    , pkg.src.base + pkg.src.angularTemplates
                ]
                , tasks: ['scripts']
            }
            , images: {
                files: [pkg.src.base + pkg.src.images]
                , tasks: ['copy:images']
            }
            , html: {
                files: [pkg.src.base + pkg.src.html]
                , tasks: ['copy:html']
            }
            , fonts: {
                files: [pkg.src.base + pkg.src.fonts]
                , tasks: ['copy:fonts']
            }
        }
        , connect: {
            default: {
                options: {
                    port: 8080
                    , base: 'public'
                    , debug: true
                    , livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks ('grunt-contrib-jshint');
    grunt.loadNpmTasks ('grunt-contrib-uglify');
    grunt.loadNpmTasks ('grunt-contrib-concat');
    grunt.loadNpmTasks ('grunt-sass');
    grunt.loadNpmTasks ('grunt-contrib-watch');
    grunt.loadNpmTasks ('grunt-contrib-copy');
    grunt.loadNpmTasks ('grunt-ng-annotate');
    grunt.loadNpmTasks ('grunt-contrib-clean');
    grunt.loadNpmTasks ('grunt-contrib-connect');

    grunt.registerTask('compileSass', [
        'sass'
        , 'concat:sass'
        , 'clean:sass'
    ]);

    grunt.registerTask('scripts', [
        'jshint:scripts'
        , 'concat:scripts'
        , 'ngAnnotate:scripts'
        , 'uglify:scripts'
        , 'copy:angularTemplates'
    ]);

    grunt.registerTask('build', [
        'copy:images'
        , 'copy:html'
        , 'copy:fonts'
        , 'scripts'
        , 'compileSass'
    ]);

    grunt.registerTask('default', ['build', 'connect:default', 'watch']);

};
module.exports = function (grunt) {

    grunt.initConfig({

        jshint: {
            all: ['public/src/js/**/*.js']
        },

        uglify: {
            build: {
                files: {
                    'public/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
                }
            }
        },

        sass: {
            build: {
                files: {
                    'public/dist/css/style.css': 'public/src/css/style.scss'
                }
            }
        },

        cssmin: {
            build: {
                files: {
                    'public/dist/css/style.min.css': 'public/dist/css/style.css'
                }
            }
        },

        watch: {
            css: {
                files: ['public/src/css/**/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            js: {
                files: ['public/src/js/**/*.js'],
                tasks: ['jshint', 'uglify']
            },
            html: {
                files: ['public/dist/**/*.html']
            },
            options: {
                livereload: true
            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'open:dev', 'watch']
        },

        open: {
            dev: {
                path: 'http://localhost:3000',
                app: 'Google Chrome'
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('default', ['sass', 'cssmin', 'jshint', 'uglify', 'concurrent']);

};

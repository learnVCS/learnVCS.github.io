module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
        	main: {
                files: [
                    {expand: true, src: ['app/**/*.html', '*.md'], dest: 'build/', flatten: true, filter: 'isFile'},
                    {expand: true, src: ['app/res/*'], dest: 'build/res/', filter: 'isFile'}
                ]
            }
        },
        watch: {
            css: {
                files: [
                'app/styles/**/*.scss',
                'app/styles/**/*.sass'
                ],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: [
                'app/**/*.js',
                'Gruntfile.js'
                ],
                tasks: [/*'jshint',*/ 'browserify'],
                options: {
                    livereload: true
                }
            },
            other: {
                files: [
                'app/**/*.html',
                './**/*.md',
                'app/res/*'
                ],
                tasks: ['copy'],
                options: {
                    livereload: true
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'main.css': 'main.scss',
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js']
        },
        browserify: {
            dist: {
                src: ['app/**/*.js'],
                dest: 'build/bundle.js'
            }
        },
        uglify: {
            build: {
                files: {
                    'build/bundle.min.js': ['build/bundle.js']
                }
            }
        }
    });

grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['copy', /*'sass', 'jshint',*/ 'browserify', 'watch']);
grunt.registerTask('build', ['copy', 'sass', 'jshint', 'browserify', 'uglify'])
};

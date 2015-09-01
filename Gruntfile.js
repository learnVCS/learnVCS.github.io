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
                tasks: ['sass']
            },
            js: {
                files: [
                'app/**/*.js',
                'Gruntfile.js'
                ],
                tasks: ['jshint', 'shell:browserify']
            },
            other: {
                files: [
                'app/**/*.html',
                './**/*.md',
                'app/res/*'
                ],
                tasks: ['copy']
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
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'app/**/*.js']
        },
        shell: {
            browserify: {
                command: 'browserify -t reactify app/app.js -o build/bundle.js'
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

grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['watch']);
grunt.registerTask('build', ['copy', 'sass', 'jshint', 'browserify', 'uglify'])
};

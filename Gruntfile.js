module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			css: {
				files: [
					'app/styles/**/*.scss',
					'app/styles/**/*.sass'
				],
				tasks: ['']
			},
			js: {
				files: [
					'app/**/*.js',
					'Gruntfile.js'
				],
				tasks: ['jshint']
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: ['Gruntfile.js', 'app/**/*.js']
		},
		browserify: {
			dist: {
				files: {
					'build/bundle.js': 
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['watch']);
};
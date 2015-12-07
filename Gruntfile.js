module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {},
    env: {
      dev: {
        NODE_ENV: 'development',
      },
      build: {
        NODE_ENV: 'production'
      }
    },
    clean: {
      build: ['build'],
      sassCache: ['.sass-cache'],
      bundle: ['build/bundle.js'],
      bundleMin: ['build/bundle.min.js'],
      indexZero: ['build/index-0.html']
    },
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['app/**/*.html', '!**/index.html', '*.md', 'humans.txt', 'robots.txt', 'sitemap.xml'],
          dest: 'build/',
          flatten: true,
          filter: 'isFile'
        }, {
          expand: true,
          cwd: 'app/',
          src: ['media/fonts/**/*'],
          dest: 'build/',
          filter: 'isFile'
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          options: {
            optimizationLevel: 7,
            progressive: true
          },
          cwd: 'app/',
          src: ['favicon.*', 'media/**/*.{png,jpg,svg}'],
          dest: 'build/'
        }]
      }
    },
    replace: {
      build: {
        src: ['app/index.html'],
        dest: 'build/index-0.html',
        replacements: [{
          from: 'critical.css',
          to: 'critical.min.css'
        }, {
          from: 'main.css',
          to: 'main.min.css'
        }, {
          from: 'bundle.js',
          to: 'bundle.min.js'
        }]
      }
    },
    watch: {
      css: {
        files: [
          'app/styles/**/*.scss',
          'app/styles/**/*.sass'
        ],
        tasks: ['newer:sass:dev']
      },
      js: {
        files: [
          'app/**/*.js',
          'Gruntfile.js'
        ],
        tasks: ['newer:eslint', 'newer:browserify']
      },
      media: {
        files: ['app/media/**/*', 'app/favicon.*'],
        tasks: ['newer:imagemin']
      },
      other: {
        files: [
          'app/**/*.html',
          './**/*.md',
          'humans.txt',
          'robots.txt',
          'sitemap.xml'
        ],
        tasks: ['newer:copy']
      },
      livereload: {
        files: ['build/**/*'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'build/main.css': 'app/styles/main.scss',
          'build/critical.css': 'app/styles/critical.scss'
        }
      },
      build: {
        options: {
          sourcemap: 'none',
          style: 'compressed'
        },
        files: {
          'build/main.min.css': 'app/styles/main.scss',
          'build/critical.min.css': 'app/styles/critical.scss'
        }
      }
    },
    eslint: {
      options: {
        silent: true,
        configFile: 'config/eslintConfig.json'
      },
      src: ['Gruntfile.js', 'app/**/*.js']
    },
    browserify: {
      dist: {
        src: ['app/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['reactify'],
          debug: true
        }
      },
    },
    connect: {
      livereload: {
        options: {
          open: true,
          base: 'build'
        }
      }
    },
    uglify: {
      build: {
        files: {
          'build/bundle.min.js': ['build/bundle.js']
        }
      }
    },
    inline: {
      dev: {
        src: 'app/index.html',
        dest: 'build/index.html'
      },
      build: {
        src: 'build/index-0.html',
        dest: 'build/index.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var devTaskList = ['env:dev', 'clean', 'imagemin', 'copy', 'sass:dev', 'eslint', 'browserify', 'inline:dev', 'connect', 'watch'];
  var prodTaskList = ['env:build', 'clean', 'imagemin', 'copy', 'sass:build', 'eslint', 'browserify', 'uglify', 'clean:bundle', 'replace', 'inline:build', 'clean:indexZero'];

  grunt.registerTask('default', devTaskList);
  grunt.registerTask('ci', prodTaskList);
  grunt.registerTask('build', prodTaskList);
};

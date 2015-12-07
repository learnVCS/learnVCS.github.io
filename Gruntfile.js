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
      bundleMin: ['build/bundle.min.js']
    },
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['app/**/*.html', '*.md', 'humans.txt', 'robots.txt', 'sitemap.xml'],
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
          cwd: 'app/',
          src: ['favicon.*', 'media/**/*.{png,jpg,svg}'],
          dest: 'build/'
        }]
      }
    },
    replace: {
      build: {
        src: ['build/index.html'],
        overwrite: true,
        replacements: [{
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
        tasks: ['newer:sass']
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
          'build/main.css': 'app/styles/main.scss'
        }
      },
      build: {
        options: {
          sourcemap: 'none',
          style: 'compressed'
        },
        files: {
          'build/main.min.css': 'app/styles/main.scss'
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
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var devTaskList = ['env:dev', 'clean', 'imagemin', 'copy', 'sass:dev', 'eslint', 'browserify', 'connect', 'watch'];
  var prodTaskList = ['env:build', 'clean', 'imagemin', 'copy', 'sass:build', 'eslint', 'browserify', 'uglify', 'clean:bundle', 'replace'];

  grunt.registerTask('default', devTaskList);
  grunt.registerTask('ci', prodTaskList);
  grunt.registerTask('build', prodTaskList);
};

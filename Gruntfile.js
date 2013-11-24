'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    project: {
      app: 'app',
      dist: 'static'
    },
    watch: {
      compass: {
        files: ['<%= project.app %>/scss/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer', 'cssmin:prod']
      },
      scripts: {
        files: ['<%= project.app %>/scripts/*.js', '<%= project.app %>/scripts/**/*.js', '<%= project.app %>/scripts/**/**/*.js'],
        tasks: ['concat:dist', 'uglify:dist', 'copy:scripts'],
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.app %>/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= project.app %>/scss',
        cssDir: '<%= project.app %>/css',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= project.dist %>/images',
        javascriptsDir: '<%= project.dist %>/scripts',
        fontsDir: '<%= project.dist %>/css/fonts',
        // importPath: '<%= project.app %>/scripts/bower_components',
        httpImagesPath: '<%= project.dist %>/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/css/fonts',
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    concat: {
      dist: {
        src: [
          '<%= project.app %>/scripts/*.js',
          '<%= project.app %>/scripts/common/**/{,*/}*.js'
        ],
        dest: '<%= project.dist %>/scripts/scripts.js',
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.dist %>/scripts',
          src: '*.js',
          dest: '<%= project.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= project.dist %>/scripts/scripts.min.js': [
            '<%= project.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= project.dist %>/*',
            '!<%= project.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    cssmin: {
      prod: {
        files: {
          '<%= project.dist %>/css/main.min.css': ['.tmp/css/*.css']
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['<%= project.app %>/scripts/**/{,*/}*.min.js'],
            dest: '<%= project.dist %>/scripts/vendor/',
            filter: 'isFile',
          },
          {
            expand: true,
            flatten: true,
            src: ['<%= project.app %>/scripts/**/{,*/}*.html', '<%= project.app %>/scripts/**/**/{,*/}*.html'],
            dest: '<%= project.dist %>/scripts/template/',
            filter: 'isFile',
          }
        ]
      },
      scripts: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['<%= project.app %>/scripts/common/**/{,*/}*.html'],
            dest: '<%= project.dist %>/scripts/template/',
            filter: 'isFile',
          }
        ]
      }
    }
  });

  grunt.registerTask('w', [
    'copy',
    'watch'
  ])

  grunt.registerTask('build', [
    'clean:dist',
    'copy',
    'autoprefixer',
    'concat',
    'ngmin',
    // 'cssmin',
    'uglify',
  ]);
  grunt.registerTask('default', ['build']);
}

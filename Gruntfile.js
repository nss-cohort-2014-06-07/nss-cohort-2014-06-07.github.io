'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      main: {
        options: {
          port: 9001,
          base: '.'
        }
      }
    },
    // ---------------------------------------------------------------------- //
    watch: {
      code: {
        files: ['Gruntfile.js', 'client/**/*'],
        tasks: ['build']
      }
    },
    // ---------------------------------------------------------------------- //
    jshint: {
      options: {jshintrc: '.jshintrc'},
      all: ['Gruntfile.js', 'client/**/*.js', 'server/**/*.js']
    },
    // ---------------------------------------------------------------------- //
    jade: {
      build: {
        files: [{
          cwd: 'client',
          src: 'index.jade',
          dest: './',
          ext: '.html',
          expand: true
        },
        {
          cwd: 'client',
          src: '**/*.jade',
          dest: 'public',
          ext: '.html',
          expand: true
        }]
      }
    },
    // ---------------------------------------------------------------------- //
    less: {
      build: {
        files: [{
          cwd: 'client',
          src: '**/*.less',
          dest: 'public',
          ext: '.css',
          expand: true
        }]
      }
    },
    // ---------------------------------------------------------------------- //
    clean: {
      server: 'public'
    },
    // ---------------------------------------------------------------------- //
    shell: {
      bower: {
        command: 'bower install'
      }
    },
    // ---------------------------------------------------------------------- //
    copy: {
      js: {
        cwd: 'client',
        src: ['**/*.js'],
        dest: 'public',
        expand: true
      },
      assets: {
        cwd: 'client/assets',
        src: ['**/*'],
        dest: 'public/assets',
        expand: true
      },
      favicon: {
        cwd: 'client',
        src: ['favicon.ico'],
        dest: 'public',
        expand: true
      }
    }
    // ---------------------------------------------------------------------- //
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('deploy', ['clean', 'build']);
  grunt.registerTask('build', ['jshint:all', 'jade', 'less', 'copy:js', 'copy:assets', 'copy:favicon']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};

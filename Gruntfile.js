'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // ---------------------------------------------------------------------- //
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['client/**/*.js'],
        dest: 'public/<%= pkg.name %>.js'
      }
    },
    // ---------------------------------------------------------------------- //
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    // ---------------------------------------------------------------------- //
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('build', ['jshint:all', 'jade', 'less', 'concat', 'uglify', 'copy:js', 'copy:assets', 'copy:favicon']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};

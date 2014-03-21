// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {

  // look into grunt.file.setBase
  // https://github.com/gruntjs/grunt/wiki/grunt.file#gruntfilesetbase

  // setup config file (yml or json) to make paths dynamic

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    app: {
      static: 'assets/',
      src: '<%= app.static %>src/',
      dist: '<%= app.static %>dist/',
      components: '<%= app.static %>components/',
      tmp: '<%= app.static %>.tmp/'
    },


    ///////////////////////////////////////////
    // Tidiness (keepin' it real)
    ///////////////////////////////////////////

    clean: ['<%= app.tmp %>'],

    copy: {
      sourcemaps: {
        files: [{
          expand: true,
          flatten: true,
          cwd: '<%= app.components %>',
          src: '**/*.map',
          dest: '<%= app.dist %>js/'
        }]
      }
    },

    ///////////////////////////////////////////
    // Style (Sass & CSS)
    ///////////////////////////////////////////

    sass: {
      all: {
        options: {
          includePaths: ['<%= app.components %>', '<%= app.components %>foundation/scss/'],
          sourceComments: 'none'
          // ,outputstyle: 'expanded' // see https://github.com/sindresorhus/grunt-sass#outputstyle
        },
        files: [{
          expand: true,
          cwd: '<%= app.src %>scss',
          src: ['**/*.{scss,sass}'],
          dest: '<%= app.dist %>css',
          ext: '.css'
        }]
      }
    },


    ///////////////////////////////////////////
    // JavaScript
    ///////////////////////////////////////////

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['<%= app.src %>js/**/*.js']
      }
    },

    concat: {
      options: {
        separator: '\n\n;'
      },
      components: {
        files: {
          '<%= app.tmp %>js/libs.js': [
            '<%= app.components %>jquery/dist/jquery.min.js',
            // add Bower (or other) component's minified JS here...


          ]
        }
      },
      foundation: {
        files: {
          '<%= app.tmp %>js/foundation.compiled.js': [
            '<%= app.components %>foundation/js/foundation/foundation.js',
            // add the Foundation JS plugins you need here...
            '<%= app.components %>foundation/js/foundation/foundation.alerts.js',
            '<%= app.components %>foundation/js/foundation/foundation.placeholder.js',
            '<%= app.components %>foundation/js/foundation/foundation.reveal.js'
          ]
        }
      },
      src: {
        files: {
          '<%= app.tmp %>js/main.js': [
            // add your custom JS files here
            // if you don't care about the order, use the line below...
            // '<%= app.src %>js/**/*.js',
            '<%= app.src %>js/main.js'
          ]
        }
      },
      dist: {
        files: {
          '<%= app.dist %>js/script.js': [
            '<%= app.tmp %>js/libs.js',
            '<%= app.tmp %>js/foundation.compiled.js',
            '<%= app.tmp %>js/main.js'
          ]
        }
      }
    },


    ///////////////////////////////////////////
    // Images & SVGs
    ///////////////////////////////////////////

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.src %>img/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: '<%= app.dist %>img/'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.src %>img/',
          src: ['**/*.svg'],
          dest: '<%= app.dist %>img/'
        }]
      }
    },




    ///////////////////////////////////////////
    // Jekyll server
    ///////////////////////////////////////////
    shell: {
      options: {
        stderr: true
      },
      jekyll: {
        command: 'jekyll serve'
      }
    },


    ///////////////////////////////////////////
    // Automation Magic (Dev Workflow)
    ///////////////////////////////////////////

    watch: {
      styles: {
        files: ['<%= app.src %>scss/**/*'],
        tasks: ['sass']
      },

      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['base']
      },
      // jst: {
      //   files: ['javascripts/templates/*.hbs'],
      //   tasks: ['handlebars', 'concat', 'uglify']
      // },
      scripts: {
        files: ['<%= app.src %>js/**/*.js'],
        tasks: ['jshint', 'concat']
      }
    }

  });


  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('base', ['clean', 'copy', 'sass', 'jshint', 'concat', 'imagemin', 'svgmin', 'clean']);

  grunt.registerTask('default', ['base', 'watch', 'shell:jekyll']);

  // grunt.registerTask('dev', ['sass:dev', 'jshint', 'watch']);
  // grunt.registerTask('build', ['sass', 'jshint', 'watch']);

};

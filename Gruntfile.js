module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({


    // compile jsx files into dev folder
    react: {
        files: {
          expand: true,
          cwd: 'app/src/js',
          src: ['**/*.js'],
          dest: 'app/dev/js',
          ext: '.js'
        }
    },


    uglify: {
      // minify and combine all js files into rel (release) folder
      relJs: {
        files: [{
          'app/rel/js/bundle.min.js': [
            'app/dev/js/*.js'
          ]
        }]
      },
      relLib: {
        files: [{
          expand: true,
          cwd: 'app/src/lib',
          src: '*.js',
          dest: 'app/rel/lib'
        }]
      },
      // minify lib files into dev folder
      devLibMin: {
        files: [{
          expand: true,
          cwd: 'app/src/lib',
          src: '*.js',
          dest: 'app/dev/lib'
        }]
      }
    },


    copy: {
      // copy lib .js files into dev folder
      devLib: {
        expand: true,
        cwd: 'app/src/lib/',
        src: '*.js',
        dest: 'app/dev/lib/'
      },
      // copy html files into dev folder
      devHtml: {
        expand: true,
        cwd: 'app/src/',
        src: '*.html',
        dest: 'app/dev/'
      },
      // copy css files into dev folder
      devCss: {
        expand: true,
        cwd: 'app/src/styles/',
        src: '*.css',
        dest: 'app/dev/styles/'
      },

      // copy html files into rel folder
      relHtml: {
        expand: true,
        cwd: 'app/src/',
        src: '*.html',
        dest: 'app/rel/'
      },
      // copy css files into rel folder
      relCss: {
        expand: true,
        cwd: 'app/src/styles/',
        src: '*.css',
        dest: 'app/rel/styles/'
      },
      // copy img files into rel folder
      relImg: {
        expand: true,
        cwd: 'app/src/img/',
        src: '*',
        dest: 'app/rel/img/'
      },
    },

    replace: {
      updateJsLink: {
        src: ['app/src/index.html'],             // source files array (supports minimatch)
        dest: 'app/rel/index.html',             // destination directory or file
        replacements: [{
          from: 'js/index.js',                   // string replacement
          to: 'js/bundle.min.js'
        }]
      }
    },


    watch: {
      js: {
        files: ['app/src/js/*.js'],
        tasks: ['jsxdev'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['app/src/*.html'],
        tasks: ['htmldev'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['app/src/styles/*.css'],
        tasks: ['cssdev'],
        options: {
          spawn: false,
        },
      },
    },

    'jshint-jsx': {
      options: {
        convertJSX: 'js',
        asi: true // semicolons not required
      },
      js: ['app/src/js/*.js']
    }

  });


  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint-jsx');
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task(s).


  // developemnt build tasks

  grunt.registerTask('jsxdev', ['react']);

  grunt.registerTask('libdevmin', ['uglify:devLibMin']);

  grunt.registerTask('libdev', ['copy:devLib']);
  grunt.registerTask('htmldev', ['copy:devHtml']);
  grunt.registerTask('cssdev', ['copy:devCss']);

  grunt.registerTask('builddev', [
    'jsxdev',
    'libdev',
    'htmldev',
    'cssdev'
  ]);

  // release build tasks
  grunt.registerTask('min', ['uglify:rel']);
  grunt.registerTask('minJs', ['uglify:relJs']);
  grunt.registerTask('minLib', ['uglify:relLib']);

  grunt.registerTask('htmlrel', ['replace:updateJsLink']);
  grunt.registerTask('cssrel', ['copy:relCss']);
  grunt.registerTask('imgrel', ['copy:relImg']);

  grunt.registerTask('buildrel', [
    'minJs',
    'minLib',
    'htmlrel',
    'cssrel',
    'imgrel'
  ]);

  grunt.registerTask('watchjs', ['watch:js']);
  grunt.registerTask('watchhtml', ['watch:html']);
  grunt.registerTask('watchcss', ['watch:css']);

  grunt.registerTask('lint', ['jshint-jsx:js']);
};

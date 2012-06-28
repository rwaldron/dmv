module.exports = function(grunt) {

  var task = grunt.task;
  var file = grunt.file;
  var utils = grunt.utils;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;
  var _ = utils._;



  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("m/d/yyyy") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      'dist/dmv.js': ['<banner>', '<file_strip_banner:lib/dmv.js>'],
      'public/javascripts/dmv.js': ['<banner>', '<file_strip_banner:lib/dmv.js>']
    },
    min: {
      'dist/dmv.min.js': ['<banner>', 'dist/dmv.js'],
      'public/javascripts/dmv.min.js': ['<banner>', 'public/javascripts/dmv.js']
    },
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        window: true,
        navigator: true,
        requestAnimationFrame: true,
        jQuery: true,
        io: true,
        global: true,
        exports: true,
        module: true,
        console: true
      }
    }
  });

  // Default task.
  grunt.task.registerTask('default', 'lint test concat min');
};

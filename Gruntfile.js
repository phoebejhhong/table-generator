module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      react: {
        files: "js/*.js",
        tasks: ['react']
      },
      sass: {
        files: "css/*.scss",
        tasks: ['sass']
      }
    },
    sass: {
        dev: {
            files: {
                // destination         // source file
                "css/TableGenerator.css" : "css/TableGenerator.scss",
                "css/base16_ocean_dark.css" : "css/base16_ocean_dark.scss",
                "css/base16_ocean_light.css" : "css/base16_ocean_light.scss"
            }
        }
    },

    react: {
    dynamic_mappings: {
      files: [
        {
          expand: true,
          cwd: 'js/',
          src: ['*.js'],
          dest: 'build/',
          ext: '.js'
        }
      ]
    }
  },

    uglify: {
      options: {
        mangle:false,
        beautify: true
      },
      my_target: {
        files: {
          'build/tableGenerator.min.js': [
            'build/utils.js',
            'build/convert.js',
            'build/tableSize.js',
            'build/tableMenu.js',
            'build/tableNav.js',
            'build/tableItem.js',
            'build/table.js',
            'build/output.js',
            'build/app.js'
            ]
        }
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);
};

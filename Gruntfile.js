module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
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
    browserSync: {
        default_options: {
            bsFiles: {
                src: [
                    "css/*.css",
                    "*.html"
                ]
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};

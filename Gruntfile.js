'use strict';

var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');

module.exports = function(grunt) {
    // Let *load-grunt-tasks* require everything
    require('load-grunt-tasks')(grunt);

    // Read configuration from package.json
    var pkgConfig = grunt.file.readJSON('package.json');

    grunt.initConfig({
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: './server/server.js',
                    port: 9000
                }
            },
            dist: {
                options: {
                    script: './server/server.js',
                    node_env: 'production',
                    port: 9000
                }
            },
            test: {
                options: {
                    script: './server/server.js',
                    port: 9000
                }
            }
        },

        pkg: pkgConfig,

        webpack: {
            options: webpackDistConfig,
            dist: {
                cache: false
            }
        },

        'webpack-dev-server': {
            options: {
                hot: true,
                port: 8000,
                webpack: webpackDevConfig,
                publicPath: '/assets/',
                contentBase: './<%= pkg.src %>/',
                proxy: {
                    "/api": "http://0.0.0.0:9000"
                }
            },

            start: {
                keepAlive: true
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '0.0.0.0'
                },
                proxies: [{
                    context: '/api',
                    host: '0.0.0.0',
                    port: 9000
                }]
            },

            dist: {
                options: {
                    keepalive: true,
                    middleware: function(connect) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            proxy,
                            mountFolder(connect, pkgConfig.dist)
                        ];
                    }
                }
            }
        },

        open: {
            options: {
                delay: 500
            },
            dev: {
                path: 'http://localhost:<%= connect.server.options.port %>/webpack-dev-server/'
            },
            dist: {
                path: 'http://localhost:<%= connect.server.options.port %>/'
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        copy: {
            dist: {
                files: [
                    // includes files within path
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/*'],
                        dest: '<%= pkg.dist %>/',
                        filter: 'isFile'
                    }, {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/images/*'],
                        dest: '<%= pkg.dist %>/images/'
                    }
                ]
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= pkg.dist %>'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['configureProxies:server', 'build', 'open:dist', 'express:dist', 'connect:dist']);
        }

        grunt.task.run([
            'configureProxies:server',
            'open:dev',
            'express:dev',
            'webpack-dev-server'
        ]);
    });

    grunt.registerTask('test', ['karma']);

    grunt.registerTask('build', ['clean', 'copy', 'webpack']);

    grunt.registerTask('default', []);
};
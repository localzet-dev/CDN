const gulpConfig = {
    name: 'localzet-cdn',
    desc: "Localzet CDN Project",
    config: {
        debug: false,
        compile: {
            jsMinify: true,
            cssMinify: true,
            jsSourcemaps: true,
            cssSourcemaps: true,
        },
        path: {
            src: "src"
        },
        dist: [
            "../public",
        ],
    },
    build: {
        base: {
            src: {
                styles: [
                    "{$config.path.src}/common/**/*.scss",
                    "{$config.path.src}/common/**/*.css"
                ],
                scripts: [
                    "{$config.path.src}/common/**/*.js"
                ]
            },
            dist: {
                styles: "{$config.dist}/styles.css",
                scripts: "{$config.dist}/scripts.js",
            }
        },
        custom: {
            src: {
                styles: [
                    "{$config.path.src}/styles/**/*.scss",
                    "{$config.path.src}/styles/**/*.css",
                ],
                scripts: [
                    "{$config.path.src}/scripts/**/*.js",
                ],
            },
            dist: {
                styles: "{$config.dist}/css/",
                scripts: "{$config.dist}/js/",
            },
        },
        media: {
            src: {
                media: [
                    "{$config.path.src}/media/**/*.*",
                ],
            },
            dist: {
                media: "{$config.dist}/media/",
            },
        }
    }
};

export {
    gulpConfig
};
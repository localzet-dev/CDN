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
            "../public/git",
        ],
    },
    build: {
        base: {
            src: {
                media: [
                    "{$config.path.src}/**/*.*",
                ],
            },
            dist: {
                media: "{$config.dist}/",
            },
        }
    }
};

export {
    gulpConfig
};
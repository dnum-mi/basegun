module.exports = {

    devServer: {
        watchOptions: {
            ignored: ['node_modules', /public/],
        },
    },

    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'dev/sw.js'
         },
    }
    
};

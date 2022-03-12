//import 'reflect-metadata'; // We need this in order to use @Decorators

const express = require('express');
const config = require('./config/index');
const { Logger } = require('./loaders/logger');


async function startServer() {
    const app = express();

    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     **/
    const loader = await require('./loaders/index')
    loader.expressApp(app)

    app.listen(config.port, () => {
        Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    }).on('error', err => {
        //console.error(err)
        Logger.error(err);
        process.exit(1);
    });

}

startServer();
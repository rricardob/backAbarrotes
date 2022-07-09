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
        Logger.debug(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################          
      _______             _      _____          _      
     |__   __|           | |    / ____|        | |     
        | |_ __ _   _ ___| |_  | |     ___   __| | ___ 
        | | '__| | | / __| __| | |    / _ \\ / _\` |/ _ \\
        | | |  | |_| \\__ \\ |_  | |___| (_) | (_| |  __/
        |_|_|   \\__,_|___/\\__|  \\_____\\___/ \\__,_|\\___|                                                                                                     

    `);
    }).on('error', err => {
        //console.error(err)
        Logger.error(err);
        process.exit(1);
    });

}

startServer();
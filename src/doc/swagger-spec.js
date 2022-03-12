const config = require("../config/index");


const swaggerOptions = {

    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: `${config.applicationName} API`,
            description: `${config.applicationDescription}`,
            version: `${config.applicationVersion}`,
            termsOfService: "http://swagger.io/terms/",
            contact: {
                email: "losquesiprograman@gmail.com"
            },
            license: {
                name: "Apache 2.0",
                url: "http://www.apache.org/licenses/LICENSE-2.0.html"
            },
            contact: {
                name: 'losquesiprograman'
            },
            server: [`http:localhost:${config.port}`]
        }
    },

};


module.exports = swaggerOptions
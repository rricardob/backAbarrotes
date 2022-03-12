module.exports = app => {

  const routerCategoria = require('./routesCategoria');
  const routerCliente = require('./routesCliente');

  app.use('/categoria', routerCategoria);
  app.use('/cliente', routerCliente);

};

module.exports = app => {

  const routerCategoria = require('./routesCategoria');
  const routerCliente = require('./routesCliente');
  const routerComprobante = require('./routesComprobante');

  app.use('/categoria', routerCategoria);
  app.use('/cliente', routerCliente);
  app.use('/comprobante', routerComprobante);


};

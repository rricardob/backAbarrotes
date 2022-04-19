module.exports = app => {

  const routerCategoria = require('./routesCategoria');
  const routerCliente = require('./routesCliente');
  const routerVendedor = require('./routesVendedor');

  app.use('/categoria', routerCategoria);
  app.use('/cliente', routerCliente);
  app.use('/vendedor', routerVendedor);

};

module.exports = app => {

  const routerCategoria = require('./routesCategoria');
  const routerCliente = require('./routesCliente');
  const routerProducto = require('./routesProducto');

  app.use('/categoria', routerCategoria);
  app.use('/cliente', routerCliente);
  app.use('/producto', routerProducto);
};

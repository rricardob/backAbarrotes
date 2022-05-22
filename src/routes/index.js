module.exports = app => {

  const routerCategoria = require('./routesCategoria');
  const routerCliente = require('./routesCliente');
  const routerVendedor = require('./routesVendedor');
  const routerProducto = require('./routesProducto');
  const routerComprobante = require('./routesComprobante');
  const routerDetalleComprobante = require('./routesDetalleComprobante');
  
  app.use('/categoria', routerCategoria);
  app.use('/cliente', routerCliente);
  app.use('/vendedor', routerVendedor);
  app.use('/categoria', routerCategoria);
  app.use('/cliente', routerCliente);
  app.use('/producto', routerProducto);
  app.use('/categoria', routerCategoria);
  app.use('/cliente', routerCliente);
  app.use('/comprobante', routerComprobante);
  app.use('/detallecomprobante',routerDetalleComprobante);

};

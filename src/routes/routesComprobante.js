const router = require('express').Router();
const comprobante = require("../apiService/comprobante/controller");


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    comprobante:
 *      type: object
 *      properties:
 *        co_id:
 *          type: integer
 *          description: id autogenerado del comprobante
 *        co_nombre:
 *          type: string
 *          description: nombre del comprobante
 *        co_fecha:
 *          type: date
 *          description: fecha del comprobante
 *        co_f_create:
 *          type: date
 *          description: fecha automatica de creacion del comprobante
 *        co_f_update:
 *          type: date
 *          description: fecha automatica de actualizacion del comprobante
 *        co_u_create:
 *          type: string
 *          description: usuario de creacion
 *        ca_u_update:
 *          type: string
 *          description: usuario de actualizacion
 *        eliminado:
 *          type: integer
 *          description: indica 1 si está inactivo 0 si está activo
 *        cl_id:
 *          type: integer
 *          description: clave foranea de la tabla cliente
 *        ve_id:
 *          type: integer
 *          description: clave foranea de la tabla vendedor
 *      required:
 *        - co_nombre
 *        - u_create
 *      example:
 *        co_nombre : B001-000001
 *        co_fecha :  2022-03-22 22:43:09
 *        co_f_create: 2022-03-22 22:43:09
 *        co_f_update: 2022-03-22 22:43:09
 *        co_u_create: fvargas
 *        co_u_update: fvargas
 *        eliminado: 0  
 *        cl_id: 1
 *        ve_id: 1  
 */


/**
 * @swagger
 * /comprobante/create:
 *   post:
 *     summary: crear un comprobante
 *     tags: [Comprobante]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/comprobante'
 *     responses:
 *       200:
 *         description: comprobante creado satisfactoriamente
 */

 router.post("/create/", comprobante.create);

 
/**
 * @swagger
 * /comprobante/findAll:
 *   get:
 *     summary: listar los comprobantes
 *     tags: [Comprobante]
 *     parameters:
 *       - in: query
 *         name: cliente
 *         schema:
 *           type: string
 *         required: false
 *         description: id del cliente
 *       - in: query
 *         name: vendedor
 *         schema:
 *           type: string
 *         required: false
 *         description: id del vendedor
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         required: false
 *         description: estado del comprobante
 *       - in: query
 *         name: fecinicio
 *         schema:
 *           type: string
 *         required: false
 *         description: fecha de inicio
 *       - in: query
 *         name: fecfin
 *         schema:
 *           type: string
 *         required: false
 *         description: fecha fin
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 */
 router.get("/findAll", comprobante.findAll);


/**
 * @swagger
 * /comprobante/update/{id}:
 *   put:
 *     summary: actualizar un comprobante en especifico
 *     tags: [Comprobante]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del comprobante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/comprobante'
 *     responses:
 *       200:
 *         description: se actualizo el comprobante satisfactoriamente
 *       404:
 *         description: comprobante not found
 */
 router.put("/comprobante/:id", comprobante.update);


/**
 * @swagger
 * /comprobante/delete/{id}:
 *   delete:
 *     summary: eliminar un comprobante
 *     tags: [Comprobante]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: comprobante id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: comprobante not found
 */
 router.delete("/delete/:id", comprobante.delete); 


module.exports = router
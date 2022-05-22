const router = require('express').Router();
const detalleComprobante = require("../apiService/detalleComprobante/controller");


/**
 * @swagger
 *
 * components:
 *  schemas:
 *    detallecomprobante:
 *      type: object
 *      properties:
 *        dec_id:
 *          type: integer
 *          description: id autogenerado del detalle del comprobante
 *        dec_cantidad:
 *          type: integer
 *          description: cantidad del producto
 *        dec_f_create:
 *          type: date
 *          description: fecha del detalle comprobante
 *        dec_f_update:
 *          type: date
 *          description: fecha automatica de actualizacion del detalle comprobante
 *        dec_u_create:
 *          type: string
 *          description: usuario de creacion
 *        dec_u_update:
 *          type: string
 *          description: usuario de actualizacion
 *        eliminado:
 *          type: integer
 *          description: indica 1 si está inactivo 0 si está activo
 *        pr_id:
 *          type: integer
 *          description: clave foranea de la tabla producto
 *      required:
 *        - pr_id
 *      example:
 *        dec_cantidad: 1
 *        dec_f_create: 2022-03-22 22:43:09
 *        dec_f_update: 2022-03-22 22:43:09
 *        dec_u_create: rbueno
 *        dec_u_update: rbueno
 *        eliminado: 0
 *        pr_id: 1
 */


/**
 * @swagger
 * /detallecomprobante/create:
 *   post:
 *     summary: crear un detalle comprobante
 *     tags: [DetalleComprobante]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/detallecomprobante'
 *     responses:
 *       200:
 *         description: detalle comprobante creado satisfactoriamente
 */

router.post("/create/", detalleComprobante.create);


/**
 * @swagger
 * /detallecomprobante/findAll:
 *   get:
 *     summary: listar los detalle comprobante
 *     tags: [DetalleComprobante]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/detallecomprobante'
 *       404:
 *         description: detalle comprobante not content
 */
router.get("/findAll", detalleComprobante.findAll);


/**
 * @swagger
 * /detallecomprobante/update/{id}:
 *   put:
 *     summary: actualizar un detalle comprobante en especifico
 *     tags: [DetalleComprobante]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del detalle comprobante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/detallecomprobante'
 *     responses:
 *       200:
 *         description: se actualizo el detalle comprobante satisfactoriamente
 *       404:
 *         description: detalle comprobante not found
 */
router.put("/comprobante/:id", detalleComprobante.update);


/**
 * @swagger
 * /detallecomprobante/delete/{id}:
 *   delete:
 *     summary: eliminar un comprobante
 *     tags: [DetalleComprobante]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: detalle comprobante id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: detalle comprobante not found
 */
router.delete("/delete/:id", detalleComprobante.delete);


module.exports = router
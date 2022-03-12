const router = require('express').Router();
const cliente = require("../apiService/cliente/controller");


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    cliente:
 *      type: object
 *      properties:
 *        cl_id:
 *          type: integer
 *          description: id autogenerado del cliente
 *        cl_nombre:
 *          type: string
 *          description: nombre del cliente
 *        cl_apellido:
 *          type: string
 *          description: apellido del cliente
 *        cl_dni:
 *          type: integer
 *          description: dni del cliente
 *        cl_direccion:
 *          type: string
 *          description: direccion del cliente
 *        cl_email:
 *          type: string
 *          description: email del cliente
 *        cl_telefono:
 *          type: int
 *          description: telefono del cliente
 *        cl_f_create:
 *          type: date
 *          description: fecha automatica de creacion del cliente
 *        cl_f_update:
 *          type: date
 *          description: fecha automatica de actualizacion del cliente
 *        cl_u_create:
 *          type: string
 *          description: usuario de creacion
 *        cl_u_update:
 *          type: string
 *          description: usuario de actualizacion
 *        eliminado:
 *          type: integer
 *          description: indica 1 si está inactivo 0 si está activo
 *      required:
 *        - nombre
 *        - apellido
 *        - dni
 *        - u_create
 *      example:
 *        cl_nombre : Piero
 *        cl_apellido : Becerra
 *        cl_dni : 78855214
 *        cl_direccion : Carmen MZ - O - Lote 5 
 *        cl_email : piero@gmail.com
 *        cl_telefono : 314251
 *        cl_f_create: 2022-03-05 22:43:09
 *        cl_f_update: 2022-03-05 22:43:09
 *        cl_u_create: cpiero
 *        cl_u_update: cpiero
 *        eliminado: 0  
 */


/**
 * @swagger
 * /cliente/create:
 *   post:
 *     summary: crear un cliente
 *     tags: [Cliente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/cliente'
 *     responses:
 *       200:
 *         description: cliente creado satisfactoriamente
 */
router.post("/create/", cliente.create);


/**
 * @swagger
 * /cliente/findOne/{id}:
 *   get:
 *     summary: listar un cliente
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del cliente
 *     responses:
 *       200:
 *         description: cliente encontrado
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/cliente'
 *       404:
 *         description: cliente not found
 */
router.get("/findOne/:id", cliente.findOne);


/**
 * @swagger
 * /cliente/findAll:
 *   get:
 *     summary: listar los clientes
 *     tags: [Cliente]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/cliente' 
 */
router.get("/findAll", cliente.findAll);


/**
 * @swagger
 * /cliente/update/{id}:
 *   put:
 *     summary: actualizar un cliente en especifico
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/cliente'
 *     responses:
 *       200:
 *         description: se actualizo el cliente satisfactoriamente
 *       404:
 *         description: cliente not found
 */
router.put("/update/:id", cliente.update);


/**
 * @swagger
 * /cliente/delete/{id}:
 *   delete:
 *     summary: eliminar un cliente
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: cliente id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: cliente not found
 */
router.delete("/delete/:id", cliente.delete); 


module.exports = router
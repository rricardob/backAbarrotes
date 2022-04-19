const router = require('express').Router();
const vendedor = require("../apiService/vendedor/controller");


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    vendedor:
 *      type: object
 *      properties:
 *        ve_id:
 *          type: integer
 *          description: id autogenerado del vendedor
 *        ve_nombre:
 *          type: string
 *          description: nombre del vendedor
 *        ve_apellido:
 *          type: string
 *          description: apellido del vendedor
 *        ve_dni:
 *          type: integer
 *          description: dni del vendedora
 *        ve_direccion:
 *          type: string
 *          description: direccion del vendedor
 *        ve_email:
 *          type: string
 *          description: email  del vendedor
 *        ve_telefono:
 *          type: int
 *          description: telefono del vendedor
 *        ve_usuario:
 *          type: string
 *          description: usuario del vendedor
 *        ve_clave:
 *          type: string
 *          description: clave del vendedor
 *        ve_f_create:
 *          type: date
 *          description: fecha automatica de creacion del vendedor
 *        ve_f_update:
 *          type: date
 *          description: fecha automatica de actualizacion del vendedor
 *        ve_u_create:
 *          type: string
 *          description: usuario de creacion
 *        ve_u_update:
 *          type: string
 *          description: usuario de actualizacion
 *        eliminado:
 *          type: integer
 *          description: indica 1 si está inactivo 0 si está activo
 *      required:
 *        - nombre
 *        - u_create
 *      example:
 *        ve_nombre : Pedro
 *        ve_apellido : Castillo
 *        ve_dni : 00000008
 *        ve_direccion : Calle sarratea
 *        ve_email : pcastle@el_lapiz.com
 *        ve_telefono : 999999990
 *        ve_usuario : pcastle
 *        ve_clave : karelim
 *        ve_f_create: 2022-03-05 22:43:09
 *        ve_f_update: 2022-03-05 22:43:09
 *        ve_u_create: elthon
 *        ve_u_update: elthon
 *        eliminado: 0  
 */


/**
 * @swagger
 * /vendedor/create:
 *   post:
 *     summary: crear un vendedor
 *     tags: [Vendedor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/vendedor'
 *     responses:
 *       200:
 *         description: vendedor creado satisfactoriamente
 */
router.post("/create/", vendedor.create);


/**
 * @swagger
 * /vendedor/findOne/{id}:
 *   get:
 *     summary: listar un vendedor
 *     tags: [Vendedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del vendedor
 *     responses:
 *       200:
 *         description: vendedor encontrado
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/vendedor'
 *       404:
 *         description: vendedor not found
 */
router.get("/findOne/:id", vendedor.findOne);


/**
 * @swagger
 * /vendedor/findAll:
 *   get:
 *     summary: listar las vendedores
 *     tags: [Vendedor]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/vendedor' 
 */
router.get("/findAll", vendedor.findAll);


/**
 * @swagger
 * /vendedor/update/{id}:
 *   put:
 *     summary: actualizar una vendedor en especifico
 *     tags: [Vendedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id de la vendedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/vendedor'
 *     responses:
 *       200:
 *         description: se actualizo la vendedor satisfactoriamente
 *       404:
 *         description: vendedor not found
 */
router.put("/update/:id", vendedor.update);


/**
 * @swagger
 * /vendedor/delete/{id}:
 *   delete:
 *     summary: eliminar un vendedor
 *     tags: [Vendedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: vendedor id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: vendedor not found
 */
router.delete("/delete/:id", vendedor.delete); 


module.exports = router
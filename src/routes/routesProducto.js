const router = require('express').Router();
const producto = require("../apiService/producto/controller");

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    producto:
 *      type: object
 *      properties:
 *        pr_id:
 *          type: integer
 *          description: id autogenerado del producto
 *        pr_nombre:
 *          type: string
 *          description: nombre del producto
 *        pr_precio:
 *          type: double
 *          description: precio del producto
 *        pr_stock:
 *          type: integer
 *          description: cantidad del producto
 *        pr_f_create:
 *          type: date
 *          description: fecha automatica de creacion del producto
 *        pr_f_update:
 *          type: date
 *          description: fecha automatica de actualizacion del producto
 *        pr_u_create:
 *          type: string
 *          description: usuario de creacion del producto
 *        pr_u_update:
 *          type: string
 *          description: usuario de actualizacion del producto
 *        eliminado:
 *          type: integer
 *          description: indica 1 si está inactivo 0 si está activo
 *        ca_id:
 *          type: integer
 *          description: id relacional de categoria
 *      required:
 *        - pr_nombre
 *        - pr_u_create
 *      example:
 *        pr_nombre : Arroz
 *        pr_precio : 100
 *        pr_stock : 50
 *        pr_f_create : 2022-03-05 22:43:09 
 *        pr_f_update : 2022-03-05 22:43:09
 *        pr_u_create : sharon
 *        pr_u_update : sharon
 *        eliminado : 0
 *        ca_id : 1
 */

/**
 * @swagger
 * /producto/create:
 *   post:
 *     summary: crear un producto
 *     tags: [Producto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/producto'
 *     responses:
 *       200:
 *         description: producto creado satisfactoriamente
 */
 router.post("/create/", producto.create);


 /**
 * @swagger
 * /producto/findOne/{id}:
 *   get:
 *     summary: listar un producto
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del producto
 *     responses:
 *       200:
 *         description: producto encontrado
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/producto'
 *       404:
 *         description: producto not found
 */
router.get("/findOne/:id", producto.findOne);


/**
 * @swagger
 * /producto/findAll:
 *   get:
 *     summary: listar los productos
 *     tags: [Producto]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/producto' 
 */
 router.get("/findAll", producto.findAll);

 /**
 * @swagger
 * /producto/update/{id}:
 *   put:
 *     summary: actualizar un producto en especifico
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/producto'
 *     responses:
 *       200:
 *         description: se actualizo el producto satisfactoriamente
 *       404:
 *         description: producto not found
 */
router.put("/update/:id", producto.update);


/**
 * @swagger
 * /producto/delete/{id}:
 *   delete:
 *     summary: eliminar un producto
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: producto id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: producto not found
 */
 router.delete("/delete/:id", producto.delete); 

 module.exports = router
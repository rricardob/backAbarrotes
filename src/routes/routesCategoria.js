const router = require('express').Router();
const categoria = require("../apiService/categoria/controller");


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    categoria:
 *      type: object
 *      properties:
 *        ca_id:
 *          type: integer
 *          description: id autogenerado de la categoria
 *        ca_nombre:
 *          type: string
 *          description: nombre de la categoria
 *        ca_f_create:
 *          type: date
 *          description: fecha automatica de creacion de la categoria
 *        ca_f_update:
 *          type: date
 *          description: fecha automatica de actualizacion de la categoria
 *        ca_u_create:
 *          type: string
 *          description: usuario de creacion
 *        ca_u_update:
 *          type: string
 *          description: usuario de actualizacion
 *        eliminado:
 *          type: integer
 *          description: indica 1 si está inactivo 0 si está activo
 *      required:
 *        - nombre
 *        - u_create
 *      example:
 *        ca_nombre : Limpieza
 *        ca_f_create: 2022-03-05 22:43:09
 *        ca_f_update: 2022-03-05 22:43:09
 *        ca_u_create: cpiero
 *        ca_u_update: cpiero
 *        eliminado: 0  
 */


/**
 * @swagger
 * /categoria/create:
 *   post:
 *     summary: crear una categoria
 *     tags: [Categoria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/categoria'
 *     responses:
 *       200:
 *         description: categoria creada satisfactoriamente
 */
router.post("/create/", categoria.create);


/**
 * @swagger
 * /categoria/findOne/{id}:
 *   get:
 *     summary: listar una categoria
 *     tags: [Categoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id de la categoria
 *     responses:
 *       200:
 *         description: categoria encontrada
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/categoria'
 *       404:
 *         description: categoria not found
 */
router.get("/findOne/:id", categoria.findOne);


/**
 * @swagger
 * /categoria/findAll:
 *   get:
 *     summary: listar las categorias
 *     tags: [Categoria]
 *     responses:
 *       200:
 *         description: listado de informacion satisfactoria
 *         content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/categoria' 
 */
router.get("/findAll", categoria.findAll);


/**
 * @swagger
 * /categoria/update/{id}:
 *   put:
 *     summary: actualizar una categoria en especifico
 *     tags: [Categoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: id de la categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/categoria'
 *     responses:
 *       200:
 *         description: se actualizo la categoria satisfactoriamente
 *       404:
 *         description: categoria not found
 */
router.put("/update/:id", categoria.update);


/**
 * @swagger
 * /categoria/delete/{id}:
 *   delete:
 *     summary: eliminar una categoria
 *     tags: [Categoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: categoria id
 *     responses:
 *       200:
 *         description: eliminado satisfactoriamente
 *       404:
 *         description: categoria not found
 */
router.delete("/delete/:id", categoria.delete); 


module.exports = router
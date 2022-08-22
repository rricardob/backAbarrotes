const {Logger} = require("../../loaders/logger");
const {sql} = require("../../services/mysql");


// Constructor
const Producto = function (producto) {
    this.pr_id = producto.pr_id,
        this.pr_nombre = producto.pr_nombre,
        this.pr_precio = producto.pr_precio,
        this.pr_stock = producto.pr_stock,
        this.pr_u_create = producto.pr_u_create,
        this.pr_u_update = producto.pr_u_update,
        this.eliminado = producto.eliminado,
        this.ca_id = producto.ca_id
};

// Create 
Producto.create = (newProducto, result) => {

    const query =
        `INSERT INTO producto
    (pr_nombre,pr_precio,pr_stock,pr_f_create,pr_f_update,pr_u_create,pr_u_update,ca_id) 
    values 
    ('${newProducto.pr_nombre}', '${newProducto.pr_precio}','${newProducto.pr_stock}',  NOW(), NOW(), '${newProducto.pr_u_create}', 
    '${newProducto.pr_u_update}', '${newProducto.ca_id}');`

    sql.query(query, (err, res) => {

        if (err) {
            Logger.error("error: ", err);
            result(err, null);
            sql.destroy()
        }

        Logger.info("created producto: ", {id: res.insertId, ...newProducto});
        result(null, {id: res.insertId, ...newProducto});
        sql.destroy()
    });
};


// Find By Name_NameProduct
Producto.findByName = (pr_nombre, result) => {

    sql.query(`select count(*) as result from producto where pr_nombre = ?`, pr_nombre, (err, res) => {
        //sql.query(`select count(*) as result from producto where pr_nombre = "${pr_nombre}" `, (err, res) => {

        if (err) {
            Logger.error('error: ', err)
            result(err, null)
            sql.destroy()
        }

        Logger.info("Producto: ", res[0]);
        result(null, res[0].result);
        sql.destroy()

    })
}


// Find By Id 
Producto.findById = (id, result) => {

    sql.query(`SELECT * FROM producto WHERE pr_id = ${id} and eliminado = 0`, (err, res) => {

        if (err) {
            Logger.error("error: ", err);
            result(err, null);
            sql.destroy()
        }

        if (res.length) {
            Logger.info("found producto: ", res[0]);
            result(null, res[0]);
            sql.destroy()
        }

        // Not found Producto with the id
        result({kind: "not_found"}, null);
        sql.destroy()
    });
};


// Get All 
Producto.getAll = (result) => {

    let query = "select p.pr_id, p.pr_nombre, p.pr_precio, p.pr_stock, p.pr_f_create, p.pr_f_update, p.pr_u_create, p.pr_u_update, p.eliminado, p.ca_id, c.ca_nombre from producto p " +
        "join categoria c on c.ca_id = p.ca_id order by p.pr_f_create";

    sql.query(query, (err, res) => {
        if (err) {
            Logger.error("error: ", err);
            result(null, err);
            sql.destroy()
        }

        Logger.info("Producto: ", res);
        result(null, res);
        sql.destroy()
    });
};

// Update By Id 
Producto.updateById = (id, producto, result) => {

    sql.query("UPDATE producto SET pr_nombre = ?, pr_precio = ?, pr_stock = ?, pr_f_update = NOW(), pr_u_update = ? , eliminado = ?, ca_id = ? WHERE pr_id = ?",
        [producto.pr_nombre, producto.pr_precio, producto.pr_stock, producto.pr_u_update, producto.eliminado, producto.ca_id, id],
        (err, res) => {

            console.log(err)

            if (err) {
                Logger.error("error: ", err);
                result(null, err);
                sql.destroy()
            }

            if (res.affectedRows == 0) {
                // Not found Producto with the id
                result({kind: "not_found"}, null);
                sql.destroy()
            }

            Logger.info("updated producto: ", {id: id, ...producto});
            result(null, {id: id, ...producto});
            sql.destroy()
        }
    );
};


// Remove 
Producto.remove = (id, result) => {

    sql.query("UPDATE producto SET eliminado = 1 WHERE pr_id = ?", id, (err, res) => {

        if (err) {
            Logger.error("error: ", err);
            result(null, err);
            sql.destroy()
        }

        if (res.affectedRows == 0) {
            // not found Producto with the id
            result({kind: "not_found"}, null);
            sql.destroy()
        }

        Logger.info("deleted Producto with id: ", id);
        result(null, res);
        sql.destroy()
    });
};


module.exports = Producto;
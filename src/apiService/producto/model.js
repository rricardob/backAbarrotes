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

    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {

            if (err) {
                Logger.error("error: ", err);
                result(err, null);

            }

            Logger.info("created producto: ", {id: res.insertId, ...newProducto});
            result(null, {id: res.insertId, ...newProducto});

        });
    })
};


// Find By Name_NameProduct
Producto.findByName = (pr_nombre, result) => {

    return new Promise((resolve, reject) => {
        sql.query(`select count(*) as result from producto where pr_nombre = ?`, pr_nombre, (err, res) => {
            //sql.query(`select count(*) as result from producto where pr_nombre = "${pr_nombre}" `, (err, res) => {

            if (err) {
                Logger.error('error: ', err)
                result(err, null)

            }

            Logger.info("Producto: ", res[0]);
            result(null, res[0].result);


        })
    })
}


// Find By Id 
Producto.findById = (id, result) => {

    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM producto WHERE pr_id = ${id} and eliminado = 0`, (err, res) => {

            if (err) {
                Logger.error("error: ", err);
                result(err, null);

            }

            if (res.length) {
                Logger.info("found producto: ", res[0]);
                result(null, res[0]);

            }

            // Not found Producto with the id
            result({kind: "not_found"}, null);

        });
    })
};


// Get All 
Producto.getAll = (result) => {

    let query = "select p.pr_id, p.pr_nombre, p.pr_precio, p.pr_stock, p.pr_f_create, p.pr_f_update, p.pr_u_create, p.pr_u_update, p.eliminado, p.ca_id, c.ca_nombre from producto p " +
        "join categoria c on c.ca_id = p.ca_id order by p.pr_f_create";
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            if (err) {
                Logger.error("error: ", err);
                result(null, err);

            }

            Logger.info("Producto: ", res);
            result(null, res);

        });
    })
};

// Update By Id 
Producto.updateById = (id, producto, result) => {

    return new Promise((resolve, reject) => {
        sql.query("UPDATE producto SET pr_nombre = ?, pr_precio = ?, pr_stock = ?, pr_f_update = NOW(), pr_u_update = ? , eliminado = ?, ca_id = ? WHERE pr_id = ?",
            [producto.pr_nombre, producto.pr_precio, producto.pr_stock, producto.pr_u_update, producto.eliminado, producto.ca_id, id],
            (err, res) => {

                console.log(err)

                if (err) {
                    Logger.error("error: ", err);
                    result(null, err);

                }

                if (res.affectedRows == 0) {
                    // Not found Producto with the id
                    result({kind: "not_found"}, null);

                }

                Logger.info("updated producto: ", {id: id, ...producto});
                result(null, {id: id, ...producto});

            }
        );
    })
};


// Remove 
Producto.remove = (id, result) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE producto SET eliminado = 1 WHERE pr_id = ?", id, (err, res) => {

            if (err) {
                Logger.error("error: ", err);
                result(null, err);

            }

            if (res.affectedRows == 0) {
                // not found Producto with the id
                result({kind: "not_found"}, null);

            }

            Logger.info("deleted Producto with id: ", id);
            result(null, res);

        });
    })
};


module.exports = Producto;
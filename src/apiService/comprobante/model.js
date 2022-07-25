const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");

// Constructor
const Comprobante = function (comprobante) {
    this.co_id = comprobante.co_id,
    this.co_nombre = comprobante.co_nombre,
    this.co_fecha = comprobante.co_fecha,
    this.co_u_create = comprobante.co_u_create,
    this.co_u_update = comprobante.co_u_update,
    this.eliminado = comprobante.eliminado,
    this.cl_id = comprobante.cl_id,
    this.ve_id = comprobante.ve_id
};


// Create 
Comprobante.create = (newComprobante, result) => {

    const query = 
    `INSERT INTO comprobante
    (co_fecha,co_nombre,co_f_create,co_f_update,co_u_create,co_u_update,cl_id,ve_id) 
    values 
    ('${newComprobante.co_fecha}','${newComprobante.co_nombre}',NOW() ,NOW(), '${newComprobante.co_u_create}', 
    '${newComprobante.co_u_update}', '${newComprobante.cl_id}', '${newComprobante.ve_id}');`

    sql.query(query, (err, res) => {
    if (err) {
        Logger.error("error: ", err);
        result(err, null);
        return;
    }

    Logger.info("created Comprobante: ", { id: res.insertId, ...newComprobante });
    result(null, { id: res.insertId, ...newComprobante });
    });
};


// Find By Nombre_Comprobante
Comprobante.findByName = (co_nombre, result) => {

    sql.query(`select count(*) as result from comprobante where co_nombre = ?`, co_nombre, (err, res) => {

    if (err) {
        Logger.error('error: ', err)
        result(err, null)
        return
    }

    Logger.info("Comprobante: ", res[0]);
    result(null, res[0].result);
    return

    })
};

// Get All 
Comprobante.getAll = (result) => {

    let query = "SELECT c.co_id, c.co_fecha, concat(c2.cl_nombre,\" \", c2.cl_apellido) as cliente, \n" +
        "concat(v.ve_nombre,\" \",v.ve_apellido) as vendedor , \n" +
        "c.eliminado, \n" +
        "c.co_total  FROM comprobante c \n" +
        "left join vendedor v ON v.ve_id = c.ve_id \n" +
        "left join cliente c2 on c2.cl_id = c.cl_id order by c.co_id asc";

    sql.query(query, (err, res) => {
    if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
    }

    result(null, res);
    Logger.info("Comprobante: ", res);
    });
};


// Update By Id 
Comprobante.updateById = (id, result) => {

    sql.query("UPDATE comprobante SET co_nombre = '?' ,co_f_update = NOW()  WHERE co_id = ?",
    [comprobante.co_nombre, id],
    (err, res) => {

        console.log(err)

        if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        // Not found Comprobante with the id
        result({ kind: "not_found" }, null);
        return;
        }

        Logger.info("updated comprobante: ", { id: id, ...comprobante });
        result(null, { id: id, ...comprobante });
    }
    );
};



// Remove 
Comprobante.remove = (id, result) => {

    sql.query("UPDATE comprobante SET eliminado = 1 WHERE co_id = ?", id, (err, res) => {

    if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
    }

    if (res.affectedRows == 0) {
        // not found Comprobante with the id
        result({ kind: "not_found" }, null);
        return;
    }

    Logger.info("deleted Comprobante with id: ", id);
    result(null, res);
    });
};


module.exports = Comprobante;
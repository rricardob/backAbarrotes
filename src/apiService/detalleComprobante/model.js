const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");

const detalleComprobante = function (detalleComprobante) {

    this.dec_id = detalleComprobante.dec_id;
    this.dec_cantidad = detalleComprobante.dec_cantidad;
    this.dec_f_create = detalleComprobante.dec_f_create;
    this.dec_f_update = detalleComprobante.dec_f_update;
    this.dec_u_create = detalleComprobante.dec_u_create;
    this.dec_u_update = detalleComprobante.dec_u_update;
    this.eliminado = detalleComprobante.eliminado;
    this.pr_id = detalleComprobante.pr_id;
    this.co_id = detalleComprobante.co_id;
    this.cl_id = detalleComprobante.cl_id;
    this.ve_id = detalleComprobante.ve_id;
};


detalleComprobante.create = (newDetComprobante, result) => {

    const query = `INSERT INTO detalle_comprobante
        (dec_cantidad, dec_f_create, dec_f_update, dec_u_create, dec_u_update, pr_id, co_id)
        VALUES('${newDetComprobante.dec_cantidad}', NOW(), NOW(), 
        '${newDetComprobante.dec_u_create}', '${newDetComprobante.dec_u_update}', '${newDetComprobante.pr_id}', 
        '${newDetComprobante.co_id}');`

    sql.query(query, (err, res) => {
        if (err) {
            Logger.error("error: ", err);
            result(err, null);
            return;
        }

        Logger.info("created Detalle Comprobante: ", { id: res.insertId, ...newDetComprobante });
        result(null, { id: res.insertId, ...newDetComprobante });
    });
};


detalleComprobante.getAll = (result) => {

    let query = "SELECT * FROM detalle_comprobante";

    sql.query(query, (err, res) => {
        if (err) {
            Logger.error("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
        Logger.debug("Detalle Comprobante: ", res );
    });
};


detalleComprobante.updateById = (id, result) => {

    sql.query("UPDATE detalle_comprobante SET co_nombre = '?' ,co_f_update = NOW()  WHERE co_id = ?",
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


detalleComprobante.remove = (id, result) => {

    sql.query("UPDATE detalle_comprobante SET eliminado = 1 WHERE dec_id = ?", id, (err, res) => {

        if (err) {
            Logger.error("error: "+ err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Comprobante with the id
            result({ kind: "not_found" }, null);
            return;
        }

        Logger.info("deleted Detalle Comprobante with id: "+ id);
        result(null, res);
    });
};


module.exports = detalleComprobante;
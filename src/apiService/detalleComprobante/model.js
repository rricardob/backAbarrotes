const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");

const detalleComprobante = function (detalleComprobante) {
    this.dec_id = detalleComprobante.dec_id;
    this.dec_cantidad = detalleComprobante.dec_cantidad;
    this.dec_u_create = detalleComprobante.dec_u_create;
    this.dec_u_update = detalleComprobante.dec_u_update;
    this.eliminado = detalleComprobante.eliminado;
    this.pr_id = detalleComprobante.pr_id;
    this.co_id = detalleComprobante.co_id;
};


detalleComprobante.create = (arrDetail, result) => {

    const query = "INSERT INTO detalle_comprobante (co_id,dec_cantidad, dec_f_create, dec_f_update, dec_u_create, dec_u_update, pr_id) VALUES ?"

    sql.query(query, [arrDetail],(err, res) => {
        if (err) {
            Logger.error("error: ", err);
            result(err, null);
            sql.destroy()
        }

        Logger.info("created Detalle Comprobante: ", { res, ...arrDetail });
        result(null, { res, ...arrDetail});
        sql.destroy()
    });
};


detalleComprobante.getAll = (result) => {

    let query = "SELECT * FROM detalle_comprobante";

    sql.query(query, (err, res) => {
        if (err) {
            Logger.error("error: ", err);
            result(null, err);
            sql.destroy()
        }

        Logger.debug("Detalle Comprobante: ", res );
        result(null, res);
        sql.destroy()
    });
};


detalleComprobante.updateById = (id, result) => {

    sql.query("UPDATE detalle_comprobante SET co_nombre = '?' ,co_f_update = NOW()  WHERE co_id = ?",
        [comprobante.co_nombre, id],
        (err, res) => {

            if (err) {
                Logger.error("error: ", err);
                result(null, err);
                sql.destroy()
            }

            if (res.affectedRows == 0) {
                // Not found Comprobante with the id
                result({ kind: "not_found" }, null);
                sql.destroy()
            }

            Logger.info("updated comprobante: ", { id: id, ...comprobante });
            result(null, { id: id, ...comprobante });
            sql.destroy()
        }
    );
};


detalleComprobante.remove = (id, result) => {

    sql.query("UPDATE detalle_comprobante SET eliminado = 1 WHERE dec_id = ?", id, (err, res) => {

        if (err) {
            Logger.error("error: "+ err);
            result(null, err);
            sql.destroy()
        }

        if (res.affectedRows === 0) {
            // not found Comprobante with the id
            result({ kind: "not_found" }, null);
            sql.destroy()
        }

        Logger.info("deleted Detalle Comprobante with id: "+ id);
        result(null, res);
        sql.destroy()
    });
};


module.exports = detalleComprobante;
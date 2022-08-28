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
    return new Promise((resolve, reject) => {
        sql.query(query, [arrDetail], (err, res) => {
            if (err) {
                Logger.error("error: ", err);
                result(err, null);

            }

            Logger.info("created Detalle Comprobante: ", {res, ...arrDetail});
            result(null, {res, ...arrDetail});

        });
    })
};


detalleComprobante.getAll = (result) => {

    let query = "SELECT * FROM detalle_comprobante";

    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            if (err) {
                Logger.error("error: ", err);
                result(null, err);

            }

            Logger.debug("Detalle Comprobante: ", res);
            result(null, res);

        });
    })
};


detalleComprobante.updateById = (id, result) => {

    return new Promise((resolve, reject) => {
        sql.query("UPDATE detalle_comprobante SET co_nombre = '?' ,co_f_update = NOW()  WHERE co_id = ?",
            [comprobante.co_nombre, id],
            (err, res) => {

                if (err) {
                    Logger.error("error: ", err);
                    result(null, err);

                }

                if (res.affectedRows == 0) {
                    // Not found Comprobante with the id
                    result({kind: "not_found"}, null);

                }

                Logger.info("updated comprobante: ", {id: id, ...comprobante});
                result(null, {id: id, ...comprobante});

            }
        );
    })
};


detalleComprobante.remove = (id, result) => {

    return new Promise((resolve, reject) => {
        sql.query("UPDATE detalle_comprobante SET eliminado = 1 WHERE dec_id = ?", id, (err, res) => {

            if (err) {
                Logger.error("error: " + err);
                result(null, err);

            }

            if (res.affectedRows === 0) {
                // not found Comprobante with the id
                result({kind: "not_found"}, null);

            }

            Logger.info("deleted Detalle Comprobante with id: " + id);
            result(null, res);

        });
    })
};


module.exports = detalleComprobante;
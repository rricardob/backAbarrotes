const {Logger} = require("../../loaders/logger");
const {sql} = require("../../services/mysql");

// Constructor
const Comprobante = function (comprobante) {
    this.co_id = comprobante.co_id,
        this.co_fecha = comprobante.co_fecha,
        this.co_u_create = comprobante.co_u_create,
        this.co_u_update = comprobante.co_u_update,
        this.eliminado = comprobante.eliminado,
        this.cl_id = comprobante.cl_id,
        this.ve_id = comprobante.ve_id,
        this.co_total = comprobante.co_total
};

// Create 
Comprobante.create = (newComprobante, result) => {

    const query =
        `INSERT INTO comprobante
    (co_fecha,co_f_create,co_f_update,co_u_create,co_u_update,cl_id,ve_id,co_total) 
    values 
    ('${newComprobante.co_fecha}',NOW() ,NOW(), '${newComprobante.co_u_create}', 
    '${newComprobante.co_u_update}', '${newComprobante.cl_id}', '${newComprobante.ve_id}', '${newComprobante.co_total}');`
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            if (err) {
                Logger.error("error: ", err);
                result(err, null);

            }

            Logger.info("created Comprobante: ", {id: res.insertId, ...newComprobante});
            result(null, {id: res.insertId, ...newComprobante});

        });
    })
};

// Find By Nombre_Comprobante
Comprobante.findByName = (co_nombre, result) => {

    return new Promise((resolve, reject) => {
        sql.query(`select count(*) as result from comprobante where co_nombre = ?`, co_nombre, (err, res) => {

            if (err) {
                Logger.error('error: ', err)
                result(err, null)

            }

            Logger.info("Comprobante: ", res[0]);
            result(null, res[0].result);
        })
    })
};

// Get All 
Comprobante.getAll = (comprobante, result) => {

    let params = `
    set @ve_id='${comprobante.ve_id}';
    set @cl_id='${comprobante.cl_id}';
    set @cl_es='${comprobante.cl_es}';
    set @fec_ini='${comprobante.fec_ini}';
    set @fec_fin='${comprobante.fec_fin}';
    `
    let sentence = `
            SELECT c.co_id, cast(c.co_fecha as date) fecha, concat(c2.cl_nombre," ", c2.cl_apellido) as cliente,
            concat(v.ve_nombre," ",v.ve_apellido) as vendedor ,
            c.eliminado,
            c.co_total  FROM comprobante c
            left join vendedor v ON v.ve_id = c.ve_id
            left join cliente c2 on c2.cl_id = c.cl_id
            where (@ve_id is null or @ve_id = '' or c.ve_id = @ve_id) and
            (@cl_id is null or @cl_id = '' or c.cl_id = @cl_id) and
            (@cl_es is null or @cl_es = '' or c.eliminado = @cl_es) and 
            ((@fec_ini is null or @fec_ini = '') or 
            (@fec_fin is null or @fec_fin = '') or
            (cast(c.co_fecha as date) between cast(@fec_ini as date) and cast(@fec_fin as date) ))
             order by c.co_id asc;
    `;

    //var result = []
    return new Promise((resolve, reject) => {
        let queryParams = sql.query(params);
        queryParams
            .on('error', function (err) {
                // Handle error, an 'end' event will be emitted after this as well
                console.error(err)
                Logger.error("error: ", err);
                result(null, err);
            })
            .on('fields', function (fields) {
                // the field packets for the rows to follow
            })
            .on('result', function (row) {
                // Pausing the connnection is useful if your processing involves I/O
                //console.log("result ",row)
                //result.push(row);
            })
            .on('end', function () {
                // all rows have been received
                let response = []
                let query = sql.query(sentence);
                query.on("error", function (err) {
                    // handle error
                    console.error(err)
                    Logger.error("error: ", err);
                    result(null, err);
                });
                query.on("result", function (row) {
                    response.push(row)
                });
                query.on("end", function () {
                    //sql.end(); // close connection
                    console.log("response -> ", response)
                    Logger.info("Comprobantes: ", response);
                    result(null, response);

                });
            });
    })
    /*var query1 = sql.query(sql1);
    query1.on("error", function (err) {
        // handle error
    });
    query1.on("end", function () {
        var query2 = connection.query(sql2);
        query2.on("error", function (err) {
            // handle error
        });
        query2.on("result", function (row) {
            result.push(row);
        });
        query2.on("end", function () {
            connection.end(); // close connection
            console.log(result); // display result
        });
    });*/

    /*sql.query(query,(err, res) => {
    if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
    }

    result(null, res);
    Logger.info("Comprobante: ", res);
    });*/
};

// Update By Id 
Comprobante.updateById = (id, result) => {
    return new Promise((resolve, reject) => {
        sql.query("UPDATE comprobante SET co_nombre = '?' ,co_f_update = NOW()  WHERE co_id = ?",
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

// Remove 
Comprobante.remove = (id, result) => {

    return new Promise((resolve, reject) => {
        sql.query("UPDATE comprobante SET eliminado = 1 WHERE co_id = ?", id, (err, res) => {

            if (err) {
                Logger.error("error: ", err);
                result(null, err);

            }

            if (res.affectedRows == 0) {
                // not found Comprobante with the id
                result({kind: "not_found"}, null);

            }

            Logger.info("deleted Comprobante with id: ", id);
            result(null, res);

        });
    })
};

Comprobante.findById = (id, result) => {

    const query =
        `
        select concat(v.ve_nombre," ",v.ve_apellido) as vendedor, cl.cl_dni, cl.cl_direccion, cl.cl_email, concat(cl.cl_nombre," ", cl.cl_apellido) as cliente, 
        c.co_id, cast(c.co_fecha as date) fecha, c.co_total, dc.dec_cantidad, c.eliminado, 
        p.pr_id, p.pr_nombre, p.pr_precio, p.pr_stock, ca.ca_nombre, (p.pr_precio * dc.dec_cantidad) as subtotal from comprobante c
        left join detalle_comprobante dc on dc.co_id = c.co_id
        left join producto p on p.pr_id = dc.pr_id
        left join categoria ca on ca.ca_id = p.ca_id
        left join cliente cl on cl.cl_id = c.cl_id
        left join vendedor v ON v.ve_id = c.ve_id
        where c.co_id = ${id}
        `
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            if (err) {
                Logger.error("error: findById Comprobante", err);
                result(null, err);

            }

            Logger.info("findById Comprobante: ", res);
            result(null, res);

        });
    })

}

Comprobante.anular = (id, result) => {

    const query = `CALL sp_rollback_stock(${id})`

    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {

            if (err) {
                Logger.error("error: anular Comprobante", err);
                result(null, err);

            }

            if (res[4].affectedRows === 0) {
                Logger.info("anular Comprobante not update stock: ", res);
                result({kind: "not update stock"}, null);

            } else {
                Logger.info("anular Comprobante ok: ", res);
                result(null, {kind: "update ok", rows_affected: res[4].affectedRows});

            }

        })
    })
}

module.exports = Comprobante;
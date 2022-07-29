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
    let queryParams = sql.query(params);
    queryParams
        .on('error', function(err) {
            // Handle error, an 'end' event will be emitted after this as well
            console.error(err)
            Logger.error("error: ", err);
            result(null, err);
        })
        .on('fields', function(fields) {
            // the field packets for the rows to follow
        })
        .on('result', function(row) {
            // Pausing the connnection is useful if your processing involves I/O
            //console.log("result ",row)
            //result.push(row);
        })
        .on('end', function() {
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
                Logger.info("Comprobantes: ", response);
                result(null, response);
            });
        });

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
const { Logger } = require("../../loaders/logger");
const { sql } = require("../../services/mysql");


// Constructor
const Vendedor = function (vendedor) {
    this.ve_id=vendedor.ve_id,
    this.ve_nombre=vendedor.ve_nombre,
    this.ve_apellido=vendedor.ve_apellido,
    this.ve_dni=vendedor.ve_dni,
    this.ve_direccion=vendedor.ve_direccion,
    this.ve_email=vendedor.ve_email,
    this.ve_telefono=vendedor.ve_telefono,
    this.ve_usuario=vendedor.ve_usuario,
    this.ve_clave=vendedor.ve_clave,
    this.ve_u_create=vendedor.ve_u_create,
    this.ve_u_update=vendedor.ve_u_update,
    this.eliminado=vendedor.eliminado
};


// Create 
Vendedor.create = (newVendedor, result) => {

    const query = 
    `INSERT INTO vendedor
    (ve_nombre, ve_apellido, ve_dni, ve_direccion, ve_email, ve_telefono, ve_usuario, ve_clave, ve_f_create, ve_f_update, ve_u_create, ve_u_update, eliminado) 
    values 
    ('${newVendedor.ve_nombre}', '${newVendedor.ve_apellido}', '${newVendedor.ve_dni}', '${newVendedor.ve_direccion}', '${newVendedor.ve_email}', '${newVendedor.ve_telefono}', '${newVendedor.ve_usuario}', '${newVendedor.ve_clave}', NOW(), NOW(), '${newVendedor.ve_u_create}', '${newVendedor.ve_u_update}', '${newVendedor.eliminado}')`

    sql.query(query, (err, res) => {
        
    if (err) {
        Logger.error("error: ", err);
        result(err, null);
        return;
    }

    Logger.info("created vendedor: ", { id: res.insertId, ...newVendedor });
    result(null, { id: res.insertId, ...newVendedor });
    });
};


// Find By Name_Nombre 
Vendedor.findByName = (ve_nombre, result) => {

    sql.query(`select count(*) as result from vendedor where ve_nombre = ?`, ve_nombre, (err, res) => {

    if (err) {
        Logger.error('error: ', err)
        result(err, null)
        return
    }

    Logger.info("Vendedor: ", res[0]);
    result(null, res[0].result);
    return

    })
}


// Find By Id 
Vendedor.findById = (id, result) => {

    sql.query(`SELECT * FROM vendedor WHERE ve_id = ${id} and eliminado = 0`, (err, res) => {

    if (err) {
        Logger.error("error: ", err);
        result(err, null);
        return;
    }

    if (res.length) {
        Logger.info("found vendedor: ", res[0]);
        result(null, res[0]);
        return;
    }

    // Not found Vendedor with the id
    result({ kind: "not_found" }, null);
    });
};


// Get All 
Vendedor.getAll = (result) => {

    let query = "SELECT * FROM vendedor WHERE eliminado = 0";

    sql.query(query, (err, res) => {
    if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
    }

    result(null, res);
    Logger.info("Vendedor: ", res);
    });
};


// Update By Id 
Vendedor.updateById = (id, vendedor, result) => {

    sql.query("UPDATE vendedor SET ve_nombre=?, ve_apellido=?, ve_dni=?, ve_direccion=?, ve_email=?, ve_telefono=?, ve_usuario=?, ve_clave=?, ve_f_update=NOW(), ve_u_update=?, eliminado=? WHERE ve_id = ?",
    [vendedor.ve_nombre, vendedor.ve_apellido, vendedor.ve_dni, vendedor.ve_direccion, vendedor.ve_email, vendedor.ve_telefono, vendedor.ve_usuario, vendedor.ve_clave, vendedor.ve_u_update, vendedor.eliminado, id],
    (err, res) => {

        console.log(err)

        if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        // Not found Vendedor with the id
        result({ kind: "not_found" }, null);
        return;
        }

        Logger.info("updated vendedor: ", { id: id, ...vendedor });
        result(null, { id: id, ...vendedor });
    }
    );
};


// Remove 
Vendedor.remove = (id, result) => {

    sql.query("UPDATE vendedor SET eliminado = 1 WHERE ve_id = ?", id, (err, res) => {

    if (err) {
        Logger.error("error: ", err);
        result(null, err);
        return;
    }

    if (res.affectedRows == 0) {
        // not found Vendedor with the id
        result({ kind: "not_found" }, null);
        return;
    }

    Logger.info("deleted Vendedor with id: ", id);
    result(null, res);
    });
};


module.exports = Vendedor;
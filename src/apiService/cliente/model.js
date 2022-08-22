const {Logger} = require('../../loaders/logger');
const {sql} = require('../../services/mysql');

// Constructor
const Cliente = function (cliente) {
    (this.cl_id = cliente.cl_id),
        (this.cl_nombre = cliente.cl_nombre),
        (this.cl_apellido = cliente.cl_apellido),
        (this.cl_dni = cliente.cl_dni),
        (this.cl_direccion = cliente.cl_direccion),
        (this.cl_email = cliente.cl_email),
        (this.cl_telefono = cliente.cl_telefono),
        (this.cl_u_create = cliente.cl_u_create),
        (this.cl_u_update = cliente.cl_u_update);
    this.eliminado = cliente.eliminado;
};

// Create
Cliente.create = (newCliente, result) => {
    const query = `INSERT INTO cliente
    (cl_nombre,cl_apellido,cl_dni,cl_direccion,cl_email,cl_telefono,cl_f_create,cl_f_update,cl_u_create,cl_u_update) 
    values 
    ('${newCliente.cl_nombre}', '${newCliente.cl_apellido}','${newCliente.cl_dni}', '${newCliente.cl_direccion}', 
    '${newCliente.cl_email}', '${newCliente.cl_telefono}', NOW(), NOW(), '${newCliente.cl_u_create}', 
    '${newCliente.cl_u_update}');`;

    sql.query(query, (err, res) => {
        if (err) {
            Logger.error('error: ', err);
            result(err, null);
            sql.destroy()
        }

        Logger.info('created cliente: ', {id: res.insertId, ...newCliente});
        result(null, {id: res.insertId, ...newCliente});
        sql.destroy()
    });
};

// Find By Name_DNI
Cliente.findByName = (cl_dni, result) => {
    sql.query(
        `select count(*) as result from cliente where cl_dni = ?`,
        cl_dni,
        (err, res) => {
            if (err) {
                Logger.error('error: ', err);
                result(err, null);
                sql.destroy()
            }

            Logger.info('Cliente: ', res[0]);
            result(null, res[0].result);
            sql.destroy()
        },
    );
};

// Find By Id
Cliente.findById = (id, result) => {
    sql.query(
        `SELECT * FROM cliente WHERE cl_id = ${id} and eliminado = 0`,
        (err, res) => {
            if (err) {
                Logger.error('error: ', err);
                result(err, null);
                sql.destroy()
            }

            if (res.length) {
                Logger.info('found cliente: ', res[0]);
                result(null, res[0]);
                sql.destroy()
            }

            // Not found Cliente with the id
            result({kind: 'not_found'}, null);
        },
    );
};

// Get All
Cliente.getAll = result => {
    let query = 'SELECT * FROM cliente';

    sql.query(query, (err, res) => {
        if (err) {
            Logger.error('error: ', err);
            result(null, err);
            sql.destroy()
        }

        result(null, res);
        Logger.info('Cliente: ', res);
        sql.destroy()
    });
};

// Update By Id
Cliente.updateById = (id, cliente, result) => {
    sql.query(
        'UPDATE cliente SET cl_nombre = ?, cl_apellido = ?, cl_dni = ?, cl_direccion = ?, cl_email = ?, cl_telefono = ?, cl_f_update = NOW(), cl_u_update = ? , eliminado = ? WHERE cl_id = ?',
        [
            cliente.cl_nombre,
            cliente.cl_apellido,
            cliente.cl_dni,
            cliente.cl_direccion,
            cliente.cl_email,
            cliente.cl_telefono,
            cliente.cl_u_update,
            cliente.eliminado,
            id,
        ],
        (err, res) => {
            console.log(err);

            if (err) {
                Logger.error('error: ', err);
                result(null, err);
                sql.destroy()
            }

            if (res.affectedRows == 0) {
                // Not found Cliente with the id
                result({kind: 'not_found'}, null);
                sql.destroy()
            }

            Logger.info('updated cliente: ', {id: id, ...cliente});
            result(null, {id: id, ...cliente});
        },
    );
};

// Remove
Cliente.remove = (id, result) => {
    sql.query(
        'UPDATE cliente SET eliminado = 1 WHERE cl_id = ?',
        id,
        (err, res) => {
            if (err) {
                Logger.error('error: ', err);
                result(null, err);
                sql.destroy()
            }

            if (res.affectedRows == 0) {
                // not found Cliente with the id
                result({kind: 'not_found'}, null);
                sql.destroy()
            }

            Logger.info('deleted Cliente with id: ', id);
            result(null, res);
            sql.destroy()
        },
    );
};

module.exports = Cliente;

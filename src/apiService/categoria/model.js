const {Logger} = require('../../loaders/logger');
const {sql} = require('../../services/mysql');

// Constructor
const Categoria = function (categoria) {
    (this.ca_id = categoria.ca_id),
        (this.ca_nombre = categoria.ca_nombre),
        (this.eliminado = categoria.eliminado);
};

// Create
Categoria.create = (newCategoria, result) => {
    const query = `INSERT INTO categoria
    (ca_nombre,ca_f_create,ca_f_update,ca_u_create,ca_u_update) 
    values 
    ('${newCategoria.ca_nombre}', NOW(), NOW(), '${newCategoria.ca_u_create}', '${newCategoria.ca_u_update}');`;
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            if (err) {
                Logger.error('error: ', err);
                result(err, null);

            }

            Logger.info('created categoria: ', {id: res.insertId, ...newCategoria});
            result(null, {id: res.insertId, ...newCategoria});

        });
    })
};

// Find By Name_Nombre
Categoria.findByName = (ca_nombre, result) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `select count(*) as result from categoria where ca_nombre = ?`,
            ca_nombre,
            (err, res) => {
                if (err) {
                    Logger.error('error: ', err);
                    result(err, null);

                }

                Logger.info('Categoria: ', res[0]);
                result(null, res[0].result);

            },
        );
    })
};

// Find By Id
Categoria.findById = (id, result) => {
    return new Promise((resolve, reject) => {
        sql.query(
            `SELECT * FROM categoria WHERE ca_id = ${id} and eliminado = 0`,
            (err, res) => {
                if (err) {
                    Logger.error('error: ', err);
                    result(err, null);

                }

                if (res.length) {
                    Logger.info('found categoria: ', res[0]);
                    result(null, res[0]);

                }

                // Not found Categoria with the id
                result({kind: 'not_found'}, null);

            },
        );
    })
};

// Get All
Categoria.getAll = result => {
    let query = 'SELECT * FROM categoria';
    return new Promise((resolve, reject) => {
        sql.query(query, (err, res) => {
            if (err) {
                Logger.error('error: ', err);
                result(null, err);

            }

            Logger.info('Categoria: ', res);
            result(null, res);

        });
    })
};

// Update By Id
Categoria.updateById = (id, categoria, result) => {
    return new Promise((resolve, reject) => {
        sql.query(
            'UPDATE categoria SET ca_nombre = ?, ca_f_update = NOW(), ca_u_update = ? , eliminado = ? WHERE ca_id = ?',
            [categoria.ca_nombre, categoria.ca_u_update, categoria.eliminado, id],
            (err, res) => {

                if (err) {
                    Logger.error('error: ', err);
                    result(null, err);

                }

                if (res.affectedRows === 0) {
                    // Not found Categoria with the id
                    result({kind: 'not_found'}, null);

                }

                Logger.info('updated categoria: ', {id: id, ...categoria});
                result(null, {id: id, ...categoria});

            },
        );
    })
};

// Remove
Categoria.remove = (id, result) => {
    return new Promise((resolve, reject) => {
        sql.query(
            'UPDATE categoria SET eliminado = 1 WHERE ca_id = ?',
            id,
            (err, res) => {
                if (err) {
                    Logger.error('error: ', err);
                    result(null, err);

                }

                if (res.affectedRows === 0) {
                    // not found Categoria with the id
                    result({kind: 'not_found'}, null);

                }

                Logger.info('deleted Categoria with id: ', id);
                result(null, res);

            },
        );
    })
};

module.exports = Categoria;

const { Logger } = require("../../loaders/logger");
const Vendedor = require("./model");


exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    // Create Vendedor
    const vendedor = new Vendedor({
    ve_nombre: req.body.ve_nombre,
    ve_apellido: req.body.ve_apellido,
    ve_dni: req.body.ve_dni,
    ve_direccion: req.body.ve_direccion,
    ve_email: req.body.ve_email,
    ve_telefono: req.body.ve_telefono,
    ve_usuario: req.body.ve_usuario,
    ve_clave: req.body.ve_clave,
    ve_u_create: req.body.ve_u_create,
    ve_u_update: req.body.ve_u_update,
    eliminado: req.body.eliminado
    });

    console.log(vendedor);
    // Validate Repeated
    Vendedor.findByName(vendedor.ve_nombre, (err, data) => {
    if (err) {
        res.status(500).send({
        message:
            err.message || "Some error occurred while validate Vendedor."
        })
    }

    if (data === 1) {
        res.send({
        message: "La vendedor con respectivo nombre que intentas registrar ya existe, verifica los datos"
        })
    } else {
        // Save Vendedor in the database
        Vendedor.create(vendedor, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating Vendedor."
        });
        else res.send(data);
        });
    }
    });
};


// Find Vendedor by Id
exports.findOne = (req, res) => {

    Vendedor.findById(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Vendedor with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Error retrieving Vendedor with id " + req.params.id
        });
        }
    } else res.send(data);
    });

};


// Find all Vendedor from the database (with condition).
exports.findAll = (req, res) => {

    Vendedor.getAll((err, data) => {

    if (err) {
        Logger.error(`Error: ${err}`);
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Vendedor."
        });
    } else res.send(data);
    });

};


// Update Vendedor identified by the id in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    Logger.info(req.body);

    Vendedor.updateById(req.params.id, new Vendedor(req.body), (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Vendedor with id ${req.params.id}.`
                });
            } else {
            res.status(500).send({
            message: "Error updating Vendedor with id " + req.params.id
            });
        }
        } else res.send(data);
    }
    );

};


// Remove Vendedor with the specified id in the request
exports.delete = (req, res) => {

    Vendedor.remove(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Vendedor with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Could not delete Vendedor with id " + req.params.id
        });
        }
    } else res.send({ message: `Vendedor was deleted successfully!` });
    });
};
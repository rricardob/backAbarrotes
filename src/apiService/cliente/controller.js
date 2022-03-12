const { Logger } = require("../../loaders/logger");
const Cliente = require("./model");


exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    // Create Cliente
    const cliente = new Cliente({
    cl_nombre : req.body.cl_nombre,
    cl_apellido : req.body.cl_apellido,
    cl_dni : req.body.cl_dni,
    cl_direccion : req.body.cl_direccion,
    cl_email : req.body.cl_email,
    cl_telefono : req.body.cl_telefono,
    cl_u_create : req.body.cl_u_create,
    cl_u_update : req.body.cl_u_update
    });

    // Validate Repeated
    Cliente.findByName(cliente.cl_dni, (err, data) => {
    if (err) {
        res.status(500).send({
        message:
            err.message || "Some error occurred while validate Cliente."
        })
    }

    if (data === 1) {
        res.send({
        message: "El cliente con respectivo DNI que intentas registrar ya existe, verifica los datos"
        })
    } else {
        // Save Cliente in the database
        Cliente.create(cliente, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating Cliente."
        });
        else res.send(data);
        });
    }
    });
};


// Find Cliente by Id
exports.findOne = (req, res) => {

    Cliente.findById(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Cliente with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Error retrieving Cliente with id " + req.params.id
        });
        }
    } else res.send(data);
    });

};


// Find all Cliente from the database (with condition).
exports.findAll = (req, res) => {

    Cliente.getAll((err, data) => {

    if (err) {
        Logger.error(`Error: ${err}`);
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Cliente."
        });
    } else res.send(data);
    });

};


// Update Cliente identified by the id in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    Logger.info(req.body);

    Cliente.updateById(req.params.id, new Cliente(req.body), (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Cliente with id ${req.params.id}.`
                });
            } else {
            res.status(500).send({
            message: "Error updating Cliente with id " + req.params.id
            });
        }
        } else res.send(data);
    }
    );

};


// Remove Cliente with the specified id in the request
exports.delete = (req, res) => {

    Cliente.remove(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Cliente with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Could not delete Cliente with id " + req.params.id
        });
        }
    } else res.send({ message: `Cliente was deleted successfully!` });
    });
};
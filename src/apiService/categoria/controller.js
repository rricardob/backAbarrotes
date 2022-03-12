const { Logger } = require("../../loaders/logger");
const Categoria = require("./model");


exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    // Create Categoria
    const categoria = new Categoria({
    ca_nombre : req.body.ca_nombre,
    ca_u_create : req.body.ca_u_create,
    ca_u_update : req.body.ca_u_update
    });

    // Validate Repeated
    Categoria.findByName(categoria.ca_nombre, (err, data) => {
    if (err) {
        res.status(500).send({
        message:
            err.message || "Some error occurred while validate Categoria."
        })
    }

    if (data === 1) {
        res.send({
        message: "La categoria con respectivo nombre que intentas registrar ya existe, verifica los datos"
        })
    } else {
        // Save Categoria in the database
        Categoria.create(categoria, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating Categoria."
        });
        else res.send(data);
        });
    }
    });
};


// Find Categoria by Id
exports.findOne = (req, res) => {

    Categoria.findById(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Categoria with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Error retrieving Categoria with id " + req.params.id
        });
        }
    } else res.send(data);
    });

};


// Find all Categoria from the database (with condition).
exports.findAll = (req, res) => {

    Categoria.getAll((err, data) => {

    if (err) {
        Logger.error(`Error: ${err}`);
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Categoria."
        });
    } else res.send(data);
    });

};


// Update Categoria identified by the id in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    Logger.info(req.body);

    Categoria.updateById(req.params.id, new Categoria(req.body), (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Categoria with id ${req.params.id}.`
                });
            } else {
            res.status(500).send({
            message: "Error updating Categoria with id " + req.params.id
            });
        }
        } else res.send(data);
    }
    );

};


// Remove Categoria with the specified id in the request
exports.delete = (req, res) => {

    Categoria.remove(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Categoria with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Could not delete Categoria with id " + req.params.id
        });
        }
    } else res.send({ message: `Categoria was deleted successfully!` });
    });
};
const { Logger } = require("../../loaders/logger");
const Producto = require("./model");

exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    // Create Producto
    const producto = new Producto({
    pr_nombre : req.body.pr_nombre,
    pr_precio : req.body.pr_precio,
    pr_stock : req.body.pr_stock,
    pr_u_create : req.body.pr_u_create,
    pr_u_update : req.body.pr_u_update,
    ca_id : req.body.ca_id
    });


    // Validate Repeated
    Producto.findByName(producto.pr_nombre, (err, data) => {
        
    if (err) {
        res.status(500).send({
        message:
            err.message || "Some error occurred while validate Producto."
        })
    }
    if (data >= 1) {
        res.send({
        message: "El producto con el respectivo Nombre que intentas registrar ya existe, verifica los datos"
        })
    } else {
        // Save Product in the database
        Producto.create(producto, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating Producto."
        });
        else res.send(data);
        });
    }
    });
};

// Find Producto by Id
exports.findOne = (req, res) => {

    Producto.findById(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Producto with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Error retrieving Producto with id " + req.params.id
        });
        }
    } else res.send(data);
    });

};


// Find all Producto from the database (with condition).
exports.findAll = (req, res) => {

    Producto.getAll((err, data) => {

    if (err) {
        Logger.error(`Error: ${err}`);
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Producto."
        });
    } else res.send(data);
    });

};

// Update Producto identified by the id in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    Logger.info(req.body);

    Producto.updateById(req.params.id, new Producto(req.body), (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Producto with id ${req.params.id}.`
                });
            } else {
            res.status(500).send({
            message: "Error updating Producto with id " + req.params.id
            });
        }
        } else res.send(data);
    }
    );

};

// Remove Producto with the specified id in the request
exports.delete = (req, res) => {

    Producto.remove(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Producto with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Could not delete Producto with id " + req.params.id
        });
        }
    } else res.send({ message: `Producto was deleted successfully!` });
    });
};
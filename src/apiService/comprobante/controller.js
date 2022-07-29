const { Logger } = require("../../loaders/logger");
const Comprobante = require("./model");
const returnEmptyIfPropertyIsNullOrEmpty = require("../../util/Utils")


exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    // Create Comprobante
    const comprobante = new Comprobante({
    co_nombre : req.body.co_nombre,
    co_fecha : req.body.co_fecha,
    co_u_create : req.body.co_u_create,
    co_u_update : req.body.co_u_update,
    cl_id : req.body.cl_id,
    ve_id : req.body.ve_id
    });

    // Validate Repeated
    Comprobante.findByName(comprobante.co_nombre, (err, data) => {
    if (err) {
        res.status(500).send({
        message:
            err.message || "Some error occurred while validate Comprobante."
        })
    }
    //data es un json
    if (data === 1) {
        res.send({
        message: "El nombre del comprobante ya existe, verifica los datos"
        })
    } else {
        // Save Comprobante in the database
        Comprobante.create(comprobante, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating Comprobante."
        });
        else res.send(data);
        });
    }
    });

};


exports.findAll = (req, res) => {

    let params = req.query

    let vendor = returnEmptyIfPropertyIsNullOrEmpty(params,"vendedor")
    let client = returnEmptyIfPropertyIsNullOrEmpty(params, "cliente")
    let state = returnEmptyIfPropertyIsNullOrEmpty(params, "estado")
    let fec_ini = returnEmptyIfPropertyIsNullOrEmpty(params, "fecinicio")
    let fec_fin = returnEmptyIfPropertyIsNullOrEmpty(params, "fecfin")

    const comprobante = {
        ve_id : vendor ,
        cl_id : client,
        cl_es : state,
        fec_ini : fec_ini,
        fec_fin : fec_fin
    };

    Comprobante.getAll(comprobante, (err, data) => {

    if (err) {
        Logger.error(`Error: ${err}`);
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Comprobante."
        });
    } else res.send(data);
    });

};


// Update Comprobante identified by the id in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }

    Logger.info(req.body);

    Comprobante.updateById(req.params.id, new Comprobante(req.body), (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Comprobante with id ${req.params.id}.`
                });
            } else {
            res.status(500).send({
            message: "Error updating Comprobante with id " + req.params.id
            });
        }
        } else res.send(data);
    }
    );

};


// Remove Comprobante with the specified id in the request
exports.delete = (req, res) => {

    Comprobante.remove(req.params.id, (err, data) => {

    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Comprobante with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Could not delete Comprobante with id " + req.params.id
        });
        }
    } else res.send({ message: `Comprobante was deleted successfully!` });
    });
};



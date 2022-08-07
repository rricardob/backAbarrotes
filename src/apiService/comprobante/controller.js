const { Logger } = require("../../loaders/logger");
const Comprobante = require("./model");
const returnEmptyIfPropertyIsNullOrEmpty = require("../../util/Utils")
const generatePDF = require("../../pdf/index")

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

exports.finById = (req, res) => {

    let params = req.params.id

    //let id_sale_receipt = returnEmptyIfPropertyIsNullOrEmpty(params,"comprobante")

    Comprobante.findById(req.params.id, (err, data) => {
        if (err) {
            Logger.error(`Error: ${err}`);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Comprobante by Id."
            });
        } else res.send(data);
    });

};

exports.anular = (req, res) => {

    let params = req.params.id

    Comprobante.anular(req.params.id, (err, data) => {
        if (err) {
            Logger.error(`Error: ${err}`);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while cancel Comprobante by Id => "+params
            });
        } else res.send(data);
    });
}

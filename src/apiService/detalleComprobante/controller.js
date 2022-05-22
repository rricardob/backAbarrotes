const {Logger} = require("../../loaders/logger");
const detalleComprobante = require("./model");


exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const detComprobante = new detalleComprobante({
        dec_cantidad: req.body.dec_cantidad,
        dec_u_create: req.body.dec_u_create,
        dec_u_update: req.body.dec_u_update,
        pr_id: req.body.pr_id,
        co_id: req.body.co_id,
        cl_id: req.body.cl_id,
        ve_id: req.body.ve_id
    });


    detalleComprobante.create(detComprobante, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating Detalle Comprobante."
            });
        else res.send(data);
    });

};

exports.findAll = (req, res) => {

    detalleComprobante.getAll((err, data) => {

        if (err) {
            Logger.error(`Error: ${err}`);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Detalle Comprobante."
            });
        } else if(data === null || data === undefined || data.length === 0){
            Logger.info(`not content`);
            res.status(204).send({
                message: "not content while retrieving Detalle Comprobante."
            });
        }else{
            res.send(data)
        }
    });

};


exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Logger.info(req.body);

    detalleComprobante.updateById(req.params.id, new detalleComprobante(req.body), (err, data) => {

            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Detalle Comprobante with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Detalle Comprobante with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );

};


exports.delete = (req, res) => {

    detalleComprobante.remove(req.params.id, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Detalle Comprobante with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Detalle Comprobante with id " + req.params.id
                });
            }
        } else res.send({message: `Detalle Comprobante was deleted successfully!`});
    });
};



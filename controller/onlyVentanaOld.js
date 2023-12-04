const OnlyVentanaOld = require('../models/OnlyVentanasOld');

// obterner OnlyVentanaOld
exports.getVentana = async (req, res) => {    
    try {
        // obtener OnlyVentanaOld 
        let onlyVentanaOlds
        onlyVentanaOlds = await OnlyVentanaOld.find({})

        res.json(onlyVentanaOlds)
        
    } catch (error) {
        console.log(error)
        res.status(400).send("Error en Buscar Legacy Branch");
    }
}


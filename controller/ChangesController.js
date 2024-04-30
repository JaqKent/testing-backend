const Cambio = require("../models/Changes");


exports.obtenerCambiosVentanaPorFecha = async (req, res) => {
    try {
        let { fechaInicio, fechaFin } = req.params;

        fechaInicio = new Date(`${fechaInicio}T00:00:00Z`);
        fechaFin = new Date(`${fechaFin}T23:59:59Z`);

        const cambiosVentana = await Cambio.find({
            tipoElemento: 'ventana',
            fecha: { $gte: fechaInicio, $lt: fechaFin }
        });

        const idsCambiosVentanas = cambiosVentana.map(cambio => cambio._id);
        res.status(200).json({ idsCambiosVentanas });
    } catch (error) {
        console.error('Error al obtener cambios de ventana por fechas:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los cambios de ventana por fechas.' });
    }
};


exports.obtenerCommentsVentanaPorFecha = async (req, res) => {
    try {
        let { fechaInicio, fechaFin } = req.params;

        fechaInicio = new Date(`${fechaInicio}T00:00:00Z`);
        fechaFin = new Date(`${fechaFin}T23:59:59Z`);


        const comentariosVentana = await Cambio.find({
            tipoElemento: 'commentVentana',
            fecha: { $gte: fechaInicio, $lt: fechaFin }
        });

        const idsCambiosCommetsVentanas = comentariosVentana.map(cambio => cambio._id);
        res.status(200).json({ idsCambiosCommetsVentanas });
    } catch (error) {
        console.error('Error al obtener comentarios de ventana por fechas:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los comentarios de ventana por fechas.' });
    }
};



exports.obtenerCommentsIncidenciaPorFecha = async (req, res) => {
    try {
        let { fechaInicio, fechaFin } = req.params;

        fechaInicio = new Date(`${fechaInicio}T00:00:00Z`);
        fechaFin = new Date(`${fechaFin}T23:59:59Z`);

        const commentsIncidencia = await Cambio.find({
            tipoElemento: 'commentIncidencia',
            fecha: { $gte: fechaInicio, $lt: fechaFin }
        });

        const idsCambiosCommetsIncidencias = commentsIncidencia.map(cambio => cambio._id);
        res.status(200).json({ idsCambiosCommetsIncidencias });
    } catch (error) {
        console.error('Error al obtener cambios de incidencia por fechas:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los cambios de incidencia por fechas.' });
    }
};


exports.obtenerCambiosIncidenciaPorFecha = async (req, res) => {
    try {
        let { fechaInicio, fechaFin } = req.params;

        fechaInicio = new Date(`${fechaInicio}T00:00:00Z`);
        fechaFin = new Date(`${fechaFin}T23:59:59Z`);

        const cambiosIncidencia = await Cambio.find({
            tipoElemento: 'incidencia',
            fecha: { $gte: fechaInicio, $lt: fechaFin }
        });

        const idsCambiosIncidencias = cambiosIncidencia.map(cambio => cambio._id);
        res.status(200).json({ idsCambiosIncidencias });
    } catch (error) {
        console.error('Error al obtener cambios de incidencia por fechas:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los cambios de incidencia por fechas.' });
    }
};



exports.obtenerCambioVentanaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const cambioVentana = await Cambio.findById(id);

        if (!cambioVentana) {
            return res.status(404).json({ error: 'Cambio de ventana no encontrado' });
        }

        res.status(200).json({ cambioVentana });
    } catch (error) {
        console.error('Error al obtener cambio de ventana por ID:', error);
        res.status(500).json({ error: 'Hubo un error al obtener el cambio de ventana por ID.' });
    }
};

exports.obtenerCommentVentanaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const commentVentana = await Cambio.findById(id);

        if (!commentVentana) {
            return res.status(404).json({ error: 'Comentario de ventana no encontrado' });
        }

        res.status(200).json({ commentVentana });
    } catch (error) {
        console.error('Error al obtener comentario de ventana por ID:', error);
        res.status(500).json({ error: 'Hubo un error al obtener el comentario de ventana por ID.' });
    }
};

exports.obtenerCambioIncidenciaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const cambioIncidencia = await Cambio.findById(id);

        if (!cambioIncidencia) {
            return res.status(404).json({ error: 'Cambio de incidencia no encontrado' });
        }

        res.status(200).json({ cambioIncidencia });
    } catch (error) {
        console.error('Error al obtener cambio de incidencia por ID:', error);
        res.status(500).json({ error: 'Hubo un error al obtener el cambio de incidencia por ID.' });
    }
};

exports.obtenerCommentIncidenciaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const commentIncidencia = await Cambio.findById(id);

        if (!commentIncidencia) {
            return res.status(404).json({ error: 'Comentario de incidencia no encontrado' });
        }

        res.status(200).json({ commentIncidencia });
    } catch (error) {
        console.error('Error al obtener comentario de incidencia por ID:', error);
        res.status(500).json({ error: 'Hubo un error al obtener el comentario de incidencia por ID.' });
    }
};






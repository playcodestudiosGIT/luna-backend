const { response, request } = require('express');


const { Apply } = require('../models');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const crearApply = async (req, res = response) => {

    const { fileId, fileItin, fileSs, fileOsha } = req.files;
    const { nombre, apellido, email, direccion, telf, specialty } = req.body;

    try {

        const idUrl = await cloudinary.uploader.upload(fileId.tempFilePath, { folder: `luna-files/${email}` });
        const itinUrl = await cloudinary.uploader.upload(fileItin.tempFilePath, { folder: `luna-files/${email}` });
        const ssUrl = await cloudinary.uploader.upload(fileSs.tempFilePath, { folder: `luna-files/${email}` });
        const osha10Url = await cloudinary.uploader.upload(fileOsha.tempFilePath, { folder: `luna-files/${email}` });
        

        const data = {
            nombre,
            apellido,
            email,
            direccion,
            telf,
            specialty,
            idFileUrl: idUrl.secure_url,
            itinFileUrl: itinUrl.secure_url,
            ssFileUrl: ssUrl.secure_url,
            osha10FileUrl: osha10Url.secure_url
        }

        console.log(data)

        const apply = new Apply(data);

        
        // Guardar DB
        await apply.save();
        

        return res.status(201).json({
            msg: "ok",
            apply
        });

    } catch (error) {
        res.json({
            msg: `error crear apply ${error}`
        })
    }

}


module.exports = {
    crearApply,

}
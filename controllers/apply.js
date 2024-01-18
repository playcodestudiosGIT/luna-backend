const { response, request } = require('express');


const { Apply } = require('../models');
const { sendOneEmail } = require('../helpers/brevo_service');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const crearApply = async (req, res = response) => {

    const { fileId, fileItin, fileOsha } = req.files;
    const { nombre, apellido, email, direccion, telf, specialty, ss } = req.body;

    try {



        var idUrl = 'https://creative-assets.mailinblue.com/editor/image_placeholder.png';
        var itinUrl = 'https://creative-assets.mailinblue.com/editor/image_placeholder.png';
        var osha10Url = 'https://creative-assets.mailinblue.com/editor/image_placeholder.png';

        try {
            const respid = await cloudinary.uploader.upload(fileId.tempFilePath, { folder: `luna-files/${email}` });
            idUrl = respid.secure_url
        } catch (error) {
            
        }

        try {
            const respitin = await cloudinary.uploader.upload(fileItin.tempFilePath, { folder: `luna-files/${email}` });
            itinUrl = respitin.secure_url
        } catch (error) {
            
        }

        try {
            const resposha = await cloudinary.uploader.upload(fileOsha.tempFilePath, { folder: `luna-files/${email}` });
            osha10Url = resposha.secure_url
        } catch (error) {
            
        }

        const data = {
            nombre,
            apellido,
            email,
            direccion,
            telf,
            specialty,
            ss,
            idFileUrl: idUrl,
            itinFileUrl: itinUrl,
            osha10FileUrl: osha10Url
        }

        // console.log(data);

        const apply = new Apply(data);


        // Guardar DB

        await apply.save();


        try {
            await sendOneEmail(data.nombre, data.apellido, data.email, data.direccion, data.telf, data.specialty, data.idFileUrl, data.itinFileUrl, data.ssFileUrl, data.osha10FileUrl);
        } catch (error) {
            console.log(error)
        }


        return res.status(201).json({
            msg: "ok",
            apply
        });

    } catch (error) {
        console.log(error)
        res.json({
            msg: `error crear apply ${error}`
        })
    }

}


module.exports = {
    crearApply,

}
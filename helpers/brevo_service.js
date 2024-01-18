

const SibApiV3Sdk = require('sib-api-v3-sdk');





const sendOneEmail = async (nombre, apellido, correo, direccion, telf, especialidad, id, init, ss, osha10) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  apiKey.apiKey = process.env.BREVO_API;

  sendSmtpEmail = {
    to: [{
      email: process.env.APPLY_EMAIL,
      NOMBRE: nombre
    }],
    templateId: 2,
    params: {
      NOMBRE: nombre,
      APELLIDO: apellido,
      CORREO: correo,
      TELF: telf,
      DIRECCION: direccion,
      ESPECIALIDAD: especialidad,
      ID: id,
      INIT: init,
      SS: ss,
      OSHA10: osha10,
    },
    

    headers: {
      'api-key': process.env.BREVO_API,
      'Content-Type': 'application/json;', // This is important for sending attachments with
      'Accept': 'application/json;'
    }
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail).then, function (error) {
    // console.log(`error ${error}`);
  };

}


module.exports = {
  sendOneEmail
}
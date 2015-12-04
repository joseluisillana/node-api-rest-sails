module.exports = {
  createResponse:   function (status, message, data) {

    var responseSchema = {
      responseStatus: status,
      responseMessage: message,
      responseData: data
    };
    console.log('M.I.K.E - RESPONSE DATA: '+JSON.stringify(responseSchema));
    return responseSchema;
  }
}

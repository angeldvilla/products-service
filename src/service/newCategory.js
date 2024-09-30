const axios = require('axios');

const location = "http://localhost:3001/categories";

// El cuerpo de la solicitud SOAP
const request = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                  xmlns:cat="http://www.example.org/categories/">
    <soapenv:Header/>
    <soapenv:Body>
        <cat:createCategory>
            <name>AxiosSupplies</name>
        </cat:createCategory>
    </soapenv:Body>
</soapenv:Envelope>
`;

// Configuración de cabeceras HTTP para SOAP
const headers = {
    'Content-Type': 'text/xml; charset=utf-8',
    'SOAPAction': 'createCategory'
};

// Enviar la solicitud con axios
axios.post(location, request, { headers })
    .then(response => {
        console.log("Respuesta del servidor:");
        console.log(response.data);
        return response.data;
    })
    .catch(error => {
        console.error("Error al enviar la solicitud SOAP:", error);
    });

export function VerificaCEP(event) {
    let cepValue = event.target.value.replace(/\D/g, '');

    if (cepValue.length == 8) {
        const https = require('https');

        https.get('https://viacep.com.br/ws/' + cepValue + '/json/', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(JSON.parse(data));
                data = JSON.parse(data);

                if (Object.keys(data).length > 1) {
                    document.getElementById("logradouro").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;
                    document.getElementById("cep-error").innerHTML = "";
                }
                else {
                    document.getElementById("logradouro").value = "";
                    document.getElementById("bairro").value = "";
                    document.getElementById("cidade").value = "";
                    document.getElementById("estado").value = "";
                    document.getElementById("cep-error").innerHTML = "CEP invalido";

                }



            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
};
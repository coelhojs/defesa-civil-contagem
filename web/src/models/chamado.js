const endereco = require('./endereco');
const usuario = require('./usuario');

export const chamado = {
    informante: "",
    tipo: "",
    status: "",
    numeroDiscriminacao: "",
    numeroOficioEncaminhado: "",
    orgaoDestinoOficio: "",
    dataAviso: "",
    dataVistoria: "",
    equipeVistoria: "",
    dataMonitoramento: "",
    morador: "",
    pessoasEnvolvidas: "",
    vitimaParcial: "",
    vitimaFatal: "",
    interdicao: "",
    doacao: "",
    description: "",
    retornoVistoria: "",
    ...usuario,
    ...endereco
}

// Controle de sessões:
var sessoes = {
    // user_id: api_token
};

// Obtem o ID de usuário a partir de um api_token
function getUserId(api_token) {
    let user_id = undefined;
    for (let user_id_prop in sessoes) {
        if (sessoes[user_id_prop] === api_token) {
            user_id = user_id_prop;
            break;
        }
    }
    return user_id;
}

// Obtem o api_token atual de um usuário pelo seu user_id
function getApiToken(user_id) {
    return sessoes[user_id];
}

// Seta uma sessão:
function set(userid, apitoken) {
    sessoes[userid] = apitoken;
}

module.exports = {
    getUserId: getUserId,
    getApiToken: getApiToken,
    set: set,
};
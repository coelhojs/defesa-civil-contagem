/**
 * Módulo de definições, padrões e tratamento de erros
 * 
 */

'use strict'

class AppError extends Error {
	constructor({ http_cod, mensagem, mensagem_amigavel }) {
		super(mensagem);
		this.name = this.constructor.name;
		this.http_cod = http_cod;
		this.mensagem = mensagem;
		this.mensagem_amigavel = mensagem_amigavel;
		Error.captureStackTrace(this, this.constructor);
	}

	toJSON() {
		if (process.env.NODE_ENV.toLowerCase() == 'dev')
			return {
				stack: this.stack,
				mensagem: this.mensagem,
				mensagem_amigavel: this.mensagem_amigavel,
			}
		else if (process.env.NODE_ENV.toLowerCase() == 'production')
			return {
				mensagem_amigavel: this.mensagem_amigavel,
			}
	}
}

function error_route(err, req, res, next) {
	if (err instanceof AppError) {
		res.status(err.http_cod || 500).json(err);
	} else {
		res.status(500).json({
			stack: err.stack,
			mensagem: err.message,
			mensagem_amigavel: 'Ocorreu um erro interno',
		});
	}
}

module.exports = {
	AppError: AppError,
	error_route: error_route,
}
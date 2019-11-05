const Admin = require('../models/admin');
const { AppError } = require('../models/error');

// Obtem o admin atual:
exports.get_admin = async (req, res, next) => {
	try {

		let admin = await Admin.findOne({});
		if (!admin) throw new Error();
		res.status(200).json(admin);
		
	} catch (ex) {
		next(new AppError({
			http_cod: 500,
			mensagem: ex.message,
			mensagem_amigavel: 'Não há administrador cadastrado',
		}));
	}
}
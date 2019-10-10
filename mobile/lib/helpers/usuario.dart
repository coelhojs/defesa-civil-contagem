import 'dart:convert';

class Usuario {
  String nome;
  String email;
  String imagem;
  String cpf;
  String telefone;
  Endereco endereco;
  String tipo;

  Usuario(){
    nome="Nome";
    imagem= "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png";
    email = "Email";
    cpf = "CPF";
    telefone = "Telefone";
    endereco = Endereco();
    tipo = "Tipo";
  }

  Usuario.fromJson(Map<String, dynamic> json)
      : nome = json['nome'],
        email = json['email'],
        imagem = json['imagem'],
        cpf = json['cpf'],
        endereco = Endereco.fromJson(json['endereco']),
        telefone = json['telefone'],
        tipo = json['tipo'];

  Map<String, dynamic> toJson() => {
        'nome': nome,
        'email': email,
        'imagem': imagem,
        'cpf': cpf,
        'endereco': endereco.toJson(),
        'telefone': telefone,
        'tipo': tipo,
      };

  @override
  String toString() {
    Map<String, dynamic> json = toJson();
    return jsonEncode(json);
  }
}

class Endereco {
  String cep;
  String logradouro;
  String bairro;
  String cidade;
  String uf;
  int numero;
  String complemento;

  Endereco(){
    cep = "CEP";
    logradouro = "Logradouro";
    bairro = "Bairro";
    cidade = "Cidade";
    uf = "UF";
    numero = 0;
    complemento = "Complemento";
  }

  Endereco.fromJson(Map<String, dynamic> json)
      : cep = json['cep'],
        logradouro = json['logradouro'],
        bairro = json['bairro'],
        cidade = json['cidade'],
        uf = json['uf'],
        numero = json['numero'],
        complemento = json['complemento'];

  Map<String, dynamic> toJson() => {
        'cep': cep,
        'logradouro': logradouro,
        'bairro': bairro,
        'cidade': cidade,
        'uf': uf,
        'numero': numero,
        'complemento': complemento,
      };

  @override
  String toString() {
    super.toString();
    return "Cep $cep, Logradouro $logradouro, Bairro $bairro, Cidade $cidade, UF $uf, Numero $numero, Complemento $complemento";
  }
}

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Send from "@material-ui/icons/Send";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../customHooks/useForm";
import { CEPMask, CPFMask, TelefoneMask } from "../masks";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5),
    margin: "auto",
    maxWidth: 600,
    minWidth: 265
  },
  form:{
    marginBottom: 50,
  },
  formControl: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1)
  },
  erro: {
    color: "#ff0000"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  text: {
    textAlign: "center"
  }
}));

const formInputs = {
  nome: "",
  email: "",
  cpf: "",
  userType: "",
  telefone: "",
  dataNasc: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: ""
};

export default function CadastroForm() {
  const classes = useStyles();
  const { values, errors, handleChange, handleSubmit } = useForm(
    callbackSubmit,
    formInputs
  );

  function callbackSubmit() {
    console.log(values);
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h2" className={classes.text}>
        Cadastro
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container direction="row" justify="space-between" alignItems="center" className={classes.form}> 
          <Grid item md={12}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="nome">Nome Completo</InputLabel>
              <Input required name="nome" value={values.nome} onChange={handleChange} />
              {errors.nome && (<FormHelperText className={classes.erro}>{errors.nome}</FormHelperText>)}
            </FormControl>
          </Grid>
          <Grid item md={8}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <Input readOnly type="email" value={values.email} />
          </FormControl>
          </Grid>
          <Grid item md={3}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="telefone" shrink> Telefone </InputLabel>
            <Input required name="telefone" value={values.telefone} onChange={handleChange} inputComponent={TelefoneMask}/>
            {errors.telefone && (<FormHelperText className={classes.erro}>{errors.telefone}</FormHelperText>)}
          </FormControl>
          </Grid>
          <Grid item md={3}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="cpf" shrink> CPF </InputLabel>
            <Input required name="cpf" value={values.cpf} onChange={handleChange} inputComponent={CPFMask}/>
            {errors.cpf && (<FormHelperText className={classes.erro}>{errors.cpf}</FormHelperText>)}
          </FormControl>
          </Grid>
          <Grid item md={4}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="dataNasc" shrink> Data de Nascimento </InputLabel>
            <Input required name="dataNasc" value={values.dataNasc} onChange={handleChange} type="date" />
            {errors.dataNasc && (<FormHelperText className={classes.erro}>{errors.dataNasc}</FormHelperText>)}
          </FormControl>
          </Grid>
          <Grid item md={3}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="userType">Tipo</InputLabel>
            <Select value={values.userType} onChange={handleChange}
              inputProps={{
                name: "userType",
                id: "userType",
                required: true
              }}
            >
              <MenuItem value={"Atendente"} defaultValue> Atendente </MenuItem>
              <MenuItem value={"Gerente"}>Gerente</MenuItem>
              <MenuItem value={"Vistoriador"}>Vistoriador</MenuItem>
            </Select>
            {errors.userType && (<FormHelperText className={classes.erro}>{errors.userType}</FormHelperText>)}
          </FormControl>
          </Grid>
          <Grid item md={12}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="cep" shrink> CEP </InputLabel>
            <Input required name="cep" value={values.cep} onChange={handleChange} inputComponent={CEPMask} />
            {errors.cep && (<FormHelperText className={classes.erro}>{errors.cep}</FormHelperText>)}
          </FormControl>
          </Grid>
          <Grid item md={8}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="logradouro" shrink> Logradouro </InputLabel>
            <Input readOnly id="logradouro" name="logradouro" value={values.logradouro} onChange={handleChange} />
          </FormControl>
          </Grid>
          <Grid item md={2}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="numero">Número</InputLabel>
            <Input required name="numero" type="number" value={values.numero} onChange={handleChange} />
            {errors.numero && (<FormHelperText className={classes.erro}>{errors.numero}</FormHelperText>)}
          </FormControl>
          </Grid>
          <Grid item md={6}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="bairro" shrink>Bairro </InputLabel>
            <Input readOnly id="bairro" name="bairro" value={values.bairro} onChange={handleChange} />
          </FormControl>
          </Grid>
          <Grid item md={4}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="complemento">Complemento</InputLabel>
            <Input name="complemento" value={values.complemento} onChange={handleChange}/>
          </FormControl>
          </Grid>
          <Grid item md={6}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="cidade" shrink> Cidade </InputLabel>
            <Input readOnly id="cidade" name="cidade" value={values.cidade} onChange={handleChange} />
          </FormControl>
          </Grid>
          <Grid item md={4}>
          {/*<FormControl className={classes.formControl}>
                            <InputLabel htmlFor="estado" shrink>Estado</InputLabel>
                            <Input readOnly id="estado" name="estado" value={values.estado} onChange={handleChange}/>
                            </FormControl>*/}

          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="estado">Estado</InputLabel>
            <Select readOnly value={values.estado} onChange={handleChange}
              inputProps={{
                name: "estado",
                id: "estado"
              }}
            >
              <MenuItem value={"AC"}>Acre</MenuItem>
              <MenuItem value={"AL"}>Alagoas</MenuItem>
              <MenuItem value={"AP"}>Amapá</MenuItem>
              <MenuItem value={"AM"}>Amazonas</MenuItem>
              <MenuItem value={"BA"}>Bahia</MenuItem>
              <MenuItem value={"CE"}>Ceará</MenuItem>
              <MenuItem value={"DF"}>Distrito Federal</MenuItem>
              <MenuItem value={"ES"}>Espírito Santo</MenuItem>
              <MenuItem value={"GO"}>Goiás</MenuItem>
              <MenuItem value={"MA"}>Maranhão</MenuItem>
              <MenuItem value={"MT"}>Mato Grosso</MenuItem>
              <MenuItem value={"MS"}>Mato Grosso do Sul</MenuItem>
              <MenuItem value={"MG"}>Minas Gerais</MenuItem>
              <MenuItem value={"PA"}>Pará</MenuItem>
              <MenuItem value={"PB"}>Paraíba</MenuItem>
              <MenuItem value={"PR"}>Paraná</MenuItem>
              <MenuItem value={"PE"}>Pernambuco</MenuItem>
              <MenuItem value={"PI"}>Piauí</MenuItem>
              <MenuItem value={"RJ"}>Rio de Janeiro</MenuItem>
              <MenuItem value={"RN"}>Rio Grande do Norte</MenuItem>
              <MenuItem value={"RS"}>Rio Grande do Sul</MenuItem>
              <MenuItem value={"RO"}>Rondônia</MenuItem>
              <MenuItem value={"RR"}>Roraima</MenuItem>
              <MenuItem value={"SC"}>Santa Catarina</MenuItem>
              <MenuItem value={"SP"}>São Paulo</MenuItem>
              <MenuItem value={"SE"}>Sergipe</MenuItem>
              <MenuItem value={"TO"}>Tocantins</MenuItem>
            </Select>
          </FormControl>
          </Grid>
        </Grid>
        <Grid container direction="row-reverse" justify="space-around" alignItems="flex-end" spacing={1} >
          <Button variant="contained" color="primary" className={classes.button} type="submit">
            Enviar
            <Send className={classes.rightIcon} />
          </Button>
          <Button component={RouterLink} to="/" color="secondary" className={classes.button} >
            Cancelar
          </Button>
        </Grid>
      </form>
    </Paper>
  );
}

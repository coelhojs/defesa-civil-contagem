import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from '@material-ui/core/FormLabel';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Send from "@material-ui/icons/Send";
import * as React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { useForm } from "../customHooks/useForm";
import { usuarioModel } from "../models/usuario";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(5),
        margin: "auto",
        maxWidth: 600,
        minWidth: 265
    },
    button: {
        margin: theme.spacing(1)
    },
    erro: {
        color: "#ff0000",
        marginBottom: '1rem',
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    formHeader: {
        marginBottom: '2rem',
        textAlign: "center",
    },
    formInput: {
        width: '100%'
    },
    item: {
        paddingLeft: '1rem'
    }
}));

export default function CadastroForm() {
    const classes = useStyles();
    const auth = useAuth();
    const { values, errors, handleChange, handleSubmit } = useForm(callbackSubmit, usuarioModel);

    function callbackSubmit() {
        auth.signup(values);
    }

    return (
        <Paper className={classes.root}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" component="h2" className={classes.formHeader}>
                    Cadastro
                </Typography>
                <Grid container direction="row" justify="space-between" alignItems="center" className={classes.form}>
                    <Grid item md={12} className={classes.item}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Perfil</FormLabel>
                            <RadioGroup name="userType" value={values.userType} onChange={handleChange} row>
                                <FormControlLabel
                                    value={"Atendimento"}
                                    control={<Radio color="primary" />}
                                    label="Atendimento"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value={"Gerência"}
                                    control={<Radio color="primary" />}
                                    label="Gerência"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value={"Vistoria"}
                                    control={<Radio color="primary" />}
                                    label="Vistoria"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormHelperText className={classes.erro}>
                            {errors.userType && (errors.userType)}
                        </FormHelperText>
                    </Grid>
                    <Grid item md={12} className={classes.item}>
                        <TextField
                            label="Nome"
                            name="nome"
                            className={classes.formInput}
                            value={values.nome}
                            onChange={handleChange}

                            fullWidth
                        />
                        <FormHelperText className={classes.erro}>
                            {errors.nome && (errors.nome)}
                        </FormHelperText>
                    </Grid>
                    <Grid item md={6} className={classes.item}>
                        <TextField
                            label="E-mail"
                            className={classes.formInput}
                            value={values.email}
                            onChange={handleChange}
                            type="email"
                            readOnly
                        />
                        <FormHelperText className={classes.erro}>
                            {errors.email && (errors.email)}
                        </FormHelperText>
                    </Grid>
                    <Grid item md={6} className={classes.item}>
                        <TextField
                            label="Telefone"
                            name="telefone"
                            className={classes.formInput}
                            value={values.telefone}
                            onChange={handleChange}

                        />
                        <FormHelperText className={classes.erro}>
                            {errors.telefone && (errors.telefone)}
                        </FormHelperText>
                        {/* TODO: Incluir mascaras */}
                        {/* inputComponent={TelefoneMask} */}
                    </Grid>
                    <Grid item md={6} className={classes.item}>
                        <TextField
                            label="CPF"
                            name="cpf"
                            className={classes.formInput}
                            value={values.cpf}
                            onChange={handleChange}

                        />
                        <FormHelperText className={classes.erro}>
                            {errors.cpf && (errors.cpf)}
                        </FormHelperText>
                        {/* inputComponent={CPFMask}  */}
                    </Grid>
                    <Grid item md={6} className={classes.item}>
                        <TextField
                            label="Data de nascimento"
                            name="dataNasc"
                            className={classes.formInput}
                            value={values.dataNasc}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}

                            type="date"
                        />
                        <FormHelperText className={classes.erro}>
                            {errors.dataNasc && (errors.dataNasc)}
                        </FormHelperText>
                    </Grid>
                    <Grid item md={12} className={classes.item}>
                        <TextField
                            label="CEP"
                            name="cep"
                            className={classes.formInput}
                            value={values.cep}
                            onChange={handleChange}

                        // inputComponent={CEPMask}
                        />
                        <FormHelperText className={classes.erro}>
                            {errors.cep && (errors.cep)}
                        </FormHelperText>
                    </Grid>
                    <Grid item md={5} className={classes.item}>
                        <TextField
                            className={classes.formInput}
                            label="Logradouro"
                            name="logradouro"
                            value={values.logradouro}
                            onChange={handleChange}

                            readOnly
                        />
                        <FormHelperText className={classes.erro}>
                            {errors.logradouro && (errors.logradouro)}
                        </FormHelperText>
                    </Grid>
                    <Grid item md={3} className={classes.item}>
                        <TextField
                            className={classes.formInput}
                            label="Número"
                            name="numero"
                            value={values.numero}
                            onChange={handleChange}

                        />
                        <FormHelperText className={classes.erro}>
                            {errors.numero && (errors.numero)}
                        </FormHelperText>
                    </Grid>
                    <Grid item md={4} className={classes.item}>
                        <TextField
                            className={classes.formInput}
                            label="Complemento"
                            name="complemento"
                            value={values.complemento}
                            onChange={handleChange}

                        />
                        <FormHelperText className={classes.erro}>
                            {errors.complemento && (errors.complemento)}
                        </FormHelperText>
                    </Grid>
                    <Grid item md={5} className={classes.item}>
                        <TextField
                            className={classes.formInput}
                            label="Bairro"
                            name="bairro"
                            value={values.bairro}
                            onChange={handleChange}

                        />
                        <FormHelperText className={classes.erro}>
                            {errors.bairro && (errors.bairro)}
                        </FormHelperText>
                    </Grid>
                    <Grid item md={4} className={classes.item}>
                        <TextField
                            className={classes.formInput}
                            label="Cidade"
                            name="cidade"
                            value={values.cidade}
                            onChange={handleChange}

                        />
                        <FormHelperText className={classes.erro}>
                            {errors.cidade && (errors.cidade)}
                        </FormHelperText>
                    </Grid>
                    <Grid item md={3} className={classes.item}>
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

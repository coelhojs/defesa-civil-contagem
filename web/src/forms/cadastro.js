import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../customHooks/useForm";
import Typography from '@material-ui/core/Typography';
//import { CEPMask, CPFMask, TelefoneMask } from "../masks";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        margin: 'auto',
        maxWidth: "60%",
        minWidth: 265,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
    erro: {
        color: '#ff0000',
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    text:{
        textAlign: "center",
    }
}));

const formInputs = {
    nome: '',
    email: '',
    cpf: '',
    userType: '',
    telefone: '',
    dataNasc: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
}

export default function CadastroForm() {
    const classes = useStyles();
    const { values, errors, handleChange, handleSubmit, validaNome } = useForm(callbackSubmit, formInputs);

    function callbackSubmit() {
        console.log(values);
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h5" component="h2" className={classes.text}>
                Cadastro
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* TODO: Remover Grids duplos */}
                {/*<Grid container direction="row" justify="center" alignItems="center" >
                    <Grid item xs={12} md={8}>*/}
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="nome">Nome Completo</InputLabel>
                            <Input required name="nome" value={values.nome} onChange={handleChange} />
                            {errors.nome && (
                                <FormHelperText className={classes.erro}>{errors.nome}</FormHelperText>
                            )}
                        </FormControl>
                        <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="email">E-Mail</InputLabel>
                            <Input readOnly type="email" name="email" value={values.email}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="telefone" shrink>Telefone</InputLabel>
                            <Input required name="telefone" value={values.telefone} onChange={handleChange}
                                //inputComponent={TelefoneMask}
                            />
                            <FormHelperText className={classes.erro}>{errors.telefone}</FormHelperText>
                        </FormControl>
                        <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="cpf" shrink>CPF</InputLabel>
                            <Input required name="cpf" value={values.cpf} onChange={handleChange}
                                //inputComponent={CPFMask}
                            />
                            <FormHelperText className={classes.erro}>{errors.cpf}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="dataNasc" shrink>Data de Nascimento</InputLabel>
                            <Input required name="dataNasc" value={values.dataNasc} onChange={handleChange} type="date" />
                            <FormHelperText className={classes.erro}>{errors.dataNasc}</FormHelperText>
                        </FormControl>
                        <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="userType" >Tipo</InputLabel>
                            <Select  value={values.userType} onChange={handleChange}
                                inputProps={{
                                    name: 'userType',
                                    id: 'userType',
                                    required: true,
                                }}
                            >
                                <MenuItem value={'Atendente'} defaultValue>Atendente</MenuItem>
                                <MenuItem value={'Gerente'}>Gerente</MenuItem>
                                <MenuItem value={'Vistoriador'}>Vistoriador</MenuItem>
                            </Select>
                            <FormHelperText className={classes.erro}>{errors.userType}</FormHelperText>
                        </FormControl>
                        <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="cep" shrink>CEP</InputLabel>
                            <Input required name="cep" value={values.cep} onChange={handleChange}
                                //inputComponent={CEPMask}
                            />
                            <FormHelperText className={classes.erro}>{errors.cep}</FormHelperText>
                        </FormControl>
                        <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="logradouro" shrink>Logradouro</InputLabel>
                            <Input readOnly id="logradouro" name="logradouro" value={values.logradouro} onChange={handleChange} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="numero">Número</InputLabel>
                                <Input required name="numero" type="number" value={values.numero} onChange={handleChange} />
                                <FormHelperText className={classes.erro}>{errors.numero}</FormHelperText>
                            </FormControl>
                            <FormControl  className={classes.formControl}>
                                <InputLabel htmlFor="complemento">Complemento</InputLabel>
                                <Input name="complemento" value={values.complemento} onChange={handleChange} />
                        </FormControl>
                        <FormControl  className={classes.formControl}>
                            <InputLabel htmlFor="bairro" shrink>Bairro</InputLabel>
                            <Input readOnly id="bairro" name="bairro" value={values.bairro}onChange={handleChange}/>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="cidade" shrink>Cidade</InputLabel>
                            <Input readOnly id="cidade" name="cidade" value={values.cidade} onChange={handleChange} />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="estado" shrink>Estado</InputLabel>
                            <Input readOnly id="estado" name="estado" value={values.estado} onChange={handleChange}
                            />
                        </FormControl>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            alignItems="flex-end"
                            spacing={1}
                        >
                            <Link component={RouterLink} to="/" color="secondary" className={classes.button}>
                                Cancelar
                            </Link>
                            <Button variant="contained" color="primary" className={classes.button}
                                type="submit">
                                Enviar
                                <Send className={classes.rightIcon} />
                            </Button>
                        </Grid>
                    {/*</Grid>
                </Grid>*/}
            </form>
        </Paper>

    )
}
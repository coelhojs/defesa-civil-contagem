import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Send from '@material-ui/icons/Send';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from "../customHooks/useForm";
import { useHistory } from "react-router-dom";
import { chamado } from '../models/chamado';
import ListaImagem from "./listaImagem";
import { createChamado } from "../controllers/Chamados";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(10),
        margin: '5rem',
        textAlign: 'center'
    },
    formControl: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    erro: {
        color: '#ff0000',
    },
    textarea: {
        minWidth: "600px",
        minHeight: "100px",
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    title: {
        marginBottom: '4rem'
    }
}));

export default function ChamadoForm(props) {
    let history = useHistory();
    const classes = useStyles();
    const { errors, values, handleChange, handleSubmit } = useForm(callbackSubmit, chamado);
    const [aviso] = useState(props.aviso);

    function callbackSubmit() {
        createChamado(values);
        history.push('/Dashboard');
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h3" gutterBottom className={classes.title}>
                Novo Chamado
      </Typography>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12} md={3} ></Grid>
                    <Grid item xs={12} md={3} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="tipo">Tipo</InputLabel>
                            <Input
                                readOnly
                                id="tipo"
                                value={values.tipo = aviso.tipo}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="id">ID</InputLabel>
                            <Input
                                readOnly
                                id="id"
                                value={values.idSequencia = aviso.idSequencia}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} ></Grid>

                    <Grid item xs={12} md={8} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="Informant">Informante</InputLabel>
                            <Input
                                readOnly
                                id="Informant"
                                value={values.informante = aviso.usuario.nome}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="data">Data/Hora</InputLabel>
                            <Input
                                readOnly
                                id="data"
                                value={values.dataAviso = moment.unix(aviso.timestamp).format("DD/MM/YYYY hh:mm")}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={8} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                readOnly
                                id="email"
                                value={values.usuario.email = aviso.usuario.email}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="telefone">Telefone</InputLabel>
                            <Input
                                readOnly
                                id="telefone"
                                value={values.usuario.telefone = aviso.usuario.telefone}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="logradouro" >Logradouro</InputLabel>
                            <Input
                                id="logradouro"
                                value={values.endereco.logradouro = aviso.endereco.logradouro}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="numero" >Número</InputLabel>
                            <Input
                                id="numero"
                                type="number"
                                value={values.endereco.numero = aviso.endereco.numero}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="complemento">Complemento</InputLabel>
                            <Input
                                readOnly
                                id="complemento"
                                value={values.endereco.complemento = aviso.endereco.complemento}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="bairro" shrink>Bairro</InputLabel>
                            <Input
                                id="bairro"
                                value={values.endereco.bairro = aviso.endereco.bairro}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="regional">Regional</InputLabel>
                            <Input
                                id="regional"
                                value={values.endereco.regional}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth className={classes.formControl}>
                            <TextareaAutosize rows={3}
                                className={classes.textarea}
                                onChange={handleChange}
                                value={values.descricao}
                                placeholder="Descrição"
                            />
                            <FormHelperText className={classes.erro}>{errors.descricao}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <ListaImagem />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" className={classes.button}>Voltar
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                            Criar Chamado
                        <Send className={classes.rightIcon} />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper >
    )
}
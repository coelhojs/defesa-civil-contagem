import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ListaImagem from "../components/listaImagem";
import Spinner from '../components/spinner';
import { fetchAviso } from '../customHooks/useAvisos';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
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
        textAlign: "left",
        marginBottom: "2rem"
    }
}));

export default function DetalhesAviso() {
    const classes = useStyles();
    const [aviso, setAviso] = useState(null);

    let history = useHistory();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let location = useLocation();
    let avisoId = location.pathname.split("/")

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAviso(avisoId[2])
            setAviso(response.data);
        };
        fetchData();
    }, []);

    if (aviso) {
        return (
            <Paper className={classes.root}>
                <Typography variant="h5" className={classes.title}>
                    Detalhes do aviso {aviso.idSequencia}
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={12} md={3} ></Grid>
                    <Grid item xs={12} md={3} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="tipo">Tipo</InputLabel>
                            <Input
                                readOnly
                                id="tipo"
                                value={aviso.tipo}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="id">ID</InputLabel>
                            <Input
                                readOnly
                                id="id"
                                value={aviso.idSequencia}
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
                                value={aviso.usuario.nome}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="data">Data/Hora</InputLabel>
                            <Input
                                readOnly
                                id="data"
                                value={moment.unix(aviso.timestamp).format("DD/MM/YYYY hh:mm")}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={8} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                readOnly
                                id="email"
                                value={aviso.usuario.email}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="telefone">Telefone</InputLabel>
                            <Input
                                readOnly
                                id="telefone"
                                value={aviso.usuario.telefone}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="logradouro" >Logradouro</InputLabel>
                            <Input
                                id="logradouro"
                                value={aviso.endereco.logradouro}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="numero" >Número</InputLabel>
                            <Input
                                id="numero"
                                type="number"
                                value={aviso.endereco.numero}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="complemento">Complemento</InputLabel>
                            <Input
                                readOnly
                                id="complemento"
                                value={aviso.endereco.complemento}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="bairro" shrink>Bairro</InputLabel>
                            <Input
                                id="bairro"
                                value={aviso.endereco.bairro}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="regional">Regional</InputLabel>
                            <Input
                                id="regional"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth className={classes.formControl}>
                            <TextareaAutosize rows={3}
                                className={classes.textarea}
                                value={aviso.descricao}
                                placeholder="Descrição"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <ListaImagem />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => history.push('/Avisos')} variant="contained" color="primary" className={classes.button}>
                            Voltar para a lista
                        </Button>
                    </Grid>
                </Grid>
            </Paper >
        )
    } else {
        return <Spinner />
    }
}
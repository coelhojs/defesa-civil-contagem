import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Send from '@material-ui/icons/Send';
import moment from 'moment';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { updateAviso } from '../customHooks/useAvisos';
import { createChamado } from "../customHooks/useChamados";
import { useForm } from "../customHooks/useForm";
import { chamado } from '../models/chamado';
import ListaImagem from "../components/listaImagem";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function AvisoForm(props) {
    let history = useHistory();
    const classes = useStyles();
    const [aviso] = useState(props.aviso);
    const [tempValues, setTempValues] = useState({
        ...chamado,
        id: aviso.id,
        timestamp: aviso.timestamp,
        tipo: aviso.tipo,
        descricao: aviso.descricao,
        imagens: aviso.imagens,
        logradouro: aviso.logradouro,
        numero: aviso.numero,
        bairro: aviso.bairro,
        cidade: aviso.cidade,
        estado: aviso.estado,
        cep: aviso.cep,
        coordenadas: {
            lat: aviso.lat,
            lng: aviso.lng
        },
        usuario_id: aviso.usuario_id,
        usuario_nome: aviso.usuario_nome,
        usuario_email: aviso.usuario_email,
        usuario_cpf: aviso.usuario_cpf,
        usuario_telefone: aviso.usuario_telefone,
        usuario_dataNasc: aviso.usuario_dataNasc,
        usuario_logradouro: aviso.usuario_logradouro,
        usuario_numero: aviso.usuario_numero,
        usuario_bairro: aviso.usuario_bairro,
        usuario_cidade: aviso.usuario_cidade,
        usuario_estado: aviso.usuario_estado,
        usuario_cep: aviso.usuario_cep
    })

    const { errors, values, handleChange, handleSubmit } = useForm(callbackSubmit, tempValues);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function callbackSubmit() {
        values.status = "Pendente";
        values.timestamp = aviso.timestamp;
        values.coordenadas = {
            lat: aviso.coordenadas.lat,
            lng: aviso.coordenadas.lng
        };

        createChamado(values).then(() => {
            aviso.status = "Processado";
            updateAviso(aviso);
            history.push('/Avisos');
        });
    }

    return (
        <div>
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
                        <Grid item xs={12} md={2} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="tipo">Tipo</InputLabel>
                                <Input
                                    name="tipo"
                                    defaultValue={values.tipo}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="id">ID</InputLabel>
                                <Input
                                    readOnly
                                    name="idSequencia"
                                    value={values.idSequencia = aviso.idSequencia}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} ></Grid>

                        <Grid item xs={12} md={8} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="nome">Informante</InputLabel>
                                <Input
                                    name="usuario_nome"
                                    defaultValue={values.usuario_nome}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="timestamp">Data/Hora</InputLabel>
                                <Input
                                    readOnly
                                    name="timestamp"
                                    value={moment.unix(aviso.timestamp).format("DD/MM/YYYY hh:mm")}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={8} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    readOnly
                                    name="usuario_email"
                                    defaultValue={values.usuario_email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="telefone">Telefone</InputLabel>
                                <Input
                                    name="usuario_telefone"
                                    defaultValue={values.usuario_telefone}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="logradouro" >Logradouro</InputLabel>
                                <Input
                                    name="endereco.logradouro"
                                    defaultValue={values.logradouro}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="numero" >Número</InputLabel>
                                <Input
                                    type="number"
                                    name="endereco.numero"
                                    defaultValue={values.numero}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="complemento">Complemento</InputLabel>
                                <Input
                                    name="endereco.complemento"
                                    defaultValue={values.complemento}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="bairro" shrink>Bairro</InputLabel>
                                <Input
                                    name="endereco.bairro"
                                    defaultValue={values.bairro}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="regional">Regional</InputLabel>
                                <Input
                                    name="endereco.regional"
                                    defaultValue={values.regional}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        {/* <Grid item xs={12} md={12}>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextareaAutosize rows={2}
                                    className={classes.textarea}
                                    name="descricao"
                                    defaultValue={values.descricao}
                                    placeholder="Descrição"
                                    onChange={handleChange}
                                />
                                <FormHelperText className={classes.erro}>{errors.descricao}</FormHelperText>
                            </FormControl>
                        </Grid> */}
                        <Grid item xs={12}>
                            <ListaImagem />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => history.push('/Avisos')} variant="contained" color="secondary" className={classes.button}>Voltar
                        </Button>
                            <Button onClick={handleClickOpen} variant="contained" color="primary" className={classes.button}>
                                Criar Chamado
                        <Send className={classes.rightIcon} />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper >
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Confirmar criação de chamado</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Deseja criar esse chamado?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        color="primary" className={classes.button}>
                        Cancelar
                        </Button>
                    <Button type="submit" onClick={handleClose, handleSubmit}
                        color="primary" className={classes.button}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
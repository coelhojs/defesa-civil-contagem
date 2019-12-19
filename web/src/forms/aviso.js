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
import ListaImagem from "../components/listaImagem";
import { updateAviso } from '../customHooks/useAvisos';
import { useForm } from "../customHooks/useForm";

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
    const [open, setOpen] = useState(false);
    const { errors, values, handleChange, handleSubmit } = useForm(callbackSubmit, aviso);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function callbackSubmit() {
        aviso.status = "Pendente";
        aviso.timestamp = aviso.timestamp;
        aviso.coordenadas = {
            lat: aviso.coordenadas.lat,
            lng: aviso.coordenadas.lng
        };

        aviso.status = "Processado";
        updateAviso(aviso);
        history.push('/Avisos');
    }

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h3" gutterBottom className={classes.title}>
                    Detalhes do aviso</Typography>
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
                                    defaultValue={aviso.tipo}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="id">ID</InputLabel>
                                <Input
                                    readOnly
                                    name="id"
                                    value={aviso.id}
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
                                    defaultValue={aviso.user_id.nome}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="dataHora">Data/Hora</InputLabel>
                                <Input
                                    readOnly
                                    name="dataHora"
                                    value={moment(aviso.dataHora).format("DD/MM/YYYY hh:mm")}
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
                                    defaultValue={aviso.user_id.email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="telefone">Telefone</InputLabel>
                                <Input
                                    name="usuario_telefone"
                                    defaultValue={aviso.user_id.telefone}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="logradouro" >Endereço da ocorrência</InputLabel>
                                <Input
                                    name="aviso.endereco.rua"
                                    defaultValue={aviso.endereco.rua}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="numero" >Número</InputLabel>
                                <Input
                                    type="number"
                                    name="aviso.endereco.numero"
                                    defaultValue={aviso.endereco.numero}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="complemento">Complemento</InputLabel>
                                <Input
                                    name="aviso.endereco.complemento"
                                    defaultValue={aviso.endereco.complemento}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="bairro" shrink>Bairro</InputLabel>
                                <Input
                                    name="aviso.endereco.bairro"
                                    defaultValue={aviso.endereco.bairro}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        {/* <Grid item xs={12} md={4}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="regional">Regional</InputLabel>
                                <Input
                                    name="aviso.endereco.regional"
                                    defaultValue={aviso.endereco.regional}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid> */}

                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextareaAutosize rows={2}
                                    className={classes.textarea}
                                    name="aviso.descricao"
                                    defaultValue={aviso.descricao}
                                    placeholder="Descrição"
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <ListaImagem imagens={aviso.fotos} />
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

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Send from '@material-ui/icons/Send';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "../customHooks/useForm";
import ListaImagem from "./listaImagem";
import { minHeight } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    erro: {
        color: '#ff0000',
    },
    textarea:{
        minWidth: "600px",
        minHeight: "100px",
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },

}));

export default function CadastroForm() {
    const classes = useStyles();
    const { values, handleChange, handleSubmit } = useForm(submit);
    /*const [values, setValues] = React.useState({
        nome: '',
        email: 'hai',
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
    });*/

    function submit() {
        console.log(values);
    }

    return (

        <form onSubmit={handleSubmit}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} md={8}
                    container
                    justify="space-between"
                    spacing={1}
                >
                    <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="Informant" shrink>Informante</InputLabel>
                            <Input
                                readOnly
                                id="Informant"
                                value={values.Informant}
                                onChange={handleChange}
                            />
                        {/* <FormHelperText id="nome-error">Error?</FormHelperText> */}
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="Inspector" shrink>Vistoriador</InputLabel>
                            <Input
                                readOnly
                                id="Inspector"
                                value={values.Inspector}
                                onChange={handleChange}
                            />
                        {/* <FormHelperText id="e-mail-error">o telefone deve conter </FormHelperText> */}
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="type">Tipo</InputLabel>
                            <Select
                                value={values.type}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'type',
                                    id: 'type',
                                }}
                            >
                                <MenuItem value='Deslizamento'>Deslizamento</MenuItem>
                                <MenuItem value='Rachadura'>Rachadura</MenuItem>
                            </Select>
                        {/* <FormHelperText id="type-error">o telefone deve conter </FormHelperText> */}
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="status">Estatus</InputLabel>
                            <Select
                                value={values.status}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'status',
                                    id: 'status',
                                }}
                            >
                                <MenuItem value='Pendente'>Pendente</MenuItem>
                                <MenuItem value='Vistoriado'>Vistoriado</MenuItem>
                            </Select>
                        </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="date" shrink="true" shrink>Data e Hora</InputLabel>
                            <Input
                                readOnly
                                id="date"
                                type="datetime-local"
                                value={values.street}
                                onChange={handleChange}
                            />
                        {/* <FormHelperText id="telefone-error">o telefone deve conter </FormHelperText> */}
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="logradouro" >Logradouro</InputLabel>
                        <Input
                            id="logradouro"
                            value={values.logradouro}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="numero" >Número</InputLabel>
                            <Input
                                id="numero"
                                type="number"
                                value={values.numero}
                                onChange={handleChange}
                                aria-describedby="numero-error"
                            />
                            {/* <FormHelperText id="numero-error"></FormHelperText> */}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="complemento">Complemento</InputLabel>
                            <Input
                                id="complemento"
                                value={values.complemento}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="bairro">Bairro</InputLabel>
                        <Input
                            id="bairro"
                            value={values.bairro}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="cidade">Cidade</InputLabel>
                        <Input
                            id="cidade"
                            value={values.cidade}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="estado">Estado</InputLabel>
                        <Input
                            id="estado"
                            value={values.estado}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="description" shrink>Descrição</InputLabel>
                        <TextareaAutosize
                            className={classes.textarea}
                            value={values.description}
                            onChange={handleChange}
                            rowsMax={4}
                            aria-label="maximum height"
                            inputProps={{
                                name: 'description',
                                id: 'description',
                            }}
                            
                        />
                        {/*<FormHelperText id="cep-error" className={classes.erro}></FormHelperText>*/}
                    </FormControl>
                    <ListaImagem/>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="flex-end"
                        spacing={2}
                    >
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Voltar
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Atualizar
                        <Send className={classes.rightIcon} />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
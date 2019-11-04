import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Send from '@material-ui/icons/Send';
import React, { useState } from 'react';
import { useForm } from "../customHooks/useForm";
import { chamado } from '../models/chamado';
import ListaImagem from "../components/listaImagem";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
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

}));

export default function ChamadoForm(props) {
    const classes = useStyles();
    const { errors, values, handleChange, handleSubmit } = useForm(callbackSubmit, chamado);
    const [aviso] = useState(props.aviso);

    function callbackSubmit() {
        console.log(values);
    }

    return (
        <Paper className={classes.root}>
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
                            <InputLabel htmlFor="Informant">Informante</InputLabel>
                            <Input
                                readOnly
                                id="Informant"
                                value={values.informante = aviso.usuario.nome}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="tipo">Tipo</InputLabel>
                            <Input
                                readOnly
                                id="tipo"
                                value={values.tipo = aviso.tipo}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                                value={values.status}
                                onChange={handleChange}
                                inputprops={{
                                    name: 'status',
                                    id: 'status',
                                }}
                            >
                                <MenuItem value='Pendente'>Pendente</MenuItem>
                                <MenuItem value='Vistoriado'>Vistoriado</MenuItem>
                            </Select>
                            <FormHelperText className={classes.erro}>
                                {errors.status}
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="dataRequisicao" shrink>Data de Requisição</InputLabel>
                            <Input
                                readOnly
                                id="dataRequisicao"
                                type="datetime-local"
                                value={values.logradouro}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="numeroDiscriminacao">Número da discriminação</InputLabel>
                            <Input
                                id="numeroDiscriminacao"
                                value={values.numeroDiscriminacao}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.numeroDiscriminacao}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="numeroOficioEncaminhado">Número do Oficio Encaminhado</InputLabel>
                            <Input
                                id="numeroOficioEncaminhado"
                                value={values.numeroOficioEncaminhado}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.numeroOficioEncaminhado}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="orgaoDestinoOficio">Orgão de Destino do Oficio</InputLabel>
                            <Input
                                id="orgaoDestinoOficio"
                                value={values.orgaoDestinoOficio}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.orgaoDestinoOficio}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="dataVistoria" shrink>Data da Visita</InputLabel>
                            <Input
                                id="dataVistoria"
                                type="date"
                                value={values.dataVistoria}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.dataVistoria}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="equipeVistoria">Vistoriador</InputLabel>
                            <Input
                                id="equipeVistoria"
                                value={values.equipeVistoria}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.equipeVistoria}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="dataMonitoramento" shrink>Data para Monitoramento</InputLabel>
                            <Input
                                id="dataMonitoramento"
                                type="date"
                                value={values.dataMonitoramento}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.dataMonitoramento}</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="morador">Morador</InputLabel>
                            <Input
                                id="morador"
                                value={values.morador}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.morador}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="telefoneContato" shrink>Telefone para Contato</InputLabel>
                            <Input
                                id="telefoneContato"
                                value={values.telefoneContato}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.telefoneContato}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="pessoasEnvolvidas">Pessoas Envolvidas</InputLabel>
                            <Input
                                id="pessoasEnvolvidas"
                                type="number"
                                value={values.pessoasEnvolvidas}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.pessoasEnvolvidas}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="vitimaParcial">Vitima Parcial</InputLabel>
                            <Input
                                id="vitimaParcial"
                                type="number"
                                value={values.vitimaParcial}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.vitimaParcial}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="vitimaFatal">Vitima Fatal</InputLabel>
                            <Input
                                readOnly
                                id="vitimaFatal"
                                type="number"
                                value={values.vitimaFatal}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.vitimaFatal}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="interdicao">Interdição</InputLabel>
                            <Select
                                value={values.interdicao}
                                onChange={handleChange}
                                inputprops={{
                                    name: 'interdicao',
                                    id: 'interdicao',
                                }}
                            >
                                <MenuItem value='Sim'>Sim</MenuItem>
                                <MenuItem value='Parcial'>Parcial</MenuItem>
                                <MenuItem value='Não'>Não</MenuItem>
                            </Select>
                            <FormHelperText className={classes.erro}>{errors.interdicao}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="doacao">Doação</InputLabel>
                            <Input
                                id="doacao"
                                type="number"
                                value={values.doacao}
                                onChange={handleChange}
                            />
                            <FormHelperText className={classes.erro}>{errors.doacao}</FormHelperText>
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
                            <InputLabel htmlFor="bairro" shrink>Bairro</InputLabel>
                            <Input
                                id="bairro"
                                value={values.bairro = aviso.bairro}
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
                            <InputLabel htmlFor="descricao" shrink>Descrição</InputLabel>
                            <TextareaAutosize
                                className={classes.textarea}
                                value={values.descricao}
                                onChange={handleChange}
                                rowsMax={4}
                                aria-label="maximum height"
                                inputprops={{
                                    name: 'descricao',
                                    id: 'descricao',
                                }}

                            />
                            <FormHelperText className={classes.erro}>{errors.descricao}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="retornoVistoria" shrink>Retorno da Vistoria</InputLabel>
                            <TextareaAutosize
                                className={classes.textarea}
                                value={values.retornoVistoria}
                                onChange={handleChange}
                                rowsMax={4}
                                aria-label="maximum height"
                                inputprops={{
                                    name: 'retornoVistoria',
                                    id: 'retornoVistoria',
                                }}

                            />
                            <FormHelperText className={classes.erro}>{errors.retornoVistoria}</FormHelperText>
                        </FormControl>
                        <ListaImagem />
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
        </Paper>
    )
}

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';
import React from 'react';
import { useForm } from "../customHooks/useForm";
import { CEPMask, CPFMask, TelefoneMask } from "../masks";
import { VerificaCEP } from "../validation";

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
    rightIcon: {
        marginLeft: theme.spacing(1),
    },

}));

export default function CadastroForm() {
    const classes = useStyles();
    const { values, errors, handleChange, handleSubmit } = useForm(submit);

    function submit() {
        console.log(values);
    }

    return (

        <form onSubmit={handleSubmit}>
            {/* TODO: Remover Grids duplos */}
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
                        <InputLabel htmlFor="nome">Nome Completo</InputLabel>
                        <Input
                            name="nome"
                            value={values.nome}
                            onChange={handleChange}
                        />
                        {
                            errors.nome &&
                            <FormHelperText id="nome-error">{errors.nome}</FormHelperText>
                        }
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="email">E-Mail</InputLabel>
                        <Input
                            disabled
                            type="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}

                        />
                        {
                            errors.email &&
                            <FormHelperText className="email-error">O tamanho mínimo é 8 caracteres, Este campo não aceita números</FormHelperText>
                        }
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="cpf" shrink>CPF</InputLabel>
                        <Input
                            value={values.cpf}
                            onChange={handleChange}
                            id="cpf"
                            inputComponent={CPFMask}
                        />
                        {/* <FormHelperText id="cpf-error"></FormHelperText> */}
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="userType" >Tipo</InputLabel>
                        <Select
                            value={values.user}
                            onChange={handleChange}
                            inputProps={{
                                name: 'user',
                                id: 'userType',
                            }}
                        >
                            <MenuItem value="Atendente" defaultValue>Atendente</MenuItem>
                            <MenuItem value='Gerente'>Gerente</MenuItem>
                            <MenuItem value='Vistoriador'>Vistoriador</MenuItem>
                        </Select>
                        {/* <FormHelperText id="type-error">o telefone deve conter </FormHelperText> */}
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="telefone" shrink>Telefone</InputLabel>
                        <Input
                            value={values.telefone}
                            onChange={handleChange}
                            id="telefone"
                            inputComponent={TelefoneMask}
                            aria-describedby="telefone-error"
                        />
                        {/* <FormHelperText id="telefone-error">o telefone deve conter </FormHelperText> */}
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="dataNasc" shrink>Data de Nascimento</InputLabel>
                        <Input
                            value={values.dataNasc}
                            onChange={handleChange}
                            id="dataNasc"
                            type="date"
                            aria-describedby="dataNasc-error"
                        />
                        {/* <FormHelperText id="dataNasc-error">Insira sua data de nascimento</FormHelperText> */}
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="cep" shrink>CEP</InputLabel>
                        <Input
                            value={values.cep}
                            onChange={handleChange, VerificaCEP}
                            id="cep"
                            inputComponent={CEPMask}
                            aria-describedby="cep-error"
                        />
                        <FormHelperText id="cep-error" className={classes.erro}></FormHelperText>
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="logradouro" shrink>Logradouro</InputLabel>
                        <Input
                            readOnly
                            id="logradouro"
                            value={values.logradouro}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="numero">Número</InputLabel>
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
                        <InputLabel htmlFor="bairro" shrink>Bairro</InputLabel>
                        <Input
                            readOnly
                            id="bairro"
                            value={values.bairro}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="cidade" shrink>Cidade</InputLabel>
                        <Input
                            readOnly
                            id="cidade"
                            value={values.cidade}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="estado" shrink>Estado</InputLabel>
                        <Input
                            readOnly
                            id="estado"
                            value={values.estado}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="flex-end"
                        spacing={2}
                    >
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button}
                            type="submit">
                            Enviar
                        <Send className={classes.rightIcon} />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
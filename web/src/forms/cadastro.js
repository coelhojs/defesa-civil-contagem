import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';
import React from 'react';
import { CEPMask, CPFMask, TelefoneMask } from "../masks";
import { VerificaCEP } from "../validation";

const useStyles = makeStyles(theme => ({
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
    const [values, setValues] = React.useState({
        multiline: 'Controlled',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    function handleChangeSelect(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };


    return (
        <form>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="nome">Nome Completo</InputLabel>
                <Input
                    id="nome"
                    value={values.nome}
                    onChange={handleChange}
                />
                <FormHelperText id="nome-error">
                    Error?
                                </FormHelperText>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="email">E-Mail</InputLabel>
                <Input
                    id="email"
                    value={values.email}
                    defaultValue="ccoelho.me@gmail.com"
                    onChange={handleChange}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <FormHelperText id="e-mail-error">o telefone deve conter </FormHelperText>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="cpf" shrink>CPF</InputLabel>
                <Input
                    value={values.cpf}
                    onChange={handleChange}
                    id="cpf"
                    inputComponent={CPFMask}
                />
                <FormHelperText id="cpf-error">o telefone deve conter </FormHelperText>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="type" shrink>Tipo</InputLabel>
                <Select
                    value={values.type}
                    onChange={handleChangeSelect}
                    inputProps={{
                        name: 'type',
                        id: 'type',
                    }}
                    aria-describedby="type-error"
                >
                    <MenuItem value='Atendente'>Atendente</MenuItem>
                    <MenuItem value='Gerente'>Gerente</MenuItem>
                    <MenuItem value='Vistoriador'>Vistoriador</MenuItem>
                </Select>
                <FormHelperText id="type-error">o telefone deve conter </FormHelperText>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="telefone" shrink>Telefone</InputLabel>
                <Input
                    value={values.telefone}
                    onChange={handleChange('telefone')}
                    id="telefone"
                    inputComponent={TelefoneMask}
                    aria-describedby="telefone-error"
                />
                <FormHelperText id="telefone-error">o telefone deve conter </FormHelperText>
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
                <FormHelperText id="dataNasc-error">Insira sua data de nascimento</FormHelperText>
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
                    disabled
                    id="logradouro"
                    value={values.logradouro}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="numero">Número</InputLabel>
                <Input
                    id="numero"
                    type="number"
                    value={values.numero}
                    onChange={handleChange}
                    aria-describedby="numero-error"
                />
                <FormHelperText id="numero-error"></FormHelperText>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="complemento">Complemento</InputLabel>
                <Input
                    id="complemento"
                    value={values.complemento}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="bairro" shrink>Bairro</InputLabel>
                <Input
                    disabled
                    id="bairro"
                    value={values.bairro}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="cidade" shrink>Cidade</InputLabel>
                <Input
                    disabled
                    id="cidade"
                    value={values.cidade}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="estado" shrink>Estado</InputLabel>
                <Input
                    disabled
                    id="estado"
                    value={values.estado}
                    onChange={handleChange}
                />
            </FormControl>

            <Button variant="contained" color="secondary" className={classes.button}>
                Cancelar
                    </Button>
            <Button variant="contained" color="primary" className={classes.button}>
                Enviar
                        <Send className={classes.rightIcon} />
            </Button>

        </form>
    )
}
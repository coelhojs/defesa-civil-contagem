
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));

function CPFMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

CPFMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function TelephoneMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TelephoneMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

export default function PersonalData() {
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
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item md={12} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="standard-name">Nome Completo</InputLabel>
                            <Input
                                id="standard-name"
                                value={values.name}
                                onChange={handleChange}
                                aria-describedby="standard-error"
                            />
                        </FormControl>
                        <FormHelperText id="standard-name-error">o telefone deve conter </FormHelperText>
                    </Grid>

                    <Grid item md={12}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="e-mail">E-Mail</InputLabel>
                            <Input
                                id="e-mail"
                                value={values.email}
                                onChange={handleChange}
                                aria-describedby="e-mail-error"
                            />
                        </FormControl>
                        <FormHelperText id="e-mail-error">o telefone deve conter </FormHelperText>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="cpf" shrink="true">CPF</InputLabel>
                            <Input
                                value={values.cpf}
                                onChange={handleChange}
                                id="cpf"
                                inputComponent={CPFMaskCustom}
                                aria-describedby="cpf-error"
                            />
                        </FormControl>
                        <FormHelperText id="cpf-error">o telefone deve conter </FormHelperText>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="type" shrink="true">Tipo</InputLabel>
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
                        </FormControl>
                        <FormHelperText id="type-error">o telefone deve conter </FormHelperText>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="telephone" shrink="true">Telefone</InputLabel>
                            <Input
                                value={values.telephone}
                                onChange={handleChange('telephone')}
                                id="telephone"
                                inputComponent={TelephoneMaskCustom}
                                aria-describedby="telephone-error"
                            />
                        </FormControl>
                        <FormHelperText id="telephone-error">o telefone deve conter </FormHelperText>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="birthday" shrink="true">Data de Nascimento</InputLabel>
                            <Input
                                value={values.birthday}
                                onChange={handleChange}
                                id="birthday"
                                type="date"
                                aria-describedby="birthday-error"
                            />
                        </FormControl>
                        <FormHelperText id="birthday-error">Insira sua data de nascimento</FormHelperText>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    );
}
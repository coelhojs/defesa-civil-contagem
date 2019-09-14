
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
        // width: 200,
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
        telephone: '31',
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
                >
                    <Typography className={classes.title} variant="h6" noWrap>
                        Dados Pessoais
                    </Typography>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="standard-name">Nome Completo</InputLabel>
                        <Input id="standard-name" value={values.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="e-mail">E-Mail</InputLabel>
                        <Input id="e-mail" value={values.email} onChange={handleChange} />
                    </FormControl>

                    <Grid item xs={12} md={5}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="cpf">CPF</InputLabel>
                            <Input
                                value={values.cpf}
                                onChange={handleChange}
                                id="cpf"
                                inputComponent={CPFMaskCustom}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={5}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="type">Tipo</InputLabel>
                                <Select
                                    value={values.type}
                                    onChange={handleChangeSelect}
                                    inputProps={{
                                        name: 'type',
                                        id: 'type',
                                    }}
                                >
                                    <MenuItem value='Atendente'>Atendente</MenuItem>
                                    <MenuItem value='Gerente'>Gerente</MenuItem>
                                    <MenuItem value='Vistoriador'>Vistoriador</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    <Grid item xs={12} md={5}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="telephone">Telefone</InputLabel>
                            <Input
                                value={values.telephone}
                                onChange={handleChange('telephone')}
                                id="telephone"
                                inputComponent={TelephoneMaskCustom}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="birthday">Data de Nascimento</InputLabel>
                            <Input
                                value={values.birthday}
                                onChange={handleChange}
                                id="birthday"
                                type="date"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    );
}
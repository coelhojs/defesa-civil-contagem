import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

function CEPMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

CEPMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

const citeList = [
    'Belo Horizonte',
    'Contagem',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

export default function ResidentialData() {
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
                    <Grid item md={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="cep" shrink="true">CEP</InputLabel>
                            <Input
                                value={values.cep}
                                onChange={handleChange}
                                id="cep"
                                inputComponent={CEPMaskCustom}
                                aria-describedby="cep-error"
                            />
                        </FormControl>
                        <FormHelperText id="cep-error">o telefone deve conter </FormHelperText>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="street">Rua</InputLabel>
                            <Input
                                id="street"
                                value={values.street}
                                onChange={handleChange}
                                aria-describedby="street-error"
                            />
                        </FormControl>
                        <FormHelperText id="street-error">o telefone deve conter </FormHelperText>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="number">Número</InputLabel>
                                <Input
                                    id="number"
                                    type="number"
                                    value={values.number}
                                    onChange={handleChange}
                                    aria-describedby="number-error"
                                />
                            </FormControl>
                            <FormHelperText id="number-error">o telefone deve conter </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="complement">Complemento</InputLabel>
                                <Input
                                    id="complement"
                                    value={values.complement}
                                    onChange={handleChange}
                                    aria-describedby="complement-error"
                                />
                            </FormControl>
                            <FormHelperText id="complement-error">o telefone deve conter </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="cite">Cidade</InputLabel>
                                <Select
                                    value={values.cite}
                                    onChange={handleChangeSelect}
                                    inputProps={{
                                        name: 'cite',
                                        id: 'cite',
                                    }}
                                    aria-describedby="cite-error"
                                >
                                    {citeList.map((text) => (
                                        <MenuItem value={text}>{text}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormHelperText id="cite-error">o telefone deve conter </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="neighborhood">Bairro</InputLabel>
                                <Input
                                    id="neighborhood"
                                    value={values.neighborhood}
                                    onChange={handleChange}
                                    aria-describedby="neighborhood-error"
                                />
                            </FormControl>
                            <FormHelperText id="neighborhood-error">o telefone deve conter </FormHelperText>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
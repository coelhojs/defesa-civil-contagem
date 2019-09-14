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

import cep from 'cep-promise'
import { red } from '@material-ui/core/colors';

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

    erro:{
        color: '#ff0000',
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
            mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
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
    };

    function VerificaCEP(event) {
        let cepValue = event.target.value.replace(/\D/g, '');

        if (cepValue.length == 8) {
            const https = require('https');

            https.get('https://viacep.com.br/ws/' + cepValue + '/json/', (resp) => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    console.log(JSON.parse(data));
                    data = JSON.parse(data);

                    if(Object.keys(data).length > 1){
                        document.getElementById("street").value = data.logradouro;
                        document.getElementById("neighborhood").value = data.bairro;
                        document.getElementById("cite").value = data.localidade;
                        document.getElementById("region").value = data.uf;
                        document.getElementById("cep-error").innerHTML = "";
                    }
                    else{
                        document.getElementById("street").value = "";
                        document.getElementById("neighborhood").value = "";
                        document.getElementById("cite").value = "";
                        document.getElementById("region").value = "";
                        document.getElementById("cep-error").innerHTML = "CEP invalido";

                    }
                        

                    
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }
    };

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
                            <InputLabel htmlFor="cep" shrink>CEP</InputLabel>
                            <Input
                                value={values.cep}
                                onChange={handleChange}
                                onChange={VerificaCEP}
                                id="cep"
                                inputComponent={CEPMaskCustom}
                                aria-describedby="cep-error"
                            />
                        </FormControl>
                        <FormHelperText id="cep-error" className={classes.erro}></FormHelperText>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="street" shrink>Logradouro</InputLabel>
                            <Input
                                disabled
                                id="street"
                                value={values.street}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
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
                        <FormHelperText id="number-error"></FormHelperText>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="complement">Complemento</InputLabel>
                            <Input
                                id="complement"
                                value={values.complement}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="neighborhood" shrink>Bairro</InputLabel>
                            <Input
                                disabled
                                id="neighborhood"
                                value={values.neighborhood}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="cite" shrink>Cidade</InputLabel>
                            <Input
                                disabled
                                id="cite"
                                value={values.cite}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="region" shrink>Estado</InputLabel>
                            <Input
                                disabled
                                id="region"
                                value={values.region}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
}
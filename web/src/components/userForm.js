import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 800,
    },
    dense: {
        marginTop: 50,
    },
    menu: {
        width: 200,
    },
}));


export default function UserForm() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        multiline: 'Controlled',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={12}
                 container
                 direction="column"
                 justify="center"
                 alignItems="center"
                >
                    <h1>Cadastro de usuário</h1>
                    <form className={classes.container} noValidate autoComplete="off">
                        <Grid item md={10}>
                            <TextField
                                fullWidth
                                id="standard-name"
                                label="Nome completo"
                                className={classes.textField}
                                value={values.name}
                                onChange={handleChange('name')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item  md={10}>
                            <TextField
                                fullWidth
                                id="e-mail"
                                label="E-Mail"
                                className={classes.textField}
                                value={values.email}
                                onChange={handleChange('email')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item md={10}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                Enviar
                                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                                <Icon className={classes.rightIcon}>send</Icon>
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}
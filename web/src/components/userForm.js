import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';

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
                <Grid item md={12}>
                    <h2>Cadastro de usuário</h2>
                    <form className={classes.container} noValidate autoComplete="off">
                        <Grid item md={8}>
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
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}
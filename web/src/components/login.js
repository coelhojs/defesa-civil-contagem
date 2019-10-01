import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import "firebase/auth";
import React from 'react';
import { useAuth } from "../customHooks/useAuth";
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    card: {
        margin: 'auto',
        maxWidth: 345,
        minWidth: 275,

    },
}));

const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText("#f46524"),
      backgroundColor: "#f46524",
      color: "white",
      '&:hover': {
        backgroundColor: "#a54318",
      },
    },
  }))(Button);

  const ColorTextField = withStyles(theme => ({
    root: {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#f46524',
          },
        },
      },
    }))(TextField);

export default function Login(props) {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <Card className={classes.card}>
            <CardContent>
                <CardMedia
                    component="img"
                    alt="Defesa Civil de Contagem - MG"
                    height="140"
                    image="../Imagens/escudo.jpg"
                    title="Defesa Civil de Contagem - MG"
                />
                {/*<Typography variant="h5" component="h2">
                    Gestão de chamados
                    </Typography>
                <br />
                <Typography variant="h5" component="h2">
                    Login
                </Typography>*/}
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <ColorTextField
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                    />

                    <ColorTextField
                        label="Senha"
                        className={classes.textField}
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    /> 
                    <Grid item>
                    <ColorButton variant="contained" color="#4CAF50" className={classes.button} onClick={() => { auth.login() }}>
                        Entrar
                    </ColorButton>
                    </Grid>
                    {/*<button className={classes.button} onClick={() => { auth.login() }} >
                        Entrar
    </button>*/}
                </Grid>
            </CardContent>
            <CardActions>
                {/* <Link to={"/Dashboard"} variant="contained"
                    color="primary" className={classes.button}>
                    Dashboard
                    </Link > */}
            </CardActions>
        </Card>
    );
};
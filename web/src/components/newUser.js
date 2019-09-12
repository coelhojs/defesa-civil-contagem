import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
      },
      leftIcon: {
        marginRight: theme.spacing(1),
      },
      rightIcon: {
        marginLeft: theme.spacing(1),
      },
      iconSmall: {
        fontSize: 20,
      },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

export default function NewUser() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [values, setValues] = React.useState({
        name: '',
        multiline: 'Controlled',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [state, setState] = React.useState({
        type: '',
        name: 'hai',
    });

    return (
        <div>
            <Button variant="contained" className={classes.button} onClick={handleOpen}>
                Novo
            </Button>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h1>Novo Usuário</h1>
                        <form className={classes.container} noValidate autoComplete="off">
                            
                            <Grid item>
                                <FormControl required className={classes.formControl}>
                                    <TextField
                                        fullWidth
                                        id="code"
                                        label="Codigo"
                                        className={classes.textField}
                                        value={values.email}
                                        onChange={handleChange('code')}
                                        margin="normal"
                                    /><FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl required className={classes.formControl}>
                                    <TextField
                                        fullWidth
                                        id="standard-name"
                                        label="Nome completo"
                                        className={classes.textField}
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        margin="normal"
                                    /><FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel htmlFor="type-native-required">Tipo</InputLabel>
                                    <Select
                                        native
                                        value={state.age}
                                        onChange={handleChange('type')}
                                        name="type"
                                        inputProps={{
                                            id: 'type-native-required',
                                        }}
                                    >
                                        <option value="" />
                                        <option value={10}>Gestor</option>
                                        <option value={20}>Atendente</option>
                                        <option value={30}>Vistoriador</option>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={handleClose} className={classes.button}>
                                    Cancelar
                                </Button>
                                <Button variant="contained" color="primary" className={classes.button}>
                                    Enviar
                                    <Send className={classes.rightIcon}/>
                                </Button>

                            </Grid>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
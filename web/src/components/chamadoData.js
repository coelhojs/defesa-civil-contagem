import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import { Chamados } from "./web/db";

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { NONE } from 'apisauce';


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        minHeight: 140,
    },
    textarea:{
        
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

export default function ChamadoData() {
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
        <Card >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://s2.glbimg.com/ruC1KAoB1uN6AxezO2x5yMAwGeU=/0x0:5184x3456/1600x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/C/B/axBnMXRlexSBGlAtaKwg/oft20190217011.jpg"
                    title="Contemplative Reptile"
                />
            </CardActionArea>
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item md={6} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="Informant">Informante</InputLabel>
                            <Input
                                disabled
                                defaultValue="Jão das Coves"
                                id="Informant"
                                value={values.Informant}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={6} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="Inspector">Vistoriador</InputLabel>
                            <Input
                                id="Inspector"
                                value={values.Inspector}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
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
                                <MenuItem value='Deslizamento'>Deslizamento</MenuItem>
                                <MenuItem value='Rachadura'>Rachadura</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="status">Estatus</InputLabel>
                            <Select
                                value={values.status}
                                onChange={handleChangeSelect}
                                inputProps={{
                                    name: 'status',
                                    id: 'status',
                                }}
                            >
                                <MenuItem value='Pendente'>Pendente</MenuItem>
                                <MenuItem value='Vistoriado'>Vistoriado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="date" shrink="true">Data e Hora</InputLabel>
                            <Input
                                disabled
                                id="date"
                                defaultValue="2017-05-24T10:30"
                                type="datetime-local"
                                value={values.street}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={12} >
                        <InputLabel htmlFor="description">Descrição</InputLabel>
                        <TextareaAutosize
                            fullWidth
                            className={classes.textarea}
                            value={values.description}
                            onChange={handleChange}
                            inputProps={{
                                name: 'description',
                                id: 'description',
                            }}
                            
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
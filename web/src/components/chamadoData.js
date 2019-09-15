import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import React from 'react';


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
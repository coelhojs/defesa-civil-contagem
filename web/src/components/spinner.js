import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import GridLoader from "react-spinners/GridLoader";

const useStyles = makeStyles({
    margin: {
        margin: 'auto',
        marginTop: '15rem',
        marginLeft: '50%'
    }
});

export default function Spinner() {
    const classes = useStyles();
    return (
        <div className={classes.margin}>
            <GridLoader
                color={'#FF8500'}
            />
        </div>
    )
}
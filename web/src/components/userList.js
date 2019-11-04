import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FaceIcon from '@material-ui/icons/Face';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import NewUser from './newUser';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 100,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

function createData(name, code) {
    return { name, code };
}

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 356),
    createData('yoghurt', 659),
    createData('Ice cream sandwich', 257),
    createData('Ice cream sandwich', 2527),
    createData('Eclair', 2123),
    createData('Cupcake', 3665),
    createData('Gingerbread', 6246),
    createData('Eclair Frozen ', 212),
    createData('Cupcake', 365),
    createData('Gingerbread', 646),
    createData('Yoghurt', 169),
    createData('Ice cream sandwich', 2377),
    createData('Eclair', 23462),
    createData('Cupcake', 3035),
    createData('Gingerbread', 3565),
    createData('Frozen yoghurt', 6539),
];


export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Usuários
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Buscar…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <NewUser></NewUser>
                    </div>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Table stickyHeader>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                            <TableRow hover key={row.code}>
                                <List className={classes.root}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FaceIcon />
                                        </ListItemIcon>
                                        <ListItemText id={"switch-list-label-"+row.code} primary={row.name} />
                                        <ListItemSecondaryAction>
                                            <Fab size="small" color="success" aria-label="lock" className={classes.margin}>
                                                <LockIcon />
                                                <LockOpenIcon />
                                            </Fab>
                                            <Fab size="small" color="primary" aria-label="assignment" className={classes.margin}>
                                                <AssignmentIcon />
                                            </Fab>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
                <TablePagination
                    rowsPerPageOptions={[5/*, 10, 15, 20*/]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </main>
            
        </div>
    );
}
import { fade, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const classes = makeStyles(theme => ({
    appBar: { zIndex: theme.zIndex.drawer + 1, marginBottom: '5px' },
    bullet: { display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)', },
    button: { margin: theme.spacing(1), },
    card: { maxWidth: 345, minWidth: 275, },
    container: { display: 'flex', flexWrap: 'wrap', },
    content: { flexGrow: 1, padding: theme.spacing(3), },
    dense: { marginTop: 19, },
    drawer: { zIndex: -1, width: drawerWidth, flexShrink: 0, },
    drawerPaper: { width: drawerWidth, },
    erro: { color: '#ff0000', },
    inputInput: { padding: theme.spacing(1, 1, 1, 7), transition: theme.transitions.create('width'), width: '100%', [theme.breakpoints.up('sm')]: { width: 120, '&:focus': { width: 200, }, }, },
    inputRoot: { color: 'inherit', },
    media: { minHeight: 140, },
    menu: { width: 200, },
    menuButton: { marginRight: theme.spacing(2), },
    pos: { marginBottom: 12, },
    rightIcon: { marginLeft: theme.spacing(1), },
    root: { flexGrow: 1, display: 'flex' },
    search: { position: 'relative', borderRadius: theme.shape.borderRadius, backgroundColor: fade(theme.palette.common.white, 0.15), '&:hover': { backgroundColor: fade(theme.palette.common.white, 0.25), }, marginLeft: 0, width: '100%', [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(1), width: 'auto', }, },
    searchIcon: { width: theme.spacing(7), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', },
    textField: { marginLeft: theme.spacing(1), marginRight: theme.spacing(1), },
    title: { fontSize: 14, flexGrow: 1, display: 'none', [theme.breakpoints.up('sm')]: { display: 'block', }, },
    toolbar: theme.mixins.toolbar,
})
)
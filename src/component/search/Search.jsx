import React from 'react'
import { InputBase, fade, makeStyles, Toolbar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(1),
            width: '100%',
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
        color: 'white',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
            '&:focus': {
                width: '100%',
            },
        },
    },
}));
export default function Search(props) {
    const classes = useStyles();

    return (
        <>
            {/* <AppBar position="static" className="bg-primary"> */}
                <Toolbar className="bg-primary">
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon style={{color:'white'}} />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onKeyUp={(e) => { props.inputSearch(e.target.value) }}
                            
                        />
                    </div>
                </Toolbar>
            {/* </AppBar> */}
        </>
    )
}

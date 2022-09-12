import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import onClickFormUp from './SVG/onclickup.svg';
import onHoverFormUp from './SVG/hoverup.svg';
import restFormUp from './SVG/restup.svg';
import onClickFormDown from './SVG/onclickdown.svg';
import onHoverFormDown from './SVG/hoverdown.svg';
import restFormDown from './SVG/restdown.svg';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Box } from "@material-ui/core";
import { Container } from "@mui/material";

const useStyles = makeStyles(theme => ({
    up: {
        height: '27px',
        width: '65px',
        backgroundImage: `url(${restFormUp})`,
        "&:hover": {
            backgroundImage: `url(${onHoverFormUp})`,
        },
        "&:active": {
            backgroundImage: `url(${onClickFormUp})`,
        }
    },
    down: {
        height: '27px',
        width: '65px',
        backgroundImage: `url(${restFormDown})`,
        "&:hover": {
            backgroundImage: `url(${onHoverFormDown})`,

        },
        "&:active": {
            backgroundImage: `url(${onClickFormDown})`,
        }
    }
}));

const FeedBackForm = (props) => {
    const [feedBackDone, setFeedBackDone] = useState(false);
    const classes = useStyles();
    if (!feedBackDone) { 
        return (
            <Box style={{
                display: 'flex', flexDirection: 'row', paddingLeft: '30px', paddingBottom: '20px'
            }}>
                <div style={{fontWeight: 'bold', paddingRight: '10px'}}>Was this page helpful?</div>
                <Paper elevation={0} className={classes.up}
                    onClick={() => {
                        setFeedBackDone(true)
                    }}
                />
                <div style ={{width: '10px'}}></div>
                <Paper elevation={0} className={classes.down}
                    onClick={() => {
                        setFeedBackDone(true)
                    }}
                />
            </Box>
        );
    }
    else {
        return (
            <>
                <div style={{ color: '#1B5DBF', fontWeight: 'bold', paddingLeft: '30px', paddingBottom: '20px'}}>Thank you for your feedback!</div>
            </>
        );
    }

};

export default FeedBackForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { render } from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Horizontal from './SVG/horizontal.svg';
import HorizontalHover from './SVG/horizontalhover.svg';
import { Container, Paper } from "@material-ui/core";
import FeedBackForm from './form';
import Box from '@mui/material/Box';
import sampleContent from './sampleContent.js';
import Card from '@mui/material/Card';

let paddingLR = '6px';
let paddingT = '30px';
let paddingAccor = '30px';

const UserManual = (props) => {
  const [pageData, setPageData] = useState(sampleContent);
  const [toDisplay, setToDisplay] = useState([0, 1]);

  const useStyles = makeStyles(theme => ({
    content:{
        marginTop: ".2vw",
        height: "2.5vw",
        backgroundColor: '#F45B29',
        color: 'white',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: '15px',
    },
    text:{

    },
    accordionHeader:{
      paddingLeft: '10px' 
    },
    root: {
      width: "100%"
    },
    accordion: {
      outline: 'none',
      "&:before": {
        display: 'none'
      },
    },
    outer: {
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
      },
      flexDirection: 'row-reverse',
      "&:hover": {
        "& $addIcon": {
          backgroundImage: `url(${HorizontalHover})`,
        }
      },
      '&.MuiAccordionSummary-content':{
          margin: '0px'        
      },

    },
    detailRoot: {
      display: "table-row", 
    },
    addIcon: {
      height: '20px',
      width: '20px',
      backgroundImage: `url(${Horizontal})`,
    },
    subHeader: {
      display: 'flex',
      flexDirection: 'row',
    },
    pageHeader: {
      fontWeight: "bold",
      paddingTop: `${paddingT}`,
      paddingLeft: `${paddingLR}`,
      paddingRight: `${paddingLR}`,
      fontSize: '25px'
    },
    pageSubheader: {
      fontWeight: "bold",
      paddingTop: `${paddingT}`,
      paddingLeft: `${paddingLR}`,
      paddingRight: `${paddingLR}`,
      fontSize: '20px'
    },
    pageBody: {
      paddingTop: `10px`,
      paddingLeft: `${paddingLR}`,
      paddingRight: `${paddingLR}`,
      fontSize: '15px'
    },
    form: {
      paddingLeft: `${paddingLR}`,
      paddingRight: `${paddingLR}`,
    },
    bulletList: {
      paddingTop: `10px`,
      paddingLeft: `21px`,
      paddingRight: `${paddingLR}`,
      fontSize: '15px'
    },
    image: {
      paddingTop: `${paddingT}`,
      paddingLeft: `${paddingLR}`,
      paddingRight: `${paddingLR}`,
    },
    imageList: {
      paddingTop: `${paddingT}`,
      paddingLeft: `${paddingLR}`,
      paddingRight: `${paddingLR}`,
    },
    subHeaderItemsUnbold: (props) => ({
      boxSizing: 'content',
      "&:hover": {
        color: '#F45B29'
      },
      marginLeft: '66px',
      marginBottom: '10px'

    }),
    subHeaderItemsBold: (props) => ({
      fontWeight: "bold",
      color: '#F45B29',
      marginLeft: '66px',
      marginBottom: '10px'
    }),
  }));
    
  const RenderBody = ({ identifier }) => {
    const classes = useStyles();
    return (
      <Container className={classes.pageBody}>{identifier}</Container>
    );
  }

  const RenderImageList = ({ identifier }) => {
    return (
      <Container style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '30px'}}>
        {identifier.map((curVal) => (
          <Card style = {{backgroundImage: `url(${curVal})`, height:  '200px', width: '200px', backgroundSize: 'cover', mariginLeft: '10px', marginRight: '10px'}}/>
        ))}
      </Container>
    );

  }

  const RenderBulletList = ({ identifier }) => {
    return (
      <ul className={classes.bulletList}>
        {identifier.map((curVal) => (
          <li key={curVal} style = {{marginBottom: '4px'}}>
            {curVal}
          </li>
        ))}
      </ul>
    );
  }

  const RenderNumberList = ({ identifier }) => {
    return (
      <ol className={classes.bulletList}>
        {identifier.map((curVal) => (
          <li key={curVal} style = {{marginBottom: '4px'}}>
          {curVal}
          </li>
        ))}
      </ol>
    );
  }

  const RenderHeading = ({ identifier }) => {
    const classes = useStyles();
    return (
      <Container className={classes.pageHeader}>{identifier}</Container>
    );
  }

  const RenderSubHeader = ({ identifier }) => {
    const classes = useStyles();
    return (
      <Container className={classes.pageSubheader}>{identifier}</Container>
    );
  }

  const CurPage = (props) => {
    let curVal = Object.values(pageData[toDisplay[0]].heading)
    let content = curVal[toDisplay[1]].content
    return (
      <>
        {Object.entries(content).map(([key, value]) => {
          if (key == "heading") {
            return <RenderHeading identifier={value} key={value} />;
          }
          else if (key.substring(0, 9) == "subheader") {
            return <RenderSubHeader identifier={value} key={value} />;
          }
          else if (key.substring(0, 9) == "imageList") {
            return <RenderImageList identifier={value} key={value} style ={{display: 'inline', flexDirection: 'row'}}/>;
          }
          else if (key.substring(0, 10) == "bulletList") {
            return <RenderBulletList identifier={value} key={value} />;
          }
          else if (key.substring(0, 4) == "body") {
            return <RenderBody identifier={value} key={value} />;
          }
          else if (key.substring(0, 10) == "numberList") {
            return <RenderNumberList identifier={value} key={value} />;
          }
        })
        }
      </>
    )
  }

  const RenderSubAccordions = ({ curHead, subheadings }) => {
    const classes = useStyles();
    return (
      <>
        {Object.keys(subheadings).map((subheader, counter) => (
          toDisplay[1] == counter && toDisplay[0] == curHead
            ? (<AccordionDetails classes={{ root: classes.detailRoot }}  key={subheader}>
              <div className={classes.subHeaderItemsBold}
                key={subheader}
                onClick={() => {
                  setToDisplay([curHead, counter]);
                }}>
                {subheadings[subheader].name}
              </div>
              <div style={{ display: 'flex' }}></div>
            </AccordionDetails>)
            : <AccordionDetails classes={{ root: classes.detailRoot }}  key={subheader}>

              <div className={classes.subHeaderItemsUnbold}
                key={subheader}
                onClick={() => {
                  setToDisplay([curHead, counter]);
                }}>
                {subheadings[subheader].name}
              </div>
              <div style={{ display: 'flex' }}></div>
            </AccordionDetails>
        ))}
      </>
    );
  }


  const RenderAccordion = ({ total, i }) => {
    const [expandedState, setExpanded] = React.useState(false);
    return (
      <>
        <Accordion
          className={classes.accordion}
          disableGutters
          elevation={0}
          key={i}
          expanded={expandedState}
          onChange={() => {
            setExpanded(!expandedState)
          }}
        >
          <AccordionSummary
            className={classes.outer}
            key={total.heading.name}
            expandIcon={<Paper elevation={0}
              className={classes.addIcon}
              
            />}>
            <div className = {classes.accordionHeader}>
              {total.heading.name}
            </div>
          </AccordionSummary>
          <RenderSubAccordions
            curHead={i}
            subheadings={total.heading} />
        </Accordion>
      </>
    )
  };

  const RenderAccordions = (props) => {
    const classes = useStyles();
    return (
      <>
        {pageData.map((total, i) => (
          <RenderAccordion total={total} i={i} />
        ))}
      </>
    );
  };

  const SideBar = (props) => {
    const classes = useStyles();
    return (
      <>
        {RenderAccordions()}
      </>
    );
  };
  // const getPageData = async () => {
  //   const response = await axios.get(
  //     "https://www.balldontlie.io/api/v1/teams/"
  //   ); // insert mine here

  //   // setPageData(response.data.data);
  //   setPageData(["Hello", true], ["P2", false])
  //   setFormatData({"Heading": "one", "subheading": ["Two", "three", "four"]})
  // };

  // const pageFormatData = () => {
  //   // map it properly
  // }

  // useEffect(() => {
  //   getPageData();
  // }, []);
  const classes = useStyles();
  return (
    <Container
      disableGutters maxWidth={'xl'}
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          bgcolor: 'white',
          width: '15vw',
        }}>
        <SideBar />
      </div>
      <div style = {{
          borderColor: 'black',
          borderRight: '1px solid',
          width: '15px'
        }}></div>
      <div style={{
        display: "flex",
        flexDirection: "column",
      }}>
        <Container style={{ minHeight: 'calc(92vh - 130px)', marginBottom: '30px'}}>
          <CurPage className={classes.form} />
        </Container>
        <FeedBackForm/>
      </div>
    </Container>
  );
}


// class userManual extends Component {
//     getPages = async () => {
//         let pages = await axios.get(
//           "/user-manual"
//         );
//     }
//     return(
//         {pages.map((items) => {
//             {items}.
//         })}
//     )
//     // use a map to initalize all states to false
// }


// renderPage(link){
//     axios.get('/user-manual/' + link)
//         .then() // fix riya
//     getPage = async () => {
//         let page = await axios.get('/user-manual' + link);
//     }
// } 

export default UserManual;
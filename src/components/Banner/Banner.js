import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import Carousel from './Carousel';


const useStyles = makeStyles(()=>({
    banner:{
        background: "black" ,
    },
    bannerContent: {
        height:400,
        display: "flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
    },
    tagline: {
        height:'40%',
        display: "flex",
        flexDirection:"column",
        textAlign:'center',
        justifyContent:"center",
    },
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
}))
const Banner = () => {

  const classes = useStyles();
  return (
    <div className={classes.banner} >
        <Container className={classes.bannerContent} >
           <div className={classes.tagline} >
             <Typography
              variant='h2'
              style={{
                flexWeight:"bold",
                marginBottom: 15,
                fontFamily:"Montserrat",
                color:"white"
              }}
             
             >
              Crypto Hunt
             </Typography>
             <Typography
              variant='subtitle2'
              style={{
                color:"darkgrey",
                textTransform:"capitalize",
                fontFamily:"Montserrat",
              }}
             
             >
              Get all the Info regarding your favourite Crypto Currency
             </Typography>

           </div>
           <Carousel />
        </Container>
    </div>
  )
}

export default Banner
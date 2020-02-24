import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../components/Scream';
import Profile from '../components/Profile';


class home extends Component {
    state ={
        screams: null
    }
    componentDidMount(){
        axios.get('/screams').then((res)=>{
            console.log(res.data);
            this.setState({screams: res.data})
        }).catch ((err)=>{
            console.error(err);
        })
    }

    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map((scream)=>{
                return(<Scream scream={scream} key={scream.screamId} />);
            })
        ) : <p>loading Screams...</p>

        return (
           <Grid container spacing ={10}>
               <Grid item sm={8} xs={12}>
                   <p>Latest Screams .. </p>
                   {recentScreamsMarkup}
               </Grid>
               <Grid item sm={4} xs={12}>
                   <p style={{textAlign:'center'}}> User's Profile </p>
                   <Profile />
               </Grid>
           </Grid>
        )
    }
}

export default home;

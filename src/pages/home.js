import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../components/Scream';


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
                   <h1>Latest Screams .. </h1>
                   {recentScreamsMarkup}
               </Grid>
               <Grid item sm={4} xs={12}>
                   <h1>profile</h1>
               </Grid>
           </Grid>
        )
    }
}

export default home;

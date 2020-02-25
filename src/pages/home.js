import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../components/Scream';
import Profile from '../components/Profile';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';


class home extends Component {
    
    componentDidMount(){
       this.props.getScreams();
    }

    render() {
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = !loading ? (
            screams.map((scream)=>{
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

home.propTypes = {
    getScreams : PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default  connect(mapStateToProps, { getScreams })(home);

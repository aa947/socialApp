import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/favicon.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';


const styles = {
    form: {
        textAlign: 'center',
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    image: {
        width: '80px',
        margin: '20px auto 20px auto'
    },
    button:{
        margin: '20px auto 10px auto',
        position: 'relative'
    },
    textField:{
        margin: '10px auto 0px auto'
    },
    customError:{
        color:'red',
        fontSize:'0.8rem',
        marginTop:'10px'
    },
    progress:{
        position: 'absolute'
    }

}



class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '', 
            errors:{}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      }
    
    handleSubmit = (event) => {
        event.preventDefault();

        let userData ={
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history);

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });

    }


    render() {
        const { classes,  UI: { loading   }} = this.props;
         const { errors } = this.state;
        return (
            <Grid container className={classes.form} spacing={10}>
                <Grid item sm />
                <Grid item sm >
                    <img src={AppIcon} alt="AppIcon" className={classes.image} />
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth helperText={errors.email} error={ errors.email? true: false } />

                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth helperText={errors.password } error={ errors.password ? true: false } />

                        { errors.general && (
                            <Typography variant="body2" className={classes.customError} >
                                {errors.general}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" className={classes.button} color="primary" disabled={loading} > Log In  { loading && (<CircularProgress color="secondary" size={30} className={classes.progress} />) } </Button>
                        
                    </form>
                    <small>
                         Dont have an account? sign up <Link to="/signup">here </Link> </small>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });
    
  
  const mapActionsToProps = {
    loginUser
  };

  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));

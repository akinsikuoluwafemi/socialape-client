// import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import AppIcon from '../images/icon.png';
import axios from 'axios';
// import { Link } from 'react-router-dom';


// // MUI stuff
// import { Grid } from '@material-ui/core';
// import {Typography} from '@material-ui/core';
// import { Button } from '@material-ui/core';
// import { TextField } from '@material-ui/core';
// import { CircularProgress } from '@material-ui/core';



import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


// const styles = (theme) => ({
//     ...theme
// })
   

const styles = {

    typography: {
        useNextVariants: true
    },
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
}


 


class signup extends Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');

            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                });
            });
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        const { classes } = this.props;
        const {  errors,loading } = this.state;
        
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                
                <Grid item sm >
            
                    <img src={AppIcon} alt="socialape-icon" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography> 
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth />
                        
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.email ? true : false} 
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth />

                        <TextField
                            id="confirmpassword"
                            name="confirmPassword" 
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            helperText={errors.confirmpassword}
                            error={errors.confirmpassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth />
                        
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="Handle"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth />
                        
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit" 
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                            >
                            {loading ? <CircularProgress size={20} /> : 'Signup'}
                         
                        </Button>
                        <br/>
                        <small>Already have an account ? login <Link to="/login">here</Link></small>

                    </form>
                </Grid>
            
                <Grid item sm />

                
                

           </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup);



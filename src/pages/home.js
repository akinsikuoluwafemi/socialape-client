import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';

class home extends Component{
    state = {
        screams: null
    }
    componentDidMount() {
        axios.get('/screams')
        .then(res => {
            this.setState({screams: res.data})
        })
        .catch(err => console.log(err))
    }



    render(){
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream scream={scream} key={scream.screamId}/>)
        ) : <p>Loading...</p>

        return (
           <Grid container >
                <Grid item sm={8} xs={12} >
                    {recentScreamsMarkup}
                </Grid>

                <Grid item sm={4} xs={12} style={{ paddingLeft: '6px' }}>
                    <p>Profile...</p>
                </Grid>

           </Grid>
        )
    }
}

export default home;



import React, { PropTypes } from 'react';
import axios from 'axios';
import moment from 'moment';

export default React.createClass({
    displayName: 'Profile',
    propTypes: {
        profile: PropTypes.object
    },
    getInitialState() {
        return {
            movies: null
        };
    },

    componentDidMount(){

        // fetch all movies and pushes it into an array
        this.fetchMovies()
            .then(responses => {
                return Promise.all(responses.map(m => m.data));
            })
            .then(arr => {
                console.log(arr);
                // holds the movies in the state
                this.setState({
                    movies: arr
                });
            });
    },

    /**
     * getMovies Return a promise after fetching all movies
     * @return [Promise]
     */
    fetchMovies(){
        const { films } = this.props.profile;
        let out = [];
        films.map(film =>{
            out.push(axios.get(film));
        });
        return Promise.all(out);
    },

    showMovies(){
        const { movies } = this.state;
        if(movies) {
            return movies.map(m =>{
                console.log(m);
                return (
                    <p>{m.title} <b>{moment(m.release_date).format('MMMM Do YYYY')}</b></p>
                );
            });
        }
    },

    render(){
        console.log('render: ',this.props.profile);
        return(
            <div className="Profile">
                <h1>{ this.props.profile.name}</h1>
                {this.showMovies()}
            </div>
        );
    }
});

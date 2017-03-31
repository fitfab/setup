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
            loading: true,
            movies: null
        };
    },

    componentWillReceiveProps(nextProps) {
        if(nextProps.profile.name){
            this.setState({ loading: true });
            this.getMovieResponses();
        }
    },

    componentDidMount() {
        this.getMovieResponses();
    },

    /**
     * getMovies Return a promise after fetching all movies
     * @return [Promise]
     */
    queueMovieRequests(){
        const { films } = this.props.profile;
        let out = [];
        films.map(film =>{
            out.push(axios.get(film));
        });
        return Promise.all(out);
    },

    getMovieResponses() {
        // fetch all movies and pushes it into an array
        this.queueMovieRequests()
            .then(responses => {
                return Promise.all(responses.map(m => m.data));
            })
            .then(arr => {
                // holds the movies in the state
                this.setState({
                    movies: arr,
                    loading: false
                });
            });
    },

    showMovies(){
        const { loading, movies } = this.state;
        if (loading) {
            return(<p>Loading....</p>);
        }
        return movies.map(m =>{
            return (
                <p>{m.title} <b>{moment(m.release_date).format('MMMM Do YYYY')}</b></p>
            );
        });
    },

    render(){
        return(
            <div className="Profile">
                <h1>{ this.props.profile.name}</h1>
                {this.showMovies()}
            </div>
        );
    }
});

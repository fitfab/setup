/* eslint no-console: 0 */
import React from 'react';
import axios from 'axios';
import InitialState from './../initial-state.js';
import Profile from './profile.js';

// Chose this style to reduce boilerplate code.
// speacialyy when dealing with fucntion binding
// https://facebook.github.io/react/docs/react-without-es6.html#autobinding
export default React.createClass({
    displayName: 'Swapi',

    getInitialState() {
        return {
            characters: InitialState,
            profile: {},
            error: null
        };
    },

    fetchProfile(event) {
        event.preventDefault();
        let endpoint = event.target.href;
        console.log(endpoint);
        axios.get(endpoint)
            .then((response) => {
                this.setState({
                    profile: Object.assign(this.state.profile, response.data),
                    error: null
                });
            })
            .catch( err => {
                this.setState({
                    error: {
                        message: 'These coordinates DO NOT exist in the galaxy',
                        err
                    }
                });
            });
    },

    renderProfile(){
        const ready = this.state.profile && this.state.profile.films;
        const { error } = this.state;
        // if there is some errors
        if ( error ) {
            return (<h2 className="error">{error.message}</h2>);
        }
        // display profile
        return (ready && <Profile profile={this.state.profile} />);
    },

    renderItem({ name, url}){
        return (
            <p>
                <a href={url} onClick={this.fetchProfile}>{name}</a>
            </p>
        );
    },
    renderList() {
        return this.state.characters.map((c) => this.renderItem(c));
    },

    render() {
        return (
            <div className="content">
                <div className="col">
                    <h1><span>STAR WAR</span></h1>
                    {this.renderList()}
                    {this.renderProfile()}
                </div>

            </div>
        );
    }
});

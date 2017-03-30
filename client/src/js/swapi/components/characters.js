/* eslint no-console: 0 */
import React from 'react';
import axios from 'axios';
import list from './../initial-state.js';
import Profile from './profile.js';

// Chose this style to reduce boilerplate code.
// speacialyy when dealing with fucntion binding
// https://facebook.github.io/react/docs/react-without-es6.html#autobinding
export default React.createClass({
    displayName: 'Swapi',

    getInitialState() {
        return {
            characters: list,
            profile: {
                movieList:[]
            }
        };
    },

    fetch(event) {
        event.preventDefault();
        let endpoint = event.target.href;
        console.log(endpoint);

        axios.get(endpoint)
            .then((response) => {
                this.setState({ profile: Object.assign(this.state.profile, response.data)});
            })
            .catch( err => console.log(err));
    },

    renderProfile(){
        const films = this.state.profile.films;
        // display profile
        return (films && <Profile profile={this.state.profile} />);
    },

    renderItem({ name, url}){
        return (
            <p>
                <a href={url} onClick={this.fetch}>{name}</a>
            </p>

        );
    },
    renderList() {
        return this.state.characters.map((c) => this.renderItem(c));
    },
    componentDidMount() {
        // axios.get('https://swapi.co/api/people/')
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch( err => console.log(err));
    },


    render() {
        return (
            <div className="content">
                <div className="col">
                    <h1><span>SWAPI</span></h1>
                    {this.renderList()}
                </div>
                <div className="col">
                    {this.renderProfile()}
                </div>
            </div>
        );
    }
});

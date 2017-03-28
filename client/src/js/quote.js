import React, { PropTypes } from 'react';

// Chose this style to reduce boilerplate code.
// speacialyy when dealing with fucntion binding
// https://facebook.github.io/react/docs/react-without-es6.html#autobinding
export default React.createClass({
    displayName: 'Quote',
    propTypes: {
        quote: PropTypes.string
    },

    getDefaultProps: function() {
        return {
            quote: 'You must be the change you wish to see in the world. -- Mahatma Gandhi'
        };
    },

    render() {
        return (
            <blockquote>
                {this.props.quote}
            </blockquote>
        );
    }
});

import React from 'react';
import PropTypes from 'prop-types';

// Update to React v15.5 and as we prepare for React 16
// The Facebook is recommending that we migrate them to JavaScript classes.
// https://facebook.github.io/react/blog/
export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <blockquote>
                {this.props.quote}
            </blockquote>
        );
    }
}
Home.propTypes = {
    quote: PropTypes.string
};

Home.defaultProps = {
    quote: 'You must be the change you wish to see in the world. -- Mahatma Gandhi'
};

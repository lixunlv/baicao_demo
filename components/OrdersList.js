import React, { Component, PropTypes } from 'react'

export default class OrdersList extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

OrdersList.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired
}
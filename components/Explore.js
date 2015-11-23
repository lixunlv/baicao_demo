import React, { Component, PropTypes } from 'react'

export default class Explore extends Component {
    constructor(props) {
        super(props)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleGoClick = this.handleGoClick.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cid !== this.props.cid) {
            this.setInputValue(nextProps.cid)
        }
    }

    getInputValue() {
        return this.refs.input.value
    }

    setInputValue(val) {
        // Generally mutating DOM is a bad idea in React components,
        // but doing this for a single uncontrolled field is less fuss
        // than making it controlled and maintaining a state for it.
        this.refs.input.value = val
    }

    handleKeyUp(e) {
        if (e.keyCode === 13) {
            this.handleGoClick()
        }
    }

    handleGoClick() {
        this.props.onChange(this.getInputValue())
    }

    render() {
        return (
            <div>
                <p>输入公司id:</p>
                <input size="45"
                       ref="input"
                       defaultValue={this.props.cid}
                       onKeyUp={this.handleKeyUp} />
                <button onClick={this.handleGoClick}>
                    确定
                </button>
            </div>
        )
    }
}

Explore.propTypes = {
    cid: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

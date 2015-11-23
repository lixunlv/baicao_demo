import React, { PropTypes, Component } from 'react'

export default class InfoItem extends Component {

    handleChange(e) {
        this.props.change(this.props.field, e.target.value)
    }

    render() {
        let { name, value, editing } = this.props;

        return (
            <div className="weui_cell">
                <div className="weui_cell_hd ">
                    <label className="weui_label"> { name } </label>
                </div>
                <div className = "weui_cell_bd weui_cell_primary" >
                {editing &&
                <input size="80"
                       ref="input"
                       style={{fontSize:15}}
                       onChange={this.handleChange.bind(this)}
                       defaultValue={value} />
                }
                {!editing && value }
                </div>
            </div>
        );
    }
}

InfoItem.propTypes = {
    field: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    change: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}

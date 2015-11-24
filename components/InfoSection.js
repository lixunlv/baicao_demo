import React, { PropTypes, Component } from 'react'
import InfoItem from './InfoItem'

export default class InfoSection extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            editing: false,
            changed: {}
        }
    }

    handleEdit() {
        this.setState({ editing: true })
    }

    handleEditSave() {
        console.log(this.props.data)
        this.props.saveChanged(this.props.data.sn, this.state.changed)
        this.setState({ editing: false })
    }

    handleChanged(field, value) {
        let changed = this.state.changed
        changed[field] = value
        this.setState({changed: changed})
    }

    handleEditCancel() {
        this.setState({ editing: false, changed: {} })
    }

    render() {
        let { fields, data } = this.props;
        return (
            <div className="bd">
                <div className="weui_cells">
                    {fields.map(field =>
                        <InfoItem
                            key={ field[0] }
                            editing = { this.state.editing }
                            change = {this.handleChanged.bind(this) }
                            field = {field[0]}
                            name={ field[1] }
                            value={ (data[field[0]] || '').toString() } />
                    )}
                </div>

                <br />

                {!this.state.editing &&
                <a onClick={this.handleEdit.bind(this)} style={{ cursor: 'pointer', paddingLeft:20}}> 修改 </a>
                }

                {this.state.editing &&
                    <div style={{flexDirection:'horizontal'}}>
                        <a onClick={this.handleEditSave.bind(this)} style={{ cursor: 'pointer', paddingLeft:20}}> 保存 </a>
                        <a onClick={this.handleEditCancel.bind(this)} style={{ cursor: 'pointer', paddingLeft:20}}> 取消 </a>

                    </div>
                }
                <br />
                <br />
            </div>
        );
    }
}

InfoSection.propTypes = {
    fields: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    saveChanged: PropTypes.func.isRequired
}


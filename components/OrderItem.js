import React, { PropTypes, Component } from 'react'

export default class OrderItem extends Component {
    render() {
        const {sn, name, price, ref} = this.props.order;
        return (
            <div className="weui_cell flex_box" style={{cursor: 'pointer'}} onClick={this.props.onSnClicked}>
                <div className="weui_cell_hd column_cell">
                    { (ref == true ? 'TH' : 'XS') + sn }
                </div>
                <div className="weui_cell_hd column_cell" style={{flexBasis:0, overflow: 'hidden', textOverflow: 'ellipsis'}}> {name} </div>
                <div className="weui_cell_ft column_cell">
                    {price}
                </div>
            </div>
        )
    }
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
    onSnClicked: PropTypes.func.isRequired
}


import React from 'react';
import { connect } from 'react-redux';
import { snClicked } from '../actions'
import OrderShow from '../components/OrderShow'

class OrderShowContainer extends React.Component {
    constructor(props) {
        super(props)
        this.getOrderBySn = this.getOrderBySn.bind(this)
    }

    getOrderBySn(sn) {
        for(let order of this.props.orders) {
            if (order.sn == sn)
                return order;
        }

        return null;
    }

    componentWillMount() {
        if (!this.props.order) {
            this.props.dispatch(snClicked(this.getOrderBySn(this.props.params.sn)));
        }
    }

    render() {
        return ( <OrderShow /> )
    }
}

const mapStateToProps =
    (state) => ({
        order: state.currentOrder,
        orders: state.orders
    });

export default connect(mapStateToProps)(OrderShowContainer);


import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import OrderItem from '../components/OrderItem'
import OrdersList from '../components/OrdersList'
import { backToList } from '../actions'

class OrdersContainer extends Component {

    componentWillMount() {
        if (this.props.currentOrder) {
            this.props.dispatch(backToList());
        }
    }
    render() {
        const { orders } = this.props
        return (
            <OrdersList title="订单列表">
                <div className="weui_cells weui_cells_access">
                    {orders.map(order =>
                            <OrderItem key={order.sn} order={order} />
                    )}
                </div>
            </OrdersList>
        )
    }
}

OrdersContainer.propTypes = {
    orders: PropTypes.array.isRequired,
    currentOrder: PropTypes.object
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
        currentOrder: state.currentOrder
    }
}

export default connect( mapStateToProps )(OrdersContainer)

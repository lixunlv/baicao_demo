import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { snClicked } from '../actions'
import OrderItem from '../components/OrderItem'
import OrdersList from '../components/OrdersList'

class OrdersContainer extends Component {
    render() {
        const { orders } = this.props
        return (
            <OrdersList title="订单列表">
                <div className="weui_cells weui_cells_access">
                    {orders.map(order =>
                            <OrderItem
                                key={order.sn}
                                order={order}
                                onSnClicked={() => this.props.snClicked(order)} />
                    )}
                </div>
            </OrdersList>
        )
    }
}

OrdersContainer.propTypes = {
    orders: PropTypes.array.isRequired,
    snClicked: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        orders: state.orders
    }
}

export default connect(
    mapStateToProps,
    { snClicked }
)(OrdersContainer)

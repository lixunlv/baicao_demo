import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectCid, fetchOrders } from '../actions'
import Explore from '../components/Explore'
import OrdersContainer from '../containers/OrdersContainer'


class App extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { dispatch, cid, orders } = this.props

        if (orders.length == 0)
            dispatch(fetchOrders(cid))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cid !== this.props.cid) {
            const { dispatch, cid } = nextProps
            dispatch(fetchOrders(cid))
        }
    }

    handleChange(nextCid) {
        this.props.dispatch(selectCid(nextCid))
    }

    render() {
        const { cid, orders, isFetching } = this.props
        let content = (
            <div>
                <Explore cid={cid}
                         onChange={this.handleChange} />

                {isFetching && orders.length == 0 &&
                <h2>Loading...</h2>
                }
                {!isFetching && orders.length == 0 &&
                <h2>Empty.</h2>
                }
                {orders.length != 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <OrdersContainer/>
                </div>
                }
            </div>
        );

        return content;
    }
}

App.propTypes = {
    cid: PropTypes.string.isRequired,
    orders: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    currentOrder: PropTypes.object
}

function mapStateToProps(state) {
    return {
        cid: state.cid,
        orders: state.orders,
        isFetching: state.isFetching,
        currentOrder: state.currentOrder
    }
}

export default connect(mapStateToProps)(App)

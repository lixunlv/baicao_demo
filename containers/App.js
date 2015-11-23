import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectCid, fetchOrders, snClicked, backToList, saveOrderChanged, deleteLine} from '../actions'
import Explore from '../components/Explore'
import OrdersContainer from '../containers/OrdersContainer'
import OrderShow from '../components/OrderShow'

class App extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.snClicked = this.snClicked.bind(this)
        this.backToList = this.backToList.bind(this)
        this.saveOrderChanged = this.saveOrderChanged.bind(this)
    }

    componentDidMount() {
        const { dispatch, cid } = this.props
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

    snClicked(oid) {
        this.props.dispatch(snClicked(oid))
    }

    backToList() {
        this.props.dispatch(backToList())
    }

    saveOrderChanged(sn, changed) {
        this.props.dispatch(saveOrderChanged(sn, changed))
    }

    deleteLine(sn, line_id) {
        this.props.dispatch(deleteLine(sn, line_id))
    }

    render() {
        const { cid, orders, isFetching, currentOrder } = this.props
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
                    <OrdersContainer orders={orders} snClicked={this.snClicked}/>
                </div>
                }
            </div>
        );

        if (currentOrder != null) {
            content = (
                <div>
                    <a onClick={this.backToList} style={{ cursor: 'pointer', paddingLeft:20}}> 返回 </a>
                    <OrderShow order={currentOrder} saveChanged={this.saveOrderChanged} deleteLine={this.deleteLine.bind(this)}  />
                </div>
            );
        }

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

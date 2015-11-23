import { combineReducers } from 'redux'
import {
    SELECT_CID, REQUEST_ORDERS, RECEIVE_ORDERS, SN_CLICKED, BACK_TO_LIST, SAVE_ORDER_CHANGED, DELETE_LINE
} from '../actions'

function cid(state = '52b7dd56e138231d0d0004fd', action) {
    switch (action.type) {
        case SELECT_CID:
            return action.cid
        default:
            return state
    }
}

function isFetching(state = false, action) {
    switch (action.type) {
        case REQUEST_ORDERS:
            return true;
        case RECEIVE_ORDERS:
            return false;
        default:
            return state
    }
}

function orders(state = [], action) {
    switch (action.type) {
        case RECEIVE_ORDERS:
            return action.orders;
        case SAVE_ORDER_CHANGED:
            return state.map(order =>
                    order.sn == action.sn ?
                        Object.assign({}, order, action.changed) :
                        order
            )
        case DELETE_LINE:
            console.log(action.line_id)
            return state.map(order =>
                    order.sn == action.sn ?
                        Object.assign({}, order,
                            {
                                lines: order.lines.filter(line =>
                                    line._id['$oid'] != action.line_id
                                )
                            }) :
                        order
            )

        default:
            return state
    }
}

function currentOrder(state = null, action) {
    switch (action.type) {
        case SN_CLICKED:
            return action.order;
        case SAVE_ORDER_CHANGED:
            return state.sn == action.sn ?
                Object.assign({}, state, action.changed) :
                state
        case DELETE_LINE:
            return state.sn == action.sn ?
                Object.assign({}, state,
                    {
                        lines: state.lines.filter(line =>
                            line._id['$oid'] != action.line_id
                        )
                    }) :
                state
        case BACK_TO_LIST:
            return null;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    orders,
    isFetching,
    cid,
    currentOrder
})

export default rootReducer

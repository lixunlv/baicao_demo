import fetch from 'isomorphic-fetch'

export const REQUEST_ORDERS = 'REQUEST_ORDERS'
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS'
export const SELECT_CID = 'SELECT_CID'
export const SN_CLICKED = 'SN_CLICKED'
export const BACK_TO_LIST = 'BACK_TO_LIST'
export const SAVE_ORDER_CHANGED = 'SAVE_ORDER_CHANGED'
export const DELETE_LINE = 'DELETE_LINE'

export function selectCid(cid) {
  return {
    type: SELECT_CID,
    cid
  }
}

function requestOrders(cid) {
  return {
    type: REQUEST_ORDERS,
    cid
}
}

function receiveOrders(cid, json) {
  console.log(json);
  return {
    type: RECEIVE_ORDERS,
    cid: cid,
    orders: json
  }
}

export function fetchOrders(cid) {
  return dispatch => {
    dispatch(requestOrders(cid))
      return fetch(`http://localhost:3001/erp/order/index/${cid}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveOrders(cid, json)))
  }
}

export function snClicked(order) {
  return {
    type: SN_CLICKED,
    order
  }
}

export function backToList() {
  return {
    type: BACK_TO_LIST
  }
}

export function saveOrderChanged(sn, changed) {
  return {
    type: SAVE_ORDER_CHANGED,
    sn,
    changed
  }
}

export function deleteLine(sn, line_id) {
  return {
    type: DELETE_LINE,
    sn,
    line_id
  }
}

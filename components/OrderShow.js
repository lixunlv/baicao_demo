import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import InfoSection from './InfoSection'
import LinesSection from './LinesSection'
import { saveOrderChanged, deleteLine} from '../actions'

class OrderShow extends Component {

    deleteLine(line_id) {
        this.props.dispatch(deleteLine(this.props.order.sn, line_id))
    }

    saveChanged(sn, changed) {
        this.props.dispatch(saveOrderChanged(sn, changed))
    }

    render() {
        let {order} = this.props;
        let fields = [['name', '客户名称'], ['mob', '联系电话'], ['addr', '联系地址'], ['c_at', '创建时间']]
        let line_fields = ['name', 'price', 'num']
        let buttom_fields = [['price', '订单金额'], ['pay', '已付金额'], ['n_pay', '未付金额'], ['memo', '备注']]

        return (
            <div className="page cell">
                <div className="hd">
                    <h1 className="page_title">{order.ref == true ? '退货单' : '销售单' }</h1>
                    <p className="page_desc">订单号：{ (order.ref == true ? 'TH' : 'XS') + order.sn }</p>
                </div>

                <InfoSection fields={fields} data={order} saveChanged={this.saveChanged.bind(this)}/>

                <LinesSection fields={line_fields} lines={order.lines} deleteLine={this.deleteLine.bind(this)} />

                <br />

                <InfoSection fields={buttom_fields} data={order} saveChanged={this.saveChanged.bind(this)} />

                <br />
                <br />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        order: state.currentOrder
    }
}

OrderShow.propTypes = {
    order: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(OrderShow)


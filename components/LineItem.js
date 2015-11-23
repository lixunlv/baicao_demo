import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

export default class LineItem extends Component {

    deleteLine() {
        this.props.deleteLine(this.props.line._id['$oid'])
    }

    render() {
        let { fields, line } = this.props;
        return (
            <div className="weui_cell">
                {fields.map((field, i) =>
                        <div className={
                        classnames({
                        weui_cell_hd: i == 0,
                        weui_cell_primary: i == 0,
                        weui_cell_bd: i != 0 && i != fields.length - 1,
                        weui_cell_ft: i == fields.length - 1
                        })} key={i}>

                            {(field == "price" || field == "num") &&
                                <label className={classnames({
                                    label_price: field == "price",
                                    label_num: field == "num"
                                })}>
                                    {line[field]}
                                </label>
                            }

                            {field != "price" && field != "num" &&
                                line[field]
                            }

                        </div>
                )}

                <div className="weui_cell_ft">
                <a onClick={this.deleteLine.bind(this)} style={{ cursor: 'pointer', paddingLeft:20}}> 删除 </a>
                </div>
            </div>
        );
    }
}

LineItem.propTypes = {
    fields: PropTypes.array.isRequired,
    line: PropTypes.object.isRequired,
    deleteLine: PropTypes.func.isRequired
}

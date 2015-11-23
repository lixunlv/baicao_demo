import React, { PropTypes, Component } from 'react'
import LineItem from './LineItem'

export default class LinesSection extends Component {
    render() {
        let { fields, lines, deleteLine } = this.props;
        return (
            <div className="weui_cells">
                {lines.map((line, i) =>
                        <LineItem
                            key={ i }
                            fields={ fields }
                            line={ line }
                            deleteLine= {deleteLine}
                            />
                )}
            </div>
        );
    }
}

LinesSection.propTypes = {
    fields: PropTypes.array.isRequired,
    lines: PropTypes.array.isRequired,
    deleteLine: PropTypes.func.isRequired
}
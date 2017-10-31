import React from 'react'
import PropTypes from 'prop-types'
import Im from 'immutable'

import { SCALE_TYPES } from '../scales'

class Scatter extends React.Component {
    static propTypes = {
        data: PropTypes.oneOf([PropTypes.instanceOf(Im.List)]),
        style: PropTypes.shape({
            // applies to point
            data: PropTypes.object,
            // applies to label
            labels: PropTypes.object,
            // applies to <g> container
            parent: PropTypes.object
        }),
        x: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        y: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        size: PropTypes.number,
        scale: PropTypes.oneOfType([
            PropTypes.oneOf(SCALE_TYPES),
            PropTypes.shape({
                x: PropTypes.oneOf(SCALE_TYPES),
                y: PropTypes.oneOf(SCALE_TYPES)
            })
        ]),
        domain: PropTypes.shape({
            x: PropTypes.array,
            y: PropTypes.array
        }),
        // symbol to use for point, circle by default
        symbol: PropTypes.string
    }

    static defaultProps = {
        data: Im.List([]),
        style: {
            data: {
                fill: 'black'
            },
            labels: {},
            parent: {}
        },
        x: 'x',
        y: 'y',
        size: 1,
        scale: 'linear',
        symbol: 'circle'
    }

    constructor(props) {
        super(props)
        this.renderSymbols = this.renderSymbols.bind(this)
    }

    renderSymbols() {
        const { data, x, y, size, symbol, style } = this.props
        return data.map(d => {
            // add support for other symbols
            return (
                <circle
                    key={d}
                    x={d.getIn(x)}
                    y={d.getIn(y)}
                    r={size}
                    style={style.data}
                />
            )
        })
    }

    render() {
        const { style } = this.props
        return <g style={style.parent}>{this.renderSymbols()}</g>
    }
}

export default Scatter

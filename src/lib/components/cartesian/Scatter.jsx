'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import Im from 'immutable'

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
        x: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
        y: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
        size: PropTypes.number,
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

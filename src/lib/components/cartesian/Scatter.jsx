import React from 'react'
import PropTypes from 'prop-types'
import Im from 'immutable'

import CartesianComponent from './CartesianComponent'

class Scatter extends CartesianComponent {
    static propTypes = Object.assign({}, CartesianComponent.propTypes, {
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
        // symbol to use for point, circle by default
        symbol: PropTypes.string
    })

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
        const { scaleFuncs } = this.state
        return data.map(d => {
            // add support for other symbols
            return (
                <circle
                    key={d}
                    cx={scaleFuncs.x(d.getIn(x))}
                    cy={scaleFuncs.y(d.getIn(y))}
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

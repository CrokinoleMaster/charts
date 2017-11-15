import React from 'react'
import PropTypes from 'prop-types'
import Im from 'immutable'

import CartesianComponent from './CartesianComponent'

class Axis extends CartesianComponent {
    static propTypes = Object.assign({}, CartesianComponent.propTypes, {
        style: PropTypes.shape({
            labels: PropTypes.object,
            ticks: PropTypes.object,
            axisLine: PropTypes.object
        }),
        tickCount: PropTypes.number,
        dependentAxis: PropTypes.bool,
        x: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        y: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    })

    static defaultProps = {
        style: {
            labels: {},
            ticks: {},
            axisLine: {
                stroke: 'black'
            }
        },
        tickCount: 5,
        dependentAxis: false,
        x: 'x',
        y: 'y',
        scale: 'linear'
    }

    constructor(props) {
        super(props)
        this.renderAxisLine = this.renderAxisLine.bind(this)
    }

    renderAxisLine() {
        const { style } = this.props
        const { scaleFuncs } = this.state
        const xRange = scaleFuncs.x.range()
        const yRange = scaleFuncs.y.range()
        const x1 = xRange[0]
        const x2 = xRange[xRange.length - 1]
        const y1 = yRange[0]
        const y2 = yRange[0]
        return <line x1={x1} y1={y1} x2={x2} y2={y2} style={style.axisLine} />
    }

    render() {
        return <g>{this.renderAxisLine()}</g>
    }
}

export default Axis

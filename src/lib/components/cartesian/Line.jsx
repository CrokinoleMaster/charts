import React from 'react'
import PropTypes from 'prop-types'
import Im from 'immutable'

import CartesianComponent from './CartesianComponent'

class Line extends CartesianComponent {
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
        y: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    })

    static defaultProps = {
        data: Im.List([]),
        style: {
            data: {
                stroke: 'black'
            },
            labels: {},
            parent: {}
        },
        x: 'x',
        y: 'y',
        scale: 'linear'
    }

    constructor(props) {
        super(props)
        this.renderLine = this.renderLine.bind(this)
    }

    renderLine() {
        const { data, x, y, symbol, style } = this.props
        const { scaleFuncs } = this.state
        let pathStr = ''
        for (let i = 0; i < data.size; i++) {
            const d = data.get(i)
            const xPos = scaleFuncs.x(d.getIn(x))
            const yPos = scaleFuncs.y(d.getIn(y))
            if (i === 0) {
                pathStr = pathStr + 'M' + xPos + ' ' + yPos
            } else {
                pathStr = pathStr + ' L' + xPos + ' ' + yPos
            }
        }
        return <path d={pathStr} fill="transparent" style={style.data} />
    }

    render() {
        const { style } = this.props
        return <g style={style.parent}>{this.renderLine()}</g>
    }
}

export default Line

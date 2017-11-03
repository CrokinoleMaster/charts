import React from 'react'
import PropTypes from 'prop-types'
import Im from 'immutable'

import { SCALE_TYPES, getScaleFunc, getScaleObj } from '../scales'

class Line extends React.Component {
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
        range: PropTypes.shape({
            x: PropTypes.array,
            y: PropTypes.array
        })
    }

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
        size: 1,
        scale: 'linear'
    }

    constructor(props) {
        super(props)
        this.renderLine = this.renderLine.bind(this)
    }

    componentWillMount() {
        const { scale, domain, range } = this.props
        this.setScaleFuncs(getScaleObj(scale), domain, range)
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.scale !== nextProps.scale ||
            this.props.domain !== nextProps.domain ||
            this.props.range !== nextProps.range
        ) {
            this.setScaleFuncs(
                getScaleObj(nextProps.scale),
                nextProps.domain,
                nextProps.range
            )
        }
    }

    setScaleFuncs(scales, domain, range) {
        this.setState({
            scaleFuncs: {
                x: getScaleFunc(scales.x, domain.x, range.x),
                y: getScaleFunc(scales.y, domain.y, range.y.reverse())
            }
        })
    }

    renderLine() {
        const { data, x, y, size, symbol, style } = this.props
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

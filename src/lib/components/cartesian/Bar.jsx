import React from 'react'
import PropTypes from 'prop-types'
import Im from 'immutable'

import CartesianComponent from './CartesianComponent'

class Bar extends CartesianComponent {
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
        // space between bars
        barPadding: PropTypes.number
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
        scale: {
            x: 'band',
            y: 'linear'
        },
        barPadding: 0.1
    }

    constructor(props) {
        super(props)
    }

    renderBars() {
        const { data, x, y, style } = this.props
        const { scaleFuncs } = this.state
        return (
            <g style={style.parent}>
                {data.map((d, i) => {
                    const xPos = scaleFuncs.x(d.getIn(x))
                    const yPos =
                        scaleFuncs.y(d.getIn(y)) + scaleFuncs.y.range()[1]
                    const width = scaleFuncs.x.bandwidth()
                    const height =
                        scaleFuncs.y.range()[0] -
                        scaleFuncs.y(d.getIn(y)) -
                        scaleFuncs.y.range()[1]
                    return (
                        <rect
                            x={xPos}
                            y={yPos}
                            width={width}
                            height={height}
                            key={i}
                        />
                    )
                })}
            </g>
        )
    }

    render() {
        return this.renderBars()
    }
}

export default Bar

import React from 'react'
import PropTypes from 'prop-types'

import { SCALE_TYPES, getScaleFunc, getScaleObj } from '../scales'

class CartesianComponent extends React.Component {
    static propTypes = {
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
        }),
        chartWidth: PropTypes.number,
        chartHeight: PropTypes.number
    }

    componentWillMount() {
        const { scale, domain, range, barPadding } = this.props
        this.setScaleFuncs(getScaleObj(scale), domain, range, barPadding)
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.scale !== nextProps.scale ||
            this.props.domain !== nextProps.domain ||
            this.props.range !== nextProps.range ||
            this.props.barPadding !== nextProps.barPadding
        ) {
            this.setScaleFuncs(
                getScaleObj(nextProps.scale),
                nextProps.domain,
                nextProps.range,
                nextProps.barPadding
            )
        }
    }

    setScaleFuncs(scales, domain, range, barPadding) {
        this.setState({
            scaleFuncs: {
                x: getScaleFunc(scales.x, domain.x, range.x, barPadding),
                y: getScaleFunc(
                    scales.y,
                    domain.y,
                    range.y.reverse(),
                    barPadding
                )
            }
        })
    }
}

export default CartesianComponent

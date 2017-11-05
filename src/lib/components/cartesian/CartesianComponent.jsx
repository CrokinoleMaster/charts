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
        ]).isRequired,
        domain: PropTypes.shape({
            x: PropTypes.array,
            y: PropTypes.array
        }).isRequired,
        range: PropTypes.shape({
            x: PropTypes.array,
            y: PropTypes.array
        }).isRequired
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
}

export default CartesianComponent

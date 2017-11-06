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
        scale: {
            x: 'band',
            y: 'linear'
        }
    }

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.state.scaleFuncs)
        return null
    }
}

export default Bar

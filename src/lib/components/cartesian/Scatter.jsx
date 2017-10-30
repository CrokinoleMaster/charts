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
        x: PropTypes.oneOf([PropTypes.string]),
        y: PropTypes.oneOf([PropTypes.string]),
        // symbol to use for point, circle by default
        symbol: PropTypes.string
    }

    static defaultProps = {
        data: Im.List([]),
        style: {
            data: {},
            labels: {},
            parent: {}
        },
        x: 'x',
        y: 'y',
        symbol: 'circle'
    }

    constructor(props) {
        super(props)
        this.renderSymbols = this.renderSymbols.bind(this)
    }

    renderSymbols() {
        const { data, x, y, symbol } = this.props
    }

    render() {
        const { style } = this.props
        return <g style={style.parent}>{this.renderSymbols()}</g>
    }
}

export default Scatter

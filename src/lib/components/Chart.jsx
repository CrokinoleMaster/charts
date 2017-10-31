import React from 'react'
import PropTypes from 'prop-types'

class Chart extends React.Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number
    }

    render() {
        const { width, height, children } = this.props
        return (
            <svg width={width} height={height}>
                {children}
            </svg>
        )
    }
}

export default Chart

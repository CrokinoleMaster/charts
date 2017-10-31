import React from 'react'
import PropTypes from 'prop-types'
import Im from 'immutable'

import { getDomain } from './scales'

class Chart extends React.Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number
    }

    componentWillMount() {
        const { children } = this.props
        const domains = this.getDomains(children)
        this.setState({
            xDomain: domains.x,
            yDomain: domains.y
        })
    }

    componentWillReceiveProps(nextProps) {
        const { children } = nextProps
        const domains = this.getDomains(children)
        this.setState({
            xDomain: domains.x,
            yDomain: domains.y
        })
    }

    getDomains(children) {
        const withData = children.filter
            ? children.filter(c => c.props.data)
            : [children]
        let xValues = Im.List()
        let yValues = Im.List()
        withData.forEach(c => {
            const { data, x, y } = c.props
            xValues = xValues.concat(data.map(d => d.getIn(x)))
            yValues = yValues.concat(data.map(d => d.getIn(y)))
        })
        const xDomain = getDomain(xValues)
        const yDomain = getDomain(yValues)
        return {
            x: xDomain,
            y: yDomain
        }
    }

    addDomainToChildren(children) {
        const { xDomain, yDomain } = this.state
        return React.Children.map(children, child =>
            React.cloneElement(child, {
                domain: {
                    xDomain,
                    yDomain
                }
            })
        )
    }

    render() {
        const { width, height, children } = this.props
        return (
            <svg width={width} height={height}>
                {this.addDomainToChildren(children)}
            </svg>
        )
    }
}

export default Chart

import React from 'react'
import PropTypes from 'prop-types'
import Im from 'immutable'

import { getDomain } from './scales'

class Chart extends React.Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        padding: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number
        })
    }

    static defaultProps = {
        width: 300,
        height: 300,
        padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
        }
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

    addPropsToChildren(children) {
        const { width, height, padding } = this.props
        const { xDomain, yDomain } = this.state
        return React.Children.map(children, child =>
            React.cloneElement(child, {
                domain: {
                    x: xDomain,
                    y: yDomain
                },
                range: {
                    x: [0 + padding.left, width - padding.right],
                    y: [0 + padding.top, height - padding.bottom]
                }
            })
        )
    }

    render() {
        const { width, height, children } = this.props
        return (
            <svg width={width} height={height}>
                {this.addPropsToChildren(children)}
            </svg>
        )
    }
}

export default Chart

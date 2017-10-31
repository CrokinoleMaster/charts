import * as d3Scale from 'd3-scale'

const SCALE_TYPES = ['linear']

const getDomain = (scale, data, accessor) => {
    if (scale === 'linear') {
        const sorted = data.map(d => d.getIn(accessor)).sort((a, b) => a - b)
        return [sorted[0], sorted[sorted.length - 1]]
    } else {
        console.error('unknown scale type')
    }
}

const getScaleFunc = (scale, domain, range) => {
    if (scale === 'linear') {
        return d3Scale
            .scaleLinear()
            .domain(domain)
            .range(range)
    } else {
        console.error('unknown scale type')
    }
}

export { SCALE_TYPES, getDomain }

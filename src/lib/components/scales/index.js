import * as d3Scale from 'd3-scale'

const SCALE_TYPES = ['linear']

const getDomain = values => {
    const sorted = values.sort((a, b) => a - b)
    return [sorted.first(), sorted.last()]
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

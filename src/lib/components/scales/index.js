import * as d3Scale from 'd3-scale'

const SCALE_TYPES = ['linear']

const getDomain = values => {
    if (values.every(n => typeof n === 'number')) {
        const sorted = values.sort((a, b) => a - b)
        return [sorted.first(), sorted.last()]
    } else {
        return values
    }
}

const getScaleFunc = (scale, domain, range) => {
    if (scale === 'linear') {
        return d3Scale
            .scaleLinear()
            .domain(domain)
            .range(range)
    } else if (scale === 'band') {
        return d3Scale.scaleBand(range)
    } else {
        console.error('unknown scale type')
    }
}

// get scale obj from scale prop
const getScaleObj = scale => {
    let xScale
    let yScale
    if (typeof scale === 'string') {
        xScale = scale
        yScale = scale
    } else {
        xScale = scale.x
        yScale = scale.y
    }
    const scales = {
        x: xScale,
        y: yScale
    }
    return scales
}

export { SCALE_TYPES, getDomain, getScaleObj, getScaleFunc }

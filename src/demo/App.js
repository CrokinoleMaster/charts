import React from 'react'
import Im from 'immutable'
import { Axis, Chart, Scatter, Line, Bar } from '../lib'

const lineData = Im.List([
    Im.Map({
        x: 1,
        y: 1
    }),
    Im.Map({
        x: 2,
        y: 4
    }),
    Im.Map({
        x: 3,
        y: 9
    })
])

const barData = Im.List([
    Im.Map({
        x: 'A',
        y: 0
    }),
    Im.Map({
        x: 'B',
        y: 1
    }),
    Im.Map({
        x: 'C',
        y: 2
    }),
    Im.Map({
        x: 'D',
        y: 3
    }),
    Im.Map({
        x: 'E',
        y: 4
    }),
    Im.Map({
        x: 'F',
        y: 5
    })
])

const App = () => (
    <div
        style={{
            background: 'lightgray'
        }}
    >
        <div>Line</div>
        <Chart width={300} height={300}>
            <Line
                data={lineData}
                x="x"
                y="y"
                style={{
                    data: {
                        stroke: 'darkred'
                    }
                }}
            />
            <Scatter
                data={lineData}
                x="x"
                y="y"
                size={3}
                style={{
                    data: {
                        fill: 'white',
                        stroke: 'darkred',
                        strokeWidth: 2
                    }
                }}
            />
        </Chart>
        <div>Bar</div>
        <Chart width={300} height={300}>
            <Axis />
            <Bar data={barData} x="x" y="y" />
        </Chart>
    </div>
)

export default App

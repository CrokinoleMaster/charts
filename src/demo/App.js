import React from 'react'
import Im from 'immutable'
import { Chart, Scatter, Line } from '../lib'

const data = Im.List([
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

const App = () => (
    <div
        style={{
            background: 'lightgray'
        }}
    >
        <Chart width={800} height={300}>
            <Scatter
                data={data}
                x="x"
                y="y"
                size={5}
                style={{
                    data: {
                        fill: 'darkred'
                    }
                }}
            />
            <Line
                data={data}
                x="x"
                y="y"
                size={5}
                style={{
                    data: {
                        stroke: 'darkred'
                    }
                }}
            />
        </Chart>
    </div>
)

export default App

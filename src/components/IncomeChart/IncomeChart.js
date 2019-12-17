/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {LineChart, XAxis, YAxis, CartesianGrid, Line} from 'recharts'



class IncomeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount = () => {}


    render() {
        const { data } = this.state;
      return (
        <>
            <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            </LineChart>
        </>
        
     );
    }
}

export default IncomeChart;

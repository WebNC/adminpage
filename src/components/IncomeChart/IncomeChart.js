/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Label, Tooltip} from 'recharts'
import {getIncomeData} from '../../api/chart.action'


class IncomeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount = () => {
        getIncomeData().then(res =>{
            this.setState({data:res.data});
        })
    }

    render() {
        const { data } = this.state;
      return (
        <>
            <h2>Biểu đồ thống kê doanh thu</h2>
            <LineChart width={800} height={400} data={data}>
                <XAxis dataKey="month"/>
                <YAxis type="number">
                    <Label
                        value="M Triệu"
                        position="insideLeft"
                        style={{ textAnchor: 'middle' }}
                        />
                </YAxis>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="income" stroke="#8884d8" />
                <Tooltip />
            </LineChart>
        </>
        
     );
    }
}

export default IncomeChart;

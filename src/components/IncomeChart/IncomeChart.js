/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Label, Tooltip} from 'recharts'
import {Select, DatePicker} from 'antd';
import {getIncomeDataAll,getIncomeData} from '../../api/chart.action'

const {Option} = Select;
const {MonthPicker,RangePicker} = DatePicker;
class IncomeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            type: "All",
        };
    }

    componentDidMount = () => {
        getIncomeDataAll().then(res =>{
            this.setState({data:res.data});
        })
    }

    handleChange = (value) => {
        const { type } = this.state;
        this.setState({type: value});
        if(type == "All"){
            getIncomeDataAll().then(res =>{
                this.setState({data:res.data});
            })
        }
      }
  
    onChange = (date, dateString) => {
        const {type} = this.state
        getIncomeData(type,dateString).then(res=>{
            this.setState({data:res.data})
        })
    }

    render() {
        const { data, type } = this.state;
      return (
        <>
            <h2>Biểu đồ thống kê doanh thu</h2>
            <div>
                <Select defaultValue="All" style={{ width: 300}} onChange={this.handleChange}>
                    <Option value="All">Trong năm</Option>
                    <Option value="month">Trong tháng</Option>
                    <Option value="range">Trong khoảng</Option>
                </Select>
                {type == "month" && <MonthPicker onChange={this.onChange} placeholder="Chọn tháng"/>}
                {type == "range" && <RangePicker onChange={this.onChange} placeholder="Chọn khoảng"/>}
            </div>
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

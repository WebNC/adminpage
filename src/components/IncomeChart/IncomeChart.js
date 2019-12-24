/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment'
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Label, Tooltip} from 'recharts'
import {Select, DatePicker, Spin, Icon} from 'antd';
import {getIncomeDataAll,getIncomeData} from '../../api/chart.action'

const {Option} = Select;
const {MonthPicker,RangePicker} = DatePicker;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class IncomeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            type: "All",
            isLoading: true,
        };
    }

    componentDidMount = () => {
        getIncomeDataAll().then(res =>{
            this.setState({
                data:res.data,
                isLoading: false,
            });
        })
    }

    handleChange = (value) => {
        this.setState({type: value});
        if(value == "All"){
            getIncomeDataAll().then(res =>{
                this.setState({data:res.data});
            })
        } else if(value == "month") {
            getIncomeData('month','2019-12').then(res =>{
                this.setState({data:res.data});
            })
        } else if(value == "range") {
            getIncomeData('range',['2019-12-17','2019-12-26']).then(res =>{
                this.setState({data:res.data});
            })
        }
      }
  
    onChange = (date, dateString) => {
        const {type} = this.state
        if(dateString !== "" && dateString[0] !== ""){
            getIncomeData(type,dateString).then(res=>{
                this.setState({data:res.data})
            })
        }
    }

    render() {
        const { data, type, isLoading } = this.state;
        const monthFormat = 'YYYY-MM';
        const dateFormat = 'YYYY-MM-DD';
      return (
        <>
        {isLoading === true ? (
          <div style={{textAlign: "center"}}>
            <Spin indicator={antIcon} />
          </div>
        ):(
            <>
            <h2>Biểu đồ thống kê doanh thu</h2>
            <div>
                <Select defaultValue="All" style={{ width: 300, marginLeft: "60px", marginBottom: "10px", marginRight: "10px"}} onChange={this.handleChange}>
                    <Option value="All">Trong năm</Option>
                    <Option value="month">Trong tháng</Option>
                    <Option value="range">Trong khoảng</Option>
                </Select>
                {type == "month" && <MonthPicker defaultValue={moment('2019-12', monthFormat)} onChange={this.onChange} placeholder="Chọn tháng"/>}
                {type == "range" && <RangePicker defaultValue={[moment('2019-12-17', dateFormat), moment('2019-12-26', dateFormat)]} onChange={this.onChange} placeholder="Chọn khoảng"/>}
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
        )}
        </>
     );
    }
}

export default IncomeChart;

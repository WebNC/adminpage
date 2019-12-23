/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import { Select, DatePicker, Spin, Icon } from "antd";
import {getAllTopSkillIncomeAll, getAllTopSkillIncome} from '../../api/topIncome.action'
import './TopSkillIncome.scss';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker
class TopSkillIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          topSkill: [],
          type: "All",
          isLoading: true,
        };
    }

    componentDidMount = () => {
      getAllTopSkillIncomeAll().then(res=>{
        this.setState({
          topSkill: res.data.message,
          isLoading: false
        })
      })
    }

    
    handleChange = (value) => {
      const { type } = this.state;
      this.setState({type: value});
      if(type == "All"){
        getAllTopSkillIncomeAll().then(res=>{
          this.setState({topSkill: res.data.message})
        })
      }
    }

    onChange = (date, dateString) => {
      const {type} = this.state
      getAllTopSkillIncome(type,dateString).then(res=>{
          this.setState({topSkill: res.data.message})
      })
    }
    
    render() {
      const {topSkill, type, isLoading} = this.state;
      const teacherList = topSkill.map((item, index) => {
        if (item.income > 0){
          return(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{`${item.income}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
            </tr>
          )
        }
        return '';
      })
      return (
        <>
        {isLoading === true ? (
          <div style={{textAlign: "center"}}>
            <Spin indicator={antIcon} />
          </div>
        ):(
          <>
            <h2>Top 10 doanh thu cao nhất theo kỹ năng</h2>
            <div>
              <Select defaultValue="All" style={{ width: 300, marginBottom: "10px", marginRight: "10px"}} onChange={this.handleChange}>
                <Option value="All">Toàn thời gian</Option>
                <Option value="date">Trong ngày</Option>
                <Option value="month">Trong tháng</Option>
                <Option value="range">Trong khoảng</Option>
              </Select>
              {type == "date" && <DatePicker onChange={this.onChange}/>}
              {type == "month" && <MonthPicker onChange={this.onChange} placeholder="Chọn tháng"/>}
              {type == "range" && <RangePicker onChange={this.onChange} placeholder="Chọn khoảng"/>}
            </div>
              <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Kỹ năng</th>
                  <th>Thu nhập</th>

                </tr>
              </thead>
              <tbody>
                {teacherList}
              </tbody>
            </Table>
          </>
        )}
      </>
      );
    }
}

export default TopSkillIncome;

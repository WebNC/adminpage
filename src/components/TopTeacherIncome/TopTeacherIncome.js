/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import {Select, DatePicker, Spin, Icon} from 'antd'
import {getAllTopTeacherIncomeAll, getAllTopTeacherIncome} from '../../api/topIncome.action'
import './TopTeacherIncome.scss';

const {Option} = Select
const {RangePicker,MonthPicker} = DatePicker
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class TopTeacherIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          topSkill: [],
          type: 'All',
          isLoading: true,
        };
    }

    componentDidMount = () => {
      getAllTopTeacherIncomeAll().then(res=>{
        this.setState({
          topSkill: res.data.message,
          isLoading: false,
        })
      })
    }

    handleChange = (value) => {
      const { type } = this.state
      this.setState({type: value});
      if(type == "All"){
        getAllTopTeacherIncomeAll().then(res=>{
          this.setState({topSkill: res.data.message})
        })
      }
    }

    onChange = (date, dateString) => {
      const {type} = this.state;
      getAllTopTeacherIncome(type,dateString).then(res=>{
        this.setState({topSkill: res.data.message})
      })
    }

    render() {
      const {topSkill,type, isLoading} = this.state;
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
          <h2>Top 10 doanh thu cao nhất theo giáo Viên</h2>
          <div>
            <Select defaultValue="All" style={{ width: 300, marginRight: "10px", marginBottom: "10px"}} onChange={this.handleChange}>
              <Option value="All">Toàn thời gian</Option>
              <Option value="date">Trong ngày</Option>
              <Option value="month">Trong tháng</Option>
              <Option value="range">Trong khoảng</Option>
            </Select>
            {type == "date" && <DatePicker onChange={this.onChange}/>}
            {type == "month" && <MonthPicker onChange={this.onChange} placeholder="Chọn tháng"/>}
            {type == "range" && <RangePicker onChange={this.onChange}/>}
          </div>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Tên</th>
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

export default TopTeacherIncome;

/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import { Button, Select } from "antd";
import {getAllReport} from '../../api/report.action'
import './TopSkillIncome.scss';

const { Option } = Select;

class TopSkillIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          topSkill: [],
        };
    }

    componentDidMount = () => {
      const {page} = this.state
      getAllReport(page).then(res=>{
        this.setState({topSkill: res.data.message})
      })
    }

    handleChangeSelect = () => {

    }

    render() {
      const {topSkill} = this.state;
      const teacherList = topSkill.map((item, index) => {
        return(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.date}</td>
            <td><p>{item.studentName}</p><p>ID: {item.studentID}</p></td>
            <td><p>{item.teacherName}</p><p>ID: {item.teacherName}</p></td>
            <td><p>{item.content}</p></td>
            <td>{item.status === false?'Chưa giải quyết': 'Đã giải quyết'}</td>
            <td>
              { item.status === false ? <div><Button onClick =  { () => this.solve(item._id,index)}> Giải quyết </Button></div> : '' }
            </td>
          </tr>
        )
      })
      return (
        <>
        <h2>Top 10 doanh thu cao nhất theo skill</h2>
          <Select defaultValue="all" style={{ width: 120 }} onChange={this.handleChangeSelect}>
          <Option value="all">Toàn thời gian</Option>
            <Option value="month">Trong Tháng</Option>
          </Select>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Create Date</th>
              <th>From</th>
              <th>To</th>
              <th>Content</th>
              <th>Status</th>
              <th>Setting</th>

            </tr>
          </thead>
          <tbody>
            {teacherList}
          </tbody>
        </Table>
     
        </>
        
     );
    }
}

export default TopSkillIncome;

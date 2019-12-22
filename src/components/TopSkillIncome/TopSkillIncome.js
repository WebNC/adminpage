/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import { Select } from "antd";
import {getAllTopSkillIncome} from '../../api/topIncome.action'
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
      getAllTopSkillIncome('month').then(res=>{
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
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.income}</td>
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
              <th>ID</th>
              <th>Skill</th>
              <th>Income</th>

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

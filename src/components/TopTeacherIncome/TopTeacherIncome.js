/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import {getAllTopTeacherIncome} from '../../api/topIncome.action'
import './TopTeacherIncome.scss';


class TopTeacherIncome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          topSkill: [],
        };
    }

    componentDidMount = () => {
      getAllTopTeacherIncome('month').then(res=>{
        this.setState({topSkill: res.data.message})
      })
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
        <h2>Top 10 doanh thu cao nhất theo giáo Viên</h2>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
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

export default TopTeacherIncome;

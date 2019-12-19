/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import { Button, Pagination } from "antd";
import FormatDate from '../../helper/FomatDate'
import {getAllReport, getNumberReport, solveReport} from '../../api/report.action'
import './Reports.scss';


class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          reports: [],
          amount: 0,
          pageSize: 5,
        };
    }

    componentDidMount = () => {
      getAllReport(1).then(res=>{
        console.log(res.data.message);
        this.setState({reports: res.data.message})
      })

      getNumberReport().then(res =>{
        this.setState({
          amount: res.data.message
        })
      })
    }

    handleChange = (value) =>{
      getAllReport(value).then(res=>{
        this.setState({reports: res.data.message})
      })
    }

    solve = (id, index) => {
      solveReport(id).then( res => {
        if(res.status == 200){
          const { reports } = this.state;
          reports[index].status = true;
          this.setState({reports})
        }
      })
    }

    render() {
      const {reports, amount, pageSize} = this.state;
      const teacherList = reports.map((item, index) => {
        return(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{FormatDate(item.date)}</td>
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
          <h2>Danh sách report</h2>
          <Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
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

export default Reports;

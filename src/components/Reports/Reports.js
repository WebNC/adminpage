/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import { Button, Pagination } from "antd";
import SolveReportModal from './SolveReportModal/SolveReportModal'
import FormatDate from '../../helper/FomatDate'
import {getAllReport, getNumberReport} from '../../api/report.action'
import './Reports.scss';


class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          reports: [],
          amount: 0,
          pageSize: 5,
          isShow: false,
        };
    }

    componentDidMount = () => {
      getAllReport(1).then(res=>{
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

    handleShowModal = () => {
      const { isShow } = this.state
      this.setState({isShow: !isShow});
    }
    // solve = (id, index) => {
    //   solveReport(id).then( res => {
    //     if(res.status == 200){
    //       const { reports } = this.state;
    //       reports[index].status = true;
    //       this.setState({reports})
    //     }
    //   })
    // }

    render() {
      const {reports, amount, pageSize, isShow} = this.state;
      const teacherList = reports.map((item, index) => {
        return(
          <>
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{FormatDate(item.date)}</td>
            <td><p>{item.studentName}</p><p>ID: {item.studentID}</p></td>
            <td><p>{item.teacherName}</p><p>ID: {item.teacherID}</p></td>
            <td><p>{item.content}</p></td>
            <td>{item.status === false?'Chưa giải quyết': 'Đã giải quyết'}</td>
            <td>
              { item.status === false ? <div><Button onClick =  { () => this.handleShowModal()}> Xem chi tiết </Button></div> : '' }
            </td>
          </tr>
          <SolveReportModal 
            teacherID={item.teacherID} 
            studentID={item.studentID} 
            contractID={item.contractID} 
            handleShowModal={this.handleShowModal} 
            open={isShow} 
            reportID = {item._id}/>
          </>
        )
      })
      return (
        <>
          <h2>Danh sách report</h2>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Ngày tạo</th>
              <th>Từ người dùng</th>
              <th>Đến người dùng</th>
              <th>Nội dung</th>
              <th>Tình trạng</th>
              <th>Tác vụ</th>

            </tr>
          </thead>
          <tbody>
            {teacherList}
          </tbody>
        </Table>
        <Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
        </>
        
     );
    }
}

export default Reports;

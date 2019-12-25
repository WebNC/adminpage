/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import { Button, Pagination, Icon, Spin } from "antd";
import SolveReportModal from './SolveReportModal/SolveReportModal'
import FormatDate from '../../helper/FomatDate'
import {getAllReport, getNumberReport} from '../../api/report.action'
import './Reports.scss';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          reports: [],
          amount: 0,
          pageSize: 5,
          isShow: false,
          isLoading: true,
          selectedReport : {}
        };
    }

    componentDidMount = () => {
      getAllReport(1).then(res=>{
        this.setState({
          reports: res.data.message,
          isLoading: false
        })
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

    handleSolveReport = (reports) => {
      this.setState({reports});
    }

    handleClickShowReport = (item, index) =>{
      this.setState({
        selectedReport: item,
        index
      })
    }

    render() {
      const {reports, amount, pageSize, isShow, isLoading, selectedReport, index} = this.state;
      const teacherList = reports.map((item, index) => {
        return(
         
          <tr key={index} onClick={() => this.handleClickShowReport(item, index)} >
            <td>{index + 1}</td>
            <td>{FormatDate(item.date)}</td>
            <td><p>{item.studentName}</p><p>ID: {item.studentID}</p></td>
            <td><p>{item.teacherName}</p><p>ID: {item.teacherID}</p></td>
            <td><p>{item.content}</p></td>
            <td>{item.status === false?'Chưa giải quyết': 'Đã giải quyết'}</td>
            <td>
              { item.status === false ? <div><Button onClick =  {this.handleShowModal}> Xem chi tiết </Button></div> : '' }
            </td>
          </tr>
        )
      })
      return (
        <div  className="pl-5 pr-2">
        

          <SolveReportModal
            teacherID={selectedReport.teacherID} 
            studentID={selectedReport.studentID} 
            contractID={selectedReport.contractID} 
            handleShowModal={this.handleShowModal} 
            open={isShow} 
            reportID = {selectedReport._id}
            reports = {reports}
            index={index}
            handleSolveReport={this.handleSolveReport}/>

        {isLoading === true ? (
          <div style={{textAlign: "center"}}>
            <Spin indicator={antIcon} />
          </div>
        ):(
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
          {amount > pageSize &&
            <Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
          }
          </>
        )}
        </div>
     );
    }
}

export default Reports;

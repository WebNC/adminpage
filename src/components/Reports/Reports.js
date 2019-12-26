/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment'
import { Button, Icon, Spin, Table } from "antd";
import SolveReportModal from './SolveReportModal/SolveReportModal'
import {getAllReport, getNumberReport} from '../../api/report.action'
import './Reports.scss';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          reports: [],
          pagination: {total:0, pageSize:5, current: 1},
          isShow: false,
          isLoading: true,
          loading: false,
          selectedReport : {}
        };
    }

    componentDidMount = () => {
      getAllReport(1).then(res=>{
        this.setState({
          reports: res.data.message,
          selectedReport: res.data.message[0],
          index: 0,
          isLoading: false
        })
      })

      getNumberReport().then(res =>{
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.message;
        this.setState({
          pagination
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

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
        loading: true,
      });
      getAllReport(pager.current).then(res=>{
        this.setState({
          reports: res.data.message,
          loading: false,
        })
      })
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
      const {reports, isShow, isLoading, selectedReport, index} = this.state;
      // const teacherList = reports.map((item, index) => {
      //   return(
         
      //     <tr key={index} onClick={() => this.handleClickShowReport(item, index)} >
      //       <td>{index + 1}</td>
      //       <td>{FormatDate(item.date)}</td>
      //       <td><p>{item.studentName}</p><p>ID: {item.studentID}</p></td>
      //       <td><p>{item.teacherName}</p><p>ID: {item.teacherID}</p></td>
      //       <td><p>{item.content}</p></td>
      //       <td>{item.status === false?'Chưa giải quyết': 'Đã giải quyết'}</td>
      //       <td>
      //         { item.status === false ? <div><Button onClick =  {this.handleShowModal}> Xem chi tiết </Button></div> : '' }
      //       </td>
      //     </tr>
      //   )
      // })
      const dataSource = reports;
      const columns = [
        {
          title: 'Ngày tạo',
          dataIndex: 'date',
          key: 'date',
          render: day => `${moment(day).format('DD/MM/YYYY')}`,
        },
        {
          title: 'Từ người dùng',
          render: (text, record) => <><p>{record.studentName}</p><p>ID: {record.studentID}</p></>,
        },
        {
          title: 'Từ người dùng',
          render: (text, record) => <><p>{record.teacherName}</p><p>ID: {record.teacherID}</p></>,
        },
        {
          title: 'Nội dung',
          dataIndex: 'content',
        },
        {
          title: 'Tình trạng',
          dataIndex: 'status',
          key: 'status',
          render: status => status === false?'Chưa giải quyết': 'Đã giải quyết'
        },
        {
          title: 'Tác vụ',
          key: 'operation',
          render: (text, record) =>  <div><Button onClick =  {this.handleShowModal}> Xem chi tiết </Button></div>,
        },
      ];
      // record.status === false &&
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
            <Table 
              dataSource={dataSource}
              columns={columns}
              bordered
              rowKey={record => record._id}
              onChange={this.handleTableChange}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => this.handleClickShowReport(record, rowIndex), // click row
                };
              }}
            />
            {/* <Table striped bordered hover>
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
          } */}
          </>
        )}
        </div>
     );
    }
}

export default Reports;

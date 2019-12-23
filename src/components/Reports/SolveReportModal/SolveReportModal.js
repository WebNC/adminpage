/* eslint-disable camelcase */
import React from 'react';
import {Modal, Button } from 'react-bootstrap'
import { Spin, Icon, Result } from 'antd'
import 'antd/dist/antd.css';
import {getDetailReport, solveReport} from '../../../api/report.action'
import ContractInfo from './ContractInfo/ContractInfo'
import Message from './Message/Message'
import './SolveReportModal.css'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class SolveReportModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        reportId: '',
        student: {},
        teacher: {},
        contract: {},
        chat: {},
        message: '',
    }
  }

  UNSAFE_componentWillReceiveProps = (props)=>{
    const {teacherID, studentID, contractID, reportID} = props;
    
    getDetailReport(studentID, teacherID, contractID).then(res=>{
      this.setState({
        reportId: reportID,
        student : res.data.student,
        teacher: res.data.teacher,
        contract: res.data.contract,
        chat: res.data.chat,
        message: ''
      })
    })
  }

  handleDeclineButton = () => {
    const { reportId } = this.state;
    solveReport(reportId, false).then(res => {
      this.setState({
        message: 'Đã giải quyết khiếu nại'
      })
      console.log(res);
    })
  }

  handleAcceptButton = () => {
    const { reportId } = this.state;
    solveReport(reportId, true).then(res => {
      this.setState({
        message: 'Đã giải quyết khiếu nại'
      })
      console.log(res);
    })
  }

    render() {
        const {open, handleShowModal} = this.props;
        const {student, teacher, chat, contract, message} = this.state;
        
        return (
         <Modal show={open} onHide={handleShowModal} dialogClassName="solve-modal">
            <Modal.Header closeButton>
              <Modal.Title>Xem xét khiếu nại</Modal.Title>
            </Modal.Header>
            {message === '' ? (
            <>
              { student.username !== undefined ? (
              <>
                <Modal.Body>
                  <div style={{ display: "flex", maxHeight: "60vh", minHeight: "400px"}} >
                    <ContractInfo contract={contract} teacher={teacher.username} student={student.username}/>
                    <Message teacher={teacher} student={student} messages={chat}/>
                  </div>
                  </Modal.Body>
                <Modal.Footer>
                  <div className="solve-buttons" >
                    <Button className="solve-button" onClick={() => this.handleAcceptButton()}>Hoàn tiền</Button>
                    <Button onClick={() => this.handleDeclineButton()}>Không hoàn tiền</Button>
                  </div>
                </Modal.Footer>
              </>
              ):(
                <div style={{textAlign: "center", padding: "20px"}}>
                  <Spin indicator={antIcon} />
                </div>
              )
            }
          </>
          ): (
            <Modal.Body>
              <Result
                status="success" 
                title={ message } 
              />
            </Modal.Body>      
          )}  
          </Modal>
        )
    }
}

export default SolveReportModal

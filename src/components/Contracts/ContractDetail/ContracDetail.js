/* eslint-disable camelcase */
import React from 'react';
import { Button} from 'antd';
import {Modal} from 'react-bootstrap'
import 'antd/dist/antd.css';
import moment from 'moment';
import {getAllSkill} from '../../../api/skill.action'
import {getUserDetail} from '../../../api/user.action'
import './style.css';

class DetailContract extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        skills: [], 
        student: {},
        teacher: {}
    }
  }

  UNSAFE_componentWillReceiveProps = (props)=>{
    const {contractDetail} = props;
    if(contractDetail.studentID){
        getUserDetail(contractDetail.studentID).then(res=>{
            this.setState({
                student : res.data.message
            })
        })
    }
    if(contractDetail.teacherID){
        getUserDetail(contractDetail.teacherID).then(res=>{
            this.setState({
                teacher : res.data.message
            })        
        })
    }
    
}

  componentDidMount=()=>{
      getAllSkill().then(res=>{
          console.log(res)
          this.setState({
              skills: res.skillList
          })
      })

  }

  

    render() {
        const {open, handleShowDetailContract, contractDetail} = this.props;
        const {student, teacher, skills} = this.state;

        console.log(contractDetail)
        
      
        const selectedSkill =[];
        if(contractDetail.skill) {
            skills.forEach(element => {
                if(contractDetail.skill.indexOf(element._id) !== -1)
                    selectedSkill.push(
                        <h5 style={{fontSize: 14, textAlign: "left"}} >
                        {element.name}
                    </h5>)
          });
        }

        const comments = [];
        if(contractDetail.comment){
            contractDetail.comment.forEach(item => 
                comments.push( <h5>{`+ ${item.comment}`}</h5>)
            )
        } 
        return (
         <Modal show={open} onHide={handleShowDetailContract} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Thông tin hợp đồng</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                {contractDetail.skill ? 
                
                <div className="info-contract-teacher">

                    <div className="d-flex">
                        <div className="item-info-contract-teacher mr-5">
                            <h5 className="title-contract-teacher">Ngay tao:</h5>
                            <h5>
                                {moment(contractDetail.createAt).format('DD/MM/YYYY')} 
                            </h5>
                        </div>

                        <div className="item-info-contract-teacher ml-5">
                            <h5 className="title-contract-teacher">Rating </h5> 
                            <h5>
                                {contractDetail.rating}
                            </h5> 
                        </div>
                    </div>
               
                <div className="item-info-contract-teacher">
                  <h5 className="title-contract-teacher">Tinh trang:</h5>
                  <h5>
                    {contractDetail.status} 
                  </h5>
                </div>
                {
                    contractDetail.statusPay ? 
                    <div className="item-info-contract-teacher">
                    <h5 className="title-contract-teacher">Ngay tra:</h5>
                    <h5>
                      {moment(contractDetail.payDate).format('DD/MM/YYYY')} 
                    </h5>
                  </div> : <></>
                }

                <div className="d-flex">
                    <div className="item-info-contract-teacher mr-5">
                        <h5 className="title-contract-teacher">Tên học viên: </h5> 
                        <h5>
                            {student.username}
                        </h5> 
                    </div>

                    <div className="item-info-contract-teacher ml-5">
                        <h5 className="title-contract-teacher">Tên giao viên: </h5> 
                        <h5>
                            {teacher.username}
                        </h5> 
                    </div>
                </div>
               
               

                <div className="item-info-contract-teacher">
                  <h5 className="title-contract-teacher">Địa chỉ học :</h5>
                  <h5>
                    {`${contractDetail.address.address}, ${contractDetail.address.district}, Hồ Chí Minh` } 
                  </h5>
                </div>

                <div className="item-info-contract-teacher">
                  <h5 className="title-contract-teacher">Thời gian dạy:</h5>
                  <h5>
                    {contractDetail.fromDate !== undefined ? 
                      ` Từ ${moment(contractDetail.fromDate).format('DD/MM/YYYY')} đến ${moment(contractDetail.toDate).format('DD/MM/YYYY')}` 
                      : ''
                    } 
                  </h5>
                </div>

                <div className="item-info-contract-teacher">
                  <h5 className="title-contract-teacher">Kỹ năng:</h5>
                  <div style={{display: "block"}}>
                    {selectedSkill}
                  </div>
                </div>
                <div className="item-info-contract-teacher">
                  <h5 className="title-contract-teacher">Comment:</h5>
                  <div style={{display: "block"}}>
                    {comments}
                  </div>
                </div>

                <div className="d-flex">
                <div className="item-info-contract-teacher mr-5">
                  <h5 className="title-contract-teacher">Tổng số giờ:</h5> 
                  <h5>
                    { contractDetail.hour }
                  </h5>
                </div>

                <div className="item-info-contract-teacher ml-5">
                  <h5 className="title-contract-teacher " >Tổng tiền: </h5>
                  <h5 >
                    {`${contractDetail.value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </h5>
                </div>
                </div>

               
            </div> 
          : 
          <></>
                }
              </Modal.Body>
         
             
            
          </Modal>
        )
    }
}



export default DetailContract;

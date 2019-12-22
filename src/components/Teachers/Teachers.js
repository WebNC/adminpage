/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import {Pagination, Modal, Button} from 'antd'
import {getAllUserTeacher, blockUser, unblockUser, getNumberUserTeacher} from '../../api/user.action'
import './Teachers.scss';
import UserDetailModal from '../UserDetailModal/UserDetailModal'

const {confirm} = Modal

class Teachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teachers: [],
          pageSize: 10,
          amount: 0,
          showModal : false,
          teacher: {}
        };
    }

    componentDidMount = () => {
      getAllUserTeacher(1).then(res=>{
        this.setState({teachers: res.data.message})
      })

      getNumberUserTeacher().then(res =>{
        this.setState({
          amount: res.data.message
        })
      })
    }

    handleUpdate = (id) =>{
      let {teachers} = this.state;
      const index = teachers.findIndex(item => item._id === id);
      if(index !== -1){
        const student = teachers[index];
        student.isBlocked = !student.isBlocked;
        teachers = [...teachers.slice(0, index), student, ...teachers.slice(index+1, teachers.size)]
        this.setState({teachers})
      }
    }


    handleLock = id =>{
      const {handleUpdate} = this
      confirm({
        title: 'Bạn muốn khóa tài khoản này?',
        content: 'Xác nhận nếu bạn thực sự muốn khóa tài khoản',
        onOk() {
          handleUpdate(id)
          blockUser(id)
        },
        onCancel() {},
      });
    }

    handleOpenLock = id =>{
      const {handleUpdate} = this
      confirm({
        title: 'Bạn muốn khóa tài khoản này?',
        content: 'Xác nhận nếu bạn thực sự muốn khóa tài khoản',
        onOk() {
          handleUpdate(id)
          unblockUser(id)
        },
        onCancel() {},
      });
      
    }

    handleChange = (value) =>{
      getAllUserTeacher(value).then(res=>{
        this.setState({teachers: res.data.message})
      })
    }

    
    handleClickShowModal = item =>{
      this.setState({
        teacher: item,
      })
      this.handleShowModal();
    }

    handleShowModal = () =>{
      const {showModal} = this.state;
      this.setState({
        showModal: !showModal,
      })
    }


    render() {
      const {teachers,amount,pageSize, showModal, teacher} = this.state;
      const teacherList = teachers.map((item, index) => {
        return(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.username}</td>
            <td>{item.major}</td>
            <td>
              <div>
                {/* <Link to={`/${item._id}`}><MdRemoveRedEye  className="view-detail" /></Link> */}
                <Button onClick={() => this.handleClickShowModal(item)}>Xem chi tiết</Button>

                <span className="ml-3">
                  {item.isBlocked ? 
                    <Button  type="primary" onClick={() => this.handleOpenLock(item._id)}>Mở khóa tài khoản</Button> :
                    <Button  type="danger" onClick={() => this.handleLock(item._id)}>Khóa tài khoản</Button>
                }
                </span>
              </div>
            </td>
          </tr>
        )
      })

      return (
        <>
                <UserDetailModal open={showModal} information={teacher} handleShow={this.handleShowModal}/>

          <h2>Teacher List</h2>
          <Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Majors</th>
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

export default Teachers;

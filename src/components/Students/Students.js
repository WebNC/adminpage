/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import {Pagination, Modal, Button, Icon, Spin} from 'antd'
import {getAllUserStudent, blockUser,unblockUser, getNumberUserStudent} from '../../api/user.action'
import './Students.scss';
import UserDetailModal from '../UserDetailModal/UserDetailModal'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const {confirm} = Modal
class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          students: [],
          amount: 0,
          pageSize: 10,
          showModal : false,
          student: {},
          isLoading: true
        };
    }

    componentDidMount = () => {
      getAllUserStudent(1).then(res=>{
        this.setState({students: res.data.message})
      })
      
      getNumberUserStudent().then(res=>{
        this.setState({
          amount: res.data.message,
          isLoading: false})
      })      
    }

    handleUpdate = (id) =>{
      let {students} = this.state;
      const index = students.findIndex(item => item._id === id);
      if(index !== -1){
        const student = students[index];
        student.isBlocked = !student.isBlocked;
        students = [...students.slice(0, index), student, ...students.slice(index+1, students.size)]
        this.setState({students})
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
        title: 'Bạn muốn mở khóa tài khoản này?',
        content: 'Xác nhận nếu bạn thực sự muốn mở khóa tài khoản',
        onOk() {
          handleUpdate(id)
          unblockUser(id)
        },
        onCancel() {},
      });
    }

    handleChange = (value) =>{
      getAllUserStudent(value).then(res=>{
        this.setState({students: res.data.message})
      })
    }

    handleClickShowModal = item =>{
      this.setState({
        student: item,
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
      const {students, amount, pageSize, showModal, student, isLoading} = this.state;
      const studentsList = students.map((item, index) => {
          return(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.username}</td>
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
        {isLoading === true ? (
          <div style={{textAlign: "center"}}>
            <Spin indicator={antIcon} />
          </div>
        ):(
          <>
            <UserDetailModal open={showModal} information={student} handleShow={this.handleShowModal}/>
            <h2>Danh sách học sinh</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {studentsList}
              </tbody>
            </Table>
            {amount > pageSize &&
              <Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
            }
          </>
        )}
        </>
        
     );
    }
}

export default Students;

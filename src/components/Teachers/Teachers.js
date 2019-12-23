/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import {Pagination, Modal, Button, Icon, Spin} from 'antd'
import {getAllUserTeacher, blockUser, unblockUser, getNumberUserTeacher} from '../../api/user.action'
import './Teachers.scss';
import UserDetailModal from '../UserDetailModal/UserDetailModal'

const {confirm} = Modal
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Teachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teachers: [],
          pageSize: 10,
          amount: 0,
          showModal : false,
          teacher: {},
          isLoading: true
        };
    }

    componentDidMount = () => {
      getAllUserTeacher(1).then(res=>{
        this.setState({teachers: res.data.message})
      })

      getNumberUserTeacher().then(res =>{
        this.setState({
          amount: res.data.message,
          isLoading: false
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
      const {teachers,amount,pageSize, showModal, teacher, isLoading} = this.state;
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
        {isLoading === true ? (
          <div style={{textAlign: "center"}}>
            <Spin indicator={antIcon} />
          </div>
        ):(
          <>
            <UserDetailModal open={showModal} information={teacher} handleShow={this.handleShowModal}/>
            <h2>Danh sách giáo viên</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên</th>
                  <th>Chuyên ngành</th>
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
        </>
        
        
     );
    }
}

export default Teachers;

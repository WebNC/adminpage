/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import { MdLock,MdLockOpen,MdRemoveRedEye } from "react-icons/md";
import {Link} from 'react-router-dom'
import {Pagination, Modal} from 'antd'
import {getAllUserStudent, blockUser,unblockUser, getNumberUserStudent} from '../../api/user.action'
import './Students.scss';

const {confirm} = Modal
class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          students: [],
          amount: 0,
          pageSize: 10,
        };
    }

    componentDidMount = () => {
      getAllUserStudent(1).then(res=>{
        this.setState({students: res.data.message})
      })
      
      getNumberUserStudent().then(res=>{
        this.setState({amount: res.data.message})
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

    render() {
      const {students, amount, pageSize} = this.state;
      const studentsList = students.map((item, index) => {
          return(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.username}</td>
              <td>
              <div>
                <Link to={`/${item._id}`}>
                  <MdRemoveRedEye className="view-detail" />
                </Link>
                <span className="ml-3">
                  {item.isBlocked ? 
                    <MdLockOpen  className="delete" onClick={() => this.handleOpenLock(item._id)}/> :
                    <MdLock  className="delete" onClick={() => this.handleLock(item._id)}/>


                }
                </span>
              </div>
            </td>
          </tr>
          )
        })

      return (
        <>
          <Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Setting</th>
              </tr>
            </thead>
            <tbody>
              {studentsList}
            </tbody>
          </Table>
        </>
     );
    }
}

export default Students;

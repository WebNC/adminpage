/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table, Pagination} from 'react-bootstrap'
import { MdLock,MdLockOpen,MdRemoveRedEye } from "react-icons/md";
import {Link} from 'react-router-dom'
import {getAllUserStudent, blockUser,unblockUser, getNumberUserStudent} from '../../api/user.action'
import './Students.scss';


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
      this.handleUpdate(id)
      blockUser(id);
    }

    handleOpenLock = id =>{
      this.handleUpdate(id)
      unblockUser(id)
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

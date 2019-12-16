/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table, Pagination} from 'react-bootstrap'
import { MdLock,MdRemoveRedEye,MdLockOpen } from "react-icons/md";
import {Link} from 'react-router-dom'
import {getAllUserTeacher, blockUser, unblockUser, getNumberUserTeacher} from '../../api/user.action'
import './Teachers.scss';


class Teachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teachers: [],
          pageSize: 10,
          amount: 0,
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
      this.handleUpdate(id)
      blockUser(id)
    }

    handleOpenLock = id =>{
      this.handleUpdate(id)
      unblockUser(id)
    }

    handleChange = (value) =>{
      getAllUserTeacher(value).then(res=>{
        this.setState({teachers: res.data.message})
      })
    }


    render() {
      const {teachers,amount,pageSize} = this.state;
      const teacherList = teachers.map((item, index) => {
        return(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.username}</td>
            <td>{item.major}</td>
            <td>
              <div>
                <Link to={`/${item._id}`}><MdRemoveRedEye  className="view-detail" /></Link>
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

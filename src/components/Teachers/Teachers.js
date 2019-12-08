/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import { MdLock,MdRemoveRedEye,MdLockOpen } from "react-icons/md";
import {Link} from 'react-router-dom'
import {getAllUserTeacher, blockUser, unblockUser} from '../../api/admin.action'
import './Teachers.scss';


class Teachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teachers: [],
          page: 0,
        };
    }

    componentDidMount = () => {
      const {page} = this.state
      getAllUserTeacher(page).then(res=>{
        this.setState({teachers: res.data.message})
      })
    }

    handleLock = id =>{
      const {page} = this.state
      blockUser(id).then(res =>{
        console.log(res)
      })
      getAllUserTeacher(page).then(res=>{
        this.setState({teachers: res.data.message})
      })
    }

    handleOpenLock = id =>{
      const {page} = this.state
      unblockUser(id).then(res =>{
        console.log(res)
      })
      getAllUserTeacher(page).then(res=>{
        this.setState({teachers: res.data.message})
      })
    }

    render() {
      const {teachers} = this.state;
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
      );
    }
}

export default Teachers;

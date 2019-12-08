/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import { MdLock,MdLockOpen,MdRemoveRedEye } from "react-icons/md";
import {Link} from 'react-router-dom'
import {getAllUserStudent, blockUser,unblockUser} from '../../api/admin.action'
import './Students.scss';


class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          students: [],
          page: 0,
        };
    }

    componentDidMount = () => {
      const {page} = this.state;
      getAllUserStudent(page).then(res=>{
        this.setState({students: res.data.message})
      })
    }

    handleLock = id =>{
      const {page} = this.state
      blockUser(id).then(res =>{
        console.log(res)
      })
      getAllUserStudent(page).then(res=>{
        this.setState({students: res.data.message})
      })
    }

    handleOpenLock = id =>{
      const {page} = this.state
      unblockUser(id).then(res =>{
        console.log(res)
      })
      getAllUserStudent(page).then(res=>{
        this.setState({students: res.data.message})
      })
    }

    render() {
      const {students} = this.state;

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
      );
    }
}

export default Students;

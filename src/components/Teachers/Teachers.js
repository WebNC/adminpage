/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import { MdLock,MdRemoveRedEye } from "react-icons/md";
import {getAllUserTeacher} from '../../api/admin.action'
import './Teachers.scss';


class Teachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teachers: []
        };
    }

    componentDidMount = () => {
      const page = 1;
      getAllUserTeacher(page).then(res=>{
        this.setState({teachers: res.data.message})
      })
    }

    handleLock = () =>{
      const {lockTeacher} = this.props;
      lockTeacher();
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
                <MdRemoveRedEye  className="view-detail" />
                <span className="ml-3">
                  <MdLock  className="delete" onClick={this.handleLock}/>
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

import React from 'react';
import {Table} from 'react-bootstrap'
import { MdLock,MdRemoveRedEye } from "react-icons/md";
import {getAllUserStudent} from '../../api/admin.action'
import './Students.scss';


class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          students: []
        };
    }

    componentDidMount = () => {
      const page = 1;
      getAllUserStudent(page).then(res=>{
        this.setState({students: res.data.message})
      })
    }

    handleDelete = () =>{
      const {lockStudent} = this.props;
      lockStudent();
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
                <MdRemoveRedEye className="view-detail" />
                <span className="ml-3">
                  <MdLock  className="delete" onClick={this.handleDelete}/>
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

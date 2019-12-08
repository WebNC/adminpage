import React from 'react';
import {Table} from 'react-bootstrap'
import { MdLock,MdRemoveRedEye } from "react-icons/md";
import './Teachers.scss';


class Teachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    componentDidMount = () => {
      
    }

    handleLock = () =>{
      const {lockTeacher} = this.props;
      lockTeacher();
    }

    render() {
      const data = [
        {
          username: 'username1',
          major: ['major1','major2']    
        }
      ];
      const teachers = data.map((item, index) => {
        // const major = ` ${  item.map(i => i)}`
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
            {teachers}
          </tbody>
        </Table>
      );
    }
}

export default Teachers;

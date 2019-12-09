/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table, Pagination} from 'react-bootstrap'
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
          amount: 0,
        };
    }

    componentDidMount = () => {
      const {page} = this.state
      getAllUserTeacher(page).then(res=>{
        this.setState({teachers: res.data.message})
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

    handlePre = () =>{
      const {page, amount} = this.state;
      if(page  > Math.floor(amount/25)){
        this.setState({page: page -1})
        getAllUserTeacher(page).then(res=>{
          this.setState({teachers: res.data.message})
        })
        
      }
      
    }

    handleNext = () =>{
      const {page, amount} = this.state;
      if(page < Math.floor(amount/25) ){
        this.setState({page: page + 1})
        getAllUserTeacher(page).then(res=>{
          this.setState({teachers: res.data.message})
        })
        
      }
    }


    render() {
      const {teachers,amount,page} = this.state;
      const active = page +1;

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

      const items = [];
      for (let number = 1; number <= amount/25+1; number+=1) {
        items.push(
          <Pagination.Item key={number}  active={number === active}>
            {number}
          </Pagination.Item>,
        );
      }

      return (
        <>
         <Pagination className="float-right mr-3" size="sm">
            <Pagination.First onClick={this.handlePre} />
            {items}
            {/* <Pagination.Ellipsis /> */}
            <Pagination.Last onClick={this.handleNext}/>
          </Pagination>

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

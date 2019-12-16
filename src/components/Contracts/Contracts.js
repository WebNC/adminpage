/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table, Pagination} from 'react-bootstrap'
import { MdRemoveRedEye } from "react-icons/md";
import {Link} from 'react-router-dom'
import {getAllContract, getNumberContract} from '../../api/contract.action'
import './contracts.scss';


class Contracts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          contracts: [],
          pageSize: 10,
          amount: 0,
        };
    }

    componentDidMount = () => {
      getAllContract(1).then(res=>{
        this.setState({contracts: res.data.message})
      })

      getNumberContract().then(res =>{
        this.setState({
          amount: res.data.message
        })
      })
    }


    handleChange = (value) =>{
      getAllContract(value).then(res=>{
        this.setState({contracts: res.data.message})
      })
    }

    render() {
      const {contracts,amount,pageSize} = this.state;
      const teacherList = contracts.map((item, index) => {
        return(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.createAt}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td>{item.value}</td>
            <td>{item.status}</td>
            <td>
              <div>
                <Link to={`/contract/${item._id}`}><MdRemoveRedEye  className="view-detail" /></Link>
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
              <th>Create Date</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Status</th>
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

export default Contracts;

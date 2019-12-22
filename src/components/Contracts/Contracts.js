/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import moment from 'moment'
import {Pagination, Button} from 'antd';
import {getAllContract, getNumberContract} from '../../api/contract.action'
import './contracts.scss';
import DetailContract from './ContractDetail/ContracDetail'

class Contracts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          contracts: [],
          pageSize: 10,
          amount: 0,
          showDetailModal : false,
          detailContract: {}
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

    handleShowModal = () =>{
      const {showDetailModal} = this.state;
      this.setState({
        showDetailModal: !showDetailModal,
      })
    }

    handleDetailContract = (item) =>{
      this.setState({
        detailContract: item,
      })
      this.handleShowModal();
    }

    render() {
      // open, handleShowDetailContract, contractDetail
      const {contracts,amount,pageSize, showDetailModal, detailContract} = this.state;
      const contractList = contracts.map((item, index) => {
        return(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{moment(item.createAt).format('DD/MM/YYYY')}</td>
            <td>{moment(item.fromDate).format('DD/MM/YYYY')}</td>
            <td>{moment(item.toDate).format('DD/MM/YYYY')}</td>
            <td>{item.value}</td>
            <td>{item.status}</td>
            <td>
              <div>
                {/* <Link to={`/contract/${item._id}`}>
                </Link> */}
                <Button onClick={() => this.handleDetailContract(item)}>Xem chi tiết</Button>

              </div>
            </td>
          </tr>
        )
      })

      return (
        <>
        <DetailContract open={showDetailModal} contractDetail={detailContract} handleShowDetailContract={this.handleShowModal} />
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
            {contractList}
          </tbody>
        </Table>
     
        </>
        
     );
    }
}

export default Contracts;

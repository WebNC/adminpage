/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Table} from 'react-bootstrap'
import moment from 'moment'
import {Pagination, Button, Icon, Spin} from 'antd';
import {getAllContract, getNumberContract} from '../../api/contract.action'
import './contracts.scss';
import DetailContract from './ContractDetail/ContracDetail'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Contracts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          contracts: [],
          pageSize: 10,
          amount: 0,
          showDetailModal : false,
          detailContract: {},
          isLoading: true,
        };
    }

    componentDidMount = () => {
      getAllContract(1).then(res=>{
        this.setState({
          contracts: res.data.message,
          isLoading: false
        })
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
      const {contracts,amount,pageSize, showDetailModal, detailContract, isLoading} = this.state;
      const contractList = contracts.map((item, index) => {
        return(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{moment(item.createAt).format('DD/MM/YYYY')}</td>
            <td>{moment(item.fromDate).format('DD/MM/YYYY')}</td>
            <td>{moment(item.toDate).format('DD/MM/YYYY')}</td>
            <td>{`${item.value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
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
        {isLoading === true ? (
          <div style={{textAlign: "center"}}>
            <Spin indicator={antIcon} />
          </div>
        ):(
          < div  className="pl-5 pr-2">
            <DetailContract open={showDetailModal} contractDetail={detailContract} handleShowDetailContract={this.handleShowModal} />
            <h2>Danh sách hợp đồng </h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ngày tạo</th>
                  <th>Từ ngày</th>
                  <th>Đến ngày</th>
                  <th>Giá trị</th>
                  <th>Tình trạng</th>
                  <th>Tác vụ</th>

                </tr>
              </thead>
              <tbody>
                {contractList}
              </tbody>
            </Table>
            {amount > pageSize &&
              <Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
            }
          </ div>
        )}
      </>
     );
    }
}

export default Contracts;

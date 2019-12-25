/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment'
import {Pagination, Button, Icon, Spin, Select, Table} from 'antd';
import {getAllContract, getNumberContract} from '../../api/contract.action'
import './contracts.scss';
import DetailContract from './ContractDetail/ContracDetail'


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Contracts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          contracts: [],
          pagination: {total:0, pageSize:5, current: 1},
          showDetailModal : false,
          detailContract: {},
          isLoading: true,
          loading: false,
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
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.message;
        this.setState({
          pagination,
        })
      })
    }


    handleChange = (value) =>{
      
    }
    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
        loading: true,
      });
      getAllContract(pager.current).then(res=>{
        this.setState({
          contracts: res.data.message,
          loading: false,
        })
      })
    }
    handleShowModal = () =>{
      const {showDetailModal} = this.state;
      this.setState({
        showDetailModal: !showDetailModal,
      })
    }

    handleDetailContract = (item) =>{
      console.log(item)
      this.setState({
        detailContract: item,
      })
      this.handleShowModal();
    }

    render() {
      // open, handleShowDetailContract, contractDetail
      const {contracts, showDetailModal, detailContract, isLoading} = this.state;
      const createFilter = contracts.map((ele)=>{
        return moment(ele.createAt).format('DD/MM/YYYY')
      })
      const dataSource = contracts;
      const columns = [
        {
          title: 'Ngày tạo',
          dataIndex: 'createAt',
          key: 'createAt',
          render: day => `${moment(day).format('DD/MM/YYYY')}`,
        },
        {
          title: 'Từ ngày',
          dataIndex: 'fromDate',
          key: 'fromDate',
          render: day => `${moment(day).format('DD/MM/YYYY')}`,
        },
        {
          title: 'Đến ngày',
          dataIndex: 'toDate',
          key: 'toDate',
          render: day => `${moment(day).format('DD/MM/YYYY')}`,
        },
        {
          title: 'Giá trị',
          dataIndex: 'value',
          key: 'value',
          render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        },
        {
          title: 'Tình trạng',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Tác vụ',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: (text, record) => <Button onClick={() => this.handleDetailContract(record)}>Xem chi tiết</Button>,
        },
      ];
      
      return (
        <>
        {isLoading === true ? (
          <div style={{textAlign: "center"}}>
            <Spin indicator={antIcon} />
          </div>
        ):(
          <>
            <DetailContract open={showDetailModal} contractDetail={detailContract} handleShowDetailContract={this.handleShowModal} />
            <h2>Danh sách hợp đồng </h2>
            <Table 
              dataSource={dataSource}
              columns={columns}
              rowKey={record => record._id}
              onChange={this.handleTableChange}
              pagination={this.state.pagination}
              loading={this.state.loading}
            />
            {/* <Table striped bordered hover>
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
            }*/}
          </>
        )}
      </>
     );
    }
}

export default Contracts;

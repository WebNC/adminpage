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
          createFilter: [],
          statusFilter: [],
        };
    }

    componentDidMount = () => {
      const pager = { ...this.state.pagination };
      getAllContract(pager.current,pager.pageSize,{},undefined).then(res=>{
        this.setState({
          contracts: res.data.message,
          isLoading: false,
          createFilter: res.data.filterCreate,
          statusFilter: res.data.filterStatus,
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

    handleTableChange = (pagination, filters, sorter) => {
      console.log(filters);
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
        loading: true,
      });
      getAllContract(pager.current,pager.pageSize,filters,sorter).then(res=>{
        pager.total = res.data.total
        this.setState({
          contracts: res.data.message,
          loading: false,
          pagination: pager,
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
      this.setState({
        detailContract: item,
      })
      this.handleShowModal();
    }

    render() {
      // open, handleShowDetailContract, contractDetail
      const {contracts, showDetailModal, detailContract, isLoading, createFilter, statusFilter} = this.state;
      const dataSource = contracts;
      const columns = [
        {
          title: 'Ngày tạo',
          dataIndex: 'createAt',
          key: 'createAt',
          sorter: true,
          filters: createFilter,
          render: day => `${moment(day).format('DD/MM/YYYY')}`,
        },
        {
          title: 'Từ ngày',
          dataIndex: 'fromDate',
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
          sorter: true,
          key: 'value',
          render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        },
        {
          title: 'Tình trạng',
          dataIndex: 'status',
          key: 'status',
          filters: statusFilter,
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
          </>
        )}
      </>
     );
    }
}

export default Contracts;

/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Modal, Button, Icon, Spin, Table, Input} from 'antd'
import {getAllUserStudent, blockUser,unblockUser, getNumberUserStudent} from '../../api/user.action'
import './Students.scss';
import UserDetailModal from '../UserDetailModal/UserDetailModal'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const {confirm} = Modal
class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          students: [],
          pagination: {total:0, pageSize:7, current: 1},
          showModal : false,
          student: {},
          isLoading: true
        };
    }

    componentDidMount = () => {
      getAllUserStudent(1).then(res=>{
        this.setState({
          students: res.data.message,
          isLoading: false
        })
      })
      
      getNumberUserStudent().then(res=>{
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.message;
        this.setState({
          pagination
        })
      })      
    }

    handleUpdate = (id) =>{
      let {students} = this.state;
      const index = students.findIndex(item => item._id === id);
      if(index !== -1){
        const student = students[index];
        student.isBlocked = !student.isBlocked;
        students = [...students.slice(0, index), student, ...students.slice(index+1, students.size)]
        this.setState({students})
      }
    }

    handleLock = id =>{
      const {handleUpdate} = this
      confirm({
        title: 'Bạn muốn khóa tài khoản này?',
        content: 'Xác nhận nếu bạn thực sự muốn khóa tài khoản',
        onOk() {
          handleUpdate(id)
          blockUser(id)
        },
        onCancel() {},
      });
    }

    handleOpenLock = id =>{
      const {handleUpdate} = this
      confirm({
        title: 'Bạn muốn mở khóa tài khoản này?',
        content: 'Xác nhận nếu bạn thực sự muốn mở khóa tài khoản',
        onOk() {
          handleUpdate(id)
          unblockUser(id)
        },
        onCancel() {},
      });
    }

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
        loading: true,
      });
      getAllUserStudent(pager.current).then(res=>{
        this.setState({
          students: res.data.message,
          loading: false,
        })
      })
    }

    handleClickShowModal = item =>{
      this.setState({
        student: item,
      })
      this.handleShowModal();
    }


    handleShowModal = () =>{
      const {showModal} = this.state;
      this.setState({
        showModal: !showModal,
      })
    }

    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? text : text
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };

    render() {
      const {students, showModal, student, isLoading} = this.state;
      // const studentsList = students.map((item, index) => {
      //     return(
      //       <tr key={index}>
      //         <td>{index + 1}</td>
      //         <td>{item.username}</td>
      //         <td>
      //         <div>
      //           {/* <Link to={`/${item._id}`}><MdRemoveRedEye  className="view-detail" /></Link> */}
      //           <Button onClick={() => this.handleClickShowModal(item)}>Xem chi tiết</Button>

      //           <span className="ml-3">
      //             {item.isBlocked ? 
      //               <Button  type="primary" onClick={() => this.handleOpenLock(item._id)}>Mở khóa tài khoản</Button> :
      //               <Button  type="danger" onClick={() => this.handleLock(item._id)}>Khóa tài khoản</Button>
      //           }
      //           </span>
      //         </div>
      //       </td>
      //     </tr>
      //     )
      //   })
      const dataSource = students;
      const columns = [
        {
          title: 'ID',
          dataIndex: '_id',
          key: '_id',
        },
        {
          title: 'Tên',
          dataIndex: 'username',
          key: 'username',
          ...this.getColumnSearchProps('username'),
        },
        {
          title: 'Tác vụ',
          key: 'operation',
          render: (text, record) => 
            <>
            <div>
              <Button onClick={() => this.handleClickShowModal(record)}>Xem chi tiết</Button>
              <span className="ml-3">
                {record.isBlocked ? 
                    <Button  type="primary" onClick={() => this.handleOpenLock(record._id)}>Mở khóa tài khoản</Button> :
                    <Button  type="danger" onClick={() => this.handleLock(record._id)}>Khóa tài khoản</Button>
                }
                </span>
              </div>
            </>
        },
      ];
      return (
        <>
        {isLoading === true ? (
          <div style={{textAlign: "center"}}>
            <Spin indicator={antIcon} />
          </div>
        ):(
          <div  className="pl-5 pr-2">
            <UserDetailModal open={showModal} information={student} handleShow={this.handleShowModal}/>
            <h2>Danh sách học sinh</h2>
            <Table 
              dataSource={dataSource}
              columns={columns}
              bordered
              rowKey={record => record._id}
              onChange={this.handleTableChange}
              pagination={this.state.pagination}
              loading={this.state.loading}
            />
            {/* <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {studentsList}
              </tbody>
            </Table>
            {amount > pageSize &&
              <Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
            } */}
          </div>
        )}
        </>
        
     );
    }
}

export default Students;

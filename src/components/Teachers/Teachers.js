/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Modal, Button, Icon, Spin, Table, Input} from 'antd'
import {getAllUserTeacher, blockUser, unblockUser, getNumberUserTeacher} from '../../api/user.action'
import './Teachers.scss';
import UserDetailModal from '../UserDetailModal/UserDetailModal'

const {confirm} = Modal
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Teachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teachers: [],
          pagination: {total:0, pageSize:7, current: 1},
          showModal : false,
          teacher: {},
          isLoading: true,
          loading: false,
        };
    }

    componentDidMount = () => {
      getAllUserTeacher(1).then(res=>{
        this.setState({
          teachers: res.data.message,
          isLoading: false,
        })
      })

      getNumberUserTeacher().then(res =>{
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.message;
        this.setState({
          pagination
        })
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
        title: 'Bạn muốn khóa tài khoản này?',
        content: 'Xác nhận nếu bạn thực sự muốn khóa tài khoản',
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
      getAllUserTeacher(pager.current).then(res=>{
        this.setState({
          teachers: res.data.message,
          loading: false,
        })
      })
    }
    
    handleClickShowModal = item =>{
      this.setState({
        teacher: item,
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
      const {teachers, showModal, teacher, isLoading} = this.state;
      // const teacherList = teachers.map((item, index) => {
      //   return(
      //     <tr key={index}>
      //       <td>{index + 1}</td>
      //       <td>{item.username}</td>
      //       <td>{item.major}</td>
      //       <td>
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
      //   )
      // })
      const dataSource = teachers;
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
          title: 'Chuyên ngành',
          dataIndex: 'major',
          key: 'major',
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
          <div className="pl-5 pr-2">
            <UserDetailModal open={showModal} information={teacher} handleShow={this.handleShowModal}/>
            <h2>Danh sách giáo viên</h2>
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
                  <th>Chuyên ngành</th>
                  <th>Tác vụ</th>

                </tr>
              </thead>
              <tbody>
                {teacherList}
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

export default Teachers;

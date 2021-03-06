/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React from 'react';
import {Modal} from 'react-bootstrap'
import * as antd from "antd";
import {getSkill, addSkill, editSkill, deleteSkill, getNumberSkill} from '../../api/skill.action';
import './Skills.scss';

const antIcon = <antd.Icon type="loading" style={{ fontSize: 24 }} spin />;

const {confirm} = antd.Modal
class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      skill: '',
      skillList: [],
      number:{},
      show: false,
      selectedSkill : '',
      selectedSkillID: '',
      pagination: {total:0, pageSize:8, current: 1},
      isLoading: true,
    };
  }

  componentDidMount = () => {
    getSkill(1).then(res=>{
      if(res){
        this.setState({
          skillList: res.skillList,
          number: res.number,
          isLoading: false,
        })
      }
    })
    getNumberSkill().then(res=>{
      const pagination = { ...this.state.pagination };
        pagination.total = res.message;
        this.setState({
          pagination
        })
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleFocus = e => {
    this.setState({
      [e.target.name]: '',
      error: false
    })
  }

  handleAddSkill = () => {
    const {skill} = this.state;
    const {skillList} = this.state;
    if(skill.trim() === ''){
      this.setState({
        error: true,
      })
    } else {
      addSkill(skill).then(res=>{
        if(res.status !== 200){
          this.setState({error: true})
        }
        else{
          skillList.push(res.data.value);
          this.setState({skillList})
        }
      })
    }
  }

  handleDelete = (id) =>{
    const {skillList} = this.state;
    deleteSkill(id).then(res=>{
      if(res.status === 200){
        const skill = skillList.find(item => item._id === id);
        if(skill){
          skillList.pop(skill);
          this.setState({skillList})
        }
      }
    })  
  }

  handleConfirm = (id) => {
    const {handleDelete} = this
    confirm({
      title: 'Bạn muốn xóa kỹ năng này?',
      content: 'Xác nhận nếu bạn thực sự muốn xóa kỹ năng này',
      onOk() {
        handleDelete(id)
      },
      onCancel() {},
    });
  }

  handleEdit = (name, id) => {
    this.setState({
      show: true,
      selectedSkill: name,
      selectedSkillID: id
    })
  }

  handleSave = () => {
    const {selectedSkill, selectedSkillID} = this.state;
    let {skillList} = this.state;
    
    editSkill(selectedSkillID,selectedSkill)
    const indexOldItem = skillList.findIndex(item => item._id === selectedSkillID)
    if(indexOldItem !== -1){
      const skill = skillList[indexOldItem]
      skill.name = selectedSkill;
      skillList = [...skillList.slice(0, indexOldItem), skill, ...skillList.slice(indexOldItem + 1, skillList.size)]
      this.setState({skillList})
    }

    this.setState({
      show: false
    })
  }

  handleClose = () =>{
    this.setState({
      show: false
    })
  }

  // handleChange = (value) =>{
  //   getSkill(value).then(res=>{
  //     this.setState({
  //       skillList: res.skillList,
  //       number: res.number
  //     })
  //   })
  // }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
      loading: true,
    });
    getSkill(pager.current).then(res=>{
      this.setState({
        skillList: res.skillList,
        number: res.number,
        loading: false,
      })
    })
  }
  render() {
    const {error, skill, skillList, number, show, selectedSkill, isLoading} = this.state;
    // const skills = skillList.map((item, index) => {
    //   return(
    //     <tr key={index}>
    //       <td>{index + 1}</td>
    //       <td>{item.name}</td>
    //       <td>{number[item._id] ? number[item._id].number : 0}</td>
    //       <td>
    //         <antd.Button  onClick={()=> this.handleEdit(item.name, item._id)}>Chỉnh sửa</antd.Button>
    //         <span className="ml-3">
    //           <antd.Button 
    //             type = "danger"
    //             onClick={()=>this.handleConfirm(item._id)}>Xóa</antd.Button>
    //         </span>
    //       </td>
    //     </tr>
    //     )
    //   })
    const dataSource = skillList;
      const columns = [
        {
          title: 'Kỹ Năng',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Số lượng',
          render: (text, record) => number[record._id] ? number[record._id].number : 0
        },
        {
          title: 'Tác vụ',
          key: 'operation',
          render: (text, record) => 
            <>
            <div>
              <antd.Button  onClick={()=> this.handleEdit(record.name, record._id)}>Chỉnh sửa</antd.Button>
              <span className="ml-3">
              <antd.Button 
                   type = "danger"
                  onClick={()=>this.handleConfirm(record._id)}>Xóa</antd.Button>
               </span>
              </div>
            </>
        },
      ];
    return (
      <>
      {isLoading === true ? (
        <div style={{textAlign: "center"}}>
          <antd.Spin indicator={antIcon} />
        </div>
      ):(
        <div className="content-skill pl-5 pr-2">
          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Nhập kỹ năng mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex mt-3 ml-2 mb-3 ">
              <input type="text" name="selectedSkill" id="selectedSkill"
                  value={selectedSkill}
                  onFocus={this.handleFocus}
                  className={error ? 'input-skill-error ' : 'input-skill rounded'}
                  onChange={this.onChange} />
              <antd.Button type="primary"  className="ml-3" onClick={this.handleSave}>
                Lưu thay đổi
              </antd.Button>
              </div>
              
              </Modal.Body>
            {/* <Modal.Footer>
              <antd.Button type="danger" onClick={this.handleClose}>
                Đóng
              </antd.Button>
            </Modal.Footer> */}
          </Modal>
          <h2>Danh sách kỹ năng </h2>
            <div className="d-flex" style={{ marginBottom: "10px"}}>
              <input type="text" name="skill" id="skill"
                placeholder="Thêm kỹ năng mới"
                value={skill}
                onFocus={this.handleFocus}
                className={error ? 'input-skill-error ' : 'input-skill rounded'}
                onChange={this.onChange} />
              <antd.Button type = "primary" onClick={this.handleAddSkill}>Thêm</antd.Button>     
            </div>
            <antd.Table 
              dataSource={dataSource}
              columns={columns}
              bordered
              rowKey={record => record._id}
              onChange={this.handleTableChange}
              pagination={this.state.pagination}
              loading={this.state.loading}
            />
          {/* <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Kỹ năng</th>
                <th>Số lượng</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {skills}
            </tbody>
          </Table>
          {amount > pageSize &&
            <antd.Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
          } */}
        </div>
      )}
      </>
      
    );
  }
}

export default Skills;

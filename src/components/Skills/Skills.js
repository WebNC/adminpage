/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React from 'react';
import {Table,Button, Modal} from 'react-bootstrap'
import { MdDeleteForever, MdEdit} from "react-icons/md";
import * as antd from "antd";
import {getSkill, addSkill, editSkill, deleteSkill, getNumberSkill} from '../../api/skill.action';
import './Skills.scss';

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
      amount: 0,
      pageSize: 8,
    };
  }

  componentDidMount = () => {
    getSkill(1).then(res=>{
      if(res){
        this.setState({
          skillList: res.skillList,
          number: res.number
        })
      }
    })
    getNumberSkill().then(res=>{
      this.setState({ amount: res.message })
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
      title: 'Bạn muốn xóa skill này?',
      content: 'Xác nhận nếu bạn thực sự muốn xóa skill này',
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

  handleChange = (value) =>{
    getSkill(value).then(res=>{
      this.setState({
        skillList: res.skillList,
        number: res.number
      })
    })
  }

  render() {
    const {error, skill, skillList, number, show, selectedSkill, amount, pageSize} = this.state;
    const skills = skillList.map((item, index) => {
      return(
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{number[item._id] ? number[item._id].number : 0}</td>
          <td>
            <MdEdit size="1.5em"  onClick={()=> this.handleEdit(item.name, item._id)}/>
            <span className="ml-3">
              <MdDeleteForever 
                className="delete"
                onClick={()=>this.handleConfirm(item._id)}/>
            </span>
          </td>
        </tr>
        )
      })
    return (
      <div className="content-skill">
         <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter new skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
          <input type="text" name="selectedSkill" id="selectedSkill"
              value={selectedSkill}
              onFocus={this.handleFocus}
              className={error ? 'input-skill-error ' : 'input-skill rounded'}
              onChange={this.onChange} />
          <Button variant="primary"  className="ml-3" onClick={this.handleSave}>
            Save Changes
          </Button>
          </div>
          
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        <div className="d-flex">
          <input type="text" name="skill" id="skill"
            placeholder="Enter new skill"
            value={skill}
            onFocus={this.handleFocus}
            className={error ? 'input-skill-error ' : 'input-skill rounded'}
            onChange={this.onChange} />
          <Button onClick={this.handleAddSkill}>Add</Button>
                  
        </div>
        <h2>Skill List </h2>
      <antd.Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Skill</th>
            <th>Amount</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {skills}
        </tbody>
      </Table>
    
      </div>
    );
  }
}

export default Skills;

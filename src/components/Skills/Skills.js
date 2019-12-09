/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React from 'react';
import {Table,Button, Modal} from 'react-bootstrap'
import { MdDeleteForever, MdEdit} from "react-icons/md";
import {getSkill, addSkill, editSkill} from '../../api/admin.action';
import './Skills.scss';



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
      selectedSkillID: ''
    };
  }

  componentDidMount = () => {
    getSkill().then(res=>{
      if(res){
        this.setState({
          skillList: res.skillList,
          number: res.number
        })
      }
     
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
    // const {addSkill} = this.props;

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
          skillList.push({name: skill});
          this.setState({skillList})
        }
      })
      getSkill().then(res=>{
        if(res)
          this.setState({
            skillList: res.skillList,
            number: res.number,
            skill:''
          })
      })
    }
  }

  handleDelete = (id) =>{
    const {deleteSkill} = this.props;
    const {skillList} = this.state;
    deleteSkill(id);
    const skill = skillList.find(item => item._id === id);
    if(skill){
      skillList.pop(skill);
      this.setState({skillList})
    }
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
    this.setState({
      show: false
    })
    editSkill(selectedSkillID,selectedSkill)
    const indexOldItem = skillList.indexOf(item => item._id === selectedSkillID)
    if(indexOldItem){
      skillList = [...skillList.splice(0, indexOldItem), {name: selectedSkill, _id: selectedSkillID}, ...skillList.splice(indexOldItem + 1, skillList.size)]
      this.setState({skillList})
    }
    getSkill().then(res=>{
      this.setState({
        skillList: res.skillList,
        number: res.number,
        skill:''
      })
    })
  }

  handleClose = () =>{
    this.setState({
      show: false
    })
  }



  render() {
    const {error, skill, skillList, number, show, selectedSkill} = this.state;
    const skills = skillList.map((item, index) => {
      return(
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{number[item._id] ? number[item._id].number : 1}</td>
          <td>
            <MdEdit size="1.5em"  onClick={()=> this.handleEdit(item.name, item._id)}/>
            <span className="ml-3">
              <MdDeleteForever 
                className="delete"
                onClick={()=>this.handleDelete(item._id)}/>
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

import React from 'react';
import {Table,Button} from 'react-bootstrap'
import { MdDeleteForever } from "react-icons/md";
import './Skills.scss';



class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      skill: ''
    };
  }

  componentDidMount = () => {
    
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
    const {addSkill} = this.props;

    if(skill.trim() === ''){
      this.setState({
        error: true,
      })
    } else {
      addSkill();
    }
  }

  handleDelete = () =>{
    const {deleteSkill} = this.props;
    deleteSkill();
  }


  render() {
    const {error, skill} = this.state;
    const data = [
      {
        name: 'skill1',
        amount: 2   
      }
    ];
    const skills = data.map((item, index) => {
        return(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.amount}</td>
            <td>
              <MdDeleteForever 
                className="delete"
                onClick={this.handleDelete}/>
            </td>
        </tr>
        )
      })

    return (
      <div className="content">
        <div className="d-flex">
          <input type="text" name="skill" id="skill"
            placeholder="Enter new skill"
            value={skill}
            onFocus={this.handleFocus}
            className={error ? 'input-skill-error ' : 'input-skill rounded'}
            onChange={this.onChange} />
          <Button onClick={this.handleAddSkill}>Add</Button>
                  
        </div>
        
      <Table striped bordered hover className="mt-5">
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

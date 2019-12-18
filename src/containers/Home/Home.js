import React from 'react';
import { connect } from 'react-redux'
import {Tab, Row, Col, Nav} from 'react-bootstrap'
import Header from '../Header'
import CreateNewAdmin from '../CreateNewAdmin/CreateNewAdmin'
import Profile from '../Profile'
import Students from '../Students';
import Teachers from '../Teachers';
import Skills from '../Skills';
import Contracts from '../Contracts';
import Reports from '../Reports';
import TopTeacherIncome from '../TopTeacherIncome';
import TopSkillIncome from '../TopSkillIncome'

import './Home.scss'

class Home extends React.PureComponent {

  render(){
    const isRoot = localStorage.getItem("admin") !== null
    const tabClassName = "mb-2 text-right tabs-column"
    return <>
      <Header/>
      <div className="content">

        <Tab.Container id="left-tabs-example" defaultActiveKey="2">
          <Row>
            <Col sm={3}>
              <div className="first-column">
                <Nav fill variant="tabs"  className="flex-column">
                  {isRoot && <Nav.Item className={tabClassName}>
                    <Nav.Link eventKey="1" className=" tab-label">Create Admin</Nav.Link>
                  </Nav.Item >}
                  <Nav.Item className={tabClassName}>
                    <Nav.Link eventKey="2" className=" tab-label">Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={tabClassName}>
                    <Nav.Link eventKey="3" className=" tab-label">Teachers</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={tabClassName}>
                    <Nav.Link eventKey="4" className=" tab-label">Students</Nav.Link>
                  </Nav.Item>
                  <Nav.Item  className={tabClassName}>
                    <Nav.Link eventKey="5" className=" tab-label">Skills</Nav.Link>
                  </Nav.Item>
                  <Nav.Item  className={tabClassName}>
                    <Nav.Link eventKey="6" className=" tab-label">Contracts</Nav.Link>
                  </Nav.Item>
                  <Nav.Item  className={tabClassName}>
                    <Nav.Link eventKey="7" className=" tab-label">Reports</Nav.Link>
                  </Nav.Item>
                  <Nav.Item  className={tabClassName}>
                    <Nav.Link eventKey="8" className=" tab-label">Income Chart</Nav.Link>
                  </Nav.Item>
                  <Nav.Item  className={tabClassName}>
                    <Nav.Link eventKey="9" className=" tab-label">Top Teacher Income</Nav.Link>
                  </Nav.Item>
                  <Nav.Item  className={tabClassName}>
                    <Nav.Link eventKey="10" className=" tab-label">Top Skill Income</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
          
            </Col>
            <Col sm={9}>
              <div className="tab-content">
                <Tab.Content>
                  <Tab.Pane eventKey="1">
                    <CreateNewAdmin/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <Profile/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="3">
                    <Teachers/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="4">
                    <Students/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="5">
                    <Skills/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="6">
                    <Contracts/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="7">
                    <Reports/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="8">
                    <Reports/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="9">
                    <TopTeacherIncome/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="10">
                    <TopSkillIncome/>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
      
  }
}


const mapStateToProps = state => ({
    store: state.login
})

// const mapDispatchToProps = (dispatch) => {
//     return {
//     }
// }


export default connect(mapStateToProps, null)(Home);


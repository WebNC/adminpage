import React from 'react';
import { connect } from 'react-redux'
import {Tab, Row, Col, Nav} from 'react-bootstrap'
import Header from '../Header'
import CreateNewAdmin from '../CreateNewAdmin/CreateNewAdmin'
import Profile from '../../components/Profile/Profile';
import './Home.scss'

class Home extends React.PureComponent {

    render(){
        const isRoot = localStorage.getItem("admin")!== null
        const tabClassName = "mb-4 text-right tabs-column"
        return <>
            <Header/>
            {/* {isRoot && <Link to="/register" className="brand-title">
                Create new admin
            </Link>} */}

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
                                        <p>Teachers</p>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="4">
                                        <p>Students</p>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="5">
                                        <p>Skills</p>
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


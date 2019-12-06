import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {Tabs, Tab, Row, Col, Nav} from 'react-bootstrap'
import Header from './Header'
import CreateNewAdmin from './CreateNewAdmin/CreateNewAdmin'

class Home extends React.PureComponent {

    render(){
        const isRoot = localStorage.getItem("admin")!== null
        console.log(isRoot);
        return <>
            <Header/>
            {isRoot && <Link to="/register" className="brand-title">
                Create new admin
            </Link>}

            


            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <Nav.Link eventKey="first">Create admin</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second">Profile</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="second">
                        <p>akgsdsj  </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="first">
                        <CreateNewAdmin/>

                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
                        
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


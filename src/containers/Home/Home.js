import React from 'react';
import { connect } from 'react-redux'
import { Tabs} from 'antd'
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
import IncomeChart from '../../components/IncomeChart/IncomeChart'

import './Home.scss'

const { TabPane } = Tabs;

class Home extends React.PureComponent {

  render(){
    const isRoot = localStorage.getItem("admin") !== null
    return <>
      <Header/>
      <div className="content">
      <Tabs defaultActiveKey="2" tabPosition= 'left' style={{ height: 700 }}>
          { isRoot &&<TabPane tab='Create Admin' key={1}>
            <CreateNewAdmin/>
          </TabPane>}
          <TabPane tab='Profile' key={2}>
            <Profile/>
          </TabPane>
          <TabPane tab='Teacher' key={3}>
            <Teachers/>
          </TabPane>
          <TabPane tab='Students' key={4}>
            <Students/>
          </TabPane>
          <TabPane tab='Skills' key={5}>
            <Skills/>
          </TabPane>
          <TabPane tab='Contracts' key={6}>
            <Contracts/>
          </TabPane>
          <TabPane tab='Reports' key={7}>
            <Reports/>
          </TabPane>
          <TabPane tab='Income Chart' key={8}>
            <IncomeChart/>
          </TabPane>
          <TabPane tab='Top Teacher Income' key={9}>
            <TopTeacherIncome/>
          </TabPane>
          <TabPane tab='Top Skill Income' key={10}>
            <TopSkillIncome/>
          </TabPane>
      </Tabs>
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


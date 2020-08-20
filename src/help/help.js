import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import HelpIndex from './contentComponents/helpIndex'
import AccountManagementHelp from './contentComponents/accountManagementHelp'
import EditUserPrivilegeHelp from './contentComponents/editUserPrivilegeHelp'
import UserRolesHelp from './contentComponents/userRolesHelp'
import ManagingQuizzesHelp from './contentComponents/managingQuizzesHelp'
import FindingQuizzesHelp from './contentComponents/findingQuizzesHelp'
import TakingQuizzesHelp from './contentComponents/takingQuizzesHelp'
import history from '../history'

import '../stylesheets/help.css'

class Help extends React.Component {
  render(){
    return(
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route path="/help" exact render={() => <HelpIndex />} />
            <Route path="/help/accountManagementHelp" render={() => <AccountManagementHelp />} />
            <Route path="/help/editingUserPrivilegesHelp" render={() => <EditUserPrivilegeHelp />} />
            <Route path="/help/userRolesHelp" render={() => <UserRolesHelp />} />
            <Route path="/help/managingQuizzesHelp" render={() => <ManagingQuizzesHelp />} />
            <Route path="/help/findingQuizzesHelp" render={() => <FindingQuizzesHelp />} />
            <Route path="/help/takingQuizzesHelp" render={() => <TakingQuizzesHelp />} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default Help;

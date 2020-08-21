import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from './sideBar'

class FindingQuizzesHelp extends React.Component {
  render(){
    return(
      <div className="componentContainer-alt">

          <div className="helpSideBar">
            <SideBar />
          </div>
          <div className="helpContent">
            <div className="title-large-spaced">Finding quizzes</div>
            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold"></div>
              <div className="">
                In order to find quizzes, users have a number of options the first is to use the quiz search page.
              </div>
              <ol>
                <li>Click on the quiz search option in the nav bar drop down menu</li>
                <li>This will take you to the quiz search page where you can perform a search by either name or category.</li>
              </ol>
            </div>

            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold">Quiz search</div>
              <div className="">
              </div>
              <ol>
                <li>
                  To search by name you will need to know the name of the quiz.  Enter it in the name field and click search.
                </li>
                <li>
                  To search by category, simply select a category form the drop down list and click search.
                </li>
                <li>
                  The results will render below the search sections.  Each quiz will be displayed, providing the name,
                  description and options.
                </li>
                <li>
                  You can click a quiz’s <Link to="/help/managingQuizzesHelp" className="helpLinkStandard">edit</Link> button to be taken to that quiz’s edit page or you can
                  directly <Link to="/help/managingQuizzesHelp" className="helpLinkStandard">delete</Link> the quiz.  Where a quiz has been marked as ready, there will be
                  an extra option allowing users to <Link to="/help/takingQuizzesHelp" className="helpLinkStandard">take the quiz</Link>.
                </li>
              </ol>

            </div>

            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold">Browse quizzes</div>
              <div className="">
                Another option is to use the Browse quizzes page which will let you browse through all available quizzes per category.
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default FindingQuizzesHelp

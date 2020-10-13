import React from 'react'
import { bookmarkList } from './bookmarksList'

const Bookmarks = (props) => {

  const renderBookmarkList = () => {
    const bookmarks = Object.entries(bookmarkList[props.page])
    let list = bookmarks.map(bookmark => {
      return(
        <li key={`bookmark-${bookmarks.indexOf(bookmark)}`}>
          <a href={`#${bookmark[0]}`} className="linkStandard">{bookmark[1]}</a>
        </li>
      );
    })
    return list
  }

  return(
    <div className="bookmarksContainer">
      <div className="title-medium-left-alt bold"><i className="far fa-bookmark"></i> Bookmarks</div>
      <ol>
        {renderBookmarkList()}
      </ol>
    </div>
  );
}

export default Bookmarks

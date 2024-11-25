import React from "react";
import Template from "../template/Template";
import Post from "../pages/Post";
// import Post from "../template/Post";
export default class WithCommentTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { id: 1, title: " Mushroom" },
        { id: 2, title: " JellyFish" },
        { id: 3, title: " Butterfly" },
        { id: 4, title: " flower" },
      ],

      postId: null,
    };
  }

  render() {
    return (
      <Template id="comment-main-div" title="show post with comment">
        <ul className="commnet-ul">
          {this.state.list.map((li) => {
            return (
              <li
                key={li.id}
                className="comment-li"
                onClick={() => {
                  this.setState({ postId: li.id });
                }}
              >
                <i className="bi bi-arrow-down-circle">{li.title}</i>
              </li>
            );
          })}
        </ul>

        <Post postId={this.state.postId} />
      </Template>
    );
  }
}

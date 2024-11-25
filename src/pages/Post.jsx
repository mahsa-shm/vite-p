import React from "react";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }
  componentDidMount() {
    // console.log("did mount");
    fetch(
      `https://gist.githubusercontent.com/mahsa-shm/0550a91d5f73e28e098f51eafaa004f5/raw/70335f8efcbc9363a03c46867f32fb8334923d3c/myData.json`
    )
      .then((response) => response.json())
      .then((result) => {
        const post = result.datas.find((p) => p["id"] === this.props.postId);
        this.setState({
          post: post,
        });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.postId !== this.props.postId) {
      // console.log("did mount");
      fetch(
        `https://gist.githubusercontent.com/mahsa-shm/0550a91d5f73e28e098f51eafaa004f5/raw/70335f8efcbc9363a03c46867f32fb8334923d3c/myData.json`
      )
        .then((response) => response.json())
        .then((result) => {
          const post = result.datas.find((p) => p["id"] === this.props.postId);
          this.setState({
            post: post,
          });
        });
    }
  }
  render() {
    return (
      <>
        {this.state.post && (
          <div className="comment-post">
            <img src={this.state.post.imgSrc} />
            <h2>{this.state.post.title}</h2>
            <p>{this.state.post.description}</p>
            <div className="Comment-sec">
              <div className="comment-sec-little">
                {this.state.post.comments.map((a) => (
                  <section>{a.text}</section>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

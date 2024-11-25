import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Template from "../template/Template";

export default class ComponentDidUpdateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPost: 1,
      links: [
        { id: 1, title: " Post 1" },
        { id: 2, title: " Post 2" },
        { id: 3, title: " Post 3" },
        { id: 4, title: " Post 4" },
      ],
    };
  }
  render() {
    // console.log("first function")
    return (
      <>
        <Template title="change post by using componentDidUpdate">
          <div className="didUpdate-list">
            {this.state.links.map((link) => {
              return (
                <section
                  key={link.id}
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      currentPost: link.id,
                    });
                  }}
                >
                  <i className="bi bi-file-earmark-richtext">{link.title}</i>
                </section>
              );
            })}
          </div>
          <MyPost currentPost={this.state.currentPost}></MyPost>
        </Template>
      </>
    );
  }
}

class MyPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPost: null,
    };
  }
  componentDidMount() {
    // console.log("did mount");
    fetch(
      `https://gist.githubusercontent.com/mahsa-shm/0550a91d5f73e28e098f51eafaa004f5/raw/c57ea4ffc843a24addda89353a0af5c528fd218a/myData.json`
    )
      .then((response) => response.json())
      .then((result) => {
        const post = result.datas.find(
          (p) => p["id"] === this.props.currentPost
        );
        this.setState({
          myPost: post,
        });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("did update");

    if (prevProps.currentPost !== this.props.currentPost) {
      fetch(
        `https://gist.githubusercontent.com/mahsa-shm/0550a91d5f73e28e098f51eafaa004f5/raw/c57ea4ffc843a24addda89353a0af5c528fd218a/myData.json`
      )
        .then((response) => response.json())
        .then((result) => {
          const post = result.datas.find(
            (p) => p["id"] === this.props.currentPost
          );
          this.setState({
            myPost: post,
          });
        });
    }
  }

  render() {
    
    return (
      <>
        {this.state.myPost && (
          <div className="little-div">
            <img src={this.state.myPost.imgSrc} alt="" />
            <h2>{this.state.myPost.title}</h2>
            <p>{this.state.myPost.description}</p>
            <button className="more-info-button">more information ...</button>
          </div>
        )}
      </>
    );
  }
}


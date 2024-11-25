import React, { useEffect, useState } from "react";
import Template from "../template/Template";
import { renderToStaticMarkup } from "react-dom/server";
export default class ComponentDidMountTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }
  componentDidMount() {
    console.log("didMount");
    fetch(
      `https://gist.githubusercontent.com/mahsa-shm/0550a91d5f73e28e098f51eafaa004f5/raw/c57ea4ffc843a24addda89353a0af5c528fd218a/myData.json`
    )
      .then((response) => response.json())

      .then((result) => {
        const data = result.datas;
        this.setState({ posts: data, loading: false });
      });
  }
  render() {
    return (
      <Template title="Get post in componentDidMount">
        {
          <>
            {this.state.loading ? (
              <div className="loading">Loading ...</div>
            ) : (
              this.state.posts && (
                <div className="didMount-div">
                  {this.state.posts.map((e) => (
                    <div key={e.id} className="section">
                      <img src={e.imgSrc} alt="" />
                      <h3>{e.title}</h3>
                      <p>{e.description}</p>
                    </div>
                  ))}
                </div>
              )
            )}
          </>
        }
      </Template>
    );
  }
}

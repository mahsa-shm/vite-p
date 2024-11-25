export default class ComponentDidUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPost: 2,
      links: [
        {
          id: 1,
          title: "Show Post 1",
        },
        {
          id: 2,
          title: "Show Post 2",
        },
        {
          id: 3,
          title: "Show Post 3",
        },
        {
          id: 4,
          title: "Show Post 4",
        },
      ],
    };
  }

  render() {
    return (
      <Template
        title="change post by using componentDidUpdate"
        tooltip="با کلیک کردن روی لینک ها پست مربوطه نمایش داده شود و زمانی که روی یک لینک دیگر کلیک کردید از طریق componentDidUpdate بررسی کنید که اگر id پست تغییر کرد ، پست جدید را نمایش دهد و زمانی که روی more information کلیک کردید به صفحه مربوط به همان پست بروید . اگر نتونستید روتینگ را پیاده سازی کنید یا پیاده سازی کردید و درست کار نمی کرد هیچ ایرادی ندارد !"
      >
        <section id="did-update">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-3 d-flex align-items-center justify-content-center">
                <div className="trigger d-flex flex-wrap flex-row flex-lg-column justify-content-center">
                  {this.state.links.map((link) => {
                    return (
                      <a
                        href=""
                        className="mx-1 mx-lg-0"
                        key={link.id}
                        onClick={(e) => {
                          e.preventDefault();
                          this.setState({
                            currentPost: link.id,
                          });
                        }}
                      >
                        <i class="fa-solid fa-file-lines mx-2"></i>
                        {link.title}
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="col-12 col-lg-9">
                <Post currentPost={this.state.currentPost} />
              </div>
            </div>
          </div>
        </section>
      </Template>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    };
  }

  componentDidMount() {
    fetch(
      `https://gist.githubusercontent.com/mahsa-shm/0550a91d5f73e28e098f51eafaa004f5/raw/9b3dc5db743963270d4ceee6d5c49391bb2b332c/myData.json`
    )
      .then((response) => response.json())
      .then((result) => {
        const post = result.datas.find(
          (post) => post["id"] === this.props.currentPost
        );
        this.setState({
          posts: post,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentPost !== this.props.currentPost) {
      fetch(
        `https://gist.githubusercontent.com/mahsa-shm/0550a91d5f73e28e098f51eafaa004f5/raw/9b3dc5db743963270d4ceee6d5c49391bb2b332c/myData.json`
      )
        .then((response) => response.json())
        .then((result) => {
          const post = result.datas.find(
            (post) => post["id"] === this.props.currentPost
          );
          this.setState({
            posts: post,
          });
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.posts && (
          <div className="little-div">
            <img src={this.state.posts.imgSrc} alt="" />
            <h2>{this.state.posts.title}</h2>
            <p>{this.state.posts.description}</p>
            <button className="more-info-button">more information ...</button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

import React from 'react';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      username: ''
    }
  }

  componentDidMount() {
    this.getUser();
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  getUser = async () => {
    try {
      if (this.props.blog.user && this.props.blog.user.name) {
        this.setState({
          username: this.props.blog.user.name
        })
      }
      else if (this.props.blog.user) {    // Necessary, because after like action only the user ID is returned
        const foundUser = await this.props.getUserById(this.props.blog.user);
        this.setState({
          username: foundUser.name
        })
      }
      else {
        this.setState({
          username: 'Anonymous'
        })
      }
    }
    catch (exception) {
      console.log(exception);
    }
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 5,
      paddingBottom: 10,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          <div onClick={this.toggleVisibility}>
            {this.props.blog.title} {this.props.blog.author}
          </div>
        </div>
        <div style={showWhenVisible}>
          <div onClick={this.toggleVisibility}>
            {this.props.blog.title} by {this.props.blog.author} <br />
            {this.props.blog.url} <br />
            {this.props.blog.likes} <button onClick={() => this.props.updateLikes(this.props.blog._id) }>Like</button> <br />
            Added by {this.state.username}
          </div>
        </div>
      </div>
    )
  }
}

export default Blog;
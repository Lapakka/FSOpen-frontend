import React from 'react';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
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
            {this.props.blog.title} {this.props.blog.author} <br />
            {this.props.blog.url} <br />
            {this.props.blog.likes} <button onClick={() => this.props.updateLikes(this.props.blog._id) }>Like</button> <br />
            Added by TODO
          </div>
        </div>
      </div>
    )
  }
}

export default Blog;
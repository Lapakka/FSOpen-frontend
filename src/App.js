import React from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import CreatePostForm from './components/CreatePostForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import userService from './services/users';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      notification: null,
      notificationType: '',
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: ''
    };
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    );
    const loggedUser = window.localStorage.getItem('loggedInUser');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      this.setState({
        user: parsedUser
      });
      blogService.setToken(parsedUser.token);
    }
  }

  login = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      this.setState({ 
        username:'', 
        password:'',
        user
      });

    } catch (exception) {
      this.setState({ 
        notification: 'Invalid username or password',
        notificationType: 'error'
      });
      setTimeout(() => {
        this.setState({
          notification: null,
          notificationType: ''
        })
      }, 5000);
    }
  }

  logout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser');
    this.setState({ 
      user: null 
    });
  }

  newPost = async (event) => {  // TODO: validation
    try {
      event.preventDefault();
      const newPost = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
        likes: 0
      }
      const createdPost = await blogService.create(newPost);
      this.setState({ 
        blogs: this.state.blogs.concat(createdPost),
        title: '',
        author: '',
        url: '',
        notification: `Created post ${this.state.title}`,
        notificationType: 'success'
      });
      setTimeout(() => {
        this.setState({ 
          notification: null,
          notificationType: ''
        });
      }, 5000);
    } catch (exception) {
      this.setState({ 
        notification: 'Invalid input',
        notificationType: 'error'
      });
      setTimeout(() => {
        this.setState({ 
          notification: null,
          notificationType: ''
        });
      }, 5000);
    }
  }

  updateLikes = async (id) => {
      try {
        const oldBlog = this.state.blogs.find(b => b._id === id);
        console.log(oldBlog.user)
        const updatedBlog = { ...oldBlog, likes: oldBlog.likes+1 };
        const likedBlog = await blogService.update(id, updatedBlog);
        const blogs = this.state.blogs.filter(b => b._id !== id);    // Filter out the old version of the blog item
        this.setState({
          blogs: blogs.concat(likedBlog)
        });
      } 
      catch (exception) {
        this.setState({ 
          notification: 'Blog item not found',
          notificationType: 'error'
        });
        setTimeout(() => {
          this.setState({ 
            notification: null,
            notificationType: ''
          });
        }, 5000);
      }
  }

  getUserById = async (id) => {
    const identifiedUser = await userService.getById(id);
    console.log(identifiedUser, 'köfk')
    return identifiedUser;
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
        <h2>Log in</h2>
        <Notification 
          message={this.state.notification} 
          type={this.state.notificationType}
        />
        <Togglable buttonLabel="Login">
          <LoginForm 
            handleSubmit={this.login}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleFieldChange}
          />
        </Togglable>
      </div>
    );
  }
    return (
        <div>
          <h2>blogs</h2>
          <p>Logged in as {this.state.user.name}</p>
          <button onClick={this.logout}>Logout</button>
          <h3>Create new post</h3>
          <Notification 
            message={this.state.notification} 
            type={this.state.notificationType}
          />
          <CreatePostForm 
            newPost={this.newPost}
            title={this.state.title}
            handleFieldChange={this.handleFieldChange}
            author={this.state.author}
            url={this.state.url}
          />
          {this.state.blogs.map(blog => 
            <Blog 
              key={blog._id} 
              blog={blog}
              updateLikes={this.updateLikes}
              getUserById={this.getUserById}
            />
          )}
        </div>
      );
  }
}

export default App;

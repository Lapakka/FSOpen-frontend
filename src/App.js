import React from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import CreatePostForm from './components/CreatePostForm';
import blogService from './services/blogs';
import loginService from './services/login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      error: null,
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
        error: 'Invalid username or password' 
      });
      setTimeout(() => {
        this.setState({
          error: null
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
        url: ''
      });
    } catch (exception) {
      this.setState({ 
        error: 'Invalid input' 
      });
      setTimeout(() => {
        this.setState({ 
          error: null 
        });
      }, 5000);
    }

  }

  handleFieldChange = (name) => (event) => {  // Which is better?
    this.setState({ [name]: event.target.value });
  }

  handleFieldsChange = (event) => {           // Which is better?
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {      // TODO: Notification component
    if (this.state.user === null) {
      return (
        <div>
        <h2>Log in</h2>
        {this.state.error !== null ? <p>{this.state.error}</p> : null }
        <LoginForm 
          login={this.login}
          username={this.state.username}
          password={this.state.password}
          handleNameChange={this.handleFieldChange("username")}
          handlePasswordChange={this.handleFieldChange("password")}
        />
      </div>
    );
  }
    return (
        <div>
          <h2>blogs</h2>
          <p>Logged in as {this.state.user.name}</p>
          <button onClick={this.logout}>Logout</button>
          <h3>Create new post</h3>
          <CreatePostForm 
            newPost={this.newPost}
            title={this.state.title}
            handleFieldChange={this.handleFieldsChange}
            author={this.state.author}
            url={this.state.url}
          />
          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog}/>
          )}
        </div>
      );
  }
}

export default App;

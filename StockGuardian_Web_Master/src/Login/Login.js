import { Component, React } from "react";

// function Login() {
//     return (
//         <form>
//             <label>UserName</label>
//             <input type='text' name='username' />
//         </form>
//     )
// }

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }; //initial state of the component

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form>
        <div>
          <label>UserName</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

export default Login;

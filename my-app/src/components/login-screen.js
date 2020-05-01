import React, { Component } from 'react'; // every react component needs this line
import axios from 'axios';

export default class LoginScreen extends Component {

    constructor(props){
        super(props); // in js, always need to call super when defining a constructor of a subclass

        // sets "this" to the current class for the current class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // starting state of this class
        // state is how you create variables in react
        this.state = {
            username: '',
            password: '',
            email: ''
        }
    }

    onChangeUsername(e){
        this.setState({ // this refers to the class 
            username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    // when someone clicks the submit button
    onSubmit(e) {
        e.preventDefault(); // won't do what it was originally programmed to do

        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }

        console.log(user);

        // sending the data to the backend
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        // resets the username to empty
        this.setState({
            username: '',
            password: '',
            email: ''
        })

        window.location = '/list'; // takes the user back to the list of exercieses
    }

    render() {
        return (
            <div>
                <h1 align="center">Persosnal Trainer Setup</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className = "form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            required
                            className = "form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            required
                            className = "form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
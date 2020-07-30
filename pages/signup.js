import React from 'react';
import axios from 'axios';
import Router from 'next/router';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: "",
            errorMessage: null,
        }
    }

    onChange = (field, e) => {
        this.setState({
            [field]: e.target.value
        })
    }

    onSubmit = async () => {
        try {
            const loginQuery = await axios({
                url: 'http://localhost:3000/graphql',
                method: 'POST',
                data: {
                    query: `
                        mutation signup($username: String, $password: String, $email: String) {
                            register(user: {
                                username: $username,
                                password: $password,
                                email: $email
                            }) {
                                username
                                password
                                email
                        }
                    }`,
                    variables: {
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email
                    }
                }
            })
            if (loginQuery.data.data.register) {
                Router.push('/login')
            } else {
                this.setState({ errorMessage: "Register Failed! Please Try again." })
            }
        } catch (err) {
            this.setState({ errorMessage: "Register Failed! Please Try again." })
            console.log(err);
        }
    }

    render = () => {
        const { username, password, email, errorMessage } = this.state;

        return (
            <div>
                <span>Username: </span> <input type="text" value={username} onChange={e => this.onChange('username', e)} />
                <br />
                <br />
                <span>Email: </span> <input type="text" value={email} onChange={e => this.onChange('email', e)} />
                <br />
                <br />
                <span>Password: </span> <input type="text" value={password} onChange={e => this.onChange('password', e)} />
                <br />
                <br />
                <button onClick={this.onSubmit}>Register</button>
                <br />
                <br />
                <p style={{ color: "red" }}>{errorMessage ? errorMessage : null}</p>
            </div>
        );
    }
}
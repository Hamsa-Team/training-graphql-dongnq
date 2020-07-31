import React from 'react';
import axios from 'axios';
import Router from 'next/router';
import constants from "../core/constants";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const LOGIN_MUTATION = gql`
                mutation login($username: String, $password: String) {
                            login(user: {
                                username: $username,
                                password: $password
                            }) {
                                username
                                password
                        }
                    }
`;

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
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
                url: constants.GRAPHQL_URL,
                method: 'POST',
                data: {
                    query: `
                        mutation login($username: String, $password: String) {
                            login(user: {
                                username: $username,
                                password: $password
                            }) {
                                username
                                password
                        }
                    }`,
                    variables: {
                        username: this.state.username,
                        password: this.state.password
                    }
                }
            })
            if (loginQuery.data.data.login) {
                Router.push('/employeesList')
            } else {
                this.setState({ errorMessage: "Login Failed! Please Try again." })
            }
        } catch (err) {
            this.setState({ errorMessage: "Login Failed! Please Try again." })
            console.log(err);
        }
    }

    render = () => {
        const { username, password, errorMessage } = this.state;

        return <Mutation mutation={LOGIN_MUTATION}>
            {
                (onSubmit, { loading, error, data }) => {
                    return (
                        <from
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit({ variables: { username: username, password: password } })
                            }}
                        >
                            <span>Username: </span> <input type="text" value={username} onChange={e => this.onChange('username', e)} />
                            <br />
                            <br />
                            <span>Password: </span> <input type="text" value={password} onChange={e => this.onChange('password', e)} />
                            <br />
                            <br />
                            <button type="submit">Login</button>
                            <br />
                            <br />
                            <p style={{ color: "red" }}>{errorMessage ? errorMessage : null}</p>
                        </from>
                    )
                }
            }
        </Mutation>
    }
}
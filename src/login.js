import React from "react";
import { Form, Button, FormGroup, Input, Label, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            error: null,
            isLoading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async handleSubmit(e) {
        e.preventDefault()
        this.setState({ error: null })
        this.setState({ password: e.target.password.value })
        this.setState({ isLoading: true })
        await fetch(`https://ancient-fjord-12179.herokuapp.com/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "password": this.state.password })
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                console.log("hello")
                throw new Error("Access Denied! Invalid Password!")
            }
        }).then((result) => {
            console.log(result)
            if (result.access) {
                this.props.setToken(result.access)
            } else {
                this.props.setToken(null)
            }
        }).catch((err) => {
            this.setState({ error: err })
            this.props.setToken(null)
        }).catch((err) => {
            this.setState({ error: err })
            this.props.setToken(null)
        })
        this.setState({ isLoading: false })
    }
    handleChange(e) {
        this.setState({ password: e.target.value })
    }
    render() {
        let button;
        if (this.state.isLoading) {
            button = <Spinner children={false} />
        } else {
            button = <Button type="submit">Submit</Button>
        }
        return (
            <div className="App">
                <header className="App-header">
                    <h2>BTN710 - Demo</h2>
                </header>
                <div className="container">
                    <h3 style={{ textAlign: "center" }}>Please enter password to access the website</h3>
                    <div className="form">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup className="form-group">
                                <Label>password:</Label>
                                <Input type="password" name="password" id="password" placeholder="enter password" onChange={this.handleChange} />
                                {this.state.error &&
                                    <span className="error-message">Invalid Password! Please Try Again!</span>}
                                <span style={{ width: "79px" }}>
                                    {button}
                                </span>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
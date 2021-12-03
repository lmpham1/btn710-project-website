import React from "react"
import { Button, Form, FormGroup, Input, Label, Spinner, Table } from "reactstrap";

export default class DemoPatched extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            documents: null,
            search: "",
            submitDisabled: true,
            isLoading: false,
            error: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleTermChange(e) {
        e.persist();
        this.setState({ search: e.target.value }, () => {
            if (/^[^\;\-\"\?\!\$\\]+$/.test(this.state.search)) {
                this.setState({ submitDisabled: false })
            } else {
                this.setState({ submitDisabled: true })
                if (this.state.search.length === 0)
                    this.setState({ error: null })
                else this.setState({ error: "Your search term contains invalid characters!" })
            }
        });
    }

    handleEnter(e) {
        if (e.key === 13) {
            e.preventDefault();
            this.handleSearch(e);
        }
    }

    async handleSearch(e) {
        this.setState({ search: e.target.search.value })
        let search = this.state.search.toLowerCase();
        console.log(search)
        this.setState({ isLoading: true, error: null, documents: null })
        await fetch(`https://ancient-fjord-12179.herokuapp.com/search?search=${search}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "access": this.props.token })
        }).then(async response => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 401 || response.status === 404) {
                let errorMessage = await response.text()
                throw new Error(errorMessage)
            }
        }).then(result => {
            this.setState({ documents: result })
        }).catch(err => {
            this.setState({ error: err.message })
        })
        this.setState({ isLoading: false })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleSearch(e);
    }

    render() {
        let button
        if (this.state.isLoading) {
            button = <Spinner children={false} />
        } else {
            button = <Button type="submit" disabled={this.state.submitDisabled}>Search</Button>
        }
        return (
            <div className="container">
                <div className="hint-container">
                    <div className="hint">
                        <p><b>Demo Hint:</b> This is the patched version, where there are protection methods in place such as input sanitization, escape special characters and parameterized queries. Injection statements such as the following:</p>
                        <p><code>week5' union (select 1, TABLE_NAME, TABLE_SCHEMA, 1 from INFORMATION_SCHEMA.TABLES);--</code></p>
                        <p>won't work anymore. You can enter "week3" or "week5" to get valid results</p>
                    </div>
                </div>
                <h1>Employee Portal</h1>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Search Documents:</Label>
                        <Input onChange={this.handleTermChange} onKeyDown={this.handleEnter} className="search-bar" type="text" name="search" id="search" placeholder="Enter name of document(s)" />
                    </FormGroup>
                    {button}
                </Form>
                {this.state.error &&
                    <p className="search-error">{this.state.error}</p>
                }
                {this.state.documents &&
                    <Table style={{ marginTop: "80px" }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Document Name</th>
                                <th>Document Type</th>
                                <th>Document Date</th>
                            </tr>
                        </thead>
                        <TableRows documents={this.state.documents}></TableRows>
                    </Table>
                }
            </div>
        )
    }
}

function TableRows(props) {
    let rows = props.documents.map((doc, index) => {
        return (
            <tr>
                <td>{doc.doc_id}</td>
                <td>{doc.doc_name}</td>
                <td>{doc.doc_type}</td>
                <td>{doc.doc_date}</td>
            </tr>
        )
    })
    return (
        <tbody>
            {rows}
        </tbody>
    )
}
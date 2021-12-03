import React from "react"
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Table } from "reactstrap";

export default class DemoVulnerable extends React.Component {
    constructor() {
        super()
        this.state = {
            documents: null,
            search: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleTermChange(e) {
        this.setState({ search: e.target.value });
        console.log(this.state.search);
    }

    handleEnter(e) {
        if (e.key === 13) {
            e.preventDefault();
            this.handleSearch(e);
        }
    }

    handleSearch(e) {
        this.setState({ search: e.target.search.value })
        let search = this.state.search.toLowerCase();
        let docs1 = [
            {
                doc_id: 12,
                doc_name: "week5_report.pdf",
                doc_type: "report",
                doc_date: "01/05/2003"
            },
            {
                doc_id: 23,
                doc_name: "week5_stats.xls",
                doc_type: "statistics",
                doc_date: "01/05/2003"
            },
            {
                doc_id: 1,
                doc_name: "EMPLOYEES",
                doc_type: "prod",
                doc_date: "1"
            },
            {
                doc_id: 1,
                doc_name: "DOCUMENTS",
                doc_type: "prod",
                doc_date: "1"
            }
        ];
        let docs2 = [
            {
                doc_id: 3,
                doc_name: "week3_report.pdf",
                doc_type: "report",
                doc_date: "01/02/2003"
            },
            {
                doc_id: 5,
                doc_name: "week3_stats.xls",
                doc_type: "statistics",
                doc_date: "01/02/2003"
            },
            {
                doc_id: 3,
                doc_name: "week3_expenses.pdf",
                doc_type: "finance",
                doc_date: "01/02/2003"
            },
            {
                doc_id: 3,
                doc_name: "week30_report.pdf",
                doc_type: "report",
                doc_date: "01/02/2003"
            }
        ];
        let docs3 = [
            {
                doc_id: 12,
                doc_name: "week5_report.pdf",
                doc_type: "report",
                doc_date: "01/05/2003"
            },
            {
                doc_id: 23,
                doc_name: "week5_stats.xls",
                doc_type: "statistics",
                doc_date: "01/05/2003"
            },
            {
                doc_id: 1,
                doc_name: "emp_id",
                doc_type: "1",
                doc_date: "1"
            },
            {
                doc_id: 1,
                doc_name: "emp_username",
                doc_type: "1",
                doc_date: "1"
            },
            {
                doc_id: 1,
                doc_name: "emp_password",
                doc_type: "1",
                doc_date: "1"
            },
            {
                doc_id: 1,
                doc_name: "emp_role",
                doc_type: "1",
                doc_date: "1"
            }
        ];
        let docs4 = [
            {
                doc_id: 12,
                doc_name: "week5_report.pdf",
                doc_type: "report",
                doc_date: "01/05/2003"
            },
            {
                doc_id: 23,
                doc_name: "week5_stats.xls",
                doc_type: "statistics",
                doc_date: "01/05/2003"
            },
            {
                doc_id: 1,
                doc_name: "lorem",
                doc_type: "h3nhjkjk51nm",
                doc_date: "admin"
            },
            {
                doc_id: 2,
                doc_name: "jane_doe",
                doc_type: "h3nhjkjk51nm",
                doc_date: "moderator"
            },
            {
                doc_id: 3,
                doc_name: "jon_snow",
                doc_type: "vhl7knh%nmsa",
                doc_date: "user"
            },
            {
                doc_id: 4,
                doc_name: "jeong_kim",
                doc_type: "bs!32f2q^ggw41",
                doc_date: "user"
            }
        ];
        if (search === "week3") {
            this.setState({ documents: docs2 })
        } else if (search.includes(".tables")) {
            this.setState({ documents: docs1 })
        } else if (search.includes(".columns")) {
            this.setState({ documents: docs3 })
        } else if (search.includes("prod.employees")) {
            this.setState({ documents: docs4 })
        } else if (search === "week5") {
            this.setState({ documents: docs4.slice(0, 2) })
        } else this.setState({ documents: null })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleSearch(e);
    }

    render() {
        return (
            <div className="container">
                <div className="hint-container">
                    <div className="hint">
                        <p><b>Demo Hint:</b> This is the unpatched/vulnerable version of the website (for demonstration purpose). Malicious SQL scripts like:</p>
                        <p><code>week5' union (select emp_id, emp_username, emp_password, emp_role from prod.employees);--</code></p>
                        <p>can be injected to extract unauthorized data. For the patched demo website, please checkout <button value="2" onClick={this.props.toggleVersion}>the patched version</button>.</p>
                    </div>
                </div>
                <h1>Employee Portal</h1>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Search Documents:</Label>
                        <Input onChange={this.handleTermChange} onKeyDown={this.handleEnter} className="search-bar" type="text" name="search" id="search" placeholder="Enter name of document(s)" />
                    </FormGroup>
                    <Button type="submit">Search</Button>
                </Form>
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
import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const basename = this.props.basename;
        return (
            <div className="container">
                <h1>Home Page</h1>
                <div className="contents">
                    <center>This is group 6's website for our BTN710 project</center>
                    <center>Author: Le Minh Pham, Kash Faeghi</center>
                    <div className="home-btn-container">
                        <ul>
                            <li className="home-btn"><Link to={basename + "/report"}>Project Report</Link></li>
                            <li className="home-btn"><Link to={basename + "/presentation"}>Presentation</Link></li>
                            <li className="home-btn"><Link to={basename + "/demo"}>Demo Site</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
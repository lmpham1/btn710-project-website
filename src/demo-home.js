import React from "react"
import { Button } from "reactstrap";
import DemoPatched from "./demo-patched";
import DemoVulnerable from "./demo-vulnerable";

export default class DemoHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            version: 1
        }
        console.log(this.props.token)
        this.toggleVersion = this.toggleVersion.bind(this)
    }

    toggleVersion(e) {
        e.preventDefault();
        let version = parseInt(e.target.value)
        this.setState({ version: version })
    }

    render() {
        let demoVersion;
        if (this.state.version === 1) {
            demoVersion = <DemoVulnerable toggleVersion={this.toggleVersion} />
        } else if (this.state.version === 2) {
            demoVersion = <DemoPatched token={this.props.token} />
        }
        return (
            <div className="demo-container">
                <div className="version-btn-container">
                    <ul>
                        <li className={`${this.state.version === 1 ? 'link-active' : ''}`}><Button value="1" onClick={this.toggleVersion}>Vulnerable Version</Button></li>
                        <li className={`${this.state.version === 2 ? 'link-active' : ''}`}><Button value="2" onClick={this.toggleVersion}>Patched Version</Button></li>
                    </ul>
                </div>
                {demoVersion}
            </div>
        )
    }
}
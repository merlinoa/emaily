import React from 'react'
import { connect } from 'react-redux'

class Header extends React.Component {
    
    renderContent() {
        switch(this.props.auth) {
            case null:
                return ""
            case false:
                return <a href="/auth/google">Login</a>
            default:
                return "Logged In"
        }
             
    }
    
    render() {
        console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper container">
                    <a href="/" className="brand-logo">Logo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>{this.renderContent()}</li>
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Header)

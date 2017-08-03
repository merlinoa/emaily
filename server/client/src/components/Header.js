import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    
    renderContent() {
        const auth = this.props.auth
        switch(auth) {
            case null:
                return ""
            case false:
                return <a href="/auth/google">Login</a>
            default:
                return <a href="/api/logout">Logout</a>
        }
    }
    
    render() {
        const auth = this.props.auth
        return (
            <nav>
                <div className="nav-wrapper container">
                    <Link 
                        to={auth ? "/surveys" : "/"} 
                        className="brand-logo">
                        Emaily
                    </Link>
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

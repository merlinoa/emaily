import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends React.Component {
    
    renderContent() {
        const auth = this.props.auth
        switch(auth) {
            case null:
                return ""
            case false:
                return <li><a href="/auth/google">Login</a></li>
            default:
                return [
                    <li key={1}><Payments /></li>,
                    <li key={3} style={{ margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key={2}><a href="/api/logout">Logout</a></li>
                ]
                    
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
                        {this.renderContent()}
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

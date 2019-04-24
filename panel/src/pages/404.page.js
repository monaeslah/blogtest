import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class NotFoundPage extends Component {
    render() {
        return (
            <header className="App-header">
                <p>
                    404 / not found
                </p>
                <Link to="login" className="App-link">Login</Link>
            </header>
        )
    }
}

export {NotFoundPage}
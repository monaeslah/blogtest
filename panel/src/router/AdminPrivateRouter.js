import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import Axios from 'axios';

export default class AdminPrivateRouter extends Component{
    constructor(props) {
        super(props);
        this.state={
            isAllow: !!localStorage.adminLoginData,
            isRequest: !!localStorage.adminLoginData,
        }
        if (localStorage.adminLoginData) {
            const data = JSON.parse(localStorage.adminLoginData);
            Axios.post('//localhost:3000/signin',data)
            .then(response=>{
                this.setState({
                    isAllow : response.data.success,
                    isRequest : false
                })
            })
        }
    }

    render() {
        const {path,component} = this.props;
        const {isAllow,isRequest} = this.state;
        if (isRequest) {
            return 
        }
        if (isAllow){
            return <Route path={path} component={component}/>
        }
        return <Redirect to="login"/>
    }
}
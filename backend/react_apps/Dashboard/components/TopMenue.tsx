import React from 'react'
import { Link } from 'react-router-dom';
import { Routes } from '../utility/Urls'
import { Api } from '../utility/Urls'
import { logError } from '../utility/helpers'
import axios from 'axios';

function AuthComponent(props) {

    async function isLoggedIn() {
        try {
            // axios.defaults.headers.common['Accept'] = 'application/json';
            const response = await Api.fetchAdmin()
            props.refreshUser(response.data)
            // console.log('/api/user',response.data)
        } catch (error) {
            console.log('isLoggedIn: false');
            props.refreshUser(null)
            logError(error)
        }
    }

    async function logout() {
        try {
            const response = await axios.delete(Api.logoutAdmin)
            // console.log('logout', (response.data));
            props.refreshUser(null)
        } catch (error) {
            logError(error)
        }
    }

    React.useEffect(() => {
        if (props.user == null)
            isLoggedIn()
        // console.log('top menue', props.user)
    }, [props.user])

    return (
        <>
            {
                props.user ? (
                    <>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {props.user.name}
                            </a>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" onClick={logout}>
                                    {'تسجيل الخروج'}
                                </a>
                            </div>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <AllowedLink hide={true} className="nav-link mx-2" to={Routes.LoginPageScreen()}>{'تسجيل الدخول'}</AllowedLink>
                        </li >

                        {/* <li className="nav-item">
                            <a className="nav-link mx-2" href="{{ route('register') }}">{'تسجيل'}</a>
                        </li> */}
                    </>
                )
            }

        </>
    )
}


import AllowedLink from './AllowedLink';
import {
    FaUserCheck,
} from 'react-icons/fa'


function TopMenue(props) {
    const allowedRoutes = props.allowedRoutes

    


    return (
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <AllowedLink hide={true} className="navbar-brand" to={Routes.dashboard()}>لوحة تحكم التطبيق</AllowedLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">

                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <AuthComponent {...props} />
                    </ul>

                </div>


            </div>
        </nav>
    )
}

import { refreshUser } from '../redux/stateActions'
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        user: state.state.user,
        allowedRoutes: state.state.allowedRoutes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshUser: (user) => dispatch(refreshUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue)
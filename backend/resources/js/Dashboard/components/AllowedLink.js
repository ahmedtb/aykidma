import React from 'react'
import { Link } from 'react-router-dom'
// import { matchPath } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import pathInRoutes from '../utility/pathInRoutes'

function AllowedLink(props) {
    const to = props.to
    const children = props.children
    const className = props.className
    const target = props.target

    const displayChildrenOnly = props.displayChildrenOnly
    const container = props.container

    const allowedRoutes = props.allowedRoutes

    return !pathInRoutes(allowedRoutes, to) ? (
        displayChildrenOnly ?
            <div>{children}</div> : null
    )
        :
        (container ?
            <LinkContainer target={target} className={className} to={to}>{children}</LinkContainer>
            :
            <Link target={target} className={className} to={to}>{children}</Link>)


}

import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        allowedRoutes: state.state.allowedRoutes,
        admin: state.state.admin,

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllowedLink)
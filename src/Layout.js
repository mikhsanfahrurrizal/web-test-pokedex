import React from "react"
import { withRouter } from "react-router"
import PropTypes from "prop-types"

import "./assets/scss/Main.scss"
const Body = (props) => {
    const { children } = props

    return (
        <>
            <main className="page-content">
                <section className="page-content__card">{children}</section>
            </main>
            <Footer />
        </>
    )
}

Body.defaultProps = {
    children: "",
}

Body.propTypes = {
    children: PropTypes.node,
}

export default withRouter(Body)

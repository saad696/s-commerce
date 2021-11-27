import React from 'react'

const Footer = () => {
    return (
        <footer className='tc fw6 f5 pv4 bg-white shadow-4 mt3'>
            ©<a href="#!">SCOMMERCE</a> - {new Date().getFullYear()} All Rights Reserved
        </footer>
    )
}

export default Footer

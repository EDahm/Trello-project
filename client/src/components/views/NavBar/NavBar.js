import React from 'react'
import RightMenu from './Sections/RightMenu';
import './Sections/Navbar.css'

function NavBar() {
    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
            <div className="menu__logo">
                <a href="/">Trello</a>
            </div>
            <div className="menu_container">
                <div className="menu_right">
                    <RightMenu />
                </div>
            </div>
        </nav>
    )
}

export default NavBar

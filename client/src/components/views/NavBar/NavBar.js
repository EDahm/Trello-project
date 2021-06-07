import React from 'react'
import RightMenu from './Sections/RightMenu';
import { useSelector } from 'react-redux';
import './Sections/Navbar.css'

function NavBar() {

    
    const user = useSelector(state => state.user)

    if (user.userData && !user.userData.isAuth) {
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

    } else {

        return (
            <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
                <div className="menu__logo">
                    <a href="/usermain">Trello</a>
                </div>
                <div className="menu_container">
                    <div className="menu_right">
                        <RightMenu />
                    </div>
                </div>
            </nav>
        )

    }
    
}

export default NavBar

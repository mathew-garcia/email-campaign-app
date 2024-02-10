import React, {useState} from 'react'
import './Navbar.css'

function Navbar() {
    const [activeItem, setActiveItem] = useState('Campaigns');
    const handleItemClick = (item) => {
        setActiveItem(item);
    }
    return (
        <nav className='navbar'>
            <div className='logo'>
                <h2>SuperSend<i className="fa-solid fa-truck-fast"></i></h2>
            </div>
            <ul className='links'>
                <li
                    className={activeItem === 'Contacts' ? 'active' : ''}
                    onClick={() => handleItemClick('Contacts')}
                >
                    Contacts
                </li>
                <li
                    className={activeItem === 'Templates' ? 'active' : ''}
                    onClick={() => handleItemClick('Templates')}
                >
                    Templates
                </li>
                <li
                    className={activeItem === 'Campaigns' ? 'active' : ''}
                    onClick={() => handleItemClick('Campaigns')}
                >
                    Campaigns
                </li>
                <li
                    className={activeItem === 'Analytics' ? 'active' : ''}
                    onClick={() => handleItemClick('Analytics')}
                >
                    Analytics
                </li>
            </ul>
            <div className='profile'>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" height={20} width={20}/>
            </div>
        </nav>
    )
}

export default Navbar
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav>
        <div className='nav__container w-screen h-20 fixed bg-gray-600'>
            <div className='nav__logo'>
                <h1>LOGO</h1>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;
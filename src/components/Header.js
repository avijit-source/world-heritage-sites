import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        <Link to="/"><h2 className="text-dark fw-bold my-4 text-center" style={{fontFamily:"cursive"}}>World Heritage sites</h2></Link>
    </div>
  )
}

export default Header
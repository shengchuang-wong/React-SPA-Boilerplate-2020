import React from 'react'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
  return (
    <main>
      <h1>Page Not Found</h1>
      <p>
        <Link to="/">ScooterPlotter Page</Link>
      </p>
    </main>
  )
}

export default NotFound404

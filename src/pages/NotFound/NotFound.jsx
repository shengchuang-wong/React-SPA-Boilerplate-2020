import React from 'react'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
  return (
    <main>
      <h1>Page Not Found</h1>

      <p>
        <Link to="/">Landing Page</Link>
      </p>
      <p>
        <Link to="/example">Example Page</Link>
      </p>
      <p>
        <Link to="/non-exist">Non Exist Page</Link>
      </p>
    </main>
  )
}

export default NotFound404
import React from 'react'
import { Link } from 'react-router-dom'

const Example = () => {
  return (
    <main>
      <h1>Example Page</h1>

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

export default Example
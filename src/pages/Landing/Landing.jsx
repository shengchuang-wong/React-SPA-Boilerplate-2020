import React from 'react'
import { Link } from 'react-router-dom'

import './Landing.scss'

const Landing = () => {
  return (
    <main>
      <h1>Landing Page</h1>

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

export default Landing
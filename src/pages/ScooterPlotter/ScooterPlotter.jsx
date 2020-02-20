import React from 'react'
import { Link } from 'react-router-dom'

const ScooterPlotter = () => {
  return (
    <main>
      <h1>ScooterPlotter Page</h1>
      <p>
        <Link to="/">ScooterPlotter Page</Link>
      </p>
      <p>
        <Link to="/non-exist">Non Exist Page</Link>
      </p>
    </main>
  )
}

export default ScooterPlotter

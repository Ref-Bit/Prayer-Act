import React from 'react'
import { Link } from 'react-router-dom'

export default () => {

  return (
    <React.Fragment>
      <nav className="flex items-baseline justify-between flex-wrap bg-indigo-600 p-6 mb-5">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to={'/'}>
            <span className="font-semibold text-4xl tracking-tight" id="logo">Prayer Act</span>
          </Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-lg lg:flex-grow">
            <span className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-300 text-white mr-4 transition duration-300 font-semibold">
              Link 1
            </span>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

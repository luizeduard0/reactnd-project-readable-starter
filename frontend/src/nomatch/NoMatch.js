import React from 'react'

const NoMatch = ({ location={} }) => (
  <div className='not-found-page'>
    <div className='jumbo'>Whoops</div>
    <h2>
      Page not found
      <small>404 &bull; We could not find this page {location.pathname}</small>
    </h2>
  </div>
)

export default NoMatch

import React from 'react'
import ReactDOM from 'react-dom'
import { Voyager } from 'graphql-voyager'
import fetch from 'isomorphic-fetch'
import './voyager.css'

function introspectionProvider(query) {

  return fetch('https://api.gdc.cancer.gov/v0/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query }),
  }).then((response) => response.json())

  // Alternate method to directly read json from locally stored file
  // return fetch('./schema.json',{
  //   headers : { 
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   }
  // }).then((response) => response.json())
}

ReactDOM.render(
  <Voyager 
    introspection={introspectionProvider} 
    displayOptions={{ skipRelay: true, showLeafFields: true, rootType:  "Mutation" }}
    workerURI={process.env.PUBLIC_URL + '/voyager.worker.js'}
  />,
  document.getElementById('root'),
)
import React from 'react'
import ReactDOM from 'react-dom'
import { Voyager } from 'graphql-voyager'
import fetch from 'isomorphic-fetch'
import './voyager.css'

function introspectionProvider() {

  return fetch('./schema.json',{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then((response) => response.json())
}

ReactDOM.render(
  <Voyager 
    introspection={introspectionProvider} 
    displayOptions={{ skipRelay: true, showLeafFields: true, hideRoot: true, rootType:  "Mutation" }}
    workerURI={process.env.PUBLIC_URL + '/voyager.worker.js'}
  />,
  document.getElementById('root'),
)
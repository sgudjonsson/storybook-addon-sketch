import React from 'react'

/**
 * Sample Button component
 * @param {string} value 
 */
export default function Button(props) {
  return <button>{props.value || 'Click me'}</button>
}

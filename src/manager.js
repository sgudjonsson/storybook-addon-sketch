import React from 'react'
import addons from '@storybook/addons'
import { ADDON_ID, PANEL_ID, EVENT_ID } from './'
import Sketch from './components/Sketch'

/**
 * Addon registration function
 * 
 * @export
 * @param {Object} Collection of components
 */
export function register(scope) {
  addons.register(ADDON_ID, api => {
    const channel = addons.getChannel()
    const a = addons.addPanel(PANEL_ID, {
      title: 'Sketch',
      render: () => <Sketch scope={scope} api={api} channel={channel} />,
    })
  })
}

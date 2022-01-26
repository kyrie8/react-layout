import React from 'react'
import loadable from '@loadable/component'
import { Spin } from 'antd'

function load(fn, options) {
  const Component = loadable(fn, options);

  Component.preload = fn.requireAsync || fn;

  return Component;
}

function LoadingComponent() {
  return (
    <div style={{display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'}}>
      <Spin/>
    </div>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (loader) => load(loader, {
  fallback: LoadingComponent()
})
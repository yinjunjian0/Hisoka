import React, { useReducer } from 'react';
import { storeContext } from './index'

function Provider({ children, store }: any) {
  return <storeContext.Provider value={store}>
    {children}
  </storeContext.Provider>
}

export default Provider
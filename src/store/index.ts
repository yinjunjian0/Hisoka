import React from 'react';
import useCache from '../hooks/useCache'

interface fieldConfig {
  required?: Boolean,
  type?: string
}

export interface fieldItem {
  name: string,
  required?: Boolean,
  type?: string
}

export interface IState {
  fields: Array<fieldItem>,
  loading: Boolean,
  selectedTag: fieldItem
}

export interface IContextProps {
  state: IState;
  dispatch: ({ type, payload }: { type: string, payload: Object }) => void;
}
export const storeContext = React.createContext({} as IContextProps);

const { get, set } = useCache()


const cacheStore = get('store')
export const initialState: IState = cacheStore ? cacheStore : { selectedTag: {}, loading: false, fields: [{ name: 'field1', type: 'Input' }] }

export const reducer = (state: IState, action: { type: string, payload: { loading: Boolean, name: string } }) => {
  switch (action.type) {
    case "SETSELECTEDTAG":
      const selectedField = state.fields.filter(item => item.name === action.payload.name)
      state.selectedTag = selectedField[0]
      return { ...initialState, ...state }
    case 'SETLOADING':
      state.loading = action.payload.loading
      return { ...initialState, ...state }
    case 'SETFIELD':
      let fieldIndex = 0
      const { fields, selectedTag } = state
      const payload = action.payload
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].name === selectedTag.name) fieldIndex = i
      }
      fields[fieldIndex] = { ...fields[fieldIndex], ...payload }
      set('store', state)
      state.loading = false
      return { ...initialState, ...state }
    case 'ADDFIELD':
      state.fields = [...state.fields, { name: action.payload.name }]
      set('store', state)
      return { ...initialState, ...state }
    case 'DELETEFIELD':
      const { name } = action.payload
      state.fields = state.fields.filter(item => item.name !== name)
      set('store', state)
      return { ...initialState, ...state }
    default:
      return state;
  }
}

import React from 'react';
import useCache from '../hooks/useCache'

interface fieldConfig {
  required?: Boolean,
  type?: string
}

interface itemPropsType {
  placeholder?: string,
  [propertys: string]: any
}

interface evnProps {
  [propertys: string]: any
}

interface layoutProps {
  [propertys: string]: any
}

interface IContextProps {
  state: IState;
  dispatch: ({ type, payload }: { type: string, payload: Object }) => void;
}

export interface fieldItem {
  id: number,
  label: string,
  name: string,
  required?: Boolean,
  type?: string,
  itemProps: itemPropsType
}

export interface IState {
  fields: Array<fieldItem>,
  loading: Boolean,
  selectedTag: fieldItem,
  env: evnProps,
  layout: layoutProps
}

export const storeContext = React.createContext({} as IContextProps);

const { get, set } = useCache()
const cacheStore = get('store')
const initFiledItem = {
  name: `new Field${+new Date()}`,
  type: 'Input',
  label: 'toEdit',
  required: true,
  itemProps: {}
}

export const initialState: IState = cacheStore ? cacheStore : { selectedTag: {}, loading: false, fields: [initFiledItem], env: {}, layout: {} }

export const reducer = (state: IState, action: { type: string, payload: { id: number, loading: Boolean, name: string, env: evnProps, layout: layoutProps } }) => {
  switch (action.type) {
    case "SETLAYOUT":
      const layout = action.payload.layout
      state.layout = { ...state.layout, ...layout }
      set('store', state)
      return { ...state }
    case "SETENV":
      const env = action.payload.env
      state.env = env
      set('store', state)
      return { ...state, env }
    case "SETSELECTEDTAG":
      const selectedField = state.fields.filter(item => item.id === action.payload.id)
      state.selectedTag = selectedField[0]
      set('store', state)
      return { ...initialState, ...state }
    case 'SETLOADING':
      state.loading = action.payload.loading
      return { ...initialState, ...state }
    case 'SETFIELD':
      let fieldIndex = 0
      const { fields, selectedTag } = state
      const payload = action.payload
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].id === selectedTag.id) fieldIndex = i
      }
      fields[fieldIndex] = { ...fields[fieldIndex], ...payload }
      set('store', state)
      state.loading = false
      return { ...initialState, ...state }
    case 'ADDFIELD':
      let newId;
      newId = (state.fields.length !== 0) ? (state.fields[state.fields.length - 1].id + 1) : 1
      state.fields = [...state.fields, { ...initFiledItem, id: newId, name: action.payload.name, }]
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

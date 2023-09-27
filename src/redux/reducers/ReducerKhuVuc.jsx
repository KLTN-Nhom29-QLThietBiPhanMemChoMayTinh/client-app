const initialState = {
    khuvucInfo:{id:'1', name:'Toà nhà A'}
}

export const ReducerKhuVuc =  (state = initialState, { type, payload }) => {
  switch (type) {

  case typeName:
    return { ...state, ...payload }

  default:
    return state
  }
}

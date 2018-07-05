import {SAVE, GET, EDIT} from "./ActionType";
import APIs  from './../APIs/APIs';

export const saveData = (data) => {
  return(dispatch) => {
    return APIs(data,"post")
      .then((response)=>{
        dispatch({
          type: SAVE,
          payload: response.key,
        })

      }).catch((err)=>{
        return Promise.reject(err);
      })
  }
}

export const getData = () => {
  return(dispatch) => {
    return APIs({},"get").then((response)=>{
        dispatch({
          type: GET,
          payload: response.data,
        })

      }).catch((err)=>{
        return Promise.reject(err);
      })
  }
}

export const editData = (data) => {
  return(dispatch) => {
    return APIs(data,"put").then((response)=>{
      dispatch({
        type: EDIT,
        payload: response.data,
      })

    }).catch((err)=>{
      return Promise.reject(err);
    })
  }
}
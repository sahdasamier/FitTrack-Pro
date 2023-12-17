import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()


export const workoutsReducer=(state, action) => {
switch(action.type) {
 case 'SET_WORKOUTS':
  return{
    workouts:action.payload
  }
  case 'CREATE_WORKOUT':
    return{
      workouts:[action.payload, ...state.workouts]

    }
    default:
      return state
 }
}
export const WorkoutContextProvider =({children})=>{
  const [state ,dispatch ] = useReducer(workoutsReducer,{
     workouts:null
     //it use 2 arguments first which reducer function call and second initial value for states 
  })

  // dispatch({type:'SET_WORKOUTS',payload:[{},{}] })

    return(
        <WorkoutContext.Provider value={{...state ,dispatch}}> 
          {/* //that is wrap any part of application needs access to the context so that every component has access to this context     */}
            {children} 
            {/* //any root like app component in index.js file which workoutContextProvider wrap it   */}
             
        </WorkoutContext.Provider>
    )
}
import type { Actividad } from "../types"
export type ActividadAcciones = 
    {type: 'agregar-Actividad', payload: {newAct: Actividad}}

export type ActividadesState = {
    actividades: Actividad[]
}

export const initialState : ActividadesState = {
    actividades: []
}

export const actividadReducer = (
    state: ActividadesState = initialState,
    action: ActividadAcciones
) =>{

    if(action.type === 'agregar-Actividad'){
        return{
            ...state,
            actividades: [...state.actividades, action.payload.newAct]
        }
    }

    return state
}
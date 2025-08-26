import type { Actividad } from "../types"
export type ActividadAcciones = 
    {type: 'agregar-Actividad', payload: {newAct: Actividad}} |
    {type: 'agregando-Id', payload: {idActivo: Actividad['id']}} |
    {type: 'eliminar-Actividad', payload: {idActividad: Actividad['id']}} |
    {type: 'reiniciar', payload: {val: boolean}} 

export type ActividadesState = {
    actividades: Actividad[]
    idActivo: Actividad['id']
}

export const initialState : ActividadesState = {
    actividades: JSON.parse(localStorage.getItem('Actividades') || '[]') as Actividad[],
    idActivo: ''
}

export const actividadReducer = (
    state: ActividadesState = initialState,
    action: ActividadAcciones
) =>{

    if(action.type === 'agregar-Actividad'){
        const objeEncontrado = state.actividades.find(activi => activi.id === state.idActivo);
        return{
            ...state,
            actividades: objeEncontrado ? state.actividades.map(actividad => actividad.id === state.idActivo ?
                {...actividad, ...action.payload.newAct} : actividad
            ) : [...state.actividades, action.payload.newAct],
            idActivo: ''
        }
    }

    if(action.type === 'agregando-Id'){
        return{
            ...state,
            idActivo: action.payload.idActivo
        }
    }

    if(action.type === 'eliminar-Actividad'){
        return{
            ...state,
            actividades: state.actividades.filter(activi => activi.id !== action.payload.idActividad)
        }
    }

    if(action.type === 'reiniciar'){
        return{
            ...state,
            actividades: action.payload.val ? [] : [...state.actividades]
        }
    }


    return state
}
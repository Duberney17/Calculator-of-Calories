import type { Actividad } from "../types"

export type ActivityAccion =
    {type: 'guardar-Actividad', payload: { nuevaAc: Actividad}} |
    {type: 'guardar-Id', payload: { nuevoID: Actividad['id']}}  |
    {type: 'eliminar-Actividad', payload: {id: Actividad['id']}} |
    {type: 'reiniciar-app', payload: {arreglo: Actividad[]}}

export type ActividadState = {
    actividades: Actividad[]
    idActivo: Actividad['id']
}

const iniciarLocal = () : Actividad[] =>{
    const actividades = localStorage.getItem('Actividades');
    return actividades ? JSON.parse(actividades) : [] 
}

export const initialState : ActividadState = {
    actividades: iniciarLocal(),
    idActivo: ''
}


export const actividadReducer = (
    state : ActividadState = initialState,
    accion : ActivityAccion
    ) =>{


    if(accion.type === 'guardar-Actividad'){
        const existeActi = state.actividades.filter(activi => activi.id === accion.payload.nuevaAc.id)[0];
        
        return {
            ...state,
            actividades: existeActi ? state.actividades.map(acti => acti.id === state.idActivo ?
                {...existeActi, ...accion.payload.nuevaAc } : acti
            ) 
            :  [...state.actividades, accion.payload.nuevaAc],
            idActivo: ''
        }
    }

    if(accion.type === 'guardar-Id'){
        return{
            ...state,
            idActivo: accion.payload.nuevoID
        }
    }

    if(accion.type === 'eliminar-Actividad'){
        return{
            ...state,
            actividades: state.actividades.filter(activ => activ.id !== accion.payload.id)
        }
    }

    if(accion.type === 'reiniciar-app'){
        return{
            ...state,
            actividades: accion.payload.arreglo
        }
    }


    return state
} 
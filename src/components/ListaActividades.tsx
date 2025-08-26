import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid"
import type { Actividad } from "../types"
import type { Dispatch } from "react"
import type { ActividadAcciones } from "../reducers/actividad-reducer"

type ListaProps = {
    actividades: Actividad[]
    dispatch: Dispatch<ActividadAcciones>
}

export default function ListaActividades({actividades, dispatch} : ListaProps) {
  
  const guardarId = (id : Actividad['id']) =>{
    dispatch({type: 'agregando-Id', payload: {idActivo: id}});
  }

  const eliminarActividad = (id : Actividad['id']) =>{
    dispatch({type:'eliminar-Actividad', payload: {idActividad: id}});
  }

  return (
    <div className="bg-white md:max-w-138 rounded">
      <h2 className="text-2xl font-bold text-gray-500 text-center my-4 py-3">Comidas y Ejercicios</h2>
      <div className="pb-4">
        {actividades.length <= 0 ? 
            <p className="text-center text-lg font-bold">No hay tareas...</p> :
            actividades.map(activi => 
            <div key={activi.id}
            className="flex justify-between p-4 my-2 bg-gray-100 max-w-80 md:max-w-130 m-auto"
            >
                <div className="relative">
                    <h1 className={activi.categoria === 1 ? `bg-lime-500 font-bold text-white p-2 absolute -left-10 -top-3` :
                    `bg-amber-500 font-bold text-white p-2 absolute -left-10 -top-3`}
                    >{activi.categoria === 1 ? `Comida` : `Ejercicio`}</h1>
                    <p className="text-lg text-black font-bold absolute -bottom-3">{activi.actividad}</p>
                </div>
                <div className="flex flex-col space-y-3">
                    <div className="w-5 text-blue-500 cursor-pointer">
                        <PencilSquareIcon
                          onClick={()=>guardarId(activi.id)}
                        />
                    </div>
                    <div className="w-5 text-red-600 cursor-pointer">
                        <TrashIcon
                          onClick={()=> eliminarActividad(activi.id)} 
                        />
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}

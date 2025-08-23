import type { Actividad } from "../types"
import { categorias } from "../data/categorias"
import {useMemo, type Dispatch } from "react"
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import type { ActivityAccion } from "../reducers/activity-Reducer"


type ActividadesListProps ={
    actividades: Actividad[]
    dispatch: Dispatch<ActivityAccion>
}

export default function ListaActividades({actividades, dispatch} : ActividadesListProps) {

    const nombreCategoria = useMemo(() => (categoria : number)=> categorias.map(categ => categ.id === categoria ? categ.name : '' ) ,[])

  return ( 
    <div>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y ACtividades</h2>

      {actividades.map(actividad =>(
        <div key={actividad.id} className="px-5 py-10 bg-gray-100 mt-5 flex justify-between">
            <div className="space-y2 relative">
                <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
                    ${actividad.categoria === 1 ? 'bg-lime-500' :  'bg-orange-500'}
                    `}>
                    {nombreCategoria(actividad.categoria)}
                </p>
                <p className="text-2xl font-bold pt-5">{actividad.actividad}</p>
                <p className="font-black text-4xl text-lime-500">
                    {actividad.caloria} {''}
                    <span>Calorias</span>
                </p>
            </div>  
            <div className="flex flex-col space-y-5"> 
              <button className="w-10 cursor-pointer" 
                onClick={()=> dispatch({type: 'guardar-Id', payload: { nuevoID: actividad.id}})}
              >
                <PencilSquareIcon />
              </button>
              <button className="w-10 cursor-pointer"
                onClick={()=> dispatch({type: 'eliminar-Actividad', payload: {id: actividad.id}})}
              >
                <ArchiveBoxXMarkIcon className="text-red-600" />
              </button>
            </div>
        </div>
      ))}
    </div>
  )
}

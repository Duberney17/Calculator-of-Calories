import { useMemo } from "react"
import type { ActividadesState } from "../reducers/actividad-reducer"

type CaloriasCalculoProps = {
  state: ActividadesState
}

export default function CaloriasCalculo({state} : CaloriasCalculoProps) {
  const consumidas = useMemo(()=> state.actividades.reduce((total, activi) => activi.categoria === 1 ? 
        total + +activi.caloria : total ,0) ,[state.actividades]);
  const ejercicio = useMemo(()=> state.actividades.reduce((total, activi) => activi.categoria === 2 ? 
        total + +activi.caloria : total ,0) ,[state.actividades]);
  const diferencia = useMemo(()=> consumidas - ejercicio ,[consumidas, ejercicio]);
  return (
    <div className="md:flex md:justify-between space-x-10 md:flex-row flex flex-col">
        <div className="flex flex-col items-center">
            <p className="font-bold text-2xl text-white">{consumidas}</p> 
            <h2 className="font-bold text-2xl text-white">Consumidas</h2>
        </div>
        <div className="flex flex-col items-center">
            <p className="font-bold text-2xl text-white">{diferencia}</p> 
            <h2 className="font-bold text-2xl text-white">Diferencia</h2>
        </div>
        <div className="flex flex-col items-center">
            <p className="font-bold text-2xl text-white">{ejercicio}</p> 
            <h2 className="font-bold text-2xl text-white">Ejercicio</h2>
        </div>
    </div>
  )
}

import { useMemo } from "react"
import type { Actividad } from "../types"

type CaloriasCalculoProps = {
    actividades: Actividad[]
}


export default function CaloriasCalculo({actividades} : CaloriasCalculoProps) {

    const caloriasConsumidas = useMemo(()=> actividades.reduce((total, actividad) => 
        actividad.categoria === 1 ? total + +actividad.caloria : total
    ,0) ,[actividades]);

    const caloriasEjercicio = useMemo(()=> actividades.reduce((total, actividad) => 
        actividad.categoria === 2 ? total + +actividad.caloria : total
    ,0) ,[actividades]);

    const totalCaloriasQuemadas = useMemo(()=> caloriasConsumidas - caloriasEjercicio,
                                [caloriasConsumidas, caloriasEjercicio,]);

  return (
    <div className="bg-gray-800 min-h-45">
        <div>
            <h1 className="text-white text-3xl font-bold uppercase text-center p-3 ml-9">Resumen</h1>
        </div>
        <div className=" md:flex justify-around text-center pb-4">
            <div className="flex flex-col">
                <p className="text-white text-5xl font-bold text-center pb-1">{caloriasConsumidas}</p>
                <h2 className="text-white text-2xl font-bold">Consumidas</h2>
            </div>
            <div className="flex flex-col">
                <p className="text-white text-5xl font-bold text-center pb-1">{totalCaloriasQuemadas}</p>
                <h2 className="text-white text-2xl font-bold">Total</h2>
            </div>
            <div className="flex flex-col">
                <p className="text-white text-5xl font-bold text-center pb-1">{caloriasEjercicio}</p>
                <h2 className="text-white text-2xl font-bold">Ejercicios</h2>
            </div>
        </div>
    </div>
  )
}

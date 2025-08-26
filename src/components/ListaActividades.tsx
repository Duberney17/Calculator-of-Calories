import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid"
import type { Actividad } from "../types"

type ListaProps = {
    actividades: Actividad[]
}

export default function ListaActividades({actividades} : ListaProps) {
  return (
    <div className="bg-white md:max-w-138 rounded">
      <h2 className="text-2xl font-bold text-gray-500 text-center my-4 py-3">Comidas y Ejercicios</h2>
      <div className="pb-4">
        {actividades.map(activi => 
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
                    <div className="w-5 text-blue-500">
                        <PencilSquareIcon />
                    </div>
                    <div className="w-5 text-red-600">
                        <TrashIcon />
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState, type Dispatch, type FormEvent } from "react";
import {v4 as uuidv4} from 'uuid';
import { categorias } from "../data/categorias";
import type { Actividad } from "../types";
import type { ActividadAcciones, ActividadesState } from "../reducers/actividad-reducer";

type FormularioProps = {
  dispatch: Dispatch<ActividadAcciones>
  state: ActividadesState
}

const initialState  : Actividad = {
  id: uuidv4(),
  categoria: 1,
  actividad: '',
  caloria: ''
}

export default function Formulario({dispatch, state} : FormularioProps) {


  const [actividad, setActividad] = useState(initialState); 

  useEffect(()=>{
    const objActividad = state.actividades.find(activi => activi.id === state.idActivo);
    if(objActividad){
      setActividad(objActividad);
    }
  },[state.idActivo, state.actividades])

  useEffect(()=>{
    localStorage.setItem('Actividades', JSON.stringify(state.actividades))
  },[state.actividades])

  const validacion = useMemo(() => actividad.actividad === '' || actividad.caloria === '',[actividad])
 
  const handlerChange = (e : React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> ) =>{
    const existe = ['categoria', 'caloria'].includes(e.target.name);
    setActividad({...actividad, [e.target.name] : existe ? +e.target.value : e.target.value.trim()});
  }

  const handleSubmit = (e : FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
    if(validacion){
      return
    }
    dispatch({type: 'agregar-Actividad', payload: {newAct: actividad}});
    setActividad({...initialState, id: uuidv4()});
  }

  return (
    <div>
      <form
      onSubmit={handleSubmit} 
      className="bg-gray-100 p-4 my-4 rounded-lg max-w-120 m-auto space-y-3">
        <div className="flex flex-col">
          <label htmlFor="categoria"
          className="font-bold"
          >Categoria:</label>
          <select
            className="bg-white py-1 p-2"
            name="categoria"
            onChange={handlerChange}
            value={actividad.categoria}
            >
            {categorias.map(categoria =>
              <option
              key={categoria.id}
              value={categoria.id}
              >
                {categoria.name}
              </option>
            )}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-bold">Actividad:</label>
          <input
          onChange={handlerChange}
          name='actividad'
          type="text"
          value={actividad.actividad}
          className="bg-white py-1 p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-bold">Calorias:</label>
          <input
          onChange={handlerChange}
          name="caloria"
          className="bg-white py-1 p-2" 
          value={actividad.caloria}
          type="number"
          />
        </div>
        <input 
        type="submit"
        className="bg-gray-800 text-white font-bold uppercase text-1xl p-2 w-full my-2 cursor-pointer disabled:opacity-20"
        disabled={validacion}
        />
      </form>
    </div>
  )
}

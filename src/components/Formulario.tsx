import { useEffect, useState, type Dispatch } from "react"
import { categorias } from "../data/categorias"
import type { Actividad } from "../types";
import type { ActividadState, ActivityAccion } from "../reducers/activity-Reducer";
import {v4 as uuid} from 'uuid'

type FormProps = {
  dispacth: Dispatch<ActivityAccion>
  state: ActividadState
}

const initialState = {  
  id: uuid(),
  categoria: 1,
  actividad: '',
  caloria: '',
}

export default function Formulario({dispacth, state} : FormProps) {


    const [activida, setActividad] = useState<Actividad>(initialState);
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
      if(state.idActivo){
        const actiEncontrado = state.actividades.find(acti => acti.id === state.idActivo);
        if(actiEncontrado){
          setActividad(actiEncontrado);
        }
      }
    },[state.idActivo, state.actividades]);

    // const actividadesArreglo = useMemo(()=> [...state.actividades],[ state.actividades]);
    // localStorage.setItem('Actividades', JSON.stringify(actividadesArreglo));

    const handleChange = ( e : React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>{

      const cambiarAnumero = ['categoria', 'caloria'].includes(e.target.name); 

        setActividad({...activida, [e.target.name]: cambiarAnumero ? +e.target.value : e.target.value})
    }

    const validarForm = () =>{
      const {actividad , caloria} = activida;
      return actividad.trim() !== '' && parseInt(caloria) > 0 
    }

    const handleSubmit = (e : React.FormEvent<HTMLInputElement>) =>{
      e.preventDefault();
      dispacth({type: 'guardar-Actividad', payload: {nuevaAc: activida}});
      setActividad( {...initialState, id: uuid()});
      setMensaje('Se Agrego a la Lista');
      setTimeout(() => {
        setMensaje('');
      }, 2000);
    }

  return (
    <div>
      <form className="space-y-5 bg-white shadow p-10 rounded-lg">
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="" className="font-bold">Categoria:</label>
            <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            name="categoria"
            onChange={handleChange}
            value={activida.categoria}
            >
                {categorias.map(categoria => (
                    <option
                    key={categoria.id}
                    value={categoria.id}
                    >
                    {categoria.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="" className="font-bold">Actividad:</label>
            <input 
            type="text" 
            name="actividad"
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            onChange={handleChange}
            value={activida.actividad}
            />
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="" className="font-bold">Calorias:</label>
            <input 
            type="number" 
            name="caloria"
            onChange={handleChange}
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            value={activida.caloria}
            />
        </div>
        <input type="submit" 
        value={activida.categoria === 1 ? 'Ingresa la Comida' : 'Ingresa el Ejercicio'}
        className="text-white bg-black w-full uppercase p-2 rounded disabled:opacity-15 hover:cursor-pointer"
        disabled={!validarForm()}
        onClick={handleSubmit}
        />
        <div>
          { mensaje &&
          <p className=" my-1 bg-lime-300 text-black uppercase w-3xs p-2 text-center m-auto font-medium">{mensaje}</p> 
          }
      </div>
      </form> 
    </div>
  )
}

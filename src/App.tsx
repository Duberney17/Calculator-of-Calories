import Formulario from "./components/Formulario"
import { useEffect, useReducer } from "react"
import { actividadReducer, initialState } from "./reducers/activity-Reducer"
import ListaActividades from "./components/ListaActividades";
import CaloriasCalculo from "./components/CaloriasCalculo";


function App() {
  
  const [state, dispatch] = useReducer(actividadReducer, initialState);

  useEffect(()=>{
    localStorage.setItem('Actividades', JSON.stringify(state.actividades));
  }, [state.actividades])
      
  return (
    <>
      <header className="bg-lime-600 py-3"> 
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-white text-center text-2xl font-bold uppercase">Mide Tus Calorias {''}
            <span className="text-lg">¿Cuantas quemaste hoy?</span>
          </h1>
          <button
            disabled={state.actividades.length <= 0}
            onClick={()=>dispatch({type: 'reiniciar-app', payload: {arreglo: []}})}
            className="bg-gray-700 hover:bg-gray-800 font-medium text-white p-1 rounded-lg w-30 uppercase cursor-pointer disabled:opacity-40">
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Formulario
            dispacth={dispatch}
            state={state}
          />
        </div>
      </section>

      <section>
          <CaloriasCalculo
            actividades={state.actividades}
          />
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        {state.actividades.length === 0 ?
          <p className="text-center text-3xl font-bold text-slate-600">No hay Actividades</p> :
          <ListaActividades 
            actividades={state.actividades}
            dispatch={dispatch}
          />
        }
      </section>
    </>
  )
}

export default App

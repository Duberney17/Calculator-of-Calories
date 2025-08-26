import { useReducer } from "react"
import CaloriasCalculo from "./components/CaloriasCalculo"
import Formulario from "./components/Formulario"
import { actividadReducer, initialState } from "./reducers/actividad-reducer"
import ListaActividades from "./components/ListaActividades";


function App() { 
 
  const [state, dispatch] = useReducer(actividadReducer, initialState);

  return (
    <>
      <header className="h-auto bg-lime-500 md:flex justify-around py-5">
        <div className="flex justify-between items-center space-x-6">
          <h1 className="font-black text-3xl text-white">Cuenta tus calorias</h1>
          <button className="uppercase font-bold text-white bg-gray-600 p-2 rounded-lg cursor-pointer hover:bg-gray-800 disabled:opacity-20"
          disabled={state.actividades.length === 0}
          onClick={()=> dispatch({type: 'reiniciar', payload:{val: true}})}
          >Reiniciar App</button>
        </div>
        <div>
          <CaloriasCalculo 
          state={state}
          /> 
        </div>
      </header>

      <section className={`grid ${state.actividades.length !== 0 && 'md:grid-cols-2'} gap-4 w-full m-auto bg-lime-400`}>
        <Formulario
        dispatch={dispatch}
        state={state}
         />
         {state.actividades.length !== 0 &&
        <div className="pb-4">
          <ListaActividades
          actividades={state.actividades}
          dispatch={dispatch}
          />
        </div>
      }
      </section>
    </>
  )
}

export default App

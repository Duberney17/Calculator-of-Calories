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
          <button className="uppercase font-bold text-white bg-gray-600 p-2 rounded-lg cursor-pointer hover:bg-gray-800"
          >Reiniciar App</button>
        </div>
        <div>
          <CaloriasCalculo /> 
        </div>
      </header>

      <section className="grid md:grid-cols-2 gap-4 w-full h-full m-auto bg-lime-400">
        <Formulario
        dispatch={dispatch}
         />
        <div>
          <ListaActividades
          actividades={state.actividades}
          />
        </div>
      </section>
    </>
  )
}

export default App

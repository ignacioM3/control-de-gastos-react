import { useEffect, useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'

import { generaId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {
  const presupuestoStorage = Number(localStorage.getItem('presupuesto')) ?? 0 ;
  const gastoLocalStorage = JSON.parse(localStorage.getItem('gastos')) ?? []


  const [gastos, setGastos] = useState(gastoLocalStorage)
  const [presupuesto, setPresupuesto] = useState(presupuestoStorage)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }

  }, [gastoEditar]);


  //LocalStorage presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  //LocalStorage para validar el presupuesto
  useEffect(() => {
     const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLs > 0){
      setIsValidPresupuesto(true)
    }

  }, [])

  //LocalStorage para guardar los gastos

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])
  
  //Filtro
  useEffect(() => {
    if(filtro){
      const Filtrados = gastos.filter( gasto => gasto.categoria === filtro) ;
        setGastosFiltrados(Filtrados)
    }
  }, [filtro])
  


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = (gasto) => {

    if (gasto.id) {
      //Actualiza
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      //Nuevo Gasto
      gasto.id = generaId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }


    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto =(id) =>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />


      {
        isValidPresupuesto && (
          <>
            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}

              />
            </main>

            <div className='nuevo-gasto'>
              <img
                src={IconoNuevoGasto}
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )
      }
      {
        modal && <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }
    </div>

  )
}

export default App

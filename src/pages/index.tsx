import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'



export default function Home() {

  const [tareas, setTareas] = useState<string[]>([])
  const [valor, setValor] = useState('')
  
  useEffect(() => {
    let xd:string[];
    if (localStorage.getItem('tareas')) {
      xd = JSON.parse( localStorage.getItem('tareas') );
      setTareas(xd);
    }
  }, [])

  const addTarea = () => {
    let container = [...tareas, valor];
    setValor('');
    setTareas(container);
    localStorage.setItem('tareas', JSON.stringify(container));
    console.log(localStorage.getItem('tareas'));
  }

  const delTarea = (id: number) => {
    let del = tareas.filter((tarea) => tarea != tareas[id])
    setTareas(del);
    localStorage.setItem('tareas', JSON.stringify(del));
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='ToDoList'>
        <div className='block'>
          <h1>TO DO LIST</h1>
          <div className='form'>
            <div className='in'>
              <input value={valor} placeholder="Ingrese una tarea" onChange={(e) => { setValor(e.target.value) }} ></input>
              <button type="button" onClick={() => addTarea()}>Agregar</button>
              {/* <select>
                <option disabled>¿Prioridad?</option>
                <option value="urg">Urgente</option>
                <option value="med">Medio</option>
                <option value="baj">Bajo</option>
              </select> */}
            </div>
            <div className='list'>
              {tareas.map((tarea, index) => (
                <div key={index}>
                  <input value={tarea} name='tareas[]' readOnly className='task'></input>
                  <button type="button" onClick={() => delTarea(index)} className='delTask'>x</button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

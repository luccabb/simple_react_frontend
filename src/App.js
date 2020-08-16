import React, {useEffect, useState} from "react";
import api from 'services/api'

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [techs, setTechs] = useState("")

  useEffect(()=> {
    const response = api.get('/repositories').then(response=>
      setProjects(response.data)
    )
  }, [])

  async function handleAddRepository() {
    api.post('/repositories', {
      title,
      url,
      techs
    }).then(response=> {
      
      setProjects([...projects, response.data])
      setTitle("")
      setUrl("")
      setTechs("")
    }
    )
    
  }

  function handleTitleChange(event) {
    event.preventDefault()
    setTitle(event.target.value)
  }

  function handleUrlChange(event) {
    event.preventDefault()
    setUrl(event.target.value)
  }

  function handleTechsChange(event) {
    event.preventDefault()
    setTechs(event.target.value)
  }

  async function handleRemoveRepository(id) {
    api.delete('/repositories/'+ id).then(response=>{
      const filteredProjects = projects.filter(project=> project.id != id)

      setProjects(filteredProjects)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => <li key={project.id}>
            Title: {project.title} <br/>

            URL: {project.url} <br/>

            Techs: {project.techs} <br/>

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <br/>

      <form>
          <label>
            Repository title <br/>
            <input onChange={e => handleTitleChange(e)} type="text" />
          </label>

          <br/>
          
          <label>
            URL <br/>
            <input onChange={e => handleUrlChange(e)} type="text" />
          </label>

          <br/>

          <label>
            Techs <br/>
            <input onChange={e => handleTechsChange(e)} type="text" />
          </label>

      </form>


      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

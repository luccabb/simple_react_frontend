import React, {useEffect, useState} from "react";
import api from 'services/api'

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([])

  useEffect(()=> {
    const response = api.get('/repositories').then(response=>
      setProjects(response.data)
    )
    
  }, [])


  async function handleAddRepository() {
    api.post('/repositories', {
      title: 'project 123',
      owner: 'lucca'
    }).then(response=> {
      console.log(response.data);
      
      setProjects([...projects, response.data])
    }
    )

    
    
  }

  async function handleRemoveRepository(id) {
    api.delete('/repositories/'+ id).then(response=>{
      const filteredProjects = projects.filter(project=> project.id != id)


      console.log(filteredProjects)

      setProjects(filteredProjects)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => <li key={project.id}>
            {project.title}

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

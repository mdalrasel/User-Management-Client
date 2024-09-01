
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleAddUsers = e => {
    e.preventDefault()

    const form = e.target
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user)
    fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUser = [...users, data]
        setUsers(newUser);
        form.reset()

      })
  }

  return (
    <>
      <h1>Users Management</h1>
      <p>Numbers of Users: {users.length}</p>
      <form onSubmit={handleAddUsers}>
        <input type="text" name='name' required/> <br />
        <input type="email" name='email' required/><br />
        <input type="submit" value='Add User' />
      </form>
      <div>
        {
          users.map(user => <p>{user.id} : {user.name} {user.email}</p>

          )
        }
      </div>

    </>
  )
}

export default App

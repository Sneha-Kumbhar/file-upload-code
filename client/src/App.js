import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null)
  
  const fileSend = async(e) => {
    e.preventDefault()

  const formData = new FormData()

  formData.append('filename',file)

 try {
   await axios.post('http://localhost:4000/uploads',formData)
 } catch (error) {
  console.log(error)
 }

  }

  return (
    <div className="bg-primary mx-auto d-flex flex-column justify-content-center align-items-center " style={{ height: '400px', width: '400px' }}>
      <form onSubmit={fileSend}>

        <input type='file' name='filename' onChange={(e) => { setFile(e.target.files[0]) }} />

        <input type='submit' value={"upload"} />
      </form>
    </div>
  );
}

export default App;

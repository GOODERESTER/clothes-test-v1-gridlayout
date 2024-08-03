import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';



function App() {

  const [clothes, setClothes] = useState();

  const getClothes = async () =>{
    try{
      const response = await api.get("/api/v1/clothes");

      console.log(response.data);

      setClothes(response.data);
    }
    catch(err){
      console.log(err);
    }
    
  }

useEffect(() => {
  getClothes();
}, [])
}

export default App;
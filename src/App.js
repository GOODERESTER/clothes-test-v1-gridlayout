import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom'; 
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import NotFound from './components/notFound/NotFound';
import Reviews from './components/reviews/Reviews';
import Search from './components/search/Search'
import Detailed from './components/detailed/Detailed';
import outputs from "./amplify/amplify_outputs.json";


Amplify.configure(outputs);


function App() {

  const [clothes, setClothes] = useState();
  const [clothing, setClothing] = useState();
  const [reviews, setReviews] = useState([]);
  const [queryResponse, setQuery] = useState([]);


  const getClothes = async () =>{
    try{
      const response = await api.get("/api/v1/clothes");
      setClothes(response.data);
    }
    catch(err){
      console.log(err);
    }
  }

  const getReviewData = async (reviewId) =>{
    try {
      const response = await api.get(`/api/v1/reviews/${reviewId}`);

      const singleClothing = response.data;

      console.log(singleClothing);

      setReviews(singleClothing);

    } catch (err) {
      console.error(err);
    }
  }

  const getItemData = async (id) =>{
    try{
      const response = await api.get(`/api/v1/clothes/${id}`);

      const singleClothing = response.data;

      setClothing(singleClothing);
    } catch (err) {
      console.error(err);
    }
  }

  const queryClothes = async (query) =>{
    try{
      const response = await api.get(`/api/v1/clothes/Search/${query}`);

      setQuery(response.data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getClothes();
  }, [])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home clothes={clothes}/>}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:clothingId" element={<Reviews getClothesData={getReviewData} clothes={clothes} reviews={reviews} setReviews={setReviews}/>}></Route>
          <Route path="/Detailed/:clothingId" element={<Detailed getItemData={getItemData} getReviews={getReviewData} clothing={clothing} reviews={reviews}/>}></Route>
          <Route path="/Search/:query" element={<Search getItemData={getItemData} getReviews={getReviewData} clothing={clothes} query={queryClothes}/>}/>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;



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


// import { useState, useEffect } from "react";
// import {
//   Authenticator,
//   Button,
//   Text,
//   TextField,
//   Heading,
//   Flex,
//   View,
//   Image,
//   Grid,
//   Divider,
// } from "@aws-amplify/ui-react";
// import { Amplify } from "aws-amplify";
// import "@aws-amplify/ui-react/styles.css";
// import { getUrl } from "aws-amplify/storage";
// import { uploadData } from "aws-amplify/storage";
// import { generateClient } from "aws-amplify/data";
// import outputs from "./amplify/amplify_outputs.json";
// /**
//  * @type {import('aws-amplify/data').Client<import('./amplify/data/resource').Schema>}
//  */

// Amplify.configure(outputs);
// const client = generateClient({
//   authMode: "userPool",
// });

// export default function App() {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   async function fetchNotes() {
//     const { data: notes } = await client.models.Note.list();
//     await Promise.all(
//       notes.map(async (note) => {
//         if (note.image) {
//           const linkToStorageFile = await getUrl({
//             path: ({ identityId }) => `media/${identityId}/${note.image}`,
//           });
//           console.log(linkToStorageFile.url);
//           note.image = linkToStorageFile.url;
//         }
//         return note;
//       })
//     );
//     console.log(notes);
//     setNotes(notes);
//   }

//   async function createNote(event) {
//     event.preventDefault();
//     const form = new FormData(event.target);
//     console.log(form.get("image").name);

//     const { data: newNote } = await client.models.Note.create({
//       name: form.get("name"),
//       description: form.get("description"),
//       image: form.get("image").name,
//     });

//     console.log(newNote);
//     if (newNote.image)
//       if (newNote.image)
//         await uploadData({
//           path: ({ identityId }) => `media/${identityId}/${newNote.image}`,

//           data: form.get("image"),
//         }).result;

//     fetchNotes();
//     event.target.reset();
//   }

//   async function deleteNote({ id }) {
//     const toBeDeletedNote = {
//       id: id,
//     };

//     const { data: deletedNote } = await client.models.Note.delete(
//       toBeDeletedNote
//     );
//     console.log(deletedNote);

//     fetchNotes();
//   }

//   return (
//     <Authenticator>
//       {({ signOut }) => (
//         <Flex
//           className="App"
//           justifyContent="center"
//           alignItems="center"
//           direction="column"
//           width="70%"
//           margin="0 auto"
//         >
//           <Heading level={1}>My Notes App</Heading>
//           <View as="form" margin="3rem 0" onSubmit={createNote}>
//             <Flex
//               direction="column"
//               justifyContent="center"
//               gap="2rem"
//               padding="2rem"
//             >
//               <TextField
//                 name="name"
//                 placeholder="Note Name"
//                 label="Note Name"
//                 labelHidden
//                 variation="quiet"
//                 required
//               />
//               <TextField
//                 name="description"
//                 placeholder="Note Description"
//                 label="Note Description"
//                 labelHidden
//                 variation="quiet"
//                 required
//               />
//               <View
//                 name="image"
//                 as="input"
//                 type="file"
//                 alignSelf={"end"}
//                 accept="image/png, image/jpeg"
//               />

//               <Button type="submit" variation="primary">
//                 Create Note
//               </Button>
//             </Flex>
//           </View>
//           <Divider />
//           <Heading level={2}>Current Notes</Heading>
//           <Grid
//             margin="3rem 0"
//             autoFlow="column"
//             justifyContent="center"
//             gap="2rem"
//             alignContent="center"
//           >
//             {notes.map((note) => (
//               <Flex
//                 key={note.id || note.name}
//                 direction="column"
//                 justifyContent="center"
//                 alignItems="center"
//                 gap="2rem"
//                 border="1px solid #ccc"
//                 padding="2rem"
//                 borderRadius="5%"
//                 className="box"
//               >
//                 <View>
//                   <Heading level="3">{note.name}</Heading>
//                 </View>
//                 <Text fontStyle="italic">{note.description}</Text>
//                 {note.image && (
//                   <Image
//                     src={note.image}
//                     alt={`visual aid for ${notes.name}`}
//                     style={{ width: 400 }}
//                   />
//                 )}
//                 <Button
//                   variation="destructive"
//                   onClick={() => deleteNote(note)}
//                 >
//                   Delete note
//                 </Button>
//               </Flex>
//             ))}
//           </Grid>
//           <Button onClick={signOut}>Sign Out</Button>
//         </Flex>
//       )}
//     </Authenticator>
//   );
// }
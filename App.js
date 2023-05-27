import React, { useState, useEffect } from "react";
import Home from "./pages/Home" //non mettere MAI .js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import BookDetails from "./components/BookDetails";
import ContactUs from "./pages/ContactUs";

function App() {

  const [books, setBooks] = useState([]);

  console.log(books);
  const getBooks = async () => {
    try {
      const data = await fetch('https://epibooks.onrender.com/') //prendo i dati
      const response = await data.json() //li trasformo in json
      setBooks(response) //li passo allo stato
    } catch (error) {
      //console.log(error)
    }
  }
  //sintassi useEffetc che serve per eseguire le funzioni durante i cicli di vita di un componente (montato, props aggiornano, smontato scompare lifecycle)
  useEffect(() => {
    getBooks()
    return () => {
      //console.log('fino a qui tutto bene') //eseguito allo smontaggio
    }
  }, []) //array delle dipendenze

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/:asin" element={<BookDetails />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
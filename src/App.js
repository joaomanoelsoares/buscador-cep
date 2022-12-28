import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import api from './services/api';
import './style.css';


function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState ({});

 async function handleSearch() {
    if(input === '') {
      alert("Preencha o campo CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

    }catch{
      alert("Erro ao buscar.")
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

    <div className="container-input">
      <input type="text" placeholder="Insira o CEP" value={input} onChange={ (e) => setInput(e.target.value) }></input>

      <button onClick={handleSearch}>
        <BsSearch />
      </button>

    </div>

    {Object.keys(cep).length >0 && (
          <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.uf}</span>
          <span>DDD: {cep.ddd}</span>
        </main>
    )};

    </div>
  );
}

export default App;

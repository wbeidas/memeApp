
import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LinearProgress } from '@material-ui/core';
import {FiSearch } from "react-icons/fi";

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)


  async function getMemes() {
    setLoading(true)
    setMemes([])
    console.log("Get MEMES")
    const key = 'ijPi2ihItqenhhcb0CORVVYcuT8oawf8'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key='+key
    const searchWord = text.replace(/ +/g, "");
    url += '&q=' +searchWord
    console.log(url)
    const r = await fetch(url)
    const body = await r.json()
    console.log(body)
    setMemes(body.data)
    setText('')
    setLoading(false)
  }

  console.log(memes)

  return (
    <div className="App">
      <header className="App-header">

        <div className='input-wrap'>
          <TextField fullWidth variant="outlined" 
            label="Search for a meme!"
            value={text}
            onChange={e=> setText(e.target.value)}

            onKeyPress={e=> {
              if(e.key==='Enter') {
                getMemes()
              }
            }}
          />

          <Button id='searchButton' variant="contained" color="primary"
            onClick={getMemes}>
            <FiSearch /> 
          </Button>
        </div>

        {loading && <LinearProgress />}

        <div className='all_memes'>
          {memes.map((meme, i)=> <Meme key={i} {...meme} />)}
        </div>
        

      </header>
    </div>
  );
}

function Meme({title, images}){
  return <div className='meme'>
    <img onClick={()=> window.open(images.fixed_height.url, "_blank")}
      src={images.fixed_height.url} alt='this is a meme'
    />
    <div className='meme-title'>{title}</div>
  </div>

}




export default App;
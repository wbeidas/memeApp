import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LinearProgress } from '@material-ui/core';
import { Search } from '@material-ui/icons';

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)

  async function getMemes(){
    setLoading(true)
    setMemes([])
    const key = 'ijPi2ihItqenhhcb0CORVVYcuT8oawf8'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key='+key
    url += '&q='+text
    const r = await fetch(url)
    const body = await r.json()
    setMemes(body.data)
    setText('')
    setLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField fullWidth variant="outlined"
            label="Search for memes!"
            value={text}
            onChange={e=> setText(e.target.value)}
            onKeyPress={e=> {
              if(e.key==='Enter') getMemes()
            }}
          />
          <Button variant="contained" color="primary"
            onClick={getMemes}>
            <Search />
            Search
          </Button>
        </div>
      </header>
      {loading && <LinearProgress />}

      <div className="memes">
        {memes.map((meme,i)=> <Meme key={i} {...meme} />)}
      </div>
    </div>
  )
}

function Meme({images, title}){
  return <div className="meme">
    <img src={images.fixed_height.url} alt="meme" />
    <div className="meme-title">{title}</div>
  </div>
}

export default App;
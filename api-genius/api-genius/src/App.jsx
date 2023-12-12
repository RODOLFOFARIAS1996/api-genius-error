import { useEffect, useState  from 'react';
import '.css/App.css';
// import  'button' from bootstrap;


function App() {
  const [items, setItems] = useState('');
  const [tracks, setTracks] = useState([]);
  


  const getTracks = async () => {
   
    try {
      const response = await fetch(
        `https://api.genius.com/search?q=${items}&access_token=PoH0gsYTwd_gVzrq6pfLUlZJrsQP6wBGZNgJfy1QvpdaIYGesKZesvxmEDBhjcx4&limit=10,
      
        
      );

      if (response.ok) {
        const tracksData = await response.json();
        setTracks(tracksData.response.hits);
        setItems('');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error', error.message);
    }
    
  };

   
  return (
    <>
      <div>
        
          
          <h2>Buscar una canción</h2>
          <input
            type="text"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            placeholder="Buscar"
          />
          <button onClick={getTracks}>Buscar</button>
          <h2>Resultados</h2>
          <div className='card-grid'> 

            
              {tracks.map((result) => (
                <><img src={result.result.song_art_image_url} alt="" />
                <li key={result.result.id}><span>Nombre de la cancion: </span>{result.result.title}</li>
                <li><span>Artista: </span>{result.result.artist_names}</li>
                <li><span>Fecha: </span>{result.result.release_date_for_display}</li>
              
                 </>
              ))}
            

          </div> 

        
      </div>
    </>
  );
}

export default App;

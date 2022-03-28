import React,{useState,useEffect} from 'react';
import Formulario from './Components/Formulario';
import ListadoImagenes from './Components/ListadoImagenes';


function App() {

  //State para almacenar el termino enviado desde el formulario
  const [traerTermino,guardarTraerTermino]=useState('');
  //State para almacenar el resultado de la api
  const [resultadoApi, guardarResultadoApi] = useState([]);
  //State para guardar la pagina actual
  const [paginaActual,guardarPaginaActual] = useState(1);
  //State para guardar el total de pagina
  const [totalPagina,guardarTotalPagina] = useState(1);


    

  useEffect(() => {
    if(traerTermino.trim() === '') {
      return;
    }
   const  buscarApi = async() =>{
      const key='25288389-f14c7c32cf1a303377966a6d6';
      const numeroPagina=30;
      const url=`https://pixabay.com/api/?key=${key}&q=${traerTermino}&per_page=${numeroPagina}&page=${paginaActual}`

      const api = await fetch(url);
      const resultadoApi=await api.json();
     guardarResultadoApi(resultadoApi.hits);

     //Calculando el numero de paginas
     const calcularPagina= Math.ceil(resultadoApi.totalHits/ numeroPagina);
     guardarTotalPagina(calcularPagina);

     //Scroll para cuando se le de click suba al inicio
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({behavior:'smooth'});

   }
   buscarApi();
  }, [traerTermino,paginaActual])

  //Definar pagina anterior
  const paginaAnterior = () =>{
    const paginaResultado= paginaActual - 1;

    if(paginaResultado === 0) 
    {
      return;
    }
    guardarPaginaActual(paginaResultado);

  }

  //Definir pagina siguiente
  const paginaSiguiente = () =>{
    const paginaResultado= paginaActual + 1;

    if(paginaResultado > totalPagina) 
    {
      return;
    }
    guardarPaginaActual(paginaResultado);

  }
  return (
    <div className="container">
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imagenes</p>
        <Formulario
          guardarTraerTermino={guardarTraerTermino}
        />
       
        
      </div>
       <div className="row justify-content-center">
          <ListadoImagenes
            resultadoApi={resultadoApi}
          />
          {
            ( 
            paginaActual ===1? null :<button
            type='button'
            className='btn btn-info mr-1'
            onClick={paginaAnterior}
            > &laquo; Anterior</button>) 
          }
          {
            (paginaActual === totalPagina ? null : <button
            type='button'
            className='btn btn-info '
            onClick={paginaSiguiente}
            >Siguiente &raquo;</button>)
          }
          
          
        </div>
    </div>
  );
}

export default App;

import React,{useState} from 'react';
import Error from './Error';


const Formulario = ({guardarTraerTermino,buscarApi}) => {

    //State para almacenar lo que escriba el usuario
    const [termino,guardarTermino] = useState('');
    //State para almacenar el error
    const [isError,guardarError] = useState(false);

    //Funcion para el cuando el usuario le de a buscar
    const buscarImagen = e =>{
        e.preventDefault();
        //Validar formulario
        if(termino.trim() ===''){
            
            guardarError(true);
            return;
        }
        guardarError(false);
        //Esta funcion llevara el termino hacia el app
        guardarTraerTermino(termino);
    }

    return ( 
        <form
            onSubmit={buscarImagen}
        >
            <div className='row'>
                <div className='form-gruop col-md-8'>
                    <input
                        type='text'
                         className='form-control form-control-lg'
                         placeholder='Buscar una imagen, ejemplo: basketball o cafe'
                         value={termino}
                        onChange={ e => guardarTermino(e.target.value)}               
                    />
                </div>
                <div className='form-gruop col-md-4'>
                    <input
                        type='submit'
                        className='btn btn-lg btn-danger btn-block'
                        value='Buscar'       
                    />
                </div>
            </div>
            {isError ? <Error mensaje='Debes de llenar todos los campos'/> :null}
        </form>

     );
}
 
export default Formulario;
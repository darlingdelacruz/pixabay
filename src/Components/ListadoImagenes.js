import React,{ useState } from 'react';
import Imagen from './Imagen';



const ListadoImagenes = ({resultadoApi}) => {

   
   

    return ( 
        <div className="col-12 p-5 row">
           {resultadoApi.map(imagen =>(
               <Imagen
                    key={imagen.id}
                    imagen={imagen}
               />
           ))}
                
        </div>
     );
}
 
export default ListadoImagenes;
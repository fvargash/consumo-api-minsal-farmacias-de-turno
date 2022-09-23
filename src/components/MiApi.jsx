import React, { useState, useEffect } from "react";
 function MiApi(){
    const[infoFarmacias,setInfoFarmacias] = useState([]);

    const [buscadorFarmacias,setBuscadorFarmacias] = useState("")

    const handleSearch = (ev) => {
        setBuscadorFarmacias(ev.target.value)
      }


 useEffect(() => {
    consultarInformacion();
 }, []);

 const consultarInformacion = async () => {
    const url = 'http://farmanet.minsal.cl/index.php/ws/getLocalesTurnos'
    const response = await fetch(url)
    const data = await response.json()
    setInfoFarmacias(data);
 }

 return (
    <React.Fragment>
        <div className='navbar'>
            <h1 className='buscador'>Buscador de farmacia - Escribe tu comuna :</h1>
            <input name="busqueda" className='input-buscador' placeholder='Buscar por comuna' type="text" onChange={handleSearch}/>
        </div>
        <h1 className="titulo">Farmacias de turno del día- Localidades</h1>
        <div>            
            <table  className="tabla" align="center" border="4">
                <thead>
                    <tr className="lista">
                    <th>Fecha Actualizacion datos</th><th>Nombre Farmacia</th><th>Comuna</th><th>Localidad</th><th>Dirección</th><th>Horario Apertura</th><th>Horario Cierre</th><th>Numero Contacto</th><th>Días de Funcionamiento</th>
                </tr>
                </thead>
                <tbody>
                { infoFarmacias.filter((comuna) => {
                        return(
                            comuna.comuna_nombre.toLowerCase().includes(buscadorFarmacias.toLowerCase())
                        )
                        }).map((local) => {
                            return(
                        <tr key={local.local_id}>
                            <td>{local.fecha}</td><td>{local.local_nombre}</td><td>{local.comuna_nombre}</td><td>{local.localidad_nombre}</td><td>{local.local_direccion}</td><td>{local.funcionamiento_hora_apertura}</td><td>{local.funcionamiento_hora_cierre}</td><td>{local.local_telefono}</td><td>{local.funcionamiento_dia}</td>
                        </tr>)
                }).sort()}
                </tbody>
            </table>
        </div>
    </React.Fragment>        
 );
}

 export default MiApi;
 



 
/*"fecha": "2022-09-21"
    "local_nombre": "CRUZ VERDE",
    "comuna_nombre": "LA CALERA",
    "localidad_nombre": "LA CALERA",
    "local_direccion": "J.J. PEREZ 202",
    "funcionamiento_hora_apertura": "09:00:00",
    "funcionamiento_hora_cierre": "08:59:00",
    "local_telefono"
    "funcionamiento_dia"*/

    /*Fecha Actualizacion datos - Nombre Farmacia - Comuna - Localidad - Dirección - Horario Apertura - Horario Cierre - Numero Contacto - Días de Funcionamiento */
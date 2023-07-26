export async function ObtenerClientes(){
   
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    const resultado = await respuesta.json()

    return resultado
}

export async function Obtenercliente(id){
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const resultado = await respuesta.json()
    return resultado
}

export async function AgregarCliente(datos){

    try{
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                'content-type': 'application/json'
            }
        } );
        
        await respuesta.json()
    }
    catch(error){
        console.log(error)
    }
    return {}
    
}

export async function ActualizarCliente(datos, id){
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: {
                'content-type': 'application/json'
            }
        } );
        
        await respuesta.json()
    }
    catch(error){
        console.log(error)
    }
    return {}
}

export async function EliminarCliente(id){
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "DELETE"
        } );
        
        await respuesta.json()
    }
    catch(error){
        console.log(error)
    }
    return {}
}
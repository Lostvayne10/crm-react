import { Form, useLoaderData, useNavigate, useActionData, redirect } from "react-router-dom"
import { Obtenercliente, ActualizarCliente  } from "../data/Clientes"
import Formulario from "../components/Formulario"



export async function loader({params}){
   
    const cliente = await Obtenercliente(params.clienteId)
    if(Object.values(cliente).length === 0){
      
        throw new Response('',{
            status:404,
            statusText:"El cliente no fue encontrado"
        })
    }
    return cliente
}

export async function action({request, params}){
    const formData = await request.formData() 
  
    const datos = Object.fromEntries(formData)

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    const email = formData.get('email')

    const errores = []
    if(Object.values(datos).includes("")){
        errores.push("Todos los campos son obligatorios")
    }

    if(!regex.test(email)){
        errores.push("El email no es valido")
    }

    if(Object.keys(errores).length>0){
        return errores
    }

    await ActualizarCliente(datos, params.clienteId);
    
    return  redirect("/")
}

function EditarCliente() {
    const cliente = useLoaderData()
    const navigate = useNavigate()
    const errores = useActionData()

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
            <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>
            <div className='flex justify-end'>
                <button 
                    onClick={() => navigate(-1)}
                    className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'>
                    Volver
                </button>
            </div>
            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
       
                 { errores?.length &&  errores.map( (error, i) => (<Error key={i}>{error}</Error>) ) }
                <Form 
                    noValidate
                    method="POST"
                    
                >
                    <Formulario 
                        cliente={cliente}
                        />
                    <input type="submit" className="mt-5 w-full bg-blue-800 p-3 uppercase text-white text-lgo" value="Actualizar Cliente" />
                </Form>
            </div>
        </>
      )
}

export default EditarCliente
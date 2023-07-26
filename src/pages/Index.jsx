import { useLoaderData } from "react-router-dom";
import Cliente from "../components/Cliente";
import { ObtenerClientes } from "../data/Clientes.js";



export async function loader(){
   
    const clientes = await ObtenerClientes()

    if(clientes.length===0){
        throw new Response('',{
            status:404,
            statusText:"No hay resultados"
        })
    }


    return clientes;
}

function Index() {

  const clientes = useLoaderData();



  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
        <p className='mt-3'>Administra tus Clientes</p>

        {clientes.length > 0 ?  (
            <table className="w-full bg-white shadow mt-5 table-auto">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">
                            Clientes
                        </th>
                        <th className="p-2">
                            Contacto
                        </th>
                        <th className="p-2">
                            Acciones
                        </th>
                    </tr>

                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <Cliente
                            cliente={cliente}
                            key={cliente.id}
                            />
                    ))}
                </tbody>
            </table>
        ): (<p className='text-center mt-10'>
            No hay clientes
            </p>) }

    </>
  )
}

export default Index
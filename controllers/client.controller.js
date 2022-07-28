import { clientServices } from "../service/client-service.js";

const crearNuevaLinea = (nombre, email, id) => {
    const linea = document.createElement("tr");
    const contenido = `
            <td class="td" data-td>${nombre}</td>
            <td>${email}</td>
            <td>
              <ul class="table__button-control">
                <li>
                  <a
                    href="../screens/editar_cliente.html?id=${id}"
                    class="simple-button simple-button--edit"
                    >Editar</a
                  >
                </li>
                <li>
                  <button
                    class="simple-button simple-button--delete"
                    type="button"  
                    id = "${id}"               
                  >
                    Eliminar
                  </button>
                </li>
              </ul>
            </td>
          `;
          linea.innerHTML = contenido;
          const btn = linea.querySelector("button");
          btn.addEventListener("click", async ()=>{
            const id = btn.id;
            try{
                const perfil = await clientServices.eliminarCliente(id);
                if(perfil.id){
                    throw new Error();
                }
            }catch(error){
                alert("Ocurrió un error");
            }
        })      
          return linea;
};

const table = document.querySelector("[data-table");

const lista = async () =>{
    try{
        const clientes = await clientServices.listaClientes();
        if(clientes.length>=0){
        clientes.forEach(({nombre,email,id}) => {
            const nuevaLinea = crearNuevaLinea(nombre,email, id);
            table.appendChild(nuevaLinea);
        });
        }else{
            throw new Error();
        }
    }catch(error){
        alert("No hay clientes registrados")
    }

}
lista();


 
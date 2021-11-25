import React from "react";
import { useState } from "react";
import { Button } from "bootstrap";
import InputModal from "./InputModal";


function BootsModal({empleados, setEmpleados}) {
    const presetCloud = 'jkby2ddk';
    const apiCLoud = 'https://api.cloudinary.com/v1_1/iluiss/upload'
    
    const [url,setUrl] = useState('');
    const [nombre,setNombre] = useState('');
    const [cargo,setCargo] = useState('');

    const agregarItem = (empleado) => {
            setEmpleados([...empleados, empleado]);
            postEmpleado(empleado);
      
        };  


    const postEmpleado = async (Empleado) => { await fetch('https://restaurante-sal-salsa20211123190304.azurewebsites.net/api/Empleado',{
        method: 'Post',
        body: JSON.stringify(Empleado),
        headers:{
            'Content-Type': 'application/json'
        }

    })};

    const SubirEmpleado = () =>{
        if(url === 'Subiendo'){
            alert('Por favor espere a que se suba la imagen')
        }else if(!url || !nombre || !cargo){
            alert('Por favor digite o suba todos los datos solicitados');
        }else{
            console.log(url);
            const empleado = {
                restaurante_id: 1,
                nombre: nombre,
                descripcion: cargo,
                imagen: url.toString()
            }
            // postEmpleado(empleado);
            agregarItem(empleado);
            }
    }
    const obtenerInfo = (e) => {
        subir(e.target.files[0]).then((result) => {

        }).catch((err) => {
            console.log(err);
        });

    }
    
  

    const subir= async(file) => {

        const formData = new FormData();
        formData.append('upload_preset',presetCloud);
        formData.append('file',file);
        setUrl('Subiendo');

        try{
            const resp  = await fetch(apiCLoud, {
                method: 'POST',
                body:formData
            })

            if(resp.ok){
                const cloudResp = await resp.json();
                alert('imagen subida');
                console.log(cloudResp);
                setUrl(cloudResp.url);
            }else{
                throw await resp.json();
            }

        }catch(error){
            throw error 
        }
    }


  return (
    <>
      <button
        type="button"
        className="m-3 btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Nuevo empleado
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Nuevo empleado
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>

                <InputModal
                nombre = "nombre:"
                setInput= {setNombre}
                ></InputModal>
                  <InputModal
                nombre = "Cargo:"
                setInput= {setCargo}
                ></InputModal>
                
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Imagen:
                  </label>
                  <input onChange={obtenerInfo} type="file" className="form-control" id="recipient-name" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={SubirEmpleado} type="button" className="btn btn-success" data-bs-dismiss="modal" >
                Crear Empleado
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BootsModal;

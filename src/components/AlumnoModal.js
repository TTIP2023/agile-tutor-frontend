
const AlumnoModal = ({ name, surname, studentid, identifier, emailedit, observations, setName, setSurname, setIdentifier, setEmailedit, setObservations, handleClickUpdate }) => {

    return (

        <div id={"modaledit" + studentid} className="modal">
            {console.log(studentid)}
            <div className="modal-content">
                {handleClickUpdate == null ?
                    <h4>Datos del estudiante:</h4>
                    :
                    <h4>Modifique los datos actuales:</h4>
                }
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                {handleClickUpdate == null ?
                                    <input disabled value={surname} id="last_name" type="text" className="validate" />
                                    :
                                    <input defaultValue={surname} onChange={(e) => setSurname(e.target.value)} id="last_name" type="text" className="validate" />
                                }
                                <label className="active" htmlFor="last_name">Apellido</label>
                            </div>
                            <div className="input-field col s6">
                                {handleClickUpdate == null ?
                                    <input disabled value={name} id="first_name" type="text" className="validate" />
                                    :
                                    <input defaultValue={name} onChange={(e) => setName(e.target.value)} id="first_name" type="text" className="validate" />
                                }
                                <label className="active" htmlFor="first_name">Nombre</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                {handleClickUpdate == null ?
                                    <input disabled value={emailedit} id="email" type="email" className="validate" />
                                    :
                                    <input defaultValue={emailedit} onChange={(e) => setEmailedit(e.target.value)} id="email" type="email" className="validate" />
                                }
                                <label className="active" htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s6">
                                {handleClickUpdate == null ?
                                    <input disabled value={identifier} id="identifier" type="number" className="validate" />
                                    :
                                    <input defaultValue={identifier} onChange={(e) => setIdentifier(e.target.value)} id="identifier" type="number" />
                                }
                                <label className="active" htmlFor="itentifier">identificacion</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                {handleClickUpdate == null ?
                                    <textarea disabled value={observations} id="textarea1" className="materialize-textarea" />
                                    :
                                    <textarea defaultValue={observations} onChange={(e) => setObservations(e.target.value)} id="textarea1" className="materialize-textarea"></textarea>
                                }
                                <label className="active" htmlFor="textarea1">Observaciones</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal-footer">
                {handleClickUpdate == null ?
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cerrar</a>
                    : <div>
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                        <a href="#!" onClick={() => { handleClickUpdate(); }} className="modal-close waves-effect waves-green btn-flat">Aceptar</a>
                    </div>
                }
            </div>
        </div>);
};

export default AlumnoModal;
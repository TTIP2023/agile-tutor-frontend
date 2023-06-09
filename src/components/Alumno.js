import { useContext } from 'react';
import { Context } from '../context/Context.js';
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css';

function Alumno({ id, id_asistencia, nombre, asistencia, clnametr, disablevalue }) {

  const { updateAttendance } = useContext(Context)

  const handleChangeAttendance = ({ target }) => {
    updateAttendance(target, id_asistencia);
  }

  return (
    <tr className={clnametr} >
      <td id="columna-apellidonombre">{nombre}</td>
      <td id="columna-check">
        <label>
          { 
          (asistencia === true) || (asistencia === "true") ?
            <input data-testid="attendancebutton" id={id} name={nombre} type="checkbox" className="filled-in" checked="checked" onChange={handleChangeAttendance} disabled={disablevalue}/>
            :
            <input data-testid="attendancebutton" id={id} name={nombre} type="checkbox" className="filled-in" checked={false} onChange={handleChangeAttendance} disabled={disablevalue}/>}
          <span>✔</span>
        </label>
      </td>
    </tr>
  );
}

export default Alumno;
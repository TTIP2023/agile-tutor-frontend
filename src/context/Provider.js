import { useEffect, useState } from "react"
import { alumnoService } from "../service/alumnoService"
import { Context } from "./Context"
import { AttendanceModel } from "../domain/attendanceModel"
import { StudentAttendanceDTO } from "../domain/studentAttendanceDTO"

export const Provider = ({ children }) => {

  const [checked, setChecked] = useState([])
  const [todb, setTodb] = useState(false)
  const [number, setNumber] = useState(1)

  const value = {
    //estado
    checked,
    number,
    //funciones que afectan el estado
    updateAttendance: (target, id_asistencia) => {
      const updatedChecked = checked.map(alumno =>
        alumno.id === (target.id * 1)
          ? { ...alumno, attendances: modifyAttendance(alumno.attendances, (target.checked), (id_asistencia)) }
          : alumno
      )
      setChecked(updatedChecked)
    },
    saveAttendance: (day) => {
      console.log('guardando cambios')
      updateAttendances(attendanceToStudentAttendanceDTO(checked, day), number)
    },
    getCourse: (number) => {
      console.log('cargando comision')
      loadCourse(number)
      setNumber(number)
    },
    blockUnblockStudent: (idStudent, blockedStatus) => {
      console.log('bloqueo/desbloqueo de estudiante')
      const updateBlocked = checked.map(alumno =>
        alumno.id === idStudent ? { ...alumno, bloqued: blockedStatus } : alumno)
      setChecked(updateBlocked)

      blockStudent(idStudent, blockedStatus)
    }
  }

  const attendanceToStudentAttendanceDTO = (checked, day) => {
    const list = checked.map(alumno =>
      StudentAttendanceDTO.toJson(alumno.id, alumno.attendances.filter(attendance =>
        attendance.day == day)[0]))
    return list
  }

  const modifyAttendance = (attendances, check, id_asistencia) => {
    console.log(id_asistencia, check)
    const checkString = check.toString()
    return attendances.map(attendance => attendance.id === id_asistencia
      ? { ...attendance, attended: checkString } : attendance)
  }

  const attendanceAsJson = (attendanceJson) => {
    return AttendanceModel.fromJson(attendanceJson)
  }

  const updateAttendances = async (updatedAttendances, number) => {
    await alumnoService.updateAttendances(updatedAttendances, number)
    setTodb(true)
  }

  const blockStudent = async (idStudent, blockedStatus) => {
    await alumnoService.blockStudent(idStudent, blockedStatus)
    setTodb(true)
  }

  const loadCourse = async (number) => {
    try {
      const comision = await alumnoService.getComision(number)
      console.log(comision)
      let asistencias = comision.map(alumno => alumno.attendances).flat()
      console.log(asistencias.filter(attendance => attendance.day === 1))
      comision.map(alumno =>
        alumno.attendances.map(attendanceAsJson))
      setChecked(comision)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadCourse(number)
  }, [todb])

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}
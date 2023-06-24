import axios from 'axios';
import { AlumnoModel } from '../domain/alumnoModel'
import { CourseModel } from '../domain/courseModel';
import { REST_SERVER_URL } from './constants'
import M from 'materialize-css/dist/js/materialize.min.js';

class AlumnoService {

  alumnoAsJson(alumnoJson) {
    return AlumnoModel.fromJson(alumnoJson)
  }

  courseAsJson(courseJson) {
    return CourseModel.fromJson(courseJson)
  }

  async getComision(number) {

    try {
      const alumnosJson = await axios.get(`${REST_SERVER_URL}/api/course/students/${number}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(alumnosJson);
      const alumnos = alumnosJson.data.map(this.alumnoAsJson);
      return alumnos.sort((a, b) => (a.surname < b.surname) ? -1 : 1);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllStudents() {

    try {
      const alumnosJson = await axios.get(`${REST_SERVER_URL}/api/students`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(alumnosJson);
      const alumnos = alumnosJson.data.map(this.alumnoAsJson);
      return alumnos.sort((a, b) => (a.surname < b.surname) ? -1 : 1);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCourses() {

    try {
      const coursesJson = await axios.get(`${REST_SERVER_URL}/api/course`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(coursesJson);
      const courses = coursesJson.data.map(this.courseAsJson);
      console.log(courses);
      return courses.sort((a, b) => (a.id < b.id) ? -1 : 1);
    } catch (error) {
      console.error(error);
    }
  }
  /*
    async updateAttendances(attendances, course) {
      console.log(attendances);
      let asistencias = JSON.stringify(attendances)
      console.log(asistencias);
      try {
        const response = await axios({
          url: `${REST_SERVER_URL}/api/students/attendances/update/${course}`,
          method: 'POST',
          data: asistencias,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true'
          },
        })
        M.toast({ html: 'Asistencias actualizadas con éxito!' })
        return response
      } catch (e) {
        alert(e)
        console.error(e)
      }
    }
  */
  async updateAttendances(attendances, courseId) {
    console.log(attendances);
    let asistencias = JSON.stringify(attendances)
    console.log(asistencias);
    try {
      const response = await axios({
        url: `${REST_SERVER_URL}/api/course/students/attendances/update/${courseId}`,
        method: 'PUT',
        data: asistencias,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
      })
      M.toast({ html: 'Asistencias actualizadas con éxito!' })
      return response
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }

  async blockStudent(id, blockedStatus) {
    let blockedstring = JSON.stringify(blockedStatus)
    console.log(blockedstring);
    try {
      const response = await axios({
        url: `${REST_SERVER_URL}/api/students/block/${id}`,
        method: 'PUT',
        data: { blocked: blockedstring },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
      })
      M.toast({ html: 'Alumno actualizado con éxito!' })
      return response
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }

  async getNotifierAbsent() {

    try {
      const alumnosJson = await axios.get(`${REST_SERVER_URL}/api/students/toNotify`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(alumnosJson);
      const alumnos = alumnosJson.data.map(this.alumnoAsJson);
      return alumnos.sort((a, b) => (a.surname < b.surname) ? -1 : 1);
    } catch (error) {
      console.error(error);
    }
  }


  async updateCourse(comision) {
    try {
      return await axios.put(`${REST_SERVER_URL}/comision/${comision.id}`, { listado: comision })
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }

  async getStudent(id) {

    try {
      const alumnoJson = await axios.get(`${REST_SERVER_URL}/api/students/${id}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(alumnoJson);
      const alumno = this.alumnoAsJson(alumnoJson);
      return alumno;
    } catch (error) {
      console.error(error);
    }
  }

  async updateStudent(id, student) {
    // let studentstring = JSON.stringify(student)
    console.log(student);
    try {
      const response = await axios({
        url: `${REST_SERVER_URL}/api/students/${id}`,
        method: 'PUT',
        data: student,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
      })
      M.toast({ html: 'Alumno actualizado con éxito!' })
      return response
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }

  async getStudentsOfTutor(id) {

    try {
      const alumnosJson = await axios.get(`${REST_SERVER_URL}/api/tutor/students/${id}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(alumnosJson);
      const alumnos = alumnosJson.data.map(this.alumnoAsJson);
      return alumnos.sort((a, b) => (a.surname < b.surname) ? -1 : 1);
    } catch (error) {
      console.error(error);
    }
  }

  async getCoursePercent(id) {

    try {
      const percent = await axios.get(`${REST_SERVER_URL}/api/course/students/attendances/average/${id}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(percent.data);
      return percent.data;
    } catch (error) {
      console.error(error);
    }
  }

  async checkIfExistEmail(email) {
    console.log("enalumnoservidecheckif" + email);
    try {
      const exist = await axios.get(`${REST_SERVER_URL}/api/students/checkmail/${email}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(exist.data);
      if (!exist.data) {
        M.toast({ html: 'Email no registrado!', classes: "red-app" });
      }
      return exist.data;
    } catch (error) {
      console.error(error);
    }
  }

  async addNewSurveyResponse(email, completeSurvey) {
    console.log(email, completeSurvey)
    try {
      const survey = await axios({

        url: `${REST_SERVER_URL}/api/students/survey/${email}/`,
        method: 'POST',
        data: completeSurvey,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
      })
      console.log(survey.data)
      M.toast({
        html: `Su respuesta a la encuesta ha sido procesada satisfactoriamente`,
        classes: "#388e3c green darken-2",
      });
      return survey.data;
    } catch (err) {
      M.toast({ html: "Se ha producido un error", classes: "red-app" });
      console.log(err);
    }
  }

  async addNewStudentToACourse(newStudent) {
    /*        
    attendances!!.map { AttendanceDTO(it.id, it.day, it.attended).aModelo() }.toMutableSet()
    student.attendancepercentage = 0.0
    student.blocked = blocked
  
            const response = await axios({
          url: `${REST_SERVER_URL}/api/students/attendances/update/${course}`,
          method: 'POST',
          data: asistencias,
    */
    let newStudentJson = JSON.stringify(newStudent)
    try {
      const studentJson = await axios({

        url: `${REST_SERVER_URL}/api/students/register`,
        method: 'POST',
        data: newStudentJson,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
      })
      const student = this.alumnoAsJson(studentJson);
      console.log(student)
      M.toast({
        html: `El tutorando ${student.name} se ha creado satisfactoriamente`,
        classes: "#388e3c green darken-2",
      });
      return student;
    } catch (err) {
      M.toast({ html: "Datos invalidos o el tutorando ya existe", classes: "#c62828 red darken-3" });
      console.log(err);
    }
  }
}

export const alumnoService = new AlumnoService()
import express from 'express'

import { coursesController } from '../controllers/mongo/coursesController.js'

const routerCourses = express.Router()

routerCourses.get('/', coursesController.getAllCourses);  // ver cursos
routerCourses.post('/', coursesController.createCourse);  // agregar un curso
routerCourses.get('/:id', coursesController.getCourseById); // ver un curso
routerCourses.put('/:id', coursesController.updateCourse); // editar un curso
routerCourses.delete('/:id', coursesController.deleteCourse); //eliminar un curso
export default routerCourses
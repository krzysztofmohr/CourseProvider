import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import {apiCallError, beginApiCall} from "./apiStatusActions";

// action creators for clarity
export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses))
            })
            .catch(error => {
                throw error;
            })
    }
}

export function saveCourses(course) {
    return function (dispatch, getState) { //getState has all redux store
        dispatch(beginApiCall());
        return courseApi.saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse))
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            })
    }
}
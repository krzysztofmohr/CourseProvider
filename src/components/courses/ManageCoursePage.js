import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { loadCourses,saveCourses } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import {newCourse} from "../../../tools/mockData";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";

function ManageCoursePage({courses, authors, loadAuthors, loadCourses, saveCourses, history, ...props}) { // course ambiguity
    // avoid using redux for local form state
    // who cares about this data - plain react state

    const [course, setCourse] = useState({...props.course});
    const [errors, setErrors] = useState({});

    useEffect(() => {
            if(authors.length === 0)
            {
                loadAuthors().catch(err=> {
                    alert(err);
                });
            }
            if(courses.length === 0)
            {
                loadCourses().catch(err=> {
                    alert(err);
                });
            }
            else
            {
                setCourse({...props.course});
            }
         }, [props.course]);

        function handleChange(event) {
            const { name, value } = event.target;
            setCourse(prevCourse => ({
                ...prevCourse,
                [name]: name === 'authorId' ? parseInt(value, 10) : value
            }));
        }

        function handleSave(event) {
            event.preventDefault();
            saveCourses(course).then(() => {
                history.push("/courses");
            });
        }

        return (
            authors.length === 0 || courses.length === 0 ? <Spinner /> :
            <CourseForm authors={authors} course={course} errors={errors} onSave={handleSave} onChange={handleChange} />
        );
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourses: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

function getCourseBySlug(courses, slug) { // selector - selects data from redux store - can be memoized for performance
    return courses.find(course => course.slug === slug) || null;
}

// what part of state is presented to component
function mapStateToProps(state, ownProps) {
    const slug = ownProps.location.pathname.split('/').pop();
    const course = slug && state.courses.length ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

// action exposed on component
const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourses
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

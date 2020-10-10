import React from "react";
import {connect} from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseList from "./CourseList";
import {Redirect} from "react-router-dom";
import Spinner from "../common/Spinner";
import {toast} from "react-toastify";

class CoursesPage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    }

    componentDidMount() {
        const {loadAuthors, loadCourses} = this.props;
        loadAuthors().catch(err=> {
            alert(err);
        });
        loadCourses().catch(err=> {
            alert(err);
        });p
    }

    handleDeleteCourse = async course => {
        toast.success("course deleted");
        try {
            await this.props.deleteCourse(course);
        }
        catch(error) {
            toast.error("delete failed" + error.message, {autoClose: false});
        }
    }

    render() {
        return (
             <>
                 {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                 <h2>Courses</h2>
                 {this.props.loading ? <Spinner/> :(
                 <>
                     <button className="btn btn-primary add-course" onClick={() => this.setState({redirectToAddCoursePage: true})}>
                         Add Course
                     </button>

                     <CourseList onDeleteClick={this.handleDeleteCourse} courses={this.props.courses} />
                 </>
                     )}
             </>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

// what part of state is presented to component
function mapStateToProps(state) {
    return {
        courses: (state.authors.length === 0 || state.courses.length === 0) ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a=>a.id === course.authorId).name
            }
        }),
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    };
}

// action exposed on component
const mapDispatchToProps = {
    // each property should be action creator
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
    deleteCourse: courseActions.deleteCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

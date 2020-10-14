import React from "react";
import CourseForm from "./CourseForm";
import {shallow} from "enzyme"; // no dom created

function renderCourseForm(args) {
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    }

    const props = {...defaultProps, ...args};
    return shallow(<CourseForm {...props} />);
}

it('renders form and header', () => {
    const wrapper = renderCourseForm();
    //console.log(wrapper.debug()); // shows the markup we are working with
    expect(wrapper.find('form').length).toBe(1); // selector
    expect(wrapper.find('h2').text()).toEqual('Add Course'); // selector #a .a a
});

it('labels save buttons as Save when not saving', () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find('button').text()).toEqual('Save'); // selector #a .a a
});
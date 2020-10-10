import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-testing-library";
import {courses, authors} from "../../../tools/mockData"

it('sets submit button label to "saving" when saving is true', () => {
    const tree = renderer(<CourseForm onChange={jest.fn()} authors={authors} onSave={jest.fn()} course={courses[0]} saving/>);
    expect(tree).ToMatchSnapshot();
})
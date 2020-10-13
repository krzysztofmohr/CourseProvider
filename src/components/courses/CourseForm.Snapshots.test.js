import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import {courses, authors} from "../../../tools/mockData"

it('sets submit button label to "saving" when saving is true', () => {
    const tree = renderer.create(<CourseForm onChange={jest.fn()} authors={authors} onSave={jest.fn()} course={courses[0]} saving/>);
    expect(tree).toMatchSnapshot();
})

it('sets submit button label to "Save" when saving is false', () => {
    const tree = renderer.create(<CourseForm onChange={jest.fn()} authors={authors} onSave={jest.fn()} course={courses[0]} saving={false}/>);
    expect(tree).toMatchSnapshot();
})
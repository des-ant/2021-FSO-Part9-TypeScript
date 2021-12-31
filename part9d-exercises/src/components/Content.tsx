import React from 'react';
import { Course } from '../types';

const Content = ({ courses }: { courses: Course[] }) => (
  <div>
    {courses.map(course => (
      <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>
    ))}
  </div>
);

export default Content;
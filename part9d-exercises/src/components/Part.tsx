import React from 'react';
import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case 'normal':
      // TypeScript knows that we can use name, exerciseCount and description
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          <i>{part.description}</i>
        </p>
      );
    case 'groupProject':
      // TypeScript knows that we can use name, exerciseCount and groupProjectCount
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case 'submission':
      // TypeScript knows that we can use name, exerciseCount, description and
      // exerciseSubmissionLink
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          <i>{part.description}</i>
          <br />
          submit to {part.exerciseSubmissionLink}
        </p>
      );
    case 'special':
      // TypeScript knows that we can use name, exerciseCount, description and
      // requirements
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          <i>{part.description}</i>
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
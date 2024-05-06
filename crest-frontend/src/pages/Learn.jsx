import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function Learn() {
  const { id } = useParams();

  // Function to render content based on the URL id
  const renderContent = () => {
    switch (id) {
      case 'frontend':
        return (
          <>
            <VerticalTimelineElement>
              <Link to={'/learn/frontend/html'}>
                <h1>HTML</h1>
                <p>Learn about semantic markup, forms, tables, and accessibility.</p>
              </Link>
            </VerticalTimelineElement>
            <VerticalTimelineElement>
              <Link to={'/learn/frontend/css'}>
                <h1>CSS</h1>
                <p>Study layout techniques including Flexbox and Grid, animations, transitions, and responsive design.</p>
              </Link>
            </VerticalTimelineElement>
            <VerticalTimelineElement>
              <Link to={'/learn/frontend/js'}>
                <h1>JavaScript</h1>
                <p>Master the basics including variables, data types, control structures, functions, and DOM manipulation.</p>
              </Link>
            </VerticalTimelineElement>
            <VerticalTimelineElement>
              <Link to={'/learn/frontend/react'}>
                <h1>React</h1>
                <p>Choose a popular frontend library/framework like React and learn its fundamentals and best practices.</p>
              </Link>
            </VerticalTimelineElement>
          </>
        );
      case 'backend':
        return (
          <>
            <VerticalTimelineElement>
              <Link to={'/learn/backend/node'}>
                <h1>Node.js</h1>
                <p>Learn about server-side JavaScript using Node.js, including event-driven architecture, asynchronous programming, and Express framework.</p>
              </Link>
            </VerticalTimelineElement>
            <VerticalTimelineElement>
              <Link to={'/learn/backend/express'}>
                <h1>Express</h1>
                <p>Build web applications and APIs using the Express framework for Node.js.</p>
              </Link>
            </VerticalTimelineElement>
            <VerticalTimelineElement>
              <Link to={'/learn/backend/db'}>
                <h1>Databases</h1>
                <p>Explore database technologies like SQL and NoSQL, including MySQL, MongoDB, and PostgreSQL.</p>
              </Link>
            </VerticalTimelineElement>
          </>
        );
      case 'fullstack':
        return (
          <>
            <VerticalTimelineElement>
              <Link to={'/learn/frontend'}>
                <h1>Frontend</h1>
                <p>Learn frontend technologies such as HTML, CSS, JavaScript, and popular frontend frameworks like React.</p>
              </Link>
            </VerticalTimelineElement>
            <VerticalTimelineElement>
              <Link to={'/learn/backend'}>
                <h1>Backend</h1>
                <p>Master backend development with technologies like Node.js, Express, and databases like MongoDB or PostgreSQL.</p>
              </Link>
            </VerticalTimelineElement>
            <VerticalTimelineElement>
              <Link to={'/'}>
                <h1>Full Stack Projects</h1>
                <p>Build full-stack web applications to practice integrating frontend and backend technologies.</p>
              </Link>
            </VerticalTimelineElement>
          </>
        );
      default:
        return null;
    }
  };

  // Render VerticalTimeline only if there are valid children
  const timelineContent = renderContent();

  return (
    <div>
      {timelineContent && (
        <VerticalTimeline>{timelineContent}</VerticalTimeline>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faStar, faLink, faArrowRight, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

import PerfectScrollbar from 'react-perfect-scrollbar'

const IntroModal = ({ introModalOpen, setIntroModalOpen }) => {

  const [activeIntroScreen, setActiveIntroScreen] = useState(0);

  return (
    <div className={"intro-modal" + ((introModalOpen) ? " open" : " closed")}>
      <div className="intro-header">
        <p>Welcome to</p>
        <h1><span>team</span>mates!</h1>
      </div>
      <div className="intro-tab-headings">
        <ul>
          <li>
            <button onClick={() => { setActiveIntroScreen(0); }} className={(activeIntroScreen === 0) ? "active" : ""}>
              <FontAwesomeIcon icon={faQuestionCircle} className="fa-icon" />
              <p>About this site</p>
            </button>
          </li>
          <li>
            <button onClick={() => { setActiveIntroScreen(1); }} className={(activeIntroScreen === 1) ? "active" : ""}>
              <FontAwesomeIcon icon={faStar} className="fa-icon" />
              <p>Features and implementation</p>
            </button>
          </li>
          <li>
            <button onClick={() => { setActiveIntroScreen(2); }} className={(activeIntroScreen === 2) ? "active" : ""}>
              <FontAwesomeIcon icon={faLink} className="fa-icon" />
              <p>Links to my stuff</p>
            </button>
          </li>
        </ul>
      </div>

        <div className="intro-tab-contents">
          <PerfectScrollbar>
          { activeIntroScreen === 0 &&
            <div className="intro-tab-1-contents">
              <p><strong className="brand-color">teammates</strong> is a demo for a simple, React-based employee directory application.</p>
              <p>This demo is not intended for serious use. The data set is randomly generated each time the Node server is re-run. So, feel free to mess around!</p>
              <p>You may see this project's source by checking out the <a href="https://github.com/prokhorvlg/teammates" target="_blank"><FontAwesomeIcon icon={faCodeBranch} className="fa-icon" /> Github repository</a>.</p>
              <p>Created with love by <a href="https://github.com/prokhorvlg" target="_blank">@prokhorvlg (Valentin Sigalov)</a>.</p>
            </div>
          }
          { activeIntroScreen === 1 &&
            <div className="intro-tab-2-contents">

              <p><strong className="brand-color">teammates</strong> is implemented using a React front-end, and a Node.js back-end. It is automatically deployed to heroku from the github repository.</p>

              <h2>React front-end</h2>

              <p>The front-end utilizes React Hooks, functional components, and Apollo/GraphQL queries extensively. Jest is used for unit testing.</p>

              <h3>Features</h3>

              <ul>
                <li><strong>Employee list</strong>: The app displays a list of people pulled from the back-end.</li>
                <li><strong>Filtering</strong>: The app allows you to filter down users in real-time by a text string.</li>
                <li><strong>Details panel</strong>: Selecting a user from the list shows their complete details in a separate panel.</li>
                <li><strong>Edit employee</strong>: The user may edit the details for an employee on the details panel. Changes are saved to the server and the application is refreshed 2 seconds after the last modification.</li>
              </ul>

              <h2>Node.js back-end</h2>

              <p>The back-end is a very simple server script provided by this repository (slightly modified to add some extra data and serve the React page). The data set is pulled from a random person generator API, which is refreshed each time the server is re-activated.</p>

              <h2>Everyone is a Front-End Developer...</h2>

              <p>...because the API that generates randomized people does not provide a job position.</p>

            </div>

          }
          { activeIntroScreen === 2 &&
            <div className="intro-tab-2-contents">
              <h3>My personal website</h3>
              <p><a href="https://www.valentinsigalov.com/" target="_blank">https://www.valentinsigalov.com/</a></p>
              <h3>My LinkedIn</h3>
              <p><a href="https://www.linkedin.com/in/valentin-sigalov/" target="_blank">https://www.linkedin.com/in/valentin-sigalov/</a></p>
              <h3>My Github</h3>
              <p><a href="https://github.com/prokhorvlg" target="_blank">https://github.com/prokhorvlg</a></p>
            </div>
          }
          </PerfectScrollbar>
        </div>

      <button onClick={() => { setIntroModalOpen(false); }} className="intro-modal-close">
        <p>Enter Site</p>
        <FontAwesomeIcon icon={faArrowRight} className="fa-icon" />
      </button>
    </div>
  );
};

export default IntroModal;

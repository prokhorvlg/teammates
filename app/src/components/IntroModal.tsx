import React, { FC, useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faStar, faLink, faArrowRight, faCodeBranch } from '@fortawesome/free-solid-svg-icons';

type IntroModalProps = {
  introModalOpen: boolean;
  setIntroModalOpen(b: boolean): void;
}

const IntroModal: FC<IntroModalProps> = ({ introModalOpen, setIntroModalOpen }) => {
  const [activeIntroScreen, setActiveIntroScreen] = useState(0);

  return (
    <div className={"intro-modal" + ((introModalOpen) ? " open" : " closed")} data-testid="intro-modal">
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
            <button onClick={() => { setActiveIntroScreen(1); }} className={(activeIntroScreen === 1) ? "active" : ""} data-testid="intro-tab-2">
              <FontAwesomeIcon icon={faLink} className="fa-icon" />
              <p>Links to my stuff</p>
            </button>
          </li>
        </ul>
      </div>

        <div className="intro-tab-contents">
          { activeIntroScreen === 0 && <h2 className="mobile-tab-title mobile-only">About this site</h2>}
          { activeIntroScreen === 1 && <h2 className="mobile-tab-title mobile-only">Links to my stuff</h2>}
          <PerfectScrollbar>
          { activeIntroScreen === 0 &&
            <div className="intro-tab-contents-inner">
              <p><strong className="brand-color">teammates</strong> is a demo for a simple, React-based employee directory application.</p>
              <p>This demo is not intended for serious use. The data set is randomly generated each time the Node server is re-run. So, feel free to mess around!</p>
              <p>You may see this project's source by checking out the <a href="https://github.com/prokhorvlg/teammates" target="_blank"><FontAwesomeIcon icon={faCodeBranch} className="fa-icon" /> Github repository</a>.</p>
              <p>Created with love by <a href="https://github.com/prokhorvlg" target="_blank">@prokhorvlg (Valentin Sigalov)</a>.</p>
            </div>
          }
          { activeIntroScreen === 1 &&
            <div className="intro-tab-contents-inner">
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

      <button onClick={() => { setIntroModalOpen(false); }} className="intro-modal-close" data-testid="intro-modal-close">
        <p>Enter Site</p>
        <FontAwesomeIcon icon={faArrowRight} className="fa-icon" />
      </button>
    </div>
  );
};

export default IntroModal;

import React, { useState, useEffect } from "react";
import { Link } from 'gatsby';
import { CSSTransition } from "react-transition-group";

import logo from '../../../static/danieljs-logo.svg';

import "./responsiveNav.css";

const ResponsiveNav = ({ 
    title, 
    navigationLinks, 
    homeworkSubmissionLink }) => {

  
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1065px)");
    
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const links = navigationLinks.map(({ title, slug}, idx) => (
    <Link key={idx} to={slug} onClick={toggleNav}>{title}</Link>
  ));

 links.push(
    <a
     onClick={toggleNav}
     key={homeworkSubmissionLink.href} 
     target="_blank" 
     rel="noopener noreferrer"
     href={homeworkSubmissionLink.href}>
       {homeworkSubmissionLink.title}
       </a>
 );


  return (
    <div className="nav-wrapper">
      <Link to="/">
        <img className="logo" src={logo} alt={title} />
      </Link>
      <CSSTransition
        in={isSmallScreen && isNavVisible}
        timeout={350}
        classNames="navAnimation"
        unmountOnExit
      >
        <nav className="nav">
            { links }
        </nav>
      </CSSTransition>
      {
        !isSmallScreen &&
        <nav className="nav">
          { links }
        </nav>
      }
      <button onClick={toggleNav} className="burger">
      &#9776;
      </button>
    </div>
  );
};

export default ResponsiveNav;
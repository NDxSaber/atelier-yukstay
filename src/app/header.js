import React from 'react';
import { Link } from 'react-router-dom';


const links = [
  {
    to: '/',
    text: 'Home'
  },
  {
    to: '/about',
    text: 'About Us'
  },
  {
    to: '/profile/1',
    text: 'Profile 1'
  },
  {
    to: '/profile/2',
    text: 'Profile 2'
  },
  {
    to: '/dashboard',
    text: 'Dashboard',
    auth: true
  },
  {
    to: '/logout',
    text: 'Logout',
    auth: true
  },
  {
    to: '/this-is-broken',
    text: 'Broken Page'
  },
  {
    to: '/faq',
    text: 'FAQ'
  },
  {
    to: '/refer',
    text: 'Refer & Earn'
  },
  {
    to: '/login',
    text: 'Login',
    auth: false
  },
  {
    to: '/register',
    text: 'Register',
    auth: true
  },
];

const isCurrent = (to, current) => {
  if (to === '/' && current === to) {
    return true;
  } else if (to !== '/' && current.includes(to)) {
    return true;
  }

  return false;
};

const HeaderLink = ({ to, text, current }) => (
  <li className={isCurrent(to, current) ? 'current' : ''}>
    <Link to={to}>{text}</Link>
  </li>
);

export default ({ isAuthenticated, current }) => (
  <header id="header">
    <ul id="links">
      {links.map((link, index) => {
        const TheLink = <HeaderLink key={index} current={current} {...link} />;

        if (link.hasOwnProperty('auth')) {
          if (link.auth && isAuthenticated) {
            return TheLink;
          } else if (!link.auth && !isAuthenticated) {
            return TheLink;
          }

          return null;
        }

        return TheLink;
      })}
    </ul>
  </header>
);

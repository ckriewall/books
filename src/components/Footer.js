import React from 'react';
import { Navbar } from 'react-bootstrap';
import AmazonBanner from './ads/AmazonBanner';

const Footer = () => {
  return (
    <div>
      <Navbar
        bg='dark'
        variant='dark'
        expand='md'
        className='mb-4'
        fixed='bottom'
      >
        <AmazonBanner />
      </Navbar>
    </div>
  );
};

export default Footer;

import Link from 'next/link';

const Footer = () => {
  const footerItems = [
    { display: 'the camp.', slug: '/' },
    { display: 'the experience.', slug: '/experience' },
    { display: 'the blog.', slug: '/blog' },
    { display: 'the events.', slug: '/events' }
  ];
  const footerPolicies = [
    { display: 'Imprint', slug: '/imprint' },
    { display: 'Terms and Conditions', slug: '/toc' },
    { display: 'Data Protection', slug: '/data-protection' }
  ];
  return (
    <footer className='footer'>
      <nav className='footer__nav'>
        <img className='footer__logo' src='/assets/logo.svg' alt='' />
        <ul className='footer__links'>
          {footerItems.map((item) => (
            <li key={item.slug}>
              <Link href={item.slug}>
                <h5>{item.display}</h5>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='footer__policies'>
        <ul className='footer__policies-nav'>
          {footerPolicies.map((policy) => (
            <li key={policy.slug}>
              {/* wrap in Link when endpoints are actually made */}
              <p className='copy'>{policy.display}</p>
            </li>
          ))}
        </ul>
        <p className='copy'>© Sam’s Surfcamp - all rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

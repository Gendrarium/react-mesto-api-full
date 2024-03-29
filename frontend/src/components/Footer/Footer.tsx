import { memo } from "react";

const Footer = memo(() => {
  return (
    <footer className="footer page__footer">
      <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
    </footer>
  );
});

export default Footer;

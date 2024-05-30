import { useTheme } from "../ThemeContext";

interface FooterProps {
  
}

function Footer(props: FooterProps) {
  const {theme} = useTheme();
  return (
    <footer className={`text-${theme}-text p-4`}>
      <p>&copy; 2023 My Website</p>
    </footer>
  );
}

export default Footer;

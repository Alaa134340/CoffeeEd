
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { SiTiktok} from 'react-icons/si';

function Footer() {
  return (
    <footer
      className="text-center text-white py-3"
      style={{
        backgroundColor: "#382822", 
        position: "fixed",          
        left: 0,
        bottom: 0,
        width: "100%",
      }}
    >
      <p style={{ margin: 0, fontFamily: "Lobster, cursive" }}>
        © {new Date().getFullYear()} Coffee Haven|Opening Hours:7:30 a.m. till 7:30 p.m. Monday through Saturday| All Rights Reserved 
      </p>
      <div className="socialMedia">
        <InstagramIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
        <FacebookIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
        <SiTiktok style={{ verticalAlign: 'middle' }} size={20} />
      </div>
    </footer>
  );
}

export default Footer;

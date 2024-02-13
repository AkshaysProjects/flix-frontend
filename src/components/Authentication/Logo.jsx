import LogoImage from "../../assets/logo.svg";

const Logo = ({ logoTop }) => (
  <div
    className="absolute left-1/2 transform -translate-x-1/2"
    style={{ top: logoTop }}
  >
    <img src={LogoImage} alt="Logo" />
  </div>
);

export default Logo;

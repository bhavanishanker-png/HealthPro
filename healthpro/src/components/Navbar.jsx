import { Link } from "react-router-dom";
import logo from "../assets/ivf-pulse-logo.png";
import { useState } from "react";
import Hamburger from "hamburger-react";
function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center p-5">
        <div>
          <img src={logo} alt="IVF Pulse Logo" />
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <Link className="text-lg hover:text-orange-600">Donor Programme</Link>
          <Link className="text-lg hover:text-orange-600">Fertility Preservation</Link>
          <Link className="text-lg hover:text-orange-600">Advanced Treatments</Link>
          <Link className="text-lg hover:text-orange-600">Infertility Treatments</Link>
          <Link className="text-lg hover:text-orange-600">IVF Testing</Link>
          <Link className="text-lg hover:text-orange-600">About Us</Link>
          <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700">
            Talk to Us <span className="ml-2">→</span>
          </button>
        </div>
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col items-center gap-3 bg-white p-5 md:hidden">
          <Link className="text-lg hover:text-orange-600">Donor Programme</Link>
          <Link className="text-lg hover:text-orange-600">Fertility Preservation</Link>
          <Link className="text-lg hover:text-orange-600">Advanced Treatments</Link>
          <Link className="text-lg hover:text-orange-600">Infertility Treatments</Link>
          <Link className="text-lg hover:text-orange-600">IVF Testing</Link>
          <Link className="text-lg hover:text-orange-600">About Us</Link>
          <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700">
            Talk to Us
          </button>
        </div>
      )}
    </>
  );
}

export default Header;

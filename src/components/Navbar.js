// import { useState } from "react";

import { Nav, Logo, MenuLink } from "../styles/Navbar.style";

export default function Navbar({ openInfoModal }) {
  // const [isOpen, setisOpen] = useState(true);

  return (
    <Nav>
      <Logo href="/">
        Getz<span>Automotive</span>
      </Logo>
      <MenuLink onClick={openInfoModal}>መኪና መሸጥ ይፈልጋሉ?<br/>እዚህ ይጫኑ</MenuLink>
    </Nav>
  );
}

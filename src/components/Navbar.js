import { useState } from "react";
import styled from "styled-components";

const Nav = styled.div`
  padding: 0 var(--spacing-medium);
  padding-right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    // padding: var(--spacing-regular) var(--spacing-base);
    padding: 0;
  }

  @media (max-width: 475px) {
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  span {
    height: 2px;
    width: 25px;
    background-color: #7b7fda;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #7b7fda;
  text-decoration: none;
  font-weight: 800;
  font-size: 2.2rem;
  span {
    font-weight: 300;
    font-size: 1.9rem;
  }
`;
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: 0.3s all ease;
  }
`;
const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  color: var(--clr-primary-400);
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;

  &:hover {
    color: var(--clr-primary-400);
  }
`;

export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <Nav>
      <Logo href="/">
        Getz<span>Automotive</span>
      </Logo>
      <Hamburger onClick={() => setisOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuLink href="/">All Cars</MenuLink>
        <MenuLink href="/info">Sell Car</MenuLink>
      </Menu>
    </Nav>
  );
}

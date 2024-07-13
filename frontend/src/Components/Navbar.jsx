import { useState } from "react";
import styled from "styled-components";

const Navbar = () => {
  const [active, setActive] = useState("Inbox");

  return (
    <StyledContainer active={active}>
      <li
        className={active === "Inbox" ? "active" : ""}
        onClick={() => setActive("Inbox")}
      >
        Inbox
      </li>
      <li
        className={active === "Requested" ? "active" : ""}
        onClick={() => setActive("Requested")}
      >
        Requested
      </li>
      <span className="bar"></span>
    </StyledContainer>
  );
};

const StyledContainer = styled.ul`
  display: flex;
  width: 100%;
  list-style: none;
  justify-content: space-evenly;
  margin-top: 12px;
  background-color: #576cbc;
  border-radius: 20px;
  padding: 5px;
  position: relative;
  gap: 2px;
  margin-bottom: 15px;

  li {
    font-size: 22px;
    width: 50%;
    height: 100%;
    border-radius: calc(20px + 5px);
    text-align: center;
    cursor: pointer;
    z-index: 2;
    transition: background-color 0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;

    &.active {
      color: #ffffff;
    }
    @media (max-width: 1200px) {
      font-size: 20px;
    }

    @media (max-width: 992px) {
      font-size: 18px;
    }

    @media (max-width: 768px) {
      font-size: 16px;
    }

    @media (max-width: 576px) {
      font-size: 14px;
    }

    @media (max-width: 400px) {
      font-size: 6px;
    }
  }

  .bar {
    position: absolute;
    width: calc(50% - 10px);
    height: calc(100% - 10px);
    background-color: #19376d;
    border-radius: 20px;
    z-index: 1;
    top: 5px;
    left: ${({ active }) => (active === "Inbox" ? "5px" : "calc(50%)")};
    transition: left 0.3s;
    box-shadow: 2px 2px black;
  }
`;

export default Navbar;

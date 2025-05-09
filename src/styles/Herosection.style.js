import styled from "styled-components";

export const ActionWrapper = styled.div`
  max-width: 1000px;
  width: 75vw;
  min-width: 300px;
  margin: var(--spacing-large) auto var(--spacing-xlarge);
  display: flex;
  flex-direction: column;

  & h1 {
    font-size: var(--text-medium);
    text-align: center;
    font-weight: 500;
    color: var(--clr-primary-600);
    margin-bottom: var(--spacing-medium);
  }

  & form {
    position: relative;
    margin-bottom: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    transition: all 0.2s ease-in-out;

    &:focus-within {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    & input[type="search"] {
      width: 100%;
      padding: var(--spacing-regular) var(--spacing-large);
      font-size: var(--text-medium);
      border: none;
      background: white;
      border-radius: 8px 8px 0 0;

      &::placeholder {
        color: var(--clr-grey-400);
      }

      &:focus,
      &:focus-within {
        outline: none;
        box-shadow: inset 0 0 0 2px var(--clr-primary-600);
      }
    }
  }

  .actions {
    position: absolute;
    right: 8px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    height: max-content;
    display: flex;
    align-items: center;
    gap: 8px;

    & > * {
      border-radius: 6px;
      border: none;
      background: none;
      font-size: var(--text-regular);
      cursor: pointer;
      padding: var(--spacing-base) var(--spacing-medium);
      transition: all 0.2s ease;
    }

    & .actions__submit {
      background: var(--clr-primary-600);
      color: white;
      font-weight: 500;
      padding: var(--spacing-base) var(--spacing-large);

      &:hover {
        background: var(--clr-primary-700);
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(1px);
      }
    }

    & .actions__clear {
      color: var(--clr-grey-700);

      &:hover {
        background: var(--clr-grey-200);
      }
    }
  }

  & > .open-filter {
    --button-clr: var(--clr-primary-700);
    padding: var(--spacing-small) var(--spacing-medium);
    align-self: start;
    background: var(--clr-grey-100);
    border: none;
    border-radius: 6px;
    font-size: var(--text-base);
    display: inline-flex;
    align-items: center;
    margin-top: var(--spacing-small);
    color: var(--button-clr);
    font-weight: 500;
    letter-spacing: var(--spacing-xsmall);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--clr-grey-200);
    }

    svg {
      width: 14px;
      margin-left: var(--spacing-small);
      fill: var(--button-clr);
    }
  }

  @media (max-width: 900px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
    & .actions > * {
      font-size: var(--text-base);
    }
  }

  @media (max-width: 700px) {
    & form input[type="search"] {
      padding-left: var(--spacing-regular);
    }

    & .actions {
      top: 100%;
      right: 0;
      margin: 0;

      & input[type="submit"] {
        border-radius: 0;
      }
    }
  }

  @media (max-width: 600px) {
    & h1 {
      font-size: var(--text-base);
      text-align: left;
      margin-bottom: var(--spacing-base);
    }

    & input {
      font-size: var(--text-base);
      padding: var(--spacing-base) var(--spacing-regular);
      border-radius: 8px 8px 0 0;
    }

    & > button {
      padding: var(--spacing-small) var(--spacing-regular);
      position: static;
      font-size: var(--text-small);
      border-radius: 6px;
    }
  }

  @media (max-width: 475px) {
    width: 100%;

    & form input[type="search"] {
      padding: var(--spacing-base);
      font-size: var(--text-regular);
    }
  }
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 8px;
  overflow: visible;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-top: 0;
  background: white;
  z-index: 10;
  position: relative;
  border: 1px solid var(--clr-grey-200);
  border-top: none;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 700px) {
    display: block;
    padding: var(--spacing-medium);
    background: white;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    & > div {
      border: none;
      background: none;
      display: block;
      margin-bottom: var(--spacing-medium);

      & label {
        font-size: var(--text-small);
        font-weight: 500;
        color: var(--clr-grey-700);
        margin-bottom: var(--spacing-small);
      }

      & select {
        display: block;
        width: 100%;
        padding: var(--spacing-small) var(--spacing-base);
        margin-bottom: var(--spacing-small);
        font-size: var(--text-base);
        border-radius: 6px;
        border: 1px solid var(--clr-grey-300);
        background: white;

        &:focus {
          border-color: var(--clr-primary-600);
          outline: none;
        }
      }
    }

    & > div:first-child {
      border-left: none;
    }
  }
`;

export const FilterBarItem = styled.div`
  background: white;
  padding: 12px 16px;
  flex: 1;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: background-color 0.2s ease;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background-color: var(--clr-grey-200);
  }

  &:hover {
    background: var(--clr-grey-50);
  }

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  & label {
    display: block;
    line-height: 1;
    margin-bottom: var(--spacing-small);
    color: var(--clr-primary-700);
    font-size: var(--text-small);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  & select {
    padding: 8px 12px;
    margin-right: var(--spacing-xsmall);
    background: white;
    color: var(--clr-grey-800);
    font-size: var(--text-small);
    border-radius: 6px;
    border: 1px solid var(--clr-grey-300);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--clr-grey-400);
    }

    &:focus {
      outline: none;
      border-color: var(--clr-primary-600);
      box-shadow: 0 0 0 3px rgba(var(--clr-primary-600-rgb), 0.1);
    }
  }
`;

export const SwitchContainer = styled.div`
  position: relative;
  font-size: var(--text-small);
  display: flex;
  align-items: center;
  margin-top: 2px;

  & > input[type="checkbox"] {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 44px;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
    margin: 0;
  }

  & > input:checked + div {
    background: var(--clr-primary-600);
    &:after {
      background: white;
      left: 26px;
    }
  }

  & > span {
    margin-left: var(--spacing-small);
    color: var(--clr-grey-800);
    font-weight: 500;
  }

  @media (max-width: 700px) {
    margin-top: var(--spacing-medium);

    & > input[type="checkbox"] {
      height: 30px;
      width: 52px;
    }

    & > span {
      font-size: 14px;
    }
  }
`;

export const Switch = styled.div`
  position: relative;
  height: 20px;
  width: 40px;
  border-radius: 20px;
  background: var(--clr-grey-300);
  transition: background 0.2s ease;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    transition: left 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 700px) {
    height: 24px;
    width: 48px;

    &:after {
      width: 20px;
      height: 20px;
      top: 2px;
    }

    & > input:checked + & {
      &:after {
        left: 26px;
      }
    }
  }
`;

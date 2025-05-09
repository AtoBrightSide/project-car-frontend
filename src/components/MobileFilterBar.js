import { useState } from "react";
import FilterBarWrapper from "../components/FilterBar";
import { ModalContainer } from "../styles/Modal.style";
import { ReactComponent as Filter } from "../assets/filter.svg";
import styled from "styled-components";

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid var(--clr-grey-300);
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--clr-primary-700);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
  margin-top: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  &:hover {
    background: var(--clr-grey-100);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  svg {
    width: 14px;
    height: 14px;
    margin-left: 8px;
    fill: var(--clr-primary-700);
  }
`;

const FilterModal = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 90%;
  width: 400px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  animation: slideUp 0.3s ease;
  z-index: 1000;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h3 {
    margin-top: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--clr-primary-700);
    margin-bottom: 16px;
    border-bottom: 1px solid var(--clr-grey-200);
    padding-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .filter-apply {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--clr-grey-200);

    button {
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;

      &.filter-primary {
        background: var(--clr-primary-600);
        color: white;

        &:hover {
          background: var(--clr-primary-700);
          transform: translateY(-1px);
        }
      }

      &:last-child {
        background: var(--clr-grey-200);
        color: var(--clr-grey-700);

        &:hover {
          background: var(--clr-grey-300);
        }
      }
    }
  }
`;

export default function MobileFilterBarWrapper({ filterUtil }) {
  const [openFilter, setOpenFilter] = useState(false);

  const handleApplyFilter = () => {
    setTimeout(() => {
      filterUtil();
      setOpenFilter(false);
    }, 50);
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setOpenFilter(false);
    }
  };

  return (
    <>
      <FilterButton onClick={() => setOpenFilter(true)}>
        Filter Options
        <Filter />
      </FilterButton>

      {openFilter && (
        <ModalContainer onClick={handleClose}>
          <FilterModal className="filter-modal">
            <h3>Filter Options</h3>
            <FilterBarWrapper />
            <div className="filter-apply">
              <button
                className="filter-primary"
                onClick={handleApplyFilter}
                type="button"
              >
                Apply Filters
              </button>
              <button onClick={() => setOpenFilter(false)} type="button">
                Cancel
              </button>
            </div>
          </FilterModal>
        </ModalContainer>
      )}
    </>
  );
}

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import Car from "../components/Car";
import EmptyState from "../components/EmptyState";
import FilterBarWrapper from "../components/FilterBar";
import MobileFilterBarWrapper from "../components/MobileFilterBar";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import InfoModal from "../components/InfoModal";

import { ActionWrapper } from "../styles/Herosection.style";
import { BackToTop } from "../styles/Car.style";
import { Loader, LoaderContainer } from "../styles/Loader.style";
import { ModalContainer } from "../styles/Modal.style";

import { getCarsAPI } from "../data/api";

const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  min-height: 32px;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  background: var(--clr-primary-50);
  border: 1px solid var(--clr-primary-200);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--clr-primary-700);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  button {
    background: none;
    border: none;
    color: var(--clr-primary-600);
    margin-left: 8px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    padding: 0;
    line-height: 1;

    &:hover {
      color: var(--clr-primary-700);
    }
  }
`;

const SearchStats = styled.div`
  font-size: 18px;
  color: var(--clr-primary-600);
  margin-top: 4px;
  margin-bottom: 2px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: rgba(123, 127, 218, 0.07);
  display: inline-block;
  padding: 6px 18px;
  border-radius: 16px;
`;

const FiltersSection = styled.div`
  margin-top: 12px;
  width: 100%;
  position: relative;
  margin-bottom: 8px;
`;

export default function CarPage() {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterRules, setFilterRules] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch cars data with React Query
  const {
    data: cars,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["cars", pageNumber, filterRules],
    queryFn: () => getCarsAPI(pageNumber, filterRules),
    keepPreviousData: true,
  });

  // Handle error cases
  useEffect(() => {
    if (isError && error) {
      console.error("Error fetching cars data:", error);
      navigate("/error", { replace: true });
    }
  }, [isError, error, navigate]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Back to top button visibility handler
  useEffect(() => {
    const revealBackToTopButton = () => {
      const backToTopButton = document.querySelector(".back-to-top");
      if (backToTopButton) {
        backToTopButton.style.visibility =
          document.documentElement.scrollTop > 20 ? "visible" : "hidden";
      }
    };

    window.addEventListener("scroll", revealBackToTopButton);
    return () => window.removeEventListener("scroll", revealBackToTopButton);
  }, []);

  const handleFilter = useCallback(() => {
    const options = ["start", "end", "min", "max", "transmission"];
    const newFilterRules = { ...filterRules };

    options.forEach((option) => {
      const element = document.querySelector(`[name=${option}]`);
      if (element) {
        newFilterRules[option] = element.value;
      }
    });

    if (searchInputRef.current) {
      newFilterRules.keyword = searchInputRef.current.value || "";
    }

    const loanElement = document.querySelector("[name='loan']");
    if (loanElement) {
      // Only add loan property if checked, otherwise remove it
      if (loanElement.checked) {
        newFilterRules.loan = true;
      } else {
        delete newFilterRules.loan;
      }
    }

    // Remove empty filters
    Object.keys(newFilterRules).forEach((key) => {
      if (
        newFilterRules[key] === "" ||
        newFilterRules[key] === undefined ||
        newFilterRules[key] === null
      ) {
        delete newFilterRules[key];
      }
    });

    setFilterRules(newFilterRules);
    setPageNumber(1);
  }, [filterRules]);

  const clearFilter = useCallback(() => {
    const options = ["start", "end", "min", "max", "transmission", "search"];

    options.forEach((option) => {
      const element = document.querySelector(`[name=${option}]`);
      if (element) {
        element.value = "";
      }
    });

    const loanElement = document.querySelector("[name='loan']");
    if (loanElement) {
      loanElement.checked = false;
    }

    setFilterRules({});
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  }, []);

  // Remove a single filter
  const removeFilter = (filterKey) => {
    const updatedFilters = { ...filterRules };
    delete updatedFilters[filterKey];

    // Also clear the corresponding input
    const element = document.querySelector(`[name=${filterKey}]`);
    if (element) {
      if (element.type === "checkbox") {
        element.checked = false;
      } else {
        element.value = "";
      }
    }

    setFilterRules(updatedFilters);
  };

  // Get readable filter names for display
  const getFilterName = (key, value) => {
    switch (key) {
      case "keyword":
        return `Search: ${value}`;
      case "start":
        return `Year from: ${value}`;
      case "end":
        return `Year to: ${value}`;
      case "min":
        return `Min price: ${new Intl.NumberFormat("en-US").format(value)} ETB`;
      case "max":
        return `Max price: ${new Intl.NumberFormat("en-US").format(value)} ETB`;
      case "transmission":
        return `Transmission: ${
          value.charAt(0).toUpperCase() + value.slice(1)
        }`;
      case "loan":
        return "Loan available";
      default:
        return `${key}: ${value}`;
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFilter();
  };

  // Count active filters
  const activeFilterCount = Object.keys(filterRules).length;

  return (
    <>
      <Navbar openInfoModal={() => setShowInfoModal(true)} />
      <InfoModal
        showInfoModal={showInfoModal}
        closeInfoModal={() => setShowInfoModal(false)}
      />

      {(isLoading || isFetching) && (
        <ModalContainer loader>
          <LoaderContainer>
            <Loader />
            Loading...
          </LoaderContainer>
        </ModalContainer>
      )}

      <ActionWrapper>
        <h1>Find cars by Make, Model or Keyword</h1>
        <form action="" onSubmit={handleFormSubmit}>
          <input
            type="search"
            name="search"
            placeholder="Enter keywords..."
            ref={searchInputRef}
            defaultValue={filterRules.keyword || ""}
          />
          <div className="actions">
            <input type="submit" value="Search" className="actions__submit" />
            <button
              type="button"
              onClick={clearFilter}
              className="actions__clear"
              disabled={activeFilterCount === 0}
              style={{ opacity: activeFilterCount === 0 ? 0.5 : 1 }}
            >
              Clear
            </button>
          </div>
        </form>

        <FiltersSection>
          {windowWidth > 700 ? (
            <FilterBarWrapper handleFilter={handleFilter} />
          ) : (
            <MobileFilterBarWrapper filterUtil={handleFilter} />
          )}
        </FiltersSection>

        {/* Active filter tags */}
        <ActiveFiltersContainer>
          {Object.keys(filterRules)
            .filter((key) => key !== "sort" && key !== "sortDirection")
            .map((key) => (
              <FilterTag key={key}>
                {getFilterName(key, filterRules[key])}
                <button onClick={() => removeFilter(key)}>×</button>
              </FilterTag>
            ))}
        </ActiveFiltersContainer>

        {!isLoading && !isFetching && cars && cars.data && (
          <SearchStats>
            {cars.data.length > 0
              ? `Found ${cars.amountOfCars} cars${
                  activeFilterCount > 0 ? " matching your criteria" : ""
                }`
              : "No cars found matching your criteria"}
          </SearchStats>
        )}
      </ActionWrapper>

      {!isLoading && !isFetching && cars && (
        <>
          {cars.data?.length ? (
            <>
              <Car
                cars={cars.data}
                sortUtil={filterRules}
                updateSortUtil={setFilterRules}
              />
              <BackToTop className="back-to-top" onClick={handleBackToTop} />
              <Pagination
                currentPage={pageNumber}
                onPageChange={(page) => setPageNumber(page)}
                pageSize={cars.itemsPerPage}
                totalCount={cars.amountOfCars}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </>
  );
}

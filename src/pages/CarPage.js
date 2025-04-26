import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
      newFilterRules.keyword = searchInputRef.current.value;
    }

    const loanElement = document.querySelector("[name='loan']");
    if (loanElement) {
      newFilterRules.loan = loanElement.checked;
    }

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
  }, []);

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

  return (
    <>
      <Navbar openInfoModal={() => setShowInfoModal(true)} />
      <InfoModal
        showInfoModal={showInfoModal}
        closeInfoModal={() => setShowInfoModal(false)}
      />

      {isLoading && (
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
          />
          <div className="actions">
            <input type="submit" value="Search" className="actions__submit" />
            <button
              type="button"
              onClick={clearFilter}
              className="actions__clear"
            >
              Clear
            </button>
          </div>
        </form>

        {windowWidth > 700 ? (
          <FilterBarWrapper />
        ) : (
          <MobileFilterBarWrapper filterUtil={handleFilter} />
        )}
      </ActionWrapper>

      {!isLoading && cars && (
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

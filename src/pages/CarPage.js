import React, { useState, useEffect } from "react";

import Nav from "../components/Navbar";
import Car from "../components/Car";
import EmptyState from "../components/EmptyState";
import FilterBarWrapper from "../components/FilterBar";
import MobileFilterBarWrapper from "../components/MobileFilterBar";

import {
  ActionWrapper,
  Pagination,
  BackToTop,
} from "../styles/Herosection.style";
import { Loader, LoaderContainer } from "../styles/Loader.style";
import { ModalContainer } from "../styles/Modal.style";

import { getCarsAPI } from "../data/api";

export default function CarPage() {
  const [cars, setCars] = useState(null);

  // for pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [filterRules, setFilterRules] = useState({});

  // for responsiveness
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getCars = async (pageNumber) => {
    // To resume loader
    setCars(null);

    try {
      const carsList = await getCarsAPI(pageNumber, filterRules);
      setCars(carsList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async () => {
    let options = ["start", "end", "min", "max", "transmission"];

    options.forEach((option) => {
      filterRules[option] = document.querySelector(`[name=${option}]`)?.value;
    });

    filterRules.keyword = document.querySelector("[name='search']")?.value;
    filterRules.loan = document.querySelector("[name='loan'")?.checked;

    setFilterRules({ ...filterRules });
    setPageNumber(1);
  };

  const clearFilter = async () => {
    let options = ["start", "end", "min", "max", "transmission", "search"];

    options.forEach((option) => {
      if (document.querySelector(`[name=${option}]`)) {
        document.querySelector(`[name=${option}]`).value = "";
      }
    });

    if (document.querySelector("[name='loan']")) {
      document.querySelector("[name='loan'").checked = false;
    }

    setFilterRules({});
  };

  useEffect(() => {
    getCars(pageNumber, filterRules);
  }, [pageNumber, filterRules]);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    return function cleanup() {
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
    };
  }, []);

  return (
    <>
      {!cars && (
        <ModalContainer loader>
          <LoaderContainer>
            <Loader />
            Loading...
          </LoaderContainer>
        </ModalContainer>
      )}
      <Nav />
      <ActionWrapper>
        <h1>Find cars by Make, Model or Keyword</h1>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleFilter();
          }}
        >
          <input type="search" name="search" placeholder="Enter keywords..." />
          <div className="actions">
            <input type="submit" value="Search" />
            <button onClick={clearFilter}>Clear</button>
          </div>
        </form>

        {windowWidth > 700 ? <FilterBarWrapper /> : <MobileFilterBarWrapper />}
      </ActionWrapper>
      {cars && (
        <>
          {cars.data.length ? (
            <>
              <Car
                cars={cars.data}
                sortUtil={filterRules}
                updateSortUtil={setFilterRules}
              />
              {windowWidth < 768 && (
                <BackToTop
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                />
              )}
              <Pagination>
                {[
                  ...new Array(
                    Math.ceil(cars.amountOfCars / cars.itemsPerPage)
                  ),
                ].map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={pageNumber === index + 1 ? "active-page" : ""}
                      onClick={() => {
                        setPageNumber(index + 1);
                      }}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </Pagination>
            </>
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </>
  );
}

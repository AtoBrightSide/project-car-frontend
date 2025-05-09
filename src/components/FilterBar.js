import {
  FilterBar,
  FilterBarItem,
  SwitchContainer,
  Switch,
} from "../styles/Herosection.style";
import styled from "styled-components";

const SelectPair = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  & > select {
    flex: 1;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
    padding-right: 32px;
  }
`;

export default function FilterBarWrapper({ handleFilter }) {
  // Generate year options dynamically
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 1970; year -= 5) {
    yearOptions.push(year);
  }

  // Generate price options in ETB
  const priceOptions = [
    { value: "", label: "Any" },
    { value: "500000", label: "500,000" },
    { value: "750000", label: "750,000" },
    { value: "1000000", label: "1,000,000" },
    { value: "1500000", label: "1,500,000" },
    { value: "2000000", label: "2,000,000" },
    { value: "3000000", label: "3,000,000" },
  ];

  return (
    <FilterBar>
      <FilterBarItem>
        <div>
          <label htmlFor="start-year">Year</label>
          <SelectPair>
            <select
              name="start"
              id="start-year"
              defaultValue=""
              onChange={handleFilter}
            >
              <option value="" hidden>
                From
              </option>
              <option value="">Any</option>
              {yearOptions.map((year) => (
                <option key={`from-${year}`} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              name="end"
              id="end-year"
              defaultValue=""
              onChange={handleFilter}
            >
              <option value="" hidden>
                To
              </option>
              <option value="">Any</option>
              {yearOptions.map((year) => (
                <option key={`to-${year}`} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </SelectPair>
        </div>
      </FilterBarItem>
      <FilterBarItem>
        <div>
          <label htmlFor="min-price">Price</label>
          <SelectPair>
            <select
              name="min"
              id="min-price"
              defaultValue=""
              onChange={handleFilter}
            >
              <option value="" hidden>
                Min
              </option>
              {priceOptions.map((option) => (
                <option key={`min-${option.value}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              name="max"
              id="max-price"
              defaultValue=""
              onChange={handleFilter}
            >
              <option value="" hidden>
                Max
              </option>
              {priceOptions.map((option) => (
                <option key={`max-${option.value}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </SelectPair>
        </div>
      </FilterBarItem>
      <FilterBarItem>
        <div>
          <label htmlFor="transmission">Transmission</label>
          <select
            name="transmission"
            id="transmission"
            defaultValue=""
            onChange={handleFilter}
            style={{
              width: "100%",
              appearance: "none",
              backgroundImage:
                "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              backgroundSize: "16px",
              paddingRight: "32px",
            }}
          >
            <option value="">Any</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </FilterBarItem>
      <FilterBarItem>
        <div>
          <label htmlFor="loan-checkbox">Loan</label>
          <SwitchContainer>
            <input
              type="checkbox"
              name="loan"
              id="loan-checkbox"
              onChange={handleFilter}
            />
            <Switch aria-hidden="true" />
            <span>Available</span>
          </SwitchContainer>
        </div>
      </FilterBarItem>
    </FilterBar>
  );
}

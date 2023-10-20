import React, { Component } from 'react';

class DynamicDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: '',
      selectedState: '',
      selectedCity: '',
      searchQuery: '',
    };

    /* Data */
    this.data = [
      {
        country: "India",
        states: [
          {
            state: "Madhya Pradesh",
            city: ["Indore", "Bhopal", "Harda"],
          },
          {
            state: "West Bengal",
            city: ["Kolkata", "Alipurduar", "Bankura"],
          },
          {
            state: "Karnataka",
            city: ["Shivamogga", "Udupi", "Vijayapura", "Bengaluru"],
          },
        ],
      },
    ];
  }

  /* For searching any city */
  handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    const searchResults = this.filterCities(searchQuery);
    //console.log(searchResults)
    this.setState({ searchQuery, searchResults });
  };

  /* Storing the filtered result in a var */
  filterCities = (query) => {
    query = query.toLowerCase();
    // console.log(query)
    return this.data.map((country) => country.states).flat().map((state) => state.city).
      flat().filter((city) => city.toLowerCase().includes(query));
  };

  handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    this.setState({
      selectedCountry,
      selectedState: '',
      selectedCity: '',
    });
  };

  handleStateChange = (event) => {
    const selectedState = event.target.value;
    this.setState({
      selectedState,
      selectedCity: '',
    });
  };

  handleCityChange = (event) => {
    const selectedCity = event.target.value;
    this.setState({ selectedCity });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { selectedCountry, selectedState, selectedCity } = this.state;
    const savedData = {
      selectedCountry,
      selectedState,
      selectedCity,
    };

    /* Prints selected data in the console */
    console.log('Selected Data:', { selectedCountry, selectedState, selectedCity });
    this.setState({ savedData });

  }

  render() {

    const { selectedCountry, selectedState, selectedCity, savedData } = this.state;
    const countryData = this.data.find((item) => item.country === selectedCountry);
    const stateData = countryData?.states.find((item) => item.state === selectedState);
    const cities = stateData?.city;
    const { searchQuery, searchResults } = this.state;

    return (
      <div>
        <input
          type="text"
          value={searchQuery}
          className='search'
          onChange={this.handleSearchChange}
          placeholder="Search"
        />
        <p>
          {searchResults}
        </p>

        <select
          value={selectedCountry}
          onChange={this.handleCountryChange}
          className='dropdown'
        >
          <option value="">India</option>
          {this.data.map((item) => (
            <option key={item.country} value={item.country}>
              {item.country}
            </option>
          ))}
        </select>



        {selectedCountry && (
          <div className="radio-container">
            {countryData.states.map((item) => (
              <label key={item.state} className="radio-label">
                <input
                  type="radio"
                  value={item.state}
                  className="square-radio"
                  checked={selectedState === item.state}
                  onChange={this.handleStateChange}
                />
                {item.state}
              </label>
            ))}
          </div>
        )}

        {selectedState && (
          <div className="radio-container-1">
            {cities.map((city) => (
              <label key={city.name} className="radio-label-1">
                <input
                  type="radio"
                  value={city}
                  className="square-radio"
                  checked={selectedCity === city}
                  onChange={this.handleCityChange}
                />
                {city}
              </label>
            ))}
          </div>
        )}

        <div>
          <button type="submit" onClick={this.handleSubmit} className='dropdown'>Submit</button>
          {savedData && (
            <div>
              <h2><u>Data</u></h2>
              <p>Country: {savedData.selectedCountry}</p>
              <p>State: {savedData.selectedState}</p>
              <p>City: {savedData.selectedCity}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DynamicDropdown;

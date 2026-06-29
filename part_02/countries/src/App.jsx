import Filter from './components/Filter'
import CountryShower from './components/CountryShower'

import countryService from './services/countryService'

import { useState, useEffect } from 'react'



const App = () => {
  const [countryList, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService.getCountryList().then(data => setCountries(data))
  }, [])

  const filtered = countryList.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const showCountry = (countryName) => setFilter(countryName)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter
        value={filter}
        onChange={handleFilterChange}
      />
      <CountryShower 
        countryList={filtered}
        showCountry={showCountry}
      />
    </div>
  )
}

export default App
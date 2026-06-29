import CountryList from './CountryList'
import CountrySingle from './CountrySingle'

const CountryShower = ({countryList, showCountry}) => {
    if (countryList.length === 1) {
        return (
            <CountrySingle
                countryList={countryList}
            />
        )
    } else {
        return (
            <CountryList
                countryList={countryList}
                showCountry={showCountry}
            />
        )
    }
}

export default CountryShower
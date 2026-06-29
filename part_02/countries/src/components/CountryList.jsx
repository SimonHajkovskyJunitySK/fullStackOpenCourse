const CountryList = ({countryList, showCountry}) => {
    if (countryList.length > 10){
        return (<p>Too many matches, specify another filter</p>)
    } else if (countryList.length === 0) {
        return (<p>No countries with current filter</p>)
    }
    
    return (
        <div>
            {countryList.map(country =>
                <p key={country.name.common}>
                    {country.name.common}
                    <button onClick={
                        () => showCountry(country.name.common)
                    }>show</button>
                </p>
            )}
        </div>
    )   
}

export default CountryList
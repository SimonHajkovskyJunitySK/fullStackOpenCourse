 import Weather from './Weather'

const CountrySingle = ({countryList}) => {
    const country = countryList[0]
    
    return (
        <div>
            <h1>{country.name.common}</h1>
                <p>Capital {country.capital[0]}</p>
                <p>Area {country.area}</p>
            <h2>Languanges</h2>
                <ul>
                    {Object.values(country.languages).map(language =>
                        <li key={language}>{language}</li>
                    )}
                </ul>
            <img src={country.flags.svg} width={200}/>
            <Weather 
                capital={country.capital?.[0]} 
                capitalLatLng={country.capitalInfo?.latlng} 
            />
        </div>
    )
}

export default CountrySingle
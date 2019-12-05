import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

export default function App (){

  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // UseRef will return the object of a rendered element
  // We have to pass the varialbe as a referenece to the element
  // here we pass searchInputRef to the search input element and can access the
  // object of the input element
  const searchInputRef = useRef()

  // UseEffect should have code which involves promises as they return pure function
  // We can write async code in separate block and call it in useEffect block
  useEffect(() =>{
    getArticles()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const getArticles = async () =>{
    setLoading(true)
    try{
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
        );
      setResults(response.data.hits)
    }catch(err){
      setError(err)
    }
    setLoading(false)
  }

  const handleSearch = event =>{
    event.preventDefault();
    getArticles();
  }

  const handleClearQuery = () =>{
    setQuery("");
    searchInputRef.current.focus();
  }

  return(
    <div className="container mx-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <h1 className="text-grey-darkest">Hooks News</h1>
      <form onSubmit={handleSearch}>
        <input
        value={query}
        type="text"
        onChange={event => setQuery(event.target.value)}
        ref={searchInputRef}
        />
        <button type="submit" onClick={getArticles}>Search</button>
        <button type="button" onClick={handleClearQuery}>Clear</button>
      </form>

      {loading ? (
        <div>Loading results...</div>
      ): (<ul>
      {results.map(result =>(
        <li key={result.objectID}>
          <a href={result.url}>{result.title}</a>
        </li>
      ) )}
      </ul>)}
      {error && <div>{error.message}</div>}
    </div>
  )
}

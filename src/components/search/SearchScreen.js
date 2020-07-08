import React, { useMemo } from 'react'
import queryString from 'query-string';

import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

  const location = useLocation();
  const { q = '' } = queryString.parse( location.search );
  
  const [{ searchText }, handleInputChange ] = useForm({
    searchText: q
  });
  
  const heroesFiltered = useMemo(() => getHeroesByName( q ), [ q ]);

  const handleSubmit = ( event ) => {
    event.preventDefault();

    history.push(`?q=${ searchText }`)
  };
  
  return (
    <div>
      <h1>Search Screen</h1>
      <hr />

      <div className="row">
        <div className="col-4">
          <h4>Search Form</h4>
          <hr />

          <form onSubmit={ handleSubmit }>
            <input type="text" name="searchText" value={ searchText } onChange={ handleInputChange } placeholder="Find your Hero" autoComplete="off" className="form-control"/>

            <button type="submit" className="btn btn-block btn-outline-primary m-1">Search...</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {(q === '') && <div className="alert alert-info">Search a Hero</div>}
          {(q !== '' && heroesFiltered.length === 0) && <div className="alert alert-danger">There is no a Hero with { q }</div>}

          {
            heroesFiltered.map( hero => (
              <HeroCard key={ hero.id } { ...hero }/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

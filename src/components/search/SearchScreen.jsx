import React, { useMemo } from 'react';
import queryString from 'query-string'
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroByName } from '../../selectors/getHeroByName';

export const SearchScreen = ({history}) => {
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);
    const [values, handleInputChange] = useForm({
        search: q
    });
    const { search } = values;
    const heroesFiltered = useMemo(() => getHeroByName(q), [q]);

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`?q=${search}`);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="search"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            value={search}
                            onChange={handleInputChange}
                        />

                        <button
                            className="btn mt-1 btn-block btn-outline-primary"
                        >
                            Search
                        </button>
                    </form>
                </div>
                    <div className="col-7">
                        <h4>Results</h4>
                        <hr />

                        {
                            q === '' && (
                                <div className="alert alert-info animate__animated animate__fadeIn">
                                    Search a hero
                                </div>
                            )
                        }

                        {
                            q !== '' && heroesFiltered.length === 0 && (
                                <div className="alert alert-warning animate__animated animate__fadeIn">
                                    There is not a hero with <b>" {q} "</b>
                                </div>
                            )
                        }

                        {
                            heroesFiltered.map(hero => (
                                <div key={hero.id} className="animate__animated animate__fadeIn">
                                    <HeroCard {...hero} />
                                </div>
                            ))
                        }
                    </div>
            </div>
        </div>
    )
}

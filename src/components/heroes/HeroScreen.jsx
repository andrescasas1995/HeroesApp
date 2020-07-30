import React, { useMemo } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = ({history}) => {
    const { heroId } = useParams();
    const hero = useMemo(() => getHeroById(heroId), [heroId]);
    if (!hero) {
        return <Redirect to="/" />
    }
    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    const handleReturn = () => {
        const { push, goBack, length } = history;
        if (length <= 2) {
            push(`/${publisher === 'DC Comics' ? 'dc' : 'marvel'}`);
        } else {
            goBack();
        }
    }

    return (
        <div className="row mt-5">
            <div className="col-sm-3">
                <img
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                    src={`/HeroesApp/assets/heroes/${heroId}.jpg`}
                    alt={superhero}
                />
            </div>
            <div className="col-sm-9">
                <h3>
                    {superhero}
                    <img 
                        className="card-img ml-2"
                        style={{maxWidth:50}}
                        src={`/HeroesApp/assets/publishers/${publisher}.png`}
                        alt={superhero}
                    />
                </h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: </b>{alter_ego}</li>
                    <li className="list-group-item"><b>Publisher: </b>{publisher}</li>
                    <li className="list-group-item"><b>First appearance: </b>{first_appearance}</li>
                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>

                <button
                    className="btn btn-outline-info"
                    onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}

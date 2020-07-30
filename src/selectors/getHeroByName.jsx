import { heroes } from '../components/data/heroes';

export const getHeroByName = (name) => {
    if (name === '') {
        return [];
    }
    return heroes.filter(hero => hero.superhero.toLowerCase().includes(name.toLowerCase()));
}
import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

  const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ]);
  
  return (
    <div className="card-columns animate__animated animate__fadeIn animate__delay-1s">
      { heroes.map( hero => (
        <HeroCard key={ hero.id } { ...hero }/>
      ))}
    </div>
  )
}

// src/PokeDex.js
import React from 'react';
import { v1 as uuid } from 'uuid';
import useAxios from './useAxios';
import PokemonSelect from './PokemonSelect';
import PokemonCard from './PokemonCard';
import './PokeDex.css';

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
    const [pokemon, addPokemon] = useAxios('https://pokeapi.co/api/v2/pokemon/');

    const handleAddPokemon = async (name) => {
        await addPokemon(name);
    };

    return (
        <div className="PokeDex">
            <div className="PokeDex-buttons">
                <h3>Please select your pokemon:</h3>
                <PokemonSelect add={handleAddPokemon} />
            </div>
            <div className="PokeDex-card-area">
                {pokemon.map((cardData) => (
                    <PokemonCard
                        key={uuid()}
                        front={cardData.sprites.front_default}
                        back={cardData.sprites.back_default}
                        name={cardData.name}
                        stats={cardData.stats.map((stat) => ({
                            value: stat.base_stat,
                            name: stat.stat.name,
                        }))}
                    />
                ))}
            </div>
        </div>
    );
}

export default PokeDex;

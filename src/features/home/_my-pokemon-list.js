import React, { useState } from "react";
import { css } from "@emotion/css";

export function MyPokemonListPart() {
  const [loading, setLoading] = useState(false);
  const myPokemons = JSON.parse(localStorage.getItem("pokemonData") || "[]");

  const onReleasePokemon = (value) => {
    const items = myPokemons.filter((res) => res.pokeName !== value);
    localStorage.setItem("pokemonData", JSON.stringify(items));
  };

  return (
    <>
      {loading && (
        <div className="loading">
          <div className="loading__pokeball" />
        </div>
      )}

      {myPokemons.length !== 0 ? (
        myPokemons.map((pokemon) => {
          return (
            <div className="poke-list-item" style={{ borderColor: "#30a7d7" }}>
              <div className="poke-list-item-img-container">
                <img src={pokemon.image} alt={pokemon.image} />
              </div>
              <div
                className={css`
                  text-align: center;
                  text-transform: capitalize;
                  font-weight: 800;
                `}
              >
                {pokemon.pokeName}
              </div>
              <div
                className="poke-list-item-button"
                onClick={() => onReleasePokemon(pokemon.pokeName)}
              >
                <div
                  className="poke-list-item-button-info"
                  style={{ backgroundColor: "#30a7d7" }}
                >
                  <p className={`poke-list-item-button-info-name`}>Release</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ marginBottom: "12px" }}>
          <div>
            <p>You haven't caught pokemon</p>
          </div>
        </div>
      )}
    </>
  );
}

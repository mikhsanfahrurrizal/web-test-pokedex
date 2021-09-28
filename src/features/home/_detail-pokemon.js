import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMON_DETAIL } from "../../services/GqlQueries";
import { css } from "@emotion/css";
import PokeTypes from "../../assets/PokeTypes";
import { Moves, Types } from "../../components";
import { useUpdate } from "../../services/updateState";

export function DetailPart({ name, onUpdate }) {
  const [cardColor, setCardColor] = useState("#003a70");
  const [isCaught, setIsCaught] = useState(false);
  const [pokeName, setPokeName] = useState("");
  const [image, setImage] = useState("");
  const [owned, setOwned] = useState(0);
  const [idPoke, setIdPoke] = useState(0);
  const [show, setShow] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const [nickname, setNickname] = useState("");

  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: name || name !== null },
  });

  const type = data?.pokemon?.types[0]?.type?.name
    ? data?.pokemon?.types[0]?.type?.name.toLowerCase()
    : null;

  const doUpdate = function () {
    if (onUpdate) {
      onUpdate({
        pokeName,
        owned,
        image,
        idPoke,
      });
    }
  };

  const onCatch = (id) => {
    const isCatch = Math.random() < 0.5;
    const getPokemon = JSON.parse(localStorage.getItem("pokemonData") || "[]");
    const isDuplicate = getPokemon.some((res) => res.idPoke === id);
    if (isCatch) {
      setIsCaught(true);
      if (!isDuplicate) {
        setIsSame(false);
        setShow(true);
      } else {
        setIsSame(true);
        setShow(true);
      }
    } else {
      setIsCaught(false);
      setShow(true);
    }
  };

  const onCatchPokemon = () => {
    if (!isSame) {
      setPokeName(nickname ? nickname : name);
      setIdPoke(data.pokemon.id);
      setOwned(1);
      setImage(data.pokemon.sprites.front_default);

      onClose();
    } else {
      setPokeName(nickname ? nickname : name);
      setIdPoke(data.pokemon.id);
      setOwned(1);
      setImage(data.pokemon.sprites.front_default);
      onClose();
    }
  };

  const onClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setCardColor(PokeTypes[`${type}`] ? PokeTypes[`${type}`] : "#003a70");
  }, [type, data]);

  useUpdate(() => {
    doUpdate();
  }, [pokeName, owned, image, idPoke]);

  return (
    <>
      {loading && (
        <div className="loading">
          <div className="loading__pokeball" />
        </div>
      )}

      {show && (
        <div className="modal" id="modal">
          <h2>{isCaught ? "Gotcha!" : "Pokemon flee"}</h2>
          {isCaught && (
            <>
              <div className="content">{name} was caught!</div>
              {isSame && (
                <h1 className="content">
                  You have duplicate pokemon, please give a nickname to your
                  Pokemon
                </h1>
              )}
              <div className="content">
                Give a nickname ?
                <input
                  className="input-content"
                  onChange={(e) => (
                    setNickname(e.target.value), setIsSame(false)
                  )}
                />
              </div>
            </>
          )}
          {isCaught ? (
            <div className="actions">
              <button
                disabled={isSame}
                className="toggle-button"
                onClick={onCatchPokemon}
              >
                Add to My Pokemon List
              </button>
            </div>
          ) : (
            <div className="actions">
              <button
                disabled={isSame}
                className="toggle-button"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}

      {data?.pokemon && (
        <>
          <section className="poke-details">
            <header
              className="poke-details__header"
              style={{ backgroundColor: `${cardColor}` }}
            >
              <hgroup>
                <h1>{data.pokemon.name}</h1>
              </hgroup>
            </header>
            <div className="poke-details__card">
              <div
                className={css`
                  text-align: center;
                `}
              >
                <img src={data.pokemon.sprites.front_default} />
              </div>
              <div className="poke-details__header__type desk">
                {data.pokemon.types.map((pokemonType) => {
                  return (
                    <Types
                      key={pokemonType.type.name}
                      type={pokemonType.type.name}
                    />
                  );
                })}
              </div>
              <div className="btn">
                <button onClick={() => onCatch(data.pokemon.id)}>Catch</button>
              </div>

              <section
                className="poke-details__card__sub-header"
                style={{ backgroundColor: `${cardColor}` }}
              >
                <hgroup>
                  <h2>Moves</h2>
                </hgroup>
              </section>
              <section className="poke-details__card__attacks">
                <div className="poke-details__card__attacks-item">
                  <Moves
                    key={data.pokemon.moves[0].move.name}
                    name={data.pokemon.moves[0].move.name}
                  />
                </div>
                <div className="poke-details__card__attacks-item">
                  <Moves
                    key={data.pokemon.moves[1].move.name}
                    name={data.pokemon.moves[1].move.name}
                  />
                </div>
                <div className="poke-details__card__attacks-item">
                  <Moves
                    key={data.pokemon.moves[2].move.name}
                    name={data.pokemon.moves[2].move.name}
                  />
                </div>
                <div className="poke-details__card__attacks-item">
                  <Moves
                    key={data.pokemon.moves[3].move.name}
                    name={data.pokemon.moves[3].move.name}
                  />
                </div>
              </section>
            </div>
          </section>
        </>
      )}
    </>
  );
}

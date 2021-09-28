import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ALL_POKEMONS } from "../../services/GqlQueries";
import { DetailPart } from "./_detail-pokemon";
import { PokemonsPart } from "./_pokemons";
import { MyPokemonListPart } from "./_my-pokemon-list";
import { useUpdate } from "../../services/updateState";

export default function Home() {
  const [nextUrl, setNextUrl] = useState("");

  const [index, setIndex] = useState(0);
  const [detail, setDetail] = useState("");
  const [myPokemon, setMyPokemon] = useState({});
  const [catchPokemon, setCatchPokemon] = useState([]);

  const [prevUrl, setPrevUrl] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [first, setFirst] = useState(20);

  const [limit, setLimit] = useState(19);
  const [offset, setOffset] = useState(0);

  const { loading, error, data } = useQuery(GET_ALL_POKEMONS, {
    variables: { limit: limit, offset: offset },
  });

  const doUpdate = function () {
    if (myPokemon) {
      catchPokemon.push(myPokemon);
      localStorage.setItem("pokemonData", JSON.stringify(catchPokemon));
    }
  };

  const onChangeIndex = useCallback(
    (i) => {
      setIndex(i);
    },
    [index]
  );

  useEffect(() => {
    if (data && !loading) {
      const dataPokemon = JSON.parse(
        localStorage.getItem("pokemonData") || "[]"
      );
      const count = [
        ...dataPokemon
          .reduce((r, e) => {
            let k = `${e.idPoke}`;
            if (!r.has(k)) r.set(k, { ...e, count: 1 });
            else r.get(k).count++;
            return r;
          }, new Map())
          .values(),
      ];

      data.pokemons.results.forEach((res) => {
        let match = false;
        count.forEach((val) => {
          if (res.id === val.idPoke) {
            match = true;
            res.owned = val.count;
          }
        });
        if (!match) res.owned = 0;
      });
      setFilteredData(data.pokemons.results);
    }
  }, [data, loading]);

  useUpdate(() => {
    doUpdate();
  }, [catchPokemon, myPokemon]);

  return (
    <>
      {loading && (
        <div className="loading">
          <div className="loading__pokeball" />
        </div>
      )}

      {data && (
        <>
          <section className="page-home">
            <div className="row">
              <div
                className="poke-list-item-button"
                style={{ marginBottom: "12px" }}
                onClick={() => onChangeIndex(0)}
              >
                <div
                  className="poke-list-item-button-info"
                  style={{ backgroundColor: "#30a7d7" }}
                >
                  <p className={`poke-list-item-button-info-name`}>
                    Pokemon List
                  </p>
                </div>
              </div>

              <div
                className="poke-list-item-button"
                style={{ marginBottom: "12px" }}
                onClick={() => onChangeIndex(2)}
              >
                <div
                  className="poke-list-item-button-info"
                  style={{ backgroundColor: "#30a7d7" }}
                >
                  <p className={`poke-list-item-button-info-name`}>
                    My Pokemon List
                  </p>
                </div>
              </div>
            </div>
            {(() => {
              switch (index) {
                case 0:
                default:
                  return (
                    <section>
                      <div className="poke-list">
                        {filteredData && (
                          <>
                            {filteredData.map((res) => (
                              <PokemonsPart
                                key={res.id}
                                owned={res.owned}
                                name={res.name}
                                img={res.image}
                                index={index}
                                detail={() => (
                                  setIndex(index + 1), setDetail(res.name)
                                )}
                              />
                            ))}
                          </>
                        )}
                      </div>
                    </section>
                  );
                case 1:
                  return (
                    <div>
                      <DetailPart name={detail} onUpdate={setMyPokemon} />
                    </div>
                  );
                case 2:
                  return (
                    <section>
                      <div className="poke-list">
                        <MyPokemonListPart catchPokemon={catchPokemon} />
                      </div>
                    </section>
                  );
              }
            })()}
          </section>
        </>
      )}
    </>
  );
}

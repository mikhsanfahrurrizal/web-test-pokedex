import React from "react";
import { css } from "@emotion/css";

export function PokemonsPart({ name, img, detail, owned, index }) {
  return (
    <div className="poke-list-item" style={{ borderColor: "#30a7d7" }}>
      <div className="poke-list-item-img-container">
        <img src={img} alt={img} />
      </div>
      <div
        className={css`
          text-align: center;
          text-transform: capitalize;
          font-weight: 800;
        `}
      >
        {name}
      </div>
      <p
        className={css`
          font-size: 13px;
          margin: 10px auto;
        `}
      >
        Total Owned : {owned}
      </p>
      {index !== 2 && (
        <div className="poke-list-item-button" onClick={detail}>
          <div
            className="poke-list-item-button-info"
            style={{ backgroundColor: "#30a7d7" }}
          >
            <p className={`poke-list-item-button-info-name`}>Detail</p>
          </div>
        </div>
      )}
    </div>
  );
}

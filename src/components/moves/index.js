import React from "react"

const Moves = (props) => {
    const { name } = props;

    return (
        <>
            {name ? (
                <div className="attack-item">
                    <p className="attack-item__name" style={{textTransform: 'capitalize', color: '#ffffff'}}>{name}</p>
                </div>
            ) : (
                    ""
                )}
        </>
    )
}

export default Moves;
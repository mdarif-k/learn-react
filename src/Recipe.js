import React from 'react';

const Recipe = ({ title, image, calories, ingredients }) => {
    const cardStyle = { padding: '15px', margin: '15px', width: '18rem', float: 'left', height: '30rem', overflow: 'auto' }
    return (
        <div className="card" style={cardStyle}>
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{calories}</p>
            </div>
            <ol className="list-group list-group-flush">
                {ingredients && (ingredients.length > 0) && ingredients.map((ingredient, i) => <li key={i} className="list-group-item">{ingredient.text}</li>)}
            </ol>
        </div>
    )
}

export default Recipe;
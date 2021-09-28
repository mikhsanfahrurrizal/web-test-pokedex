import ApolloClient, { InMemoryCache } from 'apollo-boost';

const url = 'https://graphql-pokeapi.vercel.app/api/graphql';

export const cache = new InMemoryCache({
    dataIdFromObject: (object) => object.id || null,
})

export const client = new ApolloClient({
    cache,
    uri: url,
})

export async function getPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data)
            })
    })
} 
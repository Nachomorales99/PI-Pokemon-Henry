import axios from ("axios")
import { GET_ALL_POKEMONS } from "./type";

export let get_all_pokemons = () =>{

    return async function (dispatch) {
        
        let pokemon = await axios.get("http://localhost:3001/pokemons");

        return dispatch({
            type:GET_ALL_POKEMONS,
            payload:pokemon.data
        })
    }
    
}


import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  FETCH_START,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state));
}


function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        loading: true,
      };

    case FAV_ADD:
      if(state.favs.includes(action.payload)==false){
        let newFav = [...state.favs, action.payload];
        writeFavsToLocalStorage(newFav);
        return {
          ...state,
          favs: newFav,
        };        
      }

    case FAV_REMOVE:
      return {
        favs: state.favs.filter((item)=>{return item.key != action.payload})
      }

    case FETCH_SUCCESS:
      return {
        ...state,
        current: action.payload,
      };

    case FETCH_LOADING:
      return state;

    case FETCH_ERROR:
      return state;

    case GET_FAVS_FROM_LS:
      if(localStorage.getItem("s10g4")!=null){
        let favBack = readFavsFromLocalStorage();
        return { ...state, favs: favBack };
      }

    default:
      return state;
  }
}

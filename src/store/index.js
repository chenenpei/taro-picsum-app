import { createStore } from 'vuex'
import Taro from '@tarojs/taro';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            pictures: [],
        }
    },
    mutations: {
        LOAD_PICTURES_MUTATION: (state, pictures) => {
            state.pictures = state.pictures.concat(pictures);
        }
    },
    actions: {
        LOAD_PICTURES_ACTION: async (context, { page = 1, limit = 30 }) => {
            const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
            const res = await Taro.request({ url })
            context.commit('LOAD_PICTURES_MUTATION', res.data);
            return res.data
        }
    }
})

export default store;
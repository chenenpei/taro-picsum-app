<template>
    <view class="index">
        <nut-cell>
            <view-block class="infiniteUl" id="scrollDemo">
                <nut-infiniteloading
                    pull-icon="loading"
                    load-txt="Loading..."
                    load-more-txt="No More"
                    container-id="scrollDemo"
                    :has-more="hasMore"
                    @load-more="loadMore"
                >
                    <nut-cell
                        class="infiniteLi"
                        v-for="(item, index) in pictures"
                        :key="index"
                        @tap="jumpToDetail(item)"
                    >
                        <view class="content">
                            <image
                                :src="`https://picsum.photos/id/${item.id}/300/300`"
                            />
                            <view>{{ item.author }}</view>
                        </view>
                    </nut-cell>
                </nut-infiniteloading>
            </view-block>
        </nut-cell>
    </view>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import Taro from "@tarojs/taro";

export default {
    name: "Index",
    components: {},
    setup() {
        const store = useStore();

        const loading = ref(false);
        const page = ref(0);

        const hasMore = computed(() => page.value < 10);
        const pictures = computed(() => store.state.pictures);

        const jumpToDetail = (info) => {
            const { id, author, url } = info;
            Taro.navigateTo({
                url: `/pages/detail/index?id=${id}&author=${author}&url=${url}`,
            });
        };

        const loadPicutres = async (page, limit = 10) => {
            return store.dispatch("LOAD_PICTURES_ACTION", { page, limit });
        };
        const loadMore = async () => {
            loading.value = true;
            page.value++;
            try {
                await loadPicutres(page.value, undefined);
            } catch (error) {
                console.log(error.message);
            } finally {
                loading.value = false;
            }
        };

        onMounted(() => {
            loadMore();
        });

        return {
            loading,
            hasMore,
            pictures,
            loadMore,
            jumpToDetail,
        };
    },
};
</script>

<style lang="scss">
.index {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    .infiniteUl {
        padding: 0 8px;
        height: 100vh;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .infiniteLi {
        margin-top: 10px;
        font-size: 14px;
        width: 100%;
        color: rgba(100, 100, 100, 1);
        text-align: center;
    }

    .loading {
        display: block;
        width: 100%;
        text-align: center;
    }
}
</style>

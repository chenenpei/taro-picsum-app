<template>
    <view class="detail">
        <view>
            <image :src="`https://picsum.photos/id/${id}/1000`" />
            <nut-cell title="id" icon="tips" :desc="id"></nut-cell>
            <nut-cell title="author" icon="my" :desc="author"></nut-cell>
            <nut-cell
                title="resoulution"
                icon="photograph"
                :desc="`${width} * ${height}`"
            ></nut-cell>
        </view>
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
        const id = Taro.getCurrentInstance().router.params.id;
        const author = Taro.getCurrentInstance().router.params.author;
        const url = Taro.getCurrentInstance().router.params.url;
        const width = Taro.getCurrentInstance().router.params.width;
        const height = Taro.getCurrentInstance().router.params.height;

        return {
            id,
            author,
            url,
            width,
            height,
        };
    },
};
</script>

<style lang="scss">
.detail {
    margin: 8px 16px;

    image {
        width: 100%;
    }
}
</style>
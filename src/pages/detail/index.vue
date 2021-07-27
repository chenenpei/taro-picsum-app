<template>
    <view class="detail">
        <nut-cell>
            <image :src="`https://picsum.photos/id/${id}/1000`" />
        </nut-cell>
    </view>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import Taro from '@tarojs/taro';

export default {
    name: "Index",
    components: {},
    setup() {
        const id = Taro.getCurrentInstance().router.params.id;
        const author = Taro.getCurrentInstance().router.params.author;
        const url = Taro.getCurrentInstance().router.params.url;

        return {
            id,
            author,
            url
        };
    },
};
</script>

<style lang="scss">
.detail {
    margin: 8px 16px;
}
</style>
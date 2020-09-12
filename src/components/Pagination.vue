<template>
    <div class="pagination">
        <button class="pagination__btn pagination_prev" @click="onPrevPage" v-if="currentPage > 1">&#8592;</button>
        <ul class="pagination-list">
            <li v-for="(item, i) in getPageCount" :key="i++">
                <button 
                    :class="{'active': i == currentPage}" 
                    class="pagination__btn" 
                    :disabled="i == currentPage ? true : false"
                    @click="onClickPage(i)"
                >{{item}}</button>
            </li>
        </ul>
        <button class="pagination__btn pagination_next" @click="onNextPage" v-if="currentPage < getPageCount">&#8594;</button>
    </div>
</template>
<script>
export default {
    name: 'Pagination',
    props: {
        items: {
            type: Number,
            default: 0,
            required: true,
        },

        currentPage: {
            type: Number,
            default: 1,
            required: false,
        },

        pageSize: {
            type: Number,
            default: 3,
            required: false,

            validation(value) {
                return parseInt(value)
            }
        }
    },

    mounted() {
        this.$emit('defaultPageNumber', this.getPageCount);
    },

    data: () => ({
        pageCount: 0,
    }),

    methods: {
        onPrevPage() {
            if(this.currentPage > 1) {
                this.$emit('onPrevPage', -1);
            }
        },

        onNextPage() {
            if(this.currentPage < this.getPageCount) {
                this.$emit('onNextPage', 1);
            }
        },

        onClickPage(page) {
            this.$emit('onClickPage', page);
        }
    },

    computed: {
        getPageCount() {
            return Math.ceil(this.items / this.pageSize);
        }
    }
}
</script>

<style lang="scss">
    .pagination {
        display: flex;
        justify-content: center;

        &__btn {
            background-color: #1976d2;
            border-radius: 4px;
            border: none;
            color: #ffffff;
            min-width: 30px;
            height: 30px;
            transition: background-color 0.3s linear;

            &.active {
                background-color:  rgb(128, 128, 128);
                &:hover {
                    background-color:  rgb(128, 128, 128);
                }
            }

            &:hover {
                background-color: darken( #1976d2, 10%);

            }
        }
    }

    .pagination-list {
        margin: 0 10px;
        padding: 0;
        list-style-type: none;
        display: flex;
        align-items: center;

        li {
            margin: 0 5px;
        }
    }

    button {
        outline: none;
    }
</style>
<template>
    <fragment>
        <table class="table" >
            <thead class="table__head">
                <tr>
                    <th @click="sort('id')" class="table__head-item">Id</th>
                    <th @click="sort('name')" class="table__head-item">Name</th>
                    <th @click="sort('position')" class="table__head-item">Position</th>
                </tr>
            </thead>
            <tbody class="table__body" v-if="sortedRows">
                <tr v-for="(user, key) in sortedRows" :key="key">
                    <TableUserRow :user="user"/>
                </tr>
            </tbody>
        </table>
        <div v-if="!sortedRows" class="error-msg">Fields not a found</div>
        <Pagination 
            :pageSize="pageSize" 
            :items="users.length"
            :currentPage="currentPage"
            @onPrevPage="onSwitchPage"
            @onNextPage="onSwitchPage"
            @onClickPage="onClickPage"
            @defaultPageNumber="defaultPageNumber"
        />
    </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import TableUserRow from './TableUserRow'
import Pagination from './Pagination'
import _ from 'lodash'

export default {
    props: {
        users: {
            type: Array,
            required: true,
            default: []
        },
    },

    data: () => ({
        currentSort:'id',
        currentSortDir:'asc',
        pageSize: 3,
        currentPage: 1,
        countPages: null
    }),

    components: {
        TableUserRow,
        Pagination,
        Fragment
    },

    mounted() {
        this.currentPage = +this.$route.query.page || 1;
    },

    methods: {
        sort(typeSort) {
            if(typeSort === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = typeSort;
        },

        getSlicedArray(currentPage) {
            let sliceArray = _.chunk(this.users, this.pageSize)
            return sliceArray[currentPage - 1];
        },

        getCurrentPage(data) {
            this.currentPage = data;
        },

        onSwitchPage(value) {
            this.currentPage += value;
            this.$router.push(`${this.$route.path}?page=${this.currentPage}`);
        },

        onClickPage(page) {
            this.$router.push(`${this.$route.path}?page=${page}`);
            this.currentPage = page;
        },

        defaultPageNumber(pageCount) {
            this.countPages = pageCount;
        }
    },

    computed:{
        sortedRows() {
            if(this.currentPage <= this.countPages) {
                return this.getSlicedArray(this.currentPage).sort((a,b) => {
                    let modifier = 1;
                    if(this.currentSortDir === 'desc') modifier = -1;

                    if(typeof a[this.currentSort] == 'string' && typeof b[this.currentSort] == 'string') {
                        if(parseInt(a[this.currentSort]) < parseInt(b[this.currentSort])) return -1 * modifier;
                        if(parseInt(a[this.currentSort]) > parseInt(b[this.currentSort])) return 1 * modifier;
                    } 

                    if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    
                    return 0;
                });
            }
        }
    }
}

</script>
<style lang="scss">
    .table {
        &__head {
            &-item {
                position: relative;
                transition: opacity 0.5s linear;

                &:after {
                    content: '';
                    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' preserveAspectRatio='none'%3E%3Cpath opacity='.3' d='M51 1l25 23 24 22H1l25-22zm0 100l25-23 24-22H1l25 22z'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-size: .65em 1em;
                    background-position: right .375rem center;
                    width: 20px;
                    height: 25px;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }

                &:hover {
                    cursor: pointer;
                    opacity: 0.7;
                }
            }
        }
    }

    .error-msg {
        text-align: center;
        padding: 40px 0;
    }
</style>
<template>
    <div class="pagination">
  <ul class="pagination-links" v-if="totalPages > 1">
    <li v-for="page in pages.slice(prevPages, nextPages)" :key="page" :class="{ active: page === currentPage}">
      <a href="#" @click.prevent="changePage(page)">{{ page }}</a>
    </li>
  </ul>

  <div class="pagination-buttons">
    <button class="pagination-button" @click="prevPage">Prev</button>
    <button class="pagination-button" @click="nextPage">Next</button>
  </div>
</div>
</template>
<script>
import "../assets/css/pagination.css";
export default {
  data() {
    return {
      prevPages: 0,
      nextPages: 5,
    };
  },
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    computed: {
        pages() {
            let pages = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
            return pages;
        },  

    },
    methods: {
        changePage(page) {
            this.$emit('change-page', page);
            this.prevPages = page - 3;
            this.nextPages = page + 3;
            if (this.prevPages < 0) {
                this.prevPages = 0;
                this.nextPages = 5;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.$emit('change-page', this.currentPage - 1);
                this.prevPages = this.currentPage - 3
                this.nextPages = this.currentPage + 3
                if (this.prevPages < 0) {
                    this.prevPages = 0;
                    this.nextPages = 5;
                }
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit('change-page', this.currentPage + 1);
                this.prevPages = this.currentPage - 3
                this.nextPages = this.currentPage + 3
                if (this.prevPages < 0) {
                    this.prevPages = 0;
                    this.nextPages = 5;
                }
            }
        }
    }

}
</script>

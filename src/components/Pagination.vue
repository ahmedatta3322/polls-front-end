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
<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  width: 30vw;
  padding-bottom: 20px;
}

.pagination-links {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}

.pagination-links li {
  margin: 0 5px;
}

.pagination-links li a {
  display: block;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
}

.pagination-links li.active a {
  background-color: #333;
  color: #fff;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}

.pagination-button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin: 0 5px;
  width: 50px;
  height: 30px;
}

.pagination-button:hover {
  background-color: #ccc;
  color: #fff;
}

.pagination-button:disabled {
  cursor: default;
  background-color: #ccc;
  color: #fff;
}

@media only screen and (max-width: 768px) {
  .pagination {
    width: 100%;
  }
}






</style>
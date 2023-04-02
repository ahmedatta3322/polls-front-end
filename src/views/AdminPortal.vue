<script setup>
import { usePollStore } from "../stores/polls.js";
import CreateForm from "../components/CreateForm.vue";
import Pagination from "../components/Pagination.vue";
import Header from "../components/Header.vue";
import EditForm from "../components/EditForm.vue";
</script>
<template>
    <div class="admin-portal">
        <Header />
        <h1>Admin Portal</h1>
        <div class="polls">
            <input type="button" value="Create Poll" @click="createPoll" class="create-button">
            <div class="poll" v-for="poll in polls" :key="poll.id">
            <h2 id="poll-id">{{ poll.id }}</h2>
            <h2 id="question">{{ poll.question }}</h2>
            <h2 id="expiration-date">{{ poll.expiration_date }}</h2>
            <div class="choices">
                <div class="choice" v-for="choice in poll.choices" :key="choice.id" id="choice">
                <h3 id="choice-inner-text">{{ choice.choice_text }}</h3>
                <div class="votes">
                    <h3 class="num-votes">{{ choice.votes_count }} votes</h3>
                </div>
                </div>
            </div>
            <input type="button" value="Edit Poll" @click="editPoll" class="edit-button">
            <input type="button" value="Delete Poll" @click="deletePoll" class="delete-button">
            </div>
            <Pagination v-if="totalPages > 1"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="changePage"
        ></Pagination>
        </div>
        <CreateForm class="create-form" @cancel-poll="cancelPoll"></CreateForm>
            <div v-if="renderEditForm">
                <EditForm class="edit-form" :poll="selectedPoll" @cancel-poll="cancelPoll"></EditForm>
                </div>
           
        </div>
</template>
<script>
export default {
  data() {
    return {
      polls: [],
      totalPages: 0,
      currentPage: 1,
      selectedPoll: null,
      renderEditForm: false,
      renderCreateForm: false,
    };
  },
    methods: {
        changePage(page) {
            this.currentPage = page;
            this.loadPolls();
        },
        toggleForm() {

            if (this.renderCreateForm) {
                let polls = document.querySelector(".polls")
                polls.style.display = "none"
                let form = document.querySelector(".create-form")
                form.style.display = "block"
                let adminPortal = document.querySelector(".admin-portal")
                adminPortal.style.height = "100vh"
            } else if (this.renderEditForm) {
                let polls = document.querySelector(".polls")
                polls.style.display = "none"
                let form = document.querySelector(".edit-form")
                form.style.display = "block"
                let adminPortal = document.querySelector(".admin-portal")
                adminPortal.style.height = "100vh"
            }
        },
        loadPolls() {
        usePollStore().getPolls(this.currentPage).then(() => {
            this.polls = usePollStore().polls.data.results
            this.totalPages = (usePollStore().polls.data.count / 15).toFixed(0)
        });
        },
        editPoll(event) {
            this.renderEditForm = true
            this.selectedPoll = event.target.parentElement
            setTimeout(() => {
                this.toggleForm();
            }, 100)
        },
        deletePoll(event) {
            // the element id is poll-id


            this.selectedPoll = document.getElementById("poll-id").innerText
            usePollStore().deletePoll(this.selectedPoll).then(() => {
                this.loadPolls();
            });
        },
        createPoll() {
            this.renderCreateForm = true
            this.toggleForm();
        },
        cancelPoll() {
            this.loadPolls();
        },
    },
    mounted() {
        this.loadPolls();
    },   
}
</script>
<style scoped>
.solid {
    border-top: 3px solid black;
    width: 100%;
    padding: 0 0 0 0;
}

.admin-portal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100%;
    overflow-y: auto;
}
.polls {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.poll {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
    
}
.choice {
    width: fit-content;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding: 10px;
    position: relative;
    border: 

}
.votes {
    margin-left: 100px;
}
.choices {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    right: 40%;
}

.create-button {
    width: 20%;
    height: 20%;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #4CAF50 !important;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    position: relative;
    left: 35%;
    top: 10px;

}

.edit-button {
    width: 20%;
    height: 20%;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #008CBA !important;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    position: relative;
    left: 39%;
    top: 10px;
}

.delete-button {
    width: 20%;
    height: 20%;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #f44336 !important;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    position: relative;
    left: 39%;
    top: 10px;
}



</style>

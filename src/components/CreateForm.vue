<template>
    <div >
            <form class="create-poll" @submit="submitPoll">
                <h1>Create Poll</h1>
                <input type="text" placeholder="Question" v-model="question" class="question-form" required>
                <br>
                <input type="date" v-model="expiration_date" required>
                <br>
                <input type="text" placeholder="Choice" class="choice-form">
                <br>
                <input type="button" value="Add Choice" @click="addChoice" class="add-choice">
                <br>
                <input type="submit" value="Create Poll" class="submit-poll-button">
                <br>
                <input type="button" value="Cancel" @click="cancelPoll" class="cancel-poll-button">
            </form>
            </div>
</template>
<script>
import { usePollStore } from "../stores/polls.js";
export default {
    data() {
        return {
            question: "",
            expiration_date: "",
            choice: "",
        }
    },
        methods:{
            cancelPoll() {
            let polls = document.querySelector(".polls")
            polls.style.display = "flex"
            let form = document.querySelector(".create-form")
            form.style.display = "none"
            let adminPortal = document.querySelector(".admin-portal")
            adminPortal.style.height = "100%"
            this.$emit("cancel-poll")

        },
        addChoice() {
            let choice = document.querySelector(".choice-form")
            let br = document.createElement("br")
            let newChoice = choice.cloneNode(true)
            newChoice.value = ""
            
            let addChoice = document.querySelector(".add-choice")
            addChoice.before(newChoice)
            addChoice.before(br)
            

            
            if (document.querySelectorAll(".choice-form").length >= 5) {
                let addChoice = document.querySelector(".add-choice")
                addChoice.style.display = "none"
            }

        },
        submitPoll() {
            let choices = document.querySelectorAll(".choice-form")
            let choicesArray = []
            for (let i = 0; i < choices.length; i++) {
                choicesArray.push(choices[i].value)
            }
            let poll = {
                question: this.question,
                expiration_date: this.expiration_date,
                choices: choicesArray
            }
            usePollStore().createPoll(poll).then(() => {
                // if any required fields are empty, don't submit
                
                this.cancelPoll()
                
            })
            
        }
    },
}

</script>

<style scoped>
.create-form {
  display: none;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 44vw;
  height: 100%;
}
.create-poll {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
    width: 100%;
    height: 100%;
}
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

input[type="text"],
input[type="date"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
}

input[type="button"] {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
input[type="submit"] {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-poll-button {
  background-color: #007bff;
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.cancel-poll-button {
  background-color: #dc3545 !important;
  position: absolute;
  left: 20px;
  bottom: 23px;
}

.add-choice {
  background-color: #28a745;
}

.add-choice:hover {
  background-color: #218838;
}
</style>
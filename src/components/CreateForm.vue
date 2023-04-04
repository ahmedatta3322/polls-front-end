<template>
  <div>
    <form class="create-poll" @submit="submitPoll">
      <h1>Create Poll</h1>
      <input type="text" placeholder="Question" v-model="question" class="question-form" required />
      <br />
      <input type="date" v-model="expiration_date" required />
      <br />
      <input type="text" placeholder="Choice" class="choice-form" required />
      <br />
      <input type="button" value="Add Choice" @click="addChoice" class="add-choice" />
      <br />
      <input type="submit" value="Create Poll" class="submit-poll-button" />
      <br />
      <input type="button" value="Cancel" @click="cancelPoll" class="cancel-poll-button" />
    </form>
  </div>
</template>
<script>
import { usePollStore } from '../stores/polls.js'
import '../assets/css/create.css'
import { useToast } from 'vue-toast-notification'
export default {
  data() {
    return {
      question: '',
      expiration_date: '',
      choice: ''
    }
  },
  methods: {
    cancelPoll() {
      let polls = document.querySelector('.polls')
      polls.style.display = 'flex'
      let form = document.querySelector('.create-form')
      form.style.display = 'none'
      let adminPortal = document.querySelector('.admin-portal')
      adminPortal.style.height = '100%'
      this.$emit('cancel-poll')
    },
    addChoice() {
      let choice = document.querySelector('.choice-form')
      let br = document.createElement('br')
      let newChoice = choice.cloneNode(true)
      newChoice.value = ''
      let addChoice = document.querySelector('.add-choice')
      addChoice.before(newChoice)
      addChoice.before(br)

      if (document.querySelectorAll('.choice-form').length >= 5) {
        let addChoice = document.querySelector('.add-choice')
        addChoice.style.display = 'none'
      }
    },
    submitPoll(event) {
      event.preventDefault()
      let choices = document.querySelectorAll('.choice-form')
      let choicesArray = []
      for (let i = 0; i < choices.length; i++) {
        choicesArray.push(choices[i].value)
      }
      let poll = {
        question: this.question,
        expiration_date: this.expiration_date,
        choices: choicesArray
      }
      usePollStore()
        .createPoll(poll)
        .then(() => {
          this.cancelPoll()
        })
        .catch((error) => {
          useToast().error("Couldn't create poll")
        })
    }
  }
}
</script>

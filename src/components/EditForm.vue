<template>
  <div>
    <form class="edit-poll" @submit="editPoll">
      <h1>Edit Poll</h1>
      <input type="text" placeholder="Question" v-model="question" class="question-form" required />
      <br />
      <VueDatePicker v-model="expiration_date" class="expiration-date-form"></VueDatePicker>
      <br />
      <div v-for="choice in choices" :key="choice.id">
        <input
          type="text"
          :value="choice.choice_text"
          class="choice-form"
          required
          @change="choice.choice_text = $event.target.value"
        />
        <br />
      </div>
      <br />
      <input type="submit" value="Edit Poll" class="submit-poll-button" />
      <br />
      <input type="button" value="Cancel" @click="cancelPoll" class="cancel-poll-button" />
      <br />
    </form>
  </div>
</template>
<script>
import { usePollStore } from '../stores/polls.js'
import '../assets/css/edit.css'
import closeForm from '../utils.js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useToast } from 'vue-toast-notification'
export default {
  components: { VueDatePicker },
  props: {
    poll: Object
  },
  data() {
    return {
      question: '',
      expiration_date: '',
      pollId: '',
      choices: []
    }
  },
  methods: {
    cancelPoll() {
      closeForm(this.poll)
      setTimeout(() => {
        this.$emit('cancel-poll')
      }, 500)
      //this.$emit('cancel-poll')
    },
    editPoll(event) {
      event.preventDefault()
      let poll = {
        question: this.question,
        expiration_date: this.expiration_date,
        choices: this.choices
      }
      usePollStore().editPoll(this.pollId, poll)
      this.cancelPoll()
    }
  },
  mounted() {
    console.log(this.poll.innerHTML)
    this.pollId = this.poll.querySelector('#poll-id').innerHTML
    usePollStore()
      .getPoll(this.pollId)
      .then(() => {
        this.question = usePollStore().poll.data.question
        this.expiration_date = usePollStore().poll.data.expiration_date
        this.choices = usePollStore().poll.data.choices
      })
      .catch((err) => {
        useToast().error('Something went wrong')
      })

    this.expiration_date = this.poll.querySelector('#expiration-date').innerHTML
  }
}
</script>

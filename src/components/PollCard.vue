<template>
  <div class="card">
    <div class="card-header bg-primary text-white">
      <h3 class="card-title mb-0">{{ poll.question }}</h3>
      <div class="expiration-date" v-if="poll.expiration_date">
        <p>Expires on {{ poll.expiration_date }}</p>
      </div>
    </div>

    <div class="card-body">
      <div class="voted_message" v-if="stateVoted || poll.is_expired">
        <p>{{ stateVoted ? 'You have already voted' : 'Poll has expired' }}</p>
      </div>
      <div class="choices" v-if="!stateVoted && !poll.is_expired">
        <div class="choice" v-for="choice in poll.choices" :key="choice.id">
          <input
            type="radio"
            :id="choice.id"
            :value="choice.id"
            class="choice-input"
            name="choice"
          />
          <label :for="choice.id">{{ choice.choice_text }}</label>
        </div>
      </div>
      <div class="choices" v-if="stateVoted || poll.is_expired">
        <div class="choice" v-for="choice in poll.choices" :key="choice.id">
          <div class="choice-text">{{ choice.choice_text }}</div>
          <div class="choice-votes">
            {{
              isNaN((choice.votes_count / poll.total_votes).toFixed(2) * 100)
                ? 0
                : (choice.votes_count / poll.total_votes).toFixed(2) * 100
            }}%
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer bg-light">
      <button
        class="card-footer-button btn btn-primary mr-2"
        @click="vote"
        v-if="!stateVoted && !poll.is_expired"
      >
        Vote
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import '../assets/css/public.css'
export default {
  name: 'PollCard',
  data() {
    return {
      stateVoted: this.poll.voted
    }
  },
  props: {
    poll: {
      type: Object,
      required: true
    }
  },
  methods: {
    vote() {
      axios
        .post(
          'http://ahmedatta3322.pythonanywhere.com/api/vote/',
          {
            choice: this.$el.querySelector('input[type="radio"]:checked').value,
            poll: this.poll.id
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
            }
          }
        )
        .then((response) => {
          this.stateVoted = true
          this.poll.choices.forEach((choice) => {
            if (choice.id === response.data.choice) {
              choice.votes_count += 1
            }
          })
          this.poll.total_votes += 1
        })
    }
  }
}
</script>

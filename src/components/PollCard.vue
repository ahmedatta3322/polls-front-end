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
      <p>{{ stateVoted ? "You have already voted" : "Poll has expired" }}</p>
    </div>
    <div class="choices" v-if="!stateVoted && !poll.is_expired">
      <div class="choice" v-for="choice in poll.choices" :key="choice.id">
        <input type="radio" :id="choice.id" :value="choice.id" class="choice-input"/>
        <label :for="choice.id">{{ choice.choice_text }}</label>
      </div>
    </div>
    <div class="choices" v-if="stateVoted || poll.is_expired">
      <div class="choice" v-for="choice in poll.choices" :key="choice.id">
        <div class="choice-text">{{ choice.choice_text }}</div>
        <div class="choice-votes">{{ isNaN((choice.votes_count / poll.total_votes).toFixed(2) * 100) ? 0 : (choice.votes_count / poll.total_votes).toFixed(2) * 100 }}%</div>
      </div>
    </div>
  </div>
  <div class="card-footer bg-light">
    <button class="card-footer-button btn btn-primary mr-2" @click="vote" v-if="!stateVoted && !poll.is_expired">Vote</button>
  </div>
</div>

</template>
<script>
import axios from "axios";
export default {
    name: "PollCard",
    data() {
        return {
            stateVoted: this.poll.voted,
        };
    },
    props: {
        poll: {
            type: Object,
            required: true,
        },
    },
    methods: {
        vote() {
          console.log(this.$el)
          axios.post("http://ahmedatta3322.pythonanywhere.com/api/vote/", {
            choice : this.$el.querySelector('input[type="radio"]:checked').value,
            poll: this.poll.id
          }, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            this.stateVoted = true;
            this.poll.choices.forEach((choice) => {
              if (choice.id === response.data.choice) {
                choice.votes_count += 1;
              }
            
            });
            this.poll.total_votes += 1;
          })
        },
       
        
    },
};
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 80vw;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #007bff;
  color: #fff;
  border-radius: 10px 10px 0 0;
  padding: 20px;
  margin-bottom: 20px;
}
.voted_message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: rgba(40, 167, 69, 0.2);
  box-shadow: 0px 2px 10px rgba(40, 167, 69, 0.2);
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;

}

.voted_message p {
  margin: 0;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.card-body p {
  margin: 0;
}

.choices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.choice {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: fit-content;
  min-width: 200px;
}

.choice:hover {
  background-color: #e9ecef;
}

.choice-text {
  flex: 1;
  margin-right: 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.choice-input {
  margin-right: 10px;
}

.choice-votes {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;

}

.card-footer {
  display: flex;
  justify-content: flex-end;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 0 0 10px 10px;
}

.card-footer-button {
  border-radius: 5px;
  border: none;
  color: #fff;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.card-footer-button.btn-primary {
  background-color: #007bff;
}

.card-footer-button.btn-secondary {
  background-color: #6c757d;
}

.card-footer-button.btn-primary:hover {
  background-color: #0062cc;
}

.card-footer-button.btn-secondary:hover {
  background-color: #545b62;
}

</style>

<template>
  <div>
    <form @submit.prevent="addMessage" class="mb-3">
      <div v-if="error" class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{error}}</p>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="message.username"
          placeholder="Enter a screen name"
          type="text"
          class="form-control"
          id="username" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input
          v-model="message.subject"
          type="text"
          class="form-control"
          id="subject"
          placeholder="Enter a subject" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          v-model="message.message"
          class="form-control"
          id="message"
          rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL</label>
        <input
          v-model="message.imageURL"
          type="url"
          class="form-control"
          id="imageURL"
          placeholder="Enter URL to an image">
      </div>
      <button type="submit" class="btn btn-outline-success">Add Message</button>
    </form>
    <!-- <div class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br />
          <small>{{message.created}}</small>
        </div>
      </li>
      <hr>
    </div> -->
    <div class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
      <div class="card mt-4" >
        <img :src="message.imageURL" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{message.subject}}</h5>
          <p class="card-text">{{message.message}}</p>
          <p class="card-text">- {{message.username}}</p>
          <a
            href="#"
            @click="deleteMessage(message._id)"
            class="btn btn-outline-danger mr-2"
          >
            Delete
          </a>
          <a href="#" class="btn btn-outline-info">Edit</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4000/messages';

export default {
  name: 'home',
  data: () => ({
    error: '',
    messages: [],
    message: {
      username: '',
      subject: '',
      message: '',
      imageURL: '',
    },
  }),
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    },
  },
  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.messages = result;
      });
  },
  methods: {
    addMessage() {
      console.log(this.message);
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            const error = result.details
              .map((detail) => detail.message)
              .join('. ');
            this.error = error;
          } else {
            this.error = '';
            this.showMessageForm = false;
            this.messages.push(result);
          }
        });
    },
    deleteMessage(id) {
      console.log(id)
      fetch(API_URL, {
        method: 'DELETE',
        body: JSON.stringify({id: id}),
        headers: {
          'content-type': 'application/json',
        },
      })
    },
  },
};
</script>

<style>
img {
  /* max-width: 300px; */
  height: auto;
}
</style>

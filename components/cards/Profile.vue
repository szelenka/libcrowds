<template>
  <b-card
    no-body
    class="profile-card"
    :bg-variant="darkMode ? 'dark' : null"
    :text-variant="darkMode ? 'white' : null">

    <div class="avatar-background profile-card-bg">
      <user-avatar
        :user="user"
        :size="200">
      </user-avatar>
    </div>

    <div id="user-details" class="card-body">
      <div class="card-title">
        <h2>{{ user.name }}</h2>
      </div>
      <div class="card-text">
        <ul>
          <li>
            <icon name="trophy"></icon>Rank {{ user.rank }}
          </li>
          <li>
            <icon name="tasks"></icon>Contributions: {{ user.n_answers }}
          </li>
          <li>
            <icon name="clock-o"></icon>Joined: {{ user.registered_ago }}
          </li>
        </ul>
      </div>
    </div>

    <slot></slot>

  </b-card>
</template>

<script>
import 'vue-awesome/icons/trophy'
import 'vue-awesome/icons/tasks'
import 'vue-awesome/icons/clock-o'
import UserAvatar from '@/components/avatars/User'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  components: {
    UserAvatar
  }
}
</script>

<style lang="scss" scoped>
.profile-card {
  .avatar-background {
    text-align: center;
    padding-top: $spacer * 2;
    padding-left: $spacer * 2;
    padding-right: $spacer * 2;
    background-size: cover;
    background-position: center center;
  }

  #user-details {
    text-align: center;

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5rem;

      svg {
        margin-right: 5px;
      }
    }
  }
}
</style>

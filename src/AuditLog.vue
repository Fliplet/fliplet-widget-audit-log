<template>
  <div class="audit-log">
    <div :class="{ 'is-loading': isLoading }" v-show="isInitialized">
      <div class="alert alert-info">
        <p>
          <strong>This feature is currently in beta</strong><br>We are actively refining the functionality and collecting feedback. If you have any questions please
          <a href='#' @click="openChatOverlay">contact us</a>.
        </p>
        <p>
          <strong>View detailed Studio and app usage detail</strong><br>See exactly what the server has been doing and assess issues immediately. For more information on how to use this feature, <a href="https://help.fliplet.com" target="_blank">click here</a>.
        </p>
      </div>
      <RangeDatePicker></RangeDatePicker>
    </div>
    <div v-if="isLoading" class="overlay-loading">
      <div class="spinner-holder animated">
        <div class="spinner-overlay"></div>
        <p>Loading...</p>
      </div>
    </div>
    <div v-else-if="hasError">
      <div class="alert alert-danger">{{ errorMessage }}</div>
    </div>
    <LogTable class="component" :class="{ 'is-loading': isLoading }" v-if="isInitialized || isLoading"></LogTable>
  </div>
</template>

<script>
import LogTable from './components/LogTable';
import RangeDatePicker from './components/RangeDatePicker';
import { state, getUIIsLoading, getUIIsInitialized, getUIError } from './store';

export default {
  data() {
    return {
      state
    };
  },
  computed: {
    isInitialized() {
      return getUIIsInitialized();
    },
    isLoading() {
      return getUIIsLoading();
    },
    hasError() {
      return !!getUIError();
    },
    errorMessage() {
      const error = getUIError();

      return error && Fliplet.parseError(error);
    }
  },
  components: {
    LogTable,
    RangeDatePicker
  },
  methods: {
    init() {
      if (Fliplet.Env.get('development')) {
        document.body.classList.add('development');
      }

      Fliplet.Studio.onMessage(function(event) {
        if (event.data && event.data.event === 'overlay-close') {
          setTimeout(() => {
            Fliplet.Widget.autosize();
          }, 500);
        }
      });
    },
    openChatOverlay() {
      Fliplet.Studio.emit('open-live-chat');
    }
  },
  mounted() {
    this.init();

    Fliplet.Widget.autosize();
  },
  updated() {
    Fliplet.Widget.autosize();
  }
};
</script>

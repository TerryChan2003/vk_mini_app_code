<template>
  <VKView activePanel="main">
    <Panel id="main">
      <PanelHeader>Список друзей</PanelHeader>
      <Group v-bind:title="'Друзья ('+ this.countFriends + ')'">
        <List>
          <Cell
            v-for="friend in allFriends"
            :key="friend.id"
            v-bind:indicator="friend.sex | getGenus"
          >
            <template v-slot:before>
              <Avatar type="image" v-bind:src="friend.photo_200" />
            </template>
            {{friend.first_name}} {{friend.last_name}}
          </Cell>
        </List>
      </Group>
    </Panel>
  </VKView>
</template>

<script>
import connect from "@vkontakte/vkui-connect-promise";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: mapActions(["fetchFriends"]),
  filters: {
    getGenus(n) {
      switch (n) {
        case 0:
          return "Оно";
        case 1:
          return "Она";
        case 2:
          return "Он";
      }
    }
  },
  computed: mapGetters(["allFriends", "countFriends"]),
  mounted() {
    this.fetchFriends();
  }
};
</script>

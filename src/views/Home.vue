<template>
  <VKView activePanel="main">
    <Panel id="main">
      <PanelHeader>Список друзей</PanelHeader>
      <Group v-if="this.hasToken" v-bind:title="`Друзья (${this.countFriends})`">
        <Search @input="this.onChangeFind" />
        <List v-if="this.countFriends">
          <Cell
            v-for="friend in filteredFriends"
            :key="friend.id"
            :indicator="friend.sex | getGenus"
          >
            <template v-slot:before>
              <Avatar type="image" :src="friend.photo_200" />
            </template>
            {{friend.first_name}} {{friend.last_name}}
          </Cell>
        </List>
        <Cell v-else>Никто не найден</Cell>
      </Group>
      <Div v-else>
        <PanelHeader>ТОКЕН ДАЙ</PanelHeader>
        <Div align="center">
          <b>Упс... Вы не дали доступ к друзьям.</b>
          <br />
          <br />
          <Button size="l" @click="this.onClickToken">Разрешить доступ</Button>
        </Div>
      </Div>
    </Panel>
  </VKView>
</template>

<script>
import connect from "@vkontakte/vkui-connect-promise";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchFriends"]),
    ...mapMutations(["updateFindName"]),
    onChangeFind(e) {
      this.updateFindName(e);
    },
    onClickToken() {
      this.fetchFriends();
    }
  },
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
  computed: {
    ...mapGetters(["filteredFriends", "countFriends", "hasToken"]),
    controller() {
      if (this.hasToken || this.countFriends) {
        return "main";
      } else {
        return "require";
      }
    }
  },
  mounted() {
    this.fetchFriends();
  }
};
</script>

<template>
  <VKView activePanel="main">
    <Panel id="main">
      <Group v-if="this.getStatus == 'success'" v-bind:title="`Друзья (${this.countFriends})`">
        <PanelHeader>Список друзей</PanelHeader>
        <Search @input="this.updateFindName" />
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
      <Div v-else-if="this.getStatus == 'denied'">
        <PanelHeader>Предоставьте доступ</PanelHeader>
        <Div align="center">
          <b>Упс... Вы не дали доступ к друзьям.</b>
          <br />
          <br />
          <Button size="l" @click="this.fetchFriends">Разрешить доступ</Button>
        </Div>
      </Div>
      <Div v-else>
        <PanelHeader>Загрузка...</PanelHeader>
        <b>Подождите минуточку...</b>
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
    ...mapMutations(["updateFindName"])
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
    ...mapGetters(["filteredFriends", "countFriends", "getStatus"])
  },
  mounted() {
    this.fetchFriends();
  }
};
</script>

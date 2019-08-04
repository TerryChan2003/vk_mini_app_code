<template>
  <VKView activePanel="main">
    <Panel id="main">
      <Group
        v-if="this.getStatus == 'success'"
        v-bind:title="`Друзья (${this.filteredFriends.length})`"
      >
        <PanelHeader>Список друзей</PanelHeader>
        <Search v-model="search" theme="content" placeholder="Поиск" />
        <List v-if="this.filteredFriends.length">
          <Cell
            v-for="friend in paginatedFriends"
            :key="friend.id"
            :indicator="friend.sex | getGenus"
          >
            <template v-slot:before>
              <Avatar type="image" :src="friend.photo_200" />
            </template>
            {{friend.first_name}} {{friend.last_name}}
          </Cell>
          <infinite-loading @infinite="this.infiniteHandler"></infinite-loading>
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
        <ScreenSpinner />
      </Div>
    </Panel>
  </VKView>
</template>

<script>
import connect from "@vkontakte/vkui-connect-promise";
import { mapGetters, mapActions, mapMutations } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
export default {
  data() {
    return {
      search: "",
      currentPage: 1
    };
  },
  methods: {
    ...mapActions(["fetchFriends"]),
    infiniteHandler($state) {
      if (this.currentPage * 20 > this.filteredFriends.length) {
        $state.complete();
      } else {
        this.currentPage++;
        $state.loaded();
      }
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
    ...mapGetters(["allFriends", "getStatus"]),
    filteredFriends() {
      return this.allFriends.filter(user => {
        return (
          `${user.first_name} ${user.last_name}`
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) !== -1
        );
      });
    },
    paginatedFriends() {
      return this.filteredFriends.slice(0, 20 * this.currentPage);
    }
  },
  components: {
    InfiniteLoading
  },
  mounted() {
    this.fetchFriends();
  }
};
</script>
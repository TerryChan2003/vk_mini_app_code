<template>
  <VKView activePanel="main">
    <Panel id="main">
      <PanelHeader>Список друзей</PanelHeader>
      <Group title="Items">
        <List>
          <Cell v-for="friend in friends" v-bind:indicator="friend.sex | getGenus">
            <template v-slot:before>
              <Avatar v-bind:src="friend.photo_200_orig" />
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
export default {
  data() {
    return {
      friends: [],
      token: ""
    };
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
  mounted() {
    connect
      .send("VKWebAppGetAuthToken", {
        app_id: 7080308,
        scope: "friends,status"
      })
      .then(r => {
        this.token = r.data.access_token;
        connect
          .send("VKWebAppCallAPIMethod", {
            method: "friends.get",
            params: {
              v: "5.101",
              fields: "photo_200_orig, sex",
              access_token: this.token
            }
          })
          .then(r => {
            this.friends = r.data.response.items;
            console.log(this.friends);
          });
      });
  }
};
</script>
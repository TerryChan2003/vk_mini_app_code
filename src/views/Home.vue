<template>
  <Epic :activeStory="currentRoot">
    <Tabbar slot="tabbar">
      <TabbarItem
        @click="currentPanel = 'friend_list_panel'"
        :selected="currentPanel == 'friend_list_panel'"
      >
        <vkui-icon name="market_outline" size="24" />
      </TabbarItem>
      <TabbarItem @click="currentPanel = 'profile'" :selected="currentPanel == 'profile'">
        <vkui-icon name="user_outline" size="24" />
      </TabbarItem>
    </Tabbar>
    <Root id="main_root" :activeView="currentView" key="main_root">
      <VKView id="main_view" :activePanel="currentPanel" key="main_view">
        <Panel id="friend_list_panel">
          <FriendList />
        </Panel>
        <Panel id="profile">
          <Personal />
        </Panel>
      </VKView>
    </Root>
  </Epic>
</template>


<script>
import FriendList from "./HomeComponents/FriendList";
import Personal from "./HomeComponents/Personal";
export default {
  data() {
    return {
      currentPanel: "friend_list_panel",
      currentView: "main_view",
      currentRoot: "main_root"
    };
  },
  methods: {},
  filters: {},
  computed: {},
  components: {
    FriendList,
    Personal
  },
  mounted() {}
};
</script>
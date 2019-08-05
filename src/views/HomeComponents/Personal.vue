<template>
  <Div>
    <PanelHeader>Профиль</PanelHeader>
    <Group>
      <List>
        <Cell>
          <template v-slot:before>
            <Avatar type="image" :src="getUserData.photo_200" />
          </template>
        </Cell>
        <Cell>Ваша фамилия: {{getUserData.last_name}}</Cell>
        <Cell>Ваше имя: {{getUserData.first_name}}</Cell>
        <Cell>Род: {{getUserData.sex | getGenus}}</Cell>
        <Cell>
          Вы живете: в стране {{getUserData.country.title}}
          <br />
          в городе {{getUserData.city.title}}
        </Cell>
        <Cell>Часовой пояс: {{getUserData.timezone | getTimeZone}}</Cell>
        <Cell>Дата рождения: {{getUserData.bdate}}</Cell>
      </List>
    </Group>
  </Div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("personal", ["fetchUserData"])
  },
  computed: {
    ...mapGetters("personal", ["getUserData"])
  },
  filters: {
    getGenus(n) {
      switch (n) {
        case 0:
          return "Инопланитянин!!!";
        case 1:
          return "Женский";
        case 2:
          return "Мужской";
      }
    },
    getTimeZone(n) {
      if (n < 0) {
        return `GMT${n}`;
      } else {
        return `GMT+${n}`;
      }
    }
  },
  mounted() {
    this.fetchUserData();
  }
};
</script>

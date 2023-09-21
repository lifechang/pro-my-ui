<template>
  <div id="app">
    <div style="
        width: 100%;
        height: 100%;
        flex-direction: column;
        box-sizing: border-box;
      ">
      <div style="height: 60px">1</div>
      <div style="display: flex; min-width: 800px; height: calc(100% - 60px)">
        <div style="min-width: 180px">
          <el-button type="primary" @click="$refs.ShowDialog.show = true">打开</el-button>
        </div>
        <MyTable :columns="columns" :data="data" :init-param="initParam">
          <template #tableHeader>
            <el-button type="primary" @click="add">新增用户</el-button>
            <el-button type="primary" @click="log">新增用户</el-button>
          </template>
          <!-- <template #name="scope">
            <el-input v-show="scope.row.nameShow" v-model="scope.row.name" placeholder="aaaa" @blur="scope.row.nameShow = false"></el-input>
            <div v-show="!scope.row.nameShow" @click="scope.row.nameShow = true">{{ scope.row.name || 111 }}</div>
          </template>
             <template #gender="scope">
            <el-input v-show="scope.row.genderShow" v-model="scope.row.gender" placeholder="aaaa" @blur="scope.row.genderShow = false"></el-input>
            <div v-show="!scope.row.genderShow" @click="scope.row.genderShow = true">{{ scope.row.gender || 111 }}</div>
          </template> -->
          <template #operation>
            <el-button type="primary" link>删除</el-button>
          </template>
        </MyTable>
      </div>
    </div>
    <ShowDialog ref="ShowDialog"></ShowDialog>
  </div>
</template>

<script>
import ShowDialog from "./Dialog.vue";
export default {
  components: {
    ShowDialog
  },
  data() {
    return {
      data: [],
      columns: [
        {
          prop: "name",
          label: "姓名",
          edit: {
            lineShow: true,
            placeholder: 'aaaaaaaaa'
          },
        },
        {
          prop: "gender",
          label: "性别",
          edit: {
            // lineShow: true,
            placeholder: 'aaaaaaaaa'
          },
        },
        { prop: "operation", label: "操作", fixed: "right", width: 200 },
      ],
      initParam: {
        // name: '',
        // limit: 10,
        // page: 1,
        // status: 1
      },
    };
  },
  methods: {
    add() {
      this.data.push({
        name: '1',
        gender: '2',
        // show: false
        // name1Show: false
      })
    },
    log() {
      console.log(this.data)
    }
  },
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>

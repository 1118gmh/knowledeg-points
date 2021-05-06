<template>
    <div>
        hfh 
        <div v-for="(todo,index) in todos" :key="index">{{todo}}</div>
    </div>
</template>
<script lang="ts">
import {Component,Vue} from 'vue-property-decorator';
@Component({
  components: {
    //todo...
  }
})
export default class Todo extends Vue{
    public todos:string[] = ['香蕉','苹果','橘子']
}
</script>
<style lang="less">
body{
  background: red;
}
</style>

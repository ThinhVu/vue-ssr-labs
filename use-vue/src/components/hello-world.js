import {h, ref} from 'vue';

const HelloWorld = {
  setup() {
    const count = ref(0)
    const increment = () => {
      console.log('increment')
      count.value++
    }
    return () => h('div', h('button', { onClick: increment }, `Clicked: ${count.value}`))
  }
}

export default HelloWorld;

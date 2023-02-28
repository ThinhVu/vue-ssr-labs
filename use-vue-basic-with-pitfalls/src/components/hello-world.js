import {h, ref} from 'vue';

const HelloWorld = {
  setup() {
    const count = ref(0)
    const increment = () => {
      console.log('increment')
      count.value++
    }
    return () => h('div', [
      h('h3', 'Welcome to Vue SSR Labs use-vue'),
      h('p', 'This project will give you some basic knowledge about Vue SSR'),
      h('p', 'Try to click to the button. If the value increase, we\'re good to go to next step'),
      h('button', {onClick: increment}, `Clicked: ${count.value}`),
      h('p', 'Click to each link below to explore more'),
    ])
  }
}

export default HelloWorld;

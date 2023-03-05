import {h, ref} from 'vue';

const ReactivityTest = {
  setup() {
    const count = ref(0)
    const increment = () => {
      console.log('increment')
      count.value++
    }
    return () => h('div', [
      h('p', 'Try to click to the button. If the value increase, we\'re good to go to next step'),
      h('button', {onClick: increment}, `Clicked: ${count.value}`),
    ])
  }
}

export default ReactivityTest;

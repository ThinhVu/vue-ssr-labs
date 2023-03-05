// This example show you how setInterval lead to memory & performance leaked in server side
import {h, onServerPrefetch, onBeforeUnmount, onMounted, ref} from 'vue'

export default {
  setup() {
    const allCounter = ref(0);
    const serverCounter = ref(0);
    const browserCounter = ref(0);
    let intervalId = null;

    // this one call in both browser & server
    setInterval(() => {
      console.log('leaked:allCounter')
      allCounter.value++
    }, 1000)

    // this one only call in server
    onServerPrefetch(() => {
      setInterval(() => {
        console.log('leaked:serverCounter')
        serverCounter.value++
      }, 1000)
    })

    // this one only call in browser
    onMounted(() => {
      intervalId = setInterval(() => {
        console.log('browserCounter')
        browserCounter.value++
      }, 1000)
    })
    onBeforeUnmount(() => clearInterval(intervalId))

    return () => h('div', [
      h('p', `allCounter: ${allCounter.value}`),
      h('p', `serverCounter: ${serverCounter.value}`),
      h('p', `browserCounter: ${browserCounter.value}`),
    ])
  }
}

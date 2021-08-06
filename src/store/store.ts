import { reactive, readonly, watch, ref, Ref } from "vue";
import { set, get } from "idb-keyval";

export abstract class Store<T extends Object> {
  protected state: T;
  protected isInitialized: Ref<boolean>;

  constructor(readonly storeName: string) {
    const data = this.data();
    this.state = reactive(data) as T;
    this.isInitialized = ref(false);
  }

  async init() {
    if (this.isInitialized) {
      const stateFromIndexedDB = await get(this.storeName);
      if (stateFromIndexedDB) {
        Object.assign(this.state, JSON.parse(stateFromIndexedDB));
      }
      watch(
        () => this.state,
        (val) => set(this.storeName, JSON.stringify(val)),
        { deep: true }
      );
      this.isInitialized.value = true;
    }
  }
  protected abstract data(): T;

  public getState(): T {
    return readonly(this.state) as T;
  }
}

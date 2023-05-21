import { ConversationType } from '../@types/ConversationType'

type RootStoreType = {
  conversations: ConversationType[]
}

interface ConfigStoreType {
  (store: RootStoreType): {
    getState: () => RootStoreType
    setState: (prop: string | undefined) => void
  }
}

const rootStoreDefault: RootStoreType = {
  conversations: [],
}

const ConfigStore = function (rootStore: RootStoreType): void {
  this.rootStore = rootStore

  this.getState = (prop: string | undefined): RootStoreType => {
    let output = this.rootStore
    if (prop && this.rootStore[prop]) output = this.rootStore[prop]

    console.info('store [25]', {
      prop,
      conversations: this.rootStore.conversations,
      conversationsLen: this.rootStore.conversations.length,
    })

    return output
  }

  this.setState = (update: any): void => {
    Object.keys(update).forEach((key: string) => {
      if (this.rootStore[key]) {
        this.rootStore[key] = update[key]
      }
    })
  }
}

export const store = new ConfigStore(rootStoreDefault)

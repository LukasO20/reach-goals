import { Dexie } from 'dexie'

export const db = new Dexie('UserReachGoalsConfig')

db.version(1).stores({
    configs: 'key'
})
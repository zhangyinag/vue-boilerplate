export class FlatSubject<T> {
  private latestTimestamp = 1
  private cbs: Array<(data: T) => any> = []
  private errCbs: Array<(err: any) => any> = []
  fire (obj: Promise<T>) {
    let timestamp = this.latestTimestamp = this.latestTimestamp + 1
    obj.then((data: T) => {
      if (timestamp === this.latestTimestamp) this.cbs.forEach(cb => cb(data))
    }).catch(err => {
      if (timestamp === this.latestTimestamp) this.errCbs.forEach(errCb => errCb(err))
    })
  }

  subscribe (success?: (data: T) => any, fail?: () => any): Function {
    if (success) this.cbs.push(success)
    if (fail) this.errCbs.push(fail)
    return () => {
      let idx = -1
      if (success) {
        idx = this.cbs.findIndex(v => v === success)
        if (idx !== -1) this.cbs.splice(idx, 1)
      }
      if (fail) {
        idx = this.errCbs.findIndex(v => v === fail)
        if (idx !== -1) this.errCbs.splice(idx, 1)
      }
    }
  }
}

export function getFlatSubject<T> (success?: (data: T) => any, fail?: () => any): FlatSubject<T> {
  let fs = new FlatSubject<T>()
  fs.subscribe(success, fail)
  return fs
}

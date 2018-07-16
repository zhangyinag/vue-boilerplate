import {Message, MessageBox} from 'element-ui'

export function message (text: string): void {
  Message({
    message: text,
    type: 'error',
    showClose: true
  })
}

export function confirm (title: string, text: string): Promise<any> {
  return MessageBox.confirm(text, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

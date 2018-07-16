declare module 'js-cookie' {
  export function get (key: string): string
  export function set (key: string, value: string): void
  export function remove (key: string): void
}

export const serializer = {
  read: (v) => (v == null || v === 'null') ? undefined : JSON.parse(v),
  write: (v) => v === undefined ? 'null' : JSON.stringify(v),
}

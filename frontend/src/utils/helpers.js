export const uuid = () => {
  return Math.random().toString(36).substr(-8)
}

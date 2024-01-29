export default function cn(arr: (string | undefined)[] = []) {
  return arr.filter(Boolean).join(' ')
}
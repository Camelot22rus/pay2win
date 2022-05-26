
export const stringToColor = (string: string) => {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
}
  
export const useStringAvatar = (name: string = "empty", size: [number, number]) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: size[0],
        height: size[1],
      },
      children: `${name?.split(' ')[0][0]}${name?.split(' ')[0][1]}`,
    }
}
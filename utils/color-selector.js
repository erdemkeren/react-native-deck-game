/**
 * Get a random cute color based on the given OS.
 *
 * @return {promise}
 */
export function osColor(os) {
  let colors = []

  switch (os) {
    case 'ios':
      colors = [
        'rgb(255, 59, 48)',
        'rgb(255, 149, 0)',
        'rgb(255, 204, 0)',
        'rgb(76, 217, 100)',
        'rgb(90, 200, 250)',
        'rgb(0, 122, 255)',
        'rgb(88, 86, 214)',
        'rgb(255, 45, 85)',
      ]
      break
    case 'android':
      colors = [
        '#F44336',
        '#FF9800',
        '#FFEB3B',
        '#4CAF50',
        '#03A9F4',
        '#2196F3',
        '#9C27B0',
        '#E91E63',
      ]
  }

  return colors[Math.floor(Math.random() * colors.length)]
}

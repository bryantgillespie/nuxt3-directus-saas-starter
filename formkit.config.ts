import { generateClasses } from '@formkit/themes'
import { createAutoAnimatePlugin } from '@formkit/addons'

import theme from './form.theme.js'

export default {
  //   plugins: [createAutoAnimatePlugin()],
  config: {
    classes: generateClasses(theme),
  },
}

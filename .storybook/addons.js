import '@storybook/addon-actions/register'
import { register } from '../src'

import samples from '../src/samples'

// register the Sketch addon, adding the samples components to its scope
register(samples)

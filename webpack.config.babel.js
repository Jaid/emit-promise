import {configureUniversalLib} from "webpack-config-jaid"

export default configureUniversalLib({
  documentation: true,
  publishimo: {fetchGithub: true},
})
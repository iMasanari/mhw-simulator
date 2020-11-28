require('./About.css')

const md = require('~/documents/usage.md') as string

const About: React.FC = () =>
  <article className="About" dangerouslySetInnerHTML={{ __html: md }} />

export default About

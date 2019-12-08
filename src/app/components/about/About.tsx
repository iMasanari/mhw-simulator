import React from 'react'

require('./About.css')

const md = require('~/../README.md') as string

const About: React.FC = () =>
  <article className="About" dangerouslySetInnerHTML={{ __html: md }} />

export default About

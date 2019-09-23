import React from 'react'

require('./Header.css')

interface Props {
}

const Header: React.FC<Props> = () =>
  <header className="Header">
    <h1 className="Header-title">
      MHW<span className="Header-pc-only">:ICEBORNE</span> スキルシミュ
    </h1>
    <a
      className="Header-githubLink"
      href="https://github.com/iMasanari/mhw-simulator"
      target="_blank"
      rel="noopener"
    >
      Show on GitHub
    </a>
  </header>

export default Header

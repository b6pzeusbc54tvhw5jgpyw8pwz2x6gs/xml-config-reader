import React from 'react'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'

const MonacoEditor = dynamic(import('./MonacoEditor'), { ssr: false })

class XmlConfig extends React.Component {

  render() {

    return (
      <div>
        /* for debug */
        <pre style={{ width: 400, overflow: 'scroll' }}>{JSON.stringify(this.props,null,2)}</pre>
        <MonacoEditor value={this.props.text}/>
      </div>
    )
  }
}

XmlConfig.propTypes = {
  lastModified: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  preview: PropTypes.string,
  webkitRelativePath: PropTypes.string,
  text: PropTypes.string.isRequired,
}

export default XmlConfig

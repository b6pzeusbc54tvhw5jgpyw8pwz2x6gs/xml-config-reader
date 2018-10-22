import React from 'react'
import * as monaco from 'monaco-editor'
import styled from 'styled-components'

const EditorContainer = styled.div`
  width: 100%;
  height: 400px;
`

window.MonacoEnvironment = {
  // what is the baseUrl
  baseUrl: '/monaco-editor-external',
  getWorkerUrl: (moduleId, label) => {
    return '/monaco-editor-external/editor.worker.bundle.js'
  }
}

class MonacoEditor extends React.Component {

  componentDidMount() {
    this.editor = monaco.editor.create(this.monacoNode, {
      value: this.props.value,
      theme: 'vs-dark',
      language: 'xml'
    })
    window.__editor = this.editor
  }

  componentDidUpdate(prevProps) {
    if( prevProps.value !== this.props.value ) {
      this.editor.setValue(this.props.value)
    }
  }

  render() {
    return (
      <EditorContainer ref={n=> this.monacoNode = n} />
    )
  }
}

export default MonacoEditor

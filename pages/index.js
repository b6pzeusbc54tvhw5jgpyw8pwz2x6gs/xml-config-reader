import dynamic from 'next/dynamic'
import { Box, Heading, Button } from 'rebass'
import Dropzone from 'react-dropzone'
import axios from 'axios'

const MonacoEditor = dynamic(import('./MonacoEditor'), {ssr: false})

const request = axios.create({
  baseURL: '/',
  timeout: 3000,
});

class Index extends React.Component {
  constructor() {
    super()
    this.state = { files: [], xmlText: 'drop and drop your xml file' }
  }

  onDrop = (files) => {
    this.setState({ files })
    console.log(files[0])
    const formData = new FormData()
    formData.append('image', files[0] )
    const reader = new FileReader()
    reader.onload = (e) => {
      this.setState({ xmlText: e.target.result })
    };
    reader.readAsText(files[0])
    request.post( '/api/v1/upload', formData )
  }

  componentDidMount() {

  /*
    window.MonacoEnvironment = {
      baseUrl: '/monaco-editor-external',
      getWorkerUrl: (moduleId, label) => {
        return './editor.worker.bundle.js'
      }
    }

    this.editor = monaco.editor.createDiffEditor(this.containerElement, {
      value: [`
<name>yoo</name>
<name>yoo</name>
<name>yoo</name>
      `.trim()].join('\n'),
      language: 'xml'
    })
    */
  }

  render() {
    return (
      <Box>
        <Heading>Hello</Heading>
        <Button>Rebass</Button>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
        <MonacoEditor language="javascript" value={this.state.xmlText} />
      </Box>
    )
  }
}


export default Index

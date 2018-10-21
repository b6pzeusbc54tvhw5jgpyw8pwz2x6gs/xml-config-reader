import dynamic from 'next/dynamic'
import { Box, Heading, Button } from 'rebass'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Select from 'react-select'
import styled from 'styled-components'
import pick from 'lodash/pick'
import map from 'lodash/map'

import XmlConfig from './component/XmlConfig'
import { parseString } from 'xml2js'
import { optionArrSelector } from './selector'

const SelectBox = styled.div`
  width: 200px;
  margin: 20px;
`

class Index extends React.Component {
  state = {
    selectedOption: null,
    xmlConfigArr: [],
    jsonConfig: [],
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
    console.log(`Option selected:`, selectedOption)
  }

  onDrop = (files) => {
    files.forEach( file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        let config = pick(file, [
          'lastModified', 'name', 'preview',
          'size', 'type', 'webkitRelativePath',
        ])
        config = { ...config, text: e.target.result }
        this.setState({ xmlConfigArr: [ ...this.state.xmlConfigArr, config ]})
        parseString( config.text, { explicitArray: false }, (err,jsonConfig) => {
          if(err) {
            console.log(err)
            return
          }
          this.setState({ jsonConfig })
        })
      }
      reader.readAsText(file)
    })
  }

  handleInputChange = key => {
    const optionArr = optionArrSelector( this.state, { key })
    console.log(optionArr)
  }

  render() {
    return (
      <Box>
        <Heading>Hello Rebass</Heading>
        <SelectBox>
          <Select
            instanceId='key'
            value={this.selectedOption}
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            options={this.state.optionArr}
          />
        </SelectBox>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
        <aside>
          <h2>Dropped files</h2>
          {this.state.xmlConfigArr.map( (xc,i) => <XmlConfig key={i} {...xc}/>)}
        </aside>
      </Box>
    )
  }
}


export default Index

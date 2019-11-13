import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";
// import './index.css'
import PDFViewer from "pdf-viewer-reactjs";
import "antd/dist/antd.css";
import { Spin, Modal, Button, Icon, Input, Row, Col } from "antd";
import { Document, Page } from "react-pdf/dist/entry.parcel";
import "./style.css";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/Page/AnnotationLayer.css";
import Center from "react-center";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true
};

class App extends React.Component {
  state = {
    visible: false,
    numPages: null,
    pageNumber: 1,
    scale: 1.0,
    scaleString: "100%"
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  public zoomIn = value => {
    if(this.state.scale != 2.0) {
      let value = this.state.scale + 0.5
      this.setState({scale: value})

    }
  }
  public zoomOut = value => {
    if(this.state.scale != 0.5) {
      let value = this.state.scale - 0.5
      this.setState({scale: value})

    }
  }
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    let { pageNumber, numPages } = this.state;
    return (
      <div>
        {/* <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="1000"
        >
           <PDFViewer
            document={{
                url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf'
            }}
            loader={
              <Spin size="large" />
            }
            navbarOnTop
            style={{background: "black"}}
            // css="pdfView"
            canvasCss="pdfCanvas"
            scale={1.5}
                scaleStep={0.5}
                maxScale={5}
                minScale={0.5}
        />
        </Modal>
        <div style={{height: "80vh",overflow: "auto",width: "60vw",background: "whitesmoke"}}> */}

        <Document
          file="https://asp.demosoft.me/api/files/fileName/github.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
          options={{
            cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true
          }}
        >
          <div className="tool-box" style={{ width: "98vw",position: "fixed" }}> <Icon type="close" style={{float: "left"}}/><span>github.pdf</span> <Button
            type="primary"
            shape="round"
            icon="download"
            style={{ position: "absolute", right: 20, top: 15 }}
          >
            ดาวน์โหลดเอกสาร
          </Button></div>
  <div style={{paddingTop: "60px",background: "whitesmoke"}}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} scale={this.state.scale} pageNumber={index + 1} />
          ))}
          <Center>
          <div
            className="tool-box"
            style={{ width: "60%", marginLeft: "auto", marginRight: "auto" ,position: "fixed",bottom: 0}}
          >
            {" "}
            <p>
            <Row>
      <Col span={8}>Page {pageNumber} of {numPages} </Col>
      <Col span={8}><Button shape="circle" icon="zoom-in" onClick={this.zoomIn} style={{margin: "0px 5px 0px 5px"}}/> <Input value="100%" style={{width: 200,margin: "0px 5px 0px 5px"}} /><Button shape="circle" icon="zoom-out" onClick={this.zoomOut} style={{margin: "0px 5px 0px 5px"}}/></Col>
      <Col span={8}>col-8</Col>
    </Row>
            </p>
          </div>
          </Center>
          </div>
        </Document>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

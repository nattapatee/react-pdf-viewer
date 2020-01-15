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
    scaleString: "100%",
    renderAnnotationLayer: true,
    renderInteractiveForms: true,
    renderMode: 'canvas',
    renderTextLayer: true,
    rotate: null
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  public zoomIn = value => {
    if (this.state.scale != 2.0) {
      let value = this.state.scale + 0.5
      this.setState({ scale: value })

    }
  }
  public zoomOut = value => {
    if (this.state.scale != 0.5) {
      let value = this.state.scale - 0.5
      this.setState({ scale: value })

    }
  }
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  public testFuntion = () => {
    console.log("test")
  }
  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  changePage = offset => this.setState(prevState => ({
    pageNumber: (prevState.pageNumber || 1) + offset,
  }));

  onPageRenderSuccess = page => console.log('Rendered a page', page);

  rotateLeft = () => {
    this.setState(prevState => ({ rotate: (prevState.rotate + (-90) + 360) % 360 }));
  }

  rotateRight = () => {
    this.setState(prevState => ({ rotate: (prevState.rotate + 90 + 360) % 360 }));
  }

  changeRotation = by => {
  }
  get pageProps() {
    const {
      scale,
      renderAnnotationLayer,
      renderInteractiveForms,
      renderMode,
      renderTextLayer,
    } = this.state;

    return {
      className: 'custom-classname-page',
      onClick: (event, page) => console.log('Clicked a page', { event, page }),
      onRenderSuccess: this.onPageRenderSuccess,
      scale: scale,
      renderAnnotationLayer,
      renderInteractiveForms,
      renderMode,
      renderTextLayer,
      customTextRenderer: textItem => (
        textItem.str
          .split('ipsum')
          .reduce((strArray, currentValue, currentIndex) => (
            currentIndex === 0
              ? ([...strArray, currentValue])
              : ([...strArray, (
                // eslint-disable-next-line react/no-array-index-key
                <mark key={currentIndex}>
                  ipsum
                </mark>
              ), currentValue])
          ), [])
      ),
    };
  }

  render() {
    let { pageNumber, numPages } = this.state;
    const { pageProps } = this;

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
          rotate={this.state.rotate}
          options={{
            cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true
          }}
          loading={<Center><Spin style={{position: "absolute",bottom: "60%"}} size="large" tip="กำลังโหลดเอกสาร..."/></Center>}
        >
          <div className="tool-box" style={{ width: "98vw", position: "fixed" }}> <Icon className="closeBtn" type="close" style={{ float: "left" }} /><span>github.pdf</span> <Button
            type="primary"
            shape="round"
            icon="download"
            style={{ position: "absolute", right: 20, top: 15 }}
          >
            ดาวน์โหลดเอกสาร
          </Button></div>
          <div style={{ paddingTop: "60px", background: "whitesmoke" }}>
            {
              Array.from(
                new Array(numPages),
                (el, index) => (
                  <Page
                    {...pageProps}
                    key={`page_${index + 1}`}
                    inputRef={
                      (pageNumber === index + 1)
                        ? (ref => ref && ref.scrollIntoView())
                        : null
                    }
                    pageNumber={index + 1}
                  />
                ),
              )
            }
            {/* {Array.from(new Array(numPages), (el, index) => (
            <Page onLoadSuccess={this.testFuntion} key={`page_${index + 1}`} scale={this.state.scale} pageNumber={index + 1} />
          ))} */}
            <Center>
              <div className="tool-box" style={{position: "fixed", bottom: 20}}
>

              </div>
              <div
                className="tool-box"
                style={{ width: "60vw", marginLeft: "auto", marginRight: "auto", position: "fixed", bottom: 0 }}
              >
                {" "}
                <p>
                  <Row>
                    <Col span={10}> <Button shape="circle" icon="zoom-in" onClick={this.zoomIn} style={{ margin: "0px 5px 0px 5px" }} /> <Input value="100%" style={{ width: "30%", margin: "0px 5px 0px 5px" }} /><Button shape="circle" icon="zoom-out" onClick={this.zoomOut} style={{ margin: "0px 5px 0px 5px" }} /></Col>
                    <Col span={9}>
                    <Button shape="circle" icon="left" disabled={pageNumber <= 1}
                      onClick={this.previousPage} style={{ margin: "0px 5px 0px 5px" }} /> {`หน้า ${pageNumber || (numPages ? 1 : '--')} จาก ${numPages || '--'}`}<Button shape="circle" icon="right" disabled={pageNumber >= numPages}
                        onClick={this.nextPage} style={{ margin: "0px 5px 0px 5px" }} />
                      </Col>
                    <Col span={5}>
                    <Button onClick={this.rotateLeft} shape="circle" icon="undo" style={{ margin: "0px 5px 0px 5px" }} />
                    <Button onClick={this.rotateRight} shape="circle" icon="redo" style={{ margin: "0px 5px 0px 5px" }} />
                    </Col>
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

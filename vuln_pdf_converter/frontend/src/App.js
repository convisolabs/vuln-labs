import { useState } from 'react';
import './App.css';
import { initialBody, initialLinks } from "./assets/example_pdf.js"
import api from './services/api';

function App() {
  const [htmlText, setHtmlText] = useState("");
  const [links, setLinks] = useState([]);

  const loadExample = () => {
    setLinks(initialLinks);
    setHtmlText(initialBody);
  }
  const changeLinkVal = (isTagNameChanged, linkIdx, value) => {
    const newList = [...links];
    if (isTagNameChanged) {
      newList[linkIdx].name = value;
    }
    else {
      newList[linkIdx].uri = value;
    }
    setLinks(newList);
  }

  const removeLink = (linkIdx) => {
    setLinks(links.filter((ele, idx) => idx !== linkIdx))
  }

  const addLink = () => {
    setLinks([...links, {
      name: "",
      uri: ""
    }])
  }

  const sendPdf = async () => {
    try {
      const response = await api.post('/pdf', {
        body: htmlText,
        links
      }, { responseType: 'blob' });
      const file = new Blob(
        [response.data],
        { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <p>
          Gere PDFs a partir de estruturas HTML.
        </p>
        <p className="sub-header">Para adicionar images, use &#123;&#123;tag&#125;&#125; e adicione a tag e link na lista. <span onClick={loadExample} className="example">Exemplo</span></p>
        <div className="body">
          <textarea spellCheck="false"
            value={htmlText} onChange={({ target }) => setHtmlText(target.value)}>
          </textarea>
          <div className="links-div">
            Links
            {links.map(({ name, uri }, idx) => (
              <div key={`idx-${idx + 1}`}>
                <input
                  onChange={(e) => changeLinkVal(false, idx, e.target.value)}
                  value={name} className="link-input" placeholder="nome da tag" />
                <input
                  onChange={(e) => changeLinkVal(true, idx, e.target.value)}
                  value={uri} className="link-input" placeholder="link" />
                <span className="link-btn" onClick={() => removeLink(idx)}>-</span>
              </div>
            ))}
            <span
              className="link-btn"
              style={{ verticalAlign: "middle", display: "block" }}
              onClick={addLink}>+</span>
          </div>
        </div>
        <br />
        <button onClick={sendPdf} className="create-btn">Gerar</button>
      </div>
    </div>
  );
}

export default App;

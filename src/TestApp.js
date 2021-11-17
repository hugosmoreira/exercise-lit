import { html, css, LitElement } from 'lit';
import './Components/GetData'

export class TestApp extends LitElement {

  static styles = [css`

    .container {
        display: block;
        clear: both;
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
        align-items: center;
        justify-content: center;

    }
    
    
  
    .title {
        font-size:1.5em;
        font-weight:bold;
    }
    .id {
        width:5%;

    }
    .color {
        width:1%;
        
    }
    
   
`];


  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--test-app-text-color, #000);
      }
      
    `;
  }

  static get properties() {
    return {
      wiki: { type: Array },
      
    };
  }

  constructor() {
    super();

    this.wiki = []

    this.addEventListener('ApiData', e => {
      this._dataFormat(e.detail.data);
    })
  }

  _dataFormat(data) {
    let allData = [] 
    

    data.map(item => {
      allData.push({
        color: item.representation.color,
        id: item.key,
        description: item.tooltip,
        priority: item.priority,
      })
      
    })
    this.wiki = allData
    
    

  }

  __increment() {
    this.counter += 1;
  }

  render() {
    return html`
      <get-data url="https://mntg.carsprogram.org/events_v1/api/eventMapFeatures" method="GET" ></get-data>
      ${this.dateTemplate}
    `;
  }


  get dateTemplate() {
    
    return html`
      ${this.wiki.map(item => html`
        <div class="container">
          <h1 class="title">High Priority Events: Minnesota & Iowa (41)</h1>
          <div class="people">
                    <p>Last Updated:  <link> Refresh</p>
                    <u></u>
          </div>
          <table style="width:100%">
            <tr>
              <td>ID</td>
              <td>Description</td>
              <td>Priority</td>
            </tr>
            <tr>
              <td class="color">${item.color}</td>
              <td>${item.id}</td>
              <td>${item.description}</td>
              <td>${item.priority}</td>
            </tr>
          </table>

            
        </div>
      
      
      `)}
      
    `;
  }

}


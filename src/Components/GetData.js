import { LitElement } from "lit-element";


export class GetData extends LitElement {

        static get properties() {
            return {
                title: { type: String },
                method: { type: String },
            };
        }
    
        firstUpdated() {
            this.getData();
        }

        _sendData(data) {
            this.dispatchEvent(new CustomEvent('ApiData', {
                detail: { data }, bubbles : true, composed: true
            }))
        }
        getData() {
            
            fetch("https://mntg.carsprogram.org/events_v1/api/eventMapFeatures" , { method: this.method })
            .then((response) => {
                if(response.ok) return response.json();
                return Promise.reject(response)
                    
                
            })
            .then((data) => { this._sendData(data) })
            .catch((error) => { console.warn('ERROR SOMETHING WRONG', error) })
        }   

    
}

customElements.define("get-data", GetData);
import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-redirect-notice.tpl.js";

export default class UcdlibRedirectNotice extends LitElement {

  static get properties() {
    return {
      totalTime: { type: Number, attribute: 'total-time' },
      timeRemaining: { state: true },
      hasTimer: { state: true },
      redirectLocation: { type: String, attribute: 'redirect-location' },
      buttonText: { type: String, attribute: 'button-text' },
      titleText: { type: String, attribute: 'title-text' },
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.totalTime = 15;
    this.propsSetFromScript = false;
    this.hasTimer = false;
    this.redirectLocation = '';
    this.buttonText = 'Redirect Now';
    this.titleText = 'This Page No Longer Exists';
  }

  willUpdate(props){
    if ( props.has('totalTime') ) {
      this.timeRemaining = this.totalTime;
    }
    if ( props.has('totalTime') || props.has('redirectLocation') ) {
      this.hasTimer = this.totalTime > 0 && this.redirectLocation;
    }
  }

  firstUpdated() {
    if ( this.hasTimer ) {
      this.startTimer();
    }
  }

  startTimer() {
    if ( this.timer ) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if ( this.timeRemaining <= 0 ) {
        clearInterval(this.timer);
        this.doRedirect();
      }
    }, 1000);
  }

  doRedirect() {
    if ( !this.redirectLocation ) return;

    window.location = this.redirectLocation;
  }
}

customElements.define('ucdlib-redirect-notice', UcdlibRedirectNotice);

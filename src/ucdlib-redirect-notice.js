import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-redirect-notice.tpl.js";

/**
 * @description A component that displays a notice that a page has been moved or deleted,
 * and redirects to the new location after a set time.
 * @property {Number} totalTime - The total time in seconds to wait before redirecting.
 * @property {String} redirectLocation - The URL to redirect to.
 * @property {String} buttonText - The text to display on the redirect button.
 * Set to empty string to hide the button.
 * @property {String} titleText - The text to display in the heading.
 * Set to empty string to hide the heading.
 * @property {Number} timeRemaining - The time remaining in seconds before redirecting.
 * @property {Boolean} hasTimer - Whether or not to display the timer.
 */
export default class UcdlibRedirectNotice extends LitElement {

  static get properties() {
    return {
      totalTime: { type: Number, attribute: 'total-time' },
      redirectLocation: { type: String, attribute: 'redirect-location' },
      buttonText: { type: String, attribute: 'button-text' },
      titleText: { type: String, attribute: 'title-text' },
      timeRemaining: { type: Number, state: true },
      hasTimer: { type: Boolean, state: true }
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

  /**
   * @description Lit lifecycle method. Called when the element is will updated.
   * @param {Map} props - Changed properties.
   */
  willUpdate(props){
    if ( props.has('totalTime') ) {
      this.timeRemaining = this.totalTime;
    }
    if ( props.has('totalTime') || props.has('redirectLocation') ) {
      this.hasTimer = this.totalTime > 0 && this.redirectLocation;
    }
  }

  /**
   * @description Lit lifecycle method. Called when the element is first updated.
   */
  firstUpdated() {
    if ( this.hasTimer ) {
      this.startTimer();
    }
  }

  /**
   * @description Starts the automatic redirect timer.
   */
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

  /**
   * @description Redirects to the specified redirect location.
   * @returns {void}
   */
  doRedirect() {
    if ( !this.redirectLocation ) return;

    window.location = this.redirectLocation;
  }
}

customElements.define('ucdlib-redirect-notice', UcdlibRedirectNotice);

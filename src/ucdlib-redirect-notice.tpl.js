import { html, css } from 'lit';
import text from "@ucd-lib/theme-sass/1_base_html/_text.css.js";
import button from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";
import panel from "@ucd-lib/theme-sass/4_component/_panel.css.js";
import oBox from "@ucd-lib/theme-sass/3_objects/_index.css.js"
import heading from "@ucd-lib/theme-sass/1_base_html/_headings.css.js";
import headingClasses from "@ucd-lib/theme-sass/2_base_class/_headings.css.js"
import spaceUtils from "@ucd-lib/theme-sass/6_utility/_u-space.css.js";
import brandClasses from "@ucd-lib/theme-sass/4_component/_category-brand.css.js"

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 1000;
    }
    .modal-container {
      width: 100%;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      font-family: "proxima-nova",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"
    }
    [hidden] {
      display: none !important;
    }
    .film {
      background-color: #00000085;
      width: 100%;
      height: 100%;
      z-index: 99;
      position: fixed;
      left: 0;
      top: 0;
    }
    .box-content {
      background-color: #fff;
      width: 85%;
      max-width: 910px;
      z-index: 100;
    }
    .btn--primary {
      box-sizing: border-box;
    }
    h2.heading--weighted-underline {
      font-weight: 700;
    }
    .btn--primary::before {
      content: ">"
    }
  `;

  return [
    text,
    button,
    panel,
    oBox,
    heading,
    headingClasses,
    spaceUtils,
    brandClasses,
    elementStyles
  ];
}

export function render() {
return html`
  <div class="modal-container">
    <div class="film"></div>
    <div class="box-content panel panel--center o-box o-box--large u-space-mb--flush">
      <h2 class='heading--weighted-underline u-space-mb--large' ?hidden=${!this.titleText}>${this.titleText}</h2>
      <slot name='body'>
        <p>The page you have requested no longer exists.
          ${this.redirectLocation ? html`
          <span>
          Please update your bookmarks and links to point to <code>${this.redirectLocation}</code>.
          </span>` :
          html`
          <span><br>No redirect location has been provided. If you believe this is an error, please contact Library ITIS.</span>`}
        </p>
      </slot>
      <div ?hidden=${!this.redirectLocation || !this.buttonText}>
        <a href=${this.redirectLocation} class="btn--primary">${this.buttonText}</a>
      </div>
      <div ?hidden=${!this.hasTimer}>
        <hr>
        <p class='primary'>You will be automatically redirected in ${this.timeRemaining}</p>
      </div>

    </div>
  </div>
`;}

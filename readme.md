# Redirect Notice

A basic Lit element that displays a modal informing the user that the page has moved, and then automatically redirects them after a set amount of time.

This should primarily be used for recently deprecated internal-facing applications, so that we don't have to maintain years worth of redirects.

## Use

```html
<script 
  src="https://github.com/UCDavisLibrary/ucdlib-redirect-notice/releases/latest/download/ucdlib-redirect-notice.js">
</script>

<ucdlib-redirect-notice redirect-location="https://library.ucdavis.edu">
<ucdlib-redirect-notice>
```

For more advanced use cases, see the examples directory.

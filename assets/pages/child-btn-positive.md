---
title: Buttons & Links
template: child-2col-coded.html
active_page: buttons-links
snippet_title: Positive Action Button
notes: "Clicking on a Blue button will do something positive on Duo's side. It will not take you to another page."
example: '<button class="primary">Positive Button</button>'
---

* [HTML](0)
* [SCSS](1)

```html
  <button class="primary">Positive Action</button>
```
```scss
  button, .button, input[type="submit"]:not(.link), input[type="reset"], input[type="button"] {
    @include button;
    @include button-style($grey);
    &.primary {
        @include button-style($info-blue);
    }
  }
```
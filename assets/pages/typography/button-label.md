---
title: Typography
template: child-2col-coded
active_page: 'button-label'
snippet_title:
notes: This is the correct default size and style for labels of buttons.
example: '<label class="subline">Button Label</label>'
---

* [HTML](0)
* [SCSS](1)

```html
<label class="subline">Button Label</label>
```
```sass
label {
  color: $grey;

  [type=checkbox] + &, [type=radio] + & {
    color: inherit;
  }
  span {
    color: $grey-darker;
  }

  @include low-res {
    color: $grey-dark-low-res;
  }
}
.subline {
  display: block;
  margin-bottom: 0.5rem;
}
```

---
title: Navigation
template: child-2col-coded
active_page: 'selected'
snippet_title: Selected Page
notes: 'A nav-item with full green background indicates the current page that the user is on.'
example: '<nav class="navigation">
  <a class="current">
    Users
  </a>
</nav>'
---

* [HTML](0)
* [SCSS](1)

```html
<nav class="navigation">
  <a class="current">
    Users
  </a>
</nav>
```
```sass
.navigation {
    margin-bottom: .688rem; // 11/16

    > a {
        @include transition(background, color);
        @include no-box-shadow;
        color: $default-link-color;
        display: block;
        font-size: .875rem;
        line-height: 1.25em;
        padding: .687rem 1.5rem;
        position: relative;
        text-decoration: none;

        &:focus {
            @include no-box-shadow;
            transition-duration: 0s;
            border-radius: 0;
            z-index: 3000;
        }

        &:hover {
            @include no-box-shadow;
            background-color: $nav-state-color;
            .count {
                color: $default-link-color;
            }
        }

        &:active {
            background-color: $white;
        }

        &.current {
            background: $nav-state-color;

            .count {
                color: $default-link-color;
            }
        }

        .flexbox & {
            display: flex;
            align-items: baseline;

        }
    }

    .count {
        position: absolute;
        top: .688rem; // 11/16
        right: 1.5rem; // 24/16
        color: $count-color;
        transition: color $fast-ease;

        .flexbox & {
            position: absolute;
        }
    }
}
```

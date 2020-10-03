<div align="center"><h1>makedown 📃</h1>Compile your markdown files</div><hr />

With ***makedown*** you are now able to code your own markdown file.
Use javascript to automatically render your `README`, `CONTRIBUTING` and any other markdown files with dynamic variables such as your package version.

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Components](#components)
    - [Markdown Elements](#markdown-elements)
      - [`headline`](#headlinecontent-options)
      - [`paragraph`](#paragraphcontent-options)
      - [`bold`](#boldcontent)
      - [`italic`](#italiccontent)
      - [`strikethrough`](#strikethroughcontent)
      - [`emphasize`](#emphasizecontent)
      - [`quote`](#quotecontent)
      - [`code`](#codecontent-options)
      - [`newline`](#newlineoptions)
      - [`link`](#linkurl-options)
      - [`text`](#textcontent)
      - [`list`](#listitems-options)
      - [`table`](#tableheaders-rows)
    - [Smart Components](#smart-components)
      - [`tableOfContents`](#tableofcontentsoptions)
      - [`each`](#eachcollection-handler)

## Installation
The installation is as easy as the usage of makedown. Use `npm` to install the package

```shell
npm i makedown
```

## Usage
```shell
node README.md.js
```

## Components
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.

### Markdown Elements
These components simply generate basic markdown elements such as **bold**, _italic_ or ~~strikethrough~~ texts.
There are also more complex components such as the list and the table component.

#### `.headline(content, options)`
The headline component creates a simple markdown headline which is prefixed by several `#`-symbols.
When using headlines a table of contents can be generated automatically.

- **content** `string` – The inline content that should be rendered as a headline. Must be either a string or an object that implements `toString`.
- **options** `object|number` (_defaults_) – The headline rendering options.
  - **indentation** `number` (_default: 1_) – Which headline indentation level (1-6) should be used.
  - **tocTitle** `string|null` (_default: null_) – The text to use for the table of contents. If the value is null the headlines content will be used.
  - **tocHref** `string|null` (_default: null_) – The ID of the element to link to. If the value is null the ID will be guessed by the headlines content

#### `.paragraph(content, options)`
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.


#### `.bold(content)`
Generates a bold inline string

- **content** `string` – The inline content that should be rendered as a bold text. Must be either a string or an object that implements `toString`.

#### `.italic(content)`
Generates an italic inline string

- **content** `string` – The inline content that should be rendered as an italic text. Must be either a string or an object that implements `toString`.

#### `.strikethrough(content)`
Generates a strikethrough inline string

- **content** `string` – The inline content that should be rendered as a strikethrough text. Must be either a string or an object that implements `toString`.

#### `.emphasize(content)`
Generates an emphasized inline string, meaning it is ***bold and italic***.

- **content** `string` – The inline content that should be rendered as an emphasized text. Must be either a string or an object that implements `toString`.

#### `.quote(content)`
Generates a qouted text-block.

- **content** `string` – The block content that should be rendered as a quotation. Must be either a string or an object that implements `toString`.

#### `.code(content, options)`
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.


#### `.newline(options)`
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.


#### `.link(url, options)`
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.


#### `.text(content)`
Renders the content as is and escapes all markdown symbols.

- **content** `string` – The content that should be rendered as is. Must be either a string or an object that implements `toString`.

#### `.list(items, options)`
Generates a list.

- **items** `array` – An array of items that should be rendered in the list.
  - **items.item** `string|array|object` – Must be either a string or an object that implements `toString` or another array of items. When the item is an object the following properties can be set:
    - **text** `string` – The text for the listitem. Must be either a string or an object that implements `toString`.
    - **checked** `boolean` (_default: false_) – Whether the listitem is checked (only when the list type is set to `check`).
    - **type** `string` (_default: null_) – Overrides the default list type (only `unordered` and `ordered` are valid. Checklists cannot have mixed listitem types). When set to null the default list type is used.
    - **prefix** `string` (_default: null_) – Overrides the list items prefix (only when the list type is set to `ordered`)
- **options** `object` (_defaults_) – The list rendering options.
  - **type** `string` (_default: unordered_) – The type of the list being either `unordered`, `ordered` or `check`.

#### `.table(headers, rows)`
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.


### Smart Components
With these components you can use more complex logic such as generating a table of contents or repeating certain structures with the `each`-directive.

#### `.tableOfContents(options)`
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.


#### `.each(collection, handler)`
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
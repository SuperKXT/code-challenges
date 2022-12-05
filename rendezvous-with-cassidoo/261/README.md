# Format Markdown Table String

[issue #261 of rendezvous with cassidoo](https://buttondown.email/cassidoo/archive/find-something-youre-passionate-about-and-keep/).

## Description

Given a string that represents a markdown table, return a formatted markdown table.
A formatted markdown table means that the width of each column is the width of the longest cell in the column.

## Example

```plaintext
Input:
| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |

Output:
| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
```

// Local remark plugin for GFM table support.
// Wires micromark-extension-gfm and mdast-util-gfm directly into the
// unified compiler context, bypassing remark-gfm's version conflicts.
import { gfmTable } from 'micromark-extension-gfm-table'
import { gfmTableFromMarkdown, gfmTableToMarkdown } from 'mdast-util-gfm-table'

export default function remarkGfmTables() {
  const data = this.data()

  const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = [])
  const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
  const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  micromarkExtensions.push(gfmTable())
  fromMarkdownExtensions.push(gfmTableFromMarkdown())
  toMarkdownExtensions.push(gfmTableToMarkdown())
}

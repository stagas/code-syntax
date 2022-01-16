import css from './css.js'
import js from './js.js'

export default {
  script: [
    /(?<=<script[^>]*?>)[^]*?(?=<\/script>)/, // entry point is a <script> tag
    js, // we pass the definitions for js we imported earlier to be used inside
  ],
  style: [
    /(?<=<style[^>]*?>)[^]*?(?=<\/style>)/, // entry point is a <style> tag
    css, // we pass the definitions for css we imported earlier to be used inside
  ],
  comment: /<!--[^]*?-->|<!--[^]*/,
  tag: [
    /(?<=<\/?)([^<]*?(".+?")[^<]*|([^>]*))(?=>)/, // inside <tag></tag>
    {
      _: [
        /^[/!]?[\w-]+/, // the tag name
        {
          tag: /[\w-]+/ // this small bypass so it doesn't highlight the slashes /
        }
      ],
      string: /".*?"/, // any attribute strings
      attribute: /[\w-]+/, // the attribute names
    },
  ],
}

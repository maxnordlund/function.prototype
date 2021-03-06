# Function.prototype polyfill
This is a polyfill for the three basic function methods `apply`, `bind` and
`call` for [ECMAScript 1st Edition (ECMA-262)][1].

That's right, as compatible as it literally can be*. Why do you ask? Well to
prove a point and to show just how much you can do in a dynamic language such
as JavaScript/ECMAScript.

_\*This means Internet Explorer 3.0 and Netscape Navigator 2.0, yeah way back._

---

It avoids fancy things like [Array.prototype.push][2] and
[Array.prototype.join][3]. For the latter it ships an O(n log n) non-recursive
string concatenation implementation.

[1]: http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%201st%20edition,%20June%201997.pdf
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join

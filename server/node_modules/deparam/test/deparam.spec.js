/**
 * Created by alexey2baranov on 8/26/16.
 */

var $ = require("jquery")
var deparam = require("../src/deparam")

describe('deparam', function () {
  it('should deparam obj', function () {
    var target= {a:"1", b:"qwerty"}
    var target2= deparam(decodeURIComponent($.param(target)))

    expect(target2).eql(target)
  })

  it('should deparam obj with array property', function () {
    var target= {a:["x", "y"]}
    var target2= deparam(decodeURIComponent($.param(target)))

    expect(target2).eql(target)
  })

  it('should deparam obj with obj property', function () {
    var target= {a:{b1:"x", b2:"y"}}
    var target2= deparam(decodeURIComponent($.param(target)))

    expect(target2).eql(target)
  })

  it('should deparam obj with obj with obj and arr property', function () {
    var target= {o1:{o2:{s:"x", a:["a1", "a2"]}}}
    var target2= deparam(decodeURIComponent($.param(target)))

    expect(target2).eql(target)
  })
});

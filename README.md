
This is an experimental app that shows the timings of some of
the BBC's radio programmes.

I was originally going to use it to get to know ActionCable,
but it turned out that React was a better fit for the
functionality, so I changed tack and used it to practise
React with instead.

It it in Rails 5.1, and uses Webpack to serve up the JS.
Rails (with SQLite) supplies the JSON data, React handles
the front-end and caches the programme listings.

The data extraction is in Ruby, and starts with the
module, *lib/bbc.rb*.

I coded it up as I went along, hence it's a bit untidy and
there're no tests. Also, it contains redundant code,
just in case I do add some ActionCable stuff.


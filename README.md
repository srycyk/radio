
This is a personal-use web application that shows the timings
of some of the BBC's radio programmes.

It's more convenient to use than the BBC site, because,
on this site, everything's on a single page and
the current programmes are shown at the top.

It it in Rails 5.1, and uses Webpack to process the JS.

The back-end is in Rails.
It supplies the programme listings as JSON, which are stored in SQL.

The front-end is in React.
Each show billing has a link to a page on the BBC site that gives
detailed programme information.

The data extraction (which scrapes the BBC site) is in Ruby,
and starts with the module, *lib/bbc.rb*.

I coded it up as I went along, hence it's a bit untidy,
and there're no tests.


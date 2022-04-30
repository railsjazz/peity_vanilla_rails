# Peity Vanilla Rails

Sparklines are small but intense charts. This gem is a wrapper around [peity_vanilla](https://github.com/railsjazz/peity_vanilla) library. You can generate simple but informative charts with vanilla JS.

<img src="./docs/sparklines.png" height="400px"/>

## Usage

1. Add to `application.js`

```javascript
//= require peity_vanilla.js
```

2. Add charts in your code:

```erb
<h3>Line</h3>
<%= peity_line_chart([115,123,234,-113,-43,-223,127,332,152,233]) %>
<%= peity_line_chart(100.times.map{rand(100) * [1,-1].sample}, options: { width: 240, fill: 'lightgreen', stroke: 'blue' }) %>

<h3>Bar</h3>
<%= peity_bar_chart([115,123,234,-113,-43,-223,127,332,152,233]) %>
<%= peity_bar_chart('115,123,234,-132,152,233') %>
<%= peity_bar_chart(50.times.map{rand(100) }, options: { width: 240, fill: ['orange'], height: 30, padding: -0.1 }) %>

<h3>Pie</h3>
<%= peity_pie_chart "2/3" %>
<%= peity_pie_chart [3,10] %>
<%= peity_pie_chart [3,10], options: { fill: ["red", "#eeeeee"], radius: 10 } %>
<%= peity_pie_chart [236,300] %>

<h3>Donut</h3>
<%= peity_donut_chart "2/3" %>
<%= peity_donut_chart [6,20] %>
<%= peity_donut_chart [236,300] %>
```

## Installation
Add this line to your application's Gemfile:

```ruby
gem "peity_vanilla_rails"
```

And then execute:
```bash
$ bundle
```

## Default Options

More information here: https://github.com/railsjazz/peity_vanilla.

You can pass in `options` any of the attributes.

```html
<script>
  peity.defaults.pie = {
    delimiter: null,
    fill: ["#58508d", "#ffa600", "#ff6361"],
    height: null,
    radius: 8,
    width: null
  }

  peity.defaults.donut = {
    delimiter: null,
    fill: ["#ff9900", "#fff4dd", "#ffd592"],
    height: null,
    innerRadius: null,
    radius: 8,
    width: null
  }

  peity.defaults.line = {
    delimiter: ",",
    fill: "#fff4dd",
    height: 16,
    max: null,
    min: 0,
    stroke: "#ffa600",
    strokeWidth: 1,
    width: 32
  }

  peity.defaults.bar = {
    delimiter: ",",
    fill: ["#4d89f9"],
    height: 16,
    max: null,
    min: 0,
    padding: 0.1,
    width: 32
  } 
</script>
```

## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

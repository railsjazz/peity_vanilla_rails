module PeityVanillaRails
  module Helpers

    def peity_line_chart(data, id: nil, options: {})
      peity_chart(data, "line", ",", id: id, options: options)
    end

    def peity_bar_chart(data, id: nil, options: {})
      peity_chart(data, "bar", ",", id: id, options: options)
    end

    def peity_pie_chart(data, id: nil, options: {})
      peity_chart(data, "pie", "/", id: id, options: options)
    end

    def peity_donut_chart(data, id: nil, options: {})
      peity_chart(data, "donut", "/", id: id, options: options)
    end

    def peity_chart(value, type, delimiter, id: nil, options: {})
      value = value.is_a?(Array) ? value.join(delimiter) : value
      tag.span(id: id, class: 'peity_charts', peity: type, style: 'display: none;', data: { peity: options.to_json }) do
        value
      end
    end

  end
end

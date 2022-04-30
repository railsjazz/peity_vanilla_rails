module PeityVanillaRails
  module Helpers
    
    def peity_line_chart(data, options: {})
      peity_chart(data, "line", ",", options: options)
    end

    def peity_bar_chart(data, options: {})
      peity_chart(data, "bar", ",", options: options)
    end

    def peity_pie_chart(data, options: {})
      peity_chart(data, "pie", "/", options: options)
    end

    def peity_donut_chart(data, options: {})
      peity_chart(data, "donut", "/", options: options)
    end

    def peity_chart(value, type, delimiter, options: {})
      value = value.is_a?(Array) ? value.join(delimiter) : value
      id = "peity_charts_#{Digest::SHA1.hexdigest([Time.now, rand].join)}"
      [
        tag.span(class: 'peity_charts', id: id, "data-peity" => options.to_json) do
          value
        end,
        tag.script do
          %Q{
            function init_peity_charts_#{id}() {
              var element = document.getElementById("#{id}");

              if (!element) {
                return;
              }

              if(element.getAttribute("data-_peity")) {
                return;
              }

              window.peity(element, "#{type}");
            }

            window.addEventListener('load', init_peity_charts_#{id});
            window.addEventListener('turbo:load', init_peity_charts_#{id});
            window.addEventListener('turbolinks:load', init_peity_charts_#{id});
          }.html_safe
        end
      ].join.html_safe
    end    

  end
end

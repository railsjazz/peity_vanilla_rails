module PeityVanillaRails
  class Railtie < ::Rails::Engine
    initializer "peity_vanilla_rails.importmap", before: "importmap" do |app|
      if defined?(Importmap)
        app.config.importmap.cache_sweepers << root.join("app/assets/javascripts")
      end
    end

    PRECOMPILE_ASSETS = Dir[root.join("app/assets/javascripts/**/*")]
    initializer 'peity_vanilla_rails.assets' do |app|
      if app.config.respond_to?(:assets)
        app.config.assets.precompile += PRECOMPILE_ASSETS
      end
    end

    initializer 'peity_vanilla_rails.helpers', before: :load_config_initializers do
      ActiveSupport.on_load :action_view do
        include PeityVanillaRails::Helpers
      end
    end
  end
end

require_relative "lib/peity_vanilla_rails/version"

Gem::Specification.new do |spec|
  spec.name        = "peity_vanilla_rails"
  spec.version     = PeityVanillaRails::VERSION
  spec.authors     = ["Igor Kasyanchuk", "Liubomyr Manastyretskyi"]
  spec.email       = ["igorkasyanchuk@gmail.com", "manastyretskyi@gmail.com"]
  spec.homepage    = "https://github.com/railsjazz/peity_vanilla_rails"
  spec.summary     = "Sparklines are small but intense charts."
  spec.description = "Sparklines are small but intense charts."
  spec.license     = "MIT"
  
  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/railsjazz/peity_vanilla_rails"

  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]
  end

  spec.add_dependency "rails"
  spec.add_development_dependency "pry"
  spec.add_development_dependency "puma"
  spec.add_development_dependency "sprockets-rails"
end

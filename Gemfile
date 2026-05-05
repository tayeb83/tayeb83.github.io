source 'https://rubygems.org'

# jekyll-scholar 5.16 calls File.exists? which was removed in Ruby 3.2.
# bundle exec uses Kernel.load so this Gemfile code runs in the same process as Jekyll.
File.define_singleton_method(:exists?) { |f| File.exist?(f) } unless File.respond_to?(:exists?)

group :jekyll_plugins do
    gem 'github-pages'
    gem 'bibtex-ruby', '4.4.6'
    gem 'jekyll'
    gem 'jekyll-email-protect'
    gem 'jekyll-github-metadata'
    gem 'jekyll-paginate-v2'
    gem 'jekyll-scholar'
    gem 'jekyll-twitter-plugin'
    gem 'jemoji'
    gem 'unicode_utils'
end
